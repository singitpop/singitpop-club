
import { NextRequest, NextResponse } from 'next/server';
import { spawn } from 'child_process';
import path from 'path';

export async function POST(req: NextRequest) {
    if (process.env.NODE_ENV === 'production') {
        return NextResponse.json({ error: "Admin tools only allowed in local environment" }, { status: 403 });
    }

    try {
        const { folderName } = await req.json();

        if (!folderName) {
            return NextResponse.json({ error: "Folder/Album Name is required" }, { status: 400 });
        }

        const scriptPath = path.join(process.cwd(), 'scripts', 'delete_album.ts');
        console.log(`[API] Triggering deletion for: ${folderName}`);

        const child = spawn('npx', ['tsx', scriptPath, folderName], {
            cwd: process.cwd(),
            shell: true
        });

        const stream = new ReadableStream({
            start(controller) {
                const encoder = new TextEncoder();

                child.stdout.on('data', (data) => {
                    const text = data.toString();
                    console.log("[Delete Script]", text.trim());
                    controller.enqueue(encoder.encode(text));
                });

                child.stderr.on('data', (data) => {
                    const text = data.toString();
                    console.error("[Delete Script Error]", text.trim());
                    controller.enqueue(encoder.encode(`ERROR: ${text}`));
                });

                child.on('close', (code) => {
                    if (code === 0) {
                        controller.enqueue(encoder.encode("\n✅ Deletion Success!"));
                    } else {
                        controller.enqueue(encoder.encode(`\n❌ Deletion Failed with code ${code}`));
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
