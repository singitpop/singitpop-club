require('dotenv').config({ path: '.env.local' });
const { S3Client, ListObjectsV2Command } = require('@aws-sdk/client-s3');
const fs = require('fs');
const path = require('path');

const CODE_REGION = "eu-north-1";
const BUCKET = process.env.AWS_S3_BUCKET || "singitpop-music";
const ALBUM_DATA_PATH = path.join(__dirname, '../src/data/albumData.ts');

const s3Client = new S3Client({
    region: CODE_REGION,
    credentials: {
        accessKeyId: process.env.AWS_ACCESS_KEY_ID,
        secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
    }
});

function normalize(str) {
    return str.toLowerCase().replace(/[^a-z0-9]/g, '');
}

async function reconcile() {
    console.log("🚀 Starting Filename Reconciliation...");

    // 1. Read albumData.ts
    let data = fs.readFileSync(ALBUM_DATA_PATH, 'utf8');

    // 2. Find all Unique Album Slugs in the URLs
    // Regex to capture: albums/ (slug) / (filename)
    const urlRegex = /https:\/\/singitpop-music\.s3\.eu-north-1\.amazonaws\.com\/albums\/([^\/]+)\/([^\"]+)/g;

    const slugs = new Set();
    let match;
    while ((match = urlRegex.exec(data)) !== null) {
        slugs.add(match[1]);
    }

    console.log(`Found ${slugs.size} album slugs in code.`);

    // 3. For each slug, list S3 files and build a map
    for (const slug of slugs) {
        console.log(`\nProcessing: ${slug}`);

        const listCmd = new ListObjectsV2Command({
            Bucket: BUCKET,
            Prefix: `albums/${slug}/`,
        });

        try {
            const listData = await s3Client.send(listCmd);
            if (!listData.Contents) {
                console.log(`   ⚠️ No files found in S3 for ${slug}`);
                continue;
            }

            const s3Files = listData.Contents.map(c => c.Key.split('/').pop()); // Just filenames

            // Map Valid Normalized Name -> Real S3 Filename
            const normalizationMap = {};
            s3Files.forEach(f => {
                if (f.endsWith('.mp3') || f.endsWith('.wav')) {
                    normalizationMap[normalize(f)] = f;
                }
            });

            // 4. Replace in File Content (specific to this slug details)
            // We scan the file content for URLs belonging to this slug
            const slugRegex = new RegExp(`https:\/\/singitpop-music\.s3\.eu-north-1\.amazonaws\.com\/albums\/${slug}\/([^\"]+)`, 'g');

            data = data.replace(slugRegex, (fullMatch, currentFilename) => {
                // Determine if replacement needed
                const decodedCurrent = decodeURIComponent(currentFilename);
                const normCurrent = normalize(decodedCurrent);

                // Try to find match
                const match = normalizationMap[normCurrent];

                if (match) {
                    if (match !== decodedCurrent) {
                        console.log(`   ✅ Fixing: ${decodedCurrent} -> ${match}`);
                        return `https://singitpop-music.s3.eu-north-1.amazonaws.com/albums/${slug}/${encodeURIComponent(match)}`;
                    } else {
                        // console.log(`   Matches: ${decodedCurrent}`);
                    }
                } else {
                    console.log(`   ❌ No match found for: ${decodedCurrent}`);
                    // Check for partial matches or "starts with" logic?
                    // E.g. "01-song.mp3" vs "Song.mp3"
                    // Try stripping leading numbers/dashes from currentFilename
                    const stripped = decodedCurrent.replace(/^[0-9]+-/, '');
                    const normStripped = normalize(stripped);
                    const fuzzyMatch = normalizationMap[normStripped];

                    if (fuzzyMatch) {
                        console.log(`   ✨ Fuzzy Fix: ${decodedCurrent} -> ${fuzzyMatch}`);
                        return `https://singitpop-music.s3.eu-north-1.amazonaws.com/albums/${slug}/${encodeURIComponent(fuzzyMatch)}`;
                    }
                }
                return fullMatch; // No change
            });

        } catch (e) {
            console.error(`Error processing ${slug}:`, e);
        }
    }

    // 5. Write back
    fs.writeFileSync(ALBUM_DATA_PATH, data);
    console.log("\n🎉 Done! Updated albumData.ts");
}

reconcile();
