
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
    console.log('--- INSPECTING EXCEL ROW ---');
    try {
        // 1. Find Excel
        const prefixes = ['metadata/', 'albums/covers/', 'admin/'];
        let excelKey = null;
        for (const prefix of prefixes) {
            const listCmd = new ListObjectsV2Command({ Bucket: BUCKET_NAME, Prefix: prefix });
            const listRes = await s3Client.send(listCmd);
            const found = listRes.Contents?.find(c => c.Key?.match(/\.xlsx?$|\.xlsl$/i));
            if (found) { excelKey = found.Key; break; }
        }

        if (!excelKey) { console.log('No Excel found'); return; }
        console.log('Excel:', excelKey);

        // 2. Read
        const getCmd = new GetObjectCommand({ Bucket: BUCKET_NAME, Key: excelKey });
        const res = await s3Client.send(getCmd);
        const buffer = await streamToBuffer(res.Body as Readable);
        const ref = XLSX.read(buffer, { type: 'buffer' });
        const sheet = ref.Sheets[ref.SheetNames[0]];
        const rows = XLSX.utils.sheet_to_json(sheet);

        // 3. Find Row
        const target = rows.find((r: any) => {
            const title = r['Song Title'] || r['Title'] || '';
            return title.toLowerCase().includes('goodbye california');
        });

        if (target) {
            console.log('✅ Found Excel Row:');
            console.log(target);

            // 4. Check Album matches
            const albumTitle = (target as any)['Album Title'] || (target as any)['Album'];
            console.log(`\nChecking Album Title: "${albumTitle}"`);

            // List S3 folders
            const listFolders = new ListObjectsV2Command({ Bucket: BUCKET_NAME, Prefix: 'albums/', Delimiter: '/' });
            const fRes = await s3Client.send(listFolders);
            const prefixes = fRes.CommonPrefixes?.map(p => p.Prefix);
            console.log('S3 Prefixes:', prefixes?.slice(0, 5)); // Sample

            const normalizedTitle = albumTitle.toString().toLowerCase().trim();
            const exact = prefixes?.find(p => p?.split('/')[1]?.toLowerCase().trim() === normalizedTitle);
            console.log(`Exact Match Found? ${exact || 'NO'}`);

            if (!exact) {
                const slug = normalizedTitle.replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '');
                const slugMatch = prefixes?.find(p => p?.toLowerCase().includes(slug));
                console.log(`Slug Match Found? ${slugMatch || 'NO'} (Slug: ${slug})`);
            }

        } else {
            console.log('❌ Row not found in Excel.');
        }

    } catch (e) {
        console.error(e);
    }
}

run();
