import { NextResponse } from 'next/server';

export const dynamic = 'force-dynamic';

import { getAlbums } from '@/lib/data';
import { getSignedFileUrl, findTrackKey } from '@/lib/s3';

export async function GET() {
    try {
        const albums = await getAlbums();

        const COUNTRY_WHITELIST = [
            "Southern Lights",
            "Winding Roads",
            "Last Ones Standing",
            "Live Nashville in June",
            "Through The Glass",
            "Boots and Beats Country Line Dance Anthems",
            "Whispers of the Heart Country Ballads for the Soul",
            "Forever Starts Today - Country Album",
            "Highways of the Heart",
            "Heartland Rhythms",
            "Dust and Diamonds ",
            "Line Dancing After Dark",
            "Wildcards and Whiskey",
            "October Boots and Fall Roots",
            "Snowfall and Steel Strings",
            "The Long Way Home",
            "Live at Autumn Lights Festival",
            "Live Step Into the Light",
            "Desert Winds And Open Roads",
            "Valentine Country"
        ];

        // Normalize helper: lowercase and strip extra spacing/non-alphanumeric
        const normalize = (s: string) => s.toLowerCase().replace(/[^a-z0-9]/g, '');
        const normalizedWhitelist = COUNTRY_WHITELIST.map(normalize);

        // Sign S3 URLs for cover art
        const signedAlbums = await Promise.all(albums.filter(a => {
            const title = a.title || "";
            return normalizedWhitelist.includes(normalize(title));
        }).map(async (album) => {
            try {
                let signedCover = album.coverArt;

                // Fix for inconsistent album art paths in data file
                if (album.coverArt && album.coverArt.startsWith('/images/')) {
                    signedCover = album.coverArt;
                } 
                else {
                    // Try to sign based on folderPath/ID
                    const folder = album.folderPath || album.id;
                    const filename = album.coverArt || 'cover.png';
                    const correctedKey = (album.coverArt && album.coverArt.includes('s3.eu-north-1.amazonaws.com'))
                        ? decodeURIComponent(new URL(album.coverArt).pathname.substring(1))
                        : `albums/${folder}/${filename}`;
                    
                    try {
                        signedCover = await getSignedFileUrl(correctedKey);
                    } catch (e) {
                        console.warn(`[API] Primary signature failed for ${album.title}: ${correctedKey}`);
                        signedCover = album.coverArt;
                    }
                } 

                // Sign S3 URLs for tracks
                // Sign S3 URLs for tracks
                const signedTracks = await Promise.all((album.tracks || []).map(async (track) => {
                    try {
                        let signedAudio = track.audioUrl;
                        if (track.audioUrl && track.audioUrl.includes('s3.eu-north-1.amazonaws.com')) {
                            const url = new URL(track.audioUrl);
                            const rawKey = decodeURIComponent(url.pathname.substring(1));
                            
                            // 1. Direct Guess (Resilient)
                            let directKey = rawKey;
                            if (album.folderPath) {
                                const filename = rawKey.split('/').pop();
                                directKey = `albums/${album.folderPath}/${filename}`;
                            }

                            try {
                                signedAudio = await getSignedFileUrl(directKey);
                            } catch (e) {
                                // 2. Robust Fallback: Search S3 properly
                                console.warn(`[Content API] Direct sign failed for ${track.title}, searching S3...`);
                                const foundKey = await findTrackKey(album.folderPath || album.id, track.title);
                                if (foundKey) {
                                    signedAudio = await getSignedFileUrl(foundKey);
                                } else {
                                    throw new Error(`File not found in S3: ${track.title}`);
                                }
                            }

                            if (!signedAudio || signedAudio.trim() === "") {
                                throw new Error("Could not resolve signed audio URL");
                            }
                        }

                        // STRICT COUNTRY FILTER: Remove Pop/Rock/Holiday from Track Titles only
                        // We allow "Singit Pop" as an album category, but skip individual non-country songs.
                        const title = track.title?.toLowerCase() || "";
                        const forbidden = ["christmas", "holiday", "noel", "mistletoe", "rock", "dance", "house", "techno", "electronic", "club", "remix"];
                        
                        // We only filter "pop" if it's in the track title (like "Pop Star"), not if it's just the album category.
                        if (title.includes("pop") || forbidden.some(word => title.includes(word))) {
                            console.log(`[Filtering] Skipping non-country match: ${track.title}`);
                            return null; 
                        }

                        return { ...track, audioUrl: signedAudio };
                    } catch (err: any) {
                        console.warn(`[Content API] Link Failure for ${track.title}:`, err.message);
                        return null; 
                    }
                })).then(results => results.filter((t): t is any => t !== null));

                return {
                    ...album,
                    coverArt: signedCover,
                    tracks: signedTracks
                };
            } catch (err) {
                console.error(`Failed to sign cover art for album ${album.id}:`, err);
                return album; // Return original album if signing fails
            }
        }));

        return NextResponse.json(signedAlbums);
    } catch (error) {
        console.error("Failed to fetch albums via API:", error);
        return NextResponse.json({ error: "Failed to fetch albums" }, { status: 500 });
    }
}
