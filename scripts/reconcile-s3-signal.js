const fs = require('fs');
const path = require('path');

// Configuration
const ALBUMS_JSON_PATH = path.join(__dirname, '../src/data/albums.json');
const S3_CATALOG_PATH = path.join(__dirname, '../s3_catalog.txt');
const OUTPUT_PATH = path.join(__dirname, '../src/data/albums_fixed.json');

// Helper to normalize strings for comparison
function normalize(s) {
    if (!s) return '';
    return s.toLowerCase().replace(/[^a-z0-9]/g, '');
}

async function reconcile() {
    console.log('--- SingIt Pop Signal Reconciler ---');
    
    // 1. Load S3 Catalog
    console.log('Loading S3 Catalog...');
    const s3Keys = fs.readFileSync(S3_CATALOG_PATH, 'utf8').split('\n').filter(Boolean);
    console.log(`Loaded ${s3Keys.length} keys from catalog.`);
    
    // 2. Load albums.json
    console.log('Loading albums.json...');
    const albums = JSON.parse(fs.readFileSync(ALBUMS_JSON_PATH, 'utf8'));
    console.log(`Processing ${albums.length} albums.`);
    
    let fixedTracks = 0;
    let failedTracks = 0;
    let fixedAlbums = 0;

    // 3. Iterate and Fix
    for (const album of albums) {
        console.log(`\nChecking Album: ${album.title}`);
        
        // Find actual folder path on S3
        const albumTitleNorm = normalize(album.title);
        const folderPathNorm = normalize(album.folderPath);
        
        // Find all possible album prefixes
        const albumPrefixes = [...new Set(s3Keys
            .filter(k => k.startsWith('albums/'))
            .map(k => k.split('/')[0] + '/' + k.split('/')[1] + '/'))];
            
        let actualPrefix = albumPrefixes.find(p => {
            const pName = p.split('/')[1];
            return normalize(pName) === albumTitleNorm || normalize(pName) === folderPathNorm;
        });
        
        if (!actualPrefix) {
            // Try fuzzy match
            actualPrefix = albumPrefixes.find(p => {
                const pName = normalize(p.split('/')[1]);
                return pName.includes(albumTitleNorm) || albumTitleNorm.includes(pName);
            });
        }
        
        if (actualPrefix) {
            const actualFolderName = actualPrefix.split('/')[1];
            if (album.folderPath !== actualFolderName) {
                console.log(`  Updating folderPath: ${album.folderPath} -> ${actualFolderName}`);
                album.folderPath = actualFolderName;
                fixedAlbums++;
            }
            
            // Fix tracks
            for (const track of album.tracks) {
                const trackTitleNorm = normalize(track.title);
                
                // Find matching audio file in this album's folder
                const trackFiles = s3Keys.filter(k => 
                    k.startsWith(actualPrefix) && 
                    (k.endsWith('.mp3') || k.endsWith('.wav'))
                );
                
                let match = trackFiles.find(k => {
                    const filename = k.split('/').pop().replace(/\.(mp3|wav)$/i, '');
                    return normalize(filename) === trackTitleNorm;
                });
                
                if (!match) {
                    // Try fuzzy match
                    match = trackFiles.find(k => {
                        const filename = normalize(k.split('/').pop().replace(/\.(mp3|wav)$/i, ''));
                        return filename.includes(trackTitleNorm) || trackTitleNorm.includes(filename);
                    });
                }
                
                if (match) {
                    const newUrl = `https://singitpop-music.s3.eu-north-1.amazonaws.com/${match}`;
                    if (track.audioUrl !== newUrl) {
                        track.audioUrl = newUrl;
                        fixedTracks++;
                    }
                } else {
                    console.warn(`  ❌ Could not find S3 key for track: ${track.title}`);
                    failedTracks++;
                }
                
                // Also fix track cover if possible
                const trackImages = s3Keys.filter(k => 
                    k.startsWith(actualPrefix) && 
                    k.match(/\.(png|jpg|jpeg|webp)$/i)
                );
                
                // Try to find image in a subfolder with track name
                let imageMatch = trackImages.find(k => {
                    const segments = k.split('/');
                    return segments.some(seg => normalize(seg) === trackTitleNorm);
                });
                
                if (imageMatch) {
                    track.coverArt = `https://singitpop-music.s3.eu-north-1.amazonaws.com/${imageMatch}`;
                }
            }
            
            // Fix album cover
            const albumImages = s3Keys.filter(k => 
                k.startsWith(actualPrefix) && 
                k.match(/\.(png|jpg|jpeg|webp)$/i) &&
                k.split('/').length === 3 // Root of album folder
            );
            
            const albumCover = albumImages.find(k => {
                const f = k.toLowerCase();
                return f.includes('cover') || f.includes('album cover') || f.includes('front');
            }) || albumImages[0];
            
            if (albumCover) {
                album.coverArt = `https://singitpop-music.s3.eu-north-1.amazonaws.com/${albumCover}`;
            }
            
        } else {
            console.error(`  ❌ Could not find S3 folder for album: ${album.title}`);
        }
    }
    
    console.log('\n--- Results ---');
    console.log(`Fixed Albums: ${fixedAlbums}`);
    console.log(`Fixed Tracks: ${fixedTracks}`);
    console.log(`Failed Tracks: ${failedTracks}`);
    
    fs.writeFileSync(OUTPUT_PATH, JSON.stringify(albums, null, 2));
    console.log(`\nSaved fixed JSON to: ${OUTPUT_PATH}`);
}

reconcile();
