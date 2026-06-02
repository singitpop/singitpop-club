import { Track } from '@/data/albumData';

/**
 * Generates a unique ID for a track by combining album ID and track ID.
 * If album ID is missing, just returns the track ID as a string.
 */
export const getUniqueId = (track: Track): string => {
    return track.albumId ? `${track.albumId}-${track.id}` : String(track.id);
};
