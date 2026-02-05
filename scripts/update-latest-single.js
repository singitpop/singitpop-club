const { S3Client, GetObjectCommand, PutObjectCommand } = require("@aws-sdk/client-s3");

const client = new S3Client({ region: "eu-north-1" });
const BUCKET = "singitpop-music";
const KEY = "admin/albumMetadata.json";

(async () => {
    try {
        // 1. Read current metadata
        console.log("📥 Reading current metadata...");
        const getCmd = new GetObjectCommand({ Bucket: BUCKET, Key: KEY });
        const getRes = await client.send(getCmd);
        const currentData = JSON.parse(await getRes.Body.transformToString());

        console.log("Current Latest Single UID:", currentData.latestSingleUid);

        // 2. Update to correct UID
        currentData.latestSingleUid = "a-love-that-never-ends-2026-3";

        // 3. Write back to S3
        console.log("📤 Updating metadata with new UID:", currentData.latestSingleUid);
        const putCmd = new PutObjectCommand({
            Bucket: BUCKET,
            Key: KEY,
            Body: JSON.stringify(currentData, null, 2),
            ContentType: "application/json"
        });
        await client.send(putCmd);

        console.log("✅ Metadata updated successfully!");
        console.log("New Latest Single UID:", currentData.latestSingleUid);
    } catch (e) {
        console.error("❌ Error:", e.message);
        process.exit(1);
    }
})();
