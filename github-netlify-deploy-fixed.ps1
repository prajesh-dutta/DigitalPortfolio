# PowerShell Commands for Fixed GitHub Push and Netlify Deployment

# Since you've already manually updated package.json and netlify.toml,
# we'll just make sure everything is committed and pushed correctly

# 1. First, let's verify the netlify.toml file has the correct build command
# It should be: npm install && npm run build (not using the .new file)

# 2. Check that your package.json has all required dependencies
# Make sure it includes typescript, all react types, and UI components

# 3. Make sure you have these configuration files:
# - tsconfig.json
# - tsconfig.node.json
# - postcss.config.js
# - tailwind.config.js (if using Tailwind)

# 4. Add all changes to git
cd "d:\Downloads\DigitalPortfolio\DigitalPortfolio"
git add .

# 5. Commit the changes
git commit -m "Fix Netlify deployment configuration and dependencies"

# 6. Push to your GitHub repository
git push origin main  # replace 'main' with your branch name if different

# 7. After successful push, redeploy on Netlify:
# - Go to app.netlify.com
# - Select your site
# - Go to Deploys tab
# - Click "Trigger deploy" -> "Deploy site"
