# 📋 Artist Project Setup & Album Release Guide

This document contains the complete, step-by-step instructions to set up a brand-new website project for a new music artist from scratch and release their music safely. Save this to your Apple Notes.

---

## 📂 Phase 0: Base Codebase Setup & Rebranding
Follow these steps when duplicating this repository to start a new project for a different artist:

### 1. Duplicate & Initialize Repository
1. Duplicate the project directory on your computer:
   ```bash
   cp -r /Users/garybirrell/Desktop/Singitpop/website /Users/garybirrell/Desktop/[NewArtist]/website
   cd /Users/garybirrell/Desktop/[NewArtist]/website
   ```
2. Wipe the previous artist's Git history to start a clean repository:
   ```bash
   rm -rf .git
   git init
   ```
3. Link the local repository to your new artist's GitHub repository:
   ```bash
   git remote add origin https://github.com/[NewGithubUsername]/[NewRepoName].git
   git branch -M main
   ```

### 2. Global Brand Search & Replace
Search the entire codebase using a text editor (like VS Code) for these naming terms and replace them with the new artist's values:
- Search **`SingIt Pop`** or **`Singit Pop`** ➡️ Replace with your `[New Artist Brand Name]` (e.g. `Aura Beats`).
- Search **`singitpop`** ➡️ Replace with your `[new-artist-slug]` (e.g. `aurabeats`).
- Search **`singitpop-club`** ➡️ Replace with your `[new-repo-name]`.
- Search **`singitpop.club`** or **`singitpop.com`** ➡️ Replace with your new domain name (e.g. `aurabeats.club`).
- Search **`gazzab7@gmail.com`** ➡️ Replace with the new artist's administrator or notification email address.

### 3. Replace Brand Images & Icons
In `/public/`, replace the following files with the new artist's visual assets (keep the exact same dimensions and formats):
- **Favicon:** `/public/favicon.ico`
- **Branding Logos:**
  - `/public/SingIt Pop Logo 60 x 60.png`
  - `/public/SingIt Pop Logo 100 x 100.png`
  - `/public/SingIt Pop Logo 200 x 200.png`
- **YouTube Banners & Social Graphics:**
  - `/public/youtube_banner.png`
  - `/public/youtube_banner_2048x1152.png`
- **Website Layout Backgrounds:**
  - `/public/Radio station background.png` (Used for the radio streaming backgrounds)
  - `/public/crying headphone lady.png` (Used as fallback/decorative graphics)
  - `/public/Club_Gateway_Pop.png` (Used for membership gateways)

### 4. Code & Configuration File Updates
- **`next.config.ts`**: Update the AWS S3 hostname in `images.remotePatterns` to allow your new bucket:
  ```typescript
  hostname: 'your-new-bucket-name.s3.your-region.amazonaws.com',
  ```
- **`src/config/latestReleases.ts`**: Update the featured artist, album card, starting title, S3 paths, and hero video YouTube link.
- **`src/lib/pdf-generator.ts` (Synchronization Licenses)**:
  - Update branding RGB colors on lines 28–29 (magenta/cyan) to match the new artist's theme colors.
  - Update Licensor name from `"Singit Pop"` to your new artist entity.
  - Update compositions PRO registration text (`ASCAP (IPI: 1294507240)`) to the new artist's registration.
  - Update authorized signature text `GARY BIRRELL` to the new artist's legal signature.
- **`src/app/company/page.tsx`**: Update company registration numbers, registered address, compliancy emails (privacy@..., legal@...), and UK GDPR details.
- **`src/app/cookies/page.tsx` & `src/app/terms/page.tsx`**: Review and update legal dates, policies, and address disclosures.

---

## 🛠️ Phase 1: Environment & Credentials Setup
To run this platform, you need three cloud accounts: **AWS S3** (audio hosting), **Stripe** (payments & subscriptions), and **Clerk** (user authentication), plus **Resend** (transactional email sender).

### 1. AWS S3 (Audio Storage) Setup
AWS S3 hosts the high-resolution WAV tracks, streaming MP3 tracks, cover art, and ringtones.
1. **Create an AWS Account:** Log into the AWS Console.
2. **Create an S3 Bucket:**
   - Go to S3 and click **Create Bucket**.
   - **Bucket Name:** Choose a name (e.g., `artistname-music`).
   - **Region:** Choose a region close to your listeners (e.g., `eu-north-1` Stockholm).
   - **Object Ownership:** Keep *ACLs disabled* (recommended).
3. **Block Public Access:**
   - Keep **"Block all public access"** checked. (This ensures tracks cannot be downloaded for free. The app will generate temporary secure "presigned" links to let authorized members stream or download the audio files).
4. **Configure CORS (Cross-Origin Resource Sharing):**
   - Click the **Permissions** tab in your bucket.
   - Scroll to **CORS configuration** and click **Edit**.
   - Paste the following rule to allow your website to stream audio:
     ```json
     [
         {
             "AllowedHeaders": ["*"],
             "AllowedMethods": ["GET", "HEAD"],
             "AllowedOrigins": ["https://yourdomain.club", "http://localhost:3000"],
             "ExposeHeaders": ["ETag", "Content-Range", "Accept-Ranges", "Content-Length"]
         }
     ]
     ```
5. **Create IAM Credentials:**
   - Go to AWS **IAM** (Identity and Access Management).
   - Create a user (e.g., `artistname-uploader`).
   - Attach the policy `AmazonS3FullAccess` to this user.
   - Go to the **Security Credentials** tab and click **Create Access Key**.
   - Copy the `AWS_ACCESS_KEY_ID` and `AWS_SECRET_ACCESS_KEY` immediately.

### 2. Stripe (Payments) Setup
Stripe manages your recurring subscription tiers (Insider, VIP) and individual ringtone purchases.
1. **Create Tiers (Recurring Products):**
   - Go to Stripe Dashboard ➡️ **Product Catalog** ➡️ **Add Product**.
   - **Product 1 (Insider Tier):** Add name (e.g., "Insider Tier"), select **Recurring**, set monthly price (e.g., £4.99/mo). Save.
   - **Product 2 (VIP Tier):** Add name (e.g., "VIP Tier"), select **Recurring**, set monthly price (e.g., £9.99/mo). Save.
   - **Product 3 (Lifetime VIP Tier):** Add name (e.g., "Lifetime VIP"), select **One-Time**, set price (e.g., £99.00). Save.
   - Copy the Price IDs for all three tiers (looks like `price_1P...`).
2. **Obtain API Keys:**
   - Go to **Developers** ➡️ **API Keys**.
   - Copy the **Publishable key** (`STRIPE_PUBLISHABLE_KEY`) and **Secret key** (`STRIPE_SECRET_KEY`).
3. **Setup Stripe Webhook (For subscriptions & deliveries):**
   - In Vercel or your hosting platform, set up a webhook endpoint at `https://yourdomain.club/api/webhooks/stripe`.
   - In Stripe, register this endpoint for `checkout.session.completed` and `customer.subscription.updated` events. Copy the Signing Secret (`STRIPE_WEBHOOK_SECRET`).

### 3. Clerk (User Auth) Setup
Clerk handles user login, register, and roles management.
1. **Create Application:** Go to Clerk Dashboard ➡️ **Add Application**. Select Email/Password and Google sign-in.
2. **Get API Keys:** Copy the `NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY` and `CLERK_SECRET_KEY`.
3. **Configure User Metadata:**
   - The app uses `publicMetadata.tier` (`FREE`, `INSIDER`, `VIP`, `LIFETIME`) and `purchasedTracks` to restrict access. These roles are updated automatically by the Stripe webhook upon subscription checkout.
4. **Setup Clerk Webhook (Signups notify):**
   - In Clerk Dashboard, register a webhook pointing to `https://yourdomain.club/api/webhooks/clerk`.
   - Select the `user.created` event. Copy the webhook secret (`CLERK_WEBHOOK_SECRET`).

### 4. Resend (Email Deliveries) Setup
Resend handles sending download links for purchased ringtones, mixtapes, artbooks, and creator packs.
1. **Verify Domain:** Set up a Resend account and add your custom domain (e.g., `yourdomain.club`) to the Domain settings. Add the required MX and TXT DNS records to your domain provider.
2. **Get API Key:** Generate an API key under Resend settings. Copy the `RESEND_API_KEY`.
3. **Ensure Address Matching:** Make sure the `from` email address in `src/app/api/webhooks/stripe/route.ts` is verified in Resend (e.g., `orders@yourdomain.club`).

### 5. Setup `.env.local` File
In your website's root directory, create a file named `.env.local` containing all these values:
```env
# AWS S3 Settings
AWS_ACCESS_KEY_ID=your_aws_access_key_id
AWS_SECRET_ACCESS_KEY=your_aws_secret_access_key
AWS_REGION=eu-north-1
AWS_S3_BUCKET=artistname-music

# Stripe Credentials
STRIPE_SECRET_KEY=sk_live_...
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=pk_live_...
STRIPE_WEBHOOK_SECRET=whsec_...
NEXT_PUBLIC_STRIPE_PRICE_INSIDER=price_insider_price_id
NEXT_PUBLIC_STRIPE_PRICE_VIP=price_vip_price_id
NEXT_PUBLIC_STRIPE_PRICE_LIFETIME=price_lifetime_price_id

# Clerk Auth
NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=pk_live_...
CLERK_SECRET_KEY=sk_live_...
CLERK_WEBHOOK_SECRET=whsec_...

# Resend Email Settings
RESEND_API_KEY=re_...
OWNER_EMAIL=artist_personal_email@gmail.com
NEXT_PUBLIC_APP_URL=https://yourdomain.club
```

---

## 📁 Phase 2: Local Folder Structure

To import music, your local computer folder structure must look *exactly* like this:
```text
Desktop/
└── ArtistName/
    ├── READY FOR WEBSITE/
    │   ├── Artist Music Tracker.xlsx     <-- Excel spreadsheet containing track rows
    │   ├── Album Title 1/                <-- Folder name must match Excel Album Title exactly
    │   │   ├── cover.png                 <-- Album cover art (PNG format)
    │   │   ├── 01-track-one.mp3
    │   │   ├── 01-track-one.wav
    │   │   ├── 02-track-two.mp3
    │   │   └── 02-track-two.wav
    │   └── Album Title 2/
    └── website/                          <-- The website source code repository
```

---

## 📊 Phase 3: Formatting the Excel Tracker

Your spreadsheet (located in `READY FOR WEBSITE`) must have a sheet named **`Songs`** with these exact headers in Row 1:

| Column | Header Name | Expected Value / Example |
| :--- | :--- | :--- |
| **A** | `Song Title` | `Midnight Mirage` |
| **B** | `Genre` | `Pop`, `Country`, `R&B`, `Instrumental` |
| **C** | `Artist Name` | `Artist Name` |
| **D** | `Album/Single` | `Single` (Marks this track as a single to trigger Ringtone extraction) |
| **E** | `Album` | `Album` (or single) |
| **F** | `Track No` | `1` (The track index on the album) |
| **G** | `Album Title` | `Skin and Silence` (Must match the folder name exactly!) |
| **H** | `Live` | *(Leave blank unless a live concert track)* |
| **I** | `Release Date` | `46176` (Excel date serial number, e.g. 2026-06-03) |
| **J** | `year` | `2026` |
| **K** | `Ring ToneTitle` | `Midnight Mirage Ringtone` |
| **L** | `Trending` | `Studio` (Forces album type to 'studio'), or `Live` |
| **M** | `Plays` | `0` (Starts track count) |

---

## 🚀 Phase 4: Release Music Protocol (Step-by-Step)

Follow these steps strictly whenever adding an album or single.

### Step 1: Prepare assets
1. Fill out your new album details in the spreadsheet.
2. Put the new album folder containing WAV/MP3 files and a `cover.png` inside the `READY FOR WEBSITE` folder.

### Step 2: Open Terminal
1. Open **Terminal** (or VS Code terminal) on your Mac.
2. Run this command to check for any uncommitted files in your repo:
   ```bash
   git status
   ```
   *(If there are any local edits to `src/data/albums.json`, discard them immediately using `git restore src/data/albums.json` to make sure your baseline catalog is clean).*

### Step 3: Configure Target Album Filters (Isolation)
To ensure the script **never** modifies your existing catalog, you must hardcode the new album names as the **only targets** in the codebase before running the sync:

1. **In `scripts/convertExcelToAlbums.js`:**
   - Locate the target array at the top of the file:
     ```javascript
     const targetAlbums = [
         "New Album Title 1",
         "New Album Title 2"
     ];
     ```
   - Change these strings to match the exact titles of the new albums you are adding.

2. **In `scripts/upload-s3.js`:**
   - Locate the `TARGET_ALBUMS` array:
     ```javascript
     const TARGET_ALBUMS = [
         "New Album Title 1",
         "New Album Title 2"
     ];
     ```
   - Make sure they match the new albums.

3. **In `scripts/create-ringtones.py`:**
   - Verify that the target folder filtering is updated to process only these folders.

### Step 4: Run the Music Sync Command
In your terminal, execute the following command:
```bash
npm run sync-music
```
**This script runs in 4 distinct steps automatically:**
1. **Step 1:** Loads the existing `src/data/albums.json` catalog. It filters out rows in the Excel file that do not match the new target albums. It processes metadata *only* for the target albums, and merges them with the original unchanged catalog, writing the merged list back to `src/data/albums.json`.
2. **Step 2 (Ringtones):** Clips the first 29 seconds of tracks marked as `Single` and generates mobile-ready ringtones (MP3 and M4R formats) into `/public/ringtones/`.
3. **Step 3 (AWS Upload):** Connects to AWS S3 and uploads cover images and audio files *only* for the new albums. It skips any existing files to save time and bandwidth.
4. **Step 4 (Stripe Product Creation):** Automatically registers ringtone products into Stripe and updates `scripts/stripe_products.json`.

---

## 🌐 Phase 5: Vercel Hosting & Domain Deployment

To make the website live:
1. **Push Code to GitHub:**
   - Create a repository on GitHub.
   - Run the initial push:
     ```bash
     git add .
     git commit -m "initial commit"
     git push origin main
     ```
2. **Create Project in Vercel:**
   - Import your GitHub repository to Vercel.
   - Under **Project Settings ➡️ Environment Variables**, copy and add every single key/value pair listed in your `.env.local` file.
   - Click **Deploy**.
3. **Add Custom Domain:**
   - Under Vercel Settings ➡️ **Domains**, add `yourdomain.club`.
   - Update the DNS record nameservers in your domain registry (GoDaddy, Namecheap, etc.) to point to Vercel.
4. **Double Check Stripe & Clerk Webhook URLs:**
   - Now that the site is live, go to Stripe Developers and Clerk Webhooks.
   - Set the Stripe webhook endpoint to: `https://yourdomain.club/api/webhooks/stripe`
   - Set the Clerk webhook endpoint to: `https://yourdomain.club/api/webhooks/clerk`

---

## ✅ Phase 6: Verification & Deploy Checklist

Before deploying any music update or code changes, run this audit to ensure nothing is broken.

### 1. Check Git Diffs
Run this command to check which albums were modified in the JSON file:
```bash
node scratch/compare_albums_json.js
```
*Expected output:* `✅ Success: No differences found in the existing catalog albums!` (This confirms the old catalog is perfectly intact).

### 2. Verify S3 Playback Links
Run the playability auditor script:
```bash
node scripts/final-track-verification.js
```
*Expected output:* It will ping every single song in the catalog. All songs (both the old ones and the new ones) must print `.` (successful stream). If you see any `404` or `Error: Invalid URL` errors, **do not deploy**.

### 3. Deploy to Live
Once verification is 100% green:
1. Commit and push the changes:
   ```bash
   git add src/data/albums.json scripts/stripe_products.json scripts/ringtones_manifest.json
   git commit -m "feat: release new albums"
   git push origin main
   ```
2. Vercel will detect the git commit, rebuild the pages, and update the website live.
