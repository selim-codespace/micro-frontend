// Test script to verify Next.js configuration

console.log('Testing Next.js configuration...');

// Import required modules
const fs = require('fs');
const path = require('path');

// Check if app directory exists
const appDir = path.join(__dirname, 'app');
console.log('App directory exists:', fs.existsSync(appDir));

if (fs.existsSync(appDir)) {
  const files = fs.readdirSync(appDir);
  console.log('Files in app directory:', files);
  
  // Check for key files
  console.log('page.tsx exists:', fs.existsSync(path.join(appDir, 'page.tsx')));
  console.log('layout.tsx exists:', fs.existsSync(path.join(appDir, 'layout.tsx')));
}

// Check if pages directory exists (alternative)
const pagesDir = path.join(__dirname, 'pages');
console.log('Pages directory exists:', fs.existsSync(pagesDir));

console.log('Test completed');