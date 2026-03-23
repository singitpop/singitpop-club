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

async function getAllS3Keys() {
    let keys = new Set();
    let isTruncated = true;
    let continuationToken = undefined;
    
    console.log('Fetching S3 keys...');
    while (isTruncated) {
        const command = new ListObjectsV2Command({
            Bucket: S3_BUCKET,
            Prefix: 'albums/',
            ContinuationToken: continuationToken
        });
        const response = await client.send(command);
        (response.Contents || []).forEach(c => keys.add(c.Key));
        isTruncated = response.IsTruncated;
        continuationToken = response.NextContinuationToken;
    }
    console.log(`Found ${keys.size} objects in S3 albums/`);
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

async function run() {
    const s3Keys = await getAllS3Keys();
    const d = require('./src/data/albums.json');
    let missingMp3Count = 0;
    let missingWavCount = 0;
    
    const missingUploads = []; // Array of { key, possibleLocalPaths }

    for (const album of d) {
        for (const track of album.tracks) {
            if (track.audioUrl) {
                const u = new URL(track.audioUrl);
                const key = decodeURIComponent(u.pathname.substring(1));
                if (!s3Keys.has(key)) {
                    missingMp3Count++;
                    missingUploads.push({
                        type: 'mp3',
                        album: album.title,
                        track: track.title,
                        key: key,
                        sourceFolder: track.sourceFolder || album.folderPath
                    });
                }
            } else {
                console.log(`❌ Track missing audioUrl locally: ${album.title} - ${track.title}`);
            }

            if (track.highResUrl) {
                const u = new URL(track.highResUrl);
                const key = decodeURIComponent(u.pathname.substring(1));
                if (!s3Keys.has(key)) {
                    missingWavCount++;
                    missingUploads.push({
                        type: 'wav',
                        album: album.title,
                        track: track.title,
                        key: key,
                        sourceFolder: track.sourceFolder || album.folderPath
                    });
                }
            } else {
                // Lots of tracks don't have highResUrl, that's normal for non-VIP or standard uploads.
            }
        }
    }

    console.log(`Missing MP3s: ${missingMp3Count}`);
    console.log(`Missing WAVs: ${missingWavCount}`);
    
    if (missingUploads.length > 0) {
        console.log('\n--- Details of missing files ---');
        fs.writeFileSync('missing-files.json', JSON.stringify(missingUploads, null, 2));
        console.log('Saved to missing-files.json');
        
        let foundLocally = 0;
        let notFoundLocally = 0;
        const toUpload = []; // { localPath, key }
        
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
                         // Try fuzzy match on track title + extension
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
                foundLocally++;
                toUpload.push({ localPath: foundPath, key: missing.key });
            } else {
                notFoundLocally++;
                console.log(`Could not find local file for ${missing.album} - ${missing.track} (${missing.type})`);
            }
        }
        
        console.log(`\nFound local files to upload: ${foundLocally}, Still missing locally: ${notFoundLocally}`);
        fs.writeFileSync('to-upload.json', JSON.stringify(toUpload, null, 2));
        console.log('Saved upload list to to-upload.json');
        
    } else {
        console.log('\n✅ All URLs present in albums.json exist in S3!');
    }
}

run();
