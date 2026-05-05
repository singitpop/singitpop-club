const { S3Client, ListObjectsV2Command } = require("@aws-sdk/client-s3");
require('dotenv').config({ path: '.env.local' });
const fs = require('fs');
const path = require('path');

const s3Client = new S3Client({
    region: process.env.AWS_REGION || "eu-north-1",
    credentials: {
        accessKeyId: process.env.AWS_ACCESS_KEY_ID || "",
        secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY || "",
    },
});

async function auditS3Folders() {
    const bucketName = process.env.AWS_S3_BUCKET || "singitpop-music";
    const albumsPath = path.join(process.cwd(), 'src/data/albums.json');
    const albums = JSON.parse(fs.readFileSync(albumsPath, 'utf8'));

    const command = new ListObjectsV2Command({
        Bucket: bucketName,
        Prefix: 'albums/',
        Delimiter: '/'
    });

    const response = await s3Client.send(command);
    const prefixes = (response.CommonPrefixes || []).map(p => p.Prefix.split('/')[1]);

    const normalize = (s) => s.toLowerCase().replace(/[^a-z0-9]/g, '');

    console.log('--- Album Folder Alignment Check ---');
    albums.forEach(album => {
        const folderName = album.folderPath || album.title;
        const targetNorm = normalize(folderName);
        const match = prefixes.find(p => normalize(p) === targetNorm);

        if (!match) {
            console.log(`❌ NO MATCH: ${folderName} (${album.id})`);
        } else if (match !== folderName) {
            console.log(`⚠️ MISMATCH: ${album.id}
   JSON: "${folderName}"
   S3:   "${match}"`);
        }
    });
}

auditS3Folders().catch(console.error);
