# Script to build all micro frontend applications with Module Federation

Write-Host "Building Micro Frontend Platform with Module Federation..." -ForegroundColor Green

# Set environment variable for webpack
$env:NEXT_PRIVATE_LOCAL_WEBPACK = "true"

# Function to update next.config.js for Module Federation
function Update-NextConfig($appPath, $appName) {
    $configPath = Join-Path $appPath "next.config.js"
    if (Test-Path $configPath) {
        if ($appName -eq "host") {
            $configContent = @"
const { NextFederationPlugin } = require('@module-federation/nextjs-mf');

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  // Use pages directory instead of app directory for Module Federation compatibility
  // This is a temporary workaround for demonstration purposes
  experimental: {
    externalDir: true,
  },
  webpack(config, options) {
    config.plugins.push(
      new NextFederationPlugin({
        name: 'host',
        filename: 'static/chunks/remoteEntry.js',
        exposes: {
          './Layout': './pages/components/layout',
        },
        remotes: {
          auth: 'auth@http://localhost:3001/_next/static/chunks/remoteEntry.js',
          dashboard: 'dashboard@http://localhost:3002/_next/static/chunks/remoteEntry.js',
          analytics: 'analytics@http://localhost:3003/_next/static/chunks/remoteEntry.js',
          billing: 'billing@http://localhost:3004/_next/static/chunks/remoteEntry.js',
          admin: 'admin@http://localhost:3005/_next/static/chunks/remoteEntry.js',
          notifications: 'notifications@http://localhost:3006/_next/static/chunks/remoteEntry.js',
        },
        shared: {
          react: {
            singleton: true,
            requiredVersion: false,
          },
          'react-dom': {
            singleton: true,
            requiredVersion: false,
          },
        },
      })
    );
    return config;
  },
};

module.exports = nextConfig;
"@
        } else {
            $exposedComponent = ""
            switch ($appName) {
                "auth" { $exposedComponent = "./pages/components/LoginForm" }
                "dashboard" { $exposedComponent = "./pages/index" }
                "analytics" { $exposedComponent = "./pages/index" }
                "billing" { $exposedComponent = "./pages/index" }
                "admin" { $exposedComponent = "./pages/index" }
                "notifications" { $exposedComponent = "./pages/index" }
            }
            
            $port = 3000 + ([int]$appName.Substring(0, 1).ToLower().ToCharArray()[0] - 96)
            if ($appName -eq "auth") { $port = 3001 }
            elseif ($appName -eq "dashboard") { $port = 3002 }
            elseif ($appName -eq "analytics") { $port = 3003 }
            elseif ($appName -eq "billing") { $port = 3004 }
            elseif ($appName -eq "admin") { $port = 3005 }
            elseif ($appName -eq "notifications") { $port = 3006 }
            
            $configContent = @"
const { NextFederationPlugin } = require('@module-federation/nextjs-mf');

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  // Use pages directory instead of app directory for Module Federation compatibility
  // This is a temporary workaround for demonstration purposes
  experimental: {
    externalDir: true,
  },
  webpack(config, options) {
    config.plugins.push(
      new NextFederationPlugin({
        name: '$appName',
        filename: 'static/chunks/remoteEntry.js',
        exposes: {
          './Component': '$exposedComponent',
        },
        remotes: {
          host: 'host@http://localhost:3000/_next/static/chunks/remoteEntry.js',
        },
        shared: {
          react: {
            singleton: true,
            requiredVersion: false,
          },
          'react-dom': {
            singleton: true,
            requiredVersion: false,
          },
        },
      })
    );
    return config;
  },
};

module.exports = nextConfig;
"@
        }
        
        Set-Content -Path $configPath -Value $configContent
        Write-Host "Updated next.config.js for $appName" -ForegroundColor Yellow
    }
}

# Function to create pages directory structure if it doesn't exist
function Create-PagesStructure($appPath) {
    $pagesDir = Join-Path $appPath "pages"
    if (-not (Test-Path $pagesDir)) {
        New-Item -ItemType Directory -Path $pagesDir | Out-Null
        Write-Host "Created pages directory for $appPath" -ForegroundColor Yellow
        
        # Copy app content to pages (simplified approach for demo)
        $appDir = Join-Path $appPath "app"
        if (Test-Path $appDir) {
            # Create a simple index page
            $indexPath = Join-Path $pagesDir "index.js"
            Set-Content -Path $indexPath -Value @"
import React from 'react';

export default function Home() {
  return (
    <div>
      <h1>$((Get-Item $appPath).Name) Micro Frontend</h1>
      <p>This is a demo page for the $((Get-Item $appPath).Name) micro frontend.</p>
    </div>
  );
}
"@
            Write-Host "Created demo index page for $appPath" -ForegroundColor Yellow
        }
    }
}

# Function to build an app
function Build-App($appName) {
    Write-Host "Building $appName application..." -ForegroundColor Yellow
    $appPath = "apps/$appName"
    
    # Update next.config.js for Module Federation
    Update-NextConfig $appPath $appName
    
    # Create pages structure if needed
    Create-PagesStructure $appPath
    
    # Run the build
    Set-Location $appPath
    npm run build
    if ($LASTEXITCODE -ne 0) {
        Write-Host "Failed to build $appName application" -ForegroundColor Red
        exit 1
    }
    
    Set-Location "../.."
    Write-Host "$appName built successfully!" -ForegroundColor Green
}

# Build each application
Build-App "host"
Build-App "auth"
Build-App "dashboard"
Build-App "analytics"
Build-App "billing"
Build-App "admin"
Build-App "notifications"

Write-Host "All applications built successfully with Module Federation!" -ForegroundColor Green