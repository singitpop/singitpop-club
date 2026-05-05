const XLSX = require('xlsx');
const EXCEL_PATH = '/Users/garybirrell/Desktop/Singitpop/READY FOR WEBSITE/SingIt Pop Music Tracker 26-10-25.xlsx';

const workbook = XLSX.readFile(EXCEL_PATH);
const sheetName = 'Songs';
const worksheet = workbook.Sheets[sheetName];
const data = XLSX.utils.sheet_to_json(worksheet, { header: 1 });

const albums = [];
const seen = new Set();

for (let i = 1; i < data.length; i++) {
    const row = data[i];
    const albumTitle = row[6];
    if (albumTitle && !seen.has(albumTitle)) {
        seen.add(albumTitle);
        albums.push(albumTitle);
    }
}

albums.forEach((title, index) => {
    console.log(`${index + 1}: ${title}`);
});
