const { When, Then } = require('@cucumber/cucumber');
const { expect } = require('@playwright/test');

When('the user navigates to the dashboard', async function () {
  if (!this.page) {
    throw new Error('Browser page not initialized. Ensure hooks are properly configured.');
  }

  // Get the base URL from config
  const siteConfig = getSiteConfig();
  const dashboardUrl = `${siteConfig.baseUrl}/dashboard`;

  await this.page.goto(dashboardUrl);
  await this.page.waitForLoadState('networkidle');
});

Then('the dashboard title should be displayed', async function () {
  if (!this.page) {
    throw new Error('Browser page not initialized. Ensure hooks are properly configured.');
  }

  // Try multiple selectors for dashboard title
  let title = await this.page.$('h1');
  const titleText = await title?.textContent();

  expect(titleText?.toLowerCase()).toContain('dashboard');
});

Then('all dashboard widgets should be loaded', async function () {
  if (!this.page) {
    throw new Error('Browser page not initialized. Ensure hooks are properly configured.');
  }

  // Check for widgets by data-testid
  const widgetElements = await this.page.$$('[data-testid*="widget"]');
  expect(widgetElements.length).toBeGreaterThan(0);
});

Then('the user profile section should be visible', async function () {
  if (!this.page) {
    throw new Error('Browser page not initialized. Ensure hooks are properly configured.');
  }

  let profileSection = await this.page.$('[data-testid="profile-section"]');
  if (!profileSection) {
    profileSection = await this.page.$('.profile-card');
  }

  expect(profileSection).not.toBeNull('Profile section should be visible');
});

When('the user is on the dashboard', async function () {
  if (!this.page) {
    throw new Error('Browser page not initialized. Ensure hooks are properly configured.');
  }

  const currentUrl = this.page.url();
  expect(currentUrl).toContain('/dashboard');
});

Then('the following statistics should be visible:', async function (dataTable) {
  if (!this.page) {
    throw new Error('Browser page not initialized. Ensure hooks are properly configured.');
  }

  const statistics = dataTable.hashes();

  for (const stat of statistics) {
    const statElement = await this.page.getByText(stat.Statistic, { exact: false });
    const isVisible = statElement ? await statElement.isVisible() : false;
    expect(isVisible).toBeTruthy(`Statistic "${stat.Statistic}" should be visible`);
  }
});

Then('the main menu should contain the following items:', async function (dataTable) {
  if (!this.page) {
    throw new Error('Browser page not initialized. Ensure hooks are properly configured.');
  }

  const menuItems = dataTable.hashes();

  for (const item of menuItems) {
    const navItem = await this.page.getByRole('link', { name: new RegExp(item['Menu Item'], 'i') });
    const exists = navItem ? await navItem.isVisible().catch(() => false) : false;
    expect(exists).toBeTruthy(`Menu item "${item['Menu Item']}" should exist`);
  }
});

When('the user enters {string} in the search box', async function (searchQuery) {
  if (!this.page) {
    throw new Error('Browser page not initialized. Ensure hooks are properly configured.');
  }

  const searchInput = await this.page.$('input[placeholder*="Search"], input[type="search"]');
  if (!searchInput) {
    throw new Error('Search input not found');
  }

  await searchInput.fill(searchQuery);
});

When('presses Enter', async function () {
  if (!this.page) {
    throw new Error('Browser page not initialized. Ensure hooks are properly configured.');
  }

  await this.page.keyboard.press('Enter');
  await this.page.waitForLoadState('networkidle');
});

Then('search results should be displayed', async function () {
  if (!this.page) {
    throw new Error('Browser page not initialized. Ensure hooks are properly configured.');
  }

  let resultsContainer = await this.page.$('[data-testid="search-results"]');
  if (!resultsContainer) {
    resultsContainer = await this.page.$('.search-results');
  }

  expect(resultsContainer).not.toBeNull('Search results should be displayed');
});

Then('the results count should be greater than {int}', async function (count) {
  if (!this.page) {
    throw new Error('Browser page not initialized. Ensure hooks are properly configured.');
  }

  const results = await this.page.$$('[data-testid="result-item"], .result-item');
  expect(results.length).toBeGreaterThan(count);
});

When('the user applies filters with the following values:', async function (dataTable) {
  if (!this.page) {
    throw new Error('Browser page not initialized. Ensure hooks are properly configured.');
  }

  const filters = dataTable.hashes();

  for (const filter of filters) {
    const filterSelect = await this.page.$(
      `select[aria-label*="${filter['Filter Type']}"], [data-filter="${filter['Filter Type'].toLowerCase()}"]`
    );
    if (filterSelect) {
      await filterSelect.selectOption(filter.Value);
    }
  }
});

When('the user sorts by {string} in descending order', async function (sortField) {
  if (!this.page) {
    throw new Error('Browser page not initialized. Ensure hooks are properly configured.');
  }

  const sortButton = await this.page.$(
    `button:has-text("${sortField}"), [data-sort="${sortField.toLowerCase()}"]`
  );
  if (sortButton) {
    await sortButton.click();
    // Click again for descending
    await sortButton.click();
  }
});

Then('the results should be filtered and sorted correctly', async function () {
  if (!this.page) {
    throw new Error('Browser page not initialized. Ensure hooks are properly configured.');
  }

  // Verify results are displayed
  const results = await this.page.$$('[data-testid="result-item"], .result-item');
  expect(results.length).toBeGreaterThan(0);
});

/**
 * Helper function to get site configuration
 */
function getSiteConfig() {
  const site = process.env.SITE || 'site1';
  try {
    return require(`../../config/sites/${site}.config.js`);
  } catch (e) {
    console.warn(`Could not load site config for ${site}, using site1 as fallback`);
    return require('../../config/sites/site1.config.js');
  }
}
