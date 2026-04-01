import fs from 'fs';

const ALBUMS_FILE = './src/data/albums.json';
const albums = JSON.parse(fs.readFileSync(ALBUMS_FILE, 'utf8'));

// The 55 albums from the "New List" (Final Corrected List)
const FINAL_USER_LIST = [
    "Starlight Frequencies", "Echoes of Us", "Golden Hour", "Love In Bloom", "Heartlines",
    "Neon Dreams", "Boots and Beats Country Line Dance Anthems", "Whispers of the Heart Country Ballads for the Soul",
    "Waves of Tranquility Deep House Reflections", "Forever Starts Today (Country Music for Weddings)",
    "Night Drive: 80s Beats & Ballads", "Between the lines of love", "Happily Ever After Dreams",
    "Popstar Winter Wonderland", "Highways of the Heart", "Spring Awakening", "Summer Fever",
    "Endless Glow", "Limitless", "Heartland Rhythms", "Dust and Diamonds",
    "Empire Under lights", "Eternal Summer", "Ethereal Highlands", "Line Dancing After Dark",
    "Glass Bloom", "Midnight Motion", "Wildcards and Whiskey", "Falling for October",
    "September Moves", "October Boots and Fall Roots", "Shadows and Fires", "Winding Roads",
    "Snowfall and Steel Strings", "Electric Sleigh", "The Long Way Home", "November Nights",
    "Live At Autumn Lights", "Hallowave Dance of the shadows", "A Love That Never Ends",
    "Echoes in the Firelight", "New Year's Odyssey", "Live Step Into the Light", "Valentine Country",
    "Desert Winds And Open Roads", "Echoes of Light", "Heart of the Sky Drums", "Spring Begins Inside You",
    "Through the Glass", "April Comes Soft", "May In Motion", "Before the Light", "Live Nashville in June",
    "Solstice", "Last Ones Standing"
];

console.log('📊 Final Strict Artbook Audit based on User Feedback...');
console.log('Includes: ALL tracks for each audited album.');
console.log('Excludes: "Singles" top-level entity/folder, "Kicking Up Dust", and "Golden Echoes".\n');

let report = [];

FINAL_USER_LIST.forEach(title => {
    // Exact or loose match check
    const album = albums.find(a => 
        a.title.toLowerCase().trim() === title.toLowerCase().trim() ||
        a.title.toLowerCase().includes(title.toLowerCase().trim()) ||
        title.toLowerCase().includes(a.title.toLowerCase().trim())
    );

    if (!album) {
        report.push({ 
            title, 
            status: '❌ Not in website data', 
            missingTracks: '-' 
        });
        return;
    }

    // Inclusion: All tracks in this album (do not filter by isSingle)
    // Exclusion: Strictly only the "Singles" entity folder
    const tracks = album.tracks.filter(t => t.sourceFolder !== 'Singles' && t.title !== 'Singles');
    
    const missing = tracks.filter(t => !t.lyrics || !t.lyrics.rawText);
    const total = tracks.length;

    report.push({
        title: album.title,
        status: missing.length === 0 ? '✅ Ready' : `⚠️ Missing ${missing.length}/${total}`,
        missingCount: missing.length,
        missingTracks: missing.map(t => t.title).join(', ')
    });
});

// Output Markdown
console.log('| Album Title | Audit Status | Missing Lyrics |');
console.log('| :--- | :--- | :--- |');
report.forEach(r => {
    console.log(`| ${r.title} | ${r.status} | ${r.missingTracks} |`);
});
