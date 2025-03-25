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
  // 添加CORS预检请求处理
  if (event.httpMethod === 'OPTIONS') {
    return {
      statusCode: 204,
      headers: {
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Headers': 'Content-Type, Authorization',
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
      headers: Object.keys(event.headers),
      bodyLength: event.body?.length,
      remainingTime: context.getRemainingTimeInMillis?.() || 'unknown'
    });

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

    // 测试API连接
    const testResult = await testDeepSeekAPI(apiKey);
    console.log('API test result:', testResult);

    if (!testResult.success) {
      return {
        statusCode: 500,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          error: 'API Connection Test Failed',
          details: testResult
        })
      };
    }

    const body = JSON.parse(event.body);
    console.log('Preparing request to DeepSeek API');
    
    const response = await axios({
      method: 'POST',
      url: 'https://api.deepseek.com/v1/chat/completions',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${apiKey}`,
        'User-Agent': 'Netlify Function'
      },
      data: body,
      timeout: 15000,
      validateStatus: status => status < 500
    });
    
    console.log('Response received:', {
      status: response.status,
      contentLength: response.data ? JSON.stringify(response.data).length : 0
    });

    return {
      statusCode: response.status,
      headers: {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Headers': 'Content-Type, Authorization'
      },
      body: JSON.stringify(response.data)
    };
  } catch (error) {
    console.error('Function error:', {
      name: error.name,
      message: error.message,
      status: error.response?.status,
      data: error.response?.data
    });

    // 更详细的错误处理
    let errorResponse = {
      error: '调用AI服务失败',
      code: error.code || 'UNKNOWN_ERROR',
      details: error.message
    };

    if (error.response?.data) {
      errorResponse.apiError = error.response.data;
    }

    if (error.code === 'ECONNABORTED') {
      errorResponse.error = '请求超时';
    } else if (error.code === 'ECONNREFUSED') {
      errorResponse.error = '无法连接到AI服务';
    }

    return {
      statusCode: error.response?.status || 500,
      headers: {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Headers': 'Content-Type, Authorization'
      },
      body: JSON.stringify(errorResponse)
    };
  }
}; 