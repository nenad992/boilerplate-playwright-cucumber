const BasePage = require('./base.page');

class DashboardPage extends BasePage {
  constructor(page) {
    super(page);
    this.dashboardTitle = 'h1';
    this.widgets = '.widget, [data-testid*="widget"]';
    this.profileSection = '[data-testid="profile-section"], .profile-card';
    this.searchBox = 'input[placeholder*="Search"], input[type="search"]';
    this.searchResults = '[data-testid="search-results"], .search-results';
    this.resultItems = '[data-testid="result-item"], .result-item';
    this.menuItems = 'nav a';
    this.statistics = '[data-testid="statistic"], .statistic';
    this.logoutButton = 'button[data-testid="logout-btn"], a[data-testid="logout-btn"]';
  }

  /**
   * Navigate to dashboard
   */
  async navigateToDashboard() {
    const siteConfig = require('../config/sites/site1.config.js');
    const dashboardUrl = `${siteConfig.baseUrl}/dashboard`;
    await this.goto(dashboardUrl);
  }

  /**
   * Wait for dashboard to load
   */
  async waitForDashboardLoad() {
    await this.waitForElement(this.dashboardTitle);
    const dashTitle = await this.page.textContent(this.dashboardTitle);
    if (!dashTitle || !dashTitle.toLowerCase().includes('dashboard')) {
      throw new Error('Dashboard page not loaded correctly');
    }
    await this.waitForPageLoad();
  }

  /**
   * Check if dashboard title is visible
   */
  async isDashboardTitleVisible() {
    return await this.isElementVisible(this.dashboardTitle);
  }

  /**
   * Get dashboard title
   */
  async getDashboardTitle() {
    return await this.getElementText(this.dashboardTitle);
  }

  /**
   * Check if profile section is visible
   */
  async isProfileSectionVisible() {
    return await this.isElementVisible(this.profileSection);
  }

  /**
   * Get number of widgets
   */
  async getWidgetCount() {
    return await this.getElementCount(this.widgets);
  }

  /**
   * Get number of statistics
   */
  async getStatisticCount() {
    return await this.getElementCount(this.statistics);
  }

  /**
   * Search for text
   */
  async search(query) {
    await this.fillInput(this.searchBox, query);
    await this.pressKey('Enter');
    await this.waitForPageLoad();
  }

  /**
   * Get search results count
   */
  async getSearchResultsCount() {
    return await this.getElementCount(this.resultItems);
  }

  /**
   * Get menu items
   */
  async getMenuItems() {
    return await this.page.$$(this.menuItems).then((items) => items.length);
  }

  /**
   * Click menu item by text
   */
  async clickMenuItemByText(itemText) {
    const menuItems = await this.page.$$('nav a');
    for (const item of menuItems) {
      const text = await item.textContent();
      if (text && text.includes(itemText)) {
        await item.click();
        await this.waitForNavigation();
        return;
      }
    }
    throw new Error(`Menu item "${itemText}" not found`);
  }

  /**
   * Logout
   */
  async logout() {
    await this.clickElement(this.logoutButton);
    await this.waitForNavigation();
  }

  /**
   * Apply filter
   */
  async applyFilter(filterType, value) {
    const selector = `select[aria-label*="${filterType}"], [data-filter="${filterType.toLowerCase()}"]`;
    await this.selectOption(selector, value);
    await this.waitForPageLoad();
  }

  /**
   * Sort by column
   */
  async sortBy(column) {
    const sortButtons = await this.page.$$('button');
    for (const btn of sortButtons) {
      const text = await btn.textContent();
      if (text && text.includes(column)) {
        await btn.click();
        await this.waitForPageLoad();
        return;
      }
    }
    throw new Error(`Sort button for column "${column}" not found`);
  }
}

module.exports = DashboardPage;
