# PowerShell Commands for GitHub Push and Netlify Deployment

# 1. Apply the fixes first
cd "d:\Downloads\DigitalPortfolio\DigitalPortfolio\client"
Copy-Item -Path "package.json.new" -Destination "package.json" -Force
Copy-Item -Path "netlify.toml.new" -Destination "netlify.toml" -Force

# 2. Test build locally to make sure everything works
npm install
npm run build

# 3. Add all changes to git
cd "d:\Downloads\DigitalPortfolio\DigitalPortfolio"
git add .

# 4. Commit the changes
git commit -m "Fix Netlify deployment configuration and dependencies"

# 5. Push to your GitHub repository
git push origin main  # replace 'main' with your branch name if different

# 6. After successful push, redeploy on Netlify:
# - Go to app.netlify.com
# - Select your site
# - Go to Deploys tab
# - Click "Trigger deploy" -> "Deploy site"
# - Or if using Netlify CLI:
# cd "d:\Downloads\DigitalPortfolio\DigitalPortfolio"
# netlify deploy --prod
