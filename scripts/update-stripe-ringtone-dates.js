#!/usr/bin/env node

/**
 * Update Stripe Ringtone Products with Release Dates
 * 
 * This script:
 * 1. Downloads Ringtones.xlsx from S3
 * 2. Fetches all ringtone products from Stripe
 * 3. Updates each product's metadata with the release date
 */

const { S3Client, GetObjectCommand } = require('@aws-sdk/client-s3');
const Stripe = require('stripe');
const XLSX = require('xlsx');

const s3 = new S3Client({ region: 'eu-north-1' });
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

const BUCKET = 'singitpop-music';
const RINGTONES_KEY = 'ringtones/Ringtones.xlsx';

async function streamToBuffer(stream) {
    const chunks = [];
    for await (const chunk of stream) {
        chunks.push(chunk);
    }
    return Buffer.concat(chunks);
}

async function downloadFromS3(key) {
    console.log(`📥 Downloading ${key}...`);
    const command = new GetObjectCommand({ Bucket: BUCKET, Key: key });
    const response = await s3.send(command);
    return await streamToBuffer(response.Body);
}

function formatDateForStripe(excelDate) {
    // Excel dates are stored as serial numbers (days since 1900-01-01)
    if (typeof excelDate === 'number') {
        const date = new Date((excelDate - 25569) * 86400 * 1000);
        return date.toISOString().split('T')[0]; // YYYY-MM-DD
    }
    // If it's already a string, return as-is
    return excelDate;
}

async function main() {
    try {
        // 1. Download Ringtones.xlsx
        const ringtonesBuffer = await downloadFromS3(RINGTONES_KEY);
        const workbook = XLSX.read(ringtonesBuffer, { type: 'buffer' });
        const sheet = workbook.Sheets[workbook.SheetNames[0]];
        const data = XLSX.utils.sheet_to_json(sheet);

        console.log(`📊 Found ${data.length} ringtones in spreadsheet`);

        // 2. Create a map of Stripe Product Name -> Release Date (case-insensitive)
        const releaseDateMap = new Map();
        data.forEach(row => {
            const productName = row['Stripe Product Name'];
            const releaseDate = formatDateForStripe(row['Release Date']);
            if (productName && releaseDate) {
                // Store with lowercase key for case-insensitive matching
                releaseDateMap.set(productName.toLowerCase(), {
                    originalName: productName,
                    releaseDate: releaseDate
                });
            }
        });

        console.log(`📅 Mapped ${releaseDateMap.size} release dates`);

        // 3. Fetch all Stripe products
        console.log('\n📦 Fetching Stripe products...');
        const products = await stripe.products.list({ limit: 100 });
        const ringtoneProducts = products.data.filter(p =>
            p.name.toLowerCase().includes('ringtone')
        );

        console.log(`🎵 Found ${ringtoneProducts.length} ringtone products in Stripe`);

        // 4. Update each product with release date metadata
        let updated = 0;
        let skipped = 0;
        let errors = 0;

        for (const product of ringtoneProducts) {
            const matchData = releaseDateMap.get(product.name.toLowerCase());

            if (!matchData) {
                console.log(`⚠️  No release date found for: ${product.name}`);
                skipped++;
                continue;
            }

            try {
                await stripe.products.update(product.id, {
                    metadata: {
                        ...product.metadata,
                        releaseDate: matchData.releaseDate
                    }
                });
                console.log(`✅ Updated: ${product.name} -> ${matchData.releaseDate}`);
                updated++;
            } catch (error) {
                console.error(`❌ Failed to update ${product.name}:`, error.message);
                errors++;
            }
        }

        console.log('\n📊 Summary:');
        console.log(`✅ Updated: ${updated}`);
        console.log(`⚠️  Skipped: ${skipped}`);
        console.log(`❌ Errors: ${errors}`);

    } catch (error) {
        console.error('❌ Error:', error.message);
        console.error(error.stack);
        process.exit(1);
    }
}

main();
