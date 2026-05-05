const fs = require('fs');
const path = require('path');

const albumsPath = path.join(process.cwd(), 'src/data/albums.json');
const albums = JSON.parse(fs.readFileSync(albumsPath, 'utf8'));

const targetIds = [42, 59, 64, 67];

albums.forEach(album => {
    // Check if album.id contains the number (legacy mapping?) or use a custom index
    // The user mentioned numbers like 15, 16... which often correspond to the index or a hidden ID.
    // Let's check the album titles for these.
});

// Since I don't know the exact mapping, I'll just look for the titles I suspect.
const suspects = [
    { id: 64, title: "Waves of Tranquility" },
    { id: 67, title: "Winding Roads" },
];

albums.forEach((album, index) => {
    if (album.title.toLowerCase().includes("waves of tranquility") || album.title.toLowerCase().includes("winding roads")) {
        console.log(`Match: Index ${index + 1} | ID: ${album.id} | Title: ${album.title}`);
    }
});
