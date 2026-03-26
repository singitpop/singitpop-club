const fs = require('fs');
const path = require('path');

const ALBUMS_PATH = path.join(__dirname, '../src/data/albums.json');

try {
    const albums = JSON.parse(fs.readFileSync(ALBUMS_PATH, 'utf8'));
    const solstice = albums.find(a => a.id === 'solstice-2026');

    if (!solstice) {
        console.error('❌ Solstice album not found!');
        process.exit(1);
    }

    solstice.tracks.forEach(track => {
        track.lyrics = `solstice-2026/${track.id}.json`;
    });

    fs.writeFileSync(ALBUMS_PATH, JSON.stringify(albums, null, 2), 'utf8');
    console.log('✅ Updated albums.json with lyrics links for Solstice tracks.');
} catch (error) {
    console.error('❌ Failed to update albums.json:', error);
    process.exit(1);
}
