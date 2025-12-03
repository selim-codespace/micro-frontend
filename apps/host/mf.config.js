const { withModuleFederation } = require('@module-federation/nextjs-mf');

/** @type {import('@module-federation/nextjs-mf').FederationConfig} */
const federationConfig = {
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
};

module.exports = withModuleFederation(federationConfig);