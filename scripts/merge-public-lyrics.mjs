import fs from 'fs';
import path from 'path';

const TRACKER_BASE = './src/data/albums.json';
const LYRICS_DIR = './public/data/lyrics';
const OUTPUT_FILE = './src/data/albums.json';

// Read albums.json
let albums = JSON.parse(fs.readFileSync(TRACKER_BASE, 'utf8'));

console.log(`📦 Merging lyrics from ${LYRICS_DIR} into ${TRACKER_BASE}...`);

let mergedCount = 0;
let albumMatchCount = 0;

// Read all album directories in LYRICS_DIR
if (fs.existsSync(LYRICS_DIR)) {
    const albumDirs = fs.readdirSync(LYRICS_DIR).filter(name => {
        return fs.statSync(path.join(LYRICS_DIR, name)).isDirectory();
    });

    albumDirs.forEach(albumId => {
        // Find matching album in albums.json
        const album = albums.find(a => a.id === albumId);
        if (album) {
            albumMatchCount++;
            const albumPath = path.join(LYRICS_DIR, albumId);
            const lyricFiles = fs.readdirSync(albumPath).filter(f => f.endsWith('.json'));

            lyricFiles.forEach(file => {
                const trackNum = parseInt(file.replace('.json', ''), 10);
                const track = album.tracks.find(t => t.id === trackNum);

                if (track) {
                    try {
                        const lyricData = JSON.parse(fs.readFileSync(path.join(albumPath, file), 'utf8'));
                        if (lyricData.lyrics && Array.isArray(lyricData.lyrics)) {
                            track.lyrics = {
                                rawText: lyricData.lyrics.join('\n')
                            };
                            mergedCount++;
                        }
                    } catch (e) {
                        console.error(`Error reading lyric file ${file} in ${albumId}: ${e.message}`);
                    }
                }
            });
        }
    });

    // Write back to albums.json
    fs.writeFileSync(OUTPUT_FILE, JSON.stringify(albums, null, 2));

    console.log(`✅ Successfully merged ${mergedCount} track lyrics across ${albumMatchCount} albums!`);
} else {
    console.error(`❌ Lyrics directory ${LYRICS_DIR} not found!`);
}
