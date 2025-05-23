# PowerShell Commands to Fix Path Alias Issue and Deploy

# Navigate to your client directory
cd "d:\Downloads\DigitalPortfolio\DigitalPortfolio\client"

# Try a local build to verify everything works
Write-Host "Testing build locally..." -ForegroundColor Green
npm install
npm run build

# If successful, add all changes to git
cd "d:\Downloads\DigitalPortfolio\DigitalPortfolio"
git add .

# Commit the changes
git commit -m "Fix path alias resolution in Vite config for @/ imports"

# Push to your GitHub repository
git push origin main  # replace 'main' with your branch name if different

Write-Host "Changes pushed to GitHub. Now go to Netlify and trigger a new deployment." -ForegroundColor Green
