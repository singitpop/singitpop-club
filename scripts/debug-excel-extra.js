const XLSX = require('xlsx');
const EXCEL_PATH = '/Users/garybirrell/Desktop/Singitpop/SingIt Pop Music Tracker 26-10-25.xlsx';
const workbook = XLSX.readFile(EXCEL_PATH);

['Totals', 'Admin Sheet'].forEach(name => {
    const sheet = workbook.Sheets[name];
    const data = XLSX.utils.sheet_to_json(sheet, { header: 1 });
    console.log(`Sheet: ${name}`);
    console.log(JSON.stringify(data[0], null, 2));
    console.log('---');
});
