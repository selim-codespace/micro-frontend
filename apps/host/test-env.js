// Test script to check if environment variables are set correctly

console.log('Testing environment variables...');

console.log('process.env.NEXT_PRIVATE_LOCAL_WEBPACK:', process.env.NEXT_PRIVATE_LOCAL_WEBPACK);
console.log('typeof process.env.NEXT_PRIVATE_LOCAL_WEBPACK:', typeof process.env.NEXT_PRIVATE_LOCAL_WEBPACK);

if (process.env.NEXT_PRIVATE_LOCAL_WEBPACK === 'true') {
  console.log('✓ Environment variable is set correctly');
} else {
  console.log('✗ Environment variable is not set correctly');
}

// Try to set it explicitly
process.env.NEXT_PRIVATE_LOCAL_WEBPACK = 'true';
console.log('After explicit set - process.env.NEXT_PRIVATE_LOCAL_WEBPACK:', process.env.NEXT_PRIVATE_LOCAL_WEBPACK);

// Try to import webpack
try {
  require('webpack');
  console.log('✓ Webpack is available');
} catch (error) {
  console.log('✗ Webpack is not available:', error.message);
}

// Try to import Module Federation plugin
try {
  require('@module-federation/nextjs-mf');
  console.log('✓ Module Federation plugin is available');
} catch (error) {
  console.log('✗ Module Federation plugin is not available:', error.message);
}

console.log('Test completed');