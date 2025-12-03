// Aggressive patch to ensure Module Federation works

// This script aggressively patches the environment and module loading system

console.log('Running aggressive patch...');

// Patch 1: Set environment variable multiple ways
process.env.NEXT_PRIVATE_LOCAL_WEBPACK = 'true';
global.NEXT_PRIVATE_LOCAL_WEBPACK = 'true';

// Patch 2: Monkey-patch process.env to always return 'true' for this variable
const originalEnv = process.env;
process.env = new Proxy(originalEnv, {
  get(target, prop) {
    if (prop === 'NEXT_PRIVATE_LOCAL_WEBPACK') {
      return 'true';
    }
    return target[prop];
  },
  has(target, prop) {
    if (prop === 'NEXT_PRIVATE_LOCAL_WEBPACK') {
      return true;
    }
    return prop in target;
  }
});

console.log('Aggressive patch applied');
console.log('NEXT_PRIVATE_LOCAL_WEBPACK in process.env:', process.env.NEXT_PRIVATE_LOCAL_WEBPACK);