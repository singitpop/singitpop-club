import { S3Client, GetObjectCommand, PutObjectCommand } from '@aws-sdk/client-s3';

const s3Client = new S3Client({
    region: process.env.AWS_REGION || 'eu-north-1',
    credentials: {
        accessKeyId: process.env.AWS_ACCESS_KEY_ID || '',
        secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY || '',
    },
});

const BUCKET_NAME = 'singitpop-music';

async function streamToString(stream: any): Promise<string> {
    return new Promise((resolve, reject) => {
        const chunks: any[] = [];
        stream.on('data', (chunk: any) => chunks.push(chunk));
        stream.on('error', reject);
        stream.on('end', () => resolve(Buffer.concat(chunks).toString('utf8')));
    });
}

async function fixMetadata() {
    try {
        // 1. Read albums.json
        console.log('📖 Reading data/albums.json...');
        const albumsCmd = new GetObjectCommand({
            Bucket: BUCKET_NAME,
            Key: 'data/albums.json',
        });
        const albumsResponse = await s3Client.send(albumsCmd);
        const albumsJson = await streamToString(albumsResponse.Body);
        const albums = JSON.parse(albumsJson);

        // 2. Find "Goodbye California"
        console.log('🔍 Searching for "Goodbye California"...');
        let foundTrack: any = null;
        let foundAlbumId: string = '';

        for (const album of albums) {
            const track = album.tracks.find((t: any) =>
                t.title.toLowerCase().includes('goodbye california')
            );
            if (track) {
                foundTrack = track;
                foundAlbumId = album.id;
                break;
            }
        }

        if (!foundTrack) {
            console.error('❌ Track not found!');
            return;
        }

        const newUid = `${foundAlbumId}-${foundTrack.id}`;
        console.log(`✅ Found track:`);
        console.log(`   Album ID: ${foundAlbumId}`);
        console.log(`   Track ID: ${foundTrack.id}`);
        console.log(`   New UID: ${newUid}`);
        console.log(`   Title: ${foundTrack.title}`);

        // 3. Read current metadata
        console.log('\n📖 Reading admin/albumMetadata.json...');
        const metaCmd = new GetObjectCommand({
            Bucket: BUCKET_NAME,
            Key: 'admin/albumMetadata.json',
        });
        const metaResponse = await s3Client.send(metaCmd);
        const metaJson = await streamToString(metaResponse.Body);
        const metadata = JSON.parse(metaJson);

        console.log(`Current UID: ${metadata.latestSingleUid}`);

        // 4. Update metadata
        metadata.latestSingleId = foundTrack.id;
        metadata.latestSingleUid = newUid;
        metadata.latestSingleTitle = foundTrack.title;

        console.log(`\n💾 Updating metadata...`);
        const putCmd = new PutObjectCommand({
            Bucket: BUCKET_NAME,
            Key: 'admin/albumMetadata.json',
            Body: JSON.stringify(metadata, null, 2),
            ContentType: 'application/json',
            CacheControl: 'no-cache',
        });
        await s3Client.send(putCmd);

        console.log('✅ Metadata updated successfully!');
        console.log(JSON.stringify(metadata, null, 2));

    } catch (error) {
        console.error('❌ Error:', error);
    }
}

fixMetadata();
