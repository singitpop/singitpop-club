
import fs from 'fs';
import path from 'path';
import xlsx from 'xlsx';

const READY_FOLDER_BASE = '/Users/garybirrell/Desktop/Singitpop/READY FOR WEBSITE';

const readyRootFiles = fs.readdirSync(READY_FOLDER_BASE);
const trackerFile = readyRootFiles.find(f => f.includes('SingIt Pop Music Tracker') && f.endsWith('.xlsx'));

if (trackerFile) {
    console.log(`Found Tracker: ${trackerFile}`);
    const wb = xlsx.readFile(path.join(READY_FOLDER_BASE, trackerFile));
    const sheet = wb.Sheets[wb.SheetNames[0]];
    const data = xlsx.utils.sheet_to_json(sheet, { header: 1 });

    console.log('--- Headers (Row 0) ---');
    (data[0] as any[]).forEach((h, i) => console.log(`${i}: ${h}`));

    console.log('\n--- First Data Row (Row 1) ---');
    console.log(JSON.stringify(data[1], null, 2));
} else {
    console.log('Tracker not found');
}
