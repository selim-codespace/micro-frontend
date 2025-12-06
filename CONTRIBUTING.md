# Contributing to Micro Frontend Platform

Thank you for your interest in contributing! This guide will help you get started.

## 🚀 Quick Start

### Prerequisites

- Node.js 20.x or higher
- npm 9.x or higher
- Git

### Setup

```bash
# Clone the repository
git clone https://github.com/yourusername/micro-frontend-platform.git
cd micro-frontend-platform

# Install dependencies
npm install

# Start all applications in development mode
npm run dev:all
```

### Ports

| Application   | Port |
| ------------- | ---- |
| Host Shell    | 3000 |
| Auth          | 3001 |
| Dashboard     | 3002 |
| Analytics     | 3003 |
| Billing       | 3004 |
| Admin         | 3005 |
| Notifications | 3006 |

## 📁 Project Structure

```
├── apps/           # Micro frontend applications
├── packages/       # Shared packages
├── e2e/           # End-to-end tests
├── docs/          # Documentation
└── scripts/       # Automation scripts
```

## 🔧 Development Workflow

### Creating a New Micro Frontend

```bash
# Use the CLI generator
npm run create:microfrontend

# Follow the prompts to set up your new micro frontend
```

### Making Changes

1. Create a feature branch: `git checkout -b feature/my-feature`
2. Make your changes
3. Run tests: `npm test`
4. Commit using conventional commits: `git commit -m "feat: add new feature"`
5. Push and create a PR

### Commit Convention

We use [Conventional Commits](https://conventionalcommits.org/):

- `feat:` - New feature
- `fix:` - Bug fix
- `docs:` - Documentation changes
- `style:` - Code style (formatting, etc.)
- `refactor:` - Code refactoring
- `test:` - Adding tests
- `chore:` - Maintenance tasks

## 🧪 Testing

### Unit Tests

```bash
# Run all unit tests
npm test

# Run tests with coverage
npm run test:coverage

# Run tests in watch mode
npm run test:watch
```

### E2E Tests

```bash
# Run Playwright tests
npx playwright test

# Run with UI
npx playwright test --ui
```

## 📦 Building

```bash
# Build all packages and apps
npm run build

# Build only affected packages
npm run build:affected
```

## 🎨 Code Style

- We use ESLint for linting
- We use Prettier for formatting
- TypeScript strict mode is enabled

### Auto-format on save

Add this to your VS Code settings:

```json
{
  "editor.formatOnSave": true,
  "editor.defaultFormatter": "esbenp.prettier-vscode"
}
```

## 📝 Documentation

- Update README.md for significant changes
- Add JSDoc comments to public APIs
- Update ARCHITECTURE.md for architectural changes

## 🤝 Code Review

All PRs require:

1. Passing CI checks
2. At least one approval
3. No unresolved comments

## ❓ Questions?

Open an issue or start a discussion on GitHub.

Thank you for contributing! 🎉
