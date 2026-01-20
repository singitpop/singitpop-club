const { S3Client, HeadObjectCommand } = require("@aws-sdk/client-s3");
require('dotenv').config({ path: '.env.local' });

const client = new S3Client({
    region: "eu-north-1",
    credentials: {
        accessKeyId: process.env.AWS_ACCESS_KEY_ID,
        secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY
    }
});

async function check(key) {
    try {
        await client.send(new HeadObjectCommand({
            Bucket: "singitpop-music",
            Key: key
        }));
        console.log(`✅ FOUND: ${key}`);
    } catch (e) {
        console.log(`❌ MISSING (${e.name}): ${key}`);
    }
}

async function run() {
    await check("albums/desert-winds-and-open-roads/Desert Winds.mp3");
    await check("albums/valentine-country/Front Porch Valentine.mp3");
    await check("albums/valentine-country/Front%20Porch%20Valentine.mp3"); // Check encoded version just in case
}

run();
