import { NextRequest, NextResponse } from 'next/server';
import { albums, getLatestStudioAlbum } from '@/data/albumData';
import fs from 'fs';
import path from 'path';

// Path to store admin overrides (only for Latest Single selection)
const METADATA_PATH = path.join(process.cwd(), 'src/data/albumMetadata.json');

// Helper to read metadata
function readMetadata() {
    try {
        if (fs.existsSync(METADATA_PATH)) {
            const data = fs.readFileSync(METADATA_PATH, 'utf-8');
            return JSON.parse(data);
        }
    } catch (error) {
        console.error('Error reading metadata:', error);
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

// Helper to write metadata
function writeMetadata(metadata: any) {
    try {
        fs.writeFileSync(METADATA_PATH, JSON.stringify(metadata, null, 2), 'utf-8');
        return true;
    } catch (error) {
        logToDebug('Error writing metadata: ' + error);
        return false;
    }
}

export async function GET(req: NextRequest) {
    try {
        const { searchParams } = new URL(req.url);
        const action = searchParams.get('action');

        if (action === 'latest') {
            // Get automatically selected latest albums
            const latestStudio = getLatestStudioAlbum();

            // Calculate latest live album inline
            const today = new Date();
            const liveAlbums = albums
                .filter(a => a.title.toLowerCase().includes('live') && new Date(a.releaseDate) <= today)
                .sort((a, b) => new Date(b.releaseDate).getTime() - new Date(a.releaseDate).getTime());
            const latestLive = liveAlbums[0];

            const metadata = readMetadata();

            // Get latest single from metadata or first single
            const allSingles = albums
                .flatMap(a => a.tracks
                    .filter(t => t.isSingle)
                    .map(t => ({ ...t, albumId: a.id, uid: `${a.id}-${t.id}` }))
                );

            let latestSingle;
            if (metadata.latestSingleUid) {
                latestSingle = allSingles.find((s: any) => s.uid === metadata.latestSingleUid);
                logToDebug(`🔍 Lookup UID [${metadata.latestSingleUid}]: ${latestSingle ? 'Found' : 'NOT FOUND'}`);

                if (!latestSingle) {
                    const available = allSingles.map((s: any) => s.uid);
                    logToDebug(`Available UIDs in search list: ${JSON.stringify(available)}`);
                }
            } else if (metadata.latestSingleId) {
                // Legacy fallback
                latestSingle = allSingles.find((s: any) => s.id === metadata.latestSingleId);
                logToDebug(`🔍 Lookup ID [${metadata.latestSingleId}]: ${latestSingle ? 'Found' : 'NOT FOUND'}`);
            }

            if (!latestSingle && allSingles.length > 0) {
                latestSingle = allSingles[0];
                logToDebug(`⚠️ Fallback to: ${latestSingle.title} (UID: ${latestSingle.uid})`);
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
                    albumId: (latestSingle as any).albumId
                } : null
            });
        }

        if (action === 'vip') {
            // Get VIP-only albums (future releases) - calculate inline
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
            // Get all singles for admin selection (current month only)
            const today = new Date();
            const currentYear = today.getFullYear();
            const currentMonth = today.getMonth();

            const singlesWithDates = albums
                .filter(a => {
                    const releaseDate = new Date(a.releaseDate);
                    return a.tracks.some(t => t.isSingle) &&
                        releaseDate.getFullYear() === currentYear &&
                        releaseDate.getMonth() === currentMonth;
                })
                .flatMap(a => {
                    // Get ALL singles from this album, not just the first one
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

            const metadata = readMetadata();

            return NextResponse.json({
                singles: singlesWithDates,
                currentLatestSingleId: metadata.latestSingleId,
                currentLatestSingleUid: metadata.latestSingleUid, // Return the precise UID
                currentLatestVideoId: metadata.latestVideoId
            });
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
            const { singleId, singleUid } = data;
            logToDebug(`💾 Saving Latest Single: ID=${singleId}, UID=${singleUid}`);

            // Update metadata with new latest single
            // Store UID or AlbumID + TrackID to be unique
            const metadata = readMetadata();
            metadata.latestSingleId = singleId;
            metadata.latestSingleUid = singleUid; // Store the unique ID

            const success = writeMetadata(metadata);

            if (!success) {
                return NextResponse.json({ error: 'Failed to save metadata' }, { status: 500 });
            }

            return NextResponse.json({
                success: true,
                message: 'Latest single updated successfully'
            });
        }

        if (action === 'set_latest_video') {
            const { videoId } = data;

            const metadata = readMetadata();
            metadata.latestVideoId = videoId;

            const success = writeMetadata(metadata);

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
