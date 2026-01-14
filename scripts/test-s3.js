require('dotenv').config({ path: '.env.local' });
const { S3Client, GetObjectCommand, ListObjectsV2Command, GetBucketLocationCommand } = require('@aws-sdk/client-s3');
const { STSClient, GetCallerIdentityCommand } = require('@aws-sdk/client-sts');
const { getSignedUrl } = require('@aws-sdk/s3-request-presigner');
const fetch = require('node-fetch').default || require('node-fetch');

// Hardcoded region from s3.ts
const CODE_REGION = "eu-north-1";
const BUCKET = process.env.AWS_S3_BUCKET || "singitpop-music";

async function testS3() {
    console.log("--- Testing S3 Configuration ---");
    console.log(`Env Bucket: ${BUCKET}`);
    console.log(`Code Region: ${CODE_REGION}`);

    // 0. Check Identity
    console.log("\n0. Verifying Identity...");
    const stsClient = new STSClient({
        region: CODE_REGION,
        credentials: {
            accessKeyId: process.env.AWS_ACCESS_KEY_ID,
            secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
        }
    });

    try {
        const identity = await stsClient.send(new GetCallerIdentityCommand({}));
        console.log(`Logged in as ARN: ${identity.Arn}`);
        console.log(`Account: ${identity.Account}`);
        console.log(`UserId: ${identity.UserId}`);
    } catch (e) {
        console.error("Failed to check identity:", e.message);
    }


    const client = new S3Client({
        region: CODE_REGION,
        credentials: {
            accessKeyId: process.env.AWS_ACCESS_KEY_ID,
            secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
        }
    });

    try {
        // 1. Check Bucket Location
        console.log("\n1. Verifying Bucket Location...");
        // Use a client with NO region to ask for location (usually us-east-1 endpoint handles it)
        const globalClient = new S3Client({
            region: "us-east-1",
            credentials: {
                accessKeyId: process.env.AWS_ACCESS_KEY_ID,
                secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
            }
        });
        const loc = await globalClient.send(new GetBucketLocationCommand({ Bucket: BUCKET }));
        console.log(`Bucket Location: ${loc.LocationConstraint}`);

        // 2. List Objects
        console.log("\n2. Listing first 10 objects in 'albums/'...");
        const listCmd = new ListObjectsV2Command({
            Bucket: BUCKET,
            Prefix: 'albums/',
            MaxKeys: 10
        });
        const listData = await client.send(listCmd);

        let targetKey = "albums/valentine-country/Front Porch Valentine-2.wav";

        if (listData.Contents && listData.Contents.length > 0) {
            console.log("Found objects:");
            listData.Contents.forEach(c => console.log(` - ${c.Key}`));
            targetKey = listData.Contents.find(c => c.Key.endsWith('.wav') || c.Key.endsWith('.mp3'))?.Key || listData.Contents[0].Key;
            console.log(`\nSelected target key: ${targetKey}`);
        } else {
            console.log("No objects found in 'albums/' prefix.");
        }

        // 3. Sign and Fetch
        console.log(`\n3. Signing URL for: ${targetKey}`);
        const command = new GetObjectCommand({
            Bucket: BUCKET,
            Key: targetKey
        });
        const url = await getSignedUrl(client, command, { expiresIn: 3600 });
        console.log("URL:", url);

        console.log("\n4. Fetching (HEAD)...");
        const res = await fetch(url, { method: 'HEAD' });
        console.log(`Status: ${res.status} ${res.statusText}`);

    } catch (e) {
        console.error("Error:", e);
    }
}

testS3();
