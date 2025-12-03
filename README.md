# Micro Frontend Platform

A modular, enterprise-grade Micro Frontend Platform built using Next.js 15+, Module Federation, TypeScript, Turborepo, and Federated Build Pipelines.

## Project Overview

This project demonstrates architectural leadership, scalable design patterns, high-level engineering decisions, and a platform thinking mindset. It enables independent teams to build, deploy and scale features without touching each other's codebase.

## Folder Structure

```
/apps
  /host
  /auth
  /dashboard
  /analytics
  /billing
  /admin
  /notifications
/packages
  /ui-kit
  /shared-utils
  /shared-state
  /api-client
  /design-tokens
  /config
```

## Packages

### Shared Packages

1. **@micro-frontend/design-tokens** - Design tokens for consistent styling
2. **@micro-frontend/shared-utils** - Utility functions used across the platform
3. **@micro-frontend/shared-state** - State management solution
4. **@micro-frontend/ui-kit** - Shared component library
5. **@micro-frontend/api-client** - API client for backend communication
6. **@micro-frontend/config** - Configuration utilities

### Applications

1. **host** - Main shell application
2. **auth** - Authentication micro frontend
3. **dashboard** - Dashboard micro frontend
4. **analytics** - Analytics micro frontend
5. **billing** - Billing micro frontend
6. **admin** - Admin micro frontend
7. **notifications** - Notifications micro frontend

## Development Setup

1. Install dependencies:
   ```bash
   pnpm install
   ```

2. Run all applications in development mode:
   ```bash
   pnpm dev:all
   ```

3. Build all applications:
   ```bash
   pnpm build
   ```

## Commands

- `pnpm dev:all` - Run all apps at once
- `pnpm build:affected` - Build only affected packages
- `pnpm build` - Build all packages and apps
- `pnpm test` - Run tests for all packages and apps
- `pnpm lint` - Lint all packages and apps

## Architecture Principles

- **Independence**: Each domain builds & deploys alone
- **Isolation**: No remote mutates another's state
- **Composition over coupling**
- **SSR Compatibility**: Federation works on server & client
- **Zero Shared Implicit Dependencies**: All shared deps explicitly declared
- **Controlled shared libraries**: UI kit, design tokens, network layer, models
- **Versioned contracts**: API surface defined via TypeScript models

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a pull request

## License

This project is licensed under the MIT License - see the LICENSE file for details.