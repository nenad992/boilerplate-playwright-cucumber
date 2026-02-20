// Site 1 Configuration - Main Application
module.exports = {
  name: 'site1',
  // Defaulting to the example dummy site (Sauce Demo) for the boilerplate.
  baseUrl: process.env.SITE1_URL || 'https://www.saucedemo.com',
  apiUrl: process.env.SITE1_API_URL || '',
  credentials: {
    // Known demo credentials for Saucedemo
    username: process.env.SITE1_USERNAME || 'standard_user',
    password: process.env.SITE1_PASSWORD || 'secret_sauce',
  },
  features: {
    auth: true,
    dashboard: true,
    profile: true,
    settings: true,
  },
  // Site-specific selectors or configurations
  selectors: {
    // Saucedemo selectors
    username: '#user-name',
    password: '#password',
    loginButton: '#login-button',
    // Inventory / dashboard selectors
    dashboard: '.inventory_list',
    productItem: '.inventory_item',
    productTitle: '.title',
    menuButton: '#react-burger-menu-btn',
    logoutButton: '#logout_sidebar_link',
    sortSelect: '.product_sort_container',
  },
};
