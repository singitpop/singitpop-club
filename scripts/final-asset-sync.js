/**
 * final-asset-sync.js
 * Uploads ALL newly generated covers and updates the final albums.json on S3.
 */
require('dotenv').config({ path: '.env.local' });
const { S3Client, PutObjectCommand } = require('@aws-sdk/client-s3');
const fs = require('fs');
const path = require('path');

const s3 = new S3Client({
    region: 'eu-north-1',
    credentials: {
        accessKeyId: process.env.AWS_ACCESS_KEY_ID,
        secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
    }
});

const BUCKET = 'singitpop-music';

const NEW_COVERS = [
    { id: 'electric-dreams', folder: 'Electric Dreams', local: '/Users/garybirrell/.gemini/antigravity/brain/bb229ddd-3323-40d3-9d1b-c54b564bcf4a/electric_dreams_cover_v1_1776434868805.png' },
    { id: 'midnight-coffee', folder: 'Midnight Coffee', local: '/Users/garybirrell/.gemini/antigravity/brain/bb229ddd-3323-40d3-9d1b-c54b564bcf4a/midnight_coffee_cover_v1_1776434898109.png' },
    { id: 'neon-rodeo', folder: 'Neon Rodeo', local: '/Users/garybirrell/.gemini/antigravity/brain/bb229ddd-3323-40d3-9d1b-c54b564bcf4a/neon_rodeo_cover_v1_1776434929533.png' },
    { id: 'starlight-serenade', folder: 'Starlight Serenade', local: '/Users/garybirrell/.gemini/antigravity/brain/bb229ddd-3323-40d3-9d1b-c54b564bcf4a/starlight_serenade_cover_v1_1776434965490.png' },
    { id: 'pixelated-hearts', folder: 'Pixelated Hearts', local: '/Users/garybirrell/.gemini/antigravity/brain/bb229ddd-3323-40d3-9d1b-c54b564bcf4a/pixelated_hearts_cover_v1_1776434999487.png' },
    { id: 'velocity', folder: 'Velocity', local: '/Users/garybirrell/.gemini/antigravity/brain/bb229ddd-3323-40d3-9d1b-c54b564bcf4a/velocity_cover_v1_1776435039735.png' },
    { id: 'echoes-of-yesterday', folder: 'Echoes of Yesterday', local: '/Users/garybirrell/.gemini/antigravity/brain/bb229ddd-3323-40d3-9d1b-c54b564bcf4a/echoes_of_yesterday_cover_v1_1776435084830.png' },
    { id: 'always-and-forever', folder: 'Always and Forever', local: '/Users/garybirrell/.gemini/antigravity/brain/bb229ddd-3323-40d3-9d1b-c54b564bcf4a/always_and_forever_cover_v1_1776435123623.png' }
];

async function run() {
    const results = {};
    for (const item of NEW_COVERS) {
        const key = `albums/${item.folder}/cover.png`;
        console.log(`Uploading ${item.id} to ${key}...`);
        try {
            await s3.send(new PutObjectCommand({
                Bucket: BUCKET,
                Key: key,
                Body: fs.readFileSync(item.local),
                ContentType: 'image/png'
            }));
            results[item.id] = `https://${BUCKET}.s3.eu-north-1.amazonaws.com/${key.split('/').map(encodeURIComponent).join('/')}`;
            console.log(`  ✅ Done`);
        } catch (e) {
            console.error(`  ❌ Failed: ${e.message}`);
        }
    }

    const albumsPath = path.join(process.cwd(), 'src/data/albums.json');
    const albums = JSON.parse(fs.readFileSync(albumsPath, 'utf8'));

    albums.forEach(album => {
        if (results[album.id]) album.coverArt = results[album.id];
    });

    fs.writeFileSync(albumsPath, JSON.stringify(albums, null, 2));
    await s3.send(new PutObjectCommand({
        Bucket: BUCKET,
        Key: 'data/albums.json',
        Body: JSON.stringify(albums, null, 2),
        ContentType: 'application/json'
    }));
    console.log('✨ All new assets synced and metadata finalized on S3.');
}

run().catch(console.error);
