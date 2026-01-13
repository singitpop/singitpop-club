const fs = require('fs');
const path = require('path');

const SOURCE_DIR = path.resolve(__dirname, '../../'); // Desktop/Singitpop
const TARGET_DIR = path.join(__dirname, '../public/albums/artwork');

console.log(`🎨 Scanning for artwork in: ${SOURCE_DIR}`);
console.log(`📂 Output directory: ${TARGET_DIR}`);

if (!fs.existsSync(TARGET_DIR)) {
    fs.mkdirSync(TARGET_DIR, { recursive: true });
}

// Get all album folders
const entries = fs.readdirSync(SOURCE_DIR, { withFileTypes: true });

entries.forEach(entry => {
    if (entry.isDirectory() && entry.name !== 'website' && !entry.name.startsWith('.')) {
        const albumPath = path.join(SOURCE_DIR, entry.name);

        // Slug generation (must match convertExcelToAlbums.js)
        // Note: The original script used the Excel "Album Title" to generate the slug, NOT the folder name.
        // But we don't have the Excel file parsing here easily without reusing that whole logic.
        // However, the folder name usually matches.
        // Let's try to find an image in the folder.

        const files = fs.readdirSync(albumPath);
        const imageFile = files.find(f => f.toLowerCase().endsWith('.jpg') || f.toLowerCase().endsWith('.png') || f.toLowerCase().endsWith('.jpeg'));

        if (imageFile) {
            // We need the correct slug. 
            // Since we can't definitively know the slug without the Excel mapping (mapping folder -> album title -> slug),
            // let's try to construct a slug from the folder name as a best guess fallback,
            // OR we can read the albumData.ts to find the mapping?
            // Reading albumData.ts is safer.

            const srcPath = path.join(albumPath, imageFile);
            console.log(`   Found image in ${entry.name}: ${imageFile}`);

            // We will copy it to a temp name first? 
            // Actually, let's just use the folder-based slug for now, 
            // or better, verify against albumData.ts if we can.

            // Simplified slug from folder name:
            const slug = entry.name.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '');
            // We'll append the year if we knew it, but we don't.
            // Wait, convertExcelToAlbums uses `${albumName}-${year}`.

            // Strategy: Check if any album in albumData.ts has a `sourceFolder` matching this folder.
            // We need to read albumData.ts.
        }
    }
});

// Better approach: Read albumData.ts first.
const { albums } = require('../src/data/albumData.ts');
// Warning: albumData.ts is TypeScript. We can't require it directly in Node without ts-node.
// We can use the JSON summary instead! 'src/data/albumSummary.json' was generated.

const summaryPath = path.join(__dirname, '../src/data/albumSummary.json');
if (fs.existsSync(summaryPath)) {
    const summary = require(summaryPath);
    console.log(`📖 Loaded summary for ${summary.albums.length} albums.`);

    summary.albums.forEach(album => {
        if (!album.folderPath) return; // name of the folder

        const folderName = album.folderPath;
        const albumPath = path.join(SOURCE_DIR, folderName);

        if (fs.existsSync(albumPath)) {
            const files = fs.readdirSync(albumPath);
            // Priority: cover.jpg, or [folderName].jpg, or any .jpg
            let imageFile = files.find(f => f.toLowerCase() === 'cover.jpg' || f.toLowerCase() === `${folderName.toLowerCase()}.jpg`);
            if (!imageFile) {
                imageFile = files.find(f => f.toLowerCase().endsWith('.jpg') || f.toLowerCase().endsWith('.png'));
            }

            if (imageFile) {
                const srcPath = path.join(albumPath, imageFile);
                // The slug ID is album.id
                const destFilename = `${album.id}.jpg`;
                const destPath = path.join(TARGET_DIR, destFilename);

                fs.copyFileSync(srcPath, destPath);
                console.log(`✅ Copied artwork for ${album.title} -> ${destFilename}`);
            } else {
                console.log(`⚠️ No artwork found for ${album.title} in ${folderName}`);
            }
        }
    });

} else {
    console.error("❌ albumSummary.json not found. Run sync-music first?");
}
