
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

        // Extract key from URL
        const urlObj = new URL(url);
        const key = decodeURIComponent(urlObj.pathname.slice(1));
        console.log("🔑 Derived Key:", key, "Download Mode:", download);

        const signedUrl = await getSignedFileUrl(key, 3600, download || false); // Pass download flag
        console.log("📝 Generated Signed URL:", signedUrl ? "Yes (Length: " + signedUrl.length + ")" : "NULL");


        return NextResponse.json({ signedUrl });

    } catch (error) {
        console.error("Signing Error:", error);
        return NextResponse.json({ error: 'Failed to sign URL' }, { status: 500 });
    }
}
