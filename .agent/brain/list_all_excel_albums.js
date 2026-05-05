const XLSX = require('xlsx');
const EXCEL_PATH = '/Users/garybirrell/Desktop/Singitpop/READY FOR WEBSITE/SingIt Pop Music Tracker 26-10-25.xlsx';

const workbook = XLSX.readFile(EXCEL_PATH);
const sheetName = 'Songs';
const worksheet = workbook.Sheets[sheetName];
const data = XLSX.utils.sheet_to_json(worksheet, { header: 1 });

const allAlbums = [];
const seen = new Set();
data.forEach((row, idx) => {
    if (idx === 0) return;
    const album = row[6];
    if (album && !seen.has(album)) {
        allAlbums.push({ title: album, genre: row[1], row: idx });
        seen.add(album);
    }
});

console.log(`Total Unique Albums: ${allAlbums.length}`);
allAlbums.forEach((a, i) => {
    console.log(`${i+1}: ${a.title} | ${a.genre}`);
});
