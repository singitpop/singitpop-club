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

async function allowPublicImages() {
    try {
        console.log(`🔓 Step 1: Adjusting Block Public Access to allow Policies...`);
        // We must disable "BlockPublicPolicy" so we can add the policy
        await s3Client.send(new PutPublicAccessBlockCommand({
            Bucket: S3_BUCKET,
            PublicAccessBlockConfiguration: {
                BlockPublicAcls: true, // Block ACLs
                IgnorePublicAcls: true,
                BlockPublicPolicy: false, // ALLOW Policies (important)
                RestrictPublicBuckets: false // ALLOW Public Buckets
            }
        }));
        console.log("   ✅ Block Public Access updated.");

        console.log(`\n📄 Step 2: Applying Policy for Public Images (JPG/PNG)...`);
        const policy = {
            Version: "2012-10-17",
            Statement: [
                {
                    Sid: "PublicReadImages",
                    Effect: "Allow",
                    Principal: "*",
                    Action: "s3:GetObject",
                    Resource: [
                        `arn:aws:s3:::${S3_BUCKET}/*.jpg`,
                        `arn:aws:s3:::${S3_BUCKET}/*.png`,
                        `arn:aws:s3:::${S3_BUCKET}/*.jpeg`,
                        `arn:aws:s3:::${S3_BUCKET}/*.webp`
                    ]
                }
            ]
        };

        await s3Client.send(new PutBucketPolicyCommand({
            Bucket: S3_BUCKET,
            Policy: JSON.stringify(policy)
        }));
        console.log("   ✅ Bucket Policy applied: Images are Public, Audio is Private.");

    } catch (err) {
        console.error("❌ Error:", err.message);
        if (err.name === 'AccessDenied') {
            console.error("\n⚠️  Manual Action Required:");
            console.error("   Please update the Bucket Policy manually to allow GetObject on *.jpg/*.png");
        }
    }
}

allowPublicImages();
