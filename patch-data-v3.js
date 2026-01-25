const fs = require('fs');

const albums = JSON.parse(fs.readFileSync('/tmp/albums-current.json', 'utf8'));

let patchedCount = 0;
let latestSingleUid = '';

// 1. Create New Year's Odyssey if missing
const newYearAlbumTitle = "New Year's Odyssey"; // Normalized without curly?
// Check fuzzy
let newYearAlbum = albums.find(a => a.title.includes('New Year') && a.title.includes('Odyssey'));

if (!newYearAlbum) {
    console.log("Adding Missing Album: New Year's Odyssey");
    newYearAlbum = {
        id: "new-years-odyssey-2025",
        title: "New Year’s Odyssey", // Official title with curly
        year: "2025",
        releaseDate: "2025-01-01",
        folderPath: "New Year’s Odyssey",
        type: "studio",
        coverArt: "https://singitpop-music.s3.eu-north-1.amazonaws.com/albums/New Year’s Odyssey/cover.png",
        genre: ["Pop"],
        tracks: []
    };

    // Add Paradise Again track manually
    newYearAlbum.tracks.push({
        id: 9001,
        title: "Paradise Again",
        duration: "3:30",
        plays: "0",
        price: 0.99,
        // Using encoded URL components for safety with spaces/special chars
        audioUrl: "https://singitpop-music.s3.eu-north-1.amazonaws.com/albums/New Year’s Odyssey/Paradise Again/Paradise Again.mp3",
        highResUrl: "https://singitpop-music.s3.eu-north-1.amazonaws.com/albums/New Year’s Odyssey/Paradise Again.wav",
        coverArt: "https://singitpop-music.s3.eu-north-1.amazonaws.com/albums/New Year’s Odyssey/Paradise Again/cover.png",
        sourceFolder: "New Year’s Odyssey",
        albumId: "new-years-odyssey-2025",
        isSingle: false
    });

    albums.push(newYearAlbum);
}

albums.forEach(album => {
    // FIX 2: Echoes of Light Cover Art
    if (album.title.toLowerCase().includes('echoes of light')) {
        console.log(`Patching Echoes of Light Cover Art`);
        album.coverArt = "https://singitpop-music.s3.eu-north-1.amazonaws.com/albums/Echoes Of Light/cover.png";
    }

    // FIX 3: Fix Desert Winds and Open Roads
    if (album.title.toLowerCase().includes('desert winds')) {
        console.log(`Patching Target Album: ${album.title}`);
        album.year = '2026';
        album.releaseDate = '2026-01-01';
        if (!album.id.includes('2026')) {
            album.id = album.id.replace('1970', '2026');
        }
        album.tracks.forEach(track => {
            track.albumId = album.id;
            if (track.title.toLowerCase().includes('goodbye california')) {
                track.isSingle = true;
                latestSingleUid = `${album.id}-${track.id}`;
            }
        });
    }
    // FIX 4: General fix for 1970 dates -> 2024 (sanity check)
    else if (album.year === '1970') {
        album.year = '2024';
        album.releaseDate = '2024-01-01';
        if (album.id.includes('1970')) {
            album.id = album.id.replace('1970', '2024');
        }
        album.tracks.forEach(t => t.albumId = album.id);
        patchedCount++;
    }

    // FIX 5: Detect Live Albums
    if (album.title.toLowerCase().includes('live')) {
        album.type = 'live';
    }
});

console.log(`Patched ${patchedCount} other albums.`);
console.log(`Latest Single UID: ${latestSingleUid}`);

fs.writeFileSync('/tmp/albums-patched.json', JSON.stringify(albums, null, 2));

const metadata = {
    "latestSingleId": parseInt(latestSingleUid.split('-').pop()),
    "latestSingleUid": latestSingleUid,
    "latestSingleTitle": "goodbye california",
    "latestVideoId": "s5GwnVX3-dY",
    "latestVideoTitle": "Paradise Again"
};
fs.writeFileSync('/tmp/metadata-patched.json', JSON.stringify(metadata, null, 2));
