import fs from 'fs';
import path from 'path';
import { parseFile } from 'music-metadata';

// Paths
const DATA_FILE = path.join(process.cwd(), 'src/data/albumData.ts');
const MP3_ROOT = path.join(process.cwd(), '../READY FOR WEBSITE');

// Helper to format duration
function formatTime(seconds) {
    const min = Math.floor(seconds / 60);
    const sec = Math.floor(seconds % 60);
    return `${min}:${sec.toString().padStart(2, '0')}`;
}

async function updateDurations() {
    console.log('Reading album data...');
    let albumDataContent = fs.readFileSync(DATA_FILE, 'utf8');

    // Config
    const SKIP_DIRS = new Set(['images', 'videos', 'artwork', 'covers', 'docs', '.git', 'node_modules']);
    let totalFilesScanned = 0;

    // We will scan first, then map.
    const filesMap = new Map();

    async function scanDir(dir) {
        const dirName = path.basename(dir).toLowerCase();
        if (SKIP_DIRS.has(dirName)) return;

        // console.log(`Scanning: ${dir}`);
        try {
            const entries = fs.readdirSync(dir, { withFileTypes: true });
            for (const entry of entries) {
                const fullPath = path.join(dir, entry.name);
                if (entry.isDirectory()) {
                    await scanDir(fullPath);
                } else if (entry.name.endsWith('.mp3')) {
                    try {
                        const metadata = await parseFile(fullPath);
                        filesMap.set(entry.name, formatTime(metadata.format.duration));
                        totalFilesScanned++;
                        if (totalFilesScanned % 50 === 0) process.stdout.write('.');
                    } catch (e) {
                        // ignore error
                    }
                }
            }
        } catch (e) {
            console.error(`Error accessing ${dir}:`, e.message);
        }
    }

    console.log('Scanning audio files (optimized)...');
    if (fs.existsSync(MP3_ROOT)) {
        await scanDir(MP3_ROOT);
        console.log(`\nScanned ${filesMap.size} audio files.`);

        // NOW REPLACE
        let updateCount = 0;
        console.log('Updating database...');

        for (const [filename, duration] of filesMap.entries()) {
            const titleGuess = filename.replace(/\.mp3$/, '');
            const escapedTitle = titleGuess.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');

            // Regex: match title key, capture content until duration key, then replace duration value
            // We use a specific regex to ensure we are editing the right song block
            const regex = new RegExp(`("title":\\s*"${escapedTitle}",[\\s\\S]*?"duration":\\s*")([^"]+)(")`, 'gi');

            if (regex.test(albumDataContent)) {
                albumDataContent = albumDataContent.replace(regex, (match, p1, oldDur, p3) => {
                    if (oldDur !== duration) {
                        updateCount++;
                        return `${p1}${duration}${p3}`;
                    }
                    return match;
                });
            }
        }

        console.log(`Updated ${updateCount} durations in memory.`);
        fs.writeFileSync(DATA_FILE, albumDataContent);
        console.log('Saved albumData.ts');

    } else {
        console.error('Directory not found:', MP3_ROOT);
    }
}

updateDurations();
