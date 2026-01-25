
import fs from 'fs';

// GENERATED PRESIGNED URLs
const SIGNED_ALBUM_COVER = "https://singitpop-music.s3.eu-north-1.amazonaws.com/albums/Echoes%20Of%20Light/cover.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Credential=AKIARROH2RBJKPHCLGXP%2F20260123%2Feu-north-1%2Fs3%2Faws4_request&X-Amz-Date=20260123T020354Z&X-Amz-Expires=604800&X-Amz-SignedHeaders=host&X-Amz-Signature=863cd55df27c3e7e8e5d16597dba84cb4bc78c984d5c8ae625410ca5463584d5";
const SIGNED_AUDIO_URL = "https://singitpop-music.s3.eu-north-1.amazonaws.com/albums/Echoes%20Of%20Light/The%20Silent%20Conversation/The%20Silent%20Conversation.mp3?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Credential=AKIARROH2RBJKPHCLGXP%2F20260123%2Feu-north-1%2Fs3%2Faws4_request&X-Amz-Date=20260123T020354Z&X-Amz-Expires=604800&X-Amz-SignedHeaders=host&X-Amz-Signature=f6d957478d9bad5e337620ce7b23e1e589590fec8a1f5468de10ac0318ee2878";
const SIGNED_TRACK_COVER = "https://singitpop-music.s3.eu-north-1.amazonaws.com/albums/Echoes%20Of%20Light/The%20Silent%20Conversation/Cover.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Credential=AKIARROH2RBJKPHCLGXP%2F20260123%2Feu-north-1%2Fs3%2Faws4_request&X-Amz-Date=20260123T020355Z&X-Amz-Expires=604800&X-Amz-SignedHeaders=host&X-Amz-Signature=e04f4414014e10dbe667c18a2b727edb8f3fa884a89c8057c991d70d0f62b3a6";

const INPUT_FILE = '/tmp/temp_v8.json';
const OUTPUT_FILE = '/tmp/patched_v8.json';

try {
    if (!fs.existsSync(INPUT_FILE)) {
        throw new Error(`Input file ${INPUT_FILE} not found!`);
    }
    const raw = fs.readFileSync(INPUT_FILE, 'utf8');
    const albums = JSON.parse(raw);

    console.log('Patching data locally...');
    let found = false;
    let echoesOfLight = albums.find(a => a.id === 'echoes-of-light-2026' || a.title === 'Echoes Of Light');

    if (echoesOfLight) {
        console.log('Found Echoes of Light.');
        echoesOfLight.coverArt = SIGNED_ALBUM_COVER;

        const track = echoesOfLight.tracks.find(t => t.id === '443' || t.title.toLowerCase().includes('silent conversation'));
        if (track) {
            console.log('Found track: The Silent Conversation');
            track.audioUrl = SIGNED_AUDIO_URL;
            track.coverArt = SIGNED_TRACK_COVER;
            track.isSingle = true;
            found = true;
        }
    } else {
        console.warn('WARNING: Could not find Echoes of Light!');
    }

    // Previous fixes
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
            if (a.releaseDate && a.releaseDate.startsWith('1970')) {
                a.releaseDate = '2024-01-01';
            }
        }
        if (a.title.toLowerCase().includes('live')) {
            a.type = 'live';
        }
    });

    fs.writeFileSync(OUTPUT_FILE, JSON.stringify(albums, null, 2));
    console.log(`Successfully wrote ${OUTPUT_FILE}`);

} catch (e) {
    console.error('Error in local patch:', e);
    process.exit(1);
}
