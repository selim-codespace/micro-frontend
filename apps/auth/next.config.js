const { NextFederationPlugin } = require("@module-federation/nextjs-mf");

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,

  webpack(config, options) {
    const { isServer } = options;

    config.plugins.push(
      new NextFederationPlugin({
        name: "auth",
        filename: "static/chunks/remoteEntry.js",
        exposes: {
          "./LoginForm": "./components/LoginForm",
          "./RegisterForm": "./components/RegisterForm",
        },
        remotes: {
          host: `host@${
            process.env.HOST_URL || "http://localhost:3000"
          }/_next/static/${isServer ? "ssr" : "chunks"}/remoteEntry.js`,
        },
        shared: {
          react: {
            singleton: true,
            requiredVersion: false,
          },
          "react-dom": {
            singleton: true,
            requiredVersion: false,
          },
        },
        extraOptions: {
          exposePages: true,
        },
      })
    );

    return config;
  },
};

module.exports = nextConfig;
