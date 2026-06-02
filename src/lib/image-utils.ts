/**
 * Utility to correct image and audio paths for S3
 */

export const S3_BUCKET_URL = "https://singitpop-music.s3.eu-north-1.amazonaws.com";

/**
 * Converts a raw coverArt filename or relative path into a full S3 URL.
 * matches logic in licensing and album APIs.
 */
export function getAlbumCoverUrl(album: any): string {
    if (!album) return "/images/defaults/vinyl_default.png";
    
    // 1. If coverArt is a full URL (signed or public), return it
    if (album.coverArt && (album.coverArt.startsWith('http') || album.coverArt.startsWith('/'))) {
        return album.coverArt;
    }

    // 2. Resolve the slug for S3 folder path
    // Logic: album.folderPath -> first track's sourceFolder -> album.id -> album.title
    const rawFolder = album.folderPath || (album.tracks?.[0]?.sourceFolder) || album.id || album.title;
    const slug = rawFolder ? rawFolder.toLowerCase().replace(/[^a-z0-9- ]/g, '').replace(/ /g, '-') : '';
    
    if (!slug) return "/images/defaults/vinyl_default.png";
    
    // 3. Construct URL
    const filename = (album.coverArt && album.coverArt.includes('.')) ? album.coverArt : 'cover.png';
    return `${S3_BUCKET_URL}/albums/${slug}/${filename}`;
}

/**
 * Ensures a URL is absolute (prepending / if missing, but NOT bucket URL)
 */
export function ensureRelativePath(path: string): string {
    if (path.startsWith('http') || path.startsWith('/')) return path;
    return `/${path}`;
}
