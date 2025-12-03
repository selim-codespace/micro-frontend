// Wrapper for Module Federation plugin to bypass environment variable checks
const setupEnv = require('./setup-env');

// Ensure environment is set before importing the plugin
setupEnv;

try {
  // Try to load the bypass version first
  const mfModule = require('./bypass-mf-check');
  const { NextFederationPlugin } = mfModule;
  
  // Create a wrapper function that ensures the environment variable is set
  function createNextFederationPlugin(options) {
    // Double-check the environment variable is set
    process.env.NEXT_PRIVATE_LOCAL_WEBPACK = 'true';
    
    // Create and return the plugin instance
    return new NextFederationPlugin(options);
  }
  
  module.exports = {
    NextFederationPlugin: createNextFederationPlugin
  };
} catch (error) {
  console.error('Failed to load Module Federation plugin:', error);
  
  // Fallback - create a dummy plugin if the real one fails to load
  function DummyPlugin() {}
  DummyPlugin.prototype.apply = function() {
    console.log('Dummy Module Federation plugin applied');
  };
  
  module.exports = {
    NextFederationPlugin: function() {
      console.warn('Using dummy Module Federation plugin');
      return new DummyPlugin();
    }
  };
}