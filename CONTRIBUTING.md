# Contributing to Playwright + Cucumber Boilerplate

Thank you for considering contributing to this project! Here are some guidelines to help you get started.

## Getting Started

1. Fork the repository
2. Clone your fork: `git clone https://github.com/your-username/boilerplate-playwright-cucumber.git`
3. Create a feature branch: `git checkout -b feature/your-feature`
4. Make your changes
5. Test your changes: `npm test`
6. Commit your changes: `git commit -m 'Add feature: description'`
7. Push to your fork: `git push origin feature/your-feature`
8. Create a Pull Request

## Code Standards

### JavaScript Style

We follow ESLint and Prettier configurations. Before submitting a PR:

```bash
# Lint the code
npm run lint

# Format the code
npm run format
```

### Writing Tests

- Use meaningful test descriptions
- Follow the Arrange-Act-Assert pattern
- Keep tests focused and independent
- Use appropriate tags (@smoke, @regression, @critical)
- Add tests to `features/` in Gherkin format
- Implement corresponding step definitions

### Feature Files

Good practice example:

```gherkin
@feature-name @smoke
Feature: Feature description

  Background:
    Given common setup steps

  @critical
  Scenario: Specific scenario
    When action happens
    Then expected result occurs

  Scenario Outline: Multiple scenarios
    When user action with "<data>"
    Then result is "<expected>"

    Examples:
      | data | expected |
      | x    | y        |
```

### Step Definitions

- Keep steps simple and reusable
- Follow Given-When-Then structure
- Use meaningful step names
- Extract common logic to helpers

### Page Objects

- Extend `BasePage` class
- Define selectors as class properties
- Create methods for user interactions
- Keep page-related logic isolated

## Commit Messages

Use clear, descriptive commit messages:

```
feat: Add new login feature
fix: Fix authentication bug
refactor: Reorganize page objects
docs: Update README with new configuration
test: Add test for dashboard functionality
chore: Update dependencies
```

## Pull Request Process

1. Update the README.md with details of changes if applicable
2. Update configuration files if needed
3. Add appropriate tags to your feature files
4. Ensure all tests pass: `npm test`
5. Ensure code is formatted: `npm run format`
6. Ensure linting passes: `npm run lint`
7. Provide a clear description of your changes

## Reporting Issues

When reporting issues, please include:

1. A clear description of the issue
2. Steps to reproduce
3. Expected behavior vs actual behavior
4. Environment details (OS, Node version, browsers)
5. Screenshots or test output if applicable

## Feature Requests

When suggesting features:

1. Provide a clear use case
2. Explain the benefit
3. Provide examples if possible
4. Consider backwards compatibility

## Testing Guidelines

### Adding New Tests

1. Create feature file in `features/`
2. Write clear, business-readable Gherkin syntax
3. Implement step definitions in `src/step-definitions/`
4. Create page objects if testing new pages
5. Add appropriate test data to `data/`
6. Tag tests appropriately

### Test Tags

- `@smoke` - Quick sanity tests
- `@regression` - Comprehensive tests
- `@critical` - High-priority features
- `@skip` - Temporarily skip tests (remove before PR)

### Test Execution

```bash
# Run all tests
npm test

# Run specific tag
TAGS="@smoke" npm test

# Run specific site
npm run test:site1

# Run specific environment
npm run test:staging
```

## Documentation

- Keep README.md updated
- Document new features
- Add comments for complex logic
- Update examples if behavior changes

## Performance

Consider performance when contributing:

- Use proper waits instead of hardcoded delays
- Optimize selectors (prefer data-testid)
- Reuse page objects and helpers
- Consider test data efficiency

## Questions?

Feel free to open an issue for questions or discussions about the project.

## Code of Conduct

- Be respectful and inclusive
- Avoid discriminatory language
- Give credit where due
- Help others learn

---

Thank you for contributing! Your improvements make this boilerplate better for everyone! 🎉
