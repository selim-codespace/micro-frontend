// Vercel setup script that creates a minimal Next.js configuration

console.log('Setting up minimal Next.js configuration for Vercel...');

// Import required modules
const fs = require('fs');
const path = require('path');

// Set environment variables
process.env.NEXT_PRIVATE_LOCAL_WEBPACK = 'true';

console.log('Environment variables set:');
console.log('- NEXT_PRIVATE_LOCAL_WEBPACK:', process.env.NEXT_PRIVATE_LOCAL_WEBPACK);

// Read the minimal configuration
const minimalConfig = fs.readFileSync(path.join(__dirname, 'minimal-next.config.js'), 'utf8');

// Write it to next.config.js
const configPath = path.join(__dirname, 'next.config.js');
fs.writeFileSync(configPath, minimalConfig);

console.log('Minimal Next.js configuration written to next.config.js');

// Verify the configuration was written correctly
const writtenConfig = fs.readFileSync(configPath, 'utf8');
console.log('Configuration file contents:');
console.log(writtenConfig);

console.log('Vercel setup completed');