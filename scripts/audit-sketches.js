
const { S3Client, ListObjectsV2Command, HeadObjectCommand } = require("@aws-sdk/client-s3");
require('dotenv').config({ path: '.env.local' });

const s3Client = new S3Client({
    region: process.env.AWS_REGION || "eu-north-1",
    credentials: {
        accessKeyId: process.env.AWS_ACCESS_KEY_ID,
        secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
    },
});

const BUCKET = "singitpop-music";

async function run() {
    console.log("🔍 Auditing Artbook Sketches for duplicates...");
    
    const listCommand = new ListObjectsV2Command({
        Bucket: BUCKET,
        Prefix: "artbooks/"
    });

    const response = await s3Client.send(listCommand);
    const folders = new Set();
    
    response.Contents.forEach(obj => {
        const parts = obj.Key.split('/');
        if (parts.length > 2) folders.add(parts[1]);
    });

    const results = [];

    for (const folder of folders) {
        try {
            const mainHead = await s3Client.send(new HeadObjectCommand({ Bucket: BUCKET, Key: `artbooks/${folder}/main.png` }));
            const sketchHead = await s3Client.send(new HeadObjectCommand({ Bucket: BUCKET, Key: `artbooks/${folder}/sketch.png` }));

            if (mainHead.ContentLength === sketchHead.ContentLength) {
                results.push({ folder, status: "DUPLICATE", size: mainHead.ContentLength });
            } else {
                results.push({ folder, status: "OK" });
            }
        } catch (e) {
            results.push({ folder, status: "MISSING", error: e.message });
        }
    }

    console.table(results);
    const duplicates = results.filter(r => r.status === "DUPLICATE");
    console.log(`\nFound ${duplicates.length} folders with duplicate sketches.`);
    console.log(JSON.stringify(duplicates, null, 2));
}

run();
