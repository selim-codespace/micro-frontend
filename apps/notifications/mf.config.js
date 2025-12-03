const { withModuleFederation } = require('@module-federation/nextjs-mf');

/** @type {import('@module-federation/nextjs-mf').FederationConfig} */
const federationConfig = {
  name: 'notifications',
  filename: 'static/chunks/remoteEntry.js',
  exposes: {
    './NotificationsPage': './app/page',
  },
  remotes: {
    host: 'host@http://localhost:3000/_next/static/chunks/remoteEntry.js',
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