const axios = require('axios');

exports.handler = async function(event, context) {
  // 添加更详细的环境日志
  console.log('Function environment:', {
    NODE_ENV: process.env.NODE_ENV,
    hasApiKey: !!process.env.VITE_DEEPSEEK_API_KEY,
    envVars: Object.keys(process.env)
      .filter(key => !key.includes('KEY'))
      .reduce((acc, key) => ({...acc, [key]: process.env[key]}), {})
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
    
    const response = await axios.post(
      'https://api.deepseek.com/v1/chat/completions',
      body,
      {
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${apiKey}`
        }
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
      response: error.response?.data,
      status: error.response?.status,
      stack: error.stack
    });
    
    return {
      statusCode: 500,
      body: JSON.stringify({ 
        error: '调用AI服务失败',
        details: error.message,
        status: error.response?.status,
        debug: {
          hasKey: !!process.env.VITE_DEEPSEEK_API_KEY,
          envKeys: Object.keys(process.env)
            .filter(key => !key.includes('KEY'))
        }
      })
    };
  }
}; 