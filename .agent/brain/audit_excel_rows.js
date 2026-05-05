const XLSX = require('xlsx');
const EXCEL_PATH = '/Users/garybirrell/Desktop/Singitpop/READY FOR WEBSITE/SingIt Pop Music Tracker 26-10-25.xlsx';

const workbook = XLSX.readFile(EXCEL_PATH);
const sheetName = 'Songs';
const worksheet = workbook.Sheets[sheetName];
const data = XLSX.utils.sheet_to_json(worksheet, { header: 1 });

const targets = [15,16,17,18,20,21,22,23,25,28,29,47, 53,60,64, 67, 39, 42, 59];

console.log('--- Excel Row Audit ---');
targets.forEach(rowIdx => {
    const row = data[rowIdx]; // Assuming user meant 1-based index into songs list
    if (row) {
        console.log(`Row ${rowIdx}: Song="${row[0]}" | Genre="${row[1]}" | Album="${row[6]}"`);
    } else {
        console.log(`Row ${rowIdx}: EMPTY`);
    }
});
