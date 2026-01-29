import { NextRequest, NextResponse } from 'next/server';
import { exec } from 'child_process';
import { promisify } from 'util';
import path from 'path';

const execAsync = promisify(exec);

export async function POST(req: NextRequest) {
    try {
        const body = await req.json();
        const { compositionId, props, outName } = body;

        if (!compositionId || !props) {
            return NextResponse.json({ error: "Missing compositionId or props" }, { status: 400 });
        }

        // Secure the output name to alphanumeric only to prevent injection
        const safeName = (outName || 'video').replace(/[^a-z0-9-_]/gi, '_');
        const extension = compositionId === 'Thumbnail' ? 'png' : 'mp4';
        const outFile = path.join(process.cwd(), 'public', 'downloads', `${safeName}.${extension}`);

        // Construct command
        // Note: Using npx remotion render
        // We pass props as a JSON string
        const propsString = JSON.stringify(props);

        // Escape single quotes for shell safety if needed, but JSON.stringify usually handles it.
        // Better: Use an environment variable or file for props if complex, but CLI supports --props='...'
        // For zsh/bash, we need to be careful with escaping.

        // Alternative: Write props to a temp file and reference it? 
        // Remotion CLI supports --props=./path/to/props.json
        // Let's stick to inline for simple props, but escape single quotes.
        const safeProps = JSON.stringify(props).replace(/'/g, "'\\''");

        const cmd = `npx remotion render ${compositionId} ${outFile} --props='${safeProps}'`;

        console.log("🎬 Starting Render:", cmd);

        // Execute
        // This might take a while, so we might want to return "Processing" and let user poll?
        // But for local dev, awaiting is okay for short videos / thumbnails.
        // For long videos, it will timeout Vercel (10s limit). 
        // BUT this is for LOCAL use mostly (`npm run dev`). User said "set it up on my Mac".
        // So hitting the API locally has a longer timeout.

        await execAsync(cmd);

        console.log("✅ Render Complete:", outFile);

        return NextResponse.json({
            success: true,
            path: `/downloads/${safeName}.${extension}`,
            absolutePath: outFile
        });

    } catch (e: any) {
        console.error("Render failed:", e);
        return NextResponse.json({ error: e.message || "Render failed" }, { status: 500 });
    }
}
