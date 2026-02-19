const BasePage = require('./base.page');

class LoginPage extends BasePage {
  constructor(page) {
    super(page);
    this.usernameInput = 'input[name="username"]';
    this.passwordInput = 'input[name="password"]';
    this.loginButton = 'button[type="submit"]';
    this.rememberMeCheckbox = 'input[type="checkbox"][aria-label*="Remember"]';
    this.loginTitle = 'h1';
    this.errorMessage = '.error-message, .alert-danger';
    this.successMessage = '.success-message, .alert-success';
  }

  /**
   * Navigate to login page
   */
  async navigateToLogin() {
    const siteConfig = require('../config/sites/site1.config.js');
    const loginUrl = `${siteConfig.baseUrl}/login`;
    await this.goto(loginUrl);
  }

  /**
   * Enter username
   */
  async enterUsername(username) {
    await this.fillInput(this.usernameInput, username);
  }

  /**
   * Enter password
   */
  async enterPassword(password) {
    await this.fillInput(this.passwordInput, password);
  }

  /**
   * Click login button
   */
  async clickLogin() {
    await this.clickElement(this.loginButton);
    await this.waitForNavigation();
  }

  /**
   * Login with credentials
   */
  async login(username, password) {
    await this.navigateToLogin();
    await this.enterUsername(username);
    await this.enterPassword(password);
    await this.clickLogin();
  }

  /**
   * Check remember me checkbox
   */
  async checkRememberMe() {
    const checkbox = await this.page.$(this.rememberMeCheckbox);
    if (checkbox && !(await checkbox.isChecked())) {
      await checkbox.check();
    }
  }

  /**
   * Wait for login page to load
   */
  async waitForLoginPageLoad() {
    await this.waitForElement(this.loginTitle);
    const loginTitle = await this.page.textContent(this.loginTitle);
    if (!loginTitle || !loginTitle.toLowerCase().includes('login')) {
      throw new Error('Login page not loaded correctly');
    }
  }

  /**
   * Check if error message is visible
   */
  async isErrorMessageVisible() {
    return await this.isElementVisible(this.errorMessage);
  }

  /**
   * Get error message text
   */
  async getErrorMessage() {
    return await this.getElementText(this.errorMessage);
  }

  /**
   * Check if success message is visible
   */
  async isSuccessMessageVisible() {
    return await this.isElementVisible(this.successMessage);
  }
}

module.exports = LoginPage;
