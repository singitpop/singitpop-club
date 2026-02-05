#!/usr/bin/env node

/**
 * Bulk update Stripe ringtone products with release dates
 * 
 * Usage:
 * 1. Create a file called ringtone-dates.json with the mapping:
 *    {
 *      "starlight serenade": "2025-12-08",
 *      "shine all night": "2025-12-08",
 *      "fields of forever": "2025-12-08",
 *      "Front Porch Valentine": "2026-01-30",
 *      ...
 *    }
 * 
 * 2. Run: node scripts/update-ringtone-dates.js
 */

require('dotenv').config({ path: '.env.local' });
const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);
const fs = require('fs');
const path = require('path');

async function updateRingtoneDates() {
    // Load the mapping file
    const mappingPath = path.join(__dirname, 'ringtone-dates.json');

    if (!fs.existsSync(mappingPath)) {
        console.error('❌ Error: ringtone-dates.json not found');
        console.log('📝 Please create scripts/ringtone-dates.json with the format:');
        console.log(JSON.stringify({
            "starlight serenade": "2025-12-08",
            "shine all night": "2025-12-08",
            "Front Porch Valentine": "2026-01-30"
        }, null, 2));
        process.exit(1);
    }

    const dateMapping = JSON.parse(fs.readFileSync(mappingPath, 'utf8'));

    console.log('🔍 Fetching all ringtone products from Stripe...');

    // Fetch all ringtone products
    const products = await stripe.products.search({
        query: "active:'true' AND name~'Ringtone'",
        limit: 100,
    });

    console.log(`📦 Found ${products.data.length} ringtone products`);

    let updated = 0;
    let skipped = 0;
    let errors = 0;

    for (const product of products.data) {
        // Remove "Ringtone" suffix to get the title
        const title = product.name.replace(/[- ]*Ringtone$/i, '').trim();
        const titleLower = title.toLowerCase();

        // Find matching date in mapping (case-insensitive)
        let releaseDate = null;
        for (const [key, value] of Object.entries(dateMapping)) {
            if (key.toLowerCase() === titleLower) {
                releaseDate = value;
                break;
            }
        }

        if (!releaseDate) {
            console.log(`⚠️  No date found for: ${title}`);
            skipped++;
            continue;
        }

        try {
            // Update the product metadata
            await stripe.products.update(product.id, {
                metadata: {
                    ...product.metadata,
                    releaseDate: releaseDate
                }
            });

            console.log(`✅ Updated: ${title} → ${releaseDate}`);
            updated++;

            // Rate limiting: wait 100ms between updates
            await new Promise(resolve => setTimeout(resolve, 100));

        } catch (error) {
            console.error(`❌ Error updating ${title}:`, error.message);
            errors++;
        }
    }

    console.log('\n📊 Summary:');
    console.log(`   ✅ Updated: ${updated}`);
    console.log(`   ⚠️  Skipped: ${skipped}`);
    console.log(`   ❌ Errors: ${errors}`);
}

updateRingtoneDates().catch(error => {
    console.error('Fatal error:', error);
    process.exit(1);
});
