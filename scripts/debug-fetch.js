const path = require('path');
require('dotenv').config({ path: path.join(__dirname, '../.env.local') });
const { S3Client, GetObjectCommand } = require('@aws-sdk/client-s3');
const { getSignedUrl } = require('@aws-sdk/s3-request-presigner');

const client = new S3Client({
    region: 'eu-north-1',
    credentials: {
        accessKeyId: process.env.AWS_ACCESS_KEY_ID,
        secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
    }
});

async function test() {
    const key = 'albums/Forever Starts Today - Country Album/our forever starts today/Our Forever Starts Today.mp3';
    console.log(`Testing access to: ${key}`);
    const signedUrl = await getSignedUrl(client, new GetObjectCommand({ Bucket: 'singitpop-music', Key: key }), { expiresIn: 3600 });
    console.log(`Signed URL: ${signedUrl}`);
    
    const res = await fetch(signedUrl, { method: 'HEAD' });
    console.log('Fetch Status:', res.status);
    if (res.status === 403) {
        const text = await (await fetch(signedUrl)).text();
        console.log('Error Body:', text);
    }
}
test();
