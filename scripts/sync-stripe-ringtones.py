#!/usr/bin/env python3
"""
Stripe Product Sync for Ringtones
Reads ringtones_manifest.json and creates/updates Stripe products
"""

import os
import sys
import json
import stripe
from pathlib import Path
from datetime import datetime
from dotenv import load_dotenv

# Load Environment Variables from Next.js .env.local
env_path = Path(__file__).parent.parent / ".env.local"
load_dotenv(dotenv_path=env_path)

# Configuration
STRIPE_SECRET_KEY = os.getenv('STRIPE_SECRET_KEY')
MANIFEST_PATH = Path(__file__).parent / "ringtones_manifest.json"
CURRENCY = "gbp"

def load_manifest():
    """Load the ringtones manifest"""
    if not MANIFEST_PATH.exists():
        print(f"❌ Manifest not found: {MANIFEST_PATH}")
        print("Run create-ringtones.py first!")
        sys.exit(1)
    
    with open(MANIFEST_PATH, 'r') as f:
        return json.load(f)

def create_or_update_stripe_product(ringtone):
    """Create or update a Stripe product for a ringtone"""
    title = ringtone['title']
    price_pence = int(ringtone['price'] * 100)  # Convert to pence
    
    print(f"\n📦 Processing: {title}")
    
    # Search for existing product
    existing_products = stripe.Product.search(
        query=f"name:'{title} Ringtone'"
    )
    
    if existing_products.data:
        product = existing_products.data[0]
        print(f"✅ Product exists: {product.id}")
    else:
        # Create new product
        product = stripe.Product.create(
            name=f"{title} Ringtone",
            description=f"{ringtone['duration']}s ringtone from '{title}' - Available in MP3 and M4R formats",
            metadata={
                'type': 'ringtone',
                'genre': ringtone['genre'],
                'mp3_key': ringtone['mp3_key'],
                'm4r_key': ringtone['m4r_key']
            }
        )
        print(f"✅ Created product: {product.id}")
    
    # Create or update price
    prices = stripe.Price.list(product=product.id, active=True)
    
    if prices.data:
        price = prices.data[0]
        print(f"✅ Price exists: £{price.unit_amount/100}")
    else:
        price = stripe.Price.create(
            product=product.id,
            unit_amount=price_pence,
            currency=CURRENCY
        )
        print(f"✅ Created price: £{price.unit_amount/100}")
    
    return {
        'product_id': product.id,
        'price_id': price.id,
        'title': title,
        'amount': price.unit_amount / 100
    }

def main():
    print("💳 Stripe Product Sync for Ringtones")
    print("=" * 60)
    
    # Check for Stripe API key
    if not STRIPE_SECRET_KEY:
        print("❌ STRIPE_SECRET_KEY environment variable not set!")
        print("Make sure it is set in .env.local with: STRIPE_SECRET_KEY='sk_live_...'")
        sys.exit(1)
    
    stripe.api_key = STRIPE_SECRET_KEY
    
    # Load manifest
    ringtones = load_manifest()
    print(f"📄 Loaded {len(ringtones)} ringtones from manifest")
    
    today = datetime.now().date()
    
    # Sync each ringtone
    synced_products = []
    for ringtone in ringtones:
        try:
            r_date_str = ringtone.get('release_date', '2000-01-01')
            try:
                r_date = datetime.strptime(r_date_str, '%Y-%m-%d').date()
            except:
                r_date = today # Fallback if parsing fails
            
            if r_date > today:
                print(f"⏳ Skipping {ringtone['title']} (Future Release: {r_date_str})")
                continue

            result = create_or_update_stripe_product(ringtone)
            synced_products.append(result)
        except Exception as e:
            print(f"❌ Error syncing {ringtone['title']}: {e}")
    
    # Save Stripe products manifest
    stripe_manifest_path = Path(__file__).parent / "stripe_products.json"
    with open(stripe_manifest_path, 'w') as f:
        json.dump(synced_products, f, indent=2)
    
    print(f"\n{'='*60}")
    print(f"✅ Synced {len(synced_products)} products to Stripe")
    print(f"📄 Stripe manifest saved to: {stripe_manifest_path}")
    print(f"{'='*60}")
    
    # Print summary
    total_value = sum(p['amount'] for p in synced_products)
    print(f"\n💰 Total catalog value: £{total_value:.2f}")
    print(f"📊 Average price: £{total_value/len(synced_products):.2f}")

if __name__ == "__main__":
    main()
