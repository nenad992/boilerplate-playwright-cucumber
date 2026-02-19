# Quick Start Guide

Get up and running with Playwright + Cucumber boilerplate in 5 minutes!

## 1️⃣ Installation

```bash
# Install dependencies
npm install

# Install Playwright browsers
npm run install:browsers
```

## 2️⃣ Configuration

```bash
# Copy environment template
cp .env.example .env

# Edit .env with your configuration (important!)
# Update BASE_URL, SITE, BROWSER, etc.
```

## 3️⃣ Run Your First Test

```bash
# Run all tests
npm test

# Or run with specific settings
npm run test:smoke      # Run smoke tests
npm run test:site1      # Run tests for site1
npm run test:headed     # Run in headed mode (see browser)
npm run test:debug      # Run in debug mode
```

## 4️⃣ View Results

```bash
# Generate HTML report
npm run report:html

# Generate Allure report
npm run report:allure
npm run report:open
```

## 📝 Writing Your First Test

### 1. Create Feature File

Create `features/example.feature`:

```gherkin
@example @smoke
Feature: Example Feature

  Background:
    Given the user navigates to the login page

  Scenario: Simple login test
    When the user enters valid credentials
    And clicks the login button
    Then the dashboard should be displayed
```

### 2. Step Definitions

Add to `src/step-definitions/example.steps.js`:

```javascript
const { When, Then } = require('@cucumber/cucumber');
const commonContext = require('./common.steps');

When('the user enters valid credentials', async function () {
  const page = commonContext.page;
  await page.fill('input[name="email"]', 'test@example.com');
  await page.fill('input[name="password"]', 'password123');
});

Then('the dashboard should be displayed', async function () {
  const page = commonContext.page;
  const dashboard = await page.$('[data-testid="dashboard"]');
  expect(dashboard).not.toBeNull();
});
```

### 3. Run Test

```bash
npm test
```

## 🏗️ Project Structure Quick Reference

```
📁 features/          → Gherkin feature files
📁 src/
  📁 step-definitions/  → Step implementation
  📁 pages/            → Page Object Models
  📁 helpers/          → Utility helpers
  📁 hooks/            → Before/After setup
📁 config/            → Environment & site configs
📁 data/              → Test data (JSON files)
📁 test-results/      → Test reports (auto-generated)
```

## 🎯 Common Tasks

### Run Specific Tests

```bash
# By tag
npm test -- --tags "@smoke"

# By feature
npm test features/login.feature

# By browser
BROWSER=firefox npm test
BROWSER=webkit npm test
```

### Debug Tests

```bash
# Headed mode (visible browser)
npm run test:headed

# Debug mode
npm run test:debug

# Slow motion
SLOW_MO=1000 npm test
```

### Test Multiple Sites

```bash
# Site 1
npm run test:site1

# Site 2
npm run test:site2
```

### Check Code Quality

```bash
# Lint
npm run lint

# Format
npm run format
```

## 🐳 Using Docker

```bash
# Build image
docker build -t pw-cucumber .

# Run tests
docker run --rm -v $(pwd)/test-results:/app/test-results pw-cucumber

# Or use compose
docker-compose up
```

## 🔧 Useful Commands

```bash
# Install everything
npm install && npm run install:browsers

# Run all checks
npm run lint && npm run format && npm test

# Clean test artifacts
npm run clean

# Watch for changes (with nodemon)
npx nodemon --watch features --watch src npm test
```

## 📚 Key Files to Know

| File                           | Purpose                |
| ------------------------------ | ---------------------- |
| `cucumber.js`                  | Cucumber configuration |
| `config/sites/site1.config.js` | Site-specific settings |
| `config/env.dev.config.js`     | Environment settings   |
| `src/pages/base.page.js`       | Base page object class |
| `src/helpers/*.helper.js`      | Utility functions      |
| `src/hooks/hooks.js`           | Test setup/teardown    |

## 🆘 Troubleshooting

### Tests not running?

```bash
# Make sure .env is configured
cat .env

# Reinstall browsers
npm run install:browsers

# Check node version
node --version  # Should be 18+
```

### Selectors not found?

- Update selectors in step definitions
- Use `npm run test:headed` to see what's happening
- Check browser DevTools for correct selectors

### Authentication failing?

- Verify credentials in .env or config files
- Check if site requires additional headers
- Review API helper for custom authentication

### Flaky tests?

- Use proper waits: `await page.waitForLoadState()`
- Increase timeouts: `TIMEOUT=60000 npm test`
- Check for race conditions in step definitions

## 📖 Learn More

- Full documentation: See [README.md](./README.md)
- Playwright docs: https://playwright.dev
- Cucumber docs: https://cucumber.io
- Gherkin syntax: https://cucumber.io/docs/gherkin/

## 🚀 Next Steps

1. ✅ Update `.env` with your URLs
2. ✅ Modify `config/sites/` for your applications
3. ✅ Create feature files in `features/`
4. ✅ Write step definitions in `src/step-definitions/`
5. ✅ Create page objects in `src/pages/`
6. ✅ Run tests: `npm test`
7. ✅ View reports: `npm run report:html`

---

**Happy Testing! 🎉**

Need help? Check the [README.md](./README.md) or [CONTRIBUTING.md](./CONTRIBUTING.md)
