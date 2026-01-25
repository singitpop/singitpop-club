const fs = require('fs');

const albums = JSON.parse(fs.readFileSync('/tmp/albums-patched.json', 'utf8'));

// Find Echoes of Light album
const echoesAlbum = albums.find(a => a.id === 'echoes-of-light-2026');

if (!echoesAlbum) {
    console.log("Error: Echoes of Light album not found");
    process.exit(1);
}

// Find The Silent Conversation track (Exact match, not Reprise)
const track = echoesAlbum.tracks.find(t => t.title.toLowerCase() === 'the silent conversation');

if (!track) {
    console.log("Error: Track 'The Silent Conversation' not found");
    // Debug: List tracks
    console.log("Available tracks:");
    echoesAlbum.tracks.forEach(t => console.log(`- ${t.title}`));
    process.exit(1);
}

console.log(`Found Track: ${track.title} (ID: ${track.id})`);
console.log(`Album ID: ${echoesAlbum.id}`);

const metadata = {
    "latestSingleId": track.id,
    "latestSingleUid": `${echoesAlbum.id}-${track.id}`,
    "latestSingleTitle": track.title, // "the silent conversation"
    "latestVideoId": "s5GwnVX3-dY",
    "latestVideoTitle": "Paradise Again"
};

fs.writeFileSync('/tmp/metadata-manual.json', JSON.stringify(metadata, null, 2));
console.log("Created /tmp/metadata-manual.json");
