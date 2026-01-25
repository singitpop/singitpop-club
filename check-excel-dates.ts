import * as XLSX from 'xlsx';
import * as fs from 'fs';

const workbook = XLSX.readFile('/tmp/tracker-check.xlsx');
const sheetName = workbook.SheetNames.includes('Songs') ? 'Songs' : workbook.SheetNames[0];
console.log('Using sheet:', sheetName);

const sheet = workbook.Sheets[sheetName];
const rows: any[] = XLSX.utils.sheet_to_json(sheet);

console.log('\nFirst 3 rows:');
rows.slice(0, 3).forEach((row, i) => {
    console.log(`\nRow ${i + 1}:`);
    console.log('  Album Title:', row['Album Title']);
    console.log('  Song Title:', row['Song Title']);
    console.log('  Release Date (raw):', row['Release Date']);
    console.log('  Release Date (type):', typeof row['Release Date']);
    console.log('  Album/Single:', row['Album/Single']);

    if (row['Release Date']) {
        const d = new Date(row['Release Date']);
        console.log('  Parsed Date:', d);
        console.log('  Year:', d.getFullYear());
    }
});
