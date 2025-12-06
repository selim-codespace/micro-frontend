// Module Federation is temporarily disabled during initial setup
// Uncomment and configure when deploying with remote micro frontends

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,

  // Enable Module Federation when needed
  // webpack(config, options) {
  //   const { NextFederationPlugin } = require('@module-federation/nextjs-mf');
  //   const { isServer } = options;
  //
  //   config.plugins.push(
  //     new NextFederationPlugin({
  //       name: 'host',
  //       filename: 'static/chunks/remoteEntry.js',
  //       remotes: {
  //         auth: `auth@http://localhost:3001/_next/static/${isServer ? 'ssr' : 'chunks'}/remoteEntry.js`,
  //       },
  //       shared: { react: { singleton: true }, 'react-dom': { singleton: true } },
  //     })
  //   );
  //
  //   return config;
  // },
};

module.exports = nextConfig;
