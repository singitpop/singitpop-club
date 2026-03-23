const fs = require('fs');
const https = require('https');
const d = require('./src/data/albums.json');

async function checkUrl(url) {
    return new Promise((resolve) => {
        if (!url) { resolve(404); return; }
        https.request(url, { method: 'HEAD' }, (res) => {
            resolve(res.statusCode);
        }).on('error', () => resolve(500)).end();
    });
}

async function run() {
    let checked = 0;
    let failed = [];
    
    // Test URL signing mechanism as well
    const { getSignedUrl } = require('@aws-sdk/s3-request-presigner');
    const { S3Client, GetObjectCommand } = require('@aws-sdk/client-s3');
    const client = new S3Client({ region: 'eu-north-1' });

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
                
                const status = await checkUrl(signed);
                if (status >= 400) {
                    process.stdout.write(`❌ [${status}] `);
                    console.log(`Failed: ${album.title} - ${track.title} -> ${key}`);
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
