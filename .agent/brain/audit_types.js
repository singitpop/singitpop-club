const fs = require('fs');
const path = require('path');

const albumsPath = path.join(process.cwd(), 'src/data/albums.json');
const albums = JSON.parse(fs.readFileSync(albumsPath, 'utf8'));

console.log('--- Album Type Audit ---');
albums.forEach(album => {
    if (!album.type) {
        console.log(`❌ ${album.id}: Missing type (${album.title})`);
    }
});
