const { albums } = require('../src/data/albumData.ts');

console.log("🔍 Verifying Album Data Integrity...");
console.log(`Total Albums: ${albums.length}`);

if (albums.length === 0) {
    console.error("❌ No albums found! Data is missing.");
    process.exit(1);
}

let errorCount = 0;

albums.forEach((album, index) => {
    // Check ID
    if (!album.id) {
        console.error(`❌ Album at index ${index} has no ID!`);
        errorCount++;
    }

    // Check Tracks
    if (!album.tracks || !Array.isArray(album.tracks)) {
        console.error(`❌ Album '${album.title}' (${album.id}) has invalid tracks!`);
        errorCount++;
    } else if (album.tracks.length === 0) {
        console.warn(`⚠️ Album '${album.title}' (${album.id}) has 0 tracks.`);
    }

    // Attempt Lookup
    const found = albums.find(a => a.id === album.id);
    if (!found) {
        console.error(`❌ Lookup failed for album ID '${album.id}'!`);
        errorCount++;
    }
});

if (errorCount === 0) {
    console.log("✅ All albums look valid and lookup by ID works.");
} else {
    console.log(`❌ Found ${errorCount} errors.`);
    process.exit(1);
}
