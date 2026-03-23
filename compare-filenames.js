const fs = require('fs');
const path = require('path');

const SOURCE_DIR = "/Users/garybirrell/Desktop/Singitpop/READY FOR WEBSITE";

const missingTracks = [
    { albumFolder: "Empire Under lights", title: "Locked & Loaded" },
    { albumFolder: "Ethereal Highlands", title: "The Spirit Of Alba" },
    { albumFolder: "Heartland Rhythms", altFolder: "Heartland Rythms", title: "Small Town Saturday Nights" },
    { albumFolder: "Heartland Rhythms", altFolder: "Heartland Rythms", title: "Hometown Heros" },
    { albumFolder: "Heartland Rythms", altFolder: "Heartland Rhythms", title: "Dirtroads And Day Dreams" },
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
    { albumFolder: "Spring Begins Inside You", title: "Where The Colours Come From" },
    { albumFolder: "Spring Begins Inside You", title: "March Comes Carrying Light" },
    { albumFolder: "Spring Begins Inside You", title: "What We Plant In Ourselves" },
    { albumFolder: "Spring Begins Inside You", title: "Bloom My Heart Again" },
    { albumFolder: "Spring Begins Inside You", title: "Spring Begins In You Finale" },
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

function findFuzzyFiles(dirPath, titleQuery) {
    let results = [];
    if (!fs.existsSync(dirPath)) return results;
    
    const items = fs.readdirSync(dirPath, { withFileTypes: true });
    
    // Normalize string for fuzzy matching
    const normalize = (s) => s.toLowerCase().replace(/['"’.,!&?-]/g, '').replace(/[^a-z0-9]/g, '');
    let queryNorm = normalize(titleQuery);
    
    for (const item of items) {
        const fullPath = path.join(dirPath, item.name);
        if (item.isDirectory()) {
            results = results.concat(findFuzzyFiles(fullPath, titleQuery));
        } else {
            const ext = path.extname(item.name).toLowerCase();
            if (ext === '.mp3' || ext === '.wav') {
                const basename = path.basename(item.name, ext);
                const fileNorm = normalize(basename);
                
                // If it's even remotely close, we consider it the actual file
                if (fileNorm === queryNorm || 
                    fileNorm.includes(queryNorm) || 
                    queryNorm.includes(fileNorm) ||
                    fileNorm.replace(/^[0-9\s-]+/, '').includes(queryNorm) ||
                    (queryNorm.length > 5 && fileNorm.includes(queryNorm.substring(0, queryNorm.length - 2)))
                ) {
                    results.push(basename); // just keep the name
                }
            }
        }
    }
    return [...new Set(results)]; // unique base names
}

function run() {
    console.log("=== SPREADSHEET VS. ACTUAL FILENAME REPORT ===\n");
    let missingOrNoMatch = 0;

    for (const track of missingTracks) {
        let searchPath = path.join(SOURCE_DIR, track.albumFolder);
        
        // Handle fuzzy folder paths
        if (!fs.existsSync(searchPath)) {
            if (track.altFolder && fs.existsSync(path.join(SOURCE_DIR, track.altFolder))) {
                searchPath = path.join(SOURCE_DIR, track.altFolder);
            } else {
                const allDirs = fs.readdirSync(SOURCE_DIR);
                const fuzzyDir = allDirs.find(d => d.toLowerCase().replace(/[^a-z0-9]/g,'') === track.albumFolder.toLowerCase().replace(/[^a-z0-9]/g,''))
                if (fuzzyDir) searchPath = path.join(SOURCE_DIR, fuzzyDir);
            }
        }

        if (!fs.existsSync(searchPath)) {
             console.log(`[DIRECTORY NOT FOUND] Album: '${track.albumFolder}'\n -> Could not locate folder on disk to check track: '${track.title}'\n`);
             missingOrNoMatch++;
             continue;
        }

        const matches = findFuzzyFiles(searchPath, track.title);
        
        if (matches.length === 0) {
            // No fuzzy match found, let's list the top a few files in that directory to help user
            const allFiles = fs.readdirSync(searchPath).filter(f => f.endsWith('.mp3') || f.endsWith('.wav')).slice(0, 5);
            console.log(`[NO MATCH FOUND] Album: '${track.albumFolder}'`);
            console.log(` -> Spreadsheet Title: "${track.title}"`);
            console.log(` -> Closest files in folder: ${allFiles.length > 0 ? allFiles.join(" | ") : "Folder empty!"}`);
            console.log(``);
            missingOrNoMatch++;
        } else {
            const exactMatch = matches.find(m => m === track.title);
            if (!exactMatch) {
                console.log(`[TITLE TYPO] Album: '${track.albumFolder}'`);
                console.log(` -> Spreadsheet has: "${track.title}"`);
                console.log(` -> Actual file is : "${matches[0]}"`);
                console.log(``);
            } else {
                // Technically it matches exactly. Why was it omitted? Maybe the case is slightly different or it was a previous issue.
                 console.log(`[EXACT MATCH] Album: '${track.albumFolder}'`);
                 console.log(` -> Spreadsheet has: "${track.title}"`);
                 console.log(` -> Actual file is : "${matches[0]}"`);
                 console.log(``);
            }
        }
    }
    console.log(`Total checks: ${missingTracks.length}`);
}

run();
