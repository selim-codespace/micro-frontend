const { NextFederationPlugin } = require('@module-federation/nextjs-mf');

// Ensure webpack is available for Module Federation
if (process.env.NEXT_PRIVATE_LOCAL_WEBPACK !== 'true') {
  console.warn('NEXT_PRIVATE_LOCAL_WEBPACK is not set to true. This may cause issues with Module Federation.');
}

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  webpack(config, options) {
    config.plugins.push(
      new NextFederationPlugin({
        name: 'host',
        filename: 'static/chunks/remoteEntry.js',
        exposes: {
          './Layout': './app/components/layout',
        },
        remotes: {
          auth: 'auth@' + (process.env.AUTH_APP_URL || 'http://localhost:3001') + '/_next/static/chunks/remoteEntry.js',
          dashboard: 'dashboard@' + (process.env.DASHBOARD_APP_URL || 'http://localhost:3002') + '/_next/static/chunks/remoteEntry.js',
          analytics: 'analytics@' + (process.env.ANALYTICS_APP_URL || 'http://localhost:3003') + '/_next/static/chunks/remoteEntry.js',
          billing: 'billing@' + (process.env.BILLING_APP_URL || 'http://localhost:3004') + '/_next/static/chunks/remoteEntry.js',
          admin: 'admin@' + (process.env.ADMIN_APP_URL || 'http://localhost:3005') + '/_next/static/chunks/remoteEntry.js',
          notifications: 'notifications@' + (process.env.NOTIFICATIONS_APP_URL || 'http://localhost:3006') + '/_next/static/chunks/remoteEntry.js',
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
      })
    );
    return config;
  },
};

module.exports = nextConfig;
