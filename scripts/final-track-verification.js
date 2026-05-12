const fs = require('fs');
const path = require('path');
require('dotenv').config({ path: path.join(__dirname, '../.env.local') });
const { S3Client, GetObjectCommand } = require('@aws-sdk/client-s3');
const { getSignedUrl } = require('@aws-sdk/s3-request-presigner');

if (!process.env.AWS_ACCESS_KEY_ID) {
    console.error('ERROR: AWS_ACCESS_KEY_ID is missing!');
    process.exit(1);
}

const client = new S3Client({ 
    region: 'eu-north-1',
    credentials: {
        accessKeyId: process.env.AWS_ACCESS_KEY_ID,
        secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
    }
});

const albums = JSON.parse(fs.readFileSync(path.join(__dirname, '../src/data/albums.json'), 'utf8'));

async function verify() {
    console.log('--- SingIt Pop Final Track Verification ---');
    let total = 0;
    let passed = 0;
    let failed = [];

    for (const album of albums) {
        process.stdout.write(`\nVerifying ${album.title}: `);
        for (const track of album.tracks) {
            total++;
            try {
                const url = new URL(track.audioUrl);
                const key = decodeURIComponent(url.pathname.substring(1));
                if (album.title.startsWith('Night Drive')) {
                    console.log(`\nDEBUG: Key for ${track.title} is "${key}"`);
                }
                const signed = await getSignedUrl(client, new GetObjectCommand({ Bucket: 'singitpop-music', Key: key }), { expiresIn: 3600 });
                
                const res = await fetch(signed, { 
                    method: 'GET',
                    headers: { 'Range': 'bytes=0-0' }
                });
                if (res.status === 200 || res.status === 206) {
                    passed++;
                    process.stdout.write('.');
                } else {
                    console.log(`\nSIGNED URL: ${signed}`);
                    failed.push(`${album.title} - ${track.title} (${res.status})`);
                    process.stdout.write(`[${res.status}]`);
                }
            } catch (e) {
                failed.push(`${album.title} - ${track.title} (Error: ${e.message})`);
                process.stdout.write('E');
            }
        }
    }

    console.log('\n\n--- Final Results ---');
    console.log(`Total Tracks: ${total}`);
    console.log(`Passed: ${passed}`);
    console.log(`Failed: ${failed.length}`);
    
    if (failed.length > 0) {
        console.log('\nFailed Tracks:');
        failed.forEach(f => console.log(`- ${f}`));
    }
}

verify();
