import { NextRequest, NextResponse } from 'next/server';
import { albums, getLatestStudioAlbum, getLatestLiveAlbum, getVIPOnlyAlbums, getAllSingles } from '@/data/albumData';
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

// Helper to write metadata
function writeMetadata(metadata: any) {
    try {
        fs.writeFileSync(METADATA_PATH, JSON.stringify(metadata, null, 2), 'utf-8');
        return true;
    } catch (error) {
        console.error('Error writing metadata:', error);
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
            const latestLive = getLatestLiveAlbum();
            const metadata = readMetadata();
            const singles = getAllSingles();

            // Get latest single (manual override or first single)
            const latestSingle = metadata.latestSingleId
                ? singles.find(s => s.id === metadata.latestSingleId)
                : singles[0];

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
                    id: latestSingle.id,
                    title: latestSingle.title,
                    albumId: latestSingle.albumId
                } : null
            });
        }

        if (action === 'vip') {
            // Get VIP-only albums (future releases)
            const vipAlbums = getVIPOnlyAlbums();
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
                .map(a => {
                    const singleTrack = a.tracks.find(t => t.isSingle);
                    return {
                        id: singleTrack!.id,
                        title: singleTrack!.title,
                        albumId: a.id,
                        albumTitle: a.title,
                        releaseDate: a.releaseDate
                    };
                })
                .sort((a, b) => new Date(b.releaseDate).getTime() - new Date(a.releaseDate).getTime()); // Newest first

            const metadata = readMetadata();

            return NextResponse.json({
                singles: singlesWithDates,
                currentLatestSingleId: metadata.latestSingleId
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

        if (action === 'set_latest_single') {
            const { singleId } = data;

            // Update metadata with new latest single
            const metadata = readMetadata();
            metadata.latestSingleId = singleId;

            const success = writeMetadata(metadata);

            if (!success) {
                return NextResponse.json({ error: 'Failed to save metadata' }, { status: 500 });
            }

            return NextResponse.json({
                success: true,
                message: 'Latest single updated successfully'
            });
        }

        return NextResponse.json({ error: 'Invalid action' }, { status: 400 });
    } catch (error: any) {
        console.error('Content action error:', error);
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}
