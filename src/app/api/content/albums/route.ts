import { NextResponse } from 'next/server';
import { getAlbums } from '@/lib/data';
import { getSignedFileUrl } from '@/lib/s3';

export const dynamic = 'force-dynamic';

export async function GET() {
    try {
        const albums = await getAlbums();

        // Sign S3 URLs for cover art
        const signedAlbums = await Promise.all(albums.map(async (album) => {
            let signedCover = album.coverArt;

            // Fix for inconsistent album art paths in data file
            // Data file points to /albums/artwork/ but files are actually in albums/{folderPath}/cover.png
            if (album.folderPath) {
                const filename = album.coverImageName || 'cover.png';
                const correctedKey = `albums/${album.folderPath}/${filename}`;
                signedCover = await getSignedFileUrl(correctedKey);
            } else if (album.coverArt && !album.coverArt.startsWith('http')) {
                // ... legacy/fallback logic ...
                // Strip leading slash if present for S3 key
                const key = album.coverArt.startsWith('/') ? album.coverArt.substring(1) : album.coverArt;

                if (key.includes('s3.eu-north-1.amazonaws.com')) {
                    // It's a full S3 URL but without http (unlikely, but safe to handle)
                    try {
                        const url = new URL(key.startsWith('http') ? key : `https://${key}`);
                        const s3Key = url.pathname.substring(1);
                        signedCover = await getSignedFileUrl(decodeURIComponent(s3Key));
                    } catch (e) {
                        signedCover = await getSignedFileUrl(key);
                    }
                } else {
                    // It's a direct key
                    signedCover = await getSignedFileUrl(key);
                }
            } else if (album.coverArt && album.coverArt.includes('s3.eu-north-1.amazonaws.com')) {
                // It's a full http S3 URL
                try {
                    const url = new URL(album.coverArt);
                    const key = url.pathname.substring(1);
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
