# PowerShell Commands to Fix Netlify Deployment (Updated)

# Navigate to your client directory
cd "d:\Downloads\DigitalPortfolio\DigitalPortfolio\client"

# Install all dependencies
Write-Host "Installing all dependencies..." -ForegroundColor Green
npm install

# Check for TypeScript errors
Write-Host "Checking for TypeScript errors..." -ForegroundColor Green
npx tsc --noEmit

# Add all changes to git
cd "d:\Downloads\DigitalPortfolio\DigitalPortfolio"
git add .

# Commit the changes
git commit -m "Fix missing dependencies and TypeScript configuration"

# Push to your GitHub repository
git push origin main  # replace 'main' with your branch name if different

Write-Host "Changes pushed to GitHub. Now go to Netlify and trigger a new deployment." -ForegroundColor Green
