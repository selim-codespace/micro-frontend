# Development Guide

## Getting Started

1. Install dependencies for all packages and apps:
   ```bash
   pnpm install
   ```

2. Run all applications in development mode:
   ```bash
   pnpm dev:all
   ```

   Or run each application individually:
   ```bash
   # In terminal 1 - Host application
   cd apps/host
   pnpm dev
   
   # In terminal 2 - Auth application
   cd apps/auth
   pnpm dev
   
   # In terminal 3 - Dashboard application
   cd apps/dashboard
   pnpm dev
   ```

## Application Ports

- Host: http://localhost:3000
- Auth: http://localhost:3001
- Dashboard: http://localhost:3002
- Analytics: http://localhost:3003
- Billing: http://localhost:3004
- Admin: http://localhost:3005
- Notifications: http://localhost:3006

## Building Applications

To build all applications:
```bash
pnpm build
```

To build only affected applications:
```bash
pnpm build:affected
```

## Testing

To run tests for all applications:
```bash
pnpm test
```

## Linting

To lint all applications:
```bash
pnpm lint
```

## Project Structure

```
/apps
  /host          # Host application (shell)
  /auth          # Authentication micro frontend
  /dashboard     # Dashboard micro frontend
  /analytics     # Analytics micro frontend
  /billing       # Billing micro frontend
  /admin         # Admin micro frontend
  /notifications # Notifications micro frontend
/packages
  /ui-kit        # Shared UI components
  /shared-utils  # Utility functions
  /shared-state  # State management
  /api-client    # API client
  /design-tokens # Design tokens
  /config        # Configuration utilities
```

## Module Federation

Each micro frontend exposes components that can be consumed by other applications:

- Host exposes: Layout component
- Auth exposes: LoginForm and RegisterForm components
- Dashboard exposes: DashboardPage component

## Adding New Micro Frontends

1. Create a new directory in `/apps` with the micro frontend name
2. Create package.json with appropriate dependencies
3. Set up Module Federation configuration
4. Implement the micro frontend functionality
5. Expose components for consumption by other apps