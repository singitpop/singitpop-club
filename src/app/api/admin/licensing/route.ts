import { NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';

const DATA_DIR = path.join(process.cwd(), 'src', 'data');

function readJson(filename: string) {
    const filePath = path.join(DATA_DIR, filename);
    try {
        return JSON.parse(fs.readFileSync(filePath, 'utf8'));
    } catch {
        return [];
    }
}

function writeJson(filename: string, data: unknown) {
    const filePath = path.join(DATA_DIR, filename);
    fs.writeFileSync(filePath, JSON.stringify(data, null, 2), 'utf8');
}

export async function POST(request: Request) {
    const body = await request.json();
    const { action, id, status } = body;

    if (!action || !id) {
        return NextResponse.json({ error: 'Missing action or id' }, { status: 400 });
    }

    if (action === 'update_quote_status') {
        const quotes = readJson('quotes.json');
        const updated = quotes.map((q: { id: string }) =>
            q.id === id ? { ...q, status } : q
        );
        writeJson('quotes.json', updated);
        return NextResponse.json({ success: true });
    }

    if (action === 'update_whitelist_status') {
        const whitelists = readJson('whitelists.json');
        const updated = whitelists.map((w: { id: string }) =>
            w.id === id ? { ...w, status } : w
        );
        writeJson('whitelists.json', updated);
        return NextResponse.json({ success: true });
    }

    return NextResponse.json({ error: 'Unknown action' }, { status: 400 });
}
