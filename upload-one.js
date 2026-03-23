const fs = require('fs');
const path = require('path');
const { S3Client, PutObjectCommand } = require('@aws-sdk/client-s3');
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

const albumTitle = process.argv[2];
const trackTitle = process.argv[3];

if (!albumTitle || !trackTitle) {
    console.error("Please provide an album title and a track title as arguments.");
    process.exit(1);
}

function findAudioFiles(dirPath, titleQuery) {
    let results = [];
    if (!fs.existsSync(dirPath)) {
        const parentDir = path.dirname(dirPath);
        if (fs.existsSync(parentDir)) {
            const items = fs.readdirSync(parentDir);
            const target = path.basename(dirPath).toLowerCase().replace(/[^a-z0-9]/g, '');
            const match = items.find(i => i.toLowerCase().replace(/[^a-z0-9]/g, '') === target);
            if (match) {
                dirPath = path.join(parentDir, match);
            } else {
                 return results;
            }
        } else {
            return results;
        }
    }
    
    const items = fs.readdirSync(dirPath, { withFileTypes: true });
    const normalize = (s) => s.toLowerCase().replace(/['"’.,!&?-]/g, '').replace(/[^a-z0-9]/g, '');
    let queryNorm = normalize(titleQuery);
    
    for (const item of items) {
        const fullPath = path.join(dirPath, item.name);
        if (item.isDirectory()) {
            results = results.concat(findAudioFiles(fullPath, titleQuery));
        } else {
            const ext = path.extname(item.name).toLowerCase();
            if (ext === '.mp3' || ext === '.wav') {
                const fileNorm = normalize(path.basename(item.name, ext));
                
                if (fileNorm === queryNorm || 
                    fileNorm.includes(queryNorm) || 
                    queryNorm.includes(fileNorm) ||
                    fileNorm.replace(/^[0-9]+/, '').includes(queryNorm) ||
                    (queryNorm.length > 10 && fileNorm.includes(queryNorm.substring(0, 10))) ||
                    (queryNorm.length > 5 && fileNorm.includes(queryNorm.substring(0, queryNorm.length - 2)))
                ) {
                    results.push(fullPath);
                }
            }
        }
    }
    return results;
}

async function run() {
    console.log(`🚀 Searching for ONE track: '${trackTitle}' in album '${albumTitle}'...`);
    const d = require('./src/data/albums.json');

    const albumData = d.find(a => 
        a.title.toLowerCase().replace(/[^a-z0-9]/g, '').includes(albumTitle.toLowerCase().replace(/[^a-z0-9]/g, '')) || 
        (a.folderPath && a.folderPath.toLowerCase().replace(/[^a-z0-9]/g, '').includes(albumTitle.toLowerCase().replace(/[^a-z0-9]/g, '')))
    );
    
    const localFolder = albumData?.folderPath || albumTitle;
    let s3FolderSlug = localFolder.toLowerCase().replace(/[^a-z0-9 ]/g, '').replace(/ /g, '-');
    let searchDir = path.join(SOURCE_DIR, localFolder);
    
    if (!fs.existsSync(searchDir)) {
      const allDirs = fs.readdirSync(SOURCE_DIR);
      const fuzzyDir = allDirs.find(d => d.toLowerCase().replace(/[^a-z0-9]/g,'') === localFolder.toLowerCase().replace(/[^a-z0-9]/g,''))
      if(fuzzyDir) {
          searchDir = path.join(SOURCE_DIR, fuzzyDir);
      }
    }

    const matches = findAudioFiles(searchDir, trackTitle);
    
    if (matches.length === 0) {
        console.log(`❌ Could not find local file for: ${trackTitle}`);
        return;
    }

    const uniqueMatches = [...new Set(matches)];
    let uploaded = false;

    for (const filePath of uniqueMatches) {
        const filename = path.basename(filePath);
        const key = `albums/${s3FolderSlug}/${filename}`;
        console.log(`☁️  Uploading: ${filename} -> s3://${S3_BUCKET}/${key}`);
        
        try {
            const fileContent = fs.readFileSync(filePath);
            const command = new PutObjectCommand({
                Bucket: S3_BUCKET,
                Key: key,
                Body: fileContent,
            });
            await client.send(command);
            console.log(`✅ Success uploading ${filename}!`);
            uploaded = true;
            
            if (albumData) {
                const trackData = albumData.tracks.find(t => 
                    t.title.toLowerCase().replace(/[^a-z0-9]/g, '') === trackTitle.toLowerCase().replace(/[^a-z0-9]/g, '') ||
                    t.title.toLowerCase().replace(/[^a-z]/g, '').includes(trackTitle.toLowerCase().replace(/[^a-z]/g, '')) ||
                    trackTitle.toLowerCase().replace(/[^a-z]/g, '').includes(t.title.toLowerCase().replace(/[^a-z]/g, ''))
                );
                if (trackData) {
                    const url = `https://${S3_BUCKET}.s3.${AWS_REGION}.amazonaws.com/${encodeURI(key).replace(/%20/g, '%20')}`;
                    if (filePath.toLowerCase().endsWith('.mp3')) trackData.audioUrl = url;
                    if (filePath.toLowerCase().endsWith('.wav')) trackData.highResUrl = url;
                }
            }

        } catch (err) {
            console.log(`❌ Upload failed for ${filename}:`, err.message);
        }
    }
    
    if (uploaded) {
        fs.writeFileSync('./src/data/albums.json', JSON.stringify(d, null, 2));
        console.log(`✅ Saved updated URL to albums.json`);
    }
}

run();
