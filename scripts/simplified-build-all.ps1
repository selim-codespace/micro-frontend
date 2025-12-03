# Script to build all micro frontend applications with simplified configuration

Write-Host "Building Micro Frontend Platform (Simplified)..." -ForegroundColor Green

# Function to simplify next.config.js
function Simplify-NextConfig($appPath) {
    $configPath = Join-Path $appPath "next.config.js"
    if (Test-Path $configPath) {
        $simpleConfig = @"
/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
};

module.exports = nextConfig;
"@
        Set-Content -Path $configPath -Value $simpleConfig
        Write-Host "Simplified next.config.js for $appPath" -ForegroundColor Yellow
    }
}

# Function to build an app
function Build-App($appName) {
    Write-Host "Building $appName application..." -ForegroundColor Yellow
    Set-Location "apps/$appName"
    
    # Simplify the next.config.js
    Simplify-NextConfig "."
    
    # Run the build
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

Write-Host "All applications built successfully (simplified)!" -ForegroundColor Green