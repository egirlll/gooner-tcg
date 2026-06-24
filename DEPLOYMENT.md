# Deployment Guide - Gooner TCG

This guide walks through deploying Gooner TCG to Vercel.

## Quick Start (Recommended)

### 1. Connect GitHub to Vercel (One-time setup)

1. Go to [vercel.com](https://vercel.com)
2. Sign in or create an account
3. Click "New Project"
4. Import the GitHub repo: `egirlll/gooner-tcg`
5. Accept default settings and click "Deploy"

That's it! Your app is live. Vercel will auto-deploy on every push to `main`.

## Manual Deployment

### Option 1: Vercel CLI (Local Machine)

```bash
# Install Vercel CLI
npm install -g vercel

# Deploy to Vercel
vercel

# Follow prompts to:
# - Link to existing project (or create new)
# - Choose project name: "gooner-tcg"
# - Select framework: "Other" (it's a static site)
# - Set output directory: "." (current directory)

# Deploy to production
vercel --prod
```

### Option 2: GitHub Actions (Automatic)

The repo includes a GitHub Actions workflow that auto-deploys on push.

To enable auto-deployment:

1. Go to your GitHub repo settings
2. Navigate to "Secrets and variables" → "Actions"
3. Add these secrets:
   - `VERCEL_TOKEN`: Your Vercel API token (from [vercel.com/account/tokens](https://vercel.com/account/tokens))
   - `VERCEL_ORG_ID`: Your Vercel Organization ID
   - `VERCEL_PROJECT_ID`: Your Vercel Project ID

Then every push to `main` will auto-deploy!

### Option 3: Direct Vercel Dashboard

1. Sign in to [vercel.com](https://vercel.com)
2. Click "New Project"
3. Import from GitHub: `egirlll/gooner-tcg`
4. Click "Deploy"

## Alternative Hosting

This is a static site with no build step. You can deploy to:

### GitHub Pages
```bash
# Enable GitHub Pages in repo settings
# Set source to "main" branch
# Your site will be available at: https://egirlll.github.io/gooner-tcg
```

### Netlify
```bash
# Install Netlify CLI
npm install -g netlify-cli

# Deploy
netlify deploy --prod --dir .
```

### Firebase Hosting
```bash
# Install Firebase CLI
npm install -g firebase-tools

# Initialize project
firebase init hosting

# Deploy
firebase deploy
```

### AWS S3 + CloudFront
```bash
# Upload files to S3 bucket
aws s3 sync . s3://your-bucket-name

# Create CloudFront distribution pointing to S3
```

## Environment Variables

Gooner TCG doesn't require any environment variables. Everything is client-side!

The app uses localStorage for persistent data (collection, packs owned, etc).

## Custom Domain

### On Vercel:
1. Go to your Vercel project settings
2. Navigate to "Domains"
3. Add your custom domain
4. Follow DNS configuration instructions

### On other hosts:
Update your DNS settings to point your domain to the hosting provider.

## Monitoring & Analytics

### Vercel provides:
- Deployment analytics
- Performance metrics
- Real-time logs

Access via your project dashboard.

### Add Google Analytics (Optional):
Insert this in `<head>` of `index.html`:
```html
<!-- Google Analytics -->
<script async src="https://www.googletagmanager.com/gtag/js?id=GA_MEASUREMENT_ID"></script>
<script>
  window.dataLayer = window.dataLayer || [];
  function gtag(){dataLayer.push(arguments);}
  gtag('js', new Date());
  gtag('config', 'GA_MEASUREMENT_ID');
</script>
```

Replace `GA_MEASUREMENT_ID` with your Google Analytics ID.

## Troubleshooting

### Site shows 404 or blank page
- Ensure `index.html` is in the root directory
- Check vercel.json configuration
- Review Vercel build logs in dashboard

### CSS/JS not loading
- Check browser DevTools Network tab
- Ensure all file paths are relative (not absolute)
- Clear browser cache

### Collection data lost
- Check browser localStorage (DevTools → Application → Local Storage)
- Note: Data is device/browser specific, not synced across devices

### Need to update images later
- Replace picsum.photos URLs in `cards.js`
- Commit and push to GitHub
- Vercel will auto-deploy

## Version Rollback

To rollback to a previous version on Vercel:

1. Go to Vercel Dashboard
2. Select your project
3. Go to "Deployments"
4. Find the deployment you want
5. Click "Promote to Production"

Or use Git:
```bash
git revert <commit-hash>
git push origin main
```

## Performance Tips

- Images are lazy-loaded via Picsum Photos CDN
- localStorage keeps collection data local (no backend needed)
- CSS is minified and optimized
- JavaScript is vanilla (no framework overhead)

Current Lighthouse scores (typical):
- Performance: 90+
- Accessibility: 95+
- Best Practices: 95+
- SEO: 95+

## Support

For Vercel-specific issues:
- [Vercel Docs](https://vercel.com/docs)
- [Vercel Support](https://vercel.com/support)

For app issues:
- Check [GitHub Issues](https://github.com/egirlll/gooner-tcg/issues)
- Create a new issue with details

---

**Happy deploying! 🚀**
