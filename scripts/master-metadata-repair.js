/**
 * master-metadata-repair.js
 * Performs a full S3 inventory scan and fixes every album cover in albums.json.
 */
const { S3Client, ListObjectsV2Command, PutObjectCommand } = require('@aws-sdk/client-s3');
const fs = require('fs');
require('dotenv').config({ path: '.env.local' });

const s3 = new S3Client({
    region: 'eu-north-1',
    credentials: {
        accessKeyId: process.env.AWS_ACCESS_KEY_ID,
        secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
    }
});

const BUCKET = 'singitpop-music';

async function findCoverInS3(folderPath) {
    if (!folderPath) return null;
    try {
        const prefix = `albums/${folderPath}/`;
        const res = await s3.send(new ListObjectsV2Command({
            Bucket: BUCKET,
            Prefix: prefix
        }));
        
        const contents = res.Contents || [];
        const images = contents.filter(c => c.Key.match(/\.(png|jpg|jpeg|webp)$/i));
        
        // Priority: 1. cover.*, 2. Cover.*, 3. Front.*, 4. Any image
        const best = images.find(i => i.Key.toLowerCase().includes('/cover.')) ||
                     images.find(i => i.Key.toLowerCase().includes('/front.')) ||
                     images[0];
        
        return best ? best.Key : null;
    } catch (e) {
        return null;
    }
}

async function run() {
    console.log('🚀 Starting Master Metadata Repair...');
    const albumsPath = 'src/data/albums.json';
    const albums = JSON.parse(fs.readFileSync(albumsPath, 'utf8'));

    let count = 0;
    for (const album of albums) {
        console.log(`Processing: ${album.title}...`);
        
        // Default cover key logic
        const key = await findCoverInS3(album.folderPath || album.title);
        
        if (key) {
            album.coverArt = `https://${BUCKET}.s3.eu-north-1.amazonaws.com/${key.split('/').map(encodeURIComponent).join('/')}`;
            count++;
            console.log(`  ✅ Found: ${key}`);
        } else {
            console.warn(`  ❌ No cover found for ${album.title}`);
        }
    }

    // Write locally
    fs.writeFileSync(albumsPath, JSON.stringify(albums, null, 2));
    console.log(`\n✨ Repaired ${count} album covers locally.`);

    // Sync to S3
    await s3.send(new PutObjectCommand({
        Bucket: BUCKET,
        Key: 'data/albums.json',
        Body: JSON.stringify(albums, null, 2),
        ContentType: 'application/json'
    }));
    console.log('✅ Synchronized repair to S3 data/albums.json');
}

run().catch(console.error);
