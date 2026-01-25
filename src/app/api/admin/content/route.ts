import { NextRequest, NextResponse } from 'next/server';
import { getAlbums } from '@/lib/data';
import { PutObjectCommand, GetObjectCommand } from '@aws-sdk/client-s3';
import { s3Client } from '@/lib/s3'; // Use shared client

const BUCKET_NAME = process.env.AWS_S3_BUCKET || "singitpop-music";
const METADATA_KEY = "admin/albumMetadata.json";

// Helper to read metadata from S3
async function readMetadata() {
    try {
        const command = new GetObjectCommand({
            Bucket: BUCKET_NAME,
            Key: METADATA_KEY,
        });
        const response = await (s3Client as any).send(command);
        if (response.Body) {
            const str = await response.Body.transformToString();
            return JSON.parse(str);
        }
    } catch (error) {
        // Log warning but don't crash
    }
    return { latestSingleId: null };
}


// Use global variable for logging to avoid filesystem issues
const globalLogs = (global as any).debugLogs || [];
(global as any).debugLogs = globalLogs;

function logToDebug(message: string) {
    const timestamp = new Date().toISOString();
    const line = `[${timestamp}] ${message}`;
    console.log(message); // Retain terminal output
    globalLogs.push(line);
    // Keep only last 50 logs
    if (globalLogs.length > 50) globalLogs.shift();
}

// Helper to write metadata to S3
async function writeMetadata(metadata: any) {
    try {
        const command = new PutObjectCommand({
            Bucket: BUCKET_NAME,
            Key: METADATA_KEY,
            Body: JSON.stringify(metadata, null, 2),
            ContentType: "application/json",
            CacheControl: "no-cache" // Important for admin updates
        });
        await (s3Client as any).send(command);
        return true;
    } catch (error) {
        logToDebug('Error writing metadata to S3: ' + error);
        return false;
    }
}

export async function GET(req: NextRequest) {
    try {
        const { searchParams } = new URL(req.url);
        const action = searchParams.get('action');

        // Fetch Dynamic Albums
        const albums = await getAlbums();

        if (action === 'latest') {
            // Get automatically selected latest albums
            const studioAlbums = albums
                .filter(a => (a.type === 'studio' || a.type === 'standard') && new Date(a.releaseDate) <= new Date())
                .sort((a, b) => new Date(b.releaseDate).getTime() - new Date(a.releaseDate).getTime());
            const latestStudio = studioAlbums[0];

            // Calculate latest live album inline
            const today = new Date();
            const liveAlbums = albums
                .filter(a => {
                    const isLiveType = a.type?.toLowerCase() === 'live';
                    const titleHasLive = a.title.toLowerCase().includes('live');
                    const released = new Date(a.releaseDate) <= today;
                    return (isLiveType || titleHasLive) && released;
                })
                .sort((a, b) => new Date(b.releaseDate).getTime() - new Date(a.releaseDate).getTime());
            const latestLive = liveAlbums[0];

            const metadata = await readMetadata();

            // Get latest single from metadata or first single
            const allSingles = albums
                .flatMap(a => a.tracks
                    .filter(t => t.isSingle)
                    .map(t => ({ ...t, albumId: a.id, uid: `${a.id}-${t.id}` }))
                );

            let latestSingle;
            if (metadata.latestSingleUid) {
                latestSingle = allSingles.find((s: any) => s.uid === metadata.latestSingleUid);

                if (!latestSingle && metadata.latestSingleTitle) {
                    latestSingle = allSingles.find((s: any) => s.title === metadata.latestSingleTitle);
                }
            } else if (metadata.latestSingleId) {
                // Legacy fallback
                latestSingle = allSingles.find((s: any) => s.id === metadata.latestSingleId);
            }

            if (!latestSingle && allSingles.length > 0) {
                latestSingle = allSingles[0];
            }

            return NextResponse.json({
                latestStudio: latestStudio ? {
                    id: latestStudio.id,
                    title: latestStudio.title,
                    releaseDate: latestStudio.releaseDate
                } : null,
                latestLive: latestLive ? {
                    id: latestLive.id,
                    title: latestLive.title,
                    releaseDate: latestLive.releaseDate
                } : null,
                latestSingle: latestSingle ? {
                    id: (latestSingle as any).id,
                    title: (latestSingle as any).title,
                    albumId: (latestSingle as any).albumId,
                    videoLink: metadata.latestVideoId ? `https://www.youtube.com/watch?v=${metadata.latestVideoId}` : undefined
                } : null,
                latestVideoId: metadata.latestVideoId
            });
        }

        if (action === 'vip') {
            // Get VIP-only albums (future releases)
            const today = new Date();
            const vipAlbums = albums.filter((a: any) => new Date(a.releaseDate) > today);
            return NextResponse.json(vipAlbums.map(a => ({
                id: a.id,
                title: a.title,
                releaseDate: a.releaseDate,
                type: a.type
            })));
        }

        if (action === 'singles') {
            // Get all singles for admin selection
            const singlesWithDates = albums
                .filter(a => a.tracks.some(t => t.isSingle))
                .flatMap(a => {
                    return a.tracks
                        .filter(t => t.isSingle)
                        .map(singleTrack => ({
                            id: singleTrack.id,
                            uid: `${a.id}-${singleTrack.id}`, // Unique ID for selection
                            title: singleTrack.title,
                            albumId: a.id,
                            albumTitle: a.title,
                            releaseDate: a.releaseDate
                        }));
                })
                .sort((a, b) => new Date(b.releaseDate).getTime() - new Date(a.releaseDate).getTime()); // Newest first

            // Filter: Show only last 2 months + all future releases
            const today = new Date();
            const twoMonthsAgo = new Date();
            twoMonthsAgo.setMonth(twoMonthsAgo.getMonth() - 2);

            const filteredSingles = singlesWithDates.filter(single => {
                const releaseDate = new Date(single.releaseDate);
                // Include if: future release OR within last 2 months
                return releaseDate > today || releaseDate >= twoMonthsAgo;
            });

            const metadata = await readMetadata();

            return NextResponse.json({
                singles: filteredSingles,
                currentLatestSingleId: metadata.latestSingleId,
                currentLatestSingleUid: metadata.latestSingleUid, // Return the precise UID
                currentLatestVideoId: metadata.latestVideoId,
                currentLatestVideoTitle: metadata.latestVideoTitle,
                currentLatestVideoAlbum: metadata.latestVideoAlbum // NEW
            });
        }

        if (action === 'logs') {
            const logs = (global as any).debugLogs || [];
            return NextResponse.json({ logs: logs.slice().reverse() }); // Newest first
        }

        // Default: return all albums with computed metadata
        const today = new Date();
        const albumList = albums.map(album => {
            const releaseDate = new Date(album.releaseDate);
            const isVIPOnly = releaseDate > today;

            return {
                id: album.id,
                title: album.title,
                year: album.year,
                type: album.type || 'standard',
                releaseDate: album.releaseDate,
                trackCount: album.tracks.length,
                isVIPOnly,
                daysUntilRelease: isVIPOnly ? Math.ceil((releaseDate.getTime() - today.getTime()) / (1000 * 60 * 60 * 24)) : 0
            };
        });

        return NextResponse.json(albumList);
    } catch (error: any) {
        console.error('Content API error:', error);
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}

export async function POST(req: NextRequest) {
    try {
        const { action, data } = await req.json();

        if (action === 'logs') {
            const logs = (global as any).debugLogs || [];
            return NextResponse.json({ logs: logs.slice().reverse() }); // Newest first
        }

        if (action === 'set_latest_single') {
            const { singleId, singleUid, singleTitle } = data;
            logToDebug(`💾 Saving Latest Single: ID=${singleId}, UID=${singleUid}, Title=${singleTitle}`);

            const metadata = await readMetadata();
            metadata.latestSingleId = singleId;
            metadata.latestSingleUid = singleUid;
            metadata.latestSingleTitle = singleTitle;

            const success = await writeMetadata(metadata);

            if (!success) {
                return NextResponse.json({ error: 'Failed to save metadata' }, { status: 500 });
            }

            return NextResponse.json({
                success: true,
                message: 'Latest single updated successfully'
            });
        }

        if (action === 'set_latest_video') {
            const { videoId, videoTitle, videoAlbum } = data;

            const metadata = await readMetadata();
            metadata.latestVideoId = videoId;
            metadata.latestVideoTitle = videoTitle;
            // NEW: optional manual album override
            metadata.latestVideoAlbum = videoAlbum || "";

            const success = await writeMetadata(metadata);

            if (!success) {
                return NextResponse.json({ error: 'Failed to save metadata' }, { status: 500 });
            }

            return NextResponse.json({
                success: true,
                message: 'Latest video updated successfully'
            });
        }

        return NextResponse.json({ error: 'Invalid action' }, { status: 400 });
    } catch (error: any) {
        console.error('Content action error:', error);
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}
