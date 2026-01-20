# GitHub Pages Deployment Guide

This guide will help you deploy the Riad Seif Foundation website to GitHub Pages.

## Prerequisites

- GitHub repository: `maz-is-blue/Riad-Seif`
- Node.js installed
- Git configured

## Setup Steps

### 1. Enable GitHub Pages

1. Go to your repository on GitHub: https://github.com/maz-is-blue/Riad-Seif
2. Click on **Settings** → **Pages**
3. Under **Source**, select **GitHub Actions**
4. Save the settings

### 2. Build and Deploy

The GitHub Actions workflow will automatically build and deploy your site when you push to the `main` branch.

#### Manual Build (for testing):

```bash
cd frontend
npm install
npm run build
```

The build output will be in `frontend/build/`

### 3. Push Changes

```bash
git add .
git commit -m "Setup GitHub Pages deployment"
git push origin main
```

### 4. View Your Site

After the GitHub Actions workflow completes (usually takes 2-3 minutes), your site will be available at:

**https://maz-is-blue.github.io/Riad-Seif/**

## Important Notes

- The base path is set to `/Riad-Seif/` in `vite.config.ts`
- All routes will work correctly with the base path
- The 404.html file handles SPA routing for GitHub Pages
- The site will automatically rebuild on every push to `main`

## Troubleshooting

- Check the **Actions** tab in GitHub to see if the deployment workflow is running
- Make sure GitHub Pages is enabled in repository settings
- Verify the base path matches your repository name

