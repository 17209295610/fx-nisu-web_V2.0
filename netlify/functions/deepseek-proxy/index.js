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
  console.log('Function called with event:', {
    httpMethod: event.httpMethod,
    path: event.path,
    headers: Object.keys(event.headers),
    bodyLength: event.body ? event.body.length : 0
  });

  console.log('Environment details:', {
    hasApiKey: !!process.env.VITE_DEEPSEEK_API_KEY,
    nodeEnv: process.env.NODE_ENV,
    netlifyBuildId: process.env.NETLIFY_BUILD_ID || 'not set'
  });
  
  if (event.httpMethod !== 'POST') {
    return { 
      statusCode: 405, 
      body: JSON.stringify({ error: 'Method Not Allowed' })
    };
  }

  try {
    const body = JSON.parse(event.body);
    const apiKey = process.env.VITE_DEEPSEEK_API_KEY;
    
    if (!apiKey) {
      console.error('API key is not set in environment');
      return {
        statusCode: 500,
        body: JSON.stringify({ 
          error: 'Configuration Error',
          details: 'API key not found in environment'
        })
      };
    }

    console.log('Sending request to DeepSeek API');
    
    const response = await axios({
      method: 'POST',
      url: 'https://api.deepseek.com/v1/chat/completions',
      data: body,
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${apiKey}`
      },
      timeout: 25000
    });
    
    console.log('Received response from DeepSeek API:', {
      status: response.status,
      dataLength: JSON.stringify(response.data).length
    });
    
    return {
      statusCode: 200,
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(response.data)
    };
  } catch (error) {
    console.error('API Error:', {
      message: error.message,
      status: error.response?.status || 'no status',
      data: error.response?.data || 'no data'
    });
    
    return {
      statusCode: error.response?.status || 500,
      body: JSON.stringify({ 
        error: '调用AI服务失败',
        details: error.message,
        status: error.response?.status
      })
    };
  }
}; 