const XLSX = require('xlsx');
const EXCEL_PATH = '/Users/garybirrell/Desktop/Singitpop/READY FOR WEBSITE/SingIt Pop Music Tracker 26-10-25.xlsx';
const workbook = XLSX.readFile(EXCEL_PATH);
const data = XLSX.utils.sheet_to_json(workbook.Sheets['Songs'], { header: 1 });

const indices = [15, 16, 17, 18, 20, 21, 22, 23, 25, 28, 29, 39, 42, 47, 53, 59, 60, 64, 67];
indices.forEach(idx => {
    const row = data[idx - 1]; // Row index is 1-based in Excel, so idx-1
    if (row) {
        console.log(`Row ${idx}: [${row[6]}] - ${row[0]} (${row[1]})`);
    }
});
