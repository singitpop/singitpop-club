
const { S3Client, ListObjectsV2Command } = require("@aws-sdk/client-s3");
require('dotenv').config({ path: '.env.local' });

const s3Client = new S3Client({
    region: process.env.AWS_REGION || "eu-north-1",
    credentials: {
        accessKeyId: process.env.AWS_ACCESS_KEY_ID,
        secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
    },
});

const BUCKET_NAME = 'singitpop-music';

async function findImageKey(folderName, trackTitle) {
    try {
        const albumPrefix = `albums/${folderName}/`;
        console.log(`Scanning: ${albumPrefix}`);

        const command = new ListObjectsV2Command({
            Bucket: BUCKET_NAME,
            Prefix: albumPrefix,
        });

        const response = await s3Client.send(command);
        const contents = response.Contents || [];

        if (!trackTitle) return null;

        const normalize = (s) => s.toLowerCase().replace(/[^a-z0-9]+/g, ' ').trim();
        const normalizedTrack = normalize(trackTitle);
        console.log(`Looking for Track: "${trackTitle}" -> Norm: "${normalizedTrack}"`);

        const trackCover = contents.find((c) => {
            const key = c.Key || '';
            const lowerKey = key.toLowerCase();

            // Check folders inside album
            const segments = lowerKey.split('/');
            // segments[0]=albums, [1]=album folder, [2..]=inner
            // We want to match inner segments

            const relevantSegments = segments.slice(2);
            // e.g. albums/valentine-country/track-name/cover.png

            const match = relevantSegments.some(seg => normalize(seg).includes(normalizedTrack));

            if (match) {
                console.log(`   MATCH FOUND in segment: ${key}`);
                const filename = key.split('/').pop().toLowerCase();
                return filename.includes('cover') || filename.includes('front');
            }
            return false;
        });

        if (trackCover) return trackCover.Key;
        console.log("   No match found.");
        return null;

    } catch (e) {
        console.error(e);
    }
}

// Test Case from User: "Paradise Again"
// We need to know which album it *might* be in, or if we need to search ALL albums.
// The current API logic requires an Album ID/Folder to be resolved first from the Track list.
// Let's assume we know the album or we're checking a likely one.
// User said "Paradise Again"
// I suspect the folder might be named slightly differently or exist in a "Singles" album.

async function test() {
    // Test 1: Check if "Paradise Again" exists in any album folder structure
    console.log("--- Debugging Paradise Again ---");
    // We can't scan ALL albums easily here without listing 500 folders.
    // But let's check "Valentine Country" or similar if known.
    // Actually, let's scan the root `albums/` to see folders.

    // For now, let's test the specific logic:
    await findImageKey('valentine-country', 'Paradise Again');
    await findImageKey('paradise-again', 'Paradise Again'); // Maybe it's a single in its own folder?
}

test();
