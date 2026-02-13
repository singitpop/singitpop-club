/**
 * Convert albumData.ts to albums.json
 * This syncs the TypeScript source of truth to the JSON file used by S3
 */

const fs = require('fs');
const path = require('path');

// Import the albums from the TypeScript file
const { albums } = require('../src/data/albumData.ts');

const outputPath = path.join(__dirname, '../src/data/albums.json');

console.log('📝 Converting albumData.ts to albums.json...');
console.log(`   Found ${albums.length} albums`);

// Write to JSON file
fs.writeFileSync(outputPath, JSON.stringify(albums, null, 2), 'utf8');

console.log(`✅ Generated ${outputPath}`);
console.log('📤 Now run: node scripts/upload-metadata.js');
