import Stripe from 'stripe';
import * as dotenv from 'dotenv';
import path from 'path';

// Load environment variables from .env.local
dotenv.config({ path: path.resolve(process.cwd(), '.env.local') });

if (!process.env.STRIPE_SECRET_KEY) {
    console.error('Error: STRIPE_SECRET_KEY not found in .env.local');
    process.exit(1);
}

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY, {
    apiVersion: '2025-02-24.acacia' as any,
});

async function main() {
    console.log("Creating/Verifying Products in Stripe...");

    // 1. The Insider (£3.99/mo)
    console.log("\n--- The Insider ---");
    const insider = await stripe.products.create({
        name: 'The Insider',
        description: 'Full Streaming, MP3 Downloads, and Profile Badge.',
        default_price_data: {
            currency: 'gbp',
            unit_amount: 399, // £3.99
            recurring: { interval: 'month' },
        },
        metadata: {
            tier: 'INSIDER'
        }
    });

    if (insider.default_price) {
        // Fetch the price object to get the ID if it's expanded, 
        // but creation returns the ID directly in default_price usually if specified? 
        // Actually create returns the product. The default_price ID is inside.
        // Wait, default_price_data creates a price, but the product response might just have the ID.
        // Let's rely on the response.
        const priceId = typeof insider.default_price === 'string'
            ? insider.default_price
            : (insider.default_price as Stripe.Price).id;

        console.log(`✅ Created 'The Insider'`);
        console.log(`Product ID: ${insider.id}`);
        console.log(`Price ID: ${priceId}`);
    }

    // 2. The VIP (£8.99/mo)
    console.log("\n--- The VIP ---");
    const vip = await stripe.products.create({
        name: 'The VIP',
        description: 'MP3 + WAV Downloads, Exclusive Demos, and Shop Discount.',
        default_price_data: {
            currency: 'gbp',
            unit_amount: 899, // £8.99
            recurring: { interval: 'month' },
        },
        metadata: {
            tier: 'VIP'
        }
    });

    if (vip.default_price) {
        const priceId = typeof vip.default_price === 'string'
            ? vip.default_price
            : (vip.default_price as Stripe.Price).id;

        console.log(`✅ Created 'The VIP'`);
        console.log(`Product ID: ${vip.id}`);
        console.log(`Price ID: ${priceId}`);
    }

    console.log("\n-------------------------------------------");
    console.log("PLEASE COPY THESE PRICE IDs FOR CONFIGURATION");
    console.log("-------------------------------------------");
}

main().catch(console.error);
