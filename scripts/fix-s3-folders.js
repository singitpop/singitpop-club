require('dotenv').config({ path: '.env.local' });
const { S3Client, ListObjectsV2Command, CopyObjectCommand, DeleteObjectCommand } = require('@aws-sdk/client-s3');

const CODE_REGION = "eu-north-1";
const BUCKET = process.env.AWS_S3_BUCKET || "singitpop-music";

const s3Client = new S3Client({
    region: CODE_REGION,
    credentials: {
        accessKeyId: process.env.AWS_ACCESS_KEY_ID,
        secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
    }
});

async function flattenFolders() {
    console.log(`🚀 Starting S3 Flatten Operation on bucket: ${BUCKET}`);

    try {
        let continuationToken = undefined;
        do {
            const listCmd = new ListObjectsV2Command({
                Bucket: BUCKET,
                Prefix: 'albums/',
                ContinuationToken: continuationToken
            });
            const data = await s3Client.send(listCmd);

            if (!data.Contents) {
                console.log("No files found.");
                break;
            }

            for (const item of data.Contents) {
                const key = item.Key;
                if (!key.endsWith('.mp3') && !key.endsWith('.wav')) continue; // Only music files

                const parts = key.split('/');
                // Expected: albums / album-slug / filename.ext (3 parts)
                // Bad: albums / album-slug / SubFolder / filename.ext (4+ parts)

                if (parts.length > 3) {
                    const albumSlug = parts[1];
                    const fileName = parts[parts.length - 1];
                    const newKey = `albums/${albumSlug}/${fileName}`;

                    // Don't overwrite if it's the same (shouldn't happen with length check but safety first)
                    if (key === newKey) continue;

                    console.log(`\nFound nested file: ${key}`);
                    console.log(`   -> Moving to: ${newKey}`);

                    // 1. Copy
                    await s3Client.send(new CopyObjectCommand({
                        Bucket: BUCKET,
                        CopySource: `${BUCKET}/${encodeURIComponent(key)}`, // Source must be URI encoded? Actually CopySource is Bucket+Key
                        Key: newKey,
                        // ACL removed as bucket doesn't support it
                    }));

                    // 2. Delete Original
                    await s3Client.send(new DeleteObjectCommand({
                        Bucket: BUCKET,
                        Key: key
                    }));

                    console.log("   ✅ Fixed.");
                }
            }

            continuationToken = data.NextContinuationToken;
        } while (continuationToken);

        console.log("\n🎉 Operation Complete. S3 Folders are flattened.");

    } catch (e) {
        console.error("❌ Error flattening folders:", e);
    }
}

flattenFolders();
