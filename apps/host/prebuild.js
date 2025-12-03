#!/usr/bin/env node

// Prebuild script to ensure environment is set up correctly for Module Federation

console.log('Running prebuild script for Module Federation...');

// Set environment variables
process.env.NEXT_PRIVATE_LOCAL_WEBPACK = 'true';

// Log current environment
console.log('Environment variables:');
console.log('- NEXT_PRIVATE_LOCAL_WEBPACK:', process.env.NEXT_PRIVATE_LOCAL_WEBPACK);

// Check if webpack is available
try {
  require('webpack');
  console.log('✓ Webpack is available');
} catch (error) {
  console.log('⚠ Webpack not found, will be installed during build');
}

// Check if Module Federation plugin is available
try {
  require('@module-federation/nextjs-mf');
  console.log('✓ Module Federation plugin is available');
} catch (error) {
  console.log('⚠ Module Federation plugin not found:', error.message);
}

console.log('Prebuild script completed successfully');