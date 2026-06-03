const XLSX = require('xlsx');
const EXCEL_PATH = '/Users/garybirrell/Desktop/Singitpop/READY FOR WEBSITE/SingIt Pop Music Tracker 26-10-25.xlsx';

const workbook = XLSX.readFile(EXCEL_PATH);
const sheetName = 'Songs';
const worksheet = workbook.Sheets[sheetName];
const data = XLSX.utils.sheet_to_json(worksheet, { header: 1 });

console.log('Total Rows:', data.length);
for (let i = 55; i < Math.min(data.length, 75); i++) {
    console.log(`Row ${i}:`, JSON.stringify(data[i]));
}
