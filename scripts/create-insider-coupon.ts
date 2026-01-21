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
    console.log("Creating INSIDERTEST Code...");

    try {
        // Reuse the same logic: Create a NEW coupon or just a new code.
        // Easiest is to just create a new coupon to avoid "lookup" complexity in this script.
        const coupon = await stripe.coupons.create({
            percent_off: 100,
            duration: 'forever',
            name: 'Dev Test Insider 100% Off',
        });

        const promo = await stripe.promotionCodes.create({
            coupon: coupon.id,
            code: 'INSIDERTEST',
        } as any);

        console.log(`\n✅ Success! Created Promo Code: ${promo.code}`);

    } catch (err: any) {
        console.error("Error creating coupon:", err.message);
    }
}

main();
