import { NextResponse } from 'next/server';
import { getAlbums } from '@/lib/data';
import { getSignedFileUrl } from '@/lib/s3';

export async function GET() {
    try {
        const albums = await getAlbums();

        // Sign S3 URLs for cover art
        const signedAlbums = await Promise.all(albums.map(async (album) => {
            try {
                let signedCover = album.coverArt;

                // Fix for inconsistent album art paths in data file
                // If it's a perfectly valid local path (starts with /images/), DO NOT attempt to sign it with AWS S3!
                if (album.coverArt && album.coverArt.startsWith('/images/')) {
                    signedCover = album.coverArt;
                } 
                else if (album.folderPath) {
                    const filename = album.coverArt || 'cover.png';
                    const sluggedFolder = album.folderPath.toLowerCase().replace(/[^a-z0-9- ]/g, '').replace(/ /g, '-');
                    const correctedKey = `albums/${sluggedFolder}/${filename}`;
                    signedCover = await getSignedFileUrl(correctedKey);
                } 
                else if (album.coverArt && !album.coverArt.startsWith('http')) {
                    const key = album.coverArt.startsWith('/') ? album.coverArt.substring(1) : album.coverArt;
                    signedCover = await getSignedFileUrl(key);
                } 
                else if (album.coverArt && album.coverArt.includes('s3.eu-north-1.amazonaws.com')) {
                    const url = new URL(album.coverArt);
                    const key = url.pathname.substring(1);
                    signedCover = await getSignedFileUrl(decodeURIComponent(key));
                }

                // Sign S3 URLs for tracks
                const signedTracks = await Promise.all((album.tracks || []).map(async (track) => {
                    try {
                        let signedAudio = track.audioUrl;
                        if (track.audioUrl && track.audioUrl.includes('s3.eu-north-1.amazonaws.com')) {
                            const url = new URL(track.audioUrl);
                            const key = url.pathname.substring(1);
                            signedAudio = await getSignedFileUrl(decodeURIComponent(key));
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
