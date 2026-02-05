const { S3Client, GetObjectCommand, PutObjectCommand, ListObjectsV2Command } = require('@aws-sdk/client-s3');
const { execSync } = require('child_process');
const XLSX = require('xlsx');
const fs = require('fs');
const path = require('path');
require('dotenv').config({ path: '.env.local' });

const s3Client = new S3Client({
    region: process.env.AWS_REGION,
    credentials: {
        accessKeyId: process.env.AWS_ACCESS_KEY_ID,
        secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
    },
});

const BUCKET = 'singitpop-music';

async function streamToBuffer(stream) {
    return new Promise((resolve, reject) => {
        const chunks = [];
        stream.on('data', (chunk) => chunks.push(chunk));
        stream.on('error', reject);
        stream.on('end', () => resolve(Buffer.concat(chunks)));
    });
}

function normalize(s) {
    return s.toLowerCase().replace(/['"]/g, '').replace(/[^a-z0-9]+/g, ' ').trim();
}

async function findSourceFile(singleName) {
    const result = await s3Client.send(new ListObjectsV2Command({
        Bucket: BUCKET,
        Prefix: 'albums/'
    }));

    if (!result.Contents) return null;

    const normalizedSingle = normalize(singleName);

    const match = result.Contents.find(obj => {
        const key = obj.Key.toLowerCase();
        if (key.includes('ringtones/')) return false;
        if (!key.endsWith('.mp3') && !key.endsWith('.wav')) return false;

        const normalizedKey = normalize(path.basename(obj.Key, path.extname(obj.Key)));
        return normalizedKey === normalizedSingle || normalizedKey.includes(normalizedSingle);
    });

    return match ? match.Key : null;
}

async function generateRingtone(singleName) {
    const baseName = singleName.toLowerCase()
        .replace(/['"]/g, '')
        .replace(/[^a-z0-9]+/g, '-')
        .replace(/^-+|-+$/g, '');

    console.log(`🎵 Processing: ${singleName} (${baseName})...`);

    const sourceKey = await findSourceFile(singleName);
    if (!sourceKey) {
        console.log(`❌ Source not found for "${singleName}"`);
        return;
    }

    console.log(`🔍 Found source: ${sourceKey}`);

    const tempDir = path.join(__dirname, '../temp_ringtones');
    if (!fs.existsSync(tempDir)) fs.mkdirSync(tempDir);

    const ext = path.extname(sourceKey);
    const sourceLocal = path.join(tempDir, `source${ext}`);
    const mp3Local = path.join(tempDir, `${baseName}.mp3`);
    const m4rLocal = path.join(tempDir, `${baseName}.m4r`);

    try {
        // 1. Download
        const getCmd = new GetObjectCommand({ Bucket: BUCKET, Key: sourceKey });
        const response = await s3Client.send(getCmd);
        const fileStream = fs.createWriteStream(sourceLocal);
        response.Body.pipe(fileStream);
        await new Promise((resolve) => fileStream.on('finish', resolve));

        // 2. Slice/Convert with FFmpeg (30s)
        console.log('✂️  Slicing and converting (30s)...');
        execSync(`ffmpeg -y -i "${sourceLocal}" -ss 00:00:30 -t 00:00:30 -acodec libmp3lame -ab 192k -vn "${mp3Local}"`, { stdio: 'ignore' });
        execSync(`ffmpeg -y -i "${sourceLocal}" -ss 00:00:30 -t 00:00:30 -c:a aac -b:a 192k -vn -f mp4 "${m4rLocal}"`, { stdio: 'ignore' });

        // 3. Upload
        console.log('☁️  Uploading to S3...');
        await s3Client.send(new PutObjectCommand({
            Bucket: BUCKET,
            Key: `ringtones/${baseName}.mp3`,
            Body: fs.readFileSync(mp3Local),
            ContentType: 'audio/mpeg'
        }));
        await s3Client.send(new PutObjectCommand({
            Bucket: BUCKET,
            Key: `ringtones/${baseName}.m4r`,
            Body: fs.readFileSync(m4rLocal),
            ContentType: 'audio/x-m4r'
        }));

        console.log(`✅ Finished: ${baseName}\n`);

    } catch (error) {
        console.error(`❌ Error processing ${singleName}:`, error.message);
    } finally {
        [sourceLocal, mp3Local, m4rLocal].forEach(f => {
            if (fs.existsSync(f)) fs.unlinkSync(f);
        });
    }
}

async function run() {
    // 1. Read spreadsheet from S3
    console.log('📊 Fetching Spreadsheet from S3...');
    const command = new GetObjectCommand({ Bucket: BUCKET, Key: 'admin/Ringtones.xlsx' });
    const response = await s3Client.send(command);
    const buffer = await streamToBuffer(response.Body);
    const workbook = XLSX.read(buffer, { type: 'buffer' });
    const sheet = workbook.Sheets[workbook.SheetNames[0]];
    const data = XLSX.utils.sheet_to_json(sheet, { header: 1 });

    const ringtones = data.slice(1).filter(row => row[0]).map(row => String(row[0]).trim());

    console.log(`🚀 Refreshing ${ringtones.length} ringtones to 30s...\n`);

    for (const name of ringtones) {
        await generateRingtone(name);
        await new Promise(r => setTimeout(r, 100));
    }

    console.log('✨ All done!');
}

run();
