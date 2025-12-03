// Vercel-specific Next.js configuration without Module Federation

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  // Remove Module Federation for Vercel deployment
  // Module Federation will be handled at runtime
};

module.exports = nextConfig;