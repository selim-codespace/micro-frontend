# 🏗️ Architecture Documentation

## Overview

The Micro Frontend Platform is an enterprise-grade application demonstrating scalable frontend architecture patterns used by major tech companies. This document details the technical architecture, design decisions, and implementation patterns.

## System Architecture

```
┌─────────────────────────────────────────────────────────────────────────────┐
│                              BROWSER/CLIENT                                  │
└─────────────────────────────────────────────────────────────────────────────┘
                                      │
                                      ▼
┌─────────────────────────────────────────────────────────────────────────────┐
│                         HOST SHELL (Port 3000)                               │
│  ┌─────────────────────────────────────────────────────────────────────┐   │
│  │                         Module Federation Runtime                     │   │
│  │  • Loads remote entries from micro frontend URLs                     │   │
│  │  • Manages shared dependency versions (React, React-DOM)             │   │
│  │  • Handles fallbacks when remotes unavailable                        │   │
│  └─────────────────────────────────────────────────────────────────────┘   │
│                                                                              │
│  ┌──────────────┬──────────────┬──────────────┬──────────────┬─────────┐   │
│  │  Navigation  │  Auth State  │    Theme     │   Layout     │ Router  │   │
│  └──────────────┴──────────────┴──────────────┴──────────────┴─────────┘   │
└─────────────────────────────────────────────────────────────────────────────┘
          │               │               │               │
          ▼               ▼               ▼               ▼
┌───────────────┐ ┌───────────────┐ ┌───────────────┐ ┌───────────────┐
│  AUTH (3001)  │ │DASHBOARD(3002)│ │ANALYTICS(3003)│ │ BILLING(3004) │
│  ───────────  │ │  ───────────  │ │  ───────────  │ │  ───────────  │
│  LoginForm    │ │  DashboardPage│ │  AnalyticsPage│ │  BillingPage  │
│  RegisterForm │ │  Widgets      │ │  Charts       │ │  Plans        │
└───────────────┘ └───────────────┘ └───────────────┘ └───────────────┘
          │               │               │               │
          └───────────────┴───────────────┴───────────────┘
                                    │
                                    ▼
┌─────────────────────────────────────────────────────────────────────────────┐
│                           SHARED PACKAGES                                    │
│  ┌──────────────┐ ┌──────────────┐ ┌──────────────┐ ┌──────────────┐       │
│  │   ui-kit     │ │ shared-state │ │  api-client  │ │design-tokens │       │
│  │  ──────────  │ │  ──────────  │ │  ──────────  │ │  ──────────  │       │
│  │  Components  │ │  Zustand     │ │  HTTP Client │ │  CSS Vars    │       │
│  │  Button,Card │ │  useAuth()   │ │  Types       │ │  Colors      │       │
│  └──────────────┘ └──────────────┘ └──────────────┘ └──────────────┘       │
└─────────────────────────────────────────────────────────────────────────────┘
```

## Directory Structure

```
micro-frontend-platform/
├── apps/                           # Micro Frontend Applications
│   ├── host/                       # Shell application (Port 3000)
│   │   ├── pages/                  # Next.js Pages Router
│   │   │   ├── _app.tsx           # Global app wrapper
│   │   │   ├── _document.tsx      # HTML document customization
│   │   │   ├── index.tsx          # Landing page
│   │   │   ├── dashboard.tsx      # Dashboard page
│   │   │   ├── analytics.tsx      # Analytics page
│   │   │   ├── auth.tsx           # Auth page
│   │   │   ├── billing.tsx        # Billing page
│   │   │   ├── admin.tsx          # Admin page
│   │   │   └── notifications.tsx  # Notifications page
│   │   ├── components/            # Host-specific components
│   │   │   └── Layout.tsx         # Sidebar layout
│   │   ├── styles/
│   │   │   └── globals.css        # Design system & utilities
│   │   ├── types/
│   │   │   └── remotes.d.ts       # Module Federation types
│   │   └── next.config.js         # MF configuration
│   │
│   ├── auth/                       # Auth micro frontend (Port 3001)
│   │   ├── pages/
│   │   ├── components/
│   │   │   ├── LoginForm.tsx      # Exposed via MF
│   │   │   └── RegisterForm.tsx   # Exposed via MF
│   │   └── next.config.js
│   │
│   ├── dashboard/                  # Dashboard micro frontend (Port 3002)
│   ├── analytics/                  # Analytics micro frontend (Port 3003)
│   ├── billing/                    # Billing micro frontend (Port 3004)
│   ├── admin/                      # Admin micro frontend (Port 3005)
│   └── notifications/              # Notifications micro frontend (Port 3006)
│
├── packages/                       # Shared Packages
│   ├── ui-kit/                    # Component library
│   ├── design-tokens/             # Design variables
│   ├── shared-state/              # State management
│   ├── shared-utils/              # Utility functions
│   ├── api-client/                # HTTP client
│   └── config/                    # Shared configuration
│
├── e2e/                           # End-to-end tests
└── docs/                          # Documentation
```

## Module Federation Configuration

### Host Configuration

```javascript
// apps/host/next.config.js
const { NextFederationPlugin } = require("@module-federation/nextjs-mf");

module.exports = {
  webpack(config, options) {
    config.plugins.push(
      new NextFederationPlugin({
        name: "host",
        remotes: {
          auth: `auth@${AUTH_URL}/_next/static/chunks/remoteEntry.js`,
          dashboard: `dashboard@${DASHBOARD_URL}/_next/static/chunks/remoteEntry.js`,
          // ... other remotes
        },
        shared: {
          react: { singleton: true, requiredVersion: false },
          "react-dom": { singleton: true, requiredVersion: false },
        },
      })
    );
    return config;
  },
};
```

### Remote Configuration

```javascript
// apps/auth/next.config.js
module.exports = {
  webpack(config) {
    config.plugins.push(
      new NextFederationPlugin({
        name: "auth",
        filename: "static/chunks/remoteEntry.js",
        exposes: {
          "./LoginForm": "./components/LoginForm",
          "./RegisterForm": "./components/RegisterForm",
        },
        shared: {
          react: { singleton: true },
          "react-dom": { singleton: true },
        },
      })
    );
    return config;
  },
};
```

## Design System

### CSS Custom Properties

```css
:root {
  /* Primary Colors */
  --primary-400: #818cf8;
  --primary-500: #6366f1;
  --primary-600: #4f46e5;

  /* Neutrals */
  --neutral-100: #f4f4f5;
  --neutral-900: #18181b;

  /* Spacing Scale */
  --space-xs: 0.25rem;
  --space-sm: 0.5rem;
  --space-md: 1rem;
  --space-lg: 1.5rem;
  --space-xl: 2rem;

  /* Typography */
  --font-family: "Inter", sans-serif;

  /* Effects */
  --glass-bg: rgba(255, 255, 255, 0.05);
  --glass-border: rgba(255, 255, 255, 0.1);
}
```

### Component Patterns

```tsx
// Glassmorphism Card
<div className="card">
  {/* Background blur + subtle border + transparency */}
</div>

// Gradient Text
<h1 className="gradient-text">Micro Frontend</h1>

// Animated Elements
<div className="animate-slide-up delay-2">Content</div>
```

## State Management

### Shared State Package

```typescript
// packages/shared-state/src/stores/authStore.ts
import { create } from "zustand";

interface AuthState {
  user: User | null;
  isAuthenticated: boolean;
  login: (user: User) => void;
  logout: () => void;
}

export const useAuthStore = create<AuthState>((set) => ({
  user: null,
  isAuthenticated: false,
  login: (user) => set({ user, isAuthenticated: true }),
  logout: () => set({ user: null, isAuthenticated: false }),
}));
```

### Cross-MF Communication

```typescript
// Event-based communication
window.dispatchEvent(
  new CustomEvent("auth:login", {
    detail: { user },
  })
);

// In consuming micro frontend
useEffect(() => {
  const handler = (e) => setUser(e.detail.user);
  window.addEventListener("auth:login", handler);
  return () => window.removeEventListener("auth:login", handler);
}, []);
```

## Build & Deployment

### Turborepo Pipeline

```json
// turbo.json
{
  "pipeline": {
    "build": {
      "dependsOn": ["^build"],
      "outputs": [".next/**", "dist/**"]
    },
    "dev": {
      "cache": false,
      "persistent": true
    },
    "test": {
      "dependsOn": ["build"],
      "outputs": ["coverage/**"]
    }
  }
}
```

### Vercel Deployment

Each micro frontend deploys independently:

| App       | Vercel Project           | URL                  |
| --------- | ------------------------ | -------------------- |
| Host      | micro-frontend-host      | host.vercel.app      |
| Auth      | micro-frontend-auth      | auth.vercel.app      |
| Dashboard | micro-frontend-dashboard | dashboard.vercel.app |

Environment variables configure remote URLs:

```
AUTH_URL=https://auth.vercel.app
DASHBOARD_URL=https://dashboard.vercel.app
```

## Testing Strategy

### Unit Tests (Jest + RTL)

```typescript
// __tests__/LoginForm.test.tsx
describe("LoginForm", () => {
  it("validates email format", async () => {
    render(<LoginForm />);
    fireEvent.change(screen.getByLabelText("Email"), {
      target: { value: "invalid" },
    });
    fireEvent.click(screen.getByRole("button", { name: "Sign In" }));
    expect(await screen.findByText("Invalid email")).toBeInTheDocument();
  });
});
```

### E2E Tests (Playwright)

```typescript
// e2e/auth.spec.ts
test("user can login", async ({ page }) => {
  await page.goto("/auth");
  await page.fill('[name="email"]', "test@example.com");
  await page.fill('[name="password"]', "password123");
  await page.click('button[type="submit"]');
  await expect(page).toHaveURL("/dashboard");
});
```

## Security Considerations

1. **Authentication** - JWT tokens stored in httpOnly cookies
2. **CORS** - Configured per micro frontend
3. **CSP** - Content Security Policy headers
4. **Dependency Scanning** - npm audit in CI
5. **Input Validation** - Zod schemas for form data

## Performance Optimizations

1. **Code Splitting** - Each micro frontend loads independently
2. **Shared Dependencies** - React loaded once, shared across MFs
3. **Lazy Loading** - Dynamic imports for non-critical routes
4. **Caching** - Turborepo caches build outputs
5. **CDN** - Static assets served from Vercel Edge

## Future Roadmap

- [ ] Add Redis for session caching
- [ ] Implement feature flags (LaunchDarkly)
- [ ] Add observability (DataDog/Sentry)
- [ ] Performance monitoring with Web Vitals
- [ ] A/B testing infrastructure
