const { getSignedUrl } = require('@aws-sdk/s3-request-presigner');
const { S3Client, GetObjectCommand } = require('@aws-sdk/client-s3');
const client = new S3Client({ region: 'eu-north-1' });

async function run() {
  const Bucket = 'singitpop-music';
  const Key = 'albums/dust-and-diamonds-/The Grind Keeps Turning.mp3';
  const command = new GetObjectCommand({ Bucket, Key });
  try {
     const url = await getSignedUrl(client, command, { expiresIn: 3600 });
     console.log('Signed URL:', url);
  } catch(e) { console.error(e); }
}
run();
