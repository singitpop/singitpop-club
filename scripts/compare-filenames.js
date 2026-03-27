/**
 * compare-filenames.js
 * Compares track titles from the Excel tracker against actual audio files.
 * Usage: node scripts/compare-filenames.js
 */

const XLSX = require('xlsx');
const fs = require('fs');
const path = require('path');

const ALBUMS_SOURCE_DIR = '/Users/garybirrell/Desktop/Singitpop/READY FOR WEBSITE';
const EXCEL_PATH = '/Users/garybirrell/Desktop/Singitpop/READY FOR WEBSITE/SingIt Pop Music Tracker 26-10-25.xlsx';

const FOLDER_MAPPINGS = {
    "Aplril Comes Soft": "April Comes Soft",
    "Heartland Rhythms": "Heartland Rythms",
    "Echoes of Us": "Echoes Of Us",
    "Forever Starts Today (Country Music for Weddings)": "Forever Starts Today - Country Album",
    "Night Drive: 80s Beats & Ballads": "Night Drive - 80s Beats & Ballads",
    "Popstar Winter Wonderland": "Pop Star Winter Wonderland",
    "Summer Fever": "Summer fever",
};

function normalize(str) {
    return String(str || '').toLowerCase().replace(/[^a-z0-9]/g, '');
}

function getAudioFiles(dirPath) {
    let results = [];
    try {
        fs.readdirSync(dirPath).forEach(file => {
            const fullPath = path.join(dirPath, file);
            if (fs.statSync(fullPath).isDirectory()) {
                results = results.concat(getAudioFiles(fullPath));
            } else if (/\.(mp3|wav)$/i.test(file)) {
                results.push(path.basename(file));
            }
        });
    } catch { /* folder may not exist */ }
    return results;
}

// Scan disk folders
const albumFolders = fs.readdirSync(ALBUMS_SOURCE_DIR).filter(name => {
    try {
        return fs.statSync(path.join(ALBUMS_SOURCE_DIR, name)).isDirectory() &&
            !name.startsWith('.') && name !== 'website' && name !== 'untitled folder';
    } catch { return false; }
});

// Read Excel
const workbook = XLSX.readFile(EXCEL_PATH);
const data = XLSX.utils.sheet_to_json(workbook.Sheets['Songs'], { header: 1 });

const tracksByAlbum = {};
for (let i = 1; i < data.length; i++) {
    const row = data[i];
    const trackTitle = row[0];
    let albumName = row[6];
    if (!trackTitle || !albumName) continue;
    if (albumName === 'Aplril Comes Soft') albumName = 'April Comes Soft';
    if (albumName === 'Last One Standing') albumName = 'Last Ones Standing';
    if (!tracksByAlbum[albumName]) tracksByAlbum[albumName] = [];
    tracksByAlbum[albumName].push(String(trackTitle).trim());
}

console.log(`\n📚 Albums in Excel: ${Object.keys(tracksByAlbum).length}`);
console.log(`📁 Folders on disk: ${albumFolders.length}`);
console.log('🔍 Running comparison...\n');

let totalMissing = 0;
const missingByAlbum = {};
const matchedAlbums = [];
const noFolderAlbums = [];

for (const [albumName, tracks] of Object.entries(tracksByAlbum)) {
    let folder = FOLDER_MAPPINGS[albumName];
    if (!folder) {
        folder = albumFolders.find(f =>
            f.toLowerCase().includes(albumName.toLowerCase()) ||
            albumName.toLowerCase().includes(f.toLowerCase()) ||
            normalize(f) === normalize(albumName)
        );
    }

    if (!folder) {
        noFolderAlbums.push({ album: albumName, tracks });
        totalMissing += tracks.length;
        continue;
    }

    const audioFiles = getAudioFiles(path.join(ALBUMS_SOURCE_DIR, folder));
    const normFiles = audioFiles.map(f => normalize(f.replace(/\.(mp3|wav)$/i, '')));

    const missing = tracks.filter(title => {
        const norm = normalize(title);
        const match = normFiles.find(f => f.includes(norm) || norm.includes(f));
        if (albumName.includes('Neon') || albumName.includes('Heartland')) {
            console.log(`     [DEBUG] Album: ${albumName} | Track: "${title}" (${norm}) | Match: ${match ? 'YES' : 'NO'}`);
            if (!match) console.log(`     [DEBUG] Normalized files in folder: ${normFiles.join(', ')}`);
        }
        return !match;
    });

    if (missing.length > 0) {
        missingByAlbum[albumName] = { folder, missing };
        totalMissing += missing.length;
    } else {
        matchedAlbums.push(albumName);
    }
}

// --- Build Markdown ---
const lines = [];
lines.push('# Filename Mismatch Report');
lines.push(`> Generated: ${new Date().toLocaleString('en-GB')}`);
lines.push('');
lines.push(`| Stat | Count |`);
lines.push(`|------|-------|`);
lines.push(`| Albums in Excel | ${Object.keys(tracksByAlbum).length} |`);
lines.push(`| Folders on disk | ${albumFolders.length} |`);
lines.push(`| Fully matched albums | ${matchedAlbums.length} |`);
lines.push(`| Albums with issues | ${Object.keys(missingByAlbum).length + noFolderAlbums.length} |`);
lines.push(`| Missing / mismatched tracks | ${totalMissing} |`);
lines.push('');

lines.push('---');
lines.push('');
lines.push('## ❌ Missing Audio Files');
lines.push('');
lines.push('These tracks are listed in the Excel but no matching audio file was found in the folder.');
lines.push('Fix: rename the audio file to match the Excel title (or correct the typo in Excel), then re-run `node scripts/sync-music.js`.');
lines.push('');

for (const [albumName, { folder, missing }] of Object.entries(missingByAlbum)) {
    lines.push(`### ${albumName}`);
    lines.push(`Folder on disk: \`${folder}\``);
    lines.push('');
    missing.forEach(t => lines.push(`- [ ] ${t}`));
    lines.push('');
}

if (noFolderAlbums.length > 0) {
    lines.push('---');
    lines.push('');
    lines.push('## ⚠️ Albums With No Folder Found on Disk');
    lines.push('');
    lines.push('These albums are in the Excel spreadsheet but no matching folder was found.');
    lines.push('');
    noFolderAlbums.forEach(({ album, tracks }) => {
        lines.push(`### ${album}`);
        lines.push(`*${tracks.length} track(s) — entire folder missing*`);
        lines.push('');
        tracks.forEach(t => lines.push(`- [ ] ${t}`));
        lines.push('');
    });
}

lines.push('---');
lines.push('');
lines.push('## ✅ Fully Matched Albums');
lines.push('');
lines.push('All tracks in these albums have a matching audio file on disk.');
lines.push('');
matchedAlbums.forEach(a => lines.push(`- ${a}`));
lines.push('');

const reportMdPath = path.join(__dirname, '../FILENAME-MISMATCH-REPORT.md');
fs.writeFileSync(reportMdPath, lines.join('\n'));
console.log(`📄 Report saved to: ${reportMdPath}`);
console.log(`\n📊 ${totalMissing} missing tracks across ${Object.keys(missingByAlbum).length + noFolderAlbums.length} albums\n`);
