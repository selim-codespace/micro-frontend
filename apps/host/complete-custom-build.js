// Complete custom build script that bypasses Next.js Module Federation integration

console.log('Running complete custom build...');

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

// Ensure webpack is installed
console.log('Ensuring webpack is installed...');
if (!runCommand('npm install webpack@^5.103.0', __dirname)) {
  console.log('Webpack installation may have failed, continuing anyway...');
}

// Create a Vercel-specific next.config.js that removes Module Federation
console.log('Creating Vercel-specific configuration...');
const vercelConfig = fs.readFileSync(path.join(__dirname, 'vercel-minimal.config.js'), 'utf8');

const configPath = path.join(__dirname, 'next.config.js');
fs.writeFileSync(configPath, vercelConfig);

// Try to build with Next.js using the Vercel-specific configuration
console.log('Attempting to build with Next.js using Vercel configuration...');
if (runCommand('next build', __dirname)) {
  console.log('Build completed successfully!');
  process.exit(0);
} else {
  console.error('Build failed');
  process.exit(1);
}