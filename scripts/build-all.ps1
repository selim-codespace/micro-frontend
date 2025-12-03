# Script to build all micro frontend applications

Write-Host "Building Micro Frontend Platform..." -ForegroundColor Green

# Build Host application
Write-Host "Building Host application..." -ForegroundColor Yellow
Set-Location apps/host
npm run build
if ($LASTEXITCODE -ne 0) {
    Write-Host "Failed to build Host application" -ForegroundColor Red
    exit 1
}
Set-Location ../..

# Build Auth application
Write-Host "Building Auth application..." -ForegroundColor Yellow
Set-Location apps/auth
npm run build
if ($LASTEXITCODE -ne 0) {
    Write-Host "Failed to build Auth application" -ForegroundColor Red
    exit 1
}
Set-Location ../..

# Build Dashboard application
Write-Host "Building Dashboard application..." -ForegroundColor Yellow
Set-Location apps/dashboard
npm run build
if ($LASTEXITCODE -ne 0) {
    Write-Host "Failed to build Dashboard application" -ForegroundColor Red
    exit 1
}
Set-Location ../..

# Build Analytics application
Write-Host "Building Analytics application..." -ForegroundColor Yellow
Set-Location apps/analytics
npm run build
if ($LASTEXITCODE -ne 0) {
    Write-Host "Failed to build Analytics application" -ForegroundColor Red
    exit 1
}
Set-Location ../..

# Build Billing application
Write-Host "Building Billing application..." -ForegroundColor Yellow
Set-Location apps/billing
npm run build
if ($LASTEXITCODE -ne 0) {
    Write-Host "Failed to build Billing application" -ForegroundColor Red
    exit 1
}
Set-Location ../..

# Build Admin application
Write-Host "Building Admin application..." -ForegroundColor Yellow
Set-Location apps/admin
npm run build
if ($LASTEXITCODE -ne 0) {
    Write-Host "Failed to build Admin application" -ForegroundColor Red
    exit 1
}
Set-Location ../..

# Build Notifications application
Write-Host "Building Notifications application..." -ForegroundColor Yellow
Set-Location apps/notifications
npm run build
if ($LASTEXITCODE -ne 0) {
    Write-Host "Failed to build Notifications application" -ForegroundColor Red
    exit 1
}
Set-Location ../..

Write-Host "All applications built successfully!" -ForegroundColor Green