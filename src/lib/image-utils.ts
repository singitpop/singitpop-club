/**
 * Utility to correct image and audio paths for S3
 */

export const S3_BUCKET_URL = "https://singitpop-music.s3.eu-north-1.amazonaws.com";

/**
 * Converts a raw coverArt filename or relative path into a full S3 URL.
 * matches logic in licensing and album APIs.
 */
export function getAlbumCoverUrl(album: { id?: string, folderPath?: string, coverArt?: string }): string {
    if (!album) return "/images/placeholders/album-default.jpg";
    
    const art = album.coverArt || "cover.png";
    
    // If already a full URL, return it
    if (art.startsWith('http')) return art;
    
    // If it starts with / but is basically a local public path
    if (art.startsWith('/') && !art.includes('amazonaws.com')) return art;

    // Use slugified folderPath or ID to build S3 path
    const folder = album.folderPath || album.id || "";
    const sluggedFolder = folder.toLowerCase().replace(/[^a-z0-9- ]/g, '').replace(/ /g, '-');
    
    if (!sluggedFolder) return "/images/placeholders/album-default.jpg";
    
    return `${S3_BUCKET_URL}/albums/${sluggedFolder}/cover.png`;
}

/**
 * Ensures a URL is absolute (prepending / if missing, but NOT bucket URL)
 */
export function ensureRelativePath(path: string): string {
    if (path.startsWith('http') || path.startsWith('/')) return path;
    return `/${path}`;
}
