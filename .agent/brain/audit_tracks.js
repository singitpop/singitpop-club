const fs = require('fs');
const path = require('path');

const albumsPath = path.join(process.cwd(), 'src/data/albums.json');
const albums = JSON.parse(fs.readFileSync(albumsPath, 'utf8'));

console.log('--- Album Track Audit ---');
let totalTracks = 0;
albums.forEach(album => {
    const trackCount = album.tracks ? album.tracks.length : 0;
    totalTracks += trackCount;
    if (trackCount < 5 && album.id !== 'singles') {
        console.log(`⚠️  ${album.id}: ${trackCount} tracks (${album.title})`);
    }
});

console.log(`\nTotal Albums: ${albums.length}`);
console.log(`Total Tracks: ${totalTracks}`);
