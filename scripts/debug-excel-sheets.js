const XLSX = require('xlsx');
const EXCEL_PATH = '/Users/garybirrell/Desktop/Singitpop/SingIt Pop Music Tracker 26-10-25.xlsx';
const workbook = XLSX.readFile(EXCEL_PATH);
console.log('Sheet Names:', workbook.SheetNames);
