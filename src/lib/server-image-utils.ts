import { getSignedFileUrl } from "./s3";
import { getAlbumCoverUrl } from "./image-utils";

/**
 * Server-only utility to get a signed album cover URL.
 * Works by first resolving the S3 path and then signing it.
 */
export async function getSignedAlbumCoverUrl(album: any): Promise<string> {
    const rawUrl = getAlbumCoverUrl(album);
    
    // If it's already a public image or already signed (has query params), return as is
    if (!rawUrl.includes("amazonaws.com") || rawUrl.includes("?X-Amz-Algorithm")) {
        return rawUrl;
    }

    try {
        // Extract key from the URL
        // Expecting: https://[bucket].s3.[region].amazonaws.com/[key]
        const url = new URL(rawUrl);
        const key = url.pathname.substring(1); // Remove leading slash
        
        // Sign for 7 days (maximum possible)
        const signedUrl = await getSignedFileUrl(key, 604800);
        return signedUrl || rawUrl;
    } catch (e) {
        console.error("[Server-Image-Utils] Failed to sign:", rawUrl, e);
        return rawUrl;
    }
}
