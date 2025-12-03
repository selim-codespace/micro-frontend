// Simulate the Vercel build process

console.log('Simulating Vercel build process...');

// Set environment variables
process.env.NEXT_PRIVATE_LOCAL_WEBPACK = 'true';

console.log('Environment variables set:');
console.log('- NEXT_PRIVATE_LOCAL_WEBPACK:', process.env.NEXT_PRIVATE_LOCAL_WEBPACK);

// Import required modules
const { execSync } = require('child_process');

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

// Run the Vercel setup script
console.log('Running Vercel setup script...');
if (!runCommand('node vercel-setup.js', __dirname)) {
  console.error('Vercel setup failed');
  process.exit(1);
}

// Try to build with Next.js
console.log('Attempting to build with Next.js...');
if (runCommand('next build', __dirname)) {
  console.log('Build completed successfully!');
  process.exit(0);
} else {
  console.error('Build failed');
  process.exit(1);
}