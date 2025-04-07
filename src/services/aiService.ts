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
  : '/api/deepseek/v1/chat/completions'; // 本地开发使用Vite代理

// 确认模型名称
const MODEL_NAME = 'deepseek-chat';

// 添加更详细的环境日志
console.log("当前环境:", {
  NODE_ENV: import.meta.env.MODE,
  isProd: import.meta.env.PROD,
  apiUrl: API_URL,
  hasApiKey: !!import.meta.env.VITE_DEEPSEEK_API_KEY,
});

// 修改 fetchWithRetry 函数
const fetchWithRetry = async (url: string, options: any, retries = 2) => {
  let lastError;
  for (let i = 0; i < retries; i++) {
    try {
      const response = await axios({
        ...options,
        url,
        validateStatus: (status) => status < 500
      });
      return response;
    } catch (error: any) {
      lastError = error;
      console.error(`Attempt ${i + 1} failed:`, {
        status: error.response?.status,
        message: error.message
      });
      
      if (i === retries - 1) break;
      
      const waitTime = Math.min(1000 * Math.pow(2, i), 3000);
      await new Promise(resolve => setTimeout(resolve, waitTime));
      console.log(`Retry attempt ${i + 2} of ${retries}`);
    }
  }
  throw lastError;
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
      content: `你是一个集成DeepSeek API的AI助手，核心模型是deepseek-v3，专长于凤翔泥塑非物质文化遗产知识，但也能回答各类问题。
      
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
    
    // 根据环境使用不同的请求配置
    const requestConfig = {
      method: 'POST',
      data: requestData,
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${API_KEY}`
      },
      timeout: 25000
    };

    // 使用带重试的请求
    const response = await fetchWithRetry(API_URL, requestConfig);
    
    return response.data.choices[0].message.content;
    
  } catch (error: any) {
    // 记录完整的错误信息
    console.error('Error calling DeepSeek API:', error);
    console.error('Error details:', {
      message: error.message,
      code: error.code,
      response: error.response,
      request: error.request ? 'present' : 'absent'
    });
    
    // 更全面的错误处理
    if (error.code === 'ECONNABORTED') {
      throw new Error('请求超时，请检查网络连接');
    } else if (error.code === 'ERR_NETWORK') {
      throw new Error('网络连接失败，请检查网络状态');
    } else if (error.code === 'ERR_BAD_RESPONSE' || error.response?.status === 502) {
      throw new Error('与AI服务通信暂时中断，请稍后重试 (502)');
    } else if (error.response?.status === 500) {
      throw new Error('AI服务器内部错误，请稍后再试 (500)');
    } else if (error.response?.status === 401 || error.response?.status === 403) {
      throw new Error('API授权失败，请联系管理员 (401/403)');
    } else {
      // 如果有服务器返回的错误信息，优先使用
      const serverErrorMsg = error.response?.data?.error || error.response?.data?.message;
      throw new Error(serverErrorMsg || '调用AI服务失败，请稍后再试');
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