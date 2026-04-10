
const { S3Client, ListObjectsV2Command } = require("@aws-sdk/client-s3");

const s3Client = new S3Client({
    region: "eu-north-1",
    credentials: {
        accessKeyId: process.env.AWS_ACCESS_KEY_ID,
        secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
    },
});

async function listFolders() {
    try {
        const command = new ListObjectsV2Command({
            Bucket: "singitpop-music",
            Prefix: "albums/",
            Delimiter: "/"
        });
        const response = await s3Client.send(command);
        console.log("Folders found in S3 (albums/):");
        response.CommonPrefixes?.forEach(p => console.log(` - ${p.Prefix}`));
    } catch (e) {
        console.error("Error listing folders:", e);
    }
}

listFolders();
