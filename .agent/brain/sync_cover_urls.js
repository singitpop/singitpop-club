const fs = require('fs');
const path = require('path');

const albumsPath = path.join(process.cwd(), 'src/data/albums.json');
const albums = JSON.parse(fs.readFileSync(albumsPath, 'utf8'));

let count = 0;
albums.forEach(album => {
    if (!album.coverArt) return;
    
    const urlParts = album.coverArt.split('/');
    const fileName = urlParts[urlParts.length - 1]; // e.g. Cover.png
    
    // Construct new URL using the ALIGNED folderPath
    const newCoverArt = `https://singitpop-music.s3.eu-north-1.amazonaws.com/albums/${encodeURIComponent(album.folderPath)}/${fileName}`;
    
    if (album.coverArt !== newCoverArt) {
        console.log(`✅ Updating ${album.id}: ${album.coverArt} -> ${newCoverArt}`);
        album.coverArt = newCoverArt;
        count++;
    }
});

fs.writeFileSync(albumsPath, JSON.stringify(albums, null, 2));
console.log(`\nSuccessfully updated ${count} coverArt URLs.`);
