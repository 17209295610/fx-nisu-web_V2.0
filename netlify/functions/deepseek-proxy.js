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
  console.log('Function environment:', {
    NODE_ENV: process.env.NODE_ENV,
    hasApiKey: !!process.env.VITE_DEEPSEEK_API_KEY,
    envVars: Object.keys(process.env)
      .filter(key => !key.includes('KEY'))
      .reduce((acc, key) => ({...acc, [key]: process.env[key]}), {}),
    functionTimeout: context.getRemainingTimeInMillis ? 
      context.getRemainingTimeInMillis() + 'ms' : 'unknown'
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
        body: JSON.stringify({ 
          error: 'API key configuration error',
          debug: {
            hasKey: !!process.env.VITE_DEEPSEEK_API_KEY,
            envKeys: Object.keys(process.env)
              .filter(key => !key.includes('KEY'))
          }
        })
      };
    }

    // 添加请求日志
    console.log('Sending request to DeepSeek API');
    
    const response = await axiosWithRetry(
      'https://api.deepseek.com/v1/chat/completions',
      {
        method: 'POST',
        data: body,
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${apiKey}`
        },
        timeout: 25000 // 25秒超时，留5秒给重试
      }
    );
    
    // 添加响应日志
    console.log('Received response from DeepSeek API:', response.status);
    
    return {
      statusCode: 200,
      body: JSON.stringify(response.data)
    };
  } catch (error) {
    console.error('API Error details:', {
      message: error.message,
      status: error.response?.status,
      data: error.response?.data
    });
    
    // 根据错误类型返回不同的状态码
    const statusCode = error.response?.status || 500;
    const errorMessage = error.response?.status === 502 
      ? '与AI服务通信暂时中断，请稍后重试'
      : '调用AI服务失败';
    
    return {
      statusCode,
      body: JSON.stringify({ 
        error: errorMessage,
        details: error.message
      })
    };
  }
}; 