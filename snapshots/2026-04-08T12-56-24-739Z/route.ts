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
        
        // 1. Normalize whitelist for resilient matching
        const normalize = (s: string) => s.toLowerCase().replace(/[^a-z0-9]/g, '');
        const normalizedWhitelist = (radioConfig.whitelist || []).map(normalize);

        // 2. Filter & Sign (The "Nashville Baseline" Engine)
        const filteredAlbums = albums.filter(a => {
            const title = a.title || "";
            return normalizedWhitelist.includes(normalize(title));
        });

        const signedAlbums = await Promise.all(filteredAlbums.map(async (album) => {
            try {
                // Sign Cover Art
                let signedCover = album.coverArt;
                if (album.coverArt && !album.coverArt.startsWith('/images/') && !album.coverArt.startsWith('http')) {
                    signedCover = await getSignedFileUrl(album.coverArt);
                }

                // Sign Tracks
                const signedTracks = await Promise.all((album.tracks || []).map(async (track) => {
                    try {
                        let signedAudio = track.audioUrl;
                        if (track.audioUrl && track.audioUrl.includes('s3.eu-north-1.amazonaws.com')) {
                            const url = new URL(track.audioUrl);
                            const key = decodeURIComponent(url.pathname.substring(1));
                            signedAudio = await getSignedFileUrl(key);
                        }
                        return { ...track, audioUrl: signedAudio };
                    } catch (e) {
                        return { ...track, audioUrl: "" }; // Set empty to trigger client-side skip
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
