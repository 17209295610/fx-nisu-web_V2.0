const axios = require('axios');

exports.handler = async function(event, context) {
  // 只允许POST请求
  if (event.httpMethod !== 'POST') {
    return { statusCode: 405, body: 'Method Not Allowed' };
  }

  try {
    // 解析请求体
    const body = JSON.parse(event.body);
    
    // 向DeepSeek API发送请求
    const response = await axios.post(
      'https://api.deepseek.com/v1/chat/completions',
      body,
      {
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${process.env.VITE_DEEPSEEK_API_KEY}`
        }
      }
    );
    
    // 返回API响应
    return {
      statusCode: 200,
      body: JSON.stringify(response.data)
    };
  } catch (error) {
    console.log('API Error:', error);
    return {
      statusCode: 500,
      body: JSON.stringify({ error: '调用AI服务失败' })
    };
  }
}; 