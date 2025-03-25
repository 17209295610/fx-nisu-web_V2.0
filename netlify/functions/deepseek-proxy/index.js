const axios = require('axios');
const https = require('https');

// 添加重试逻辑
const axiosWithRetry = async (url, options, retries = 3) => {
  for (let i = 0; i < retries; i++) {
    try {
      const response = await axios(url, options);
      return response;
    } catch (error) {
      console.error(`Attempt ${i + 1} failed:`, {
        status: error.response?.status,
        message: error.message,
        data: error.response?.data
      });

      if (i === retries - 1) throw error;
      
      const waitTime = Math.min(1000 * Math.pow(2, i), 3000);
      await new Promise(resolve => setTimeout(resolve, waitTime));
      
      console.log(`Retrying request, attempt ${i + 2} of ${retries}`);
    }
  }
};

// 添加测试函数
const testDeepSeekAPI = async (apiKey) => {
  try {
    const response = await axios({
      method: 'POST',
      url: 'https://api.deepseek.com/v1/chat/completions',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${apiKey}`,
        'User-Agent': 'Netlify Function'
      },
      data: {
        model: "deepseek-chat",
        messages: [{ role: "user", content: "Hello" }],
        temperature: 0.7,
        max_tokens: 100
      },
      timeout: 10000
    });
    return { success: true, status: response.status };
  } catch (error) {
    return { 
      success: false, 
      error: error.message,
      status: error.response?.status,
      data: error.response?.data 
    };
  }
};

exports.handler = async function(event, context) {
  const headers = {
    'Content-Type': 'application/json',
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Headers': 'Content-Type, Authorization'
  };

  // 处理 OPTIONS 请求
  if (event.httpMethod === 'OPTIONS') {
    return {
      statusCode: 204,
      headers: {
        ...headers,
        'Access-Control-Allow-Methods': 'GET, POST, OPTIONS',
        'Access-Control-Max-Age': '86400'
      }
    };
  }

  // 添加健康检查端点
  if (event.path.endsWith('/health')) {
    return {
      statusCode: 200,
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ status: 'ok' })
    };
  }

  try {
    console.log('Function invoked:', {
      method: event.httpMethod,
      path: event.path,
      hasBody: !!event.body
    });

    const apiKey = process.env.VITE_DEEPSEEK_API_KEY;
    if (!apiKey) {
      throw new Error('API key not configured');
    }

    if (!event.body) {
      throw new Error('Request body is required');
    }

    const body = JSON.parse(event.body);

    // 创建自定义的 axios 实例
    const instance = axios.create({
      httpsAgent: new https.Agent({
        rejectUnauthorized: true,
        timeout: 10000
      }),
      timeout: 10000
    });

    const response = await instance({
      method: 'POST',
      url: 'https://api.deepseek.com/v1/chat/completions',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${apiKey}`,
        'User-Agent': 'Netlify Function'
      },
      data: body,
      validateStatus: null // 允许所有状态码
    });

    // 记录响应信息
    console.log('API Response:', {
      status: response.status,
      statusText: response.statusText,
      hasData: !!response.data,
      headers: response.headers
    });

    // 如果响应状态码不是2xx，抛出错误
    if (response.status >= 300) {
      throw new Error(`API returned status ${response.status}: ${JSON.stringify(response.data)}`);
    }

    return {
      statusCode: 200,
      headers,
      body: JSON.stringify(response.data)
    };
  } catch (error) {
    console.error('Function error:', {
      name: error.name,
      message: error.message,
      code: error.code,
      response: error.response?.data
    });

    const statusCode = error.response?.status || 500;
    const errorMessage = error.response?.data?.error || error.message;

    return {
      statusCode,
      headers,
      body: JSON.stringify({
        error: '调用AI服务失败',
        message: errorMessage,
        code: error.code || 'UNKNOWN_ERROR',
        details: error.response?.data
      })
    };
  }
}; 