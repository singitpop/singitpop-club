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
                if (album.folderPath) {
                    const filename = album.coverImageName || 'cover.png';
                    const sluggedFolder = album.folderPath.toLowerCase().replace(/[^a-z0-9- ]/g, '').replace(/ /g, '-');
                    const correctedKey = `albums/${sluggedFolder}/${filename}`;
                    signedCover = await getSignedFileUrl(correctedKey);
                } else if (album.coverArt && !album.coverArt.startsWith('http')) {
                    const key = album.coverArt.startsWith('/') ? album.coverArt.substring(1) : album.coverArt;
                    signedCover = await getSignedFileUrl(key);
                } else if (album.coverArt && album.coverArt.includes('s3.eu-north-1.amazonaws.com')) {
                    const url = new URL(album.coverArt);
                    const key = url.pathname.substring(1);
                    signedCover = await getSignedFileUrl(decodeURIComponent(key));
                }

                return {
                    ...album,
                    coverArt: signedCover
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
