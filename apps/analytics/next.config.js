const { NextFederationPlugin } = require('@module-federation/nextjs-mf');

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  // swcMinify: true,  // Commented out as it's not recognized
  // experimental: {    // Commented out as appDir is default in newer versions
  //   appDir: true,
  // },
  webpack(config, options) {
    config.plugins.push(
      new NextFederationPlugin({
        name: 'analytics',
        filename: 'static/chunks/remoteEntry.js',
        exposes: {
          './AnalyticsPage': './app/page',
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
      })
    );
    return config;
  },
};

module.exports = nextConfig;