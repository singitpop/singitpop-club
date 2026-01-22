import { NextRequest, NextResponse } from 'next/server';
import { S3Client, GetObjectCommand, PutObjectCommand, ListObjectsV2Command } from '@aws-sdk/client-s3';
import * as XLSX from 'xlsx';
import { Readable } from 'stream';

// Initial check for environment variables to avoid runtime crash on import effectively, 
// though Next.js env vars are usually safe.
const s3Client = new S3Client({
    region: process.env.AWS_REGION || 'eu-north-1',
    credentials: {
        accessKeyId: process.env.AWS_ACCESS_KEY_ID || '',
        secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY || '',
    },
});

const BUCKET_NAME = 'singitpop-music';
const EXCEL_FILE_KEY = 'metadata/SingIt Pop Music Tracker.xlsx';
const ALBUMS_JSON_KEY = 'data/albums.json';

// Helper to stream S3 body to buffer
async function streamToBuffer(stream: Readable): Promise<Buffer> {
    return new Promise((resolve, reject) => {
        const chunks: Buffer[] = [];
        stream.on('data', (chunk) => chunks.push(Buffer.from(chunk)));
        stream.on('error', (err) => reject(err));
        stream.on('end', () => resolve(Buffer.concat(chunks)));
    });
}

// Convert Excel Sheet to JSON
function parseExcel(buffer: Buffer) {
    const workbook = XLSX.read(buffer, { type: 'buffer' });
    const sheetName = workbook.SheetNames[0]; // Assume first sheet
    const sheet = workbook.Sheets[sheetName];
    return XLSX.utils.sheet_to_json(sheet);
}

export async function POST(request: NextRequest) {
    try {
        if (!process.env.AWS_ACCESS_KEY_ID || !process.env.AWS_SECRET_ACCESS_KEY) {
            return NextResponse.json({ error: 'Missing AWS Credentials' }, { status: 500 });
        }

        // 1. Fetch Excel File from S3
        console.log('Fetching Excel from S3:', EXCEL_FILE_KEY);
        const getCommand = new GetObjectCommand({
            Bucket: BUCKET_NAME,
            Key: EXCEL_FILE_KEY
        });

        let s3Response;
        try {
            s3Response = await (s3Client as any).send(getCommand);
        } catch (e: any) {
            console.error('Failed to fetch Excel:', e);
            if (e.name === 'NoSuchKey') {
                return NextResponse.json({ error: 'Excel file not found. Please upload "SingIt Pop Music Tracker.xlsx" to "metadata/" folder in S3.' }, { status: 404 });
            }
            throw e;
        }

        if (!s3Response.Body) {
            return NextResponse.json({ error: 'Empty Excel file.' }, { status: 500 });
        }

        // 2. Parse Excel
        const buffer = await streamToBuffer(s3Response.Body as Readable);
        const rawRows = parseExcel(buffer);
        console.log(`Parsed ${rawRows.length} rows from Excel.`);

        // 3. Transform to Album/Track Structure
        const albumsMap = new Map<string, any>();
        let trackIdCounter = 1;

        // Iterate rows
        // Expected Columns based on user's file: "Album", "Title", "Genre", "Year", "Folder Name"
        // We iterate and group by Album
        for (const row of rawRows as any[]) {
            const albumTitle = row['Album'];
            if (!albumTitle) continue; // Skip empty rows

            const albumSlug = albumTitle.toLowerCase().replace(/[^a-z0-9]+/g, '-') + '-' + (row['Year'] || '2025');

            if (!albumsMap.has(albumSlug)) {
                const folderName = row['Folder Name'] || albumTitle; // Fallback
                const coverArtUrl = `https://${BUCKET_NAME}.s3.eu-north-1.amazonaws.com/albums/${encodeURIComponent(folderName)}/cover.jpg`; // Default cover assumption?
                // Wait, user had logic to check if cover exists? 
                // For now, let's stick to the standard structure.

                albumsMap.set(albumSlug, {
                    id: albumSlug,
                    title: albumTitle,
                    year: row['Year'] || 2025,
                    genre: row['Genre'] ? [row['Genre']] : ['Pop'],
                    coverArt: coverArtUrl, // We might need to verify this or default.
                    // Actually, old code used local path /albums/artwork/... 
                    // New system should use S3.
                    tracks: [],
                    releaseDate: row['Release Date'] || '2026-01-01',
                    folderPath: folderName,
                    type: 'studio'
                });
            }

            const album = albumsMap.get(albumSlug);
            const trackTitle = row['Title'] || 'Unknown Track';
            const folderName = album.folderPath;

            // Construct S3 URLs
            const encodedFolder = encodeURIComponent(folderName);
            const encodedTitle = encodeURIComponent(trackTitle).replace(/'/g, '%27');

            const track = {
                id: trackIdCounter++,
                title: trackTitle,
                duration: row['Time'] || '3:30',
                plays: '0',
                locked: false,
                price: 0.99,
                genre: row['Genre'] || 'Pop',
                highResUrl: `https://${BUCKET_NAME}.s3.eu-north-1.amazonaws.com/albums/${encodedFolder}/${encodedTitle}.wav`,
                audioUrl: `https://${BUCKET_NAME}.s3.eu-north-1.amazonaws.com/albums/${encodedFolder}/${encodedTitle}.mp3`,
                sourceFolder: folderName,
                albumId: albumSlug,
                isSingle: !!row['Single'] || (row['Genre'] && row['Genre'].toLowerCase().includes('single'))
            };

            album.tracks.push(track);
        }

        const albums = Array.from(albumsMap.values());

        // 5. Upload JSON to S3
        console.log(`Generated ${albums.length} albums. Uploading to S3...`);
        const jsonBuffer = Buffer.from(JSON.stringify(albums, null, 2));

        const uploadCommand = new PutObjectCommand({
            Bucket: BUCKET_NAME,
            Key: ALBUMS_JSON_KEY,
            Body: jsonBuffer,
            ContentType: 'application/json',
            CacheControl: 'max-age=60'
        });

        await (s3Client as any).send(uploadCommand);

        return NextResponse.json({
            success: true,
            message: `Synced ${albums.length} albums with total ${trackIdCounter - 1} tracks.`,
            albumsCount: albums.length
        });

    } catch (error: any) {
        console.error('Sync failed:', error);
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}
