// Optimized build script for Vercel deployment
// This script focuses on minimal memory usage

console.log('Running optimized Vercel build...');

// Set environment variables
process.env.NEXT_PRIVATE_LOCAL_WEBPACK = 'true';

console.log('Environment variables set:');
console.log('- NEXT_PRIVATE_LOCAL_WEBPACK:', process.env.NEXT_PRIVATE_LOCAL_WEBPACK);

// Import required modules
const fs = require('fs');
const path = require('path');

// Create a minimal next.config.js that doesn't use Module Federation
// This avoids the environment variable check and reduces memory usage
const minimalConfig = `
// Minimal Next.js configuration for Vercel deployment
/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  // Minimal webpack configuration to reduce memory usage
  webpack: (config) => {
    // Reduce memory usage by limiting concurrent builds
    config.cache = false;
    return config;
  }
};

module.exports = nextConfig;
`;

// Write the minimal configuration
const configPath = path.join(__dirname, 'next.config.js');
fs.writeFileSync(configPath, minimalConfig);

console.log('Minimal Next.js configuration written to next.config.js');

// Import child_process to run the build command
const { execSync } = require('child_process');

// Function to run a command with error handling
function runCommand(command) {
  try {
    console.log(`Running: ${command}`);
    execSync(command, { stdio: 'inherit' });
    return true;
  } catch (error) {
    console.error(`Command failed: ${command}`, error.message);
    return false;
  }
}

// Run the Next.js build command
console.log('Starting Next.js build...');
if (runCommand('npx next build')) {
  console.log('Build completed successfully!');
  process.exit(0);
} else {
  console.error('Build failed');
  process.exit(1);
}