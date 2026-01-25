
import { S3Client, GetObjectCommand, PutObjectCommand, ListObjectsV2Command } from '@aws-sdk/client-s3';
import * as XLSX from 'xlsx';
import { Readable } from 'stream';
import * as dotenv from 'dotenv';
import * as fs from 'fs';
import * as path from 'path';

// Load env vars from .env.local
try {
    const envPath = path.resolve(process.cwd(), '.env.local');
    if (fs.existsSync(envPath)) {
        const envConfig = fs.readFileSync(envPath, 'utf-8');
        envConfig.split('\n').forEach(line => {
            const [key, value] = line.split('=');
            if (key && value) {
                process.env[key.trim()] = value.trim().replace(/"/g, '');
            }
        });
    }
} catch (e) {
    console.warn("Could not load .env.local");
}

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

async function runSync() {
    console.log("Starting Manual Sync...");
    try {
        if (!process.env.AWS_ACCESS_KEY_ID || !process.env.AWS_SECRET_ACCESS_KEY) {
            console.error('Error: Missing AWS Credentials');
            return;
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
            console.error('Excel file not found.');
            return;
        }

        console.log('Using Excel file:', excelKey);
        const getCommand = new GetObjectCommand({ Bucket: BUCKET_NAME, Key: excelKey });
        const s3Response = await (s3Client as any).send(getCommand);

        if (!s3Response.Body) {
            console.error('Empty Excel file.');
            return;
        }

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
            // console.log(`Processing Album: ${albumTitle}`);

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
                // console.warn(`   ⚠️ No S3 folder found for album "${albumTitle}"`);
                continue;
            }
            // console.log(`   ✅ Matched S3 Folder: ${matchedFolderPrefix}`);

            // B. List Files in this Folder
            const listFilesCmd = new ListObjectsV2Command({ Bucket: BUCKET_NAME, Prefix: matchedFolderPrefix });
            const listFilesRes = await (s3Client as any).send(listFilesCmd);
            const files = listFilesRes.Contents || [];

            // C. Find Cover Image (Specific: cover.png or cover.jpg or from excel)
            // User said: "every album has a cover.png"
            const coverFile = files.find((f: any) => {
                const name = f.Key.split('/').pop().toLowerCase();
                return name === 'cover.png' || name === 'cover.jpg';
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

            // E. Build Album Object
            // Slug for ID with year suffix to match existing albumData.ts format
            const baseSlug = albumTitle.toString().toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '');
            const albumId = `${baseSlug}-${year}`;

            // Fix for LIVE albums
            const type = albumTitle.toLowerCase().includes('live') ? 'live' : 'studio';

            const albumObj = {
                id: albumId,
                title: albumTitle,
                year: year,
                genre: rows[0]['Genre'] ? [rows[0]['Genre']] : ['Pop'],
                coverArt: coverUrl || `https://${BUCKET_NAME}.s3.eu-north-1.amazonaws.com/albums/covers/default.jpg`,
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

                // Helper to check if file is valid
                const isValidFile = (key: string): boolean => {
                    const fileName = key.split('/').pop() || '';
                    const nameWithoutExt = fileName.replace(/\.(mp3|wav)$/i, '');

                    if (/[-\s](1|2|3|4)$/.test(nameWithoutExt)) return false;

                    const lastThreeChars = nameWithoutExt.slice(-3).toLowerCase();
                    if (lastThreeChars === 'you') return true;

                    const lastChar = nameWithoutExt.slice(-1).toLowerCase();
                    if (lastChar === 'u') return false;

                    return true;
                };

                const mp3File = files.find((f: any) => {
                    const key = f.Key.toLowerCase();
                    return key.endsWith('.mp3') && normalize(key).includes(targetName) && isValidFile(f.Key);
                });

                const wavFile = files.find((f: any) => {
                    const key = f.Key.toLowerCase();
                    return key.endsWith('.wav') && normalize(key).includes(targetName) && isValidFile(f.Key);
                });

                let trackCoverUrl: string | null = null;
                const trackCover = files.find((f: any) => {
                    const key = f.Key.toLowerCase();
                    const keyParts = key.split('/');
                    if (keyParts.length >= 4) {
                        const subfolderName = keyParts[2];
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

                const isSingle = (row['Album/Single'] === 'Single') || (row['Genre'] && row['Genre'].toLowerCase().includes('single'));

                const track = {
                    id: trackIdCounter++,
                    title: songTitle,
                    duration: row['Time'] || '3:30',
                    plays: '0',
                    price: 0.99,
                    audioUrl: mp3File ? `https://${BUCKET_NAME}.s3.eu-north-1.amazonaws.com/${mp3File.Key}` : null,
                    highResUrl: wavFile ? `https://${BUCKET_NAME}.s3.eu-north-1.amazonaws.com/${wavFile.Key}` : null,
                    coverArt: trackCoverUrl,
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
        console.log('Upload Complete! Database updated.');

    } catch (error) {
        console.error('Sync failed:', error);
    }
}

runSync();
