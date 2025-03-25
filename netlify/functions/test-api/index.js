const axios = require('axios');

exports.handler = async function(event, context) {
  const headers = {
    'Content-Type': 'application/json',
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Headers': 'Content-Type, Authorization'
  };

  try {
    // 检查环境变量
    const envCheck = {
      hasApiKey: !!process.env.VITE_DEEPSEEK_API_KEY,
      keyLength: process.env.VITE_DEEPSEEK_API_KEY?.length,
      nodeEnv: process.env.NODE_ENV,
      netlifyContext: process.env.CONTEXT,
      functionRegion: process.env.AWS_REGION
    };

    // 尝试一个简单的外部API请求
    const testResponse = await axios.get('https://api.ipify.org?format=json', {
      timeout: 5000
    });

    return {
      statusCode: 200,
      headers,
      body: JSON.stringify({
        message: 'Test endpoint working',
        environment: envCheck,
        networkTest: {
          success: true,
          ip: testResponse.data.ip
        }
      })
    };
  } catch (error) {
    return {
      statusCode: 500,
      headers,
      body: JSON.stringify({
        message: 'Test failed',
        error: error.message,
        errorCode: error.code,
        errorResponse: error.response?.data
      })
    };
  }
}; 