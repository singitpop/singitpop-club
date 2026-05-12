const path = require('path');
require('dotenv').config({ path: path.join(__dirname, '../.env.local') });
const { S3Client, PutObjectCommand } = require('@aws-sdk/client-s3');
const fs = require('fs');

const s3Client = new S3Client({
    region: 'eu-north-1',
    credentials: {
        accessKeyId: process.env.AWS_ACCESS_KEY_ID,
        secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
    },
});

const BUCKET_NAME = 'singitpop-music';
const FILE_PATH = path.join(__dirname, '../src/data/albums.json');

async function upload() {
    const content = fs.readFileSync(FILE_PATH, 'utf8');
    
    const targets = ['database/albums.json', 'data/albums.json'];
    
    for (const key of targets) {
        console.log(`Uploading to ${key}...`);
        await s3Client.send(new PutObjectCommand({
            Bucket: BUCKET_NAME,
            Key: key,
            Body: content,
            ContentType: 'application/json',
            ACL: 'private'
        }));
    }
    console.log('Upload complete.');
}

upload();
