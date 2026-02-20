const { Given, When, Then, setDefaultTimeout } = require('@cucumber/cucumber');
const { expect } = require('@playwright/test');
require('dotenv').config();

// Set timeout for all steps
setDefaultTimeout(60 * 1000);

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

// Load site config once for use in steps
const siteConfig = getSiteConfig();

// Common step definitions
Given('the user navigates to the login page', async function () {
  const siteConfig = getSiteConfig();

  if (!this.page) {
    throw new Error('Browser page not initialized. Ensure hooks are properly configured.');
  }

  // Navigate to the site's base URL (some demo sites use root as login)
  const loginUrl = `${siteConfig.baseUrl}`;
  await this.page.goto(loginUrl);
  await this.page.waitForLoadState('load');
});

Given('the user is logged in', async function () {
  const siteConfig = getSiteConfig();

  if (!this.page) {
    throw new Error('Browser page not initialized. Ensure hooks are properly configured.');
  }

  // Navigate to login (use base URL by default)
  const loginUrl = `${siteConfig.baseUrl}`;
  await this.page.goto(loginUrl);
  await this.page.waitForLoadState('load');

  // Log in using selectors from site config
  const usernameInput = await this.page.$(
    siteConfig.selectors.username || 'input[name="username"]'
  );
  const passwordInput = await this.page.$(
    siteConfig.selectors.password || 'input[name="password"]'
  );

  if (!usernameInput || !passwordInput) {
    throw new Error('Login form not found. Check selectors and page structure.');
  }

  await usernameInput.fill(siteConfig.credentials.username);
  await passwordInput.fill(siteConfig.credentials.password);

  const submitButton = await this.page.$(
    siteConfig.selectors.loginButton || 'button[type="submit"]'
  );
  if (submitButton) {
    await submitButton.click();
    // Wait for either navigation or the dashboard selector to appear
    const dashboardSelector = siteConfig.selectors.dashboard || '.inventory_list';
    await Promise.race([
      this.page.waitForNavigation({ timeout: 15000 }).catch(() => null),
      this.page.waitForSelector(dashboardSelector, { timeout: 15000 }).catch(() => null),
    ]);
  }
});

When('the user enters valid credentials', async function () {
  const siteConfig = getSiteConfig();

  if (!this.page) {
    throw new Error('Browser page not initialized. Ensure hooks are properly configured.');
  }

  const usernameInput = await this.page.$(
    siteConfig.selectors.username || 'input[name="username"]'
  );
  const passwordInput = await this.page.$(
    siteConfig.selectors.password || 'input[name="password"]'
  );

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

  const usernameInput = await this.page.$(
    siteConfig.selectors.username || 'input[name="username"]'
  );
  const passwordInput = await this.page.$(
    siteConfig.selectors.password || 'input[name="password"]'
  );

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

  const usernameInput = await this.page.$(
    siteConfig.selectors.username || 'input[name="username"]'
  );
  if (!usernameInput) {
    throw new Error('Username input not found.');
  }

  await usernameInput.fill(username);
});

When('the user enters password {string}', async function (password) {
  if (!this.page) {
    throw new Error('Browser page not initialized. Ensure hooks are properly configured.');
  }

  const passwordInput = await this.page.$(
    siteConfig.selectors.password || 'input[name="password"]'
  );
  if (!passwordInput) {
    throw new Error('Password input not found.');
  }

  await passwordInput.fill(password);
});

When('clicks the login button', async function () {
  if (!this.page) {
    throw new Error('Browser page not initialized. Ensure hooks are properly configured.');
  }

  const loginButton = await this.page.$(
    siteConfig.selectors.loginButton || 'button[type="submit"]'
  );
  if (!loginButton) {
    throw new Error('Login button not found.');
  }

  await loginButton.click();
  // Allow wait for navigation to fail if no navigation occurs
  await this.page.waitForNavigation({ timeout: 30000 }).catch(() => {});
  await this.page.waitForLoadState('load');
});

Then('the user should be logged in successfully', async function () {
  if (!this.page) {
    throw new Error('Browser page not initialized. Ensure hooks are properly configured.');
  }

  // Wait for dashboard/product list to appear
  const dashboardSelector = siteConfig.selectors.dashboard || '.inventory_list';
  await this.page.waitForSelector(dashboardSelector, { timeout: 10000 });
});

Then('the dashboard should be displayed', async function () {
  if (!this.page) throw new Error('Browser page not initialized.');
  const dashboardElement = await this.page.$(siteConfig.selectors.dashboard || '.inventory_list');
  expect(dashboardElement).not.toBeNull();
});

Then('a {string} message should be displayed', async function (_messageType) {
  if (!this.page) throw new Error('Browser page not initialized.');
  // Common error/success selectors (Saucedemo uses [data-test="error"])
  const selectors = [
    '[data-test="error"]',
    '.error-message-container',
    '.error-message',
    '.alert-danger',
    '.success-message',
    '.alert-success',
  ];
  let found = null;
  for (const sel of selectors) {
    const el = await this.page.$(sel);
    if (el) {
      found = el;
      break;
    }
  }
  expect(found).not.toBeNull();
});

Then('an error message should be displayed', async function () {
  if (!this.page) throw new Error('Browser page not initialized.');
  const err =
    (await this.page.$('[data-test="error"]')) || (await this.page.$('.error-message-container'));
  expect(err).not.toBeNull();
});

Then('the login result should be {string}', async function (result) {
  if (!this.page) throw new Error('Browser page not initialized.');
  if (result === 'success') {
    const dashboardSelector = siteConfig.selectors.dashboard || '.inventory_list';
    await this.page.waitForSelector(dashboardSelector, { timeout: 10000 });
    const el = await this.page.$(dashboardSelector);
    expect(el).not.toBeNull();
  } else {
    const err =
      (await this.page.$('[data-test="error"]')) || (await this.page.$('.error-message-container'));
    expect(err).not.toBeNull();
  }
});

Then('the user should remain on the login page', async function () {
  if (!this.page) throw new Error('Browser page not initialized.');
  const loginBtn = await this.page.$(siteConfig.selectors.loginButton || '#login-button');
  expect(loginBtn).not.toBeNull();
});

When('the user clicks the logout button', async function () {
  if (!this.page) {
    throw new Error('Browser page not initialized. Ensure hooks are properly configured.');
  }

  const candidates = [];
  if (siteConfig.selectors && siteConfig.selectors.logoutButton)
    candidates.push(siteConfig.selectors.logoutButton);
  candidates.push(
    '#logout_sidebar_link',
    'button[data-testid="logout-btn"]',
    'a[data-testid="logout-btn"]'
  );

  // If logout is hidden in a menu, try opening the menu first
  const menuBtnSel =
    siteConfig.selectors && siteConfig.selectors.menuButton
      ? siteConfig.selectors.menuButton
      : '#react-burger-menu-btn';
  const menuBtn = this.page.locator(menuBtnSel).first();
  if ((await menuBtn.count()) > 0) {
    await menuBtn.click().catch(() => {});
  }

  let clicked = false;
  for (const sel of candidates) {
    if (!sel) continue;
    const locator = this.page.locator(sel).first();
    if ((await locator.count()) === 0) continue;
    // Try a normal click first, fall back to forced click if element is outside viewport
    try {
      await locator.scrollIntoViewIfNeeded();
      await locator.click({ timeout: 10000 });
      clicked = true;
      break;
    } catch (e) {
      try {
        await locator.click({ force: true });
        clicked = true;
        break;
      } catch (err) {
        // continue to next candidate
      }
    }
  }

  if (!clicked) throw new Error('Logout button not found or could not be clicked.');
});

Then('the user should be logged out', async function () {
  if (!this.page) throw new Error('Browser page not initialized.');
  // After logout, ensure login button is visible
  await this.page.waitForSelector(siteConfig.selectors.loginButton || '#login-button', {
    timeout: 10000,
  });
});

Then('the login page should be displayed', async function () {
  if (!this.page) throw new Error('Browser page not initialized.');
  const loginBtn = await this.page.$(siteConfig.selectors.loginButton || '#login-button');
  expect(loginBtn).not.toBeNull();
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
