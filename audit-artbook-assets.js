const fs = require('fs');
const path = require('path');

const ALBUMS_PATH = path.join(__dirname, 'src/data/albums.json');
const ARTBOOKS_BASE_DIR = path.join(__dirname, 'public/images/artbooks');

async function auditArtbooks() {
    const albums = JSON.parse(fs.readFileSync(ALBUMS_PATH, 'utf8'));
    const artbookAlbums = albums.filter(a => a.hasArtbook === true);

    console.log(`Auditing ${artbookAlbums.length} artbooks...`);

    const report = [];

    for (const album of artbookAlbums) {
        // Extract folder slug from coverArt or use ID
        let folderSlug = '';
        if (album.coverArt && album.coverArt.includes('/images/artbooks/')) {
            const parts = album.coverArt.split('/');
            folderSlug = parts[parts.length - 2];
        } else {
            folderSlug = album.id;
        }

        const albumDir = path.join(ARTBOOKS_BASE_DIR, folderSlug);
        const extrasDir = path.join(albumDir, 'extras');

        const status = {
            id: album.id,
            title: album.title,
            folder: folderSlug,
            mainCover: fs.existsSync(path.join(albumDir, 'main.png')),
            conceptSketch: fs.existsSync(path.join(extrasDir, 'concept-sketch.png')),
            thematicLore: fs.existsSync(path.join(extrasDir, 'Thematic_Lore.txt')),
            desktopWallpaper: fs.existsSync(path.join(extrasDir, 'desktop-wallpaper.png')),
            mobileWallpaper: fs.existsSync(path.join(extrasDir, 'mobile-wallpaper.png')),
            lyricsStatus: checkLyrics(album)
        };

        report.push(status);
    }

    console.table(report.map(r => ({
        Title: r.title,
        Cover: r.mainCover ? '✅' : '❌',
        Sketch: r.conceptSketch ? '✅' : '❌',
        Lore: r.thematicLore ? '✅' : '❌',
        Desktop: r.desktopWallpaper ? '✅' : '❌',
        Mobile: r.mobileWallpaper ? '✅' : '❌',
        Lyrics: r.lyricsStatus
    })));

    fs.writeFileSync('artbook_assets_audit.json', JSON.stringify(report, null, 2));
    console.log(`Audit report saved to artbook_assets_audit.json`);

    // Check for duplicates in concept sketches (placeholder check)
    checkSketchDuplicates(report);
}

function checkLyrics(album) {
    const totalTracks = album.tracks.length;
    const tracksWithLyrics = album.tracks.filter(t => t.lyrics && t.lyrics.rawText && t.lyrics.rawText.length > 0).length;
    
    if (tracksWithLyrics === totalTracks) return '✅ All';
    if (tracksWithLyrics === 0) return '❌ None';
    return `⚠️ ${tracksWithLyrics}/${totalTracks}`;
}

function checkSketchDuplicates(report) {
    const sketchHashes = new Map(); // In a real scenario we'd hash the files. For now let's just list existing ones.
    console.log('\nChecking for potential duplicate sketches (size check)...');
    
    const sizeMap = new Map();
    
    for (const item of report) {
        if (item.conceptSketch) {
            const sketchPath = path.join(ARTBOOKS_BASE_DIR, item.folder, 'extras', 'concept-sketch.png');
            const stats = fs.statSync(sketchPath);
            const size = stats.size;
            
            if (!sizeMap.has(size)) {
                sizeMap.set(size, []);
            }
            sizeMap.get(size).push(item.title);
        }
    }
    
    let duplicatesFound = false;
    for (const [size, titles] of sizeMap.entries()) {
        if (titles.length > 1) {
            console.log(`⚠️ Potential duplicates found (Size: ${size} bytes):`);
            console.log(`   - ${titles.join('\n   - ')}`);
            duplicatesFound = true;
        }
    }
    
    if (!duplicatesFound) {
        console.log('✅ No duplicate sketches found based on file size.');
    }
}

auditArtbooks().catch(console.error);
