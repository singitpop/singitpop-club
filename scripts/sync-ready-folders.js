require('dotenv').config({ path: '.env.local' });
const { S3Client, PutObjectCommand } = require('@aws-sdk/client-s3');
const fs = require('fs');
const path = require('path');

const CODE_REGION = "eu-north-1";
const BUCKET = process.env.AWS_S3_BUCKET || "singitpop-music";
const READY_FOLDER = "/Users/garybirrell/Desktop/Singitpop/READY FOR WEBSITE";
const ALBUM_DATA_PATH = path.join(__dirname, '../src/data/albumData.ts');

const DRY_RUN = process.env.DRY_RUN === 'true';

const s3Client = new S3Client({
    region: CODE_REGION,
    credentials: {
        accessKeyId: process.env.AWS_ACCESS_KEY_ID,
        secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
    }
});

// Helper to normalize strings for cleanup comparison
function normalize(str) {
    return str.toLowerCase().replace(/[^a-z0-9]/g, '');
}

function parseAlbumData() {
    console.log("📖 Parsing albumData.ts...");
    const content = fs.readFileSync(ALBUM_DATA_PATH, 'utf8');

    // We want to map: sourceFolder (or title) -> id (slug)
    // Regex is tricky for JSON-like TS, but let's try capture blocks
    // This is a rough parser, assuming standard formatting we've seen

    const albums = [];
    const idRegex = /"id":\s*"([^"]+)"/g;
    const titleRegex = /"title":\s*"([^"]+)"/g;
    const folderRegex = /"folderPath":\s*"([^"]+)"/g; // We saw "folderPath" in some entries?
    // Actually albumData structure seems to be:
    // { id: "...", title: "...", folderPath?: "..." ... }

    // Simpler: Split by "id": "..." and then look for Title/Folder inside the block? 
    // Or just regex all and try to zip them? No, unsafe.

    // Robust approach: Use AST? Too heavy. 
    // Let's rely on the file structure we verified earlier.
    // It's an array of objects.

    // Let's try to eval it? No, it's TS.
    // Let's use string searching.
    const blocks = content.split('  {\n    "id":'); // Rough split on start of object

    blocks.forEach(block => {
        if (!block.includes('"title":')) return;

        // Extract ID (it was in the split delimiter, need to recover or regex inside?)
        // The split eats the "id": part. The 'block' starts with ' "slug", ...'
        // Wait, split removes the delimiter.

        // Let's try matching the ID at the very start of the block if we handle the split right.
        // Actually, let's just Regex the whole file globally.

        /* 
           Entry format:
           {
             "id": "slug",
             "title": "Title",
             ...
             "folderPath": "Path" (Optional)
           }
        */
    });

    // New Strategy: Regex iterate
    // Capture group 1: ID, Group 2: Title. 
    // We need to handle potential distance between them.

    // Better: Just regex each field independently and hope order is preserved (Usually is in this file).
    // Or just look for unique IDs and associate them manually?

    // Valid strategy for THIS user's file:
    // It seems consistent.

    const manualMap = {};
    let match;
    const re = /"id":\s*"([^"]+)",\s*\n\s*"title":\s*"([^"]+)"/g;

    while ((match = re.exec(content)) !== null) {
        const id = match[1];
        const title = match[2];
        manualMap[normalize(title)] = id;

        // Also look for folderPath if it exists nearby?
        // Let's just use Title for now, and maybe "sourceFolder" from tracks?
    }

    // Also add explicit mappings we know from "sourceFolder" in track entries
    const sourceRe = /"sourceFolder":\s*"([^"]+)",\s*\n\s*"albumId":\s*"([^"]+)"/g;
    while ((match = sourceRe.exec(content)) !== null) {
        const source = match[1];
        const id = match[2];
        manualMap[normalize(source)] = id;
    }

    return manualMap;
}

async function sync() {
    console.log(`🚀 Starting Bulk Sync (DRY_RUN: ${DRY_RUN})`);
    console.log(`Source: ${READY_FOLDER}`);

    if (!fs.existsSync(READY_FOLDER)) {
        console.error("❌ Ready folder not found!");
        return;
    }

    const albumMap = parseAlbumData();
    console.log(`ℹ️  Loaded ${Object.keys(albumMap).length} album mappings from code.`);

    const localFolders = fs.readdirSync(READY_FOLDER);

    for (const folder of localFolders) {
        if (folder.startsWith('.')) continue; // skip .DS_Store

        const folderPath = path.join(READY_FOLDER, folder);
        if (!fs.statSync(folderPath).isDirectory()) continue;

        const normFolder = normalize(folder);
        // Try exact title/source match
        let targetSlug = albumMap[normFolder];

        // Fallback: Try removing year/suffix?
        if (!targetSlug) {
            // "Album Name 2024 - Live" -> "album-name-2024"
            // Try searching values?
            // Or fuzzy match keys?
        }

        if (targetSlug) {
            console.log(`\n✅ MATCH: "${folder}" -> ID: "${targetSlug}"`);
            await uploadFolder(folderPath, targetSlug);
        } else {
            console.log(`\n⚠️  SKIPPED: "${folder}" (No matching ID found in albumData.ts)`);
            console.log(`   (Debug: normalized key was '${normFolder}')`);
        }
    }
}

async function uploadFolder(dir, slug) {
    // Recursive upload of music files
    async function traverse(currentDir) {
        const items = fs.readdirSync(currentDir);
        for (const item of items) {
            const itemPath = path.join(currentDir, item);
            const stat = fs.statSync(itemPath);

            if (stat.isDirectory()) {
                await traverse(itemPath);
            } else if (item.endsWith('.mp3') || item.endsWith('.wav')) {
                const targetKey = `albums/${slug}/${item}`; // Flattened!

                if (DRY_RUN) {
                    console.log(`   [DRY] Would upload: ${item} -> ${targetKey}`);
                } else {
                    console.log(`   Uploading ${item}...`);
                    try {
                        const fileContent = fs.readFileSync(itemPath);
                        await s3Client.send(new PutObjectCommand({
                            Bucket: BUCKET,
                            Key: targetKey,
                            Body: fileContent
                        }));
                    } catch (e) {
                        console.error(`   ❌ Failed to upload ${item}: ${e.message}`);
                    }
                }
            }
        }
    }
    await traverse(dir);
}

sync();
