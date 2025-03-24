const axios = require('axios');

exports.handler = async function(event, context) {
  // 添加详细的日志
  console.log('Function environment:', process.env.NODE_ENV);
  console.log('API Key exists:', !!process.env.DEEPSEEK_API_KEY); // 注意这里改变了变量名
  
  if (event.httpMethod !== 'POST') {
    return { statusCode: 405, body: 'Method Not Allowed' };
  }

  try {
    // 解析请求体
    const body = JSON.parse(event.body);
    
    // 检查API密钥
    const apiKey = process.env.DEEPSEEK_API_KEY; // 直接使用DEEPSEEK_API_KEY
    if (!apiKey) {
      console.error('API key is not set in environment');
      return {
        statusCode: 500,
        body: JSON.stringify({ error: 'API key configuration error' })
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
    // 增强错误日志
    console.error('API Error details:', {
      message: error.message,
      response: error.response?.data,
      status: error.response?.status
    });
    
    return {
      statusCode: 500,
      body: JSON.stringify({ 
        error: '调用AI服务失败',
        details: error.message,
        status: error.response?.status
      })
    };
  }
}; 