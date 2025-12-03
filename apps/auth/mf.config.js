const { withModuleFederation } = require('@module-federation/nextjs-mf');

/** @type {import('@module-federation/nextjs-mf').FederationConfig} */
const federationConfig = {
  name: 'auth',
  filename: 'static/chunks/remoteEntry.js',
  exposes: {
    './LoginForm': './app/components/LoginForm',
    './RegisterForm': './app/components/RegisterForm',
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