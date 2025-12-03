# Shared Packages Documentation

## Overview

Shared packages provide common functionality that can be used across all micro frontends. This ensures consistency and reduces duplication.

## Packages

### @micro-frontend/design-tokens
Design tokens for consistent styling across all micro frontends.

#### Exports
- Colors
- Typography
- Spacing
- Border radius
- Shadows
- Breakpoints
- Transitions
- Z-index values

#### Usage
```typescript
import { colors, typography } from '@micro-frontend/design-tokens';
```

### @micro-frontend/shared-utils
Utility functions used across the platform.

#### Exports
- isEmpty - Check if a value is empty
- formatCurrency - Format currency values
- formatDate - Format date values
- debounce - Debounce function calls
- throttle - Throttle function calls
- isBreakpoint - Check screen size breakpoints
- generateId - Generate unique IDs

#### Usage
```typescript
import { isEmpty, formatCurrency } from '@micro-frontend/shared-utils';
```

### @micro-frontend/shared-state
State management solution for sharing state between micro frontends.

#### Exports
- appStateManager - Global state manager
- eventBus - Cross-domain event bus
- Types for User, AppState, Notification

#### Usage
```typescript
import { appStateManager, eventBus } from '@micro-frontend/shared-state';

// Get current state
const state = appStateManager.getState();

// Update state
appStateManager.setState({ theme: 'dark' });

// Subscribe to state changes
const unsubscribe = appStateManager.subscribe((state) => {
  console.log('State updated:', state);
});

// Emit events
eventBus.emit('userLoggedIn', { userId: 123 });

// Listen for events
eventBus.on('userLoggedIn', (data) => {
  console.log('User logged in:', data);
});
```

### @micro-frontend/ui-kit
Shared component library.

#### Exports
- Button component
- Input component
- Card component

#### Usage
```typescript
import { Button, Input, Card } from '@micro-frontend/ui-kit';
```

### @micro-frontend/api-client
API client for backend communication.

#### Exports
- ApiClient class
- apiClient instance
- authApi functions
- userApi functions

#### Usage
```typescript
import { apiClient, authApi } from '@micro-frontend/api-client';

// Make API calls
const response = await apiClient.get('/users');

// Use auth functions
const loginResponse = await authApi.login('user@example.com', 'password');
```

### @micro-frontend/config
Configuration utilities.

#### Exports
- envConfig - Environment configuration
- moduleFederationConfig - Module Federation configuration
- navigationConfig - Navigation configuration
- themeConfig - Theme configuration
- authConfig - Authentication configuration
- errorBoundaryConfig - Error boundary configuration
- performanceConfig - Performance monitoring configuration

#### Usage
```typescript
import { navigationConfig, themeConfig } from '@micro-frontend/config';
```

## Adding New Shared Packages

1. Create a new directory in `/packages` with the package name
2. Create package.json with appropriate metadata
3. Implement the package functionality
4. Export functionality through index.ts
5. Add the package to the root workspace configuration

## Best Practices

1. **Keep packages focused** - Each package should have a single responsibility
2. **Minimize dependencies** - Only include necessary dependencies
3. **Use TypeScript** - All packages should be written in TypeScript
4. **Export types** - Export TypeScript types for better developer experience
5. **Document exports** - Clearly document what each package exports
6. **Version consistently** - Keep package versions consistent across the platform