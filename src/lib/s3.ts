import { S3Client, GetObjectCommand, PutObjectCommand, ListObjectsV2Command, HeadObjectCommand } from "@aws-sdk/client-s3";
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

        // CHECK IF OBJECT EXISTS BEFORE SIGNING
        try {
            await s3Client.send(new HeadObjectCommand({ Bucket: bucket, Key: key }));
        } catch (headErr: any) {
            console.warn(`[S3] Object does not exist or access denied: ${key}`);
            throw new Error(`Object missing in S3: ${key}`);
        }

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
        // IMPORTANT: Decode the key to handle %20 vs spaces mismatches
        const decodedKey = decodeURIComponent(key);
        
        const command = new GetObjectCommand({
            Bucket: process.env.AWS_S3_BUCKET || "singitpop-music",
            Key: decodedKey,
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

        // NEW: Resolve the actual folder prefix first (handles case-sensitivity and slight naming differences)
        const actualFolderPrefix = await findFolderPrefix(folderName);
        if (!actualFolderPrefix) {
            console.warn(`[S3-Search] ❌ Could not resolve folder prefix for: ${folderName}`);
            return null;
        }

        console.log(`[S3-Search] Searching for '${trackTitle}' in confirmed prefix '${actualFolderPrefix}'`);

        const command = new ListObjectsV2Command({
            Bucket: bucketName,
            Prefix: actualFolderPrefix
        });

        const response = await s3Client.send(command) as any;
        const contents = (response.Contents || []) as any[];

        if (contents.length === 0) {
            console.warn(`[S3-Search] ⚠️ Folder found but empty: ${actualFolderPrefix}`);
            return null;
        }

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

export async function findFolderPrefix(folderName: string): Promise<string | null> {
    try {
        const bucketName = process.env.AWS_S3_BUCKET || "singitpop-music";
        
        // Normalize: remove all non-alphanumeric, lowercase
        const normalize = (s: string) => s.toLowerCase().replace(/[^a-z0-9]/g, '');
        const targetNorm = normalize(folderName);

        const listFoldersCmd = new ListObjectsV2Command({
            Bucket: bucketName,
            Prefix: 'albums/',
            Delimiter: '/'
        });
        const foldersRes = await s3Client.send(listFoldersCmd) as any;
        const prefixes = foldersRes.CommonPrefixes || [];

        // 1. Try exact match first
        let match = prefixes.find((p: any) => normalize(p.Prefix.split('/')[1]) === targetNorm);

        // 2. Try partial match if no exact match (important for "Live Nashville in June" vs "Nashville in June")
        if (!match) {
            match = prefixes.find((p: any) => {
                const pNameNorm = normalize(p.Prefix.split('/')[1]);
                return pNameNorm.includes(targetNorm) || targetNorm.includes(pNameNorm);
            });
        }

        return match ? match.Prefix : null;
    } catch (e) {
        console.error("[S3-Folder-Search] Error:", e);
        return null;
    }
}

export async function findImageKey(folderName: string, trackTitle?: string, strictTrackMatch = false): Promise<string | null> {
    try {
        const bucketName = process.env.AWS_S3_BUCKET || "singitpop-music";
        const actualFolderPrefix = await findFolderPrefix(folderName);

        if (!actualFolderPrefix) {
             console.warn(`[S3-Image-Search] Could not resolve folder for: ${folderName}`);
             // If we can't find the folder, we can't find images inside it.
             // BUT, if it's a single, it might be in 'Singles/TrackName/'
             if (folderName.toLowerCase() !== 'singles') {
                 return findImageKey('Singles', trackTitle, true);
             }
             return null;
        }

        const command = new ListObjectsV2Command({
            Bucket: bucketName,
            Prefix: actualFolderPrefix,
        });

        const response = await s3Client.send(command) as any;
        const contents = response.Contents || [];
        // Helper: remove special chars, extra spaces, lowercase
        const normalize = (s: string) => s.toLowerCase().replace(/[^a-z0-9]+/g, ' ').trim();

        // 1. Try Specific Track Image (Nested logic)
        if (trackTitle) {
            const normalizedTrack = normalize(trackTitle);
            const trackWords = normalizedTrack.split(' ').filter(w => w.length > 2);

            const possibleImages = contents.filter((c: any) => {
                const key = c.Key || '';
                const lowerKey = key.toLowerCase();
                if (!lowerKey.startsWith(actualFolderPrefix.toLowerCase())) return false;

                const segments = lowerKey.split('/');
                const albumSegmentCount = actualFolderPrefix.split('/').filter(Boolean).length; 
                const searchSegments = segments.slice(albumSegmentCount); 

                // Fuzzy segment match
                const songFolderMatch = searchSegments.some((seg: string) => {
                    const normSeg = normalize(seg);
                    const segWords = normSeg.split(' ').filter(w => w.length > 2);
                    if (trackWords.length === 0 || segWords.length === 0) return normSeg.includes(normalizedTrack) || normalizedTrack.includes(normSeg);
                    
                    const intersection = trackWords.filter(w => segWords.includes(w));
                    return (intersection.length / Math.min(trackWords.length, segWords.length)) >= 0.7; // 70% match
                });
                
                const isImage = key.match(/\.(png|jpg|jpeg|webp)$/i);
                return songFolderMatch && isImage;
            });

            // Prioritize cover/front over other generic images
            const trackCover = possibleImages.find((c: any) => {
                const lowerKey = (c.Key || '').toLowerCase();
                return lowerKey.includes('cover') || lowerKey.includes('front');
            }) || possibleImages[0];

            if (trackCover) {
                console.log(`[FindImageKey] Found track-specific artwork: ${trackCover.Key}`);
                return trackCover.Key;
            }
        }

        if (strictTrackMatch && trackTitle) return null;

        // 2. Fallback: Album Cover (cover.png, front.jpg, etc)
        const albumSegmentCount = actualFolderPrefix.split('/').filter(Boolean).length;
        const albumCover = contents.find((c: any) => {
            const key = c.Key || '';
            const isRoot = key.split('/').filter(Boolean).length === albumSegmentCount + 1;
            const filename = key.split('/').pop()?.toLowerCase() || '';
            const isImage = filename.endsWith('.png') || filename.endsWith('.jpg') || filename.endsWith('.jpeg') || filename.endsWith('.webp');
            const isStandardName = filename.startsWith('cover.') || filename.startsWith('front.') || filename.startsWith('folder.');

            return isRoot && isImage && isStandardName;
        });

        if (albumCover) return albumCover.Key;

        // 3. Last Resort: Any image in Album Root
        const anyRootImage = contents.find((c: any) => {
            const key = c.Key || '';
            const albumSegmentCount = actualFolderPrefix.split('/').filter(Boolean).length;
            return key.match(/\.(png|jpg|jpeg|webp)$/i) && (key.split('/').length === albumSegmentCount + 1);
        });

        if (anyRootImage) return anyRootImage.Key;

    } catch (error) {
        console.warn('[S3-Image-Search] Error:', error);
    }
    return null;
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
        });

        await s3Client.send(command);

        const region = process.env.AWS_REGION || "eu-north-1";
        return `https://${bucketName}.s3.${region}.amazonaws.com/${key}`;
    } catch (err) {
        console.error("Error uploading to S3:", err);
        throw new Error("S3 Upload Failed");
    }
}
