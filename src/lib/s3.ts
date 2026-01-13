import { S3Client, GetObjectCommand } from "@aws-sdk/client-s3";
import { getSignedUrl } from "@aws-sdk/s3-request-presigner";

const S3_BUCKET = process.env.AWS_S3_BUCKET || "singitpop-music";
const AWS_REGION = "eu-north-1";

// Initialize S3 Client
// Ensure credentials are in .env.local
const s3Client = new S3Client({
    region: AWS_REGION,
    credentials: {
        accessKeyId: process.env.AWS_ACCESS_KEY_ID as string,
        secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY as string,
    },
});

/**
 * Generates a presigned URL for streaming/downloading a file
 * @param key The S3 key (path) of the file
 * @param expiresInSeconds Duration in seconds for URL validity (default: 3600 = 1 hour)
 * @param isDownload If true, sets Content-Disposition to attachment to force download
 */
export async function getSignedFileUrl(key: string, expiresInSeconds = 3600, isDownload = false): Promise<string> {
    try {
        const command = new GetObjectCommand({
            Bucket: S3_BUCKET,
            Key: key,
            ResponseContentDisposition: isDownload ? 'attachment' : undefined,
        });

        // Generate signed URL
        const url = await getSignedUrl(s3Client, command, { expiresIn: expiresInSeconds });
        return url;
    } catch (error) {
        console.error("Error generating signed URL for key:", key, error);
        return "";
    }
}

/**
 * Helper to construct the full S3 key for a song
 * @param albumSlug - clean folder name of the album
 * @param fileName - file name including extension
 */
export function getMusicKey(albumSlug: string, fileName: string): string {
    return `albums/${albumSlug}/${fileName}`;
}
