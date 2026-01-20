const { S3Client, ListObjectsV2Command } = require("@aws-sdk/client-s3");
require('dotenv').config({ path: '.env.local' });

const client = new S3Client({
    region: "eu-north-1",
    credentials: {
        accessKeyId: process.env.AWS_ACCESS_KEY_ID,
        secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY
    }
});

async function list() {
    try {
        const cmd = new ListObjectsV2Command({
            Bucket: "singitpop-music",
            Prefix: "albums/valentine-country"
        });
        const data = await client.send(cmd);
        if (data.Contents) {
            console.log("Files found:");
            data.Contents.forEach(c => console.log(c.Key));
        } else {
            console.log("No files found.");
        }
    } catch (e) {
        console.error(e);
    }
}
list();
