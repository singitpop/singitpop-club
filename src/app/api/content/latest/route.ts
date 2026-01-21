
import { NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';

const METADATA_PATH = path.join(process.cwd(), 'src/data/albumMetadata.json');

function readMetadata() {
    if (fs.existsSync(METADATA_PATH)) {
        return JSON.parse(fs.readFileSync(METADATA_PATH, 'utf-8'));
    }
    return {};
}

export async function GET() {
    try {
        const metadata = readMetadata();
        return NextResponse.json(metadata);
    } catch (error) {
        return NextResponse.json({ error: 'Failed to load metadata' }, { status: 500 });
    }
}
