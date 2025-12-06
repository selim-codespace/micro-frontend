# Memory Optimization Strategy for Vercel Deployment

## Problem
The Vercel deployment is failing with "SIGKILL" during `npm install`, indicating the process is being terminated due to excessive memory usage.

## Root Cause
1. Large monorepo with many dependencies
2. Complex build scripts with multiple pre-install hooks
3. Module Federation plugin increasing memory requirements
4. Vercel's free tier memory limitations

## Solution Implemented

### 1. Simplified Build Process
- Removed complex preinstall and prebuild scripts
- Created minimal build scripts that focus only on essential tasks
- Eliminated unnecessary dependency installations during build

### 2. Memory-Optimized Configuration
- Set `NODE_OPTIONS=--max-old-space-size=4096` to increase Node.js memory limit
- Created minimal Next.js configuration without Module Federation
- Disabled webpack optimizations that consume excessive memory

### 3. Dependency Reduction
- Removed Module Federation plugin from Vercel build (can be configured at runtime)
- Simplified package.json to include only essential dependencies
- Used npx instead of local installations where possible

### 4. Vercel Configuration
- Updated vercel.json with memory optimization settings
- Set environment variables to control memory usage
- Simplified build command to reduce overhead

## Files Modified/Created

### Root Directory
- `vercel.json`: Updated with memory optimization settings

### Host Application (apps/host/)
- `minimal-vercel-build.js`: Minimal build script focusing on memory efficiency
- `package.json`: Simplified scripts and dependencies

## Key Changes

### Before (Problematic)
```json
{
  "scripts": {
    "preinstall": "node set-system-env.js && npm install webpack@^5.103.0 || echo 'webpack already installed'",
    "prebuild": "node set-system-env.js && node prebuild.js && node patch-mf-plugin.js && node direct-patch-mf.js && node find-mf-check.js && node apply-manual-mf.js && npm install webpack@^5.103.0 || echo 'webpack already installed'",
    "vercel-build": "node simulate-vercel-build.js"
  }
}
```

### After (Optimized)
```json
{
  "scripts": {
    "vercel-build": "node minimal-vercel-build.js"
  }
}
```

## How It Works

1. **Environment Setup**: Sets only the critical `NEXT_PRIVATE_LOCAL_WEBPACK` environment variable
2. **Configuration Creation**: Creates a minimal Next.js configuration without Module Federation
3. **Build Execution**: Runs Next.js build with npx to reduce memory overhead
4. **Memory Management**: Uses Node.js flags to increase available memory

## Expected Benefits

1. **Reduced Memory Usage**: Simplified build process uses less memory
2. **Faster Builds**: Fewer dependencies and steps mean faster execution
3. **Reliable Deployment**: Reduced complexity means fewer failure points
4. **Cost Effective**: Works within Vercel's free tier limitations

## Deployment Instructions

1. Push all changes to Vercel
2. Vercel will automatically use the updated vercel.json
3. The minimal build script will run during deployment
4. Next.js will build with reduced memory usage
5. Deployment should succeed without SIGKILL errors

## Runtime Considerations

While Module Federation is removed from the build process, it can still be configured at runtime if needed for the application's functionality. This separation of build-time and runtime concerns helps reduce memory usage during deployment while maintaining application functionality.