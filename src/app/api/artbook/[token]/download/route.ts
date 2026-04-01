import { NextResponse } from "next/server";
import { getArtbookAccess } from '@/lib/artbook-s3';
import albumsData from '@/data/albums.json';
import archiver from 'archiver';
import path from 'path';
import fs from 'fs';

export const dynamic = 'force-dynamic';

interface Track {
    id: number;
    title: string;
    duration: string;
    lyrics?: {
        rawText: string;
    };
}

interface Album {
    id: string;
    title: string;
    year: number;
    genre: string[];
    coverArt: string;
    tracks: Track[];
    artbook?: {
        artwork: string;
        accentColor: string;
        layout: string;
    };
}

export async function GET(req: Request, { params }: { params: { token: string } }) {
    const { token } = params;

    try {
        // 1. Verify Secure Token against S3 Vault
        const accessData = await getArtbookAccess(token);

        if (!accessData) {
            return new NextResponse("Invalid or Expired Artbook Token.", { status: 401 });
        }

        // 2. Load Album Data
        const album = (albumsData as any[]).find(a => a.id === accessData.albumId) as Album;

        if (!album) {
            return new NextResponse("Album associated with this token not found.", { status: 404 });
        }

        // Extract folder slug from coverArt (e.g., "/images/artbooks/last-ones-standing/main.png" -> "last-ones-standing")
        const coverArtPathParts = album.coverArt.split('/');
        const folderSlug = coverArtPathParts[coverArtPathParts.length - 2]; 

        // Target Directory: /public/images/artbooks/[slug]/extras
        const extrasDirPath = path.join(process.cwd(), 'public', 'images', 'artbooks', folderSlug, 'extras');

        // Check if the directory exists (maybe we haven't generated the extras for this album yet)
        if (!fs.existsSync(extrasDirPath)) {
             return new NextResponse("The Digital Vault for this album is still being assembled. Please check back later!", { status: 404 });
        }

        // 3. Setup Archiver Streaming
        // We use Node's PassThrough stream to pipe the archiver output directly into a NextResponse
        const { PassThrough } = require('stream');
        const stream = new PassThrough();
        
        const archive = archiver('zip', {
            zlib: { level: 5 } // Standard compression level -> balances CPU and File Size
        });

        // Handle Archive Errors
        archive.on('error', (err) => {
            console.error("ZIP Generation Error:", err);
            stream.destroy(err);
        });

        // 4. Pipe Archiver stream data directly into our PassThrough stream
        archive.pipe(stream);

        // 5. Append the entire 'extras' directory into the ZIP root
        archive.directory(extrasDirPath, false);
        
        // Start streaming
        archive.finalize();

        const safeFilename = `${album.title.replace(/[^a-zA-Z0-9 ]/g, "")} - Digital Vault.zip`;

        // Return the PassThrough stream as our downloaded file!
        return new NextResponse(stream as any, {
            headers: {
                'Content-Type': 'application/zip',
                'Content-Disposition': `attachment; filename="${safeFilename}"`,
            }
        });

    } catch (err) {
        console.error("Failed to generate Digital Vault download:", err);
        return new NextResponse("Internal Server Error generating download.", { status: 500 });
    }
}
