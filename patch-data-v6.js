const fs = require('fs');

const albums = JSON.parse(fs.readFileSync('/tmp/albums-current.json', 'utf8'));

// 1. Ensure New Year's Odyssey exists
let newYearAlbum = albums.find(a => a.title.includes('New Year') && a.title.includes('Odyssey'));
if (!newYearAlbum) {
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
    // FIX 2: Echoes of Light
    if (album.title.toLowerCase().includes('echoes of light')) {
        // Point Album Cover to the TRACK cover (Subfolder) - safer than root 403
        album.coverArt = "https://singitpop-music.s3.eu-north-1.amazonaws.com/albums/Echoes Of Light/The Silent Conversation/Cover.png";

        album.tracks.forEach(track => {
            // Fix "The Silent Conversation" (non-reprise)
            if (track.title.toLowerCase() === "the silent conversation") {
                console.log("Fixing Audio URL for The Silent Conversation (to Subfolder MP3)");
                // Valid MP3 found in subfolder
                track.audioUrl = "https://singitpop-music.s3.eu-north-1.amazonaws.com/albums/Echoes Of Light/The Silent Conversation/The Silent Conversation.mp3";
                // Valid WAV also in subfolder? No, root wav existed. But Subfolder wav also existed:
                // 2026-01-22 ... albums/Echoes Of Light/The Silent Conversation/The Silent Conversation.wav
                track.highResUrl = "https://singitpop-music.s3.eu-north-1.amazonaws.com/albums/Echoes Of Light/The Silent Conversation/The Silent Conversation.wav";

                track.coverArt = album.coverArt;
            }
        });
    }

    // FIX 3: Fix Desert Winds
    if (album.title.toLowerCase().includes('desert winds')) {
        album.year = '2026';
        album.releaseDate = '2026-01-01';
        if (!album.id.includes('2026')) {
            album.id = album.id.replace('1970', '2026');
        }
    }

    // FIX 4: General fix for 1970
    else if (album.year === '1970') {
        album.year = '2024';
        album.releaseDate = '2024-01-01';
        if (album.id.includes('1970')) {
            album.id = album.id.replace('1970', '2024');
        }
    }

    // FIX 5: Live Albums
    if (album.title.toLowerCase().includes('live')) {
        album.type = 'live';
    }
});

fs.writeFileSync('/tmp/albums-patched.json', JSON.stringify(albums, null, 2));
