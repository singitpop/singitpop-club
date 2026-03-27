import { albums } from "@/data/albumData";
import { getAlbumCoverUrl } from "@/lib/image-utils";

export const getArtworkForTrack = (trackTitle: string): string => {
    if (!trackTitle) return "/images/defaults/vinyl_default.png";

    const normalizedTitle = trackTitle.toLowerCase().trim();

    for (const album of albums) {
        for (const track of album.tracks) {
            if (track.title.toLowerCase().trim() === normalizedTitle) {
                // Use robust S3 resolution
                return getAlbumCoverUrl(album);
            }
        }
    }

    // specific hardcoded fallbacks if needed, or return a default generic ringtone image
    return "/images/defaults/vinyl_default.png"; // Fallback
};
