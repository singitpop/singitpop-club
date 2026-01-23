import { NextResponse } from 'next/server';
import { getAlbums } from '@/lib/data';
import { getSignedFileUrl } from '@/lib/s3';

export async function GET() {
    try {
        const albums = await getAlbums();

        // Sign S3 URLs for cover art
        const signedAlbums = await Promise.all(albums.map(async (album) => {
            let signedCover = album.coverArt;
            if (album.coverArt && !album.coverArt.startsWith('http') && !album.coverArt.startsWith('/')) {
                // It's a key, sign it
                signedCover = await getSignedFileUrl(album.coverArt);
            } else if (album.coverArt && album.coverArt.includes('s3.eu-north-1.amazonaws.com')) {
                // It's a full S3 URL, extract key and sign
                try {
                    const url = new URL(album.coverArt);
                    const key = url.pathname.substring(1); // remove leading slash
                    signedCover = await getSignedFileUrl(decodeURIComponent(key));
                } catch (e) {
                    console.warn("Failed to parse S3 URL for signing:", album.coverArt);
                }
            }

            return {
                ...album,
                coverArt: signedCover
            };
        }));

        return NextResponse.json(signedAlbums);
    } catch (error) {
        console.error("Failed to fetch albums via API:", error);
        return NextResponse.json({ error: "Failed to fetch albums" }, { status: 500 });
    }
}
