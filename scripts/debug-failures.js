require('dotenv').config({ path: '.env.local' });
const { S3Client, ListObjectsV2Command } = require('@aws-sdk/client-s3');

const CODE_REGION = "eu-north-1";
const BUCKET = process.env.AWS_S3_BUCKET || "singitpop-music";

async function checkFailures() {
    console.log("--- Checking Failing Albums ---");
    const client = new S3Client({
        region: CODE_REGION,
        credentials: {
            accessKeyId: process.env.AWS_ACCESS_KEY_ID,
            secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
        }
    });

    // 1. Check "Rough Hands" for typo
    console.log("\n1. Checking 'dust-and-diamonds-' for 'Rough Hands':");
    try {
        const cmd = new ListObjectsV2Command({
            Bucket: BUCKET,
            Prefix: 'albums/dust-and-diamonds-/',
        });
        const data = await client.send(cmd);
        const file = data.Contents?.find(c => c.Key.toLowerCase().includes("rough"));
        console.log("Found:", file ? file.Key : "Nothing matching 'rough'");
    } catch (e) { console.error(e); }

    // 2. Check "Spring Begins Inside You" matches
    console.log("\n2. Listing 'spring-begins-inside-you':");
    try {
        const cmd = new ListObjectsV2Command({
            Bucket: BUCKET,
            Prefix: 'albums/spring-begins-inside-you/',
        });
        const data = await client.send(cmd);
        data.Contents?.forEach(c => console.log(c.Key));
    } catch (e) { console.error(e); }
}

checkFailures();
