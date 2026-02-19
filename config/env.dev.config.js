// Development environment configuration
module.exports = {
  name: 'dev',
  baseUrl: process.env.BASE_URL_DEV || 'https://dev.example.com',
  apiUrl: process.env.API_URL_DEV || 'https://api-dev.example.com',
  headless: false,
  slowMo: 100, // Slow down operations for visibility
  timeout: 30000,
  retries: 0, // No retries in dev for faster feedback
  logLevel: 'debug',
  screenshot: 'only-on-failure',
  video: 'retain-on-failure',
  extraHTTPHeaders: {
    'X-Test-Environment': 'dev',
  },
};
