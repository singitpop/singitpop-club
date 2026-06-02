import { NextRequest, NextResponse } from 'next/server';
import { generateSignedUrl } from '@/lib/s3';

export async function GET(req: NextRequest) {
    const { searchParams } = new URL(req.url);
    const audioUrl = searchParams.get('url');

    if (!audioUrl) {
        return new NextResponse("Missing url parameter", { status: 400 });
    }

    try {
        // Sign the URL to allow server-side access to private S3 objects
        const signedUrl = await generateSignedUrl(audioUrl);
        const response = await fetch(signedUrl);

        if (!response.ok) {
            return new NextResponse(`Failed to fetch audio: ${response.statusText}`, { status: response.status });
        }

        const blob = await response.blob();
        const buffer = await blob.arrayBuffer();

        return new NextResponse(buffer, {
            status: 200,
            headers: {
                'Content-Type': response.headers.get('Content-Type') || 'audio/mpeg',
                'Content-Length': response.headers.get('Content-Length') || String(buffer.byteLength),
                'Access-Control-Allow-Origin': '*',
                'Cache-Control': 'public, max-age=31536000, immutable',
            },
        });
    } catch (error) {
        console.error("Audio Proxy Error:", error);
        return new NextResponse("Internal Server Error", { status: 500 });
    }
}
