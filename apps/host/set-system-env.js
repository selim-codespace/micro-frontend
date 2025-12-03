// Script to set system-level environment variables

console.log('Setting system-level environment variables...');

// Set environment variable in multiple ways
process.env.NEXT_PRIVATE_LOCAL_WEBPACK = 'true';

// Also try to set it in a way that persists
if (process.platform === 'win32') {
  // Windows
  try {
    require('child_process').execSync('setx NEXT_PRIVATE_LOCAL_WEBPACK true', { stdio: 'inherit' });
    console.log('Set environment variable on Windows');
  } catch (error) {
    console.log('Could not set Windows environment variable:', error.message);
  }
} else {
  // Unix-like systems
  try {
    require('child_process').execSync('export NEXT_PRIVATE_LOCAL_WEBPACK=true', { stdio: 'inherit' });
    console.log('Set environment variable on Unix-like system');
  } catch (error) {
    console.log('Could not set Unix environment variable:', error.message);
  }
}

console.log('System environment variables set');