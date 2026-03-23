const Stripe = require('stripe');
const fs = require('fs');
require('dotenv').config({ path: '.env.local' });

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

async function createMissingStripeProducts() {
    console.log('🚀 Starting Stripe Sync for Ringtones...\n');

    if (!fs.existsSync('ringtones-audit-report.json')) {
        console.error('❌ Error: ringtones-audit-report.json not found. Run audit first.');
        return;
    }

    const report = JSON.parse(fs.readFileSync('ringtones-audit-report.json', 'utf8'));
    const toCreate = report.missingInStripe;

    console.log(`📝 Found ${toCreate.length} products to create.\n`);

    if (toCreate.length === 0) {
        console.log('✅ Nothing to create!');
        return;
    }

    // Safety check: confirm with user if too many? No, user said "create what is missing".

    for (const item of toCreate) {
        try {
            console.log(`🏗️ Creating: "${item.stripeProductName}"...`);

            // 1. Create Product
            const product = await stripe.products.create({
                name: item.stripeProductName,
                description: `20s ringtone from '${item.singleName}' - Available in MP3 and M4R formats`,
                active: true,
                metadata: {
                    type: 'ringtone',
                    singleName: item.singleName,
                    releaseDate: item.releaseDate
                }
            });

            // 2. Create Price
            const price = await stripe.prices.create({
                product: product.id,
                unit_amount: 99, // £0.99
                currency: 'gbp',
            });

            console.log(`✅ Success! Product: ${product.id}`);

            // Small delay to avoid rate limits
            await new Promise(r => setTimeout(r, 200));

        } catch (error) {
            console.error(`❌ Failed to create "${item.stripeProductName}":`, error.message);
        }
    }

    console.log('\n✨ Stripe Sync Complete!');
}

createMissingStripeProducts();
