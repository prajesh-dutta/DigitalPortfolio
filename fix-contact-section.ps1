# PowerShell Commands to Fix TypeScript Error and Deploy

# Navigate to your client directory
cd "d:\Downloads\DigitalPortfolio\DigitalPortfolio\client"

# Verify TypeScript compilation works without errors
Write-Host "Checking TypeScript compilation..." -ForegroundColor Green
npx tsc --noEmit

# If the above command succeeds, add all changes to git
cd "d:\Downloads\DigitalPortfolio\DigitalPortfolio"
git add .

# Commit the changes
git commit -m "Fix TypeScript error: changed isPending to isLoading in contact-section.tsx"

# Push to your GitHub repository
git push origin main  # replace 'main' with your branch name if different

Write-Host "Changes pushed to GitHub. Now go to Netlify and trigger a new deployment." -ForegroundColor Green
