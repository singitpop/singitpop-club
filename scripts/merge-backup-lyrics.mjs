import fs from 'fs';
import path from 'path';

const TRACKER_BASE = './src/data/albums.json';
const BACKUP_SOURCE = './temp_albums_fixed.json.cAA380BC';
const OUTPUT_FILE = './src/data/albums.json';

// Read both files
const trackerAlbums = JSON.parse(fs.readFileSync(TRACKER_BASE, 'utf8'));
const backupContent = fs.readFileSync(BACKUP_SOURCE, 'utf8');
const backupAlbums = JSON.parse(backupContent);

const normalize = (s) => (s || '').toLowerCase().replace(/[^a-z0-9]/g, '');

console.log(`📦 Merging lyrics from ${BACKUP_SOURCE} (${backupAlbums.length} albums) into ${TRACKER_BASE} (${trackerAlbums.length} albums)...`);

let mergedCount = 0;
let albumMatchCount = 0;

trackerAlbums.forEach(album => {
    // Find matching album in backup (normalize titles for matching)
    const albumTitleNorm = normalize(album.title);
    
    const backupAlbum = backupAlbums.find(ba => 
        normalize(ba.title) === albumTitleNorm || 
        ba.id === album.id
    );

    if (backupAlbum) {
        albumMatchCount++;
        album.tracks.forEach(track => {
            const trackTitleNorm = normalize(track.title);
            // Find matching track in backup album
            const backupTrack = backupAlbum.tracks.find(bt => 
                normalize(bt.title) === trackTitleNorm
            );

            if (backupTrack && backupTrack.lyrics && backupTrack.lyrics.rawText) {
                track.lyrics = backupTrack.lyrics;
                mergedCount++;
            }
        });
    }
});

// Write-back
fs.writeFileSync(OUTPUT_FILE, JSON.stringify(trackerAlbums, null, 2));

console.log(`✅ Successfully merged ${mergedCount} track lyrics across ${albumMatchCount} albums!`);
console.log(`💾 Saved to ${OUTPUT_FILE}`);
