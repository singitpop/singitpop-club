
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
    // Prefer 'Songs' sheet if it exists, otherwise default to first
    const sheetName = workbook.SheetNames.includes('Songs') ? 'Songs' : workbook.SheetNames[0];
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

        const prefixes = ['admin/', 'metadata/', 'albums/covers/'];
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

            // A. Find S3 Folder (Exact Match by Name)
            // normalized: "Boots & Fall Roots" -> "boots & fall roots" (keep spaces)
            const normalizedTitle = albumTitle.toString().toLowerCase().trim();

            let matchedFolderPrefix = s3Folders.find((prefix: string) => {
                // prefix is "albums/Boots & Fall Roots/"
                // folderName is "boots & fall roots"
                const folderName = prefix.split('/')[1]?.toLowerCase().trim();
                return folderName === normalizedTitle;
            });

            // Fallback: Slug Match
            if (!matchedFolderPrefix) {
                const slug = normalizedTitle.replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '');
                matchedFolderPrefix = s3Folders.find((prefix: string) => prefix.toLowerCase().includes(slug));
            }

            if (!matchedFolderPrefix) {
                console.warn(`   ⚠️ No S3 folder found for album "${albumTitle}"`);
                continue;
            }
            console.log(`   ✅ Matched S3 Folder: ${matchedFolderPrefix}`);

            // B. List Files in this Folder
            const listFilesCmd = new ListObjectsV2Command({ Bucket: BUCKET_NAME, Prefix: matchedFolderPrefix });
            const listFilesRes = await (s3Client as any).send(listFilesCmd);
            const files = listFilesRes.Contents || [];

            // C. Find Cover Image (Specific: cover.png in root folder of album)
            // Fix: Ensure we don't pick a nested single's cover.
            // Expected Key: "{prefix}cover.png"
            const coverFile = files.find((f: any) => {
                const key = f.Key;
                // Check if file is exactly in the album root folder
                // prefix includes slash at end: "albums/folder/"
                // key should be "albums/folder/cover.png"
                if (!key.toLowerCase().startsWith(matchedFolderPrefix.toLowerCase())) return false;

                const relativePath = key.slice(matchedFolderPrefix.length);
                if (relativePath.includes('/')) return false; // In a subfolder

                const name = relativePath.toLowerCase();
                return name === 'cover.png' || name === 'cover.jpg' || name === 'cover.jpeg' || name === 'front.jpg';
            });
            const coverUrl = coverFile ? `https://${BUCKET_NAME}.s3.eu-north-1.amazonaws.com/${coverFile.Key}` : null;

            // D. Extract Year from Release Date
            const releaseDateVal = rows[0]['Release Date'];
            const currentYear = new Date().getFullYear();
            let year = currentYear.toString();
            let releaseDateStr = `${currentYear}-01-01`;

            if (releaseDateVal) {
                // Excel stores dates as serial numbers (days since 1900-01-01)
                if (typeof releaseDateVal === 'number') {
                    // Convert Excel serial date to JavaScript Date
                    // Excel epoch is 1900-01-01, but has a leap year bug (treats 1900 as leap year)
                    const excelEpoch = new Date(1899, 11, 30); // Dec 30, 1899
                    const msPerDay = 24 * 60 * 60 * 1000;
                    const jsDate = new Date(excelEpoch.getTime() + releaseDateVal * msPerDay);

                    if (!isNaN(jsDate.getTime()) && jsDate.getFullYear() > 1900 && jsDate.getFullYear() <= currentYear + 10) {
                        year = jsDate.getFullYear().toString();
                        releaseDateStr = jsDate.toISOString().split('T')[0];
                    }
                } else if (typeof releaseDateVal === 'string') {
                    // Try parsing string formats like "DD/MM/YYYY" or "YYYY-MM-DD"
                    const parts = releaseDateVal.split(/[-/]/);
                    if (parts.length === 3) {
                        // Try YYYY-MM-DD format
                        if (parts[0].length === 4) {
                            year = parts[0];
                            releaseDateStr = releaseDateVal;
                        }
                        // Try DD/MM/YYYY format
                        else if (parts[2].length === 4) {
                            year = parts[2];
                            releaseDateStr = `${parts[2]}-${parts[1]}-${parts[0]}`;
                        }
                    }
                } else {
                    // Try as Date object
                    const d = new Date(releaseDateVal);
                    if (!isNaN(d.getTime()) && d.getFullYear() > 1900 && d.getFullYear() <= currentYear + 10) {
                        year = d.getFullYear().toString();
                        releaseDateStr = d.toISOString().split('T')[0];
                    }
                }
            }

            // Determine Album Type
            // Robust check: Look for "Live" in Title OR "Type" column OR Column H (Index 7ish)
            // We scan ALL values in all available rows (header + first) for the word "Live" to be safe.
            // This covers the case where "Live" is in a specific column like H.
            const allValues = [
                ...Object.values(rows[0] || {}),
                albumTitle
            ].map(v => String(v).toLowerCase());

            const isLive = allValues.some(v => v.includes('live')); // Checks for "Live" anywhere
            const type = isLive ? 'live' : 'studio';

            // Default Cover (Signed)
            const defaultCoverKey = 'albums/covers/default.jpg';
            // We don't sign it here because we sign on read (GET /api/content/albums). 
            // BUT, if we put a raw S3 URL here, the frontend might try to use it directly if the read-side signing misses it.
            // Best practice: Store the KEY for default too, or a consistent URL structure.
            // Current logic in GET /api/content/albums: signs if it looks like a key or specific S3 URL.
            // Let's store the full S3 URL for consistent storage, but ensure GET signs it.
            const defaultCoverUrl = `https://${BUCKET_NAME}.s3.eu-north-1.amazonaws.com/${defaultCoverKey}`;

            // E. Build Album Object
            const baseSlug = albumTitle.toString().toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '');
            const albumId = `${baseSlug}-${year}`;

            const albumObj = {
                id: albumId,
                title: albumTitle,
                year: year,
                genre: rows[0]['Genre'] ? [rows[0]['Genre']] : ['Pop'],
                coverArt: coverUrl || defaultCoverUrl,
                tracks: [] as any[],
                releaseDate: releaseDateStr,
                folderPath: matchedFolderPrefix.split('/')[1],
                type: type
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

                // Helper to check if filename ends with 'u' or numbers 1-4 before extension
                // e.g., "Song Titleu.mp3" or "Song Title-2.wav" should be excluded
                // BUT "Strings of You.wav" should be INCLUDED (legitimate ending)
                const isValidFile = (key: string): boolean => {
                    const fileName = key.split('/').pop() || '';
                    const nameWithoutExt = fileName.replace(/\.(mp3|wav)$/i, '');

                    // Check for '-2', '-3', '-4', etc. (backup files)
                    if (/[-\s](1|2|3|4)$/.test(nameWithoutExt)) {
                        return false;
                    }

                    // Check for standalone 'u' suffix (not part of "You")
                    // "Horsesu" ends with 'u' -> exclude
                    // "of You" ends with "You" -> include
                    const lastThreeChars = nameWithoutExt.slice(-3).toLowerCase();
                    if (lastThreeChars === 'you') {
                        return true; // Legitimate "You" ending
                    }

                    const lastChar = nameWithoutExt.slice(-1).toLowerCase();
                    if (lastChar === 'u') {
                        return false; // Standalone 'u' suffix
                    }

                    return true;
                };

                // User stated structure: AlbumFolder -> Song Subfolder -> File
                // We search for file keys that include the normalized song title
                // This covers `Album/Track/Track.mp3` or even `Album/Track.mp3`
                // Track Matching Fix: Priorities Exact Name Match > Includes
                // This prevents "Title" matching "Title Reprise" by mistake.
                const findBestMatch = (extension: string) => {
                    return files.find((f: any) => {
                        const key = f.Key.toLowerCase();
                        if (!key.endsWith(extension) || !isValidFile(f.Key)) return false;

                        const fileName = key.split('/').pop().replace(extension, '');
                        const normalizedFileName = normalize(fileName);

                        // Exact match of filename
                        return normalizedFileName === targetName;
                    }) || files.find((f: any) => {
                        // Fallback: Includes (but fuzzy) - only if exact match fails
                        const key = f.Key.toLowerCase();
                        return key.endsWith(extension) && normalize(key).includes(targetName) && isValidFile(f.Key);
                    });
                }

                const mp3File = findBestMatch('.mp3');

                const wavFile = findBestMatch('.wav');

                // Find track-specific cover art
                // Look for: albums/{Album}/{Track}/cover.png
                let trackCoverUrl: string | null = null;
                const trackCover = files.find((f: any) => {
                    const key = f.Key.toLowerCase();
                    const keyParts = key.split('/');
                    // Check if file is in a subfolder matching the track title
                    if (keyParts.length >= 4) {
                        const subfolderName = keyParts[2]; // albums/Album/[Subfolder]/file
                        const fileName = keyParts[keyParts.length - 1];
                        const isCoverFile = fileName.startsWith('cover.') &&
                            (fileName.endsWith('.png') || fileName.endsWith('.jpg') ||
                                fileName.endsWith('.jpeg') || fileName.endsWith('.webp'));
                        return normalize(subfolderName).includes(targetName) && isCoverFile;
                    }
                    return false;
                });

                if (trackCover) {
                    trackCoverUrl = `https://${BUCKET_NAME}.s3.eu-north-1.amazonaws.com/${trackCover.Key}`;
                }

                // Determine if Single
                // User said: "singles are marked as Single in the Album/Single column"
                const isSingle = (row['Album/Single'] === 'Single') || (row['Genre'] && row['Genre'].toLowerCase().includes('single'));

                const track = {
                    id: trackIdCounter++,
                    title: songTitle,
                    duration: row['Time'] || '3:30',
                    plays: '0',
                    price: 0.99,
                    audioUrl: mp3File ? `https://${BUCKET_NAME}.s3.eu-north-1.amazonaws.com/${mp3File.Key}` : null,
                    highResUrl: wavFile ? `https://${BUCKET_NAME}.s3.eu-north-1.amazonaws.com/${wavFile.Key}` : null,
                    coverArt: trackCoverUrl, // Add track-specific cover art
                    sourceFolder: albumObj.folderPath,
                    albumId: albumId,
                    isSingle: isSingle
                };

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
