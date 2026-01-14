require('dotenv').config({ path: '.env.local' });
const { S3Client, PutObjectCommand } = require('@aws-sdk/client-s3');
const fs = require('fs');
const path = require('path');

const CODE_REGION = "eu-north-1";
const BUCKET = process.env.AWS_S3_BUCKET || "singitpop-music";
const TARGET_SLUG = "whispers-of-the-heart-country-ballads-for-the-soul-2024--live";

// Exact folder name provided by user
const SOURCE_FOLDER = "/Users/garybirrell/Desktop/Singitpop/Whispers of the Heart Country Ballads for the Soul";

const s3Client = new S3Client({
    region: CODE_REGION,
    credentials: {
        accessKeyId: process.env.AWS_ACCESS_KEY_ID,
        secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
    }
});

async function uploadWhispers() {
    console.log(`🚀 Uploading 'Whispers' from ${SOURCE_FOLDER}`);
    console.log(`Target: ${BUCKET}/albums/${TARGET_SLUG}/`);

    if (!fs.existsSync(SOURCE_FOLDER)) {
        console.error(`❌ Source folder not found: ${SOURCE_FOLDER}`);
        return;
    }

    async function traverse(dir) {
        const items = fs.readdirSync(dir);
        for (const item of items) {
            const itemPath = path.join(dir, item);
            const stat = fs.statSync(itemPath);

            if (stat.isDirectory()) {
                await traverse(itemPath);
            } else if (item.endsWith('.mp3') || item.endsWith('.wav')) {
                // Flatten: use filename only
                const key = `albums/${TARGET_SLUG}/${item}`;
                console.log(`   Uploading ${item}...`);
                const fileContent = fs.readFileSync(itemPath);
                try {
                    await s3Client.send(new PutObjectCommand({
                        Bucket: BUCKET,
                        Key: key,
                        Body: fileContent
                    }));
                    console.log(`      ✅ Uploaded`);
                } catch (e) {
                    console.error(`      ❌ Failed:`, e.message);
                }
            }
        }
    }

    await traverse(SOURCE_FOLDER);
    console.log("✅ Recursive upload complete!");
}

uploadWhispers();
