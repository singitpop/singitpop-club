import { NextRequest, NextResponse } from 'next/server';
import { spawn } from 'child_process';
import path from 'path';

export async function POST(req: NextRequest) {
    try {
        const scriptPath = path.join(process.cwd(), 'scripts', 'sync-music.js');

        // Run detached so the frontend doesn't timeout waiting for 100+ ringtones
        const child = spawn('node', [scriptPath], {
            stdio: 'ignore', // Ignore output to prevent buffering issues
            cwd: process.cwd(),
            detached: true
        });

        // Unref to allow the Node process to exit independently of this child
        child.unref();

        return NextResponse.json({
            success: true,
            message: "Sync started in the background. It may take a few minutes to complete depending on the number of new ringtones.",
        });

    } catch (e: any) {
        console.error("Sync Trigger Error:", e);
        return NextResponse.json({ success: false, error: e.message }, { status: 500 });
    }
}
