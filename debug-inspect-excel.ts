
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
    console.log('--- INSPECTING EXCEL CONTENT ---');
    try {
        // 1. Find Excel
        const excelKey = 'admin/SingIt Pop Music Tracker 26-10-25.xlsx';
        console.log('Fetching:', excelKey);

        // 2. Read
        const getCmd = new GetObjectCommand({ Bucket: BUCKET_NAME, Key: excelKey });
        const res = await s3Client.send(getCmd);
        const buffer = await streamToBuffer(res.Body as Readable);
        const ref = XLSX.read(buffer, { type: 'buffer' });
        console.log('--- Sheets Available ---');
        console.log(ref.SheetNames);

        // Try to read ALL sheets to find "California"
        for (const name of ref.SheetNames) {
            console.log(`\nChecking Sheet: ${name}`);
            const s = ref.Sheets[name];
            const r = XLSX.utils.sheet_to_json(s);
            const found = r.filter((row: any) => JSON.stringify(row).toLowerCase().includes('california'));
            if (found.length > 0) {
                console.log(`✅ MATCH FOUND IN SHEET: ${name}`);
                console.log(found[0]); // Print sample
            }
        }

    } catch (e) {
        console.error(e);
    }
}

run();
