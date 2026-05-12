const fs = require('fs');
const path = require('path');
require('dotenv').config({ path: path.join(__dirname, '../.env.local') });
const { S3Client, GetObjectCommand } = require('@aws-sdk/client-s3');
const { getSignedUrl } = require('@aws-sdk/s3-request-presigner');

const client = new S3Client({ 
    region: 'eu-north-1',
    credentials: {
        accessKeyId: process.env.AWS_ACCESS_KEY_ID,
        secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
    }
});

const albums = JSON.parse(fs.readFileSync(path.join(__dirname, '../src/data/albums.json'), 'utf8'));

async function test() {
    const album = albums.find(a => a.title === "Forever Starts Today (country Music For Weddings)");
    const track = album.tracks[0];
    const url = new URL(track.audioUrl);
    const key = decodeURIComponent(url.pathname.substring(1));
    
    console.log(`Testing Track: ${track.title}`);
    console.log(`Decoded Key: "${key}"`);
    
    const signedUrl = await getSignedUrl(client, new GetObjectCommand({ Bucket: 'singitpop-music', Key: key }), { expiresIn: 3600 });
    console.log(`Signed URL: ${signedUrl}`);
    
    const res = await fetch(signedUrl, { method: 'HEAD' });
    console.log('Fetch Status:', res.status);
    if (res.status !== 200) {
        const text = await (await fetch(signedUrl)).text();
        console.log('Error Body:', text);
    }
}
test();
