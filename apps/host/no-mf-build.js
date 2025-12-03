// Build script that completely bypasses Module Federation

console.log('Running build without Module Federation...');

// Set environment variables
process.env.NEXT_PRIVATE_LOCAL_WEBPACK = 'true';

// Import required modules
const { execSync } = require('child_process');
const fs = require('fs');
const path = require('path');

// Function to run a command and handle errors
function runCommand(command, cwd) {
  try {
    console.log(`Running: ${command}`);
    execSync(command, { cwd, stdio: 'inherit' });
    return true;
  } catch (error) {
    console.error(`Command failed: ${command}`, error.message);
    return false;
  }
}

// Create a temporary next.config.js that completely removes Module Federation
console.log('Creating temporary configuration without Module Federation...');
const tempConfig = `
  /** @type {import('next').NextConfig} */
  const nextConfig = {
    reactStrictMode: true,
    // Completely remove Module Federation
    webpack: (config) => {
      // Return config without Module Federation
      return config;
    }
  };
  
  module.exports = nextConfig;
`;

const tempConfigPath = path.join(__dirname, 'temp.next.config.js');
fs.writeFileSync(tempConfigPath, tempConfig);

// Try to build with the temporary configuration
console.log('Attempting to build with temporary configuration...');
const result = runCommand(`next build --config temp.next.config.js`, __dirname);

// Clean up temporary config
try {
  fs.unlinkSync(tempConfigPath);
} catch (error) {
  console.log('Could not clean up temporary config file');
}

if (result) {
  console.log('Build completed successfully without Module Federation!');
  process.exit(0);
} else {
  console.error('Build failed even without Module Federation');
  process.exit(1);
}