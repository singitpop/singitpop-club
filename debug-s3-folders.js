
const { S3Client, ListObjectsV2Command } = require("@aws-sdk/client-s3");
require('dotenv').config({ path: '.env.local' });

const s3Client = new S3Client({
    region: process.env.AWS_REGION || "eu-north-1",
    credentials: {
        accessKeyId: process.env.AWS_ACCESS_KEY_ID,
        secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
    },
});

const BUCKET_NAME = 'singitpop-music';

async function checkFolders() {
    try {
        console.log("Listing 'albums/' prefix...");
        const command = new ListObjectsV2Command({
            Bucket: BUCKET_NAME,
            Prefix: 'albums/',
            Delimiter: '/'
        });

        const res = await s3Client.send(command);
        const prefixes = res.CommonPrefixes || [];

        console.log("--- S3 Folders ---");
        prefixes.forEach(p => console.log(`'${p.Prefix}'`));

        console.log("\n--- Checking Specific Variants ---");
        const variants = [
            "albums/New Year's Odyssey/",
            "albums/New Year’s Odyssey/",
            "albums/New Years Odyssey/"
        ];

        for (const v of variants) {
            const cmd = new ListObjectsV2Command({
                Bucket: BUCKET_NAME,
                Prefix: v,
                MaxKeys: 1
            });
            const r = await s3Client.send(cmd);
            console.log(`Prefix: '${v}' -> Found: ${r.Contents ? r.Contents.length : 0} items`);
        }

    } catch (e) {
        console.error("Error:", e);
    }
}

checkFolders();
