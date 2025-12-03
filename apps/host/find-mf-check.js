// Script to find the Module Federation environment variable check

const fs = require('fs');
const path = require('path');

console.log('Searching for Module Federation environment variable check...');

// Function to search for a pattern in a file
function searchFile(filePath, pattern) {
  if (!fs.existsSync(filePath)) {
    return false;
  }
  
  try {
    const content = fs.readFileSync(filePath, 'utf8');
    return pattern.test(content);
  } catch (error) {
    return false;
  }
}

// Function to search recursively in a directory
function searchDirectory(dirPath, pattern, maxDepth = 3, currentDepth = 0) {
  if (currentDepth > maxDepth) {
    return [];
  }
  
  if (!fs.existsSync(dirPath)) {
    return [];
  }
  
  const results = [];
  
  try {
    const items = fs.readdirSync(dirPath);
    
    for (const item of items) {
      const itemPath = path.join(dirPath, item);
      
      try {
        const stat = fs.statSync(itemPath);
        
        if (stat.isDirectory()) {
          // Recursively search subdirectories
          results.push(...searchDirectory(itemPath, pattern, maxDepth, currentDepth + 1));
        } else if (stat.isFile() && (item.endsWith('.js') || item.endsWith('.ts'))) {
          // Search in JavaScript/TypeScript files
          if (searchFile(itemPath, pattern)) {
            results.push(itemPath);
          }
        }
      } catch (error) {
        // Continue searching even if some files can't be accessed
      }
    }
  } catch (error) {
    // Continue searching even if directory can't be accessed
  }
  
  return results;
}

// Search for the environment variable check
const pattern = /NEXT_PRIVATE_LOCAL_WEBPACK/;
const searchPaths = [
  path.join(__dirname, 'node_modules', '@module-federation'),
  path.join(__dirname, '..', '..', 'node_modules', '@module-federation')
];

let foundFiles = [];
for (const searchPath of searchPaths) {
  console.log(`Searching in: ${searchPath}`);
  const results = searchDirectory(searchPath, pattern);
  foundFiles = foundFiles.concat(results);
}

if (foundFiles.length > 0) {
  console.log('Found files containing NEXT_PRIVATE_LOCAL_WEBPACK:');
  for (const file of foundFiles) {
    console.log(`  ${file}`);
  }
} else {
  console.log('No files containing NEXT_PRIVATE_LOCAL_WEBPACK found');
}

console.log('Search completed');