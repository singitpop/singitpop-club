
import { NextRequest, NextResponse } from 'next/server';
import { generateSignedUrl, findTrackKey, getSignedFileUrl } from '@/lib/s3';

export async function POST(req: NextRequest) {
    try {
        const body = await req.json();
        const { url, download, title, albumId } = body;

        // 1. Try direct signing if URL is present
        if (url) {
            try {
                const signedUrl = await generateSignedUrl(url, 3600, download || false);
                return NextResponse.json({ signedUrl });
            } catch (err) {
                console.warn(`[Sign-API] Direct signing failed for ${url}, trying fallback...`);
            }
        }

        // 2. Fallback: Search S3 dynamically if title and albumId are provided
        if (title && albumId) {
            const { sourceFolder } = body;
            const derivedFolderName = albumId.replace(/-20\d\d$/, '');
            
            // Try sourceFolder first, then derived
            const folderToSearch = sourceFolder || derivedFolderName;

            console.log(`[Sign-API] 🔍 Attempting fallback search for: "${title}" in folder: "${folderToSearch}"`);
            const foundKey = await findTrackKey(folderToSearch, title);

            if (foundKey) {
                console.log(`[Sign-API] ✅ Found fallback key in S3: ${foundKey}`);
                const signedUrl = await getSignedFileUrl(foundKey, 3600, download || false);
                return NextResponse.json({ signedUrl, fallback: true });
            } else if (sourceFolder && folderToSearch !== derivedFolderName) {
                // Secondary fallback attempt if sourceFolder failed
                console.log(`[Sign-API] 🔍 Primary search failed, trying derived name: "${derivedFolderName}"`);
                const secondKey = await findTrackKey(derivedFolderName, title);
                if (secondKey) {
                    const signedUrl = await getSignedFileUrl(secondKey, 3600, download || false);
                    return NextResponse.json({ signedUrl, fallback: true });
                }
            }
        }

        if (!url) {
            return NextResponse.json({ error: 'URL or search metadata is required' }, { status: 400 });
        }

        return NextResponse.json({ error: 'Failed to sign track' }, { status: 404 });

    } catch (error) {
        console.error("Signing Error:", error);
        return NextResponse.json({ error: 'Failed to sign URL' }, { status: 500 });
    }
}
