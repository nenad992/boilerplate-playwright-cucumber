# Playwright + Cucumber (BDD) E2E Testing Boilerplate

A comprehensive, production-ready end-to-end testing boilerplate combining **Playwright** with **Cucumber** for Behavior-Driven Development (BDD). This framework provides a complete testing solution with support for multiple browsers, environments, and sites.

![Node Version](https://img.shields.io/badge/node-%3E%3D18.0.0-brightgreen)
![npm Version](https://img.shields.io/badge/npm-%3E%3D9.0.0-brightgreen)
![License](https://img.shields.io/badge/license-MIT-blue)

## 🎯 Features

### Core Testing Features

- ✅ **BDD with Gherkin** - Write tests in plain English with feature files
- ✅ **Playwright Integration** - Modern browser automation with support for Chromium, Firefox, and WebKit
- ✅ **Page Object Model** - Structured page objects with reusable components
- ✅ **Step Definitions** - Clear separation of concerns with organized step definitions
- ✅ **Hooks** - Before/After scenario setup and teardown
- ✅ **Data-Driven Testing** - Scenario outlines for testing multiple data sets

### Multi-Site & Multi-Environment Support

- ✅ **Multiple Sites** - Easy switching between different sites/applications
- ✅ **Environment Configuration** - Separate configs for dev, staging, and production
- ✅ **Site-Specific Settings** - Customize selectors and credentials per site

### Advanced Features

- ✅ **Reusable Helpers** - Data, assertion, and API helpers
- ✅ **API Testing Support** - Integrated API helper for backend testing
- ✅ **Screenshots & Videos** - Automatic capture on failures
- ✅ **HTML Reports** - Detailed test execution reports
- ✅ **Allure Reporting** - Professional test reports with analytics
- ✅ **CI/CD Ready** - GitHub Actions workflows included
- ✅ **Docker Support** - Containerized testing environment

## 📦 Project Structure

```
boilerplate-playwright-cucumber/
├── .github/
│   └── workflows/
│       └── ci.yml                 # GitHub Actions CI configuration
├── config/
│   ├── env.dev.config.js         # Development environment config
│   ├── env.staging.config.js     # Staging environment config
│   ├── env.prod.config.js        # Production environment config
│   ├── timeouts.config.js        # Timeout settings
│   └── sites/
│       ├── site1.config.js       # Site 1 configuration
│       └── site2.config.js       # Site 2 configuration
├── data/
│   ├── test-data.json            # Test data fixtures
│   └── users.json                # User test data
├── features/
│   ├── login.feature             # Login feature file
│   ├── dashboard.feature         # Dashboard feature file
│   └── user-profile.feature      # User profile feature file
├── src/
│   ├── fixtures/
│   │   └── browser.fixture.js    # Browser fixture setup
│   ├── helpers/
│   │   ├── api.helper.js         # API testing helper
│   │   ├── assertion.helper.js   # Custom assertions
│   │   └── data.helper.js        # Data utilities
│   ├── hooks/
│   │   └── hooks.js              # Before/After hooks
│   ├── pages/
│   │   ├── base.page.js          # Base page object class
│   │   ├── login.page.js         # Login page object
│   │   ├── dashboard.page.js     # Dashboard page object
│   │   └── profile.page.js       # Profile page object
│   └── step-definitions/
│       ├── common.steps.js       # Common step definitions
│       ├── dashboard.steps.js    # Dashboard step definitions
│       └── login.steps.js        # Login step definitions
├── .dockerignore                 # Docker ignore file
├── .env.example                  # Environment variables template
├── .eslintrc.json               # ESLint configuration
├── .gitignore                   # Git ignore file
├── .prettierrc                  # Prettier configuration
├── cucumber.js                  # Cucumber configuration
├── docker-compose.yml           # Docker compose file
├── Dockerfile                   # Docker configuration
├── package.json                 # Project dependencies
└── README.md                    # This file
```

## 🚀 Getting Started

### Prerequisites

- Node.js >= 18.0.0
- npm >= 9.0.0
- Git

### Installation

1. **Clone the repository**

   ```bash
   git clone <repository-url>
   cd boilerplate-playwright-cucumber
   ```

2. **Install dependencies**

   ```bash
   npm install
   ```

3. **Install Playwright browsers**

   ```bash
   npm run install:browsers
   ```

4. **Setup environment variables**
   ```bash
   cp .env.example .env
   # Edit .env with your configuration
   ```

## 📝 Configuration

### Environment Variables

Create a `.env` file based on `.env.example`:

```env
# Environment
ENV=dev
NODE_ENV=development

# Browser
BROWSER=chromium
HEADED=false
SLOW_MO=0

# Site Selection
SITE=site1

# Timeouts
TIMEOUT=30000
EXPECT_TIMEOUT=5000

# Screenshot/Video
SCREENSHOT_ON_FAILURE=true
VIDEO_ON_FAILURE=true

# Debug
DEBUG=false

# Parallel Execution
PARALLEL=1

# Tags Filter
TAGS=@smoke

# Test Data
TEST_USER_EMAIL=test@example.com
TEST_USER_PASSWORD=password123
```

### Environment-Specific Configuration

Edit `config/env.{dev,staging,prod}.config.js`:

```javascript
module.exports = {
  name: 'dev',
  baseUrl: 'https://dev.example.com',
  apiUrl: 'https://api-dev.example.com',
  headless: false,
  slowMo: 100,
  timeout: 30000,
  retries: 0,
};
```

### Site-Specific Configuration

Edit `config/sites/{site1,site2}.config.js`:

```javascript
module.exports = {
  name: 'site1',
  baseUrl: 'https://site1.example.com',
  apiUrl: 'https://api1.example.com',
  credentials: {
    username: 'user@site1.com',
    password: 'password123',
  },
  features: {
    auth: true,
    dashboard: true,
  },
};
```

## 🧪 Writing Tests

### Feature Files (Gherkin)

Create feature files in `features/` directory:

```gherkin
@login @smoke
Feature: User Authentication

  Background:
    Given the user navigates to the login page

  @critical
  Scenario: Successful login with valid credentials
    When the user enters valid credentials
    And clicks the login button
    Then the user should be logged in successfully
    And the dashboard should be displayed

  @regression
  Scenario Outline: Login with different credentials
    When the user enters username "<username>"
    And the user enters password "<password>"
    And clicks the login button
    Then the login result should be "<result>"

    Examples:
      | username          | password    | result  |
      | valid@example.com | correct123  | success |
      | invalid@test.com  | wrong       | failure |
```

### Step Definitions

Create step definitions in `src/step-definitions/`:

```javascript
const { Given, When, Then } = require('@cucumber/cucumber');
const { expect } = require('@playwright/test');

Given('the user navigates to the login page', async function () {
  const page = this.page; // Access page from hooks
  await page.goto('https://example.com/login');
});

When('the user enters valid credentials', async function () {
  const page = this.page;
  await page.fill('input[name="username"]', 'valid@example.com');
  await page.fill('input[name="password"]', 'password123');
});

Then('the user should be logged in successfully', async function () {
  const page = this.page;
  await page.waitForNavigation();
  const url = page.url();
  expect(url).toContain('/dashboard');
});
```

### Page Objects

Create page objects in `src/pages/`:

```javascript
const BasePage = require('./base.page');

class LoginPage extends BasePage {
  constructor(page) {
    super(page);
    this.usernameInput = 'input[name="username"]';
    this.passwordInput = 'input[name="password"]';
    this.loginButton = 'button[type="submit"]';
  }

  async login(username, password) {
    await this.fillInput(this.usernameInput, username);
    await this.fillInput(this.passwordInput, password);
    await this.clickElement(this.loginButton);
    await this.waitForNavigation();
  }
}

module.exports = LoginPage;
```

## 🎮 Running Tests

### Basic Commands

```bash
# Run all tests
npm test

# Run tests in headed mode (see browser)
npm run test:headed

# Run tests in debug mode
npm run test:debug

# Run specific browser
npm run test:chrome
npm run test:firefox
npm run test:safari

# Run tests in parallel
npm run test:parallel
```

### Running by Tags

```bash
# Run smoke tests
npm run test:smoke

# Run regression tests
npm run test:regression

# Run critical tests
npm run test:critical

# Custom tags (set TAGS env var)
TAGS="@smoke and @login" npm test
```

### Running by Site

```bash
# Run tests on site1
npm run test:site1

# Run tests on site2
npm run test:site2
```

### Running by Environment

```bash
# Development environment
npm run test:dev

# Staging environment
npm run test:staging

# Production environment
npm run test:prod
```

## 📊 Reports

### HTML Report

```bash
# Generate HTML report
npm run report:html

# Open Allure report
npm run report:open
```

Reports are generated in `test-results/` directory with:

- `cucumber-report.html` - Detailed test report
- `cucumber-report.json` - JSON format for integration
- Screenshots and videos in `test-results/screenshots/`

### Allure Report

```bash
# Generate Allure report
npm run report:allure

# Open Allure report
npm run report:open
```

## 🐳 Docker Usage

### Build and Run

```bash
# Build Docker image
docker build -t playwright-cucumber:latest .

# Run tests in Docker
docker run --rm -v $(pwd)/test-results:/app/test-results playwright-cucumber:latest

# Run with specific environment
docker run --rm -e ENV=staging -e SITE=site1 playwright-cucumber:latest
```

### Docker Compose

```bash
# Run tests with docker-compose
docker-compose up

# Run specific service
docker-compose up playwright-cucumber-tests

# Clean up
docker-compose down
```

## 🔧 Using Helpers

### Data Helper

```javascript
const DataHelper = require('./src/helpers/data.helper');

// Load test data
const testData = DataHelper.loadTestData('test-data.json');

// Generate random email
const email = DataHelper.generateRandomEmail();

// Get test user
const user = DataHelper.getTestUser();
```

### Assertion Helper

```javascript
const AssertionHelper = require('./src/helpers/assertion.helper');

// Assert element visible
await AssertionHelper.assertElementVisible(page, '#element');

// Assert text contains
await AssertionHelper.assertElementTextContains(page, 'h1', 'Welcome');

// Assert URL contains
await AssertionHelper.assertUrlContains(page, '/dashboard');
```

### API Helper

```javascript
const APIHelper = require('./src/helpers/api.helper');

const apiHelper = new APIHelper(page);

// Make GET request
const response = await apiHelper.get('/api/users');

// Make POST request with data
const newUser = await apiHelper.post('/api/users', { name: 'John' });

// Request with authentication
const data = await apiHelper.getWithAuth('/api/protected', token);
```

## 🔌 Hooks

The `src/hooks/hooks.js` file provides:

- **BeforeAll**: Global setup before tests
- **Before**: Setup before each scenario (browser, context, page)
- **After**: Cleanup after each scenario (screenshots on failure)
- **AfterAll**: Global teardown

Customize hooks for your needs:

```javascript
Before(async function ({ pickle }) {
  console.log(`Running: ${pickle.name}`);
  // Custom setup
});

After(async function ({ result }) {
  if (result.status === 'FAILED') {
    // Custom failure handling
  }
});
```

## 📚 Test Data

### Using Test Data Files

```javascript
// data/test-data.json
const DataHelper = require('../src/helpers/data.helper');
const testData = DataHelper.loadTestData('test-data.json');

const user = testData.users[0];
```

### Data-Driven Testing

```gherkin
Scenario Outline: Test with multiple data sets
  When the user enters "<username>"
  And the user enters "<password>"
  Then the result should be "<expected>"

Examples:
  | username  | password | expected |
  | user1     | pass1    | success  |
  | user2     | pass2    | success  |
```

## 🚀 CI/CD Integration

### GitHub Actions

The `.github/workflows/ci.yml` includes:

- **Multiple browsers** (Chromium, Firefox, WebKit)
- **Multiple Node versions** (18.x, 20.x)
- **Multiple sites** (site1, site2)
- **Test artifact uploads**
- **Allure report generation**
- **Code quality checks** (linting, formatting)

Tests run on:

- Every push to main/develop
- Every pull request
- Daily schedule (2 AM UTC)

### Running Locally with CI Config

```bash
# Install dependencies
npm ci

# Run linter
npm run lint

# Run with CI settings
NODE_ENV=ci npm test
```

## 🛠️ Development

### Code Quality

```bash
# Lint code
npm run lint

# Format code
npm run format

# Check formatting
npm run format -- --check
```

### Adding New Features

1. **Create feature file** in `features/`
2. **Write step definitions** in `src/step-definitions/`
3. **Create page objects** in `src/pages/` if needed
4. **Add test data** in `data/`
5. **Run tests** and verify

### Best Practices

- ✅ Use Page Object Model for better maintainability
- ✅ Keep step definitions simple and reusable
- ✅ Use meaningful assertion messages
- ✅ Organize test data in JSON files
- ✅ Create helper methods for common operations
- ✅ Tag tests appropriately (@smoke, @regression, @critical)
- ✅ Use timeouts wisely (not hardcoded waits)
- ✅ Keep feature files focused on business logic

## 📋 Common Issues & Solutions

### Tests Timing Out

```bash
# Increase timeout in .env
TIMEOUT=60000

# Or in specific step
await page.waitForSelector(selector, { timeout: 60000 });
```

### Browser Not Found

```bash
# Reinstall browsers
npm run install:browsers
```

### Flaky Tests

```bash
# Use proper waits instead of sleep
await page.waitForLoadState('networkidle');
await page.waitForSelector(selector);

# Increase retry count in config
retries: 2
```

### Authentication Issues

```bash
# Check credentials in .env or config files
# Verify API tokens are valid
# Check SSL certificate issues with insecure mode
```

## 📖 Resources

- [Playwright Documentation](https://playwright.dev)
- [Cucumber.js Documentation](https://github.com/cucumber/cucumber-js)
- [Gherkin Syntax Guide](https://cucumber.io/docs/gherkin/)
- [BDD Best Practices](https://cucumber.io/docs/bdd/)

## 📝 License

This project is licensed under the MIT License - see the LICENSE file for details.

## 👥 Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📧 Support

For issues, questions, or suggestions, please create an issue in the repository.

## ✨ Acknowledgments

This boilerplate combines best practices from:

- Playwright testing framework
- Cucumber BDD methodology
- Page Object Model pattern
- CI/CD automation

---

**Happy Testing! 🚀**
