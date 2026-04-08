import { NextResponse } from 'next/server';

export const dynamic = 'force-dynamic';

import { getAlbums } from '@/lib/data';
import { getSignedFileUrl, findTrackKey } from '@/lib/s3';

export async function GET() {
    try {
        const albums = await getAlbums();

        // Sign S3 URLs for cover art
        const signedAlbums = await Promise.all(albums.map(async (album) => {
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
                const signedTracks = await Promise.all((album.tracks || []).map(async (track) => {
                    try {
                        let signedAudio = track.audioUrl;
                        if (track.audioUrl && track.audioUrl.includes('s3.eu-north-1.amazonaws.com')) {
                            // Extract key from URL
                            const url = new URL(track.audioUrl);
                            const rawKey = decodeURIComponent(url.pathname.substring(1));
                            
                            // RESILIENCE: If the album has a folderPath, try to construct a cleaner key
                            let finalKey = rawKey;
                            if (album.folderPath) {
                                const filename = rawKey.split('/').pop();
                                finalKey = `albums/${album.folderPath}/${filename}`;
                            }

                            // Attempt direct sign first
                            try {
                                signedAudio = await getSignedFileUrl(finalKey);
                            } catch (e) {
                                console.warn(`[Content API] Direct sign failed for ${track.title}, attempting S3 search...`);
                                // FALLBACK: Use fuzzy search to find the actual track in S3
                                const foundKey = await findTrackKey(album.folderPath || album.id, track.title);
                                if (foundKey) {
                                    signedAudio = await getSignedFileUrl(foundKey);
                                    console.log(`[Content API] Found correct S3 key: ${foundKey}`);
                                }
                            }
                        }

                        // MANDATORY VALIDATION: If signedAudio is empty or invalid, fallback to search
                        if (!signedAudio || signedAudio.trim() === "") {
                            throw new Error("Invalid signed URL");
                        }

                    // STRICT COUNTRY FILTER: Remove unwanted genres that leaked into Country Signal
                    const title = track.title?.toLowerCase() || "";
                    const albumTitle = album.title?.toLowerCase() || "";
                    const forbidden = ["christmas", "holiday", "noel", "mistletoe", "pop", "rock", "dance", "house", "techno", "electronic", "club", "remix"];
                    
                    if (forbidden.some(word => title.includes(word) || albumTitle.includes(word))) {
                        return null; // Filter out from API response
                    }

                    return { ...track, audioUrl: signedAudio };
                } catch (err: any) {
                    console.warn(`[Content API] Track Link Failure for ${track.title}:`, err.message);
                    return null; // Skip entire track if link cannot be resolved
                }
            })).then(tracks => tracks.filter((t): t is any => t !== null)); // Remove filtered/null tracks

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
