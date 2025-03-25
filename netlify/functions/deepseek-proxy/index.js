const axios = require('axios');

// 添加重试逻辑
const axiosWithRetry = async (url, options, retries = 3) => {
  for (let i = 0; i < retries; i++) {
    try {
      return await axios(url, options);
    } catch (error) {
      if (i === retries - 1) throw error;
      
      // 等待时间递增
      const waitTime = Math.min(1000 * Math.pow(2, i), 3000);
      await new Promise(resolve => setTimeout(resolve, waitTime));
      
      console.log(`Retry attempt ${i + 1} of ${retries}`);
    }
  }
};

exports.handler = async function(event, context) {
  // 添加更详细的环境日志
  console.log('Function called with event:', {
    httpMethod: event.httpMethod,
    path: event.path,
    headers: event.headers,
    bodyLength: event.body ? event.body.length : 0
  });

  console.log('Environment details:', {
    hasApiKey: !!process.env.VITE_DEEPSEEK_API_KEY,
    nodeEnv: process.env.NODE_ENV,
    netlifyBuildId: process.env.NETLIFY_BUILD_ID || 'not set'
  });
  
  if (event.httpMethod !== 'POST') {
    return { statusCode: 405, body: 'Method Not Allowed' };
  }

  try {
    // 解析请求体
    const body = JSON.parse(event.body);
    
    // 检查API密钥 - 使用VITE_前缀
    const apiKey = process.env.VITE_DEEPSEEK_API_KEY;
    if (!apiKey) {
      console.error('API key is not set in environment');
      return {
        statusCode: 500,
        body: JSON.stringify({ error: 'API key not configured' })
      };
    }

    // 添加请求日志
    console.log('Preparing to send request to DeepSeek API');
    
    // 使用简化的请求配置
    const apiResponse = await axios({
      method: 'POST',
      url: 'https://api.deepseek.com/v1/chat/completions',
      data: body,
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${apiKey}`
      },
      timeout: 25000
    });
    
    // 添加响应日志
    console.log('Received response from DeepSeek API:', {
      status: apiResponse.status,
      dataLength: JSON.stringify(apiResponse.data).length
    });
    
    return {
      statusCode: 200,
      body: JSON.stringify(apiResponse.data)
    };
  } catch (error) {
    console.error('API Error:', {
      message: error.message,
      status: error.response?.status || 'no status',
      stack: error.stack
    });
    
    return {
      statusCode: 500,
      body: JSON.stringify({ 
        error: '调用AI服务失败',
        details: error.message
      })
    };
  }
}; 