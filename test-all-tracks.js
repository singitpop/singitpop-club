const fs = require('fs');
const path = require('path');
require('dotenv').config({ path: path.join(__dirname, '.env.local') });
const https = require('https');
const d = require('./src/data/albums.json');

async function checkUrl(url) {
    try {
        // Signed GetObject URLs reject HEAD (method mismatch) — use GET with
        // a small range header to avoid downloading the whole file.
        const res = await fetch(url, {
            method: 'GET',
            headers: { 'Range': 'bytes=0-1023' }
        });
        // 206 Partial Content = success, 200 also fine
        return (res.status === 206 || res.status === 200) ? 200 : res.status;
    } catch (e) {
        return 500;
    }
}

async function run() {
    let checked = 0;
    let failed = [];
    
    // Test URL signing mechanism as well
    const { getSignedUrl } = require('@aws-sdk/s3-request-presigner');
    const { S3Client, GetObjectCommand } = require('@aws-sdk/client-s3');
    const client = new S3Client({ 
        region: 'eu-north-1',
        credentials: {
            accessKeyId: process.env.AWS_ACCESS_KEY_ID,
            secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
        },
        // Prevent x-amz-checksum-mode=ENABLED in signed URLs (causes 403)
        requestChecksumCalculation: 'WHEN_REQUIRED',
        responseChecksumValidation: 'WHEN_REQUIRED',
    });

    for (const album of d) {
        for (const track of album.tracks) {
            checked++;
            if (!track.audioUrl) {
                failed.push(`${album.title} - ${track.title} (missing URL)`);
                continue;
            }
            
            try {
                const u = new URL(track.audioUrl);
                let key = u.pathname.substring(1);
                key = decodeURIComponent(key);
                const command = new GetObjectCommand({ Bucket: 'singitpop-music', Key: key });
                const signed = await getSignedUrl(client, command, { expiresIn: 3600 });
                
                console.log(`DEBUG: Key='${key}' SignedURL='${signed.split('?')[0]}'`);
                
                const status = await checkUrl(signed);
                if (status >= 400) {
                    process.stdout.write(`❌ [${status}] `);
                    console.log(`Failed: ${album.title} - ${track.title} -> ${key}`);
                    console.log(`CURL: curl -I "${signed}"`);
                    failed.push(`${album.title} - ${track.title} -> S3 Key: ${key} (${status})`);
                } else {
                     process.stdout.write('.');
                }
            } catch (e) {
                 process.stdout.write('E');
                 failed.push(`${album.title} - ${track.title} (Invalid S3 Config / URL format)`);
            }
        }
    }
    
    console.log(`\n\nChecked ${checked} tracks.`);
    console.log(`Found ${failed.length} broken tracks:`);
    failed.forEach(f => console.log(f));
}
run();
