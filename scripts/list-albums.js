require('dotenv').config({ path: '.env.local' });
const { S3Client, ListObjectsV2Command } = require('@aws-sdk/client-s3');

// Hardcoded region from s3.ts
const CODE_REGION = "eu-north-1";
const BUCKET = process.env.AWS_S3_BUCKET || "singitpop-music";

async function listFiles() {
    console.log("--- Listing S3 Files ---");
    console.log(`Bucket: ${BUCKET}`);

    const client = new S3Client({
        region: CODE_REGION,
        credentials: {
            accessKeyId: process.env.AWS_ACCESS_KEY_ID,
            secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
        }
    });

    try {
        console.log("\nListing Album Files (albums/whispers-of-the-heart-country-ballads-for-the-soul-2024--live/):");
        const listCmd = new ListObjectsV2Command({
            Bucket: BUCKET,
            Prefix: 'albums/whispers-of-the-heart-country-ballads-for-the-soul-2024--live/',
            MaxKeys: 20
        });
        const listData = await client.send(listCmd);

        if (listData.Contents) {
            console.log("Found Files:");
            listData.Contents.forEach(c => console.log(` - ${c.Key}`));
        } else {
            console.log("No files found.");
        }
    } catch (e) {
        console.error("List failed:", e);
    }
}

listFiles();
