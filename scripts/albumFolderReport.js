#!/usr/bin/env node

/**
 * Generate a report of album/folder matching issues
 */

const XLSX = require('xlsx');
const fs = require('fs');
const path = require('path');

const ALBUMS_SOURCE_DIR = '/Users/garybirrell/Desktop/Singitpop';
const EXCEL_PATH = '/Users/garybirrell/Desktop/Singitpop/SingIt Pop Music Tracker 26-10-25.xlsx';

// Read Excel
const workbook = XLSX.readFile(EXCEL_PATH);
const worksheet = workbook.Sheets['Songs'];
const data = XLSX.utils.sheet_to_json(worksheet, { header: 1 });

// Get unique album names from Excel
const excelAlbums = new Set();
data.slice(1).forEach(row => {
    if (row[6]) excelAlbums.add(row[6]);
});

// Get folder names
const folders = fs.readdirSync(ALBUMS_SOURCE_DIR)
    .filter(name => {
        const fullPath = path.join(ALBUMS_SOURCE_DIR, name);
        try {
            return fs.statSync(fullPath).isDirectory() &&
                name !== 'website' &&
                name !== 'untitled folder' &&
                !name.startsWith('.');
        } catch (e) {
            return false;
        }
    });

// Find matches
const matched = [];
const unmatchedAlbums = [];
const unmatchedFolders = [...folders];

for (const album of excelAlbums) {
    const matchingFolder = folders.find(folder =>
        folder.toLowerCase().includes(album.toLowerCase()) ||
        album.toLowerCase().includes(folder.toLowerCase()) ||
        folder.toLowerCase().replace(/[^a-z0-9]/g, '') === album.toLowerCase().replace(/[^a-z0-9]/g, '')
    );

    if (matchingFolder) {
        matched.push({ album, folder: matchingFolder });
        const index = unmatchedFolders.indexOf(matchingFolder);
        if (index > -1) unmatchedFolders.splice(index, 1);
    } else {
        unmatchedAlbums.push(album);
    }
}

// Generate report
console.log('# Album/Folder Matching Report\n');
console.log(`## Summary`);
console.log(`- Excel albums: ${excelAlbums.size}`);
console.log(`- Folders found: ${folders.length}`);
console.log(`- Matched: ${matched.length}`);
console.log(`- Unmatched albums: ${unmatchedAlbums.length}`);
console.log(`- Unmatched folders: ${unmatchedFolders.length}\n`);

if (unmatchedAlbums.length > 0) {
    console.log(`## ⚠️  Albums Without Folders (${unmatchedAlbums.length})\n`);
    unmatchedAlbums.forEach((album, i) => {
        console.log(`${i + 1}. "${album}"`);

        // Find similar folder names
        const similar = folders.filter(folder => {
            const albumWords = album.toLowerCase().split(/\s+/);
            const folderLower = folder.toLowerCase();
            return albumWords.some(word => word.length > 3 && folderLower.includes(word));
        });

        if (similar.length > 0) {
            console.log(`   Possible matches:`);
            similar.forEach(f => console.log(`   - "${f}"`));
        }
        console.log('');
    });
}

if (unmatchedFolders.length > 0) {
    console.log(`## 📁 Folders Without Albums (${unmatchedFolders.length})\n`);
    unmatchedFolders.forEach((folder, i) => {
        console.log(`${i + 1}. "${folder}"`);
    });
    console.log('');
}

console.log(`## ✅ Successfully Matched (${matched.length})\n`);
matched.slice(0, 10).forEach(m => {
    console.log(`- "${m.album}" → "${m.folder}"`);
});
if (matched.length > 10) {
    console.log(`... and ${matched.length - 10} more\n`);
}

// Save detailed report
const report = {
    summary: {
        excelAlbums: excelAlbums.size,
        folders: folders.length,
        matched: matched.length,
        unmatchedAlbums: unmatchedAlbums.length,
        unmatchedFolders: unmatchedFolders.length
    },
    unmatchedAlbums: unmatchedAlbums,
    unmatchedFolders: unmatchedFolders,
    matched: matched
};

const reportPath = path.join(__dirname, '../src/data/album-folder-report.json');
fs.writeFileSync(reportPath, JSON.stringify(report, null, 2));
console.log(`\n📄 Detailed report saved to: ${reportPath}`);
