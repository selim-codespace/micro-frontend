// Setup environment variables for Module Federation
require('./aggressive-patch');

// Export for use in other scripts
module.exports = {
  NEXT_PRIVATE_LOCAL_WEBPACK: process.env.NEXT_PRIVATE_LOCAL_WEBPACK
};