const fs = require('fs');

const albums = JSON.parse(fs.readFileSync('/tmp/albums-current.json', 'utf8'));

let patchedCount = 0;
let latestSingleUid = '';

// 1. Create New Year's Odyssey if missing
let newYearAlbum = albums.find(a => a.title.includes('New Year') && a.title.includes('Odyssey'));
if (!newYearAlbum) {
    console.log("Adding Missing Album: New Year's Odyssey");
    newYearAlbum = {
        id: "new-years-odyssey-2025",
        title: "New Year’s Odyssey",
        year: "2025",
        releaseDate: "2025-01-01",
        folderPath: "New Year’s Odyssey",
        type: "studio",
        coverArt: "https://singitpop-music.s3.eu-north-1.amazonaws.com/albums/New Year’s Odyssey/cover.png",
        genre: ["Pop"],
        tracks: []
    };
    newYearAlbum.tracks.push({
        id: 9001,
        title: "Paradise Again",
        duration: "3:30",
        plays: "0",
        price: 0.99,
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
        album.coverArt = "https://singitpop-music.s3.eu-north-1.amazonaws.com/albums/Echoes Of Light/cover.png";
    }

    // FIX 3: Fix Desert Winds and Open Roads
    if (album.title.toLowerCase().includes('desert winds')) {
        album.year = '2026';
        album.releaseDate = '2026-01-01';
        if (!album.id.includes('2026')) {
            album.id = album.id.replace('1970', '2026');
        }
    }

    // FIX 4: General fix for 1970 dates -> 2024
    else if (album.year === '1970') {
        album.year = '2024';
        album.releaseDate = '2024-01-01';
        if (album.id.includes('1970')) {
            album.id = album.id.replace('1970', '2024');
        }
        patchedCount++;
    }

    // FIX 5: Detect Live Albums (Explicit)
    if (album.title.toLowerCase().includes('live')) {
        console.log(`Marking as Live: ${album.title}`);
        album.type = 'live';
    }
});

fs.writeFileSync('/tmp/albums-patched.json', JSON.stringify(albums, null, 2));
console.log(`Patched Live Albums.`);
