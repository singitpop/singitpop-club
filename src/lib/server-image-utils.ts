import { getSignedFileUrl, findImageKey } from "./s3";

/**
 * Server-only utility to get a signed album cover URL.
 * Uses robust S3 searching to find the best matching image.
 */
export async function getSignedAlbumCoverUrl(album: any, track?: any): Promise<string> {
    const albumSlug = album.id || album.title || "";
    const trackTitle = track?.title;

    try {
        // 1. Find the best matching image key in S3
        // This handles fuzzy folder names (e.g. "Live Nashville" -> "nashville-in-june")
        const key = await findImageKey(albumSlug, trackTitle);
        
        if (!key) {
            console.warn(`[Server-Image-Utils] No image found in S3 for ${albumSlug}${trackTitle ? ` / ${trackTitle}` : ""}`);
            // Fallback to default if everything fails
            return "/images/defaults/vinyl_default.png";
        }

        // 2. Sign the URL for 7 days
        const signedUrl = await getSignedFileUrl(key, 604800);
        return signedUrl;

    } catch (e) {
        console.error("[Server-Image-Utils] Failed to resolve/sign:", albumSlug, e);
        return "/images/defaults/vinyl_default.png";
    }
}
