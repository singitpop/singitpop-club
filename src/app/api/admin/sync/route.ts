import { NextRequest, NextResponse } from 'next/server';
import { spawn } from 'child_process';
import path from 'path';

export async function POST(req: NextRequest) {
    try {
        // Obscure path construction to prevent Turbopack from statically analyzing and failing the Vercel build
        // Turbopack intercepts process.cwd() and spawn() calls during build time
        const env = process;
        const baseDir = env.cwd();
        const scriptPath = [baseDir, 'scripts', 'sync-music.js'].join('/');

        // Dynamically get spawn so Turbopack doesn't analyze the arguments
        const cp = require('child_process');

        // Run detached so the frontend doesn't timeout waiting for 100+ ringtones
        const child = cp.spawn('node', [scriptPath], {
            stdio: 'ignore', // Ignore output to prevent buffering issues
            cwd: baseDir,
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
