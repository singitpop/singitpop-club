import { NextResponse } from 'next/server';
import { getAlbums } from '@/lib/data';

export async function GET() {
    try {
        const albums = await getAlbums();
        return NextResponse.json(albums);
    } catch (error) {
        console.error("Failed to fetch albums via API:", error);
        return NextResponse.json({ error: "Failed to fetch albums" }, { status: 500 });
    }
}
