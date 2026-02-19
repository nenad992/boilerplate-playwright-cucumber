/**
 * Data Helper
 * Utility for handling test data, fixtures, and data transformations
 */
const fs = require('fs');
const path = require('path');

class DataHelper {
  /**
   * Load test data from JSON file
   */
  static loadTestData(filename) {
    const filePath = path.join(__dirname, '../../data', filename);
    return JSON.parse(fs.readFileSync(filePath, 'utf8'));
  }

  /**
   * Get test user data
   */
  static getTestUser() {
    return {
      username: process.env.TEST_USER_EMAIL || 'test@example.com',
      password: process.env.TEST_USER_PASSWORD || 'password123',
      firstName: 'Test',
      lastName: 'User',
      email: process.env.TEST_USER_EMAIL || 'test@example.com',
    };
  }

  /**
   * Generate random email
   */
  static generateRandomEmail() {
    const timestamp = Date.now();
    const random = Math.floor(Math.random() * 1000);
    return `test.user.${timestamp}.${random}@example.com`;
  }

  /**
   * Generate random string
   */
  static generateRandomString(length = 10) {
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    let result = '';
    for (let i = 0; i < length; i++) {
      result += characters.charAt(Math.floor(Math.random() * characters.length));
    }
    return result;
  }

  /**
   * Generate random number
   */
  static generateRandomNumber(min = 1, max = 100) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }

  /**
   * Get current date in format YYYY-MM-DD
   */
  static getCurrentDate() {
    const today = new Date();
    return today.toISOString().split('T')[0];
  }

  /**
   * Get date after N days
   */
  static getDateAfterDays(days) {
    const date = new Date();
    date.setDate(date.getDate() + days);
    return date.toISOString().split('T')[0];
  }

  /**
   * Merge objects
   */
  static mergeObjects(...objects) {
    return Object.assign({}, ...objects);
  }

  /**
   * Clone object
   */
  static cloneObject(obj) {
    return JSON.parse(JSON.stringify(obj));
  }

  /**
   * Extract values from array of objects
   */
  static extractValues(arrayOfObjects, key) {
    return arrayOfObjects.map((obj) => obj[key]);
  }

  /**
   * Create test scenario data
   */
  static createScenarioData(baseData, overrides = {}) {
    return {
      ...baseData,
      ...overrides,
      timestamp: Date.now(),
    };
  }

  /**
   * Compare objects
   */
  static compareObjects(obj1, obj2) {
    return JSON.stringify(obj1) === JSON.stringify(obj2);
  }

  /**
   * Wait for condition to be true
   */
  static async waitForCondition(condition, timeout = 5000, interval = 100) {
    const startTime = Date.now();
    while (Date.now() - startTime < timeout) {
      if (await condition()) {
        return true;
      }
      await new Promise((resolve) => setTimeout(resolve, interval));
    }
    return false;
  }

  /**
   * Transform array of objects to map
   */
  static arrayToMap(array, keyField) {
    const map = new Map();
    array.forEach((item) => {
      map.set(item[keyField], item);
    });
    return map;
  }

  /**
   * Get nested value from object
   */
  static getNestedValue(obj, path) {
    return path.split('.').reduce((current, prop) => current?.[prop], obj);
  }

  /**
   * Set nested value in object
   */
  static setNestedValue(obj, path, value) {
    const keys = path.split('.');
    const lastKey = keys.pop();
    const target = keys.reduce((current, key) => (current[key] = current[key] || {}), obj);
    target[lastKey] = value;
    return obj;
  }
}

module.exports = DataHelper;
