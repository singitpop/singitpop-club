# Automated Ringtone System

## Overview

Fully automated system to create, upload, and sell ringtones from your singles catalog.

## System Components

### 1. **Ringtone Creation** (`scripts/create-ringtones.py`)
- Reads singles from tracker spreadsheet (Column D = "Single")
- Downloads full tracks from S3
- Extracts 20-second chorus segment (most energetic part)
- Creates both M4R (iPhone) and MP3 (Android) versions
- Uploads to S3 `ringtones/` folder
- Generates `ringtones_manifest.json`

### 2. **Stripe Sync** (`scripts/sync-stripe-ringtones.py`)
- Reads `ringtones_manifest.json`
- Creates Stripe products for each ringtone
- Sets price to £3.00
- Stores S3 keys in product metadata
- Generates `stripe_products.json`

### 3. **Shop Integration**
- `/api/ringtones` - Fetches ringtones from Stripe
- `/api/stripe/checkout` - Creates Stripe checkout session
- `/shop` - Displays ringtones dynamically
- `/shop/success` - Post-purchase confirmation

## Setup Instructions

### Prerequisites

```bash
# Install Python dependencies
pip install pydub openpyxl boto3 stripe

# Install ffmpeg (required by pydub)
brew install ffmpeg  # macOS
```

### Environment Variables

Add to `.env.local`:

```bash
# Stripe
STRIPE_SECRET_KEY=sk_test_...
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=pk_test_...

# AWS (already configured)
AWS_ACCESS_KEY_ID=...
AWS_SECRET_ACCESS_KEY=...
AWS_REGION=eu-west-2

# Base URL
NEXT_PUBLIC_BASE_URL=https://club.singitpop.com
```

### Install Node Dependencies

```bash
npm install stripe
```

## Usage

### Step 1: Create Ringtones

```bash
cd scripts
python3 create-ringtones.py
```

**Options:**
- `test` - Process first 5 singles (for testing)
- `all` - Process all 245 singles

**Output:**
- Ringtones uploaded to S3: `s3://singitpop-music/ringtones/`
- Manifest created: `scripts/ringtones_manifest.json`

### Step 2: Sync to Stripe

```bash
export STRIPE_SECRET_KEY='sk_test_...'
python3 sync-stripe-ringtones.py
```

**Output:**
- Stripe products created
- Manifest created: `scripts/stripe_products.json`

### Step 3: Deploy Shop Page

```bash
git add .
git commit -m "Feat: Automated ringtone system with Stripe integration"
git push origin main
```

## How It Works

### Customer Journey

1. **Browse** - Customer visits `/shop`
2. **Select** - Clicks "Buy" on a ringtone
3. **Checkout** - Redirected to Stripe Checkout
4. **Payment** - Enters card details, pays £3
5. **Delivery** - Stripe webhook triggers email with download links
6. **Success** - Redirected to `/shop/success`

### Automated Delivery (TODO)

Create Stripe webhook handler at `/api/webhooks/stripe`:

```typescript
// When payment succeeds:
1. Get session details
2. Fetch S3 signed URLs for MP3 and M4R
3. Send email with download links
4. Mark order as fulfilled
```

## File Structure

```
scripts/
├── create-ringtones.py          # Extract & upload ringtones
├── sync-stripe-ringtones.py     # Sync to Stripe
├── ringtones_manifest.json      # Generated: S3 keys
└── stripe_products.json         # Generated: Stripe IDs

src/app/
├── api/
│   ├── ringtones/route.ts       # Fetch from Stripe
│   ├── stripe/checkout/route.ts # Create checkout
│   └── webhooks/stripe/route.ts # Handle payments (TODO)
├── shop/
│   ├── page.tsx                 # Shop page
│   └── success/page.tsx         # Success page
```

## Pricing

- **Ringtones**: £3.00 each
- **Stripe Fee**: 1.5% + 20p = ~£0.25 per sale
- **Your Revenue**: ~£2.75 per ringtone

## Maintenance

### Adding New Singles

1. Mark track as "Single" in Column D of tracker
2. Run `create-ringtones.py` (it will only process new ones)
3. Run `sync-stripe-ringtones.py`
4. Shop page auto-updates!

### Updating Prices

Edit `RINGTONE_PRICE` in `create-ringtones.py`, then re-run sync script.

## Testing

Use Stripe test mode:
- Test card: `4242 4242 4242 4242`
- Any future expiry date
- Any 3-digit CVC

## Production Checklist

- [ ] Set `STRIPE_SECRET_KEY` in Vercel
- [ ] Set `NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY` in Vercel
- [ ] Create webhook endpoint for delivery
- [ ] Test full purchase flow
- [ ] Switch to live Stripe keys
- [ ] Process all 245 singles

## Support

For issues, check:
1. S3 bucket permissions
2. Stripe API key validity
3. ffmpeg installation
4. Python dependencies
