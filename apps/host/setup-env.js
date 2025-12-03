// Setup environment variables for Module Federation
process.env.NEXT_PRIVATE_LOCAL_WEBPACK = process.env.NEXT_PRIVATE_LOCAL_WEBPACK || 'true';

console.log('Environment variables set for Module Federation:');
console.log('- NEXT_PRIVATE_LOCAL_WEBPACK:', process.env.NEXT_PRIVATE_LOCAL_WEBPACK);

// Export for use in other scripts
module.exports = {
  NEXT_PRIVATE_LOCAL_WEBPACK: process.env.NEXT_PRIVATE_LOCAL_WEBPACK
};