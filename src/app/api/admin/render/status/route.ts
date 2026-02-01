
import { NextRequest, NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';

export async function GET(req: NextRequest) {
    const { searchParams } = new URL(req.url);
    const outName = searchParams.get('outName');

    if (!outName) {
        return NextResponse.json({ error: "Missing outName" }, { status: 400 });
    }

    // In a real app, use Redis. For local dev, we check the temp file created by the render route.
    const safeName = outName.replace(/[^a-z0-9-_]/gi, '_');
    const statusFile = path.join(process.cwd(), 'public', 'downloads', `${safeName}.status.json`);

    if (fs.existsSync(statusFile)) {
        try {
            const status = JSON.parse(fs.readFileSync(statusFile, 'utf-8'));
            return NextResponse.json(status);
        } catch (e) {
            return NextResponse.json({ progress: 0 });
        }
    }

    return NextResponse.json({ progress: 0 });
}
