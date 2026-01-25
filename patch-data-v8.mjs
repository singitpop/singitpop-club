
import fs from 'fs';
import path from 'path';
import { S3Client, PutObjectCommand, GetObjectCommand } from '@aws-sdk/client-s3';

const s3Client = new S3Client({
    region: process.env.AWS_REGION || 'eu-north-1',
    credentials: {
        accessKeyId: process.env.AWS_ACCESS_KEY_ID,
        secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
    },
});

const BUCKET_NAME = 'singitpop-music';
const ALBUMS_KEY = 'database/albums.json';
const METADATA_KEY = 'database/albumMetadata.json';

// GENERATED PRESIGNED URLs (Valid for 7 days)
const SIGNED_ALBUM_COVER = "https://singitpop-music.s3.eu-north-1.amazonaws.com/albums/Echoes%20Of%20Light/cover.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Credential=AKIARROH2RBJKPHCLGXP%2F20260123%2Feu-north-1%2Fs3%2Faws4_request&X-Amz-Date=20260123T020354Z&X-Amz-Expires=604800&X-Amz-SignedHeaders=host&X-Amz-Signature=863cd55df27c3e7e8e5d16597dba84cb4bc78c984d5c8ae625410ca5463584d5";
const SIGNED_AUDIO_URL = "https://singitpop-music.s3.eu-north-1.amazonaws.com/albums/Echoes%20Of%20Light/The%20Silent%20Conversation/The%20Silent%20Conversation.mp3?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Credential=AKIARROH2RBJKPHCLGXP%2F20260123%2Feu-north-1%2Fs3%2Faws4_request&X-Amz-Date=20260123T020354Z&X-Amz-Expires=604800&X-Amz-SignedHeaders=host&X-Amz-Signature=f6d957478d9bad5e337620ce7b23e1e589590fec8a1f5468de10ac0318ee2878";
const SIGNED_TRACK_COVER = "https://singitpop-music.s3.eu-north-1.amazonaws.com/albums/Echoes%20Of%20Light/The%20Silent%20Conversation/Cover.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Credential=AKIARROH2RBJKPHCLGXP%2F20260123%2Feu-north-1%2Fs3%2Faws4_request&X-Amz-Date=20260123T020355Z&X-Amz-Expires=604800&X-Amz-SignedHeaders=host&X-Amz-Signature=e04f4414014e10dbe667c18a2b727edb8f3fa884a89c8057c991d70d0f62b3a6";


async function patchData() {
    try {
        console.log('Downloading albums.json...');
        const command = new GetObjectCommand({ Bucket: BUCKET_NAME, Key: ALBUMS_KEY });
        const response = await s3Client.send(command);
        const str = await response.Body.transformToString();
        const albums = JSON.parse(str);

        console.log('Patching data...');
        let echoesOfLight = albums.find(a => a.id === 'echoes-of-light-2026');
        if (echoesOfLight) {
            console.log('Found Echoes of Light. Updating URLs...');

            // 1. Force the ROOT album cover to be the SIGNED URL
            echoesOfLight.coverArt = SIGNED_ALBUM_COVER;

            // 2. Fix the specific track
            const track = echoesOfLight.tracks.find(t => t.id === '443' || t.title.toLowerCase().includes('silent conversation'));
            if (track) {
                console.log('Found track: The Silent Conversation');
                track.audioUrl = SIGNED_AUDIO_URL;
                track.coverArt = SIGNED_TRACK_COVER;
                track.isSingle = true; // Ensure it is marked as single
            }
        }

        // Retaining other fixes
        const desertWinds = albums.find(a => a.title.includes('Desert Winds And Open Roads'));
        if (desertWinds) {
            desertWinds.year = '2026';
            desertWinds.releaseDate = '2026-01-20';
            desertWinds.id = 'desert-winds-and-open-roads-2026';
            desertWinds.tracks.forEach(t => t.albumId = desertWinds.id);

            const goodbyeCal = desertWinds.tracks.find(t => t.title.includes('Goodbye California'));
            if (goodbyeCal) goodbyeCal.isSingle = true;
        }

        albums.forEach(a => {
            if (a.year === '1970') {
                a.year = '2024';
                // rough heuristic for release date if 1970
                if (a.releaseDate && a.releaseDate.startsWith('1970')) {
                    a.releaseDate = '2024-01-01';
                }
            }
            if (a.title.toLowerCase().includes('live')) {
                a.type = 'live';
            }
        });


        console.log('Uploading patched albums.json...');
        await s3Client.send(new PutObjectCommand({
            Bucket: BUCKET_NAME,
            Key: 'database/albums.json',
            Body: JSON.stringify(albums, null, 2),
            ContentType: 'application/json',
            ACL: 'private' // Keep it private, our API reads it with creds
        }));

        console.log('Success! Patched data uploaded. PLEASE REFRESH WEBSITE.');

    } catch (error) {
        console.error('Error:', error);
    }
}

patchData();
