# Umami Analytics Integration

This directory contains the configuration for self-hosted Umami analytics.

## Quick Start

### 1. Deploy Umami (Choose One)

#### Option A: Railway (Recommended — Free Tier)

1. Create account at [railway.app](https://railway.app)
2. New Project → Empty Project
3. Add PostgreSQL plugin (free tier: 500MB)
4. Add Docker container with this image:
   ```
   ghcr.io/umami-software/umami:postgresql-latest
   ```
5. Set environment variables:
   - `DATABASE_URL`: `postgresql://postgres:${PG_PASSWORD}@${PG_HOST}:${PG_PORT}/${PG_DATABASE}`
   - `DATABASE_TYPE`: `postgresql`
   - `APP_SECRET`: Generate with `openssl rand -base64 32`
6. Set port to `3000`
7. Deploy — takes ~2 minutes

#### Option B: Coolify (Self-hosted)

1. Install Coolify on your VPS
2. Create new resource → Umami
3. Add PostgreSQL database
4. Deploy

#### Option C: DigitalOcean App Platform

1. Create `app.yaml` with:
   ```yaml
   name: umami
   services:
     - name: umami
       github:
         repo: umami-software/umami
         branch: main
         dockerfile_path: Dockerfile.postgresql
       port: 3000
       env:
         - key: DATABASE_URL
           value: ${db.UMAMI_DATABASE_URL}
         - key: APP_SECRET
           value: ${secret.APP_SECRET}
   ```

#### Option D: Fly.io (Free Tier)

```bash
fly launch --image ghcr.io/umami-software/umami:postgresql-latest
fly secrets set APP_SECRET=$(openssl rand -base64 32)
fly secrets set DATABASE_URL=postgres://...
fly scale count 1
```

---

### 2. Configure Umami Dashboard

1. Open your Umami instance URL
2. Login with default credentials: `admin` / `umami`
3. **Change the default password immediately!**
4. Go to **Settings → Websites** → Add website
5. Enter name: `Portfolio Timeline`
6. Enter domain: `das-rebel.github.io`
7. Copy the **Website ID** (UUID format)

---

### 3. Update GitHub Actions (Optional)

If you want to track deployments:

Add to your GitHub repository secrets:
- `NEXT_PUBLIC_UMAMI_URL`: Your Umami instance URL
- `NEXT_PUBLIC_UMAMI_WEBSITE_ID`: The website ID from step 2

---

### 4. Verify Integration

1. Push the changes:
   ```bash
   git add -A
   git commit -m "feat: add Umami analytics"
   git push origin main
   ```
2. Wait for GitHub Pages deployment (~2 min)
3. Visit your portfolio
4. Check Umami dashboard for live visitor

---

## Files in This Directory

```
umami/
├── docker-compose.yml    # Self-hosting config (Docker Compose)
└── .env.example         # Environment variable template
```

---

## What Gets Tracked

| Metric | Description |
|--------|-------------|
| Unique visitors | Based on anonymized fingerprint |
| Page views | Each page load |
| Referrers | Traffic sources |
| Countries | Geo IP detection |
| Devices | Desktop/Mobile/Tablet |
| Browsers | Chrome, Firefox, Safari, etc. |
| Languages | Browser language |
| Pages | Most visited pages |

---

## Privacy

Umami is:
- ✅ GDPR compliant (no cookies required)
- ✅ No personal data collection
- ✅ Cookieless by default
- ✅ Self-hosted (your data stays yours)

---

## Troubleshooting

### Script not loading
- Verify `NEXT_PUBLIC_UMAMI_URL` has no trailing slash
- Check browser console for errors
- Verify Website ID is correct

### No data showing
- Umami has ~5 minute delay for real-time
- Check if script is blocked by ad blocker (use umami.is if so)

### Reset password
```bash
docker exec -it umami psql -U umami -d umami
UPDATE account SET password = '$2a$10$...' WHERE username = 'admin';
```
