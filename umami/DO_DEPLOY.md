# Umami Analytics — DigitalOcean App Platform Deployment

This guide deploys Umami on DigitalOcean App Platform with managed PostgreSQL.

---

## Prerequisites

- DigitalOcean account ([sign up](https://digitalocean.com) with $200 free credit)
- Domain/subdomain for Umami (optional, DO provides a default URL)

---

## Method 1: App Spec Deploy (Recommended)

### Step 1: Generate APP_SECRET

```bash
# Generate a secure random string
openssl rand -base64 32
```

Copy the output — you'll need it for Step 3.

### Step 2: Create the App

**Option A: Via DigitalOcean Console**

1. Go to [cloud.digitalocean.com/apps](https://cloud.digitalocean.com/apps)
2. Click **"Create App"**
3. Select **"Service"** (not Containers)
4. For **Repository**, choose:
   - Owner: `umami-software`
   - Repository: `umami`
   - Branch: `master`
5. For **Dockerfile Path**, enter: `Dockerfile.postgresql`
6. Click **Next**

**Option B: Via doctl CLI**

```bash
# Install doctl
brew install doctl

# Authenticate
doctl auth init

# Create app from spec
doctl apps create --spec spec.json
```

### Step 3: Configure Environment Variables

In the DigitalOcean App dashboard, add these environment variables:

| Key | Value | Type |
|-----|-------|------|
| `DATABASE_TYPE` | `postgresql` | Secret: **No** |
| `APP_SECRET` | `<your-openssl-output>` | Secret: **Yes** |
| `DATABASE_URL` | `${umami-db.DATABASE_URL}` | Secret: **No** |

The `DATABASE_URL` will be automatically populated from the managed database.

### Step 4: Configure Database

The spec includes a managed PostgreSQL 15 database (`umami-db`). The connection string is injected via the `DATABASE_URL` environment variable using DO's reference syntax.

### Step 5: Set Port & Health Check

- **HTTP Port**: `3000`
- **Health Check Path**: `/api/health`

### Step 6: Deploy

Click **"Create Resources"**. Deployment takes ~3-5 minutes.

---

## Method 2: Fork & Deploy (Easiest)

### Step 1: Fork Umami

```
1. Go to https://github.com/umami-software/umami
2. Click "Fork"
3. Select your GitHub account
```

### Step 2: Create App from Fork

1. DigitalOcean Console → **Create App** → **Service**
2. Connect your forked repo
3. Set Dockerfile path: `Dockerfile.postgresql`
4. Add environment variable: `APP_SECRET` = `<openssl output>`
5. Add managed PostgreSQL database
6. Set port: `3000`, health check: `/api/health`
7. Deploy

---

## Method 3: Container Registry (Use Your Own Image)

### Step 1: Build and Push to DO Container Registry

```bash
# Login to DO Container Registry
doctl registry login

# Pull Umami image
docker pull ghcr.io/umami-software/umami:postgresql-latest

# Tag for DO Registry
doctl registry tag ghcr.io/umami-software/umami:postgresql-latest \
  registry.digitalocean.com/<your-registry>/umami:latest

# Push
doctl registry push <your-registry>/umami:latest
```

### Step 2: Create App from Your Registry

In DO Console:
1. **Create App** → **Container**
2. Select your image from DO Container Registry
3. Add the managed PostgreSQL database
4. Set env vars and health check

---

## Post-Deployment Setup

### 1. Access Umami

After deployment, you'll get a default URL:
```
https://umami-<random>.ondigitalocean.app
```

Or your custom domain if configured.

### 2. Login & Change Password

```
Default credentials:
- Username: admin
- Password: umami
```

⚠️ **Change immediately after first login!**

### 3. Add Your Website

1. Go to **Settings** → **Websites**
2. Click **Add website**
3. Fill in:
   - **Name**: Portfolio Timeline
   - **Domain**: `das-rebel.github.io`
   - **Enable analytics**: Yes
4. Click **Save**
5. Copy the **Website ID** (UUID format)

### 4. Configure GitHub Secrets

In your `portfolio-timeline` GitHub repo:

```
Settings → Secrets and variables → Actions → New repository secret:

NEXT_PUBLIC_UMAMI_URL = https://umami-<random>.ondigitalocean.app
NEXT_PUBLIC_UMAMI_WEBSITE_ID = <the-uuid-from-step-3>
```

### 5. Trigger Rebuild

```bash
cd ~/portfolio-timeline
git commit --allow-empty -m "chore: activate Umami analytics"
git push origin main
```

---

## Custom Domain Setup (Optional)

### For Umami Dashboard

1. In DO App → **Settings** → **Domains**
2. Add your domain (e.g., `analytics.yourdomain.com`)
3. Add the DNS record DO provides
4. Wait for SSL certificate (auto-provisioned)

### DNS Configuration

Add a CNAME record:
```
Type: CNAME
Name: analytics (or umami)
Value: <your-do-app-url>.ondigitalocean.app
```

---

## Troubleshooting

### "Connection refused" errors

Check that:
1. Port is set to `3000` in DO App settings
2. Health check path is `/api/health`
3. `DATABASE_URL` is correctly set (format: `postgresql://...`)

### Database connection issues

```bash
# Test connection string format
postgresql://user:password@host:5432/dbname

# Verify DATABASE_URL in DO console matches this format
```

### Build failures

Umami's `Dockerfile.postgresql` requires:
- Node.js 18+
- PostgreSQL 15+

If builds fail, check DO's build logs for specific errors.

### Reset admin password

```bash
# Connect to managed DB via DO console
# Run this SQL:

UPDATE account
SET password = '$2a$10$rIC/i7XQgNqBjxG6u1W4O.JxRx2G6P7YvKz3QfR6SjH8E5YxW1Z0u'
WHERE username = 'admin';

-- New password will be: Umami@2024!
```

---

## Cost Estimate

| Resource | Size | Monthly Cost |
|----------|------|-------------|
| Umami Service | basic-xxs | $5.00 |
| PostgreSQL DB | db-s-dev-database | $7.00 |
| Bandwidth | ~100MB/month | ~$0.00 |
| **Total** | | **~$12/month** |

For personal use, this is well within free tier credits.

---

## Files in This Directory

```
umami/
├── spec.json          ← DO App Platform spec (for doctl)
├── docker-compose.yml  ← Local development
├── Dockerfile         ← Production container
├── .env.example       ← Environment template
└── DO_DEPLOY.md       ← This file
```

---

## Useful Commands

```bash
# List apps
doctl apps list

# Get app details
doctl apps get <app-id>

# View deployment logs
doctl apps logs <app-id> --deployment <deployment-id>

# Trigger new deployment
doctl apps create-deployment <app-id>
```
