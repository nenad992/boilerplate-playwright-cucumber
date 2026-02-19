/**
 * Assertion Helper
 * Custom assertion utilities for common test scenarios
 */
const { expect } = require('@playwright/test');

class AssertionHelper {
  /**
   * Assert element is visible
   */
  static async assertElementVisible(page, selector) {
    const element = await page.$(selector);
    expect(element).not.toBeNull();
    expect(await element.isVisible()).toBeTruthy();
  }

  /**
   * Assert element is not visible
   */
  static async assertElementNotVisible(page, selector) {
    const element = await page.$(selector);
    if (element) {
      expect(await element.isVisible()).toBeFalsy();
    }
  }

  /**
   * Assert element text equals
   */
  static async assertElementTextEquals(page, selector, expectedText) {
    const element = await page.$(selector);
    expect(element).not.toBeNull();
    const text = await element.textContent();
    expect(text).toBe(expectedText);
  }

  /**
   * Assert element text contains
   */
  static async assertElementTextContains(page, selector, expectedText) {
    const element = await page.$(selector);
    expect(element).not.toBeNull();
    const text = await element.textContent();
    expect(text).toContain(expectedText);
  }

  /**
   * Assert URL contains
   */
  static async assertUrlContains(page, expectedUrl) {
    const currentUrl = page.url();
    expect(currentUrl).toContain(expectedUrl);
  }

  /**
   * Assert URL equals
   */
  static async assertUrlEquals(page, expectedUrl) {
    const currentUrl = page.url();
    expect(currentUrl).toBe(expectedUrl);
  }

  /**
   * Assert element count equals
   */
  static async assertElementCountEquals(page, selector, expectedCount) {
    const elements = await page.$$(selector);
    expect(elements.length).toBe(expectedCount);
  }

  /**
   * Assert element count greater than
   */
  static async assertElementCountGreaterThan(page, selector, expectedCount) {
    const elements = await page.$$(selector);
    expect(elements.length).toBeGreaterThan(expectedCount);
  }

  /**
   * Assert element attribute equals
   */
  static async assertElementAttributeEquals(page, selector, attribute, expectedValue) {
    const element = await page.$(selector);
    expect(element).not.toBeNull();
    const value = await element.getAttribute(attribute);
    expect(value).toBe(expectedValue);
  }

  /**
   * Assert element is enabled
   */
  static async assertElementEnabled(page, selector) {
    const element = await page.$(selector);
    expect(element).not.toBeNull();
    expect(await element.isEnabled()).toBeTruthy();
  }

  /**
   * Assert element is disabled
   */
  static async assertElementDisabled(page, selector) {
    const element = await page.$(selector);
    expect(element).not.toBeNull();
    expect(await element.isDisabled()).toBeTruthy();
  }

  /**
   * Assert element is checked
   */
  static async assertElementChecked(page, selector) {
    const element = await page.$(selector);
    expect(element).not.toBeNull();
    expect(await element.isChecked()).toBeTruthy();
  }

  /**
   * Assert element is not checked
   */
  static async assertElementNotChecked(page, selector) {
    const element = await page.$(selector);
    expect(element).not.toBeNull();
    expect(await element.isChecked()).toBeFalsy();
  }

  /**
   * Assert page title equals
   */
  static async assertPageTitleEquals(page, expectedTitle) {
    const title = await page.title();
    expect(title).toBe(expectedTitle);
  }

  /**
   * Assert page title contains
   */
  static async assertPageTitleContains(page, expectedTitle) {
    const title = await page.title();
    expect(title).toContain(expectedTitle);
  }

  /**
   * Assert page text contains
   */
  static async assertPageTextContains(page, expectedText) {
    const pageText = await page.textContent('body');
    expect(pageText).toContain(expectedText);
  }

  /**
   * Assert element exists
   */
  static async assertElementExists(page, selector) {
    const element = await page.$(selector);
    expect(element).not.toBeNull();
  }

  /**
   * Assert element does not exist
   */
  static async assertElementNotExists(page, selector) {
    const element = await page.$(selector);
    expect(element).toBeNull();
  }

  /**
   * Assert class contains
   */
  static async assertClassContains(page, selector, className) {
    const classes = await page.getAttribute(selector, 'class');
    expect(classes).toContain(className);
  }

  /**
   * Assert input value equals
   */
  static async assertInputValueEquals(page, selector, expectedValue) {
    const value = await page.inputValue(selector);
    expect(value).toBe(expectedValue);
  }

  /**
   * Assert element is in viewport
   */
  static async assertElementInViewport(page, selector) {
    const element = await page.$(selector);
    expect(element).not.toBeNull();
    const isInViewport = await element.evaluate((el) => {
      const rect = el.getBoundingClientRect();
      return (
        rect.top >= 0 &&
        rect.left >= 0 &&
        rect.bottom <= window.innerHeight &&
        rect.right <= window.innerWidth
      );
    });
    expect(isInViewport).toBeTruthy();
  }

  /**
   * Assert array contains item
   */
  static assertArrayContains(array, item) {
    expect(array).toContain(item);
  }

  /**
   * Assert array length equals
   */
  static assertArrayLengthEquals(array, expectedLength) {
    expect(array.length).toBe(expectedLength);
  }

  /**
   * Assert object has key
   */
  static assertObjectHasKey(obj, key) {
    expect(obj).toHaveProperty(key);
  }

  /**
   * Assert value equals
   */
  static assertEquals(actual, expected) {
    expect(actual).toBe(expected);
  }

  /**
   * Assert value is not null
   */
  static assertNotNull(value) {
    expect(value).not.toBeNull();
  }

  /**
   * Assert value is null
   */
  static assertNull(value) {
    expect(value).toBeNull();
  }
}

module.exports = AssertionHelper;
