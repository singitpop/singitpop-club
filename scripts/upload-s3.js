const { S3Client, PutObjectCommand } = require("@aws-sdk/client-s3");
const fs = require('fs');
const path = require('path');
require('dotenv').config({ path: '.env.local' });

const S3_BUCKET = process.env.AWS_S3_BUCKET || "singitpop-music";
const AWS_REGION = "eu-north-1";
const SOURCE_DIR = "/Users/garybirrell/Desktop/Singitpop";

const s3Client = new S3Client({
    region: AWS_REGION,
    credentials: {
        accessKeyId: process.env.AWS_ACCESS_KEY_ID,
        secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
    },
});

async function uploadFile(filePath, key) {
    try {
        const fileContent = fs.readFileSync(filePath);
        const command = new PutObjectCommand({
            Bucket: S3_BUCKET,
            Key: key,
            Body: fileContent,
        });
        await s3Client.send(command);
        console.log(`✅ Uploaded: ${key}`);
    } catch (err) {
        console.error(`❌ Error uploading ${key}:`, err);
    }
}

async function scanAndUpload(dir) {
    if (!fs.existsSync(dir)) {
        console.error(`Directory not found: ${dir}`);
        return;
    }

    const items = fs.readdirSync(dir, { withFileTypes: true });

    for (const item of items) {
        if (item.isDirectory()) {
            const dirname = item.name;
            // Skip website and untitled folders
            if (dirname === 'website' || dirname === 'untitled folder') continue;

            const slug = dirname.toLowerCase().replace(/[^a-z0-9 ]/g, '').replace(/ /g, '-');
            const albumPath = path.join(dir, dirname);

            console.log(`\n📂 Processing Album: ${dirname} -> ${slug}`);

            const files = fs.readdirSync(albumPath);
            for (const file of files) {
                if (file.endsWith('.wav') || file.endsWith('.mp3')) { // Upload wav and mp3
                    // Exclude wav if we only want mp3? The previous script excluded wav.
                    // But user wants "Secure digital downloads" which usually includes Hi-Res (WAV).
                    // The plan mentions "Download High-Res WAV". So I should upload WAVs too.

                    const filePath = path.join(albumPath, file);
                    const key = `albums/${slug}/${file}`;
                    console.log(`   Uploading ${file}...`);
                    await uploadFile(filePath, key);
                }
            }
        }
    }
}

console.log("🚀 Starting S3 Upload Script (Node.js)");
scanAndUpload(SOURCE_DIR);
