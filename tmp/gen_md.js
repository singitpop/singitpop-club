const fs = require('fs');
const path = require('path');

const rawReportPath = path.join(__dirname, '../tmp/artbook_raw_report.json');
const rawData = JSON.parse(fs.readFileSync(rawReportPath, 'utf8'));

let md = `# Digital Artbook Visual Audit\n\n`;
md += `This report outlines the status of the 4-part Digital Artbook assets for all 55 albums. \n\n`;
md += `> [!WARNING]\n> **28 Albums** are completely missing their artbook directories. \n> The remaining albums are mostly missing Desktop & Mobile wallpapers.\n\n`;

md += `| Album Title | Status | Main Cover | Sketch | Desktop | Mobile | DB CoverUrl |\n`;
md += `| :--- | :--- | :--- | :--- | :--- | :--- | :--- |\n`;

rawData.forEach(album => {
    const main = album.mainImg ? '✅' : '❌';
    const sketch = album.sketchImg ? '✅' : '❌';
    const desktop = album.desktopImg ? '✅' : '❌';
    const mobile = album.mobileImg ? '✅' : '❌';
    
    // Formatting the DB url so it doesn't break the table
    let shortUrl = album.coverArtUrl.replace('/images/', '').replace('artbooks/', '');
    if (shortUrl.length > 25) {
        shortUrl = shortUrl.substring(0, 22) + '...';
    }

    md += `| **${album.title}** | ${album.status} | ${main} | ${sketch} | ${desktop} | ${mobile} | \`${shortUrl}\` |\n`;
});

const outPath = path.join(__dirname, '../tmp/artbook_audit_md.js'); // temporary file 
fs.writeFileSync('/Users/garybirrell/.gemini/antigravity/brain/1031244f-3623-4852-827b-d0ee18662051/artbook_visual_status.md', md);
