import { S3Client, GetObjectCommand } from "@aws-sdk/client-s3";
import { getSignedUrl } from "@aws-sdk/s3-request-presigner";

const s3Client = new S3Client({
    region: process.env.AWS_REGION || "eu-north-1",
    credentials: {
        accessKeyId: process.env.AWS_ACCESS_KEY_ID || "",
        secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY || "",
    },
});

export async function generateSignedUrl(s3Url: string, expiresInSeconds: number = 604800): Promise<string> {
    try {
        // Parse Bucket and Key from URL
        // Expected format: https://[bucket].s3.[region].amazonaws.com/[key]
        // OR: https://s3.[region].amazonaws.com/[bucket]/[key]

        const url = new URL(s3Url);
        let bucket = "";
        let key = "";

        if (url.hostname.startsWith("s3.")) {
            // Path style: /bucket/key
            const parts = url.pathname.split('/').filter(Boolean);
            bucket = parts[0];
            key = parts.slice(1).join('/');
        } else {
            // Virtual-hosted style: bucket.s3.region.amazonaws.com
            bucket = url.hostname.split('.')[0];
            key = url.pathname.substring(1); // Remove leading slash
        }

        // Decode the key (it was likely encoded in the DB)
        key = decodeURIComponent(key);

        const command = new GetObjectCommand({
            Bucket: bucket,
            Key: key,
        });

        // 604800 seconds = 7 days
        const signedUrl = await getSignedUrl(s3Client, command, { expiresIn: expiresInSeconds });
        return signedUrl;

    } catch (err) {
        console.error("Error generating signed URL:", err);
        return s3Url; // Fallback to original URL if signing fails
    }
}

export async function getSignedFileUrl(key: string, expiresIn: number = 3600, isDownload: boolean = false): Promise<string> {
    try {
        const command = new GetObjectCommand({
            Bucket: process.env.AWS_S3_BUCKET || "singitpop-music",
            Key: key,
            ResponseContentDisposition: isDownload ? 'attachment' : undefined
        });

        const signedUrl = await getSignedUrl(s3Client, command, { expiresIn });
        return signedUrl;
    } catch (err) {
        console.error("Error generating signed file URL:", err);
        return "";
    }
}
