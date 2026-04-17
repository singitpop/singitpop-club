const fs = require('fs');
const path = require('path');
const XLSX = require('xlsx');

// Normalizer for S3 folder names (Title Case with spaces)
const normalize = (str) => {
    if (!str) return '';
    return str.trim()
        .replace(/\s+/g, ' ')
        .split(' ')
        .map(w => w.charAt(0).toUpperCase() + w.slice(1).toLowerCase())
        .join(' ');
};

// Excel Date to YYYY-MM-DD
const excelDateToJS = (serial) => {
    const utc_days = Math.floor(serial - 25569);
    const utc_value = utc_days * 86400;
    const date_info = new Date(utc_value * 1000);
    return date_info.toISOString().split('T')[0];
};

async function sync() {
    console.log('🚀 Starting Full Catalog Sync from Spreadsheet...');
    
    if (!fs.existsSync('tracker_temp.xlsx')) {
        console.error('❌ Missing tracker_temp.xlsx');
        process.exit(1);
    }

    const workbook = XLSX.readFile('tracker_temp.xlsx');
    const sheet = workbook.Sheets[workbook.SheetNames[0]];
    const rows = XLSX.utils.sheet_to_json(sheet);

    console.log(`📊 Found ${rows.length} tracks in spreadsheet.`);

    const albumsMap = new Map();

    for (const row of rows) {
        const albumTitleStr = row['Album Title'] || row['Album'] || 'Singles';
        const albumTitleNormalized = normalize(albumTitleStr);
        const albumId = albumTitleNormalized.toLowerCase().replace(/[^a-z0-9]/g, '-') + '-' + (row['year'] || 'misc');

        if (!albumsMap.has(albumId)) {
            albumsMap.set(albumId, {
                id: albumId,
                title: albumTitleNormalized,
                releaseDate: row['Release Date'] ? (typeof row['Release Date'] === 'number' ? excelDateToJS(row['Release Date']) : row['Release Date']) : '2024-01-01',
                year: parseInt(row['year']) || 2024,
                type: (row['Album/Single'] === 'Single' && !row['Album Title']) ? 'single' : 'studio',
                genre: [row['Genre'] || 'Pop'],
                folderPath: albumTitleNormalized,
                coverArt: `https://singitpop-music.s3.eu-north-1.amazonaws.com/albums/${encodeURIComponent(albumTitleNormalized)}/Cover.png`,
                tracks: []
            });
        }

        const album = albumsMap.get(albumId);
        
        // Track Logic
        const trackTitle = row['Song Title'] ? row['Song Title'].trim() : 'Unknown Track';
        const trackTitleNormalized = normalize(trackTitle);
        const trackNo = parseInt(row['Track No']) || (album.tracks.length + 1);

        album.tracks.push({
            id: trackNo,
            title: trackTitle,
            duration: "3:45", // Standard placeholder
            price: 0.99,
            genre: row['Genre'] || 'Pop',
            audioUrl: `https://singitpop-music.s3.eu-north-1.amazonaws.com/albums/${encodeURIComponent(albumTitleNormalized)}/${encodeURIComponent(trackTitle)}/${encodeURIComponent(trackTitle)}.mp3`,
            isSingle: row['Album/Single'] === 'Single'
        });
    }

    const albumsList = Array.from(albumsMap.values());
    
    // Final Polish: Sort tracks within albums by ID
    albumsList.forEach(a => {
        a.tracks.sort((t1, t2) => t1.id - t2.id);
    });

    // Write to file
    fs.writeFileSync('src/data/albums.json', JSON.stringify(albumsList, null, 2));

    console.log(`✅ Sync Complete: ${albumsList.length} albums, ${rows.length} tracks processed.`);
    console.log(`📂 Catalog saved to src/data/albums.json`);
}

sync();
