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

const missingTracks = [
    { albumFolder: "Empire Under lights", title: "Locked & Loaded" },
    { albumFolder: "Ethereal Highlands", title: "The Spirit Of Alba" },
    { albumFolder: "Heartland Rhythms", altFolder: "Heartland Rythms", title: "Small Town Saturday Nights" },
    { albumFolder: "Heartland Rhythms", altFolder: "Heartland Rythms", title: "Hometown Heros" },
    { albumFolder: "Heartland Rhythms", altFolder: "Heartland Rythms", title: "Dirtroads And Day Dreams" },
    { albumFolder: "Echoes of Us", altFolder: "Echos Of Us", title: "Throught The Mirror" },
    { albumFolder: "Echoes of Us", altFolder: "Echos Of Us", title: "Echoes Of Us" },
    { albumFolder: "Glass Bloom", title: "Pulse Armor" },
    { albumFolder: "Summer Fever", altFolder: "Summer fever", title: "Tides And Tramlines" },
    { albumFolder: "Line Dancing After Dark", title: "Neon Boot Scooting" },
    { albumFolder: "Line Dancing After Dark", title: "Dust And Dreams" },
    { albumFolder: "Line Dancing After Dark", title: "Whiskey Slide" },
    { albumFolder: "Wildcards and Whiskey", title: "Burnt Toast & Goodbye Notes" },
    { albumFolder: "Wildcards and Whiskey", title: "Jokers & Lovers" },
    { albumFolder: "Wildcards and Whiskey", title: "Wildcards & Whiskey" },
    { albumFolder: "Endless Glow", title: "Evening Serernade" },
    { albumFolder: "Endless Glow", title: "Echos Of The Night" },
    { albumFolder: "Dust and Diamonds", title: "Rough Hands Bright Dreeams" },
    { albumFolder: "Winding Roads", title: "The Compass In My Soal" },
    { albumFolder: "Winding Roads", title: "Winding Road Finale" },
    { albumFolder: "Hallowave Dance of the shadows", title: "Bootprints In The Fall" },
    { albumFolder: "Shadows and Fires", title: "Hollow Lights" },
    { albumFolder: "Electric Sleigh", title: "Neon Slowfall" },
    { albumFolder: "Electric Sleigh", title: "Sleighbells And Synths" },
    { albumFolder: "Step Into the Light", altFolder: "Live Step Into the Light", title: "Heaven In The Hills" },
    { albumFolder: "Echoes of Light", title: "The Light We Leve Behind" },
    { albumFolder: "Valentine Country", title: "Love You Better Than Yesterday" },
    { albumFolder: "Valentine Country", title: "Red Roses And Them Old Boots" },
    { albumFolder: "Valentine Country", title: "Two Hearts One Highway" },
    { albumFolder: "A Love That Never Ends", title: "Stay In Your Arms" },
    { albumFolder: "A Love That Never Ends", title: "Breathless When You're Near" },
    { albumFolder: "Spring Begins Inside You", altFolder: "Spring Begins Inside You", title: "Where The Colours Come From" },
    { albumFolder: "Spring Begins Inside You", altFolder: "Spring Begins Inside You", title: "March Comes Carrying Light" },
    { albumFolder: "Spring Begins Inside You", altFolder: "Spring Begins Inside You", title: "What We Plant In Ourselves" },
    { albumFolder: "Spring Begins Inside You", altFolder: "Spring Begins Inside You", title: "Bloom My Heart Again" },
    { albumFolder: "Spring Begins Inside You", altFolder: "Spring Begins Inside You", title: "Spring Begins In You Finale" },
    { albumFolder: "Heart of the Sky Drums", title: "Spirit Walker" },
    { albumFolder: "Nashville in June", title: "Neon don't sleep" },
    { albumFolder: "Nashville in June", title: "June Didn't end" },
    { albumFolder: "Before the Light", title: "Velvet Minarets" },
    { albumFolder: "May in Motion", title: "Green Lights Only" },
    { albumFolder: "Forever Starts Today (Country Music for Weddings)", altFolder: "Forever Starts Today - Country Album", title: "With You, I’m Home" },
    { albumFolder: "Popstar Winter Wonderland", altFolder: "Pop Star Winter Wonderland", title: "Snow Is All Around Us" },
    { albumFolder: "Happily Ever After Dreams", title: "Under The Moolight Sea" },
    { albumFolder: "Waves of Tranquility Deep House Reflections", title: "Lost In The Grove" },
    { albumFolder: "Boots and Beats Country Line Dance Anthems", title: "Dancin' In The Moonlight" },
    { albumFolder: "Boots and Beats Country Line Dance Anthems", title: "Kickin' Up Dust" },
    { albumFolder: "Boots and Beats Country Line Dance Anthems", title: "Jean's Got The Boots" },
    { albumFolder: "Boots and Beats Country Line Dance Anthems", title: "Last Call At Joe's" },
    { albumFolder: "Highways of the Heart", title: "Wild Open Road" },
    { albumFolder: "Highways of the Heart", title: "Echos Of Yesterday" },
    { albumFolder: "Whispers of the Heart Country Ballads for the Soul", title: "Our Forever Starts Today New" },
    { albumFolder: "Love In Bloom", title: "Hearstrings" },
    { albumFolder: "Starlight Frequencies", title: "May The Fourth Remind Us" },
    { albumFolder: "Starlight Frequencies", title: "Glactic Dreams" }
];

function findAudioFiles(dirPath, titleQuery) {
    let results = [];
    if (!fs.existsSync(dirPath)) {
        // Try fuzzy folder name matching if precise folder doesn't exist
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
    
    // Normalize string for fuzzy matching (remove apostrophes, punctuation, smart quotes, extra spaces)
    const normalize = (s) => s.toLowerCase().replace(/['"’.,!&?-]/g, '').replace(/[^a-z0-9]/g, '');
    let queryNorm = normalize(titleQuery);
    
    // Handle typos in the user's prompt by only matching significant parts if needed
    for (const item of items) {
        const fullPath = path.join(dirPath, item.name);
        if (item.isDirectory()) {
            results = results.concat(findAudioFiles(fullPath, titleQuery));
        } else {
            const ext = path.extname(item.name).toLowerCase();
            if (ext === '.mp3' || ext === '.wav') {
                const fileNorm = normalize(path.basename(item.name, ext));
                
                // Direct match or partial match
                if (fileNorm === queryNorm || 
                    fileNorm.includes(queryNorm) || 
                    queryNorm.includes(fileNorm) ||
                    // E.g. "01 - Neon Dont Sleep" contains "neondontsleep"
                    fileNorm.replace(/^[0-9]+/, '').includes(queryNorm) ||
                    // Levenshtein style forgiving (often track numbers and prefixes get in the way)
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
    console.log("🚀 Starting Targeted S3 Upload...");
    let successCount = 0;
    let missingCount = 0;

    const d = require('./src/data/albums.json');

    for (const track of missingTracks) {
        const albumData = d.find(a => 
            a.title.toLowerCase().replace(/[^a-z0-9]/g, '').includes(track.albumFolder.toLowerCase().replace(/[^a-z0-9]/g, '')) || 
            (a.folderPath && a.folderPath.toLowerCase().replace(/[^a-z0-9]/g, '').includes(track.albumFolder.toLowerCase().replace(/[^a-z0-9]/g, '')))
        );
        
        // Priority to user provided altFolder, else DB folderPath, else user provided albumFolder
        const localFolder = track.altFolder || albumData?.folderPath || track.albumFolder;
        
        let s3FolderSlug = localFolder.toLowerCase().replace(/[^a-z0-9 ]/g, '').replace(/ /g, '-');
        
        let searchDir = path.join(SOURCE_DIR, localFolder);
        
        if (!fs.existsSync(searchDir)) {
          // fallback directory fuzzy match
          const allDirs = fs.readdirSync(SOURCE_DIR);
          const fuzzyDir = allDirs.find(d => d.toLowerCase().replace(/[^a-z0-9]/g,'') === localFolder.toLowerCase().replace(/[^a-z0-9]/g,''))
          if(fuzzyDir) {
              searchDir = path.join(SOURCE_DIR, fuzzyDir);
          }
        }

        console.log(`\n🔍 Searching for '${track.title}' in "${localFolder}"...`);
        
        const matches = findAudioFiles(searchDir, track.title);
        
        if (matches.length === 0) {
            console.log(`❌ Could not find local file for: ${track.title}`);
            missingCount++;
            continue;
        }

        const uniqueMatches = [...new Set(matches)]; // mp3 and wav versions
        let uploadedForThisTrack = false;

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
                console.log(`✅ Success!`);
                successCount++;
                uploadedForThisTrack = true;
                
                // Patch albums.json URL if needed
                if (albumData) {
                    const trackData = albumData.tracks.find(t => 
                        t.title.toLowerCase().replace(/[^a-z0-9]/g, '') === track.title.toLowerCase().replace(/[^a-z0-9]/g, '') ||
                        t.title.toLowerCase().replace(/[^a-z]/g, '').includes(track.title.toLowerCase().replace(/[^a-z]/g, '')) ||
                        track.title.toLowerCase().replace(/[^a-z]/g, '').includes(t.title.toLowerCase().replace(/[^a-z]/g, ''))
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
        if (!uploadedForThisTrack) missingCount++;
    }
    
    fs.writeFileSync('./src/data/albums.json', JSON.stringify(d, null, 2));
    
    console.log(`\n✨ Done! Successfully processed files. Success: ${successCount}, Missing/failed: ${missingCount}`);
}

run();
