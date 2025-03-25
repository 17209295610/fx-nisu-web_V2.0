exports.handler = async function(event, context) {
  return {
    statusCode: 200,
    body: JSON.stringify({
      message: "Test function working",
      env: {
        hasApiKey: !!process.env.VITE_DEEPSEEK_API_KEY,
        netlifyEnv: process.env.NODE_ENV || 'not set',
        contextEnv: context.clientContext ? 'present' : 'absent'
      }
    })
  };
}; 