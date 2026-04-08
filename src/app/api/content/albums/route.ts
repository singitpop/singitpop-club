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
                            signedAudio = await getSignedFileUrl(finalKey);

                            // AUTO-RECOVERY: If it's a Country album (Radio priority), or if direct sign fails, 
                            // we could do a search, but for now we'll just ensure the key is the most likely candidate.
                            // To perfectly fix 403s, we really need to check if the file exists OR have a perfect map.
                        }
                        return { ...track, audioUrl: signedAudio };
                    } catch (err) {
                        return track;
                    }
                }));

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
