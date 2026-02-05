const Stripe = require('stripe');
require('dotenv').config({ path: '.env.local' });

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

async function updateStripeDescriptions() {
    console.log('💳 Updating Stripe product descriptions to "30s"...\n');

    try {
        let allProducts = [];
        let hasMore = true;
        let lastId = undefined;

        while (hasMore) {
            const result = await stripe.products.list({
                limit: 100,
                active: true,
                starting_after: lastId
            });
            allProducts.push(...result.data);
            hasMore = result.has_more;
            lastId = result.data[result.data.length - 1]?.id;
        }

        const ringtones = allProducts.filter(p => p.name.toLowerCase().includes('ringtone'));
        console.log(`📝 Found ${ringtones.length} ringtone products to update.\n`);

        for (const product of ringtones) {
            if (product.description && product.description.includes('20s')) {
                const newDescription = product.description.replace('20s', '30s');
                console.log(`🔄 Updating: "${product.name}" -> "${newDescription}"`);

                await stripe.products.update(product.id, {
                    description: newDescription
                });

                // Small delay to avoid rate limits
                await new Promise(r => setTimeout(r, 100));
            } else if (!product.description || !product.description.includes('30s')) {
                // If no description or no mention of 30s, set it correctly
                const singleName = product.metadata.singleName || product.name.replace(' Ringtone', '');
                const newDescription = `30s ringtone from '${singleName}' - Available in MP3 and M4R formats`;
                console.log(`✨ Setting description for: "${product.name}"`);

                await stripe.products.update(product.id, {
                    description: newDescription
                });
                await new Promise(r => setTimeout(r, 100));
            }
        }

        console.log('\n✅ All Stripe products updated!');

    } catch (error) {
        console.error('❌ Error updating Stripe products:', error.message);
    }
}

updateStripeDescriptions();
