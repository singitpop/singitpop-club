const fs = require('fs');
const { S3Client, ListObjectsV2Command } = require('@aws-sdk/client-s3');
require('dotenv').config({ path: '.env.local' });

const S3_BUCKET = process.env.AWS_S3_BUCKET || "singitpop-music";
const AWS_REGION = process.env.AWS_REGION || "eu-north-1";

const client = new S3Client({
    region: AWS_REGION,
    credentials: {
        accessKeyId: process.env.AWS_ACCESS_KEY_ID,
        secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
    },
});

async function getAllS3Keys() {
    let keys = new Set();
    let isTruncated = true;
    let continuationToken = undefined;
    
    console.log('Fetching S3 keys...');
    while (isTruncated) {
        const command = new ListObjectsV2Command({
            Bucket: S3_BUCKET,
            Prefix: 'albums/', // Where all music lives
            ContinuationToken: continuationToken
        });
        try {
            const response = await client.send(command);
            (response.Contents || []).forEach(c => keys.add(c.Key));
            isTruncated = response.IsTruncated;
            continuationToken = response.NextContinuationToken;
        } catch(e) {
            console.error('S3 Error:', e);
            break;
        }
    }
    console.log(`Found ${keys.size} objects in S3 albums/`);
    return keys;
}

async function run() {
    const s3Keys = await getAllS3Keys();
    const d = require('./src/data/albums.json');
    
    let licensableTracks = [];

    // Flatten tracks and verify S3 existence
    for (const album of d) {
        for (const track of album.tracks) {
            let hasValidMp3 = false;
            let hasValidWav = false;

            if (track.audioUrl) {
                try {
                    const u = new URL(track.audioUrl);
                    const key = decodeURIComponent(u.pathname.substring(1));
                    if (s3Keys.has(key)) hasValidMp3 = true;
                } catch(e) {}
            }

            if (track.highResUrl) {
                try {
                    const u = new URL(track.highResUrl);
                    const key = decodeURIComponent(u.pathname.substring(1));
                    if (s3Keys.has(key)) hasValidWav = true;
                } catch(e) {}
            }

            // A track is licensable if it at least has a valid streaming MP3
            if (hasValidMp3) {
                licensableTracks.push({
                    id: `${album.id}-${track.title.replace(/[^a-z0-9]/gi, '-').toLowerCase()}`,
                    title: track.title,
                    albumId: album.id,
                    albumTitle: album.title,
                    coverArt: album.coverArt,
                    genre: track.genre || album.genre?.[0] || 'Pop',
                    duration: track.duration,
                    audioUrl: track.audioUrl,
                    highResUrl: hasValidWav ? track.highResUrl : undefined,
                    releaseDate: album.releaseDate,
                    isVIP: album.accessTier === 'vip'
                });
            }
        }
    }

    fs.writeFileSync('./src/data/licensable-tracks.json', JSON.stringify(licensableTracks, null, 2));
    console.log(`✅ Saved ${licensableTracks.length} verified tracks to src/data/licensable-tracks.json`);
}

run();
