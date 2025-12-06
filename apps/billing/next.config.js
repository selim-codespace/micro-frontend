const { NextFederationPlugin } = require("@module-federation/nextjs-mf");

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,

  webpack(config, options) {
    const { isServer } = options;

    config.plugins.push(
      new NextFederationPlugin({
        name: "billing",
        filename: "static/chunks/remoteEntry.js",
        exposes: {
          "./BillingPage": "./pages/index",
        },
        remotes: {
          host: `host@${
            process.env.HOST_URL || "http://localhost:3000"
          }/_next/static/${isServer ? "ssr" : "chunks"}/remoteEntry.js`,
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

module.exports = nextConfig;
