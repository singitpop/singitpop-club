const path = require('path');
require('dotenv').config({ path: path.join(__dirname, '../.env.local') });
const { S3Client, GetObjectCommand } = require('@aws-sdk/client-s3');

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
    try {
        const res = await client.send(new GetObjectCommand({
            Bucket: 'singitpop-music',
            Key: key
        }));
        console.log('✅ Access granted! Status:', res.$metadata.httpStatusCode);

        const { getSignedUrl } = require('@aws-sdk/s3-request-presigner');
        const signedUrl = await getSignedUrl(client, new GetObjectCommand({ Bucket: 'singitpop-music', Key: key }), { expiresIn: 3600 });
        console.log(`Signed URL: ${signedUrl}`);
        
        const https = require('https');
        https.get(signedUrl, (res) => {
            console.log('Signed URL test Status:', res.statusCode);
        });
    } catch (e) {
        console.error('❌ Access denied:', e.message);
        console.error('Full error:', e);
    }
}
test();
