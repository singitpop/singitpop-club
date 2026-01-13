
import { NextRequest, NextResponse } from 'next/server';
import { getSignedFileUrl } from '@/lib/s3';

export async function POST(req: NextRequest) {
    try {
        const { url } = await req.json();

        if (!url) {
            return NextResponse.json({ error: 'URL is required' }, { status: 400 });
        }

        // Extract key from URL
        // Expected format: https://singitpop-music.s3.eu-north-1.amazonaws.com/albums/folder/file.wav
        // Key should be: albums/folder/file.wav

        const urlObj = new URL(url);
        // Pathname starts with /, so slice(1) to remove it
        // BUT wait, if key has spaces, they are %20 in URL. getKey should be decoded.
        const key = decodeURIComponent(urlObj.pathname.slice(1));

        const signedUrl = await getSignedFileUrl(key, 3600); // 1 hour expiry

        return NextResponse.json({ signedUrl });

    } catch (error) {
        console.error("Signing Error:", error);
        return NextResponse.json({ error: 'Failed to sign URL' }, { status: 500 });
    }
}
