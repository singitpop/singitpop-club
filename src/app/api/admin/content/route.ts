import { NextRequest, NextResponse } from 'next/server';
import { albums } from '@/data/albumData';
import fs from 'fs';
import path from 'path';

// Path to store album metadata overrides
const METADATA_PATH = path.join(process.cwd(), 'src/data/albumMetadata.json');

// Helper to read metadata overrides
function readMetadata() {
    try {
        if (fs.existsSync(METADATA_PATH)) {
            const data = fs.readFileSync(METADATA_PATH, 'utf-8');
            return JSON.parse(data);
        }
    } catch (error) {
        console.error('Error reading metadata:', error);
    }
    return {};
}

// Helper to write metadata overrides
function writeMetadata(metadata: any) {
    try {
        fs.writeFileSync(METADATA_PATH, JSON.stringify(metadata, null, 2), 'utf-8');
        return true;
    } catch (error) {
        console.error('Error writing metadata:', error);
        return false;
    }
}

// Helper to merge album data with metadata overrides
function getAlbumsWithMetadata() {
    const metadata = readMetadata();
    return albums.map(album => ({
        ...album,
        ...(metadata[album.id] || {})
    }));
}

export async function GET(req: NextRequest) {
    try {
        const { searchParams } = new URL(req.url);
        const filter = searchParams.get('filter');

        let filteredAlbums = getAlbumsWithMetadata();

        if (filter === 'studio') {
            filteredAlbums = filteredAlbums.filter(a => a.type === 'studio');
        } else if (filter === 'live') {
            filteredAlbums = filteredAlbums.filter(a => a.type === 'live');
        } else if (filter === 'featured') {
            filteredAlbums = filteredAlbums.filter(a => a.featured);
        }

        // Return simplified album data for admin table
        const albumList = filteredAlbums.map(album => ({
            id: album.id,
            title: album.title,
            year: album.year,
            type: album.type || 'standard',
            releaseDate: album.releaseDate,
            featured: album.featured || false,
            trackCount: album.tracks.length,
        }));

        return NextResponse.json(albumList);
    } catch (error: any) {
        console.error('Content API error:', error);
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}

export async function PUT(req: NextRequest) {
    try {
        const { albumId, updates } = await req.json();

        if (!albumId || !updates) {
            return NextResponse.json({ error: 'Missing albumId or updates' }, { status: 400 });
        }

        // Read current metadata
        const metadata = readMetadata();

        // Update metadata for this album
        metadata[albumId] = {
            ...(metadata[albumId] || {}),
            ...updates
        };

        // Write back to file
        const success = writeMetadata(metadata);

        if (!success) {
            return NextResponse.json({ error: 'Failed to save metadata' }, { status: 500 });
        }

        return NextResponse.json({
            success: true,
            message: 'Album metadata updated successfully'
        });
    } catch (error: any) {
        console.error('Content update error:', error);
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}

export async function POST(req: NextRequest) {
    try {
        const { action, data } = await req.json();

        switch (action) {
            case 'set_latest': {
                const { albumId, category } = data;

                // Read current metadata
                const metadata = readMetadata();

                // Clear featured flag for all albums of this type
                Object.keys(metadata).forEach(id => {
                    const album = albums.find(a => a.id === id);
                    if (album?.type === category) {
                        metadata[id] = {
                            ...(metadata[id] || {}),
                            featured: false
                        };
                    }
                });

                // Set the specified album as featured
                metadata[albumId] = {
                    ...(metadata[albumId] || {}),
                    featured: true
                };

                // Write back to file
                const success = writeMetadata(metadata);

                if (!success) {
                    return NextResponse.json({ error: 'Failed to save metadata' }, { status: 500 });
                }

                return NextResponse.json({
                    success: true,
                    message: `Set as latest ${category} album`
                });
            }

            case 'upload': {
                // Placeholder for music upload functionality
                return NextResponse.json({
                    success: false,
                    message: 'Upload functionality not yet implemented'
                });
            }

            case 'announce': {
                // Placeholder for announcement functionality
                return NextResponse.json({
                    success: false,
                    message: 'Announcement functionality not yet implemented'
                });
            }

            default:
                return NextResponse.json({ error: 'Invalid action' }, { status: 400 });
        }
    } catch (error: any) {
        console.error('Content action error:', error);
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}
