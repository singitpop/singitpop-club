const { S3Client, ListObjectsV2Command, GetObjectCommand } = require("@aws-sdk/client-s3");
const { getSignedUrl } = require("@aws-sdk/s3-request-presigner");
require('dotenv').config({ path: '.env.local' });

const client = new S3Client({
    region: "eu-north-1",
    credentials: {
        accessKeyId: process.env.AWS_ACCESS_KEY_ID,
        secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY
    }
});

async function run() {
    try {
        console.log("📂 Listing S3 Objects in 'albums/valentine-country/'...");
        const listCmd = new ListObjectsV2Command({
            Bucket: "singitpop-music",
            Prefix: "albums/valentine-country/"
        });
        const data = await client.send(listCmd);

        if (!data.Contents || data.Contents.length === 0) {
            console.log("❌ No files found in this folder!");
            return;
        }

        console.log(`✅ Found ${data.Contents.length} files.`);

        for (const item of data.Contents) {
            if (item.Key.endsWith(".mp3")) {
                console.log(`\n🔑 Key Found: "${item.Key}"`);

                const getCmd = new GetObjectCommand({
                    Bucket: "singitpop-music",
                    Key: item.Key
                });
                const signedUrl = await getSignedUrl(client, getCmd, { expiresIn: 3600 });
                console.log(`📝 Signed URL generated.`);

                // Fetch it (Get request to see body on failure)
                const res = await fetch(signedUrl);
                console.log(`📡 Fetch Status: ${res.status} ${res.statusText}`);

                if (res.status === 200) {
                    console.log("✅ SUCCESS: This file is playable.");
                    await res.arrayBuffer(); // Consume body
                } else {
                    const text = await res.text();
                    console.log("❌ FAILURE: Could not access file.");
                    console.log("   Error Body:", text);
                }
            }
        }

    } catch (e) {
        console.error("❌ Error:", e);
    }
}

run();
