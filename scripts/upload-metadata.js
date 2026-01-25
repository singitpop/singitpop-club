
const { S3Client, PutObjectCommand } = require("@aws-sdk/client-s3");
const fs = require('fs');
const path = require('path');
require('dotenv').config({ path: '.env.local' });

const S3_BUCKET = process.env.AWS_S3_BUCKET || "singitpop-music";
const AWS_REGION = process.env.AWS_REGION || "eu-north-1";

// Use same env loading as other scripts
const s3Client = new S3Client({
    region: AWS_REGION,
    credentials: {
        accessKeyId: process.env.AWS_ACCESS_KEY_ID,
        secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
    },
});

async function main() {
    const filePath = path.join(__dirname, '../src/data/albums.json');
    if (!fs.existsSync(filePath)) {
        console.error("❌ albums.json not found. Run convertExcelToAlbums.js first.");
        process.exit(1);
    }

    const fileContent = fs.readFileSync(filePath);
    const key = 'data/albums.json';

    console.log(`Uploading metadata to S3://${S3_BUCKET}/${key}...`);

    try {
        const command = new PutObjectCommand({
            Bucket: S3_BUCKET,
            Key: key,
            Body: fileContent,
            ContentType: "application/json",
            CacheControl: "no-cache"
        });
        await s3Client.send(command);
        console.log("✅ Metadata uploaded successfully!");
    } catch (e) {
        console.error("❌ Upload failed:", e);
        process.exit(1);
    }
}

main();
