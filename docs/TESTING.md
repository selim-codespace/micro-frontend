# Testing Documentation

## Overview

The Micro Frontend Platform follows a comprehensive testing strategy that includes unit tests, integration tests, and contract tests.

## Testing Strategy

### Unit Tests
- Use Jest and React Testing Library
- Test individual components and functions in isolation
- Mock external dependencies
- Target 85%+ code coverage

### Integration Tests
- Use Playwright for end-to-end testing
- Test interactions between host and remote applications
- Validate cross-app navigation
- Test shared state synchronization

### Contract Tests
- Use TypeScript interfaces for type safety
- Validate API contracts between micro frontends
- Ensure compatibility between different versions

## Testing Tools

### Jest
Jest is used for unit testing JavaScript and TypeScript code.

### React Testing Library
React Testing Library is used for testing React components.

### Playwright
Playwright is used for end-to-end testing across multiple browsers.

## Test Structure

Tests are organized by package and application:

```
/apps
  /host
    /__tests__
  /auth
    /__tests__
  /dashboard
    /__tests__
/packages
  /ui-kit
    /__tests__
  /shared-utils
    /__tests__
  /shared-state
    /__tests__
  /api-client
    /__tests__
```

## Writing Tests

### Unit Tests
```typescript
import { render, screen } from '@testing-library/react';
import { Button } from '@ui-kit';

describe('Button', () => {
  it('renders correctly', () => {
    render(<Button>Click me</Button>);
    expect(screen.getByText('Click me')).toBeInTheDocument();
  });
});
```

### Integration Tests
```typescript
import { test, expect } from '@playwright/test';

test('should navigate to dashboard', async ({ page }) => {
  await page.goto('http://localhost:3000');
  await page.click('text=Dashboard');
  await expect(page).toHaveURL('http://localhost:3000/dashboard');
});
```

## Running Tests

### Run All Tests
```bash
pnpm test
```

### Run Unit Tests
```bash
pnpm test:unit
```

### Run Integration Tests
```bash
pnpm test:integration
```

### Run Tests for Specific Package
```bash
cd packages/ui-kit
pnpm test
```

## Code Coverage

The project aims for 85%+ code coverage. Coverage reports are generated automatically when running tests.

## Best Practices

1. **Write tests first** - Follow TDD principles when possible
2. **Test behavior, not implementation** - Focus on what the code does, not how it does it
3. **Keep tests isolated** - Each test should be independent of others
4. **Use descriptive test names** - Test names should clearly describe what is being tested
5. **Mock external dependencies** - Isolate the code under test from external systems
6. **Test edge cases** - Include tests for error conditions and boundary cases
7. **Maintain test quality** - Keep tests clean and readable
8. **Run tests regularly** - Run tests locally before pushing code

## Continuous Integration

All tests are run automatically in the CI pipeline:
1. On every pull request
2. Before merging to main branch
3. After deployment to staging

## Test Reporting

Test results are reported in the CI pipeline and can be viewed in the GitHub Actions interface.