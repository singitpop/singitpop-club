const { S3Client, PutObjectCommand, ListObjectsV2Command } = require("@aws-sdk/client-s3");
const fs = require('fs');
const path = require('path');
require('dotenv').config({ path: '.env.local' });

const S3_BUCKET = process.env.AWS_S3_BUCKET || "singitpop-music";
const AWS_REGION = "eu-north-1";
const SOURCE_DIR = "/Users/garybirrell/Desktop/Singitpop/READY FOR WEBSITE";

const s3Client = new S3Client({
    region: AWS_REGION,
    credentials: {
        accessKeyId: process.env.AWS_ACCESS_KEY_ID,
        secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
    },
});

async function uploadFile(filePath, key) {
    try {
        const fileContent = fs.readFileSync(filePath);
        const command = new PutObjectCommand({
            Bucket: S3_BUCKET,
            Key: key,
            Body: fileContent,
        });
        await s3Client.send(command);
        console.log(`✅ Uploaded: ${key}`);
    } catch (err) {
        console.error(`❌ Error uploading ${key}:`, err);
    }
}

async function getExistingFiles(prefix) {
    try {
        const command = new ListObjectsV2Command({
            Bucket: S3_BUCKET,
            Prefix: prefix
        });
        const response = await s3Client.send(command);
        // Returns a Set of full keys that exist
        return new Set(response.Contents?.map(c => c.Key) || []);
    } catch (e) {
        console.error("Error checking S3:", e);
        return new Set();
    }
}

async function scanAndUpload(dir) {
    if (!fs.existsSync(dir)) {
        console.error(`Directory not found: ${dir}`);
        return;
    }

    const items = fs.readdirSync(dir, { withFileTypes: true });

    // TARGET ALBUMS FILTER
    const targetAlbums = [
        "quiet turning",
        "boots in the autumn dust",
        "september afterglow",
        "september turns gold",
        "when the lights go gold"
    ];

    for (const item of items) {
        if (item.isDirectory()) {
            const dirname = item.name;
            // Skip website and untitled folders
            if (dirname === 'website' || dirname === 'untitled folder') continue;

            const dirnameLower = dirname.toLowerCase().trim();
            const isTarget = targetAlbums.some(t => dirnameLower.includes(t) || t.includes(dirnameLower));
            if (!isTarget) {
                continue;
            }

            const slug = dirname.toLowerCase().replace(/[^a-z0-9 ]/g, '').replace(/ /g, '-');
            const albumPath = path.join(dir, dirname);

            console.log(`\n📂 Processing Album: ${dirname} -> ${slug}`);

            // Check what's already on S3 for this album
            const s3Prefix = `albums/${slug}/`;
            const existingKeys = await getExistingFiles(s3Prefix);

            // Recursive function to find all audio files
            function getAudioFiles(dirPath) {
                let results = [];
                const list = fs.readdirSync(dirPath);
                list.forEach(file => {
                    const filePath = path.join(dirPath, file);
                    const stat = fs.statSync(filePath);
                    if (stat && stat.isDirectory()) {
                        results = results.concat(getAudioFiles(filePath));
                    } else {
                        if (file.endsWith('.wav') || file.endsWith('.mp3')) {
                            results.push(filePath);
                        }
                    }
                });
                return results;
            }

            const audioFiles = getAudioFiles(albumPath);

            for (const filePath of audioFiles) {
                const filename = path.basename(filePath);

                // Exclude version duplicates
                const baseName = path.parse(filename).name;
                const hasVersionNumber = /[- ]\d+$/.test(baseName) || /\(\d+\)$/.test(baseName);
                if (hasVersionNumber) {
                    // console.log(`   ⚠️  Skipping duplicate/version: ${filename}`);
                    continue;
                }

                const key = `albums/${slug}/${filename}`;

                if (existingKeys.has(key)) {
                    // console.log(`   ⏭️  Skipping existing: ${filename}`);
                    continue;
                }

                console.log(`   Uploading ${filename}...`);
                await uploadFile(filePath, key);
            }

            // Upload cover image if present at root of the album folder
            const topLevelFiles = fs.readdirSync(albumPath);
            const coverFile = topLevelFiles.find(f => /^cover\.(png|jpg|webp)$/i.test(f));
            if (coverFile) {
                const coverKey = `albums/${slug}/cover.png`;
                if (!existingKeys.has(coverKey)) {
                    console.log(`   Uploading cover image...`);
                    await uploadFile(path.join(albumPath, coverFile), coverKey);
                }
            }
        }
    }
}

async function uploadRingtones() {
    const ringtonesDir = path.join(__dirname, '../public/ringtones');
    if (!fs.existsSync(ringtonesDir)) {
        console.log(`Directory not found: ${ringtonesDir}. Skipping ringtones.`);
        return;
    }

    console.log(`\n📂 Processing Ringtones: ${ringtonesDir}`);
    const s3Prefix = `ringtones/`;
    const existingKeys = await getExistingFiles(s3Prefix);

    const items = fs.readdirSync(ringtonesDir);
    for (const filename of items) {
        if (!filename.endsWith('.mp3') && !filename.endsWith('.m4r')) continue;

        const key = `${s3Prefix}${filename}`;
        if (existingKeys.has(key)) {
            continue;
        }

        console.log(`   Uploading ringtone ${filename}...`);
        await uploadFile(path.join(ringtonesDir, filename), key);
    }
}

async function run() {
    console.log("🚀 Starting S3 Upload Script (Node.js)");
    await scanAndUpload(SOURCE_DIR);
    await uploadRingtones();
}

run();
