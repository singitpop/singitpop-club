const { S3Client, ListObjectsV2Command } = require("@aws-sdk/client-s3");
const client = new S3Client({ region: 'eu-north-1' });

async function run() {
  const command = new ListObjectsV2Command({
    Bucket: "singitpop-music",
    Prefix: "albums/dust-and-diamonds",
    MaxKeys: 10
  });

  try {
    const data = await client.send(command);
    console.log(data.Contents.map(c => c.Key));
  } catch (err) {
    console.error(err);
  }
}
run();
