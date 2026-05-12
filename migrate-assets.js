const fs = require('fs');
const path = require('path');

const PREVIOUS_BRAIN_DIR = '/Users/garybirrell/.gemini/antigravity/brain/58fc1d9a-b3f0-45d8-b68b-5bbf30be9779';
const ARTBOOKS_DIR = '/Users/garybirrell/Desktop/Singitpop/website/public/images/artbooks';

const files = fs.readdirSync(PREVIOUS_BRAIN_DIR);
const albumFolders = fs.readdirSync(ARTBOOKS_DIR);

function migrate() {
    files.forEach(file => {
        let targetSlug = null;
        let targetFileName = null;

        if (file.startsWith('sketch_')) {
            // e.g. sketch_dust_diamonds_v2_1778283071563.png
            const parts = file.replace('sketch_', '').split('_v2_')[0].split('_');
            targetSlug = findMatchingFolder(parts);
            targetFileName = 'extras/concept-sketch.png';
        } else if (file.startsWith('artbook_')) {
            // e.g. artbook_endless_glow_1777966979494.png
            const parts = file.replace('artbook_', '').replace(/(_v2)?_\d+\.png$/, '').split('_');
            targetSlug = findMatchingFolder(parts);
            targetFileName = 'main.png'; // Assuming artbook_ prefix is for main cover
        }

        if (targetSlug && targetFileName) {
            const sourcePath = path.join(PREVIOUS_BRAIN_DIR, file);
            const targetPath = path.join(ARTBOOKS_DIR, targetSlug, targetFileName);
            const targetDir = path.dirname(targetPath);

            if (!fs.existsSync(targetDir)) {
                fs.mkdirSync(targetDir, { recursive: true });
            }

            fs.copyFileSync(sourcePath, targetPath);
            console.log(`Copied ${file} -> ${targetSlug}/${targetFileName}`);
        }
    });
}

function findMatchingFolder(parts) {
    // fuzzy match parts against folder names
    return albumFolders.find(folder => {
        return parts.every(part => folder.includes(part));
    });
}

migrate();
