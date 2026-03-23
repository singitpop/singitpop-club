const fs = require('fs');
const d = require('./src/data/albums.json');

// Read S3 keys
const keys = fs.readFileSync('s3_keys.txt', 'utf-8').split('\n').filter(Boolean);

let fixedCount = 0;
let stillMissing = 0;

d.forEach(album => {
    album.tracks.forEach(track => {
        if (!track.audioUrl) return;

        // Extract current key from audioUrl
        const url = new URL(track.audioUrl);
        let expectedKey = decodeURIComponent(url.pathname.substring(1));
        
        // If the expected key isn't in S3 exactly
        if (!keys.includes(expectedKey)) {
            
            // Try to find a matching .mp3 in S3 by filename (ignoring folder structure/case)
            const targetFilename = expectedKey.split('/').pop().toLowerCase();
            const targetAlbumAlias = album.title.toLowerCase().replace(/[^a-z0-9]/g, '');
            
            const match = keys.find(k => {
                if (!k.endsWith('.mp3')) return false;
                const kFilename = k.split('/').pop().toLowerCase();
                const kAlbumFolder = k.split('/')[1]?.toLowerCase().replace(/[^a-z0-9]/g, '');
                
                // Match if both filename matches AND it's in a folder that vaguely resembles the album title
                return kFilename === targetFilename && (kAlbumFolder.includes(targetAlbumAlias) || targetAlbumAlias.includes(kAlbumFolder));
            });

            if (match) {
                // Update track URL
                track.audioUrl = `https://singitpop-music.s3.eu-north-1.amazonaws.com/${match.split('/').map(encodeURIComponent).join('/')}`;
                track.audioUrl = track.audioUrl.replace(/%2F/g, '/'); // Keep slashes
                fixedCount++;
            } else {
                console.log(`[MISSING] ${album.title} -> ${track.title} (Expected: ${targetFilename})`);
                stillMissing++;
            }
        }
    });
});

console.log(`Fixed ${fixedCount} URLs. Still missing: ${stillMissing}`);
fs.writeFileSync('./src/data/albums.json', JSON.stringify(d, null, 2));

