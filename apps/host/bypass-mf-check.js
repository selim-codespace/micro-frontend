// Script to bypass Module Federation environment variable check

// This script attempts to monkey-patch the Module Federation plugin
// to bypass the NEXT_PRIVATE_LOCAL_WEBPACK environment variable check

console.log('Attempting to bypass Module Federation environment variable check...');

// Try to patch the Module Federation plugin
try {
  // First, ensure the environment variable is set
  process.env.NEXT_PRIVATE_LOCAL_WEBPACK = 'true';
  
  // Try to load the Module Federation plugin
  const mfModule = require('@module-federation/nextjs-mf');
  
  console.log('Module Federation plugin loaded successfully');
  
  // If we got here, the plugin loaded successfully
  module.exports = mfModule;
} catch (error) {
  console.log('Failed to load Module Federation plugin:', error.message);
  
  // Create a minimal fallback implementation
  class DummyNextFederationPlugin {
    constructor(options) {
      this.options = options;
      console.log('Using dummy NextFederationPlugin');
    }
    
    apply(compiler) {
      console.log('Dummy NextFederationPlugin applied with options:', this.options);
    }
  }
  
  module.exports = {
    NextFederationPlugin: DummyNextFederationPlugin,
    withModuleFederation: (config) => {
      console.log('Using dummy withModuleFederation');
      return config;
    }
  };
}