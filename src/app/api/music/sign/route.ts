
import { NextRequest, NextResponse } from 'next/server';
import { generateSignedUrl } from '@/lib/s3';

export async function POST(req: NextRequest) {
    try {
        const body = await req.json();
        const { url, download } = body;

        if (!url) {
            return NextResponse.json({ error: 'URL is required' }, { status: 400 });
        }

        // Use generateSignedUrl which extracts bucket/key from full URL robustly
        // Pass download flag (default false for streaming)
        // Set expiry to 1 hour (3600s) for streaming/preview
        const signedUrl = await generateSignedUrl(url, 3600, download || false);

        return NextResponse.json({ signedUrl });

    } catch (error) {
        console.error("Signing Error:", error);
        return NextResponse.json({ error: 'Failed to sign URL' }, { status: 500 });
    }
}
