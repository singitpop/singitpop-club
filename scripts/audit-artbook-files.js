const fs = require('fs');
const path = require('path');

const ALBUMS_JSON_PATH = path.join(__dirname, '../src/data/albums.json');
const ARTBOOKS_DIR = path.join(__dirname, '../public/images/artbooks');

const albums = JSON.parse(fs.readFileSync(ALBUMS_JSON_PATH, 'utf8'));

console.log('| Artbook | Folder | Cover | Desktop | Mobile | Lore | Status |');
console.log('| :--- | :--- | :---: | :---: | :---: | :---: | :--- |');

for (const album of albums) {
    const slug = album.id;
    const folder = path.join(ARTBOOKS_DIR, slug);
    const extrasDir = path.join(folder, 'extras');
    
    const hasFolder = fs.existsSync(folder);
    const hasMain = fs.existsSync(path.join(folder, 'main.png'));
    const hasDesktop = fs.existsSync(path.join(extrasDir, 'desktop-wallpaper.png'));
    const hasMobile = fs.existsSync(path.join(extrasDir, 'mobile-wallpaper.png'));
    const hasLore = fs.existsSync(path.join(extrasDir, 'Thematic_Lore.txt'));
    
    let status = 'MISSING';
    if (hasMain && hasDesktop && hasMobile && hasLore) {
        status = 'COMPLETE';
    } else if (hasMain) {
        status = 'PARTIAL';
    }
    
    const check = (val) => val ? '✅' : '❌';
    
    console.log(`| ${album.title} | ${slug} | ${check(hasMain)} | ${check(hasDesktop)} | ${check(hasMobile)} | ${check(hasLore)} | **${status}** |`);
}
