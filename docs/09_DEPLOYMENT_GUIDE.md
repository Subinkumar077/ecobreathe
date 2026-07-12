# 09 — Deployment Guide

This document explains how to deploy the ecoBreathe application to production using **Vercel** (recommended) and **Netlify** (alternative).

---

## Pre-Deployment Checklist

Before deploying, ensure:

- [ ] `npm run build` completes without errors
- [ ] `npx vite preview` runs correctly locally
- [ ] All API keys are working
- [ ] No `console.log` statements in production code (use `console.error` sparingly)
- [ ] Environment variables are documented in `.env.example`
- [ ] `favicon.ico` and OG meta images are in `public/`
- [ ] All routes work correctly (test deep links like `/dashboard/india/delhi/new-delhi`)

### Build Verification

```bash
# Build the production bundle
npm run build

# Preview the production build locally
npx vite preview

# Check bundle size
npx vite build --report
```

**Expected output directory**: `dist/`

---

## Option 1: Vercel (Recommended) ⭐

Vercel is the recommended platform because:
- Zero-config for Vite/React projects
- Automatic CI/CD on every git push
- Free SSL, CDN, and preview deployments
- Excellent performance with edge network
- Free tier is generous (100 deployments/day)

### Step 1: Push Code to GitHub

```bash
# Initialize git (if not already done)
git init
git add .
git commit -m "Initial commit: ecoBreathe AQI application"

# Create a GitHub repository and push
git remote add origin https://github.com/YOUR_USERNAME/ecoBreathe.git
git branch -M main
git push -u origin main
```

### Step 2: Connect to Vercel

1. Go to [vercel.com](https://vercel.com) and sign in with GitHub
2. Click **"Add New Project"**
3. Select your `ecoBreathe` repository
4. Vercel auto-detects Vite — verify these settings:

| Setting | Value |
|---------|-------|
| Framework Preset | Vite |
| Build Command | `npm run build` |
| Output Directory | `dist` |
| Install Command | `npm install` |

### Step 3: Configure Environment Variables

In Vercel's project settings → **Environment Variables**, add:

| Variable Name | Value | Environment |
|--------------|-------|-------------|
| `VITE_WAQI_TOKEN` | `your_waqi_token` | Production, Preview, Development |
| `VITE_OWM_API_KEY` | `your_openweathermap_key` | Production, Preview, Development |
| `VITE_IQAIR_API_KEY` | `your_iqair_key` | Production, Preview, Development |
| `VITE_DEFAULT_CITY` | `new-delhi` | Production, Preview, Development |
| `VITE_DEFAULT_LAT` | `28.6353` | Production, Preview, Development |
| `VITE_DEFAULT_LNG` | `77.2250` | Production, Preview, Development |
| `VITE_REFRESH_INTERVAL` | `300000` | Production, Preview, Development |

> [!IMPORTANT]
> All Vite environment variables MUST start with `VITE_` to be exposed to the client-side code. Variables without this prefix will NOT be available in the browser.

### Step 4: Deploy

Click **"Deploy"** — Vercel will:
1. Clone your repository
2. Install dependencies
3. Run `npm run build`
4. Deploy `dist/` to their CDN
5. Assign a URL: `https://eco-breathe-xxxxx.vercel.app`

### Step 5: SPA Routing Configuration

Vite SPAs need a rewrite rule so that all routes serve `index.html`. Create a `vercel.json` in the project root:

```json
{
  "rewrites": [
    { "source": "/(.*)", "destination": "/index.html" }
  ],
  "headers": [
    {
      "source": "/assets/(.*)",
      "headers": [
        { "key": "Cache-Control", "value": "public, max-age=31536000, immutable" }
      ]
    }
  ]
}
```

### Step 6: Custom Domain (Optional)

1. Go to Vercel project → **Settings** → **Domains**
2. Add your custom domain (e.g., `ecobreathe.in`)
3. Update DNS records at your domain registrar:
   - **CNAME**: `cname.vercel-dns.com`
   - Or **A Record**: `76.76.21.21`
4. Vercel auto-provisions SSL certificate

### Vercel Free Tier Limits

| Resource | Limit |
|----------|-------|
| Bandwidth | 100 GB/month |
| Builds | 6,000 minutes/month |
| Deployments | 100/day |
| Serverless Functions | Not used (static site) |
| Team Members | 1 (Hobby plan) |

---

## Option 2: Netlify (Alternative)

### Step 1: Push Code to GitHub

Same as Vercel Step 1.

### Step 2: Connect to Netlify

1. Go to [netlify.com](https://www.netlify.com) and sign in with GitHub
2. Click **"Add new site"** → **"Import an existing project"**
3. Select your `ecoBreathe` repository
4. Configure build settings:

| Setting | Value |
|---------|-------|
| Build Command | `npm run build` |
| Publish Directory | `dist` |

### Step 3: Configure Environment Variables

In Netlify → **Site settings** → **Environment variables**, add the same variables as listed in the Vercel section.

### Step 4: SPA Routing Configuration

Create a `public/_redirects` file:

```
/*    /index.html   200
```

Or create a `netlify.toml` in the project root:

```toml
[build]
  command = "npm run build"
  publish = "dist"

[[redirects]]
  from = "/*"
  to = "/index.html"
  status = 200

[[headers]]
  for = "/assets/*"
  [headers.values]
    Cache-Control = "public, max-age=31536000, immutable"
```

### Step 5: Deploy

Click **"Deploy site"** — Netlify will:
1. Clone, install, build
2. Deploy to their CDN
3. Assign a URL: `https://ecobreathe-xxxxx.netlify.app`

### Netlify Free Tier Limits

| Resource | Limit |
|----------|-------|
| Bandwidth | 100 GB/month |
| Build Minutes | 300/month |
| Sites | Unlimited |
| Team Members | 1 |

---

## Environment Variable Security

> [!WARNING]
> Since this is a **client-side only** application, all `VITE_` prefixed environment variables will be embedded into the JavaScript bundle and **visible in the browser**. This is a known limitation of frontend-only apps.

### Why This Is Acceptable for ecoBreathe

1. **WAQI Token**: Free tier, no billing — worst case: someone else uses your quota
2. **OpenWeatherMap Key**: Free tier with 1,000 calls/day — rate-limited by design
3. **IQAir Key**: Community plan with 10,000 calls/month — minimal risk

### If You Need Better Security (Future)

Add a minimal API proxy:
1. Use Vercel/Netlify serverless functions (both support them free)
2. Move API keys to server-side environment variables (without `VITE_` prefix)
3. Create proxy endpoints like `/api/aqi?city=delhi`
4. Frontend calls your proxy instead of external APIs directly

---

## Post-Deployment Verification

After deployment, verify:

- [ ] Home page loads correctly at production URL
- [ ] AQI data fetches and displays (check browser DevTools Network tab)
- [ ] Search functionality works
- [ ] Dashboard routes work: `/dashboard/india/delhi/new-delhi`
- [ ] Deep links work (navigate directly to a dashboard URL)
- [ ] Images and fonts load correctly
- [ ] Mobile responsive layout works
- [ ] Map loads with OpenStreetMap tiles
- [ ] Charts render with data
- [ ] Auto-refresh works (wait 5 minutes)
- [ ] Error handling works (disconnect internet, verify fallback)

### Performance Testing

Run Lighthouse audit on the deployed URL:

1. Open Chrome DevTools → **Lighthouse** tab
2. Select: Performance, Accessibility, Best Practices, SEO
3. Run audit
4. Target scores: >90 for all categories

### Cross-Browser Testing

Test on:
- [ ] Chrome (latest)
- [ ] Firefox (latest)
- [ ] Safari (latest)
- [ ] Edge (latest)
- [ ] Mobile Chrome (Android)
- [ ] Mobile Safari (iOS)

---

## Continuous Deployment

Both Vercel and Netlify support automatic deployments:

- **Every push to `main`** → triggers production deployment
- **Every pull request** → triggers preview deployment with unique URL

This means:
1. Work on a feature branch
2. Push to GitHub
3. Get a preview URL to test
4. Merge to `main`
5. Production auto-deploys

---

## Next Steps

Proceed to [10_IMPROVEMENTS.md](./10_IMPROVEMENTS.md) for future enhancement suggestions.
