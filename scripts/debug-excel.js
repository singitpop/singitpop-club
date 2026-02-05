const XLSX = require('xlsx');
const EXCEL_PATH = '/Users/garybirrell/Desktop/Singitpop/SingIt Pop Music Tracker 26-10-25.xlsx';
const workbook = XLSX.readFile(EXCEL_PATH);
const sheet = workbook.Sheets['Songs'];
const data = XLSX.utils.sheet_to_json(sheet, { header: 1 });
const targetSong = data.find(row => row[6] && String(row[6]).toLowerCase().includes('starlight frequencies'));
console.log('Target Album Data (Row):', JSON.stringify(targetSong, null, 2));
console.log('Release Date Raw:', targetSong ? targetSong[8] : 'N/A');





