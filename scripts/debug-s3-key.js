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
    const key = 'albums/Boots and Beats Country Line Dance Anthems/jukebox jumping/Jukebox Jumping.mp3';
    console.log(`Testing key: "${key}"`);
    try {
        const res = await client.send(new GetObjectCommand({ Bucket: 'singitpop-music', Key: key }));
        console.log('Success! Status:', res.$metadata.httpStatusCode);
    } catch (e) {
        console.log('Error:', e.message);
        console.log('Requested Key:', key);
        // Try without spaces?
        const key2 = key.replace(/ /g, '%20');
        console.log(`Testing key2: "${key2}"`);
        try {
            const res2 = await client.send(new GetObjectCommand({ Bucket: 'singitpop-music', Key: key2 }));
            console.log('Success with encoded key! Status:', res2.$metadata.httpStatusCode);
        } catch (e2) {
            console.log('Error with encoded key:', e2.message);
        }
    }
}
test();
