// Direct patch script for Module Federation plugin

const fs = require('fs');
const path = require('path');

console.log('Running direct patch for Module Federation plugin...');

// Function to patch a file
function patchFile(filePath, searchPattern, replacement) {
  if (!fs.existsSync(filePath)) {
    console.log(`File not found: ${filePath}`);
    return false;
  }
  
  try {
    let content = fs.readFileSync(filePath, 'utf8');
    
    if (searchPattern.test(content)) {
      console.log(`Found pattern in ${filePath}, patching...`);
      const patchedContent = content.replace(searchPattern, replacement);
      fs.writeFileSync(filePath, patchedContent, 'utf8');
      console.log(`Successfully patched ${filePath}`);
      return true;
    } else {
      console.log(`Pattern not found in ${filePath}`);
      return false;
    }
  } catch (error) {
    console.log(`Failed to patch ${filePath}:`, error.message);
    return false;
  }
}

// Try to find and patch the Module Federation plugin
const possiblePaths = [
  path.join(__dirname, 'node_modules', '@module-federation', 'nextjs-mf', 'dist', 'index.js'),
  path.join(__dirname, 'node_modules', '@module-federation', 'nextjs-mf', 'index.js'),
  path.join(__dirname, '..', '..', 'node_modules', '@module-federation', 'nextjs-mf', 'dist', 'index.js'),
  path.join(__dirname, '..', '..', 'node_modules', '@module-federation', 'nextjs-mf', 'index.js')
];

let patched = false;
for (const pluginPath of possiblePaths) {
  // Try to patch the environment variable check
  const envCheckPattern = /process\.env\.NEXT_PRIVATE_LOCAL_WEBPACK\s*!==?\s*['"]true['"]/g;
  const envCheckReplacement = 'true';
  
  if (patchFile(pluginPath, envCheckPattern, envCheckReplacement)) {
    patched = true;
    break;
  }
  
  // Try another pattern
  const envCheckPattern2 = /!process\.env\.NEXT_PRIVATE_LOCAL_WEBPACK/g;
  const envCheckReplacement2 = 'false';
  
  if (patchFile(pluginPath, envCheckPattern2, envCheckReplacement2)) {
    patched = true;
    break;
  }
}

if (patched) {
  console.log('Successfully patched Module Federation plugin');
} else {
  console.log('Could not find or patch Module Federation plugin');
}

console.log('Direct patch completed');