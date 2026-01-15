const { S3Client, PutBucketPolicyCommand, PutPublicAccessBlockCommand } = require("@aws-sdk/client-s3");
require('dotenv').config({ path: '.env.local' });

const S3_BUCKET = "singitpop-music";
const AWS_REGION = "eu-north-1";

const s3Client = new S3Client({
    region: AWS_REGION,
    credentials: {
        accessKeyId: process.env.AWS_ACCESS_KEY_ID,
        secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
    },
});

async function makeBucketPublic() {
    try {
        console.log(`🔓 Step 1: Disabling 'Block Public Access' for ${S3_BUCKET}...`);

        await s3Client.send(new PutPublicAccessBlockCommand({
            Bucket: S3_BUCKET,
            PublicAccessBlockConfiguration: {
                BlockPublicAcls: false,
                IgnorePublicAcls: false,
                BlockPublicPolicy: false,
                RestrictPublicBuckets: false
            }
        }));
        console.log("   ✅ Block Public Access disabled.");

        console.log(`\n📄 Step 2: Applying Public Read Policy to ${S3_BUCKET}/albums/*...`);
        const policy = {
            Version: "2012-10-17",
            Statement: [
                {
                    Sid: "PublicReadGetObject",
                    Effect: "Allow",
                    Principal: "*",
                    Action: "s3:GetObject",
                    Resource: `arn:aws:s3:::${S3_BUCKET}/albums/*`
                }
            ]
        };

        await s3Client.send(new PutBucketPolicyCommand({
            Bucket: S3_BUCKET,
            Policy: JSON.stringify(policy)
        }));
        console.log("   ✅ Bucket Policy applied successfully!");
        console.log("\n🚀 All files in 'albums/' should now be public and downloadable.");

    } catch (err) {
        console.error("❌ Error:", err.message);
        if (err.name === 'AccessDenied') {
            console.error("\n⚠️  You might not have permission to change Bucket Policies.");
            console.error("   Please go to AWS Console > S3 > Permissions and do this manually.");
        }
    }
}

makeBucketPublic();
