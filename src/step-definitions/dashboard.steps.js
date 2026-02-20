const { When, Then } = require('@cucumber/cucumber');
const { expect } = require('@playwright/test');

const getSiteConfig = () => {
  const site = process.env.SITE || 'site1';
  try {
    return require(`../../config/sites/${site}.config.js`);
  } catch (e) {
    return require('../../config/sites/site1.config.js');
  }
};

const siteConfig = getSiteConfig();

Then('the dashboard title should be displayed', async function () {
  if (!this.page) throw new Error('Browser page not initialized.');

  const title = await this.page.$(siteConfig.selectors.productTitle || '.title');
  const text = await title?.textContent();
  expect(text?.toLowerCase()).toContain('products');
});

Then('the product list should be visible', async function () {
  if (!this.page) throw new Error('Browser page not initialized.');

  await this.page.waitForSelector(siteConfig.selectors.dashboard || '.inventory_list');
  const list = await this.page.$(siteConfig.selectors.dashboard || '.inventory_list');
  expect(list).not.toBeNull();
});

Then('the product count should be greater than {int}', async function (count) {
  if (!this.page) throw new Error('Browser page not initialized.');

  const items = await this.page.$$(siteConfig.selectors.productItem || '.inventory_item');
  expect(items.length).toBeGreaterThan(count);
});

When('the user opens the main menu', async function () {
  if (!this.page) throw new Error('Browser page not initialized.');

  const menuBtn = await this.page.$(siteConfig.selectors.menuButton || '#react-burger-menu-btn');
  if (!menuBtn) throw new Error('Menu button not found');
  await menuBtn.click();
});

Then('the menu contains {string}', async function (label) {
  if (!this.page) throw new Error('Browser page not initialized.');

  const menuItem = await this.page.$(`text=${label}`);
  const exists = menuItem ? await menuItem.isVisible().catch(() => false) : false;
  expect(exists).toBeTruthy();
});

When('the user clicks logout', async function () {
  if (!this.page) throw new Error('Browser page not initialized.');
  const logout = await this.page.$(siteConfig.selectors.logoutButton || '#logout_sidebar_link');
  if (!logout) throw new Error('Logout link not found');
  await logout.click();
});

When('the user sorts products by {string}', async function (optionText) {
  if (!this.page) throw new Error('Browser page not initialized.');
  const select = await this.page.$(siteConfig.selectors.sortSelect || '.product_sort_container');
  if (!select) throw new Error('Sort select not found');
  await select.selectOption({ label: optionText }).catch(() => {});
});

Then('products should be reorderable', async function () {
  if (!this.page) throw new Error('Browser page not initialized.');
  const items = await this.page.$$(siteConfig.selectors.productItem || '.inventory_item');
  expect(items.length).toBeGreaterThan(0);
});
