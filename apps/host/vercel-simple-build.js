// Simple build script for Vercel deployment
// This script completely bypasses Module Federation to reduce memory usage

console.log('Running simple Vercel build...');

// Set environment variables
process.env.NEXT_PRIVATE_LOCAL_WEBPACK = 'true';

console.log('Environment variables set:');
console.log('- NEXT_PRIVATE_LOCAL_WEBPACK:', process.env.NEXT_PRIVATE_LOCAL_WEBPACK);

// Import required modules
const fs = require('fs');
const path = require('path');

// Create a completely minimal next.config.js
const minimalConfig = `
/** @type {import('next').NextConfig} */
module.exports = {
  reactStrictMode: true,
  // Disable experimental features to reduce memory usage
  experimental: {
    // Disable any experimental features that might increase memory usage
  }
};
`;

// Write the minimal configuration
const configPath = path.join(__dirname, 'next.config.js');
fs.writeFileSync(configPath, minimalConfig);

console.log('Minimal Next.js configuration written');

// Run the build using npx to ensure we're using the right version
const { execSync } = require('child_process');

try {
  console.log('Running Next.js build...');
  execSync('npx next build', { stdio: 'inherit' });
  console.log('Build completed successfully!');
  process.exit(0);
} catch (error) {
  console.error('Build failed:', error.message);
  process.exit(1);
}