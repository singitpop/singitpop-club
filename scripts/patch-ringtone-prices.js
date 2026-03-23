const Stripe = require('stripe');
require('dotenv').config({ path: '.env.local' });

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

async function patchRingtonePrices() {
    console.log('🚀 Starting Patch: Updating all ringtones to £0.99...\n');

    let hasMore = true;
    let startingAfter = undefined;
    let count = 0;

    while (hasMore) {
        // Fetch products in batches
        const productsResponse = await stripe.products.list({
            limit: 100,
            starting_after: startingAfter,
            active: true
        });

        const products = productsResponse.data;

        if (products.length === 0) {
            hasMore = false;
            break;
        }

        for (const product of products) {
            // Check if product is a ringtone by metadata or name
            if (product.metadata.type === 'ringtone' || product.name.includes('Ringtone')) {
                
                // Get all active prices for this product
                const pricesResponse = await stripe.prices.list({
                    product: product.id,
                    active: true
                });

                const activePrices = pricesResponse.data;
                const cost300 = activePrices.find(p => p.unit_amount === 300 && p.currency === 'gbp');
                const cost99 = activePrices.find(p => p.unit_amount === 99 && p.currency === 'gbp');

                // If it doesn't already have a 99p price, create one
                let newPriceId = null;
                if (!cost99) {
                    console.log(`Creating £0.99 price for "${product.name}"...`);
                    const newPrice = await stripe.prices.create({
                        product: product.id,
                        unit_amount: 99,
                        currency: 'gbp'
                    });
                    newPriceId = newPrice.id;
                } else {
                    newPriceId = cost99.id;
                }

                // If product's default_price is NOT the 99p price, update the product
                if (product.default_price !== newPriceId) {
                    console.log(`Setting default_price for "${product.name}" to £0.99...`);
                    await stripe.products.update(product.id, {
                        default_price: newPriceId
                    });
                    count++;
                }

                // If there's an active £3.00 price, archive it
                if (cost300) {
                    console.log(`Archiving old £3.00 price for "${product.name}"...`);
                    await stripe.prices.update(cost300.id, {
                        active: false
                    });
                }
            }
        }

        if (productsResponse.has_more) {
            startingAfter = products[products.length - 1].id;
        } else {
            hasMore = false;
        }
    }

    console.log(`\n✅ Finished Patch! Updated default_price on ${count} ringtone products.`);
}

patchRingtonePrices();
