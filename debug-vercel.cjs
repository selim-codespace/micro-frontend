// Debug script to understand Vercel's environment

console.log('=== Vercel Debug Information ===');
console.log('Current working directory:', process.cwd());
console.log('Process environment keys:', Object.keys(process.env).filter(key => key.includes('VERCEL') || key.includes('NEXT')));

// Try to list directories
const { readdirSync, existsSync, chdir } = require('fs');

try {
  console.log('\n=== Directory Structure ===');
  const rootFiles = readdirSync('.');
  console.log('Root directory files:', rootFiles);
  
  if (existsSync('apps')) {
    console.log('Apps directory found');
    const apps = readdirSync('apps');
    console.log('Apps:', apps);
    
    if (existsSync('apps/host')) {
      console.log('Host directory found');
      const hostFiles = readdirSync('apps/host');
      console.log('Host directory has', hostFiles.length, 'files');
      console.log('Sample host files:', hostFiles.slice(0, 5));
      
      if (existsSync('apps/host/package.json')) {
        console.log('Host package.json found');
      }
    } else {
      console.log('Host directory NOT found');
    }
  } else {
    console.log('Apps directory NOT found');
  }
  
  console.log('\n=== Trying to access apps/host ===');
  try {
    chdir('apps/host');
    console.log('Successfully changed to apps/host directory');
    console.log('Current directory after chdir:', process.cwd());
    chdir('../..'); // Go back to root
  } catch (chdirError) {
    console.log('Failed to change directory to apps/host:', chdirError.message);
  }
  
} catch (error) {
  console.error('Error during debug:', error.message);
}

console.log('=== Debug completed ===');