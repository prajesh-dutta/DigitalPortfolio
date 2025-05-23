# PowerShell Commands to Fix Netlify Deployment

# Navigate to your client directory
cd "d:\Downloads\DigitalPortfolio\DigitalPortfolio\client"

# Apply the new package.json
Copy-Item -Path "package.json.new" -Destination "package.json" -Force

# Apply the new netlify.toml
Copy-Item -Path "netlify.toml.new" -Destination "netlify.toml" -Force

# Test the build locally
npm install
npm run build

# If successful, you should see a "dist" folder created
# You can now deploy following the instructions in the NETLIFY_DEPLOYMENT_GUIDE_FIXED.md file
