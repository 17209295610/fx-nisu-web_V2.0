const axios = require('axios');

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

exports.handler = async function(event, context) {
  try {
    // 详细的请求日志
    console.log('Function invoked with:', {
      method: event.httpMethod,
      path: event.path,
      headers: Object.keys(event.headers),
      bodyLength: event.body?.length,
      remainingTime: context.getRemainingTimeInMillis?.() || 'unknown'
    });

    if (event.httpMethod !== 'POST') {
      return { 
        statusCode: 405,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ error: 'Method Not Allowed' })
      };
    }

    const body = JSON.parse(event.body);
    const apiKey = process.env.VITE_DEEPSEEK_API_KEY;
    
    if (!apiKey) {
      console.error('Missing API key');
      return {
        statusCode: 500,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ 
          error: 'Configuration Error',
          details: 'API key not found'
        })
      };
    }

    console.log('Preparing DeepSeek API request');
    
    const response = await axiosWithRetry(
      'https://api.deepseek.com/v1/chat/completions',
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${apiKey}`,
          'User-Agent': 'Netlify Function'
        },
        data: body,
        timeout: 20000,
        validateStatus: status => status < 500
      }
    );
    
    console.log('DeepSeek API response received:', {
      status: response.status,
      contentLength: response.data ? JSON.stringify(response.data).length : 0
    });

    return {
      statusCode: response.status,
      headers: {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*'
      },
      body: JSON.stringify(response.data)
    };
  } catch (error) {
    console.error('Function error:', {
      name: error.name,
      message: error.message,
      status: error.response?.status,
      data: error.response?.data,
      stack: error.stack
    });

    // 根据错误类型返回不同的状态码
    const statusCode = error.response?.status || 500;
    const errorMessage = error.response?.data?.error || error.message;

    return {
      statusCode,
      headers: {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*'
      },
      body: JSON.stringify({
        error: '调用AI服务失败',
        details: errorMessage,
        code: error.code || 'UNKNOWN_ERROR'
      })
    };
  }
}; 