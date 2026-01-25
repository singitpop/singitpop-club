
import { S3Client, GetObjectCommand } from '@aws-sdk/client-s3';
import { Readable } from 'stream';

const s3Client = new S3Client({
    region: process.env.AWS_REGION || 'eu-north-1',
    credentials: {
        accessKeyId: process.env.AWS_ACCESS_KEY_ID!,
        secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY!
    }
});

const BUCKET_NAME = 'singitpop-music';

async function streamToString(stream: Readable): Promise<string> {
    return new Promise((resolve, reject) => {
        const chunks: any[] = [];
        stream.on('data', (chunk) => chunks.push(chunk));
        stream.on('error', reject);
        stream.on('end', () => resolve(Buffer.concat(chunks).toString('utf-8')));
    });
}

async function run() {
    console.log('--- CHECKING DATA INTEGRITY ---');
    try {
        // 1. Check Metadata
        const getMeta = new GetObjectCommand({ Bucket: BUCKET_NAME, Key: 'admin/albumMetadata.json' });
        const metaRes = await s3Client.send(getMeta);
        const meta = JSON.parse(await streamToString(metaRes.Body as Readable));
        console.log('Metadata:', meta);

        // 2. Check Albums
        const getAlbums = new GetObjectCommand({ Bucket: BUCKET_NAME, Key: 'data/albums.json' });
        const albRes = await s3Client.send(getAlbums);
        const albums = JSON.parse(await streamToString(albRes.Body as Readable));

        console.log(`Total Albums: ${albums.length}`);

        // Find Metadata UID
        if (meta.latestSingleUid) {
            console.log(`\nLooking for UID: ${meta.latestSingleUid}`);
            let found = false;
            for (const a of albums) {
                const t = a.tracks.find((tr: any) => `${a.id}-${tr.id}` === meta.latestSingleUid);
                if (t) {
                    console.log('✅ Found Linked Track:', t.title);
                    console.log('   Album:', a.title);
                    found = true;
                    break;
                }
            }
            if (!found) console.log('❌ UID NOT FOUND in albums.json');
        }

        // Find "Goodbye California"
        console.log('\nSearching for "Goodbye California"...');
        const gb = albums.flatMap((a: any) => a.tracks.map((t: any) => ({ ...t, _album: a.title, _id: `${a.id}-${t.id}` })))
            .find((t: any) => t.title.toLowerCase().includes('goodbye california'));

        if (gb) {
            console.log('✅ Found "Goodbye California":');
            console.log(gb);
        } else {
            console.log('❌ "Goodbye California" NOT FOUND in albums.json');
        }

    } catch (e) {
        console.error(e);
    }
}

run();
