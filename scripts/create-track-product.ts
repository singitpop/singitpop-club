
import dotenv from 'dotenv';
import Stripe from 'stripe';

// Load env vars from .env.local
dotenv.config({ path: '.env.local' });

if (!process.env.STRIPE_SECRET_KEY) {
    console.error('❌ STRIPE_SECRET_KEY is missing in .env.local');
    process.exit(1);
}

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY, {
    apiVersion: '2025-01-27.acacia' as any,
});

async function createTrackProduct() {
    try {
        console.log("🚀 Creating 'Single Track' product...");

        // 1. Create Product
        const product = await stripe.products.create({
            name: 'Single Track Download',
            description: 'High-quality audio download of a single track.',
            metadata: {
                type: 'TRACK_SINGLE'
            }
        });

        // 2. Create Price
        const price = await stripe.prices.create({
            product: product.id,
            unit_amount: 99, // £0.99
            currency: 'gbp',
            recurring: undefined, // One-time
        });

        console.log(`✅ Product Created: ${product.name} (${product.id})`);
        console.log(`✅ Price Created: £0.99 (${price.id})`);
        console.log(`\n👇 ADD THIS TO .env.local 👇`);
        console.log(`NEXT_PUBLIC_STRIPE_PRICE_TRACK=${price.id}`);

    } catch (error) {
        console.error('❌ Error creating product:', error);
    }
}

createTrackProduct();
