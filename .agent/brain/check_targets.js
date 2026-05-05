const fs = require('fs');
const path = require('path');

const albums = JSON.parse(fs.readFileSync('src/data/albums.json', 'utf8'));

const targets = [15,16,17,18,20,21,22,23,25,28,29,47, 53,60,64, 67, 39, 42, 59];

console.log('--- Mapping Targets to Albums (using 1-based index) ---');
targets.forEach(idx => {
    const album = albums[idx - 1];
    if (album) {
        console.log(`${idx}: ${album.id} | ${album.title} | ${album.genre}`);
    } else {
        console.log(`${idx}: MISSING in albums.json (current length: ${albums.length})`);
    }
});
