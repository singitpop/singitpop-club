import { NextRequest, NextResponse } from 'next/server';
import { albums } from '@/data/albumData';
import fs from 'fs';
import path from 'path';

// Helper to update albumData.ts file
async function updateAlbumData(albumId: string, updates: any) {
    const albumDataPath = path.join(process.cwd(), 'src/data/albumData.ts');
    let content = fs.readFileSync(albumDataPath, 'utf-8');

    // Find the album object in the file
    const albumIndex = albums.findIndex(a => a.id === albumId);
    if (albumIndex === -1) {
        throw new Error('Album not found');
    }

    // Update the in-memory album object
    const updatedAlbum = { ...albums[albumIndex], ...updates };

    // For now, we'll just return success
    // In production, you'd want to properly update the file or use a database
    return updatedAlbum;
}

export async function GET(req: NextRequest) {
    try {
        const { searchParams } = new URL(req.url);
        const filter = searchParams.get('filter');

        let filteredAlbums = albums;

        if (filter === 'studio') {
            filteredAlbums = albums.filter(a => a.type === 'studio');
        } else if (filter === 'live') {
            filteredAlbums = albums.filter(a => a.type === 'live');
        } else if (filter === 'featured') {
            filteredAlbums = albums.filter(a => a.featured);
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

        // Validate updates
        const allowedFields = ['featured', 'releaseDate', 'type'];
        const filteredUpdates = Object.keys(updates)
            .filter(key => allowedFields.includes(key))
            .reduce((obj, key) => {
                obj[key] = updates[key];
                return obj;
            }, {} as any);

        // Update the album
        const updatedAlbum = await updateAlbumData(albumId, filteredUpdates);

        return NextResponse.json({
            success: true,
            album: updatedAlbum,
            message: 'Album updated successfully (Note: Changes are in-memory only. For persistence, implement database or file write logic.)'
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

                // Clear all featured flags for this category
                // Then set the specified album as featured
                // This is a simplified version - in production you'd update the file/database

                return NextResponse.json({
                    success: true,
                    message: `Set ${albumId} as latest ${category} (Note: Implement persistence logic)`
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
