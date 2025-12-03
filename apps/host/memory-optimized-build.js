// Memory optimized build script for Vercel deployment
// This script focuses on minimizing memory usage during build

console.log('Running memory-optimized Vercel build...');

// Set environment variables
process.env.NEXT_PRIVATE_LOCAL_WEBPACK = 'true';
process.env.NODE_OPTIONS = '--max-old-space-size=4096';

console.log('Environment variables set:');
console.log('- NEXT_PRIVATE_LOCAL_WEBPACK:', process.env.NEXT_PRIVATE_LOCAL_WEBPACK);
console.log('- NODE_OPTIONS:', process.env.NODE_OPTIONS);

// Import required modules
const fs = require('fs');
const path = require('path');

// Create an optimized next.config.js that reduces memory usage
const optimizedConfig = `
/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  
  // Optimize webpack configuration for memory usage
  webpack: (config, { isServer }) => {
    // Reduce memory usage by disabling some optimizations
    config.optimization = {
      ...config.optimization,
      removeAvailableModules: false,
      removeEmptyChunks: false,
      splitChunks: {
        chunks: 'all',
        minSize: 1000000, // Increase min chunk size to reduce number of chunks
        maxSize: 2000000, // Limit max chunk size
      },
      minimize: !isServer, // Only minimize client-side bundles
      concatenateModules: false, // Disable concatenation to save memory
    };
    
    // Disable cache to reduce memory usage
    config.cache = false;
    
    return config;
  },
  
  // Reduce number of concurrent compilations
  concurrentFeatures: 1,
  
  // Disable image optimization to reduce memory usage
  images: {
    unoptimized: true
  }
};

module.exports = nextConfig;
`;

// Write the optimized configuration
const configPath = path.join(__dirname, 'next.config.js');
fs.writeFileSync(configPath, optimizedConfig);

console.log('Optimized Next.js configuration written');

// Run the build with memory optimization
const { execSync } = require('child_process');

try {
  console.log('Running Next.js build with memory optimization...');
  // Use npx to ensure we're using the right version and reduce memory overhead
  execSync('npx --yes next build', { 
    stdio: 'inherit',
    maxBuffer: 1024 * 1024 * 10 // 10MB buffer
  });
  console.log('Build completed successfully!');
  process.exit(0);
} catch (error) {
  console.error('Build failed:', error.message);
  
  // Try a fallback build with even more conservative settings
  console.log('Trying fallback build with more conservative settings...');
  try {
    // Create an even more minimal configuration
    const minimalConfig = `
/** @type {import('next').NextConfig} */
module.exports = {
  reactStrictMode: true,
  // Completely minimal configuration
};
`;
    fs.writeFileSync(configPath, minimalConfig);
    
    execSync('npx --yes next build', { stdio: 'inherit' });
    console.log('Fallback build completed successfully!');
    process.exit(0);
  } catch (fallbackError) {
    console.error('Fallback build also failed:', fallbackError.message);
    process.exit(1);
  }
}