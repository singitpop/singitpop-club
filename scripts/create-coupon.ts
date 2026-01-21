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
    apiVersion: '2025-01-27.acacia' as any,
});

async function main() {
    console.log("Creating 100% Off Promo Code...");

    try {
        // 1. Create Coupon (The rule)
        const coupon = await stripe.coupons.create({
            percent_off: 100,
            duration: 'forever',
            name: 'Dev Test 100% Off',
        });

        // 2. Create Promotion Code (The user-facing code)
        const promo = await stripe.promotionCodes.create({
            coupon: coupon.id,
            code: 'VIPTEST', // User types this at checkout
        } as any);

        console.log(`\n✅ Success! Created Promo Code: ${promo.code}`);
        console.log(`Share this code to allow free testing.`);

    } catch (err: any) {
        console.error("Error creating coupon:", err.message);
    }
}

main();
