const {
  Before,
  After,
  BeforeAll,
  AfterAll,
  Status,
  setWorldConstructor,
} = require('@cucumber/cucumber');
const { chromium, firefox, webkit } = require('@playwright/test');
const path = require('path');
const fs = require('fs');
require('dotenv').config();

let browser = null;

/**
 * World constructor for Cucumber context
 */
class TestWorld {
  constructor() {
    this.browser = null;
    this.browserContext = null;
    this.page = null;
  }
}

setWorldConstructor(TestWorld);

/**
 * Get browser type based on environment variable
 */
function getBrowserType() {
  const browserType = (process.env.BROWSER || 'chromium').toLowerCase();
  const browserMap = {
    chromium: chromium,
    firefox: firefox,
    safari: webkit,
    webkit: webkit,
  };
  return browserMap[browserType] || chromium;
}

/**
 * Get launch options for browser
 */
function getBrowserLaunchOptions() {
  return {
    headless: process.env.HEADED !== 'true',
    slowMo: parseInt(process.env.SLOW_MO || '0'),
    args: ['--disable-blink-features=AutomationControlled'],
  };
}

/**
 * Create results directory
 */
function createResultsDirectory() {
  const dir = 'test-results';
  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir, { recursive: true });
  }
}

/**
 * Global setup before any tests run
 */
BeforeAll(async function () {
  console.log('🚀 Starting Playwright Browser');
  createResultsDirectory();
});

/**
 * Setup before each scenario
 */
Before(async function ({ pickle }) {
  console.log(`\n📋 Running scenario: ${pickle.name}`);

  try {
    const BrowserType = getBrowserType();
    const launchOptions = getBrowserLaunchOptions();

    // Launch browser if not already running
    if (!browser) {
      browser = await BrowserType.launch(launchOptions);
    }

    // Create new context for each scenario (isolates data)
    this.browserContext = await browser.newContext({
      recordVideo: process.env.VIDEO_ON_FAILURE === 'true' ? { dir: 'videos' } : undefined,
      recordHar: { path: `test-results/${pickle.name.replace(/\s+/g, '_')}.har` },
    });

    // Create new page for the scenario
    this.page = await this.browserContext.newPage();

    // Set viewport
    await this.page.setViewportSize({ width: 1280, height: 720 });

    // Set test timeout
    this.page.setDefaultTimeout(parseInt(process.env.TIMEOUT || '30000'));
    this.page.setDefaultNavigationTimeout(parseInt(process.env.NAVIGATION_TIMEOUT || '30000'));

    console.log(`✅ Browser initialized for scenario: ${pickle.name}`);
  } catch (error) {
    console.error('❌ Error during browser setup:', error);
    throw error;
  }
});

/**
 * Cleanup after each scenario
 */
After(async function ({ pickle, result }) {
  try {
    // Create directories if needed
    const screenshotDir = 'test-results/screenshots';
    if (!fs.existsSync(screenshotDir)) {
      fs.mkdirSync(screenshotDir, { recursive: true });
    }

    // Take screenshot on failure
    if (result.status === Status.FAILED && this.page) {
      try {
        const timestamp = new Date().toISOString().replace(/[:.]/g, '-');
        const scenarioName = pickle.name.replace(/\s+/g, '_');
        const screenshotPath = path.join(screenshotDir, `${scenarioName}-${timestamp}.png`);

        await this.page.screenshot({ path: screenshotPath, fullPage: true });
        console.log(`📸 Screenshot saved to ${screenshotPath}`);
      } catch (screenshotError) {
        console.warn(`⚠️  Failed to take screenshot: ${screenshotError.message}`);
      }
    }

    // Close page and context
    if (this.page) {
      await this.page.close();
      this.page = null;
    }

    if (this.browserContext) {
      await this.browserContext.close();
      this.browserContext = null;
    }

    // Print result
    const statusIcon = {
      PASSED: '✅',
      FAILED: '❌',
      SKIPPED: '⏭️',
      PENDING: '⏳',
      UNDEFINED: '❓',
      AMBIGUOUS: '⚠️',
    };

    console.log(`${statusIcon[result.status] || '❓'} Scenario ${result.status.toLowerCase()}`);
  } catch (error) {
    console.error('❌ Error during cleanup:', error);
  }
});

/**
 * Global teardown after all tests
 */
AfterAll(async function () {
  if (browser) {
    await browser.close();
    console.log('🏁 Browser closed');
  }
});

/**
 * Handle test timeouts
 */
process.on('unhandledRejection', (reason, promise) => {
  console.error('Unhandled Rejection at:', promise, 'reason:', reason);
});
