// Minimal Next.js configuration for Vercel deployment
// This configuration removes all Module Federation to avoid the environment variable check

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  // Completely remove Module Federation for Vercel deployment
  // Will be re-added at runtime if needed
  webpack: (config) => {
    // Return the config as-is without Module Federation
    return config;
  }
};

module.exports = nextConfig;