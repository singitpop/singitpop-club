
import fs from 'fs';
import path from 'path';
import xlsx from 'xlsx';
import { S3Client, PutObjectCommand } from '@aws-sdk/client-s3';
import Stripe from 'stripe';
import dotenv from 'dotenv';
import { fileURLToPath } from 'url';

// Load Env from parent directory
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const ROOT_DIR = path.resolve(__dirname, '..');
dotenv.config({ path: path.join(ROOT_DIR, '.env.local') });

// Config
const BUCKET_NAME = 'singitpop-music';
const REGION = process.env.AWS_REGION || 'eu-west-2';
const STRIPE_SECRET_KEY = process.env.STRIPE_SECRET_KEY;
const READY_FOLDER_BASE = '/Users/garybirrell/Desktop/Singitpop/READY FOR WEBSITE';

if (!STRIPE_SECRET_KEY) {
    console.error("❌ Missing STRIPE_SECRET_KEY in .env.local");
    process.exit(1);
}

const s3Client = new S3Client({
    region: REGION,
    credentials: {
        accessKeyId: process.env.AWS_ACCESS_KEY_ID!,
        secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY!,
    }
});

const stripe = new Stripe(STRIPE_SECRET_KEY, { apiVersion: '2023-10-16' });

// --- Helpers ---

// Excel date serial to JS Date
function excelDateToJSDate(serial: number) {
    // Excel base date is Dec 30 1899
    // But typically it's days since Jan 1 1900.
    // 25569 is diff between 1970 and 1900.
    // simpler: (serial - 25569) * 86400 * 1000
    const utc_days = Math.floor(serial - 25569);
    const utc_value = utc_days * 86400;
    const date_info = new Date(utc_value * 1000);
    return date_info.toISOString().split('T')[0];
}

async function uploadFileToS3(filePath: string, key: string, contentType: string) {
    try {
        const fileContent = fs.readFileSync(filePath);
        const command = new PutObjectCommand({
            Bucket: BUCKET_NAME,
            Key: key,
            Body: fileContent,
            ContentType: contentType
        });
        await s3Client.send(command);
        console.log(`✅ Uploaded: ${key}`);
        return `https://${BUCKET_NAME}.s3.${REGION}.amazonaws.com/${key}`;
    } catch (err) {
        console.error(`❌ Upload Failed: ${key}`, err);
        return null;
    }
}

// --- Main Ingestion ---

async function ingestAlbum(folderName: string) {
    console.log(`🚀 Starting Ingestion for Album Folder: "${folderName}"`);

    // 1. Locate and Parse Tracker
    const readyRootFiles = fs.readdirSync(READY_FOLDER_BASE);
    const trackerFileName = readyRootFiles.find(f => f.includes('SingIt Pop Music Tracker') && f.endsWith('.xlsx'));

    if (!trackerFileName) {
        console.error("❌ Tracker Excel file not found.");
        return;
    }

    const workbook = xlsx.readFile(path.join(READY_FOLDER_BASE, trackerFileName));
    const sheet = workbook.Sheets[workbook.SheetNames[0]];
    const rawData = xlsx.utils.sheet_to_json(sheet, { header: 1 }) as any[];

    // Filter rows for this album
    // Col 6 is Album Title. 
    // IMPORTANT: The Folder Name might not EXACTLY match the Excel Album Title (e.g. colon vs dash).
    // We should normalized search or strictly require user to type the Folder Name.
    // But we need to find the rows based on the Folder Name? 
    // Usually Folder Name == Album Title.

    // Let's assume Folder Name matches Album Title in Excel.
    const albumRows = rawData.filter(row => row[6] === folderName);

    if (albumRows.length === 0) {
        console.error(`❌ No tracks found in Excel for Album Title: "${folderName}"`);
        console.log("   (Check if folder name matches 'Album Title' column in Excel exactly)");
        return;
    }

    console.log(`✅ Found ${albumRows.length} tracks in Excel.`);

    // 2. Validate Local Folder Structure
    const albumFolderPath = path.join(READY_FOLDER_BASE, folderName);
    if (!fs.existsSync(albumFolderPath)) {
        console.error(`❌ Album folder not found: ${albumFolderPath}`);
        return;
    }

    // 3. Process Album Art (Root)
    const coverPath = path.join(albumFolderPath, 'cover.png');
    let albumCoverS3Key = `albums/${folderName}/cover.png`;
    let albumCoverUrl = '';

    if (fs.existsSync(coverPath)) {
        console.log("Found Album Cover. Uploading...");
        const url = await uploadFileToS3(coverPath, albumCoverS3Key, 'image/png');
        if (url) albumCoverUrl = url;
    } else {
        console.warn("⚠️ No cover.png found in album root.");
    }

    // 4. Process Tracks
    const tracksData: any[] = [];

    for (const row of albumRows) {
        // Excel Data
        const songTitle = row[0];
        const genre = row[1]; // Auto Radio station
        const type = row[3]; // 'Single' or 'Album'
        const rawDate = row[8]; // Serial

        const trackFolderName = songTitle; // Expecting folder matches song title
        const trackFolderPath = path.join(albumFolderPath, trackFolderName);

        console.log(`\nProcessing Track: ${songTitle} (${type})`);

        // Find Audio Files
        if (!fs.existsSync(trackFolderPath)) {
            console.warn(`⚠️ Track folder not found: ${trackFolderPath}. Skipping audio upload.`);
            continue;
        }

        // MP3
        const mp3Path = path.join(trackFolderPath, `${songTitle}.mp3`);
        let mp3Url = '';
        if (fs.existsSync(mp3Path)) {
            const key = `albums/${folderName}/${songTitle}/${songTitle}.mp3`;
            const url = await uploadFileToS3(mp3Path, key, 'audio/mpeg');
            if (url) mp3Url = key; // Use Key for app logic (it adds prefix) or absolute URL? 
            // Existing data uses keys for some, URLs for others. 
            // Best to store Key if using S3 signer, or full S3 URL?
            // App logic often expects `https://singitpop-music.s3...`
            mp3Url = `https://${BUCKET_NAME}.s3.${REGION}.amazonaws.com/${key}`;
        } else {
            console.warn(`   Missing .mp3 file!`);
        }

        // WAV (VIP)
        let wavUrl = undefined;
        const wavPath = path.join(trackFolderPath, `${songTitle}.wav`);
        if (fs.existsSync(wavPath)) {
            const key = `albums/${folderName}/${songTitle}/${songTitle}.wav`;
            console.log(`   Found WAV (VIP). Uploading...`);
            await uploadFileToS3(wavPath, key, 'audio/wav');
            wavUrl = `https://${BUCKET_NAME}.s3.${REGION}.amazonaws.com/${key}`;
        }

        // Single Cover?
        let singleCoverUrl = undefined;
        if (type === 'Single') {
            const singleCoverPath = path.join(trackFolderPath, 'cover.png');
            if (fs.existsSync(singleCoverPath)) {
                const key = `albums/${folderName}/${songTitle}/cover.png`;
                console.log(`   Found Single Cover. Uploading...`);
                await uploadFileToS3(singleCoverPath, key, 'image/png');
                singleCoverUrl = `https://${BUCKET_NAME}.s3.${REGION}.amazonaws.com/${key}`;
            }
        }

        // Add to Track List
        tracksData.push({
            id: songTitle.toLowerCase().replace(/[^a-z0-9]/g, '-'), // slug
            title: songTitle,
            duration: "3:30", // Placeholder or read MP3 metadata? Keeping simple for now.
            plays: "0",
            audioUrl: mp3Url,
            highResUrl: wavUrl, // VIP
            isSingle: type === 'Single',
            genre: genre
        });

        // Stripe Ringtone Sync
        if (type === 'Single') {
            console.log(`   Creating Ringtone Product on Stripe...`);
            const ringtoneName = `${songTitle} Ringtone`;
            // Check if exists?
            // For speed, just try create (or search first)
            // Simple implementation: Create always (might duplicate if run twice)
            // Better: Search
            const existing = await stripe.products.search({ query: `name:'${ringtoneName}'` });
            if (existing.data.length === 0) {
                await stripe.products.create({
                    name: ringtoneName,
                    description: `Ringtone for ${songTitle}`,
                    images: singleCoverUrl ? [singleCoverUrl] : (albumCoverUrl ? [albumCoverUrl] : []),
                    default_price_data: {
                        currency: 'gbp',
                        unit_amount: 99, // £0.99
                    },
                    metadata: {
                        type: 'ringtone',
                        track: songTitle,
                        album: folderName
                    }
                });
                console.log(`   ✅ Created Stripe Ringtone: ${ringtoneName}`);
            } else {
                console.log(`   ⚠️ Ringtone already exists on Stripe.`);
            }
        }
    }

    // 5. Update Local Data (albumData.ts)
    // This part is tricky to do robustly with Regex.
    // Ideally we append the new object to the array.

    // Construct new Album Object
    const firstRow = albumRows[0];
    const newAlbum = {
        id: folderName.toLowerCase().replace(/[^a-z0-9]/g, '-'),
        title: folderName,
        artist: "SingIt Pop",
        releaseDate: excelDateToJSDate(firstRow[8]), // from Excel
        coverArt: albumCoverS3Key, // Store Key mostly
        year: new Date(excelDateToJSDate(firstRow[8])).getFullYear(),
        genre: [firstRow[1]], // Genre from first track
        type: 'studio', // Default?
        description: `New release: ${folderName}`,
        tracks: tracksData,
        folderPath: folderName // For image lookup
    };

    console.log("Generated Album Data:", JSON.stringify(newAlbum, null, 2));

    // Append to file
    // We read albumData, find the end of array, and insert.
    const albumDataPath = path.join(ROOT_DIR, 'src/data/albumData.ts');
    let content = fs.readFileSync(albumDataPath, 'utf-8');

    // Find the end of the array `];`
    // We look for the last `];`
    const insertIndex = content.lastIndexOf('];');

    if (insertIndex !== -1) {
        const insertion = `  ,\n  ${JSON.stringify(newAlbum, null, 2)}\n`;
        const newContent = content.slice(0, insertIndex) + insertion + content.slice(insertIndex);
        fs.writeFileSync(albumDataPath, newContent);
        console.log("✅ Updated local albumData.ts");
    } else {
        console.error("❌ Could not find insertion point in albumData.ts");
    }

    // 6. Regenerate albums.json & Sync S3
    // We can call independent scripts or just do it here.
    // Re-importing the modified TS file is hard without restart.
    // BUT we know the new array = old array + new item.
    // So we can just read the JSON from S3 -> append -> write back.
    // Or parse the local file again.

    // Simplest: Run the extract_json.py logic (or similar) to regen.
    // We can spawn a child process to run `tsx scripts/generate_albums_json.ts` IF we trust it works.
    // Or simpler: We just constructed the object! We can fetch current `albums.json` from S3, append, and push back.
    // Use S3 as source of truth for the JSON file.

    try {
        // Fetch current
        // actually, let's just run the generation script we made earlier?
        // But that requires the TS file to be compiled/readable.

        // Let's rely on the Python extractor we authorized earlier? 
        // Or just re-implement the extraction here since we are in a node script.
        // Actually, we can just append to the JSON directly if we fetch it from S3.
        // But upgrading the local `albumData.ts` is important for git tracking.
        // So we should regen JSON from local `albumData.ts`.

        console.log("🔄 Regenerating albums.json...");
        // Call the generation script (need to ensure it works)
        // We'll use the Python method since it was robust.
        // Need to ensure `extract_json.py` exists (we deleted it).
        // Let's recreate it or inline the logic?
        // Inline simple regex extraction for now since we just messed with the file structure cleanly.

        const { execSync } = await import('child_process');
        // We can just create the python script again temporarily
        fs.writeFileSync('scripts/temp_extract.py', `
import json
import re

with open('src/data/albumData.ts', 'r') as f:
    content = f.read()
# Simple bracket counting not needed if we just appended cleanly?
# Let's use the robust one just in case.
match = re.search(r'export const albums: Album\[\]\s*=\s*\[', content)
if match:
    start = match.end() - 1
    balance = 0
    end = -1
    for i in range(start, len(content)):
        if content[i] == '[': balance += 1
        elif content[i] == ']':
            balance -= 1
            if balance == 0:
                end = i + 1
                break
    if end != -1:
        json_str = content[start:end]
        json_str = re.sub(r',\s*([\]}])', r'\\1', json_str) # remove trail commas
        try:
            data = json.loads(json_str)
            with open('albums.json', 'w') as out:
                json.dump(data, out)
        except: pass
`);
        execSync('python3 scripts/temp_extract.py');
        execSync(`aws s3api put-object --bucket ${BUCKET_NAME} --key data/albums.json --body albums.json`);
        fs.unlinkSync('scripts/temp_extract.py');
        fs.unlinkSync('albums.json');
        console.log("✅ Synced updated albums.json to S3");

    } catch (e) {
        console.error("❌ Failed to sync albums.json", e);
    }

    console.log("✨ Ingestion Complete! ✨");
}

// CLI Entry
const folderNameArg = process.argv[2];
if (folderNameArg) {
    ingestAlbum(folderNameArg);
}
