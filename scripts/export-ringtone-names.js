#!/usr/bin/env node

/**
 * Export all Stripe ringtone product names to CSV
 * This helps create the mapping file for bulk updates
 */

require('dotenv').config({ path: '.env.local' });
const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);

async function exportRingtoneNames() {
    console.log('🔍 Fetching all ringtone products from Stripe...');

    const products = await stripe.products.search({
        query: "active:'true' AND name~'Ringtone'",
        limit: 100,
    });

    console.log(`📦 Found ${products.data.length} ringtone products\n`);
    console.log('Product Name (without "Ringtone"),Release Date (DD/MM/YYYY)');

    products.data.forEach(product => {
        // Remove "Ringtone" suffix to get the title
        const title = product.name.replace(/[- ]*Ringtone$/i, '').trim();
        const existingDate = product.metadata?.releaseDate || '';
        console.log(`"${title}","${existingDate}"`);
    });
}

exportRingtoneNames().catch(error => {
    console.error('Fatal error:', error);
    process.exit(1);
});
