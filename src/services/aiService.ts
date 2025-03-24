import axios from 'axios';

interface ChatMessage {
  role: 'user' | 'assistant' | 'system';
  content: string;
}

interface ChatCompletionRequest {
  model: string;
  messages: ChatMessage[];
  temperature?: number;
  max_tokens?: number;
  stream?: boolean;
  top_p?: number;
  n?: number;
  user?: string;
}

interface ChatCompletionResponse {
  id: string;
  choices: {
    index: number;
    message: ChatMessage;
    finish_reason: string;
  }[];
}

// 修改环境变量的获取方式 - 使用VITE_前缀
const API_KEY = import.meta.env.VITE_DEEPSEEK_API_KEY || '';

// 修改API URL构建
const API_URL = import.meta.env.PROD 
  ? '/.netlify/functions/deepseek-proxy'
  : 'http://localhost:8888/.netlify/functions/deepseek-proxy'; // 本地开发时使用

// 确认模型名称
const MODEL_NAME = 'deepseek-chat'; // 或尝试 'deepseek-1.5-chat'，根据 DeepSeek 最新文档

// 添加更详细的环境日志
console.log("当前环境:", {
  NODE_ENV: import.meta.env.MODE,
  isProd: import.meta.env.PROD,
  apiUrl: API_URL,
  hasApiKey: !!import.meta.env.VITE_DEEPSEEK_API_KEY,
  envVars: Object.keys(import.meta.env)
    .filter(key => key.startsWith('VITE_'))
    .reduce((acc, key) => ({
      ...acc,
      [key]: key.includes('KEY') ? '[HIDDEN]' : import.meta.env[key]
    }), {})
});

// 添加重试逻辑
const fetchWithRetry = async (url: string, options: any, retries = 2) => {
  for (let i = 0; i < retries; i++) {
    try {
      const response = await axios(url, options);
      return response;
    } catch (error: any) {
      if (i === retries - 1) throw error;
      
      // 如果是超时或502错误才重试
      if (error.response?.status !== 502 && !error.message.includes('timeout')) {
        throw error;
      }
      
      const waitTime = Math.min(1000 * Math.pow(2, i), 3000);
      await new Promise(resolve => setTimeout(resolve, waitTime));
      
      console.log(`Retry attempt ${i + 1} of ${retries}`);
    }
  }
};

/**
 * 与DeepSeek API进行通信获取AI回复
 */
export const getChatCompletion = async (messages: ChatMessage[]): Promise<string> => {
  try {
    // 添加日志，检查API_KEY
    console.log("使用API密钥:", API_KEY ? "已设置(密钥不显示)" : "未设置");
    console.log("API URL:", API_URL);
    console.log("模型名称:", MODEL_NAME);
    
    // 修改系统提示，扩展AI助手的回答范围
    const systemMessage: ChatMessage = {
      role: 'system',
      content: `你是一个智能AI助手，专长于凤翔泥塑非物质文化遗产知识，但也能回答各类问题。
      
      关于凤翔泥塑的问题：请提供深入、专业的解答，展示你对其历史、工艺、特色、代表作品等方面的专业知识。
      
      关于其他问题：你可以自由回答用户询问的任何领域的问题，包括但不限于历史、科技、文化、生活常识等。
      
      回答风格：
      - 使用中文回答问题
      - 语言亲切自然，富有人情味
      - 对于专业问题给予准确、简洁的回答
      - 对于开放性问题，可以展示你的思考能力
      
      注意事项：
      - 如果用户询问有害、违法或不适当的内容，委婉拒绝并引导至积极话题
      - 不要编造凤翔泥塑相关的虚假信息
      - 如果不确定某个事实，坦诚表示不确定，而不是猜测`
    };
    
    const allMessages = [systemMessage, ...messages];
    console.log("发送消息数量:", allMessages.length);
    
    // 准备请求数据
    const requestData: ChatCompletionRequest = {
      model: MODEL_NAME,
      messages: allMessages,
      temperature: 0.7,
      max_tokens: 800,
      stream: false,
      top_p: 1,
      n: 1,
      user: "website-user"
    };
    
    // 打印请求信息，不包含敏感信息
    console.log("发送请求到DeepSeek API");
    
    // 使用带重试的请求
    const response = await fetchWithRetry(
      API_URL,
      {
        method: 'POST',
        data: requestData,
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${API_KEY}`
        },
        timeout: 25000 // 25秒超时
      }
    );
    
    return response.data.choices[0].message.content;
    
  } catch (error: any) {
    console.error('Error calling DeepSeek API:', error);
    
    if (error.response?.status === 502) {
      throw new Error('与AI服务通信暂时中断，请稍后重试');
    } else if (error.message.includes('timeout')) {
      throw new Error('请求超时，请稍后重试');
    } else {
      throw new Error(error.response?.data?.error || '调用AI服务失败，请稍后再试');
    }
  }
};

// 添加聊天历史管理
export const saveChatHistory = (messages: ChatMessage[]) => {
  localStorage.setItem('chat_history', JSON.stringify(messages));
};

export const loadChatHistory = (): ChatMessage[] => {
  const history = localStorage.getItem('chat_history');
  return history ? JSON.parse(history) : [];
};

export const clearChatHistory = () => {
  localStorage.removeItem('chat_history');
}; 