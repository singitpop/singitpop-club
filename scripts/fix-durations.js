const fs = require('fs');
const path = require('path');
const musicMetadata = require('music-metadata'); // Now installed!

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

    // We need to scan recursively
    const filesMap = new Map(); // filename -> durationString

    async function scanDir(dir) {
        const entries = fs.readdirSync(dir, { withFileTypes: true });
        for (const entry of entries) {
            const fullPath = path.join(dir, entry.name);
            if (entry.isDirectory()) {
                await scanDir(fullPath);
            } else if (entry.name.endsWith('.mp3')) {
                try {
                    const metadata = await musicMetadata.parseFile(fullPath);
                    filesMap.set(entry.name, formatTime(metadata.format.duration));
                } catch (e) {
                    console.error(`Error reading ${entry.name}:`, e.message);
                }
            }
        }
    }

    console.log('Scanning audio files...');
    if (fs.existsSync(MP3_ROOT)) {
        await scanDir(MP3_ROOT);
        console.log(`Scanned ${filesMap.size} audio files.`);

        // Now update the TS file via regex
        // Pattern: "title": "Song Name", \n "duration": "3:30"
        // We look for filenames in the file (highResUrl or similar contains them)
        // Actually, matching by title might be safer if filenames vary slightly.
        // Let's iterate the map and replace specifically.

        let updateCount = 0;

        // Strategy: Iterate lines. If line has "title": "X", look ahead for "duration".
        // Or better: regex replace "duration": "3:30" if the previous lines identified the song.
        // But the file is huge. Simple replace of known titles?

        // Let's do a smart regex replacement:
        // We find the block for a song and update its duration.

        for (const [filename, duration] of filesMap.entries()) {
            // Filename is like "Song Name.mp3". Title in JSON is often "Song Name".
            const titleGuess = filename.replace(/\.mp3$/, '');

            // Regex to match: "title": "Song Name" ... "duration": "3:30"
            // We use a relatively safe lookahead approach or replaceAll with context
            // But titles might be lowercased or slightly different.
            // Let's try matching the HighResUrl which definitely contains the filename usually?
            // Actually, let's just search for the title key.

            // Create a regex that finds the title, then lazily finds duration
            // This is tricky with regex. 
            // Alternative: find unique "highResUrl" containing the filename

            // "highResUrl": ".../Song%20Name.wav"
            // Wait, local are MP3s, remote are WAVs often.
            // Let's rely on Title match for now, assuming decent naming

            const escapedTitle = titleGuess.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
            // Look for title line, then capture up to duration
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

        console.log(`Updated ${updateCount} durations.`);
        fs.writeFileSync(DATA_FILE, albumDataContent);
        console.log('Saved albumData.ts');

    } else {
        console.error('Directory not found:', MP3_ROOT);
    }
}

updateDurations();
