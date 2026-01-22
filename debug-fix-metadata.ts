
import { S3Client, GetObjectCommand, PutObjectCommand } from '@aws-sdk/client-s3';
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
    console.log('--- FIXING METADATA ---');
    try {
        // 1. Get Albums
        const getAlbumsCmd = new GetObjectCommand({ Bucket: BUCKET_NAME, Key: 'data/albums.json' });
        const res = await s3Client.send(getAlbumsCmd);
        const jsonStr = await streamToString(res.Body as Readable);
        const albums = JSON.parse(jsonStr);

        // 2. Find "Goodbye California"
        let targetTrack: any = null;
        let targetAlbumId: string = '';

        for (const album of albums) {
            const track = album.tracks.find((t: any) => t.title.toLowerCase().includes('goodbye california'));
            if (track) {
                targetTrack = track;
                targetAlbumId = album.id;
                break;
            }
        }

        if (!targetTrack) {
            console.error('❌ Could not find "Goodbye California" in albums.json');
            return;
        }

        const correctUid = `${targetAlbumId}-${targetTrack.id}`;
        console.log(`✅ Found Track: ${targetTrack.title}`);
        console.log(`   ID: ${targetTrack.id}`);
        console.log(`   Album: ${targetAlbumId}`);
        console.log(`   Computed UID: ${correctUid}`);

        // 3. Get Current Metadata
        const getMetaCmd = new GetObjectCommand({ Bucket: BUCKET_NAME, Key: 'admin/albumMetadata.json' });
        const metaRes = await s3Client.send(getMetaCmd);
        const metaStr = await streamToString(metaRes.Body as Readable);
        const metadata = JSON.parse(metaStr);

        console.log('--- Current Metadata ---');
        console.log(metadata);

        // 4. Update if different
        if (metadata.latestSingleUid !== correctUid) {
            console.log(`\n⚠️ Updating UID from ${metadata.latestSingleUid} -> ${correctUid}`);

            metadata.latestSingleUid = correctUid;
            metadata.latestSingleTitle = targetTrack.title;

            const putCmd = new PutObjectCommand({
                Bucket: BUCKET_NAME,
                Key: 'admin/albumMetadata.json',
                Body: JSON.stringify(metadata, null, 2),
                ContentType: 'application/json'
            });
            await s3Client.send(putCmd);
            console.log('✅ Metadata updated successfully.');
        } else {
            console.log('✅ Metadata is already correct.');
        }

    } catch (e) {
        console.error('ERROR:', e);
    }
}

run();
