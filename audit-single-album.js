const fs = require('fs');
const { S3Client, ListObjectsV2Command, PutObjectCommand } = require('@aws-sdk/client-s3');
const path = require('path');
require('dotenv').config({ path: '.env.local' });

const S3_BUCKET = process.env.AWS_S3_BUCKET || "singitpop-music";
const AWS_REGION = "eu-north-1";
const SOURCE_DIR = "/Users/garybirrell/Desktop/Singitpop/READY FOR WEBSITE";

const client = new S3Client({
    region: AWS_REGION,
    credentials: {
        accessKeyId: process.env.AWS_ACCESS_KEY_ID,
        secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
    },
});

async function getAllS3KeysForPrefix(prefix) {
    let keys = new Set();
    let isTruncated = true;
    let continuationToken = undefined;
    
    while (isTruncated) {
        const command = new ListObjectsV2Command({
            Bucket: S3_BUCKET,
            Prefix: prefix,
            ContinuationToken: continuationToken
        });
        const response = await client.send(command).catch(e => {
             console.error('Error fetching S3 keys:', e.message);
             return { Contents: [], IsTruncated: false };
        });
        (response.Contents || []).forEach(c => keys.add(c.Key));
        isTruncated = response.IsTruncated;
        continuationToken = response.NextContinuationToken;
    }
    return keys;
}

// Recursive function to find all audio files in a directory
function getAudioFiles(dirPath) {
    let results = [];
    let list;
    try {
        list = fs.readdirSync(dirPath);
    } catch (e) {
        return [];
    }
    list.forEach(file => {
        const filePath = path.join(dirPath, file);
        const stat = fs.statSync(filePath);
        if (stat && stat.isDirectory()) {
            results = results.concat(getAudioFiles(filePath));
        } else {
            if (file.toLowerCase().endsWith('.wav') || file.toLowerCase().endsWith('.mp3')) {
                results.push(filePath);
            }
        }
    });
    return results;
}

async function uploadFile(filePath, key) {
    try {
        const fileContent = fs.readFileSync(filePath);
        const command = new PutObjectCommand({
            Bucket: S3_BUCKET,
            Key: key,
            Body: fileContent,
        });
        await client.send(command);
        console.log(`✅ Successfully uploaded: ${key}`);
        return true;
    } catch (err) {
        console.error(`❌ Error uploading ${key}:`, err.message);
        return false;
    }
}

async function run() {
    const targetAlbumId = process.argv[2];
    if (!targetAlbumId) {
        console.log("Please provide an album ID to audit. Example: node audit-single-album.js nashville-in-june-2025");
        console.log("Available VIP albums:");
        const d = require('./src/data/albums.json');
        d.filter(a => a.accessTier === 'vip').forEach(a => console.log(`  - ${a.title} (${a.id})`));
        return;
    }

    const d = require('./src/data/albums.json');
    const album = d.find(a => a.id === targetAlbumId);
    
    if (!album) {
        console.log(`Album not found: ${targetAlbumId}`);
        return;
    }

    console.log(`\n=== Auditing Album: ${album.title} ===`);
    
    // Check what exists in S3 for this album's likely folder
    const prefix = `albums/${album.folderPath.toLowerCase().replace(/[^a-z0-9 ]/g, '').replace(/ /g, '-')}/`;
    const s3Keys = await getAllS3KeysForPrefix(prefix);
    console.log(`Found ${s3Keys.size} objects in S3 under prefix ${prefix}`);

    let missingUploads = [];
    let checkedTracks = 0;

    for (const track of album.tracks) {
        checkedTracks++;
        
        // Check MP3
        if (track.audioUrl) {
            const u = new URL(track.audioUrl);
            const key = decodeURIComponent(u.pathname.substring(1));
            // Check full S3 just in case the prefix wasn't perfect, but checking exact key is fastest
            try {
               await client.send(new ListObjectsV2Command({Bucket: S3_BUCKET, Prefix: key, MaxKeys: 1}))
                 .then(res => {
                     if (!res.Contents || res.Contents.length === 0 || res.Contents[0].Key !== key) {
                         missingUploads.push({ type: 'mp3', track: track.title, key: key, sourceFolder: track.sourceFolder || album.folderPath });
                     }
                 });
            } catch(e) {}
        }

        // Check WAV
        if (track.highResUrl) {
            const u = new URL(track.highResUrl);
            const key = decodeURIComponent(u.pathname.substring(1));
            try {
               await client.send(new ListObjectsV2Command({Bucket: S3_BUCKET, Prefix: key, MaxKeys: 1}))
                 .then(res => {
                     if (!res.Contents || res.Contents.length === 0 || res.Contents[0].Key !== key) {
                         missingUploads.push({ type: 'wav', track: track.title, key: key, sourceFolder: track.sourceFolder || album.folderPath });
                     }
                 });
            } catch(e) {}
        }
    }

    if (missingUploads.length === 0) {
        console.log(`✅ All ${checkedTracks} tracks for '${album.title}' are fully uploaded to S3!`);
        return;
    }

    console.log(`\n⚠️ Found ${missingUploads.length} missing files in S3. Searching for local files...`);
    
    let uploadedCount = 0;
    let notFoundCount = 0;

    for (const missing of missingUploads) {
        let foundPath = null;
        if (missing.sourceFolder) {
            const searchDir = path.join(SOURCE_DIR, missing.sourceFolder);
            if (fs.existsSync(searchDir)) {
                const localFiles = getAudioFiles(searchDir);
                const targetExt = missing.type === 'wav' ? '.wav' : '.mp3';
                const targetFilename = path.basename(missing.key).toLowerCase();
                
                const match = localFiles.find(f => path.basename(f).toLowerCase() === targetFilename);
                if (match) {
                    foundPath = match;
                } else {
                     const fuzzyMatch = localFiles.find(f => 
                         path.basename(f).toLowerCase().endsWith(targetExt) &&
                         (path.basename(f).toLowerCase().includes(missing.track.toLowerCase()) || 
                         missing.track.toLowerCase().includes(path.basename(f).replace(/\.(mp3|wav)$/i, '').toLowerCase()))
                     );
                     if (fuzzyMatch) {
                         foundPath = fuzzyMatch;
                     }
                }
            }
        }
        
        if (foundPath) {
            console.log(`Uploading missing ${missing.type.toUpperCase()}: ${missing.track} -> ${missing.key}`);
            const success = await uploadFile(foundPath, missing.key);
            if (success) uploadedCount++;
        } else {
            console.log(`❌ Could not locate local file for ${missing.track} (${missing.type})!`);
            notFoundCount++;
        }
    }
    
    console.log(`\n=== Audit Complete for ${album.title} ===`);
    console.log(`Tracks checked: ${checkedTracks}`);
    console.log(`Missing files fixed (uploaded): ${uploadedCount}`);
    console.log(`Files still missing locally: ${notFoundCount}`);
}

run();
