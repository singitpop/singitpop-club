import { NextResponse } from 'next/server';
import { getAlbums } from '@/lib/data';
import { getSignedFileUrl, findImageKey } from '@/lib/s3';
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

        const filteredAlbums = albums.filter(a => {
            // Show all studio/standard/live/mixtape albums (frontend handles release date gating)
            return (a.type === 'studio' || a.type === 'standard' || a.type === 'mixtape' || a.type === 'live');
        });

        // 2. Music Page Protocol: Sign all tracks (No filtering out singles)
        const signedAlbums = await Promise.all(filteredAlbums.map(async (album) => {
            try {
                // 1. Dynamic S3 Folder Lookup (User Requested Format)
                const folderName = album.folderPath || album.title;
                const dynamicKey = await findImageKey(folderName, undefined, false);
                let signedCover = album.coverArt; // Fallback to whatever is in JSON

                if (dynamicKey) {
                    signedCover = await getSignedFileUrl(dynamicKey, 3600);
                } else if (album.coverArt) {
                    // 2. Legacy signing fallback for hardcoded URLs
                    if (!album.coverArt.startsWith('/images/') && !album.coverArt.startsWith('http')) {
                        signedCover = await getSignedFileUrl(album.coverArt, 3600);
                    } else if (album.coverArt.includes('singitpop-music.s3') || album.coverArt.includes('s3.eu-north-1.amazonaws.com')) {
                        try {
                            const url = new URL(album.coverArt);
                            const key = decodeURIComponent(url.pathname.substring(1));
                            signedCover = await getSignedFileUrl(key, 3600);
                        } catch(e) {
                            // ignore URL parse errors
                        }
                    }
                }

                // Sign ALL Tracks (Robust Bucket Detection)
                const signedTracks = await Promise.all((album.tracks || []).map(async (track) => {
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
                        return { ...track, audioUrl: track.audioUrl }; // Fallback to raw URL
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
