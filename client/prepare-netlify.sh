#!/bin/bash

# Prepare the environment for Netlify deployment
echo "Preparing environment for Netlify deployment..."

# Copy the new package.json
cp package.json.new package.json

# Install dependencies
echo "Installing dependencies..."
npm install

# Build the project
echo "Building the project..."
npm run build

echo "Environment preparation complete!"
