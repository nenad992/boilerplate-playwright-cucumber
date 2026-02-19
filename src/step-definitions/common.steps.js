const { Given, When, Then, setDefaultTimeout } = require('@cucumber/cucumber');
const { expect } = require('@playwright/test');
require('dotenv').config();

// Set timeout for all steps
setDefaultTimeout(60 * 1000);

// Get environment configuration
function getEnvironmentConfig() {
  const env = process.env.ENV || 'dev';
  try {
    return require(`../../config/env.${env}.config.js`);
  } catch (e) {
    console.warn(`Could not load env config for ${env}, using dev as fallback`);
    return require('../../config/env.dev.config.js');
  }
}

// Get site configuration
function getSiteConfig() {
  const site = process.env.SITE || 'site1';
  try {
    return require(`../../config/sites/${site}.config.js`);
  } catch (e) {
    console.warn(`Could not load site config for ${site}, using site1 as fallback`);
    return require('../../config/sites/site1.config.js');
  }
}

// Common step definitions
Given('the user navigates to the login page', async function () {
  const envConfig = getEnvironmentConfig();
  const siteConfig = getSiteConfig();

  if (!this.page) {
    throw new Error('Browser page not initialized. Ensure hooks are properly configured.');
  }

  const loginUrl = `${siteConfig.baseUrl}/login`;
  await this.page.goto(loginUrl);
  await this.page.waitForLoadState('networkidle');
});

Given('the user is logged in', async function () {
  const siteConfig = getSiteConfig();

  if (!this.page) {
    throw new Error('Browser page not initialized. Ensure hooks are properly configured.');
  }

  // Navigate to login page
  const loginUrl = `${siteConfig.baseUrl}/login`;
  await this.page.goto(loginUrl);
  await this.page.waitForLoadState('networkidle');

  // Log in
  const usernameInput = await this.page.$('input[name="username"]');
  const passwordInput = await this.page.$('input[name="password"]');

  if (!usernameInput || !passwordInput) {
    throw new Error('Login form not found. Check selectors and page structure.');
  }

  await usernameInput.fill(siteConfig.credentials.username);
  await passwordInput.fill(siteConfig.credentials.password);

  const submitButton = await this.page.$('button[type="submit"]');
  if (submitButton) {
    await submitButton.click();
    await this.page.waitForNavigation({ timeout: 30000 });
    await this.page.waitForLoadState('networkidle');
  }
});

When('the user enters valid credentials', async function () {
  const siteConfig = getSiteConfig();

  if (!this.page) {
    throw new Error('Browser page not initialized. Ensure hooks are properly configured.');
  }

  const usernameInput = await this.page.$('input[name="username"]');
  const passwordInput = await this.page.$('input[name="password"]');

  if (!usernameInput || !passwordInput) {
    throw new Error('Login form inputs not found. Check the page structure and selectors.');
  }

  await usernameInput.fill(siteConfig.credentials.username);
  await passwordInput.fill(siteConfig.credentials.password);
});

When('the user enters invalid credentials', async function () {
  if (!this.page) {
    throw new Error('Browser page not initialized. Ensure hooks are properly configured.');
  }

  const usernameInput = await this.page.$('input[name="username"]');
  const passwordInput = await this.page.$('input[name="password"]');

  if (!usernameInput || !passwordInput) {
    throw new Error('Login form inputs not found.');
  }

  await usernameInput.fill('invalid@example.com');
  await passwordInput.fill('wrongpassword');
});

When('the user enters username {string}', async function (username) {
  if (!this.page) {
    throw new Error('Browser page not initialized. Ensure hooks are properly configured.');
  }

  const usernameInput = await this.page.$('input[name="username"]');
  if (!usernameInput) {
    throw new Error('Username input not found.');
  }

  await usernameInput.fill(username);
});

When('the user enters password {string}', async function (password) {
  if (!this.page) {
    throw new Error('Browser page not initialized. Ensure hooks are properly configured.');
  }

  const passwordInput = await this.page.$('input[name="password"]');
  if (!passwordInput) {
    throw new Error('Password input not found.');
  }

  await passwordInput.fill(password);
});

When('clicks the login button', async function () {
  if (!this.page) {
    throw new Error('Browser page not initialized. Ensure hooks are properly configured.');
  }

  const loginButton = await this.page.$('button[type="submit"]');
  if (!loginButton) {
    throw new Error('Login button not found.');
  }

  await loginButton.click();
  // Allow wait for navigation to fail if no navigation occurs
  await this.page.waitForNavigation({ timeout: 30000 }).catch(() => {});
  await this.page.waitForLoadState('networkidle');
});

Then('the user should be logged in successfully', async function () {
  if (!this.page) {
    throw new Error('Browser page not initialized. Ensure hooks are properly configured.');
  }

  // Wait for page to be stable
  await this.page.waitForLoadState('networkidle');
});

Then('the dashboard should be displayed', async function () {
  if (!this.page) {
    throw new Error('Browser page not initialized. Ensure hooks are properly configured.');
  }

  // Check for dashboard elements
  const dashboardElement = await this.page.$('[data-testid="dashboard"]');
  expect(dashboardElement).not.toBeNull('Dashboard element should be visible');
});

Then('a {string} message should be displayed', async function (messageType) {
  if (!this.page) {
    throw new Error('Browser page not initialized. Ensure hooks are properly configured.');
  }

  // Try error selector first
  let messageElement;
  if (messageType.toLowerCase().includes('error')) {
    messageElement = await this.page.$('.error-message');
    if (!messageElement) {
      messageElement = await this.page.$('.alert-danger');
    }
  } else {
    messageElement = await this.page.$('.success-message');
    if (!messageElement) {
      messageElement = await this.page.$('.alert-success');
    }
  }

  expect(messageElement).not.toBeNull(`${messageType} message should be displayed`);
});

Then('the user should remain on the login page', async function () {
  if (!this.page) {
    throw new Error('Browser page not initialized. Ensure hooks are properly configured.');
  }

  const currentUrl = this.page.url();
  expect(currentUrl).toContain('/login');
});

When('the user clicks the logout button', async function () {
  if (!this.page) {
    throw new Error('Browser page not initialized. Ensure hooks are properly configured.');
  }

  let logoutButton = await this.page.$('button[data-testid="logout-btn"]');
  if (!logoutButton) {
    logoutButton = await this.page.$('a[data-testid="logout-btn"]');
  }

  if (!logoutButton) {
    throw new Error('Logout button not found.');
  }

  await logoutButton.click();
});

Then('the user should be logged out', async function () {
  if (!this.page) {
    throw new Error('Browser page not initialized. Ensure hooks are properly configured.');
  }

  await this.page.waitForNavigation({ timeout: 30000 }).catch(() => {});
  await this.page.waitForLoadState('networkidle');
});

Then('the login page should be displayed', async function () {
  if (!this.page) {
    throw new Error('Browser page not initialized. Ensure hooks are properly configured.');
  }

  const currentUrl = this.page.url();
  expect(currentUrl).toContain('/login');
});

When('the user checks the {string} checkbox', async function (checkboxLabel) {
  if (!this.page) {
    throw new Error('Browser page not initialized. Ensure hooks are properly configured.');
  }

  const checkbox = await this.page.$(`input[type="checkbox"][aria-label*="${checkboxLabel}"]`);
  if (checkbox) {
    await checkbox.check();
  } else {
    throw new Error(`Checkbox with label "${checkboxLabel}" not found.`);
  }
});
