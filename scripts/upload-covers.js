const { S3Client, PutObjectCommand, HeadObjectCommand } = require('@aws-sdk/client-s3');
const fs = require('fs');
const path = require('path');
require('dotenv').config({ path: path.join(__dirname, '../.env.local') });

const S3_BUCKET = 'singitpop-music';
const SOURCE_DIR = '/Users/garybirrell/Desktop/Singitpop/READY FOR WEBSITE';

const s3 = new S3Client({
    region: 'eu-north-1',
    credentials: {
        accessKeyId: process.env.AWS_ACCESS_KEY_ID,
        secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY
    }
});

async function keyExists(key) {
    try {
        await s3.send(new HeadObjectCommand({ Bucket: S3_BUCKET, Key: key }));
        return true;
    } catch {
        return false;
    }
}

async function uploadCover(folderName) {
    const dirPath = path.join(SOURCE_DIR, folderName);
    if (!fs.existsSync(dirPath)) return;

    const files = fs.readdirSync(dirPath);
    const coverFile = files.find(f => /^cover\.(png|jpg|webp)$/i.test(f));
    if (!coverFile) {
        console.log(`   ⚠️  No cover found in: ${folderName}`);
        return;
    }

    const slug = folderName.toLowerCase().replace(/[^a-z0-9 ]/g, '').replace(/ /g, '-');
    const key = `albums/${slug}/cover.png`;

    // Skip if already uploaded
    if (await keyExists(key)) {
        console.log(`   ⏭️  Already exists: ${key}`);
        return;
    }

    const filePath = path.join(dirPath, coverFile);
    await s3.send(new PutObjectCommand({
        Bucket: S3_BUCKET,
        Key: key,
        Body: fs.readFileSync(filePath),
        ContentType: 'image/png'
    }));
    console.log(`   ✅ Uploaded: ${key}`);
}

async function run() {
    console.log('🎨 Uploading Album Cover Images to S3...');
    const folders = fs.readdirSync(SOURCE_DIR, { withFileTypes: true })
        .filter(d => d.isDirectory() && d.name !== 'website' && d.name !== 'untitled folder')
        .map(d => d.name);

    for (const folder of folders) {
        console.log(`\n📂 ${folder}`);
        await uploadCover(folder);
    }

    console.log('\n✅ All covers uploaded!');
}

run().catch(console.error);
