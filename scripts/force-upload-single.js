const { S3Client, PutObjectCommand } = require("@aws-sdk/client-s3");
const fs = require('fs');
const path = require('path');
require('dotenv').config({ path: '.env.local' });

const client = new S3Client({
    region: "eu-north-1",
    credentials: {
        accessKeyId: process.env.AWS_ACCESS_KEY_ID,
        secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY
    }
});

async function upload() {
    const filePath = "/Users/garybirrell/Desktop/Singitpop/READY FOR WEBSITE/Valentine Country/front porch valentine/Front Porch Valentine.mp3";
    const key = "albums/valentine-country/Front Porch Valentine.mp3";

    console.log(`Uploading ${key}...`);

    try {
        const fileContent = fs.readFileSync(filePath);
        await client.send(new PutObjectCommand({
            Bucket: "singitpop-music",
            Key: key,
            Body: fileContent,
            ContentType: 'audio/mpeg'
        }));
        console.log("✅ Upload successful!");
    } catch (e) {
        console.error("❌ Upload failed:", e);
    }
}

upload();
