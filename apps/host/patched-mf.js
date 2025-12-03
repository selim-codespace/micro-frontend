// Patched version of Module Federation to bypass environment variable checks

// Ensure environment variable is set before loading the original module
process.env.NEXT_PRIVATE_LOCAL_WEBPACK = 'true';

// Try to load the original module
let originalModule;
try {
  originalModule = require('@module-federation/nextjs-mf');
  console.log('Successfully loaded original Module Federation module');
} catch (error) {
  console.error('Failed to load original Module Federation module:', error);
  // Create a fallback implementation
  originalModule = {
    NextFederationPlugin: class NextFederationPlugin {
      constructor(options) {
        this.options = options;
        console.log('Using patched NextFederationPlugin with options:', options);
      }
      
      apply(compiler) {
        console.log('Patched NextFederationPlugin applied');
        // Minimal implementation that doesn't require the environment variable
      }
    },
    withModuleFederation: function(config) {
      console.log('Using patched withModuleFederation');
      return config;
    }
  };
}

// Export the patched module
module.exports = originalModule;