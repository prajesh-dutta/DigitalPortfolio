# Netlify Deployment Guide

This guide provides step-by-step instructions for deploying the Digital Portfolio frontend to Netlify.

## Prerequisites

- A Netlify account (sign up at [netlify.com](https://netlify.com) if you don't have one)
- Git repository with your project (GitHub, GitLab, or Bitbucket)

## Deployment Steps

### Option 1: Deploy via Netlify UI (Recommended for first-time setup)

1. **Login to Netlify**
   - Go to [app.netlify.com](https://app.netlify.com) and log in with your account

2. **Add New Site**
   - Click the "Add new site" button
   - Select "Import an existing project"

3. **Connect to Git Provider**
   - Choose your Git provider (GitHub, GitLab, or Bitbucket)
   - Authenticate with your provider
   - Select your repository

4. **Configure Build Settings**
   - Base directory: `client`
   - Build command: `npm run build`
   - Publish directory: `dist`

5. **Advanced Build Settings**
   - Click "Show advanced" 
   - Set Node version to: `18` (or your preferred Node.js version)

6. **Deploy**
   - Click "Deploy site"
   - Wait for the deployment to complete

### Option 2: Deploy via Netlify CLI

1. **Install Netlify CLI**
   ```bash
   npm install -g netlify-cli
   ```

2. **Login to Netlify**
   ```bash
   netlify login
   ```

3. **Initialize Netlify in your project**
   ```bash
   cd client
   netlify init
   ```

4. **Deploy your site**
   ```bash
   netlify deploy --prod
   ```

## Verify Deployment

1. After deployment, Netlify will provide a URL for your site
2. Visit the URL and test the contact form functionality
3. Check that API requests are correctly proxied to your Render backend

## Troubleshooting

If you encounter CORS issues:
1. Verify the redirects in `netlify.toml` are correctly set up
2. Check the browser console for specific error messages
3. Make sure your backend on Render is correctly configured to accept requests from your Netlify domain

For other issues, consult the [Netlify documentation](https://docs.netlify.com/) or contact support.
