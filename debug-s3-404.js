
const { S3Client, ListObjectsV2Command, GetObjectCommand } = require("@aws-sdk/client-s3");
const { getSignedUrl } = require("@aws-sdk/s3-request-presigner");
require('dotenv').config({ path: '.env.local' });

const s3Client = new S3Client({
    region: process.env.AWS_REGION || "eu-north-1",
    credentials: {
        accessKeyId: process.env.AWS_ACCESS_KEY_ID,
        secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
    },
});

const BUCKET_NAME = 'singitpop-music';

async function checkFile(key) {
    try {
        console.log(`Checking S3 Key: ${key}`);
        const command = new GetObjectCommand({
            Bucket: BUCKET_NAME,
            Key: key,
        });
        // Just try to get signed URL to verify credentials work, but also try HEAD/List
        const url = await getSignedUrl(s3Client, command, { expiresIn: 3600 });
        console.log(`Generated URL: ${url}`);

        // Use List to confirm existence without downloading
        // We list the parent prefix
        const prefix = key.substring(0, key.lastIndexOf('/') + 1);
        console.log(`Listing Prefix: ${prefix}`);

        const listCmd = new ListObjectsV2Command({
            Bucket: BUCKET_NAME,
            Prefix: prefix
        });

        const res = await s3Client.send(listCmd);
        const contents = res.Contents || [];

        const match = contents.find(c => c.Key === key);
        if (match) {
            console.log("✅ File EXISTS in S3");
        } else {
            console.log("❌ File NOT FOUND in S3 listing");
            console.log("Found instead:", contents.map(c => c.Key));
        }

    } catch (e) {
        console.error("Error:", e);
    }
}

// Test case from user report: "albums/Echoes Of Light/cover.png"
// Note: S3 is case sensitive.
checkFile("albums/Echoes Of Light/cover.png");
checkFile("albums/echoes-of-light/cover.png"); // Try slug format
checkFile("albums/Echoes of Light/cover.png"); // Try casing var
