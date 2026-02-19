// Production environment configuration
module.exports = {
  name: 'prod',
  baseUrl: process.env.BASE_URL_PROD || 'https://example.com',
  apiUrl: process.env.API_URL_PROD || 'https://api.example.com',
  headless: true,
  slowMo: 0,
  timeout: 30000,
  retries: 2,
  logLevel: 'error',
  screenshot: 'on-failure',
  video: 'on-failure',
  extraHTTPHeaders: {
    'X-Test-Environment': 'prod',
  },
};
