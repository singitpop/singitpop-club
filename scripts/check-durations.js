const fs = require('fs');
const path = require('path');
// Since we don't have music-metadata installed reliably yet, verify file existence first
const mp3Path = path.join(process.cwd(), 'READY FOR WEBSITE');

function scanFiles(dir) {
    const files = fs.readdirSync(dir);
    files.forEach(file => {
        const fullPath = path.join(dir, file);
        const stat = fs.statSync(fullPath);
        if (stat.isDirectory()) {
            scanFiles(fullPath);
        } else if (file.endsWith('.mp3')) {
            // Placeholder for duration logic
            console.log(`Found: ${file} (${stat.size} bytes)`);
        }
    });
}

console.log('Scanning for MP3s...');
if (fs.existsSync(mp3Path)) {
    scanFiles(mp3Path);
} else {
    console.error('Directory not found:', mp3Path);
}
