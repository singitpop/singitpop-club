
require('dotenv').config({ path: '.env.local' });
const { S3Client, GetObjectCommand } = require("@aws-sdk/client-s3");
const { getSignedUrl } = require("@aws-sdk/s3-request-presigner");

async function testSigning() {
    console.log("--- Debug S3 Signing ---");
    console.log("AWS_REGION:", process.env.AWS_REGION);
    console.log("AWS_S3_BUCKET_NAME:", process.env.AWS_S3_BUCKET_NAME);
    console.log("AWS_S3_BUCKET:", process.env.AWS_S3_BUCKET);

    // Fallback logic check
    const bucket = process.env.AWS_S3_BUCKET_NAME || process.env.AWS_S3_BUCKET || "singitpop-music";
    console.log("Selected Bucket:", bucket);

    const s3Client = new S3Client({
        region: process.env.AWS_REGION || "eu-north-1",
        credentials: {
            accessKeyId: process.env.AWS_ACCESS_KEY_ID,
            secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
        },
    });

    const key = "albums/a-love-that-never-ends/Slow%20Motion%20Love.mp3";
    const title = "Slow Motion Love";
    const safeTitle = title.replace(/[^a-zA-Z0-9.-]/g, '_');

    try {
        const command = new GetObjectCommand({
            Bucket: bucket,
            Key: key,
            ResponseContentDisposition: `attachment; filename="${safeTitle}.mp3"`
        });

        const url = await getSignedUrl(s3Client, command, { expiresIn: 3600 });
        console.log("\nSigned URL generated successfully:");
        console.log(url);
    } catch (e) {
        console.error("Signing failed:", e);
    }
}

testSigning();
