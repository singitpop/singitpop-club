const fs = require('fs');
const path = require('path');

const albumsPath = path.join(process.cwd(), 'src/data/albums.json');
const albums = JSON.parse(fs.readFileSync(albumsPath, 'utf8'));

console.log('--- Album Track Count vs mp3Count Check ---');
albums.forEach(album => {
    const actualCount = album.tracks ? album.tracks.length : 0;
    const expectedCount = album.mp3Count || actualCount;
    if (actualCount < expectedCount) {
        console.log(`❌ ${album.id}: Actual ${actualCount} vs Expected ${expectedCount} (${album.title})`);
    }
});
