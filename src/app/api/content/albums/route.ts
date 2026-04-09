import { NextResponse } from 'next/server';
import { getAlbums } from '@/lib/data';
import { getSignedFileUrl } from '@/lib/s3';
import radioConfig from '@/data/radio_config.json';

export const dynamic = 'force-dynamic';

/**
 * REBILD 7.0: NASHVILLE STABLE
 * Wiped legacy fuzzy search and redundant filtering.
 * Strictly uses the radio_config.json whitelist.
 */
export async function GET() {
    try {
        const albums = await getAlbums();
        
        // 1. Music Page Protocol: Filter by Genre (Country) and Released status
        const isReleased = (dateStr: string) => {
            if (!dateStr || dateStr === '0' || !dateStr.includes('-')) return false;
            const releaseDate = new Date(dateStr);
            const today = new Date();
            today.setHours(0, 0, 0, 0);
            return releaseDate <= today;
        };

        const whitelist = new Set(radioConfig.whitelist.map(t => t.trim().toLowerCase()));

        const filteredAlbums = albums.filter(a => {
            // Strictly enforce the whitelist by Title
            const titleMatch = a.title && whitelist.has(a.title.trim().toLowerCase());
            
            // Explicitly exclude any albums marked as a single-item collection or having 'isSingle' true
            const isActuallySingle = a.isSingle === true || a.title?.toLowerCase().includes('(single)');
            
            const hasReleased = isReleased(a.releaseDate);
            
            return titleMatch && !isActuallySingle && hasReleased;
        });

        // 2. Music Page Protocol: Filter out tracks that are marked as isSingle
        const signedAlbums = await Promise.all(filteredAlbums.map(async (album) => {
            try {
                // Sign Cover Art
                let signedCover = album.coverArt;
                if (album.coverArt && !album.coverArt.startsWith('/images/') && !album.coverArt.startsWith('http')) {
                    signedCover = await getSignedFileUrl(album.coverArt);
                }

                // Sign Tracks (Robust Bucket Detection)
                // Also FILTER OUT singles from whitelisted full albums as a safety double-layer
                const validTracks = (album.tracks || []).filter(t => !t.isSingle);
                const signedTracks = await Promise.all(validTracks.map(async (track) => {
                    try {
                        let signedAudio = track.audioUrl;
                        
                        // Resilient S3 Detection for both old and new buckets
                        if (track.audioUrl && (track.audioUrl.includes('s3.eu-north-1.amazonaws.com') || track.audioUrl.includes('singitpop-music.s3'))) {
                            const url = new URL(track.audioUrl);
                            // Strip bucket patterns to get the true Key
                            let key = decodeURIComponent(url.pathname.substring(1));
                            
                            signedAudio = await getSignedFileUrl(key);
                        }
                        return { ...track, audioUrl: signedAudio };
                    } catch (e) {
                        return { ...track, audioUrl: "" }; // Skip broken individual tracks
                    }
                }));

                return {
                    ...album,
                    coverArt: signedCover,
                    tracks: signedTracks
                };
            } catch (err) {
                console.error(`[Nashville-API] Failed to process album ${album.id}:`, err);
                return album;
            }
        }));

        return NextResponse.json(signedAlbums);
    } catch (error) {
        console.error("[Nashville-API] Critical Error:", error);
        return NextResponse.json({ error: "Failed to fetch station data" }, { status: 500 });
    }
}
