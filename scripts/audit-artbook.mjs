import fs from 'fs';

const ALBUMS_FILE = './src/data/albums.json';
const albums = JSON.parse(fs.readFileSync(ALBUMS_FILE, 'utf8'));

// Exact titles found in albums.json for the digital artwork (per user's 30-album intent)
const EXACT_ARTBOOK_TITLES = [
    "Forever Starts Today (Country Music for Weddings)",
    "Night Drive: 80s Beats & Ballads",
    "Solstice",
    "Waves of Tranquility Deep House Reflections",
    "Between the lines of love",
    "Echoes of Light",
    "Starlight Frequencies",
    "Nashville In June",
    "Summer Fever ", // Note trailing space
    "The Long Way Home",
    "Winding Roads",
    "Limitless",
    "The Night Is Young",
    "Digital Dream",
    "Rhythm of the Rain",
    "Chasing Shadows",
    "Neon Skies",
    "Heart of Gold",
    "Into the Blue",
    "Echoes of You",
    "Golden Hour",
    "Midnight Sun",
    "Beyond the Horizon",
    "Endless Summer",
    "First Love",
    "Wild Hearts",
    "Painted Skies",
    "Ocean Breeze",
    "Whispered Words",
    "Happily Ever After Dreams",
    "Valentine Country"
];

console.log('📑 Auditing Digital Artbook Lyric Readiness (Exact Matches)...');
console.log('(Excluding tracks in the "Singles" folder)\n');

let report = [];

EXACT_ARTBOOK_TITLES.forEach(title => {
    const album = albums.find(a => a.title.toLowerCase().trim() === title.toLowerCase().trim());
    
    if (!album) {
        report.push({ album: title, status: '❌ Album Not Found in Tracker' });
        return;
    }

    const tracks = album.tracks.filter(t => t.sourceFolder !== 'Singles');
    const missing = tracks.filter(t => !t.lyrics || !t.lyrics.rawText);
    const total = tracks.length;
    
    report.push({
        album: album.title,
        status: missing.length === 0 ? '✅ Ready' : `⚠️ Missing ${missing.length}/${total}`,
        missingCount: missing.length,
        totalCount: total,
        missingTracks: missing.map(t => t.title).join(', ')
    });
});

// Output as Markdown Table
console.log('| Album | Readiness Status | Missing Tracks |');
console.log('| :--- | :--- | :--- |');
report.sort((a, b) => (a.missingCount || 0) - (b.missingCount || 0)).forEach(row => {
    console.log(`| ${row.album} | ${row.status} | ${row.missingTracks || '-'} |`);
});
