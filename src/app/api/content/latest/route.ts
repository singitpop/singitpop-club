import { NextResponse } from 'next/server';
import { albums } from '@/data/albumData';
import { s3Client } from '@/lib/s3';
import { GetObjectCommand } from '@aws-sdk/client-s3';

const BUCKET_NAME = process.env.AWS_S3_BUCKET || "singitpop-music";
const METADATA_KEY = "admin/albumMetadata.json";

// Helper to read metadata from S3
async function readMetadata() {
    try {
        const command = new GetObjectCommand({
            Bucket: BUCKET_NAME,
            Key: METADATA_KEY,
        });
        const response = await s3Client.send(command);
        if (response.Body) {
            const str = await response.Body.transformToString();
            return JSON.parse(str);
        }
    } catch (error) {
        console.warn('S3 Metadata read error (might not exist yet):', error);
    }
    return { latestSingleId: null };
}

/**
 * Public API endpoint for fetching latest content
 * Used by Hero and Music pages to display current latest single
 */
export async function GET() {
    try {
        const metadata = await readMetadata();

        // Get latest single from metadata
        const allSingles = albums
            .flatMap(a => a.tracks
                .filter(t => t.isSingle)
                .map(t => ({ ...t, albumId: a.id, uid: `${a.id}-${t.id}`, album: a }))
            );

        let latestSingle;
        if (metadata.latestSingleUid) {
            latestSingle = allSingles.find((s: any) => s.uid === metadata.latestSingleUid);
        } else if (metadata.latestSingleTitle) {
            latestSingle = allSingles.find((s: any) => s.title === metadata.latestSingleTitle);
        } else if (metadata.latestSingleId) {
            // Legacy fallback
            latestSingle = allSingles.find((s: any) => s.id === metadata.latestSingleId);
        }

        // Fallback to first single if nothing found
        if (!latestSingle && allSingles.length > 0) {
            latestSingle = allSingles[0];
        }

        return NextResponse.json({
            latestSingleUid: latestSingle?.uid || null,
            latestSingleTitle: latestSingle?.title || null,
            latestSingleAlbumId: latestSingle?.albumId || null,
            latestSingleCoverArt: latestSingle?.album?.coverArt || null,
            latestVideoId: metadata.latestVideoId || null
        });
    } catch (error: any) {
        console.error('Latest content API error:', error);
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}
