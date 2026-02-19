// Site 2 Configuration - Alternative Application
module.exports = {
  name: 'site2',
  baseUrl: process.env.SITE2_URL || 'https://site2.example.com',
  apiUrl: process.env.SITE2_API_URL || 'https://api2.example.com',
  credentials: {
    username: process.env.SITE2_USERNAME || 'user@site2.com',
    password: process.env.SITE2_PASSWORD || 'password456',
  },
  features: {
    auth: true,
    dashboard: true,
    profile: true,
    marketplace: true,
  },
  // Site-specific selectors or configurations
  selectors: {
    loginButton: '[class="btn-login"]',
    username: 'input[name="email"]',
    password: 'input[name="pwd"]',
  },
};
