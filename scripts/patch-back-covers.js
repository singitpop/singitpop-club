const fs = require('fs');
const path = require('path');

const ALBUMS_PATH = path.join(__dirname, '../src/data/albums.json');
const SOLSTICE_BACK = 'https://singitpop-music.s3.eu-north-1.amazonaws.com/brain/75fc6105-7ac9-476c-a08c-0bd8917fa7c0/solstice_back_cover_official_v1_1774487043782.png';

try {
    const albums = JSON.parse(fs.readFileSync(ALBUMS_PATH, 'utf8'));
    const solstice = albums.find(a => a.id === 'solstice-2026');

    if (solstice) {
        solstice.backCover = SOLSTICE_BACK;
        fs.writeFileSync(ALBUMS_PATH, JSON.stringify(albums, null, 2), 'utf8');
        console.log('✅ Updated Solstice back cover reference.');
    }
} catch (error) {
    console.error('❌ Failed to update back cover:', error);
    process.exit(1);
}
