
import { NextRequest, NextResponse } from 'next/server';
import { getSignedFileUrl } from '@/lib/s3';

export async function POST(req: NextRequest) {
    try {
        const body = await req.json();
        console.log("📝 Signing Request Body:", body);
        const { url, download } = body;

        if (!url) {
            return NextResponse.json({ error: 'URL is required' }, { status: 400 });
        }

        console.log("📝 Signing Request for URL:", url);

        // Extract key from URL
        const urlObj = new URL(url);
        let key = "";

        if (urlObj.hostname.startsWith("s3.") || urlObj.hostname.includes(".s3.")) {
            // Virtual-hosted style: bucket.s3.region.amazonaws.com OR s3.region.amazonaws.com/bucket
            if (urlObj.pathname.startsWith('/')) {
                key = urlObj.pathname.substring(1);
            } else {
                key = urlObj.pathname;
            }
        } else {
            // Basic path assumption if not standard S3 URL (fallback)
            key = decodeURIComponent(urlObj.pathname.slice(1));
        }

        // Handle the specific decoding carefully - sometimes it's double encoded or has spaces
        const decodedKey = decodeURIComponent(key);

        // We use the decoded key for signing usually, as S3 expects the actual key name
        const signedUrl = await getSignedFileUrl(decodedKey, 3600, download || false);

        return NextResponse.json({ signedUrl });

    } catch (error) {
        console.error("Signing Error:", error);
        return NextResponse.json({ error: 'Failed to sign URL' }, { status: 500 });
    }
}
