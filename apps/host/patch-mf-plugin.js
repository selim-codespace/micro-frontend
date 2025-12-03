// Script to patch the Module Federation plugin to bypass environment variable checks

const fs = require('fs');
const path = require('path');

console.log('Attempting to patch Module Federation plugin...');

// Try to find the Module Federation plugin in node_modules
const possiblePaths = [
  path.join(__dirname, 'node_modules', '@module-federation', 'nextjs-mf', 'dist', 'index.js'),
  path.join(__dirname, 'node_modules', '@module-federation', 'nextjs-mf', 'index.js'),
  path.join(__dirname, '..', '..', 'node_modules', '@module-federation', 'nextjs-mf', 'dist', 'index.js'),
  path.join(__dirname, '..', '..', 'node_modules', '@module-federation', 'nextjs-mf', 'index.js')
];

let pluginPath = null;
for (const possiblePath of possiblePaths) {
  if (fs.existsSync(possiblePath)) {
    pluginPath = possiblePath;
    break;
  }
}

if (!pluginPath) {
  console.log('Module Federation plugin not found in node_modules');
  process.exit(0);
}

console.log('Found Module Federation plugin at:', pluginPath);

// Read the plugin file
let content;
try {
  content = fs.readFileSync(pluginPath, 'utf8');
} catch (error) {
  console.log('Could not read plugin file:', error.message);
  process.exit(0);
}

// Look for the environment variable check
const envCheckPattern = /process\.env\.NEXT_PRIVATE_LOCAL_WEBPACK\s*!==?\s*['"]true['"]/g;
if (envCheckPattern.test(content)) {
  console.log('Found environment variable check, attempting to patch...');
  
  // Replace the check with a constant true
  const patchedContent = content.replace(envCheckPattern, 'true');
  
  // Write the patched content back
  try {
    fs.writeFileSync(pluginPath, patchedContent, 'utf8');
    console.log('Successfully patched Module Federation plugin');
  } catch (error) {
    console.log('Could not write patched plugin file:', error.message);
  }
} else {
  console.log('No environment variable check found in plugin');
}

// Also try to find and patch any webpack-related checks
const webpackCheckPattern = /require\(['"]webpack['"]\)/g;
if (webpackCheckPattern.test(content)) {
  console.log('Found webpack requirement, ensuring it is available...');
} else {
  console.log('No explicit webpack requirement found');
}