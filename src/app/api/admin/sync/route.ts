
import { NextRequest, NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';

const LYRICS_DIR = path.join(process.cwd(), 'src', 'data', 'lyrics');

// Ensure directory exists
if (!fs.existsSync(LYRICS_DIR)) {
    fs.mkdirSync(LYRICS_DIR, { recursive: true });
}

export async function POST(req: NextRequest) {
    try {
        const { trackId, lyrics, scenes } = await req.json();

        if (!trackId || !lyrics) {
            return new NextResponse("Missing trackId or lyrics", { status: 400 });
        }

        const filePath = path.join(LYRICS_DIR, `${trackId}.json`);
        const data = {
            trackId,
            lastModified: new Date().toISOString(),
            lyrics,
            scenes: scenes || []
        };

        fs.writeFileSync(filePath, JSON.stringify(data, null, 2));

        return NextResponse.json({ success: true, path: filePath });
    } catch (e: any) {
        console.error("Save Sync Error:", e);
        return new NextResponse(e.message, { status: 500 });
    }
}

export async function GET(req: NextRequest) {
    const { searchParams } = new URL(req.url);
    const trackId = searchParams.get('trackId');

    if (!trackId) {
        return new NextResponse("Missing trackId", { status: 400 });
    }

    try {
        const filePath = path.join(LYRICS_DIR, `${trackId}.json`);

        if (fs.existsSync(filePath)) {
            const fileContent = fs.readFileSync(filePath, 'utf-8');
            return NextResponse.json(JSON.parse(fileContent));
        }

        return NextResponse.json({ lyrics: null, scenes: [] }); // No file exists
    } catch (e: any) {
        console.error("Load Sync Error:", e);
        return new NextResponse(e.message, { status: 500 });
    }
}
