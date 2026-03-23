const fs = require('fs');
const d = require('./src/data/albums.json');

// Manual override for Nashville in June where the file is named just 'Nashville in June.mp3'
d.forEach(album => {
    if (album.title.includes('Nashville in June')) {
        const track = album.tracks.find(t => t.title.includes('Nashville in June'));
        if (track) {
            track.audioUrl = 'https://singitpop-music.s3.eu-north-1.amazonaws.com/albums/nashville-in-june/Nashville%20in%20June.mp3';
        }
    }
});

fs.writeFileSync('./src/data/albums.json', JSON.stringify(d, null, 2));
