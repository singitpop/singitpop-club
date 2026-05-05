const fs = require('fs');
const path = require('path');

const albumsPath = path.join(process.cwd(), 'src/data/albums.json');
const albums = JSON.parse(fs.readFileSync(albumsPath, 'utf8'));

[42, 59].forEach(idx => {
    const album = albums[idx - 1];
    if (album) {
        console.log(`Index ${idx}: ${album.id} | Title: ${album.title} | Genre: ${JSON.stringify(album.genre)}`);
    }
});
