import fs from 'fs';
import path from 'path';

const TRACKER_FILE = './src/data/albums.json';
const OUTPUT_FILE = './src/data/albums.json';

// Ingest scripts known to contain large blocks of raw lyrics
const INGEST_FILES = [
    'ingest-night-drive.js',
    'ingest-between-lines-lyrics.js',
    'ingest-country-wedding.js',
    'ingest-waves-tranquility.js'
];

const albums = JSON.parse(fs.readFileSync(TRACKER_FILE, 'utf8'));

console.log('🔍 Extracting lyrics from ingest scripts with fuzzy matching...');

let totalMerged = 0;

INGEST_FILES.forEach(file => {
    const filePath = path.join('./scripts', file);
    if (!fs.existsSync(filePath)) {
        console.warn(`⚠️  Skip: ${filePath} not found`);
        return;
    }

    const content = fs.readFileSync(filePath, 'utf8');
    
    // 1. Try to find the album title in the script
    // Often it's near ALBUM_SLUG or in the tracksMapping
    let albumTitleMatch = content.match(/album: "(.+?)"/i) || content.match(/title: "(.+?)"/i);
    let albumSearchName = albumTitleMatch ? albumTitleMatch[1] : file.replace('ingest-', '').replace('-lyrics.js', '').replace('.js', '').replace(/-/g, ' ');

    // 2. Fuzzy match the album in our tracker
    const album = albums.find(a => 
        a.title.toLowerCase().includes(albumSearchName.toLowerCase()) || 
        albumSearchName.toLowerCase().includes(a.title.toLowerCase())
    );

    if (!album) {
        console.warn(`⚠️  Could not fuzzy match album for ${file} (Searched: "${albumSearchName}")`);
        return;
    }

    console.log(`📦 Merging lyrics for "${album.title}"...`);

    // 3. Extract track-lyric pairs
    // Pattern 1: { title: "Title", lyrics: `Lyrics` }
    const segmentRegex = /{ (?:id: \d+, )?title: "(.+?)", lyrics: `([\s\S]+?)` }/g;
    let match;
    let foundInMapping = false;
    while ((match = segmentRegex.exec(content)) !== null) {
        foundInMapping = true;
        const trackTitle = match[1];
        const lyricsText = match[2].trim();

        const track = album.tracks.find(t => 
            t.title.toLowerCase().includes(trackTitle.toLowerCase()) || 
            trackTitle.toLowerCase().includes(t.title.toLowerCase())
        );

        if (track) {
            track.lyrics = { rawText: lyricsText };
            totalMerged++;
        }
    }

    // Pattern 2: rawLyrics = `Title\n\nLyrics\n\n---`
    if (!foundInMapping) {
        const lyricsMatch = content.match(/const rawLyrics = `([\s\S]+?)`;/);
        if (lyricsMatch) {
            const rawLyrics = lyricsMatch[1];
            const segments = rawLyrics.split(/————————————|———————————————————|————————————————|—————————————|——————————————|——————————————————/g).map(s => s.trim()).filter(s => s);
            
            segments.forEach(segment => {
                const lines = segment.split('\n');
                const titleLine = lines[0].trim();
                const lyricsText = lines.slice(1).join('\n').trim();

                const track = album.tracks.find(t => 
                    t.title.toLowerCase().includes(titleLine.toLowerCase()) || 
                    titleLine.toLowerCase().includes(t.title.toLowerCase())
                );

                if (track) {
                    track.lyrics = { rawText: lyricsText };
                    totalMerged++;
                }
            });
        }
    }
});

fs.writeFileSync(OUTPUT_FILE, JSON.stringify(albums, null, 2));
console.log(`✅ Finished! ${totalMerged} track lyrics merged into ${TRACKER_FILE}`);
