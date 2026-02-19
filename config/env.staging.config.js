// Staging environment configuration
module.exports = {
  name: 'staging',
  baseUrl: process.env.BASE_URL_STAGING || 'https://staging.example.com',
  apiUrl: process.env.API_URL_STAGING || 'https://api-staging.example.com',
  headless: true,
  slowMo: 0,
  timeout: 30000,
  retries: 1,
  logLevel: 'info',
  screenshot: 'on-failure',
  video: 'on-failure',
  extraHTTPHeaders: {
    'X-Test-Environment': 'staging',
  },
};
