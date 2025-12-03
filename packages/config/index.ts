// Configuration Utilities for Micro Frontend Platform

// Environment configuration
export const envConfig = {
  isDevelopment: false,
  isProduction: true,
  isTest: false,
};

// Module Federation configuration
export const moduleFederationConfig = {
  // Host application name
  hostAppName: 'host',
  
  // Remote application names
  remoteAppNames: [
    'auth',
    'dashboard',
    'analytics',
    'billing',
    'admin',
    'notifications'
  ],
  
  // Remote entry file name
  remoteEntryFileName: 'remoteEntry.js',
  
  // Default remote URL template
  remoteUrlTemplate: (appName: string) => `${appName}.domain.com/${moduleFederationConfig.remoteEntryFileName}`,
};

// Navigation configuration
export const navigationConfig = {
  // Main navigation items
  mainNavItems: [
    { id: 'dashboard', label: 'Dashboard', path: '/dashboard' },
    { id: 'analytics', label: 'Analytics', path: '/analytics' },
    { id: 'billing', label: 'Billing', path: '/billing' },
    { id: 'admin', label: 'Admin', path: '/admin' },
    { id: 'notifications', label: 'Notifications', path: '/notifications' },
  ],
  
  // User menu items
  userMenuItems: [
    { id: 'profile', label: 'Profile', path: '/profile' },
    { id: 'settings', label: 'Settings', path: '/settings' },
    { id: 'logout', label: 'Logout', path: '/logout' },
  ],
};

// Theme configuration
export const themeConfig = {
  // Available themes
  themes: ['light', 'dark'],
  
  // Default theme
  defaultTheme: 'light',
  
  // Theme storage key
  themeStorageKey: 'micro-frontend-theme',
};

// Authentication configuration
export const authConfig = {
  // Session storage key
  sessionStorageKey: 'micro-frontend-session',
  
  // Token expiration buffer (in minutes)
  tokenExpirationBuffer: 5,
  
  // Login path
  loginPath: '/login',
  
  // Redirect path after login
  postLoginRedirectPath: '/dashboard',
};

// Error boundary configuration
export const errorBoundaryConfig = {
  // Show error details in development
  showDetailsInDevelopment: true,
  
  // Generic error message
  genericErrorMessage: 'An unexpected error occurred. Please try again later.',
};

// Performance monitoring configuration
export const performanceConfig = {
  // Enable performance monitoring
  enabled: true,
  
  // Remote metrics endpoint
  metricsEndpoint: '/api/metrics',
  
  // Sampling rate (0-1)
  samplingRate: 0.1,
};