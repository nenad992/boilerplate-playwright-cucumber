/**
 * API Helper
 * Utility for making API requests and handling API interactions
 */

class APIHelper {
  constructor(page) {
    this.page = page;
    this.baseURL = process.env.API_BASE_URL || 'https://api.example.com';
    this.timeout = parseInt(process.env.API_TIMEOUT || '10000');
  }

  /**
   * Make GET request
   */
  async get(endpoint, options = {}) {
    const url = `${this.baseURL}${endpoint}`;
    const response = await this.page.request.get(url, {
      timeout: this.timeout,
      ...options,
    });
    return this.handleResponse(response);
  }

  /**
   * Make POST request
   */
  async post(endpoint, data = {}, options = {}) {
    const url = `${this.baseURL}${endpoint}`;
    const response = await this.page.request.post(url, {
      data: data,
      timeout: this.timeout,
      ...options,
    });
    return this.handleResponse(response);
  }

  /**
   * Make PUT request
   */
  async put(endpoint, data = {}, options = {}) {
    const url = `${this.baseURL}${endpoint}`;
    const response = await this.page.request.put(url, {
      data: data,
      timeout: this.timeout,
      ...options,
    });
    return this.handleResponse(response);
  }

  /**
   * Make PATCH request
   */
  async patch(endpoint, data = {}, options = {}) {
    const url = `${this.baseURL}${endpoint}`;
    const response = await this.page.request.patch(url, {
      data: data,
      timeout: this.timeout,
      ...options,
    });
    return this.handleResponse(response);
  }

  /**
   * Make DELETE request
   */
  async delete(endpoint, options = {}) {
    const url = `${this.baseURL}${endpoint}`;
    const response = await this.page.request.delete(url, {
      timeout: this.timeout,
      ...options,
    });
    return this.handleResponse(response);
  }

  /**
   * Make HEAD request
   */
  async head(endpoint, options = {}) {
    const url = `${this.baseURL}${endpoint}`;
    const response = await this.page.request.head(url, {
      timeout: this.timeout,
      ...options,
    });
    return this.handleResponse(response);
  }

  /**
   * Handle API response
   */
  async handleResponse(response) {
    const status = response.status();
    const statusText = response.statusText();

    let body = null;
    try {
      body = await response.json();
    } catch (e) {
      body = await response.text();
    }

    return {
      status,
      statusText,
      body,
      ok: response.ok(),
      headers: response.headers(),
      url: response.url(),
    };
  }

  /**
   * Get request with JWT token
   */
  async getWithAuth(endpoint, token, options = {}) {
    return this.get(endpoint, {
      headers: {
        Authorization: `Bearer ${token}`,
        ...options.headers,
      },
      ...options,
    });
  }

  /**
   * Post request with JWT token
   */
  async postWithAuth(endpoint, data, token, options = {}) {
    return this.post(endpoint, data, {
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json',
        ...options.headers,
      },
      ...options,
    });
  }

  /**
   * Wait for API response
   */
  async waitForResponse(urlPattern, timeout = 30000) {
    return this.page.waitForResponse((response) => response.url().includes(urlPattern), {
      timeout,
    });
  }

  /**
   * Wait for API request
   */
  async waitForRequest(urlPattern, timeout = 30000) {
    return this.page.waitForRequest((request) => request.url().includes(urlPattern), { timeout });
  }

  /**
   * Mock API response - intercept and return custom response
   */
  async mockApiResponse(urlPattern, responseData, statusCode = 200) {
    await this.page.route(
      (url) => url.toString().includes(urlPattern),
      async (route) => {
        await route.fulfill({
          status: statusCode,
          contentType: 'application/json',
          body: JSON.stringify(responseData),
        });
      }
    );
  }

  /**
   * Mock API error response - intercept and return error
   */
  async mockApiError(urlPattern, statusCode = 500, errorMessage = 'Internal Server Error') {
    await this.mockApiResponse(urlPattern, { error: errorMessage }, statusCode);
  }

  /**
   * Unroute/stop mocking API endpoint
   */
  async unmockApiResponse(urlPattern) {
    await this.page.unroute((url) => url.toString().includes(urlPattern));
  }

  /**
   * Start tracking API requests
   */
  startRequestTracking() {
    if (!this.requestTracker) {
      this.requestTracker = {
        requests: [],
        responses: [],
      };

      this.page.on('request', (request) => {
        this.requestTracker.requests.push({
          url: request.url(),
          method: request.method(),
          headers: request.headers(),
          timestamp: Date.now(),
        });
      });

      this.page.on('response', (response) => {
        this.requestTracker.responses.push({
          url: response.url(),
          status: response.status(),
          headers: response.headers(),
          timestamp: Date.now(),
        });
      });
    }
  }

  /**
   * Stop tracking API requests and return collected data
   */
  stopRequestTracking() {
    const data = this.requestTracker || { requests: [], responses: [] };
    this.requestTracker = null;
    return data;
  }

  /**
   * Get all tracked network requests
   */
  async getAllRequests() {
    if (!this.requestTracker) {
      throw new Error('Request tracking not started. Call startRequestTracking() first.');
    }
    return this.requestTracker.requests;
  }

  /**
   * Get API metrics (responses with timing and status)
   */
  async getApiMetrics() {
    if (!this.requestTracker) {
      throw new Error('Request tracking not started. Call startRequestTracking() first.');
    }
    return {
      totalRequests: this.requestTracker.requests.length,
      totalResponses: this.requestTracker.responses.length,
      requests: this.requestTracker.requests,
      responses: this.requestTracker.responses,
    };
  }

  /**
   * Validate response structure
   */
  validateResponseStructure(response, expectedKeys) {
    const responseBody = response.body;
    for (const key of expectedKeys) {
      if (!(key in responseBody)) {
        throw new Error(`Missing key "${key}" in response`);
      }
    }
    return true;
  }

  /**
   * Extract data from response
   */
  extractData(response, path) {
    const keys = path.split('.');
    return keys.reduce((current, key) => current?.[key], response.body);
  }
}

module.exports = APIHelper;
