import { albums } from "@/data/albumData";

export const getArtworkForTrack = (trackTitle: string): string => {
    if (!trackTitle) return "/images/defaults/vinyl_default.png";

    const normalizedTitle = trackTitle.toLowerCase().trim();

    for (const album of albums) {
        for (const track of album.tracks) {
            if (track.title.toLowerCase().trim() === normalizedTitle) {
                // Return album cover if found
                return album.coverArt;
            }
        }
    }

    // specific hardcoded fallbacks if needed, or return a default generic ringtone image
    return "/images/defaults/vinyl_default.png"; // Fallback
};
