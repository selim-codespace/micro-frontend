# Script to start all micro frontend applications

Write-Host "Starting Micro Frontend Platform..." -ForegroundColor Green

# Start Host application
Write-Host "Starting Host application on port 3000..." -ForegroundColor Yellow
Start-Process powershell -ArgumentList "-NoExit", "-Command", "cd apps/host; npm run dev"

# Start Auth application
Write-Host "Starting Auth application on port 3001..." -ForegroundColor Yellow
Start-Process powershell -ArgumentList "-NoExit", "-Command", "cd apps/auth; npm run dev"

# Start Dashboard application
Write-Host "Starting Dashboard application on port 3002..." -ForegroundColor Yellow
Start-Process powershell -ArgumentList "-NoExit", "-Command", "cd apps/dashboard; npm run dev"

Write-Host "All applications started!" -ForegroundColor Green
Write-Host "Host: http://localhost:3000" -ForegroundColor Cyan
Write-Host "Auth: http://localhost:3001" -ForegroundColor Cyan
Write-Host "Dashboard: http://localhost:3002" -ForegroundColor Cyan