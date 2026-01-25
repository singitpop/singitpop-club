
import { S3Client, GetObjectCommand, ListObjectsV2Command } from '@aws-sdk/client-s3';
import { Readable } from 'stream';

// --- SETUP ---
const s3Client = new S3Client({
    region: process.env.AWS_REGION || 'eu-north-1',
    credentials: {
        accessKeyId: process.env.AWS_ACCESS_KEY_ID!,
        secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY!
    }
});
const BUCKET_NAME = 'singitpop-music';

// --- MOCK API LOGIC ---

// Helper from route.ts
async function findImageKey(folderName: string, trackTitle?: string): Promise<string | null> {
    try {
        console.log(`\n🔎 searching folder: ${folderName}, track: ${trackTitle}`);
        const albumPrefix = `albums/${folderName}/`;
        const command = new ListObjectsV2Command({
            Bucket: BUCKET_NAME,
            Prefix: albumPrefix,
        });

        const response = await s3Client.send(command);
        const contents = response.Contents || [];
        // console.log(`   Found ${contents.length} items in prefix: ${albumPrefix}`);

        // 1. Try Specific Track Image
        if (trackTitle) {
            const normalizedTrack = trackTitle.toLowerCase().trim();
            const trackCover = contents.find((c: any) => {
                const key = c.Key || '';
                const lowerKey = key.toLowerCase();
                if (!lowerKey.startsWith(albumPrefix.toLowerCase())) return false;
                if (lowerKey.includes(`/${normalizedTrack}/`)) {
                    const filename = key.split('/').pop()?.toLowerCase();
                    return filename === 'cover.png' || filename === 'cover.jpg' || filename === 'cover.jpeg' || filename === 'cover.webp';
                }
                return false;
            });
            if (trackCover) {
                console.log(`   ✅ Found Track Cover: ${trackCover.Key}`);
                return trackCover.Key || null;
            }
        }

        // 2. Fallback: Album Cover
        const albumCover = contents.find((c: any) => {
            const key = c.Key || '';
            const filename = key.split('/').pop()?.toLowerCase() || '';
            const isImage = filename.endsWith('.png') || filename.endsWith('.jpg');
            const isStandardName = filename.startsWith('cover.') || filename.startsWith('front.') || filename.startsWith('folder.');
            const depth = key.split('/').length;
            const expectedDepth = albumPrefix.split('/').length;
            return isImage && isStandardName && (depth === expectedDepth);
        });

        if (albumCover) {
            console.log(`   ✅ Found Album Cover: ${albumCover.Key}`);
            return albumCover.Key || null;
        }

    } catch (error) {
        console.warn('Error finding image key:', error);
    }
    console.log('   ❌ No image found.');
    return null;
}

async function streamToString(stream: Readable): Promise<string> {
    return new Promise((resolve, reject) => {
        const chunks: any[] = [];
        stream.on('data', (chunk) => chunks.push(chunk));
        stream.on('error', reject);
        stream.on('end', () => resolve(Buffer.concat(chunks).toString('utf-8')));
    });
}

async function run() {
    console.log('--- SIMULATING API RESPONSE ---');
    try {
        // 1. Get Metadata
        const getMeta = new GetObjectCommand({ Bucket: BUCKET_NAME, Key: 'admin/albumMetadata.json' });
        const metaRes = await s3Client.send(getMeta);
        const metadata = JSON.parse(await streamToString(metaRes.Body as Readable));
        console.log('Metadata:', metadata);

        // 2. Get Albums
        const getAlbums = new GetObjectCommand({ Bucket: BUCKET_NAME, Key: 'data/albums.json' });
        const albRes = await s3Client.send(getAlbums);
        const albums = JSON.parse(await streamToString(albRes.Body as Readable));

        // 3. Resolve Single
        if (metadata.latestSingleUid) {
            const allTracks = albums.flatMap((a: any) => a.tracks.map((t: any) => ({ ...t, albumId: a.id })));
            const track = allTracks.find((t: any) => `${t.albumId}-${t.id}` === metadata.latestSingleUid);

            if (track) {
                console.log(`\nMatched Track: ${track.title}`);
                // Decode folder name safely (Logic from route.ts)
                let folderName = track.sourceFolder;
                if (!folderName && track.audioUrl) {
                    const parts = track.audioUrl.split('/albums/');
                    if (parts.length > 1) {
                        folderName = decodeURIComponent(parts[1].split('/')[0]);
                    }
                }
                if (!folderName) folderName = track.albumId;

                console.log(`Resolved Folder: ${folderName}`);

                // TEST FIND IMAGE
                await findImageKey(folderName, track.title);
            } else {
                console.log('❌ Track not found in albums.json matching UID.');
            }
        }

        // 4. Resolve Video
        if (metadata.latestVideoTitle) {
            const allTracks = albums.flatMap((a: any) => a.tracks.map((t: any) => ({ ...t, albumId: a.id })));
            const matchingTrack = allTracks.find((t: any) =>
                metadata.latestVideoTitle.toLowerCase().includes(t.title.toLowerCase())
            );

            if (matchingTrack) {
                console.log(`\nMatched Video Track: ${matchingTrack.title}`);
                let folderName = matchingTrack.sourceFolder;
                if (!folderName && matchingTrack.audioUrl) {
                    const parts = matchingTrack.audioUrl.split('/albums/');
                    if (parts.length > 1) {
                        folderName = decodeURIComponent(parts[1].split('/')[0]);
                    }
                }
                if (!folderName) folderName = matchingTrack.albumId;
                console.log(`Resolved Folder: ${folderName}`);

                // TEST FIND IMAGE
                await findImageKey(folderName, matchingTrack.title);
            } else {
                console.log('❌ Video Track not found.');
            }
        }

    } catch (e) {
        console.error(e);
    }
}

run();
