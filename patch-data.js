const fs = require('fs');

const albums = JSON.parse(fs.readFileSync('/tmp/albums-current.json', 'utf8'));

let patchedCount = 0;
let latestSingleUid = '';

albums.forEach(album => {
    // FIX 1: Fix Desert Winds and Open Roads specifically
    if (album.title.toLowerCase().includes('desert winds')) {
        console.log(`Patching Target Album: ${album.title}`);
        album.year = '2026';
        album.releaseDate = '2026-01-01'; // Future date
        const oldId = album.id;
        // Ensure ID has 2026 suffix
        if (!album.id.includes('2026')) {
            // If it was '...-1970', replace it
            album.id = album.id.replace('1970', '2026');
            // If it didn't have a year, append it (but it likely had 1970)
        }

        console.log(`  -> New ID: ${album.id}`);

        // Update tracks to match new Album ID
        album.tracks.forEach(track => {
            track.albumId = album.id;

            if (track.title.toLowerCase().includes('goodbye california')) {
                console.log(`  -> Patching Track: ${track.title}`);
                track.isSingle = true;
                // Construct the UID for metadata
                latestSingleUid = `${album.id}-${track.id}`;
            }
        });
    }
    // FIX 2: General fix for 1970 dates -> Default to 2025 if 1970
    else if (album.year === '1970') {
        album.year = '2025';
        album.releaseDate = '2025-01-01';
        album.id = album.id.replace('1970', '2025');
        album.tracks.forEach(t => t.albumId = album.id);
        patchedCount++;
    }

    // FIX 3: Detect Live Albums
    if (album.title.toLowerCase().includes('live')) {
        album.type = 'live';
    }
});

console.log(`Patched ${patchedCount} other albums from 1970 to 2025.`);
console.log(`Latest Single UID: ${latestSingleUid}`);

fs.writeFileSync('/tmp/albums-patched.json', JSON.stringify(albums, null, 2));

// Create metadata patch too
if (latestSingleUid) {
    const metadata = {
        "latestSingleId": parseInt(latestSingleUid.split('-').pop()),
        "latestSingleUid": latestSingleUid,
        "latestSingleTitle": "goodbye california",
        "latestVideoId": "s5GwnVX3-dY",
        "latestVideoTitle": "Paradise Again"
    };
    fs.writeFileSync('/tmp/metadata-patched.json', JSON.stringify(metadata, null, 2));
}
