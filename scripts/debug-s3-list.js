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
            Prefix: "albums/boots-in-the-autumn-dust/"
        });
        const data = await client.send(cmd);
        if (data.CommonPrefixes) {
            console.log("Folders found:");
            data.CommonPrefixes.forEach(c => console.log(c.Prefix));
        } else {
            console.log("No folders found.");
        }
    } catch (e) {
        console.error(e);
    }
}
list();
