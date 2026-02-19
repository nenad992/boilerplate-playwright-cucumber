// Site 1 Configuration - Main Application
module.exports = {
  name: 'site1',
  baseUrl: process.env.SITE1_URL || 'https://site1.example.com',
  apiUrl: process.env.SITE1_API_URL || 'https://api1.example.com',
  credentials: {
    username: process.env.SITE1_USERNAME || 'user@site1.com',
    password: process.env.SITE1_PASSWORD || 'password123',
  },
  features: {
    auth: true,
    dashboard: true,
    profile: true,
    settings: true,
  },
  // Site-specific selectors or configurations
  selectors: {
    loginButton: '[data-testid="login-btn"]',
    username: '#username',
    password: '#password',
  },
};
