
import fs from 'fs';
import path from 'path';
import { S3Client, PutObjectCommand } from '@aws-sdk/client-s3';
import dotenv from 'dotenv';
import { fileURLToPath } from 'url';

// Load Env
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const ROOT_DIR = path.resolve(__dirname, '..');
dotenv.config({ path: path.join(ROOT_DIR, '.env.local') });

const BUCKET_NAME = 'singitpop-music';
const REGION = process.env.AWS_REGION || 'eu-west-2';

const s3Client = new S3Client({
    region: REGION,
    credentials: {
        accessKeyId: process.env.AWS_ACCESS_KEY_ID!,
        secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY!,
    }
});

async function deleteAlbum(targetName: string) {
    console.log(`🗑️  Starting Removal for Album: "${targetName}"`);

    const albumDataPath = path.join(ROOT_DIR, 'src/data/albumData.ts');
    let content = fs.readFileSync(albumDataPath, 'utf-8');

    // 1. Extract the array content
    // We look for 'export const albums: Album[] = [' and the last '];'
    const startMarker = 'export const albums: Album[] = [';
    const startIndex = content.indexOf(startMarker);
    const lastSemi = content.lastIndexOf('];');

    if (startIndex === -1 || lastSemi === -1) {
        console.error("❌ Could not parse albumData.ts structure.");
        return;
    }

    const arrayStart = startIndex + startMarker.length - 1; // include '['
    const arrayEnd = lastSemi + 1; // include ']'

    const preContent = content.substring(0, arrayStart);
    const postContent = content.substring(arrayEnd + 1); // after '];'
    const arrayJsonStr = content.substring(arrayStart, arrayEnd + 1);

    // Sanitize for JSON parsing (remove trailing commas)
    // We need a resilient parser or just `eval` it since we are in node (and trust local file)
    // But eval is unsafe. Let's try to use Function constructor
    let albumsArray: any[] = [];
    try {
        // Remove comments if any?
        // Let's assume the file is clean JSON-like structure inside.
        // We can regex replace trailing commas for JSON.parse
        const jsonFriendly = arrayJsonStr
            .replace(/,\s*]/g, ']') // remove trailing comma at end of array
            .replace(/,\s*}/g, '}') // remove trailing comma at end of objects
        // Quotes? Keys might not be quoted in TS but usually are in generated code.
        // If keys are unquoted, JSON.parse fails.
        // Function() is better for JS object literals.

        // This evaluates dynamic content - strictly for local admin tool use.
        const extract = new Function(`return ${arrayJsonStr};`);
        albumsArray = extract();
    } catch (e) {
        console.error("❌ Failed to parse albums array:", e);
        // Fallback: Use the python script method?
        return;
    }

    // 2. Filter out the album
    const originalLength = albumsArray.length;
    const newAlbumsArray = albumsArray.filter(a =>
        a.title.toLowerCase() !== targetName.toLowerCase() &&
        a.folderPath?.toLowerCase() !== targetName.toLowerCase()
    );

    if (newAlbumsArray.length === originalLength) {
        console.error(`❌ Album not found matching: "${targetName}"`);
        return;
    }

    console.log(`✅ Removed album. Count: ${originalLength} -> ${newAlbumsArray.length}`);

    // 3. Reconstruct content
    // We format it nicely
    const newArrayStr = JSON.stringify(newAlbumsArray, null, 2);
    // Determine exact string to insert
    // We need to ensure we don't break the '];'

    // The preContent ends with `albumData.ts ... = `
    // effectively `... = `
    // we simply concat `[` + content + `]` is safer?
    // Wait, JSON.stringify includes []? Yes.

    const newFileContent = preContent + newArrayStr + ";" + postContent;

    fs.writeFileSync(albumDataPath, newFileContent);
    console.log("✅ Updated local albumData.ts");

    // 4. Update S3 (albums.json)
    try {
        // Just upload the filtered array as json
        console.log("🔄 Syncing removal to S3...");
        const jsonBody = JSON.stringify(newAlbumsArray);
        await s3Client.send(new PutObjectCommand({
            Bucket: BUCKET_NAME,
            Key: 'data/albums.json',
            Body: jsonBody,
            ContentType: 'application/json'
        }));
        console.log("✅ S3 albums.json updated. Album is gone from live site.");
    } catch (e) {
        console.error("❌ Failed to sync to S3", e);
    }

    console.log("\n⚠️  Note: This operation successfully hid the album from the website.");
    console.log("    Audio files and Stripe products were NOT deleted.");
    console.log("    To fully delete, remove files from S3 and archive Stripe products manually.");
}

// CLI Entry
const targetArg = process.argv[2];
if (targetArg) {
    deleteAlbum(targetArg);
}
