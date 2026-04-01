import fs from 'fs';

const ALBUMS_FILE = './src/data/albums.json';
const albums = JSON.parse(fs.readFileSync(ALBUMS_FILE, 'utf8'));

const audit = [];

for (const album of albums) {
    if (album.title === "Singles") continue;

    const totalTracks = album.tracks.length;
    const missingLyrics = album.tracks.filter(t => !t.lyrics || !t.lyrics.rawText);
    const missingCount = missingLyrics.length;

    if (missingCount > 0) {
        audit.push({
            title: album.title,
            status: `⚠️ Missing ${missingCount}/${totalTracks}`,
            tracks: missingLyrics.map(t => t.title).join(', ')
        });
    } else {
        audit.push({
            title: album.title,
            status: `✅ Ready`,
            tracks: ''
        });
    }
}

console.log("# Final Lyric Audit Report\n");
console.log("| Album | Status | Missing Tracks |");
console.log("| :--- | :--- | :--- |");
audit.forEach(a => {
    console.log(`| ${a.title} | ${a.status} | ${a.tracks} |`);
});
