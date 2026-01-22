
import { S3Client, GetObjectCommand, ListObjectsV2Command } from '@aws-sdk/client-s3';
import * as XLSX from 'xlsx';
import { Readable } from 'stream';

const s3Client = new S3Client({
    region: process.env.AWS_REGION || 'eu-north-1',
    credentials: {
        accessKeyId: process.env.AWS_ACCESS_KEY_ID!,
        secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY!
    }
});

const BUCKET_NAME = 'singitpop-music';

async function streamToBuffer(stream: Readable): Promise<Buffer> {
    return new Promise((resolve, reject) => {
        const chunks: Buffer[] = [];
        stream.on('data', (chunk) => chunks.push(Buffer.from(chunk)));
        stream.on('error', (err) => reject(err));
        stream.on('end', () => resolve(Buffer.concat(chunks)));
    });
}

async function run() {
    console.log('--- EXCEL SCHEMA DISCOVERY ---');
    try {
        // 1. Find Excel
        const excelKey = 'albums/covers/Album list for Website.xlsx';
        console.log('Fetching Excel:', excelKey);

        // 2. Read Excel
        const getCmd = new GetObjectCommand({ Bucket: BUCKET_NAME, Key: excelKey });
        const getRes = await s3Client.send(getCmd);
        const buffer = await streamToBuffer(getRes.Body as Readable);

        const workbook = XLSX.read(buffer, { type: 'buffer' });
        const sheet = workbook.Sheets[workbook.SheetNames[0]];
        const json = XLSX.utils.sheet_to_json(sheet); // First row as header

        if (json.length > 0) {
            console.log('✅ Excel Headers:', Object.keys(json[0] as object));
            console.log('First Row Sample:', json[0]);
        } else {
            console.log('❌ Excel is empty');
        }

        // 3. Check Album Folder Content (for Cover)
        // Taking the first album from the excel if possible, or defaulting
        const sampleAlbum = (json[0] as any)['Album'] || 'a-love-that-never-ends-2026';
        console.log(`\n--- Inspecting Album: ${sampleAlbum} ---`);

        // Try to find a folder matching this album
        const albumsListCmd = new ListObjectsV2Command({ Bucket: BUCKET_NAME, Prefix: 'albums/' });
        const albumsList = await s3Client.send(albumsListCmd);
        // Find folder that looks like the album name
        // (Primitive search, just listing what we have)

        console.log('S3 Albums content sample:');
        albumsList.Contents?.slice(0, 10).forEach(c => console.log(c.Key));

    } catch (e) {
        console.error('ERROR:', e);
    }
}

run();
