const { S3Client, DeleteBucketPolicyCommand, PutPublicAccessBlockCommand } = require("@aws-sdk/client-s3");
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

async function makeBucketPrivate() {
    try {
        console.log(`🔒 Step 1: Removing Public Bucket Policy from ${S3_BUCKET}...`);
        await s3Client.send(new DeleteBucketPolicyCommand({
            Bucket: S3_BUCKET
        }));
        console.log("   ✅ Public Policy removed.");

        console.log(`\nWALL Step 2: Enabling 'Block Public Access'...`);
        await s3Client.send(new PutPublicAccessBlockCommand({
            Bucket: S3_BUCKET,
            PublicAccessBlockConfiguration: {
                BlockPublicAcls: true,
                IgnorePublicAcls: true,
                BlockPublicPolicy: true,
                RestrictPublicBuckets: true
            }
        }));
        console.log("   ✅ Block Public Access Enabled.");
        console.log("\n🔐 Bucket is now PRIVATE. Only Signed URLs will work.");

    } catch (err) {
        console.error("❌ Error:", err.message);
        if (err.name === 'AccessDenied') {
            console.error("\n⚠️  Manual Action Required:");
            console.error("   1. Go to AWS S3 > Permissions");
            console.error("   2. Delete the Bucket Policy");
            console.error("   3. Check 'Block all public access'");
        }
    }
}

makeBucketPrivate();
