
const { S3Client, GetObjectCommand } = require('@aws-sdk/client-s3');
require('dotenv').config({ path: '.env.local' });

const s3Client = new S3Client({
    region: process.env.AWS_REGION,
    credentials: {
        accessKeyId: process.env.AWS_ACCESS_KEY_ID,
        secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
    },
});

async function checkMetadata() {
    try {
        const command = new GetObjectCommand({
            Bucket: process.env.AWS_S3_BUCKET || 'singitpop-music',
            Key: 'admin/albumMetadata.json',
        });
        const response = await s3Client.send(command);
        const str = await response.Body.transformToString();
        console.log("Current S3 Metadata:", str);
    } catch (error) {
        console.error("Error reading metadata:", error);
    }
}

checkMetadata();
