import { S3Client, GetObjectCommand, PutObjectCommand, ListObjectsV2Command } from "@aws-sdk/client-s3";
// @ts-ignore
import { getSignedUrl } from "@aws-sdk/s3-request-presigner";

export const s3Client = new S3Client({
    region: process.env.AWS_REGION || "eu-north-1",
    credentials: {
        accessKeyId: process.env.AWS_ACCESS_KEY_ID || "",
        secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY || "",
    },
});

export async function generateSignedUrl(s3Url: string, expiresInSeconds: number = 604800, isDownload: boolean = true): Promise<string> {
    try {
        console.log(`[S3] Signing URL: ${s3Url}`);

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

        console.log(`[S3] Parsed - Bucket: ${bucket}, Key: ${key}`);

        // Verify AWS credentials are set
        if (!process.env.AWS_ACCESS_KEY_ID || !process.env.AWS_SECRET_ACCESS_KEY) {
            throw new Error("AWS credentials not configured in environment variables");
        }

        // Sanitize filename for headers (replace spaces/special chars to prevent mobile download errors)
        const filename = key.split('/').pop() || "download.mp3";
        const safeFilename = filename.replace(/[^a-zA-Z0-9.-]/g, '_');

        const command = new GetObjectCommand({
            Bucket: bucket,
            Key: key,
            ResponseContentDisposition: isDownload ? `attachment; filename="${safeFilename}"` : undefined, // safer filename for mobile
        });

        // 604800 seconds = 7 days
        const signedUrl = await getSignedUrl(s3Client, command, { expiresIn: expiresInSeconds });
        console.log(`[S3] ✅ Successfully signed URL for: ${key}`);
        return signedUrl;

    } catch (err: any) {
        console.error(`[S3] ❌ SIGNING FAILED for ${s3Url}:`, err.message || err);
        // CRITICAL: Throw error instead of returning unsigned URL
        // Returning unsigned URL causes silent 403 errors
        throw new Error(`S3 signing failed: ${err.message || 'Unknown error'}`);
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

/**
 * Robustly find a track key in S3 when the direct path fails.
 * Searches within albums/{folderName}/ for a title match.
 */
export async function findTrackKey(folderName: string, trackTitle: string): Promise<string | null> {
    try {
        const bucketName = process.env.AWS_S3_BUCKET || "singitpop-music";
        const prefix = `albums/${folderName}/`;

        console.log(`[S3-Search] Searching for '${trackTitle}' in '${prefix}'`);

        const command = new ListObjectsV2Command({
            Bucket: bucketName,
            Prefix: prefix
        });

        const response = await s3Client.send(command) as any;
        const contents = (response.Contents || []) as any[];

        if (contents.length === 0) return null;

        const normalize = (s: string) => s.toLowerCase().replace(/[^a-z0-9]/g, '');
        const targetNorm = normalize(trackTitle);

        // Filter for audio files
        const audioFiles = contents.filter((item: any) => {
            const k = (item.Key || '').toLowerCase();
            return k.endsWith('.mp3') || k.endsWith('.wav');
        });

        // 1. Try exact (normalized) match
        const exactMatch = audioFiles.find((item: any) => {
            const filename = item.Key!.split('/').pop()!.replace(/\.(mp3|wav)$/i, '');
            return normalize(filename) === targetNorm;
        });

        if (exactMatch) return exactMatch.Key!;

        // 2. Try partial match (contains)
        const partialMatch = audioFiles.find((item: any) => {
            const filename = item.Key!.split('/').pop()!.replace(/\.(mp3|wav)$/i, '');
            return normalize(filename).includes(targetNorm) || targetNorm.includes(normalize(filename));
        });

        return partialMatch ? partialMatch.Key! : null;

    } catch (e) {
        console.error("[S3-Search] Error:", e);
        return null;
    }
}

export async function uploadFileToS3(fileBuffer: Buffer, fileName: string, contentType: string): Promise<string> {
    try {
        const bucketName = process.env.AWS_S3_BUCKET || "singitpop-music";
        // Organize uploads into a specific folder
        const key = `uploads/director/${Date.now()}_${fileName.replace(/[^a-zA-Z0-9.-]/g, '_')}`;

        const command = new PutObjectCommand({
            Bucket: bucketName,
            Key: key,
            Body: fileBuffer,
            ContentType: contentType,
            // ACL: 'public-read' // Optional: if you want them public. Better to keep private and use signed URLs or CloudFront.
        });

        await s3Client.send(command);

        // Return the s3 URL (which we can sign later)
        // Format: https://[bucket].s3.[region].amazonaws.com/[key]
        const region = process.env.AWS_REGION || "eu-north-1";
        return `https://${bucketName}.s3.${region}.amazonaws.com/${key}`;
    } catch (err) {
        console.error("Error uploading to S3:", err);
        throw new Error("S3 Upload Failed");
    }
}
