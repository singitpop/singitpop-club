
import { NextRequest, NextResponse } from 'next/server';
import { bundle } from '@remotion/bundler';
import { renderMedia, selectComposition } from '@remotion/renderer';
import path from 'path';
import fs from 'fs';

export async function POST(req: NextRequest) {
    let body;
    try {
        body = await req.json();
    } catch (e) {
        return NextResponse.json({ error: "Invalid JSON body" }, { status: 400 });
    }

    const { compositionId, props, outName } = body;

    if (!compositionId || !props) {
        return NextResponse.json({ error: "Missing compositionId or props" }, { status: 400 });
    }

    const safeName = (outName || 'video').replace(/[^a-z0-9-_]/gi, '_');
    const extension = compositionId === 'Thumbnail' ? 'png' : 'mp4';
    const downloadsDir = path.join(process.cwd(), 'public', 'downloads');
    const outFile = path.join(downloadsDir, `${safeName}.${extension}`);
    const statusFile = path.join(downloadsDir, `${safeName}.status.json`);
    const publicPath = `/downloads/${safeName}.${extension}`;

    // Ensure downloads directory exists
    if (!fs.existsSync(downloadsDir)) {
        fs.mkdirSync(downloadsDir, { recursive: true });
    }

    try {
        console.log("🎬 Starting Render Job (Async):", safeName);
        fs.writeFileSync(statusFile, JSON.stringify({ progress: 0, status: 'initializing' }));

        // Fire and forget (keep process running)
        // Note: This relies on the server process staying alive.
        (async () => {
            try {
                // 1. Bundle
                const entryPoint = path.join(process.cwd(), 'src/video/index.ts');
                console.log("Bundling:", entryPoint);
                const bundled = await bundle({ entryPoint });

                // 2. Select Composition
                const composition = await selectComposition({
                    serveUrl: bundled,
                    id: compositionId,
                    inputProps: props,
                });

                // 3. Render
                await renderMedia({
                    composition,
                    serveUrl: bundled,
                    codec: 'h264',
                    outputLocation: outFile,
                    inputProps: props,
                    onProgress: ({ progress }) => {
                        const p = Math.round(progress * 100);
                        // Write status
                        fs.writeFileSync(statusFile, JSON.stringify({ progress: p, status: 'rendering' }));
                    },
                });

                console.log("✅ Render Complete:", outFile);
                fs.writeFileSync(statusFile, JSON.stringify({ progress: 100, status: 'complete', url: publicPath }));
            } catch (err: any) {
                console.error("Async Render Error:", err);
                fs.writeFileSync(statusFile, JSON.stringify({ progress: 0, status: 'error', error: err.message }));
            }
        })();

        // Return immediately with the job ID (outName)
        return NextResponse.json({
            success: true,
            jobId: safeName,
            statusUrl: `/api/admin/render/status?outName=${safeName}`
        });

    } catch (e: any) {
        console.error("Render trigger failed:", e);
        return NextResponse.json({ error: "Render failed: " + e.message }, { status: 500 });
    }
}
