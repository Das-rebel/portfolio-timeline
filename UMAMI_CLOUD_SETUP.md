# Umami Cloud — Quick Start Guide

**Status: RECOMMENDED FOR IMMEDIATE USE**

This is the fastest path to day-wise analytics for your portfolio. No infrastructure to manage.

---

## Setup (5 Minutes)

### 1. Create Umami Cloud Account

1. Go to [https://umami.is/cloud](https://umami.is/cloud)
2. Sign up with GitHub OAuth (fastest)
3. Verify email

### 2. Add Your Website

1. In Umami Cloud dashboard → **Add website**
2. Fill in:
   - **Name**: Portfolio Timeline
   - **Domain**: `das-rebel.github.io`
   - **Enable analytics**: Yes
3. Click **Save**

### 3. Copy Your Website ID

After saving, you'll see a **Website ID** (UUID format like `a1b2c3d4-...`).

**Copy this ID** — you'll need it for Step 5.

### 4. Update layout.tsx

In `app/layout.tsx`, find the `OPTION A` section and:

1. Uncomment the `UMAMI_CLOUD_WEBSITE_ID` constant at the top
2. Uncomment the `<script>` tag block inside `<head>`

It should look like:

```tsx
// Umami Cloud Configuration
const UMAMI_CLOUD_WEBSITE_ID = "xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx";
```

```tsx
{/* OPTION A: Umami Cloud (easiest - no deploy needed) */}
<script
  src="https://cloud.umami.is/script.js"
  data-website-id={UMAMI_CLOUD_WEBSITE_ID}
  async
  defer
/>
```

### 5. Commit & Push

```bash
cd ~/portfolio-timeline
git add -A
git commit -m "feat: add Umami Cloud analytics"
git push origin main
```

### 6. Verify

1. Wait for GitHub Pages deploy (~2 min)
2. Visit your portfolio
3. Check Umami Cloud dashboard for live visitor

---

## What You Get

| Feature | Free Tier |
|---------|-----------|
| Pageviews/month | 10,000 |
| Websites | 1 |
| Day-wise data | ✅ |
| Countries | ✅ |
| Devices | ✅ |
| Browsers | ✅ |
| Referrers | ✅ |
| Real-time | ✅ |
| GDPR compliant | ✅ |

---

## Troubleshooting

### Script not loading
- Verify Website ID is correct (32-char UUID)
- Check browser console for errors
- Make sure you uncommented BOTH the constant AND the script tag

### No data showing
- Umami has ~5 minute real-time delay
- Visit your site, wait 5 min, refresh dashboard

### Pageviews not counting
- Ad blockers may block Umami Cloud
- For no blocking: use self-hosted Umami (see umami/DO_DEPLOY.md)

---

## Migrate to Self-Hosted Later

When you outgrow the free tier:

1. Deploy Umami to DO App Platform (see `umami/DO_DEPLOY.md`)
2. Export data from Umami Cloud (Settings → Export)
3. Import to your self-hosted instance
4. Update the script tag URL from `cloud.umami.is` to your DO URL

---

## Cost

| Plan | Price | Pageviews |
|------|-------|-----------|
| Free | $0 | 10K/month |
| Starter | $9/month | 50K/month |
| Pro | $29/month | 200K/month |

For a personal portfolio, the **free tier is sufficient**.
