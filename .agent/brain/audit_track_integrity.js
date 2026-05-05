const fs = require('fs');
const path = require('path');

const albumsPath = path.join(process.cwd(), 'src/data/albums.json');
const albums = JSON.parse(fs.readFileSync(albumsPath, 'utf8'));

console.log('--- Track Integrity Audit ---');
albums.forEach(album => {
    (album.tracks || []).forEach(track => {
        if (!track.audioUrl) {
            console.log(`❌ ${album.id} - Track ${track.id}: Missing audioUrl (${track.title})`);
        }
        if (!track.duration || track.duration === '0:00') {
            console.log(`⚠️  ${album.id} - Track ${track.id}: Missing duration (${track.title})`);
        }
    });
});
