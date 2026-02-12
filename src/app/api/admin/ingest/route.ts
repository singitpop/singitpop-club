
import { NextRequest, NextResponse } from 'next/server';
import { spawn } from 'child_process';
import path from 'path';

// This API route only works in local development where it can access the user's filesystem
// and execute the script.
export async function POST(req: NextRequest) {
    if (process.env.NODE_ENV === 'production') {
        return NextResponse.json({ error: "Ingestion only allowed in local environment" }, { status: 403 });
    }

    try {
        const { folderName } = await req.json();

        if (!folderName) {
            return NextResponse.json({ error: "Folder Name is required" }, { status: 400 });
        }

        // Spawn the ingestion script
        // We use 'npx tsx' to run the typescript file directly
        const scriptPath = path.join(process.cwd(), 'scripts', 'ingest_album.ts');

        console.log(`[API] Triggering ingestion for: ${folderName}`);

        const child = spawn('npx', ['tsx', scriptPath, folderName], {
            cwd: process.cwd(),
            shell: true
        });

        // We stream logs back? Or just return success/fail?
        // Creating a stream response is complex for this. 
        // Let's wait for completion or return early 'Started'.
        // For better UX, we'll return a ReadableStream so frontend sees progress.

        const stream = new ReadableStream({
            start(controller) {
                const encoder = new TextEncoder();

                child.stdout.on('data', (data) => {
                    const text = data.toString();
                    console.log("[Script]", text.trim());
                    controller.enqueue(encoder.encode(text));
                });

                child.stderr.on('data', (data) => {
                    const text = data.toString();
                    console.error("[Script Error]", text.trim());
                    controller.enqueue(encoder.encode(`ERROR: ${text}`));
                });

                child.on('close', (code) => {
                    if (code === 0) {
                        controller.enqueue(encoder.encode("\n✅ Ingestion Success!"));
                    } else {
                        controller.enqueue(encoder.encode(`\n❌ Ingestion Failed with code ${code}`));
                    }
                    controller.close();
                });
            }
        });

        return new NextResponse(stream, {
            headers: {
                'Content-Type': 'text/plain',
                'Transfer-Encoding': 'chunked'
            }
        });

    } catch (error) {
        console.error("API Error", error);
        return NextResponse.json({ error: "Internal Error" }, { status: 500 });
    }
}
