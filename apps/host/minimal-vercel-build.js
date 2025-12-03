// Minimal Vercel build script
// This script focuses on the absolute minimum needed to build the app

console.log('Running minimal Vercel build...');

// Set the critical environment variable
process.env.NEXT_PRIVATE_LOCAL_WEBPACK = 'true';

console.log('Environment variable set: NEXT_PRIVATE_LOCAL_WEBPACK =', process.env.NEXT_PRIVATE_LOCAL_WEBPACK);

// Import required modules
const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

// Create the simplest possible next.config.js
const simpleConfig = `
/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  // Explicitly configure App Router
  experimental: {
    appDir: true,
  },
  // Ensure proper directory structure
  dir: '.',
};

module.exports = nextConfig;
`;

// Write the configuration
const configPath = path.join(__dirname, 'next.config.js');
fs.writeFileSync(configPath, simpleConfig);

console.log('Simple Next.js configuration written');

// Run the build
try {
  console.log('Running Next.js build...');
  execSync('npx next build', { stdio: 'inherit' });
  console.log('Build completed successfully!');
  process.exit(0);
} catch (error) {
  console.error('Build failed:', error.message);
  process.exit(1);
}