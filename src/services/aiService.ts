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
    
    // 创建一个带超时的Promise
    const timeoutPromise = new Promise<never>((_, reject) => {
      setTimeout(() => reject(new Error('API请求超时，服务器未响应')), 30000); // 30秒超时
    });
    
    // 使用Promise.race来处理超时
    const responsePromise = axios.post<ChatCompletionResponse>(
      API_URL,
      requestData,
      {
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${API_KEY}`
        },
        timeout: 30000 // 增加axios超时设置为30秒
      }
    );
    
    // 竞争两个Promise
    const response = await Promise.race([responsePromise, timeoutPromise]);
    
    console.log("收到DeepSeek API响应:", response.status);
    
    // 返回AI回复
    return response.data.choices[0].message.content;
    
  } catch (error: any) {
    console.error('Error calling DeepSeek API:', error);
    
    // 更详细的错误信息处理
    if (error.message && error.message.includes('timeout')) {
      throw new Error('API请求超时，服务器未响应');
    } else if (error.response) {
      // 服务器响应错误
      console.error(`服务器响应错误: ${error.response.status}`, error.response.data);
      throw new Error(`服务器响应错误(${error.response.status})`);
    } else if (error.request) {
      // 请求发送但没有响应
      throw new Error('未收到API响应，请检查网络连接');
    } else {
      throw new Error('无法连接到AI服务，请稍后再试');
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