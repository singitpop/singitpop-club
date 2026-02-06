# Deployment Guide

**How to deploy changes to the SingIt Pop website.**

---

## 🚀 Automatic Deployment (Current Setup)

**Your site automatically deploys when you push to GitHub.**

### How It Works

1. **You make changes** locally
2. **Commit to Git:** `git add -A && git commit -m "Your message"`
3. **Push to GitHub:** `git push origin main`
4. **Vercel detects the push** and starts building
5. **Site goes live** in ~2-3 minutes

**No manual steps required!**

---

## 📋 Pre-Deployment Checklist

**Before pushing to production:**

- [ ] Test locally (`npm run dev`)
- [ ] Check for TypeScript errors (`npm run build`)
- [ ] Review changes in browser
- [ ] Test on mobile (responsive design)
- [ ] Check console for errors (F12 → Console)
- [ ] Verify no sensitive data in code (API keys, passwords)

---

## 🔧 Local Testing

### Start Development Server

```bash
cd /Users/garybirrell/Desktop/Singitpop/website
npm run dev
```

**Access at:** http://localhost:3000

### Build for Production (Test)

```bash
npm run build
```

**This checks for:**
- TypeScript errors
- Build errors
- Missing dependencies

**If build succeeds locally, it will succeed on Vercel.**

---

## 📤 Deployment Steps

### Step 1: Stage Your Changes

```bash
git add -A
```

**This stages all modified files.**

### Step 2: Commit with Message

```bash
git commit -m "Add Google sign-in and update legal pages"
```

**Good commit messages:**
- "Fix iPad audio bug on Music page"
- "Add Refund Policy page for DMCC compliance"
- "Update email addresses to @singitpop.com"

**Bad commit messages:**
- "fixes"
- "update"
- "asdf"

### Step 3: Push to GitHub

```bash
git push origin main
```

**This triggers automatic deployment.**

### Step 4: Monitor Deployment

1. Go to https://vercel.com/dashboard
2. Click on your "singitpop-club" project
3. Watch the deployment progress
4. Wait for "Ready" status (~2-3 minutes)

---

## 🔍 Verifying Deployment

### Check Deployment Status

**In Vercel Dashboard:**
- ✅ **Ready** = Deployment successful
- 🔄 **Building** = In progress
- ❌ **Error** = Build failed

### Test Live Site

1. Visit https://singitpop.club
2. Hard refresh (Cmd+Shift+R on Mac, Ctrl+Shift+R on Windows)
3. Verify your changes are live
4. Test functionality

---

## ⚠️ Troubleshooting Failed Deployments

### Build Failed

**Check Vercel logs:**
1. Go to Vercel Dashboard
2. Click on the failed deployment
3. Read the error message

**Common issues:**
- **TypeScript error:** Fix type errors in code
- **Missing dependency:** Run `npm install [package]`
- **Environment variable missing:** Add in Vercel settings

### Fix and Redeploy

```bash
# Fix the issue locally
# Test with npm run build
npm run build

# If successful, commit and push again
git add -A
git commit -m "Fix build error"
git push origin main
```

---

## 🔐 Environment Variables

**Required for production:**

### In Vercel Dashboard

1. Go to Project Settings → Environment Variables
2. Add these variables:

| Variable | Value | Where to Get |
|----------|-------|--------------|
| `NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY` | pk_live_... | Clerk Dashboard |
| `CLERK_SECRET_KEY` | sk_live_... | Clerk Dashboard |
| `NEXT_PUBLIC_SUPABASE_URL` | https://...supabase.co | Supabase Dashboard |
| `NEXT_PUBLIC_SUPABASE_ANON_KEY` | eyJ... | Supabase Dashboard |
| `SUPABASE_SERVICE_ROLE_KEY` | eyJ... | Supabase Dashboard |
| `STRIPE_SECRET_KEY` | sk_live_... | Stripe Dashboard |
| `NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY` | pk_live_... | Stripe Dashboard |
| `AWS_ACCESS_KEY_ID` | AKIA... | AWS IAM |
| `AWS_SECRET_ACCESS_KEY` | ... | AWS IAM |
| `AWS_REGION` | eu-west-2 | AWS S3 Settings |
| `AWS_S3_BUCKET_NAME` | singitpop-media | AWS S3 Settings |

**After adding/changing environment variables:**
- Redeploy from Vercel Dashboard
- Or push a new commit to trigger rebuild

---

## 🔄 Rollback (Undo Deployment)

**If something goes wrong:**

### Option 1: Instant Rollback (Vercel)

1. Go to Vercel Dashboard → Deployments
2. Find the last working deployment
3. Click "..." → "Promote to Production"
4. Site reverts immediately

### Option 2: Git Revert

```bash
# Find the commit hash of the last good version
git log

# Revert to that commit
git revert [commit-hash]

# Push to trigger new deployment
git push origin main
```

---

## 📊 Deployment Best Practices

### 1. **Deploy During Low Traffic**
- Best time: Late night or early morning (UK time)
- Avoid: Friday afternoons, peak hours

### 2. **Test Thoroughly Before Deploying**
- Always run `npm run build` locally first
- Test all changed pages
- Check mobile responsiveness

### 3. **Use Descriptive Commit Messages**
- Helps track what changed when
- Makes rollback easier

### 4. **Deploy Small Changes**
- Don't bundle 10 features in one deploy
- Easier to debug if something breaks

### 5. **Monitor After Deployment**
- Check live site immediately
- Watch for error reports
- Monitor analytics for unusual drops

---

## 🚨 Emergency Deployment

**If you need to deploy a critical fix immediately:**

```bash
# Make the fix
# Test locally
npm run build

# If successful, deploy
git add -A
git commit -m "URGENT: Fix critical bug"
git push origin main

# Monitor Vercel dashboard
# Verify fix on live site
```

**Notify users if needed:**
- Post on social media
- Send email to VIP members
- Update status page (if you have one)

---

## 📝 Deployment Log Template

**Keep a log of major deployments:**

```
Date: 6 February 2026
Deployed by: Gary
Changes:
- Added 7 legal compliance pages
- Updated email addresses to @singitpop.com
- Fixed iPad audio bug
Commit: a22cc27
Status: ✅ Success
Issues: None
```

---

## 🔗 Useful Links

- **Vercel Dashboard:** https://vercel.com/dashboard
- **GitHub Repository:** https://github.com/singitpop/singitpop-club
- **Live Site:** https://singitpop.club
- **Vercel Docs:** https://vercel.com/docs

---

**Last Updated:** 6 February 2026  
**Review:** When deployment process changes
