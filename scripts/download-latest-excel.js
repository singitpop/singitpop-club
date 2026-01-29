const { S3Client, ListObjectsV2Command, GetObjectCommand } = require("@aws-sdk/client-s3");
const fs = require('fs');
const path = require('path');
const { pipeline } = require('stream/promises');
require('dotenv').config({ path: '.env.local' });

const client = new S3Client({
    region: "eu-north-1",
    credentials: {
        accessKeyId: process.env.AWS_ACCESS_KEY_ID,
        secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY
    }
});

const TARGET_PATH = '/Users/garybirrell/Desktop/Singitpop/SingIt Pop Music Tracker 26-10-25.xlsx';
const BUCKET = "singitpop-music";
const PREFIX = "admin/";

async function main() {
    try {
        console.log(`🔍 Listing files in s3://${BUCKET}/${PREFIX}...`);

        const listCmd = new ListObjectsV2Command({
            Bucket: BUCKET,
            Prefix: PREFIX
        });

        const data = await client.send(listCmd);
        if (!data.Contents || data.Contents.length === 0) {
            console.error("❌ No files found in admin folder.");
            return;
        }

        // Filter for Excel files
        const excelFiles = data.Contents.filter(c => c.Key.endsWith('.xlsx'));

        if (excelFiles.length === 0) {
            console.error("❌ No Excel (.xlsx) files found in admin folder.");
            // List all files just in case
            console.log("Files found: ", data.Contents.map(c => c.Key));
            return;
        }

        // Sort by LastModified (descending)
        excelFiles.sort((a, b) => b.LastModified - a.LastModified);

        const latestFile = excelFiles[0];
        console.log(`✅ Found latest file: ${latestFile.Key} (${latestFile.LastModified})`);

        // Download
        console.log(`⬇️ Downloading to ${TARGET_PATH}...`);

        const getCmd = new GetObjectCommand({
            Bucket: BUCKET,
            Key: latestFile.Key
        });

        const { Body } = await client.send(getCmd);
        await pipeline(Body, fs.createWriteStream(TARGET_PATH));

        console.log("✅ Download complete.");

    } catch (e) {
        console.error("❌ Error:", e);
    }
}

main();
