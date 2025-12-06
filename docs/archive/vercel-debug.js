// Debug script to understand Vercel's directory structure

console.log('Current working directory:', process.cwd());
console.log('Environment variables:');
console.log('- VERCEL_ENV:', process.env.VERCEL_ENV);
console.log('- VERCEL_URL:', process.env.VERCEL_URL);
console.log('- VERCEL_REGION:', process.env.VERCEL_REGION);

// List files in current directory
const fs = require('fs');
const path = require('path');

try {
  const files = fs.readdirSync('.');
  console.log('Files in current directory:', files);
  
  if (fs.existsSync('apps')) {
    console.log('Apps directory exists');
    const apps = fs.readdirSync('apps');
    console.log('Apps:', apps);
    
    if (fs.existsSync('apps/host')) {
      console.log('Host directory exists');
      const hostFiles = fs.readdirSync('apps/host');
      console.log('Host directory files count:', hostFiles.length);
    }
  }
} catch (error) {
  console.error('Error reading directory:', error.message);
}

console.log('Debug script completed');