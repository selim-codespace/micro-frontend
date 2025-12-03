// Test script to check Module Federation plugin initialization

console.log('Testing Module Federation plugin initialization...');

// Set environment variables
process.env.NEXT_PRIVATE_LOCAL_WEBPACK = 'true';

console.log('Environment variables set:');
console.log('- NEXT_PRIVATE_LOCAL_WEBPACK:', process.env.NEXT_PRIVATE_LOCAL_WEBPACK);

// Try to import and initialize the Module Federation plugin
try {
  const { NextFederationPlugin } = require('@module-federation/nextjs-mf');
  console.log('✓ Module Federation plugin imported successfully');
  
  // Try to create an instance of the plugin
  const plugin = new NextFederationPlugin({
    name: 'host',
    filename: 'static/chunks/remoteEntry.js',
    exposes: {
      './Layout': './app/components/layout',
    },
    remotes: {
      auth: 'auth@http://localhost:3001/_next/static/chunks/remoteEntry.js',
      dashboard: 'dashboard@http://localhost:3002/_next/static/chunks/remoteEntry.js',
      analytics: 'analytics@http://localhost:3003/_next/static/chunks/remoteEntry.js',
      billing: 'billing@http://localhost:3004/_next/static/chunks/remoteEntry.js',
      admin: 'admin@http://localhost:3005/_next/static/chunks/remoteEntry.js',
      notifications: 'notifications@http://localhost:3006/_next/static/chunks/remoteEntry.js',
    },
    shared: {
      react: {
        singleton: true,
        requiredVersion: false,
      },
      'react-dom': {
        singleton: true,
        requiredVersion: false,
      },
    },
  });
  
  console.log('✓ Module Federation plugin instance created successfully');
  console.log('Plugin type:', typeof plugin);
  
} catch (error) {
  console.error('✗ Failed to initialize Module Federation plugin:', error.message);
  console.error('Stack trace:', error.stack);
}

console.log('Module Federation test completed');