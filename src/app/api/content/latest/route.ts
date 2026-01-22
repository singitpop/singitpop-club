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

        // Find background image by matching video title to track name
        // Use track-specific folder: /images/tracks/{track-title-slug}/cover.jpg
        let backgroundCoverArt = latestSingle?.album?.coverArt || null;
        let latestSingleTrackCover = latestSingle?.album?.coverArt || null;

        if (metadata.latestVideoTitle) {
            // Try to find a track that matches the video title
            // This allows custom video titles like "Song Name - Official Music Video" to still find the right background
            const videoTitleLower = metadata.latestVideoTitle.toLowerCase();

            for (const album of albums) {
                const matchingTrack = album.tracks.find(t => {
                    const trackTitleLower = t.title.toLowerCase();
                    // Check if video title contains the track title
                    return videoTitleLower.includes(trackTitleLower) || trackTitleLower.includes(videoTitleLower);
                });

                if (matchingTrack) {
                    // Construct S3 URL for track cover image
                    // Only singles have cover images in S3
                    // Extract album folder from audioUrl (e.g. "https://.../albums/new-years-odyssey/...")
                    let albumSlug = album.id;
                    if (matchingTrack.audioUrl) {
                        const match = matchingTrack.audioUrl.match(/albums\/([^\/]+)\//);
                        if (match && match[1]) {
                            albumSlug = match[1];
                        }
                    }

                    const trackTitle = encodeURIComponent(matchingTrack.title);
                    backgroundCoverArt = `https://singitpop-music.s3.eu-north-1.amazonaws.com/albums/${albumSlug}/${trackTitle}/cover.png`;
                    break;
                }
            }
        }

        // Get latest single's track-specific cover art from S3
        if (latestSingle) {
            let albumSlug = latestSingle.albumId;
            if (latestSingle.audioUrl) {
                const match = latestSingle.audioUrl.match(/albums\/([^\/]+)\//);
                if (match && match[1]) {
                    albumSlug = match[1];
                }
            }

            const trackTitle = encodeURIComponent(latestSingle.title);
            latestSingleTrackCover = `https://singitpop-music.s3.eu-north-1.amazonaws.com/albums/${albumSlug}/${trackTitle}/cover.png`;
        }

        return NextResponse.json({
            latestSingleUid: latestSingle?.uid || null,
            latestSingleTitle: latestSingle?.title || null,
            latestSingleAlbumId: latestSingle?.albumId || null,
            latestSingleCoverArt: backgroundCoverArt,
            latestSingleTrackCover: latestSingleTrackCover,
            latestVideoId: metadata.latestVideoId || null,
            latestVideoTitle: metadata.latestVideoTitle || null
        });
    } catch (error: any) {
        console.error('Latest content API error:', error);
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}
