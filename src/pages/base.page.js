/**
 * Base Page Object Model
 * Contains common functionality for all page objects
 */
class BasePage {
  constructor(page) {
    this.page = page;
    this.timeout = parseInt(process.env.TIMEOUT || '30000');
  }

  /**
   * Navigate to URL
   */
  async goto(url) {
    await this.page.goto(url, { waitUntil: 'networkidle' });
  }

  /**
   * Get current URL
   */
  async getCurrentUrl() {
    return this.page.url();
  }

  /**
   * Get page title
   */
  async getPageTitle() {
    return this.page.title();
  }

  /**
   * Fill input field
   */
  async fillInput(selector, value) {
    const element = await this.page.$(selector);
    if (!element) {
      throw new Error(`Element not found: ${selector}`);
    }
    await element.fill(value);
  }

  /**
   * Click element
   */
  async clickElement(selector) {
    const element = await this.page.$(selector);
    if (!element) {
      throw new Error(`Element not found: ${selector}`);
    }
    await element.click();
  }

  /**
   * Get element text
   */
  async getElementText(selector) {
    const element = await this.page.$(selector);
    if (!element) {
      throw new Error(`Element not found: ${selector}`);
    }
    return await element.textContent();
  }

  /**
   * Check if element is visible
   */
  async isElementVisible(selector) {
    try {
      return await this.page.isVisible(selector);
    } catch {
      return false;
    }
  }

  /**
   * Wait for element to be visible
   */
  async waitForElement(selector, timeout = this.timeout) {
    await this.page.waitForSelector(selector, { timeout });
  }

  /**
   * Wait for element to be hidden
   */
  async waitForElementToHide(selector, timeout = this.timeout) {
    await this.page.waitForSelector(selector, { state: 'hidden', timeout });
  }

  /**
   * Get element attribute
   */
  async getElementAttribute(selector, attribute) {
    return await this.page.getAttribute(selector, attribute);
  }

  /**
   * Select option from dropdown
   */
  async selectOption(selector, value) {
    await this.page.selectOption(selector, value);
  }

  /**
   * Clear input field
   */
  async clearInput(selector) {
    await this.page.fill(selector, '');
  }

  /**
   * Take screenshot
   */
  async takeScreenshot(name) {
    await this.page.screenshot({ path: `test-results/screenshots/${name}.png`, fullPage: true });
  }

  /**
   * Wait for navigation
   */
  async waitForNavigation() {
    await this.page.waitForNavigation({ waitUntil: 'networkidle' });
  }

  /**
   * Wait for page load
   */
  async waitForPageLoad() {
    await this.page.waitForLoadState('networkidle');
  }

  /**
   * Reload page
   */
  async reloadPage() {
    await this.page.reload({ waitUntil: 'networkidle' });
  }

  /**
   * Go back
   */
  async goBack() {
    await this.page.goBack({ waitUntil: 'networkidle' });
  }

  /**
   * Get all text from page
   */
  async getPageText() {
    return await this.page.textContent('body');
  }

  /**
   * Check if element exists
   */
  async elementExists(selector) {
    return (await this.page.$(selector)) !== null;
  }

  /**
   * Get count of elements
   */
  async getElementCount(selector) {
    return await this.page.$$(selector).then((elements) => elements.length);
  }

  /**
   * Press key
   */
  async pressKey(key) {
    await this.page.keyboard.press(key);
  }

  /**
   * Type text
   */
  async typeText(selector, text) {
    await this.page.locator(selector).type(text);
  }

  /**
   * Hover over element
   */
  async hoverElement(selector) {
    await this.page.hover(selector);
  }

  /**
   * Double click
   */
  async doubleClickElement(selector) {
    await this.page.dblclick(selector);
  }

  /**
   * Right click
   */
  async rightClickElement(selector) {
    await this.page.click(selector, { button: 'right' });
  }

  /**
   * Set input value directly (useful for date inputs)
   */
  async setInputValue(selector, value) {
    await this.page.$eval(selector, (el, val) => (el.value = val), value);
  }

  /**
   * Accept browser alert
   */
  async acceptAlert() {
    return new Promise((resolve) => {
      this.page.once('dialog', async (dialog) => {
        await dialog.accept();
        resolve();
      });
    });
  }

  /**
   * Dismiss browser alert
   */
  async dismissAlert() {
    return new Promise((resolve) => {
      this.page.once('dialog', async (dialog) => {
        await dialog.dismiss();
        resolve();
      });
    });
  }
}

module.exports = BasePage;
