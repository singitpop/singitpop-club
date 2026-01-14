require('dotenv').config({ path: '.env.local' });
const { S3Client, ListObjectsV2Command } = require('@aws-sdk/client-s3');

const CODE_REGION = "eu-north-1";
const BUCKET = process.env.AWS_S3_BUCKET || "singitpop-music";

async function findWhispers() {
    console.log("--- Searching for 'Whispers' ---");
    const client = new S3Client({
        region: CODE_REGION,
        credentials: {
            accessKeyId: process.env.AWS_ACCESS_KEY_ID,
            secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
        }
    });

    try {
        const cmd = new ListObjectsV2Command({
            Bucket: BUCKET,
            Prefix: 'albums/',
            Delimiter: '/'
        });
        const data = await client.send(cmd);

        console.log("Folders found containing 'whisper':");
        data.CommonPrefixes?.forEach(p => {
            if (p.Prefix.toLowerCase().includes('whisper')) {
                console.log(` - ${p.Prefix}`);
            }
        });

    } catch (e) { console.error(e); }
}

findWhispers();
