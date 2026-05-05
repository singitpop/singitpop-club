const fs = require('fs');
const path = require('path');

const albumsPath = path.join(process.cwd(), 'src/data/albums.json');
const albums = JSON.parse(fs.readFileSync(albumsPath, 'utf8'));

console.log('--- CoverArt vs folderPath Audit ---');
albums.forEach(album => {
    if (!album.coverArt) return;
    
    // Extract folder from URL: .../albums/FolderName/Cover.png
    const urlParts = album.coverArt.split('/');
    const folderInUrl = decodeURIComponent(urlParts[urlParts.length - 2]);
    
    if (folderInUrl !== album.folderPath) {
        console.log(`❌ ${album.id}: URL folder "${folderInUrl}" !== folderPath "${album.folderPath}"`);
    }
});
