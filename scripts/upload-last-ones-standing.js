const fs = require('fs');
const path = require('path');
const { S3Client, PutObjectCommand } = require("@aws-sdk/client-s3");
require('dotenv').config({ path: '.env.local' });

// Config
const BUCKET_NAME = process.env.AWS_S3_BUCKET || "singitpop-music";
const REGION = process.env.AWS_REGION || "eu-north-1";
const ALBUM_DIR = "/Users/garybirrell/Desktop/Singitpop/READY FOR WEBSITE/Last Ones Standing";
const ALBUM_SLUG = "last-ones-standing";

const s3Client = new S3Client({
    region: REGION,
    credentials: {
        accessKeyId: process.env.AWS_ACCESS_KEY_ID,
        secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
    }
});

function getMimeType(filePath) {
    if (filePath.endsWith('.mp3')) return 'audio/mpeg';
    if (filePath.endsWith('.wav')) return 'audio/wav';
    return 'application/octet-stream';
}

async function uploadFileToS3(filePath, key) {
    try {
        const fileContent = fs.readFileSync(filePath);
        const command = new PutObjectCommand({
            Bucket: BUCKET_NAME,
            Key: key,
            Body: fileContent,
            ContentType: getMimeType(filePath)
        });
        await s3Client.send(command);
        console.log(`✅ Uploaded to S3: s3://${BUCKET_NAME}/${key}`);
        return true;
    } catch (err) {
        console.error(`❌ Upload Failed: ${key}`, err);
        return false;
    }
}

async function run() {
    console.log(`🚀 Forcing re-upload of audio tracks for "${ALBUM_DIR}" to "albums/${ALBUM_SLUG}/"`);

    if (!fs.existsSync(ALBUM_DIR)) {
        console.error(`❌ Album folder not found: ${ALBUM_DIR}`);
        return;
    }

    const items = fs.readdirSync(ALBUM_DIR, { withFileTypes: true });
    
    for (const item of items) {
        if (item.isDirectory()) {
            const trackPath = path.join(ALBUM_DIR, item.name);
            const files = fs.readdirSync(trackPath);
            
            for (const file of files) {
                // Focus strictly on audio tracks as requested
                if (file.endsWith('.wav') || file.endsWith('.mp3')) {
                    const filePath = path.join(trackPath, file);
                    const s3Key = `albums/${ALBUM_SLUG}/${file}`;
                    
                    console.log(`\nUploading ${file}...`);
                    await uploadFileToS3(filePath, s3Key);
                }
            }
        }
    }
    console.log("\n✨ Re-uploading Complete! ✨");
}

run();
