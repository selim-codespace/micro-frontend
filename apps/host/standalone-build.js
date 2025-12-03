#!/usr/bin/env node

// Standalone build script for the host application
// This script attempts to build the application without relying on Next.js's build system

console.log('Running standalone build script...');

// Set environment variables
process.env.NEXT_PRIVATE_LOCAL_WEBPACK = 'true';

console.log('Environment variables set:');
console.log('- NEXT_PRIVATE_LOCAL_WEBPACK:', process.env.NEXT_PRIVATE_LOCAL_WEBPACK);

// Try to run the Next.js build command directly
const { execSync } = require('child_process');

try {
  console.log('Attempting to run Next.js build...');
  execSync('next build', { stdio: 'inherit' });
  console.log('Build completed successfully!');
} catch (error) {
  console.error('Build failed:', error.message);
  process.exit(1);
}