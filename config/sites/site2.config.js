// Site 2 Configuration - Alternative Application
module.exports = {
  name: 'site2',
  // Secondary site defaulting to the same demo application so examples run out-of-the-box
  baseUrl: process.env.SITE2_URL || 'https://www.saucedemo.com',
  apiUrl: process.env.SITE2_API_URL || '',
  credentials: {
    // Use a different demo account for variation if needed
    username: process.env.SITE2_USERNAME || 'problem_user',
    password: process.env.SITE2_PASSWORD || 'secret_sauce',
  },
  features: {
    auth: true,
    dashboard: true,
    profile: true,
    marketplace: true,
  },
  // Site-specific selectors or configurations
  selectors: {
    username: '#user-name',
    password: '#password',
    loginButton: '#login-button',
    dashboard: '.inventory_list',
    productItem: '.inventory_item',
    productTitle: '.title',
    menuButton: '#react-burger-menu-btn',
    logoutButton: '#logout_sidebar_link',
    sortSelect: '.product_sort_container',
  },
};
