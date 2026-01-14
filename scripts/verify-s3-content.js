require('dotenv').config({ path: '.env.local' });
const { S3Client, ListObjectsV2Command } = require('@aws-sdk/client-s3');

const CODE_REGION = "eu-north-1";
const BUCKET = process.env.AWS_S3_BUCKET || "singitpop-music";

const s3Client = new S3Client({
    region: CODE_REGION,
    credentials: {
        accessKeyId: process.env.AWS_ACCESS_KEY_ID,
        secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
    }
});

async function listFolders() {
    console.log(`🔍 Checking S3 Bucket: ${BUCKET}...`);

    let folders = new Set();
    let fileCount = 0;
    let continuationToken = undefined;

    try {
        do {
            const command = new ListObjectsV2Command({
                Bucket: BUCKET,
                ContinuationToken: continuationToken
            });

            const response = await s3Client.send(command);

            if (response.Contents) {
                response.Contents.forEach(item => {
                    fileCount++;
                    // Key format is usually "Album Name/Song.mp3"
                    const parts = item.Key.split('/');
                    if (parts.length > 1) {
                        folders.add(parts[0]);
                    }
                });
            }

            continuationToken = response.NextContinuationToken;
            process.stdout.write('.'); // progress dot

        } while (continuationToken);

        console.log("\n\n✅ Scan Complete.");
        console.log(`Total Files: ${fileCount}`);
        console.log(`Total Albums (based on folders): ${folders.size}`);
        console.log("------------------------------------------------");

        const sortedFolders = Array.from(folders).sort();
        sortedFolders.forEach(folder => {
            console.log(`📁 ${folder}`);
        });

    } catch (err) {
        console.error("❌ Error listing S3 objects:", err);
    }
}

listFolders();
