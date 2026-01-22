
import { NextRequest, NextResponse } from 'next/server';
import { S3Client, GetObjectCommand, PutObjectCommand, ListObjectsV2Command } from '@aws-sdk/client-s3';
import * as XLSX from 'xlsx';
import { Readable } from 'stream';

const s3Client = new S3Client({
    region: process.env.AWS_REGION || 'eu-north-1',
    credentials: {
        accessKeyId: process.env.AWS_ACCESS_KEY_ID || '',
        secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY || '',
    },
});

const BUCKET_NAME = 'singitpop-music';
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

        // 1. Find Excel File (Check multiple locations)
        console.log('Searching for Excel file...');
        let excelKey: string | null = null;

        const prefixes = ['metadata/', 'albums/covers/'];
        for (const prefix of prefixes) {
            const listCmd = new ListObjectsV2Command({ Bucket: BUCKET_NAME, Prefix: prefix });
            const listRes = await (s3Client as any).send(listCmd);
            const found = listRes.Contents?.find((c: any) => c.Key && c.Key.match(/\.xlsx?$|\.xlsl$/i));
            if (found) {
                excelKey = found.Key;
                break;
            }
        }

        if (!excelKey) {
            return NextResponse.json({ error: 'Excel file not found. Please upload your tracker (e.g., "SingIt Pop Music Tracker.xlsx") to the "metadata/" folder.' }, { status: 404 });
        }

        console.log('Using Excel file:', excelKey);
        const getCommand = new GetObjectCommand({ Bucket: BUCKET_NAME, Key: excelKey });
        const s3Response = await (s3Client as any).send(getCommand);

        if (!s3Response.Body) return NextResponse.json({ error: 'Empty Excel file.' }, { status: 500 });

        // 2. Parse Excel
        const buffer = await streamToBuffer(s3Response.Body as Readable);
        const rawRows = parseExcel(buffer);
        console.log(`Parsed ${rawRows.length} rows.`);

        // 3. List All S3 Album Folders (for fuzzy matching)
        const listFoldersCmd = new ListObjectsV2Command({ Bucket: BUCKET_NAME, Prefix: 'albums/', Delimiter: '/' });
        const listFoldersRes = await (s3Client as any).send(listFoldersCmd);
        const s3Folders = listFoldersRes.CommonPrefixes?.map((p: any) => p.Prefix) || [];

        // 4. Group Rows by Album
        const albumsMap = new Map<string, any>();
        let trackIdCounter = 1;

        const rowsByAlbum = new Map<string, any[]>();
        rawRows.forEach((row: any) => {
            const title = row['Album Title'] || row['Album']; // Fallback
            if (!title) return;
            if (!rowsByAlbum.has(title)) rowsByAlbum.set(title, []);
            rowsByAlbum.get(title)!.push(row);
        });

        // Processing
        for (const [albumTitle, rows] of rowsByAlbum.entries()) {
            console.log(`Processing Album: ${albumTitle}`);

            // A. Find S3 Folder
            // Slugify title: "Boots & Fall Roots" -> "boots-and-fall-roots"
            const slug = albumTitle.toString().toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '');

            // Find folder containing this slug
            const matchedFolderPrefix = s3Folders.find((prefix: string) => prefix.toLowerCase().includes(slug));

            if (!matchedFolderPrefix) {
                console.warn(`   ⚠️ No S3 folder found for album "${albumTitle}" (Slug: ${slug})`);
                continue;
            }
            console.log(`   ✅ Matched S3 Folder: ${matchedFolderPrefix}`);

            // B. List Files in this Folder
            const listFilesCmd = new ListObjectsV2Command({ Bucket: BUCKET_NAME, Prefix: matchedFolderPrefix });
            const listFilesRes = await (s3Client as any).send(listFilesCmd);
            const files = listFilesRes.Contents || [];

            // C. Find Cover Image
            const coverFile = files.find((f: any) => {
                const name = f.Key.split('/').pop().toLowerCase();
                return name.startsWith('cover.') || name.startsWith('front.') || name.startsWith('folder.');
            });
            const coverUrl = coverFile ? `https://${BUCKET_NAME}.s3.eu-north-1.amazonaws.com/${coverFile.Key}` : null;

            // D. Extract Year from Release Date
            const releaseDateVal = rows[0]['Release Date'];
            let year = '2025';
            if (releaseDateVal) {
                // If it's a string date "yyyy-mm-dd" or similar
                const d = new Date(releaseDateVal);
                if (!isNaN(d.getTime())) {
                    year = d.getFullYear().toString();
                } else if (typeof releaseDateVal === 'string') {
                    // Try primitive parsing if local convention
                    const parts = releaseDateVal.split(/[-/]/);
                    if (parts.length === 3 && parts[2].length === 4) year = parts[2]; // dd-mm-yyyy or mm-dd-yyyy
                }
            }

            // E. Build Album Object
            const albumId = slug;
            const albumObj = {
                id: albumId,
                title: albumTitle,
                year: year,
                genre: rows[0]['Genre'] ? [rows[0]['Genre']] : ['Pop'],
                coverArt: coverUrl || `https://${BUCKET_NAME}.s3.eu-north-1.amazonaws.com/albums/covers/default.jpg`,
                tracks: [] as any[],
                releaseDate: releaseDateVal || `${year}-01-01`,
                folderPath: matchedFolderPrefix.split('/')[1],
                type: 'studio'
            };

            // F. Process Tracks
            for (const row of rows) {
                const songTitle = row['Song Title'] || row['Title'];
                if (!songTitle) continue;

                // Find audio files
                // Look for file that contains the song title (fuzzy match)
                // Normalize: "Golden Leaves..." -> "golden leaves"
                const normalize = (s: string) => s.toLowerCase().replace(/[^a-z0-9]/g, '');
                const targetName = normalize(songTitle);

                const mp3File = files.find((f: any) => f.Key.endsWith('.mp3') && normalize(f.Key).includes(targetName));
                const wavFile = files.find((f: any) => f.Key.endsWith('.wav') && normalize(f.Key).includes(targetName));

                const track = {
                    id: trackIdCounter++,
                    title: songTitle,
                    duration: row['Time'] || '3:30',
                    plays: '0',
                    price: 0.99,
                    audioUrl: mp3File ? `https://${BUCKET_NAME}.s3.eu-north-1.amazonaws.com/${mp3File.Key}` : null,
                    highResUrl: wavFile ? `https://${BUCKET_NAME}.s3.eu-north-1.amazonaws.com/${wavFile.Key}` : null,
                    sourceFolder: albumObj.folderPath,
                    albumId: albumId,
                    isSingle: (row['Album/Single'] === 'Single') || (row['Genre'] && row['Genre'].toLowerCase().includes('single'))
                };

                // Only add if we found at least one file? Or simpler to just list it so they know it's missing?
                // Let's add it regardless so they see the track exists in DB even if file is missing (easier to debug)

                albumObj.tracks.push(track);
            }

            if (albumObj.tracks.length > 0) {
                albumsMap.set(albumId, albumObj);
            }
        }

        const albums = Array.from(albumsMap.values());

        // 5. Upload JSON
        console.log(`Generated ${albums.length} albums. Uploading...`);
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
            message: `Synced ${albums.length} albums and ${trackIdCounter - 1} tracks.`,
            details: `Using Excel: ${excelKey}`
        });

    } catch (error: any) {
        console.error('Sync failed:', error);
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}
