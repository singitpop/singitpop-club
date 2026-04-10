const fs = require('fs');
const path = require('path');

const brainDir = '/Users/garybirrell/.gemini/antigravity/brain/1031244f-3623-4852-827b-d0ee18662051';
const artbookDir = '/Users/garybirrell/Desktop/Singitpop/website/public/images/artbooks';

// Mapping known artifact prefixes to their target album slugs
const mappings = {
    'desert_winds': 'desert-winds-and-open-roads-2026',
    'live_step': 'live-step-into-the-light-2025',
    'new_years': 'new-year-s-odyssey-2025',
    'snowfall_steel': 'snowfall-and-steel-strings-2025',
    'electric_sleigh': 'electric-sleigh-2025',
    'southern_lights': 'southern-lights-2026',
    'starlight_frequencies': 'starlight-frequencies-2026',
    'popstar_winter_wonderland': 'popstar-winter-wonderland',
    'forever_starts_today': 'forever-starts-today-country-music-for-weddings-2024',
    'night_drive': 'night-drive-80s-beats-ballads-2024',
    'once_upon_a_melody': 'once-upon-a-melody-inspired-by-disney-fairy-tales-2024',
    'echoes_of_yesterday': 'echoes-of-yesterday-2026',
    'echoes_of_us': 'echoes-of-us-2025',
    // ... add more if known
};

const artifactFiles = fs.readdirSync(brainDir);

Object.entries(mappings).forEach(([prefix, slug]) => {
    const targetDir = path.join(artbookDir, slug);
    if (!fs.existsSync(targetDir)) {
        fs.mkdirSync(targetDir, { recursive: true });
    }

    // Match files starting with the prefix (e.g., desert_winds_cover_123.png)
    const matches = artifactFiles.filter(f => f.startsWith(prefix) && (f.endsWith('.png') || f.endsWith('.webp') || f.endsWith('.jpg')));

    matches.forEach(file => {
        const sourcePath = path.join(brainDir, file);
        let destName = null;

        if (file.includes('cover') || file.includes('main')) destName = 'main.png';
        if (file.includes('sketch')) destName = 'sketch.png';
        if (file.includes('desktop')) destName = 'desktop.png';
        if (file.includes('mobile')) destName = 'mobile.png';

        if (destName) {
            fs.copyFileSync(sourcePath, path.join(targetDir, destName));
            console.log(`Copied ${file} to ${slug}/${destName}`);
        }
    });
});
