#!/usr/bin/env node

/**
 * Script to convert Excel spreadsheet to album data structure
 * Scans actual album folders and MP3 files
 * Generates AWS S3 URLs for audio files
 * 
 * Excel columns:
 * A: Track title
 * B: Genre
 * D: Album/single (Type)
 * F: Track number
 * G: Album Title
 * I: Release Date
 */

const XLSX = require('xlsx');
const fs = require('fs');
const path = require('path');

const ALBUMS_SOURCE_DIR = '/Users/garybirrell/Desktop/Singitpop/READY FOR WEBSITE';
const EXCEL_PATH = '/Users/garybirrell/Desktop/Singitpop/SingIt Pop Music Tracker 26-10-25.xlsx';
const S3_BUCKET_URL = 'https://singitpop-music.s3.eu-north-1.amazonaws.com';

console.log('🎵 Starting album data conversion...\n');

// Read the Excel file
console.log('📖 Reading Excel file...');
const workbook = XLSX.readFile(EXCEL_PATH);
const sheetName = 'Songs';
const worksheet = workbook.Sheets[sheetName];

// Convert to JSON
const data = XLSX.utils.sheet_to_json(worksheet, { header: 1 });
console.log(`   Found ${data.length} rows in '${sheetName}' sheet\n`);

// Scan album folders
console.log('📁 Scanning album folders...');
const albumFolders = fs.readdirSync(ALBUMS_SOURCE_DIR)
    .filter(name => {
        const fullPath = path.join(ALBUMS_SOURCE_DIR, name);
        try {
            return fs.statSync(fullPath).isDirectory() &&
                name !== 'website' &&
                name !== 'untitled folder' &&
                !name.startsWith('.');
        } catch (e) {
            return false;
        }
    });
console.log(`   Found ${albumFolders.length} album folders\n`);

// Process Excel data
const albums = {};
const tracksByAlbum = {};

for (let i = 1; i < data.length; i++) {
    const row = data[i];

    const trackTitle = row[0]; // Column A: Song Title
    const genre = row[1];      // Column B: Genre
    const singleType = row[3] ? String(row[3]).trim().toLowerCase() : ''; // Column D: Single marker (all singles)
    const albumName = row[6];  // Column G: Album Title
    const trackNumber = row[5]; // Column F: Track No
    const releaseDate = row[8]; // Column I: Release Date (Excel date number)
    const latestMarker = row[10] ? String(row[10]).trim().toLowerCase() : ''; // Column K: Latest single marker

    // Skip empty rows
    if (!trackTitle || !albumName) continue;

    // Convert Excel date to full date string (YYYY-MM-DD)
    let year = new Date().getFullYear();
    let fullDateStr = `${year}-01-01`; // Default

    if (releaseDate) {
        let date;
        if (typeof releaseDate === 'number') {
            // Excel dates are days since 1900-01-01
            const excelEpoch = new Date(1900, 0, 1);
            date = new Date(excelEpoch.getTime() + (releaseDate - 2) * 24 * 60 * 60 * 1000);
        } else if (typeof releaseDate === 'string') {
            // Check for UK date format DD/MM/YYYY
            if (releaseDate.includes('/')) {
                const parts = releaseDate.split('/');
                if (parts.length === 3) {
                    // Assume DD/MM/YYYY
                    const day = parseInt(parts[0], 10);
                    const month = parseInt(parts[1], 10) - 1; // Months are 0-indexed in JS
                    const yearVal = parseInt(parts[2], 10);
                    date = new Date(yearVal, month, day);
                }
            }

            if (!date || isNaN(date.getTime())) {
                // Try standard parsing
                date = new Date(releaseDate);
            }
        }

        if (date && !isNaN(date.getTime())) {
            year = date.getFullYear();
            const month = String(date.getMonth() + 1).padStart(2, '0');
            const day = String(date.getDate()).padStart(2, '0');
            fullDateStr = `${year}-${month}-${day}`;
        }
    }

    // Store track info by album name
    if (!tracksByAlbum[albumName]) {
        tracksByAlbum[albumName] = [];
    }

    tracksByAlbum[albumName].push({
        title: trackTitle,
        genre: genre || 'Pop',
        trackNumber: trackNumber || tracksByAlbum[albumName].length + 1,
        year: year,
        releaseDate: fullDateStr, // Store full date
        singleType: singleType,
        latestMarker: latestMarker
    });
}

console.log('🔍 Matching albums with folders and MP3 files...\n');

// Match albums with folders
const folderMappings = {
    "Aplril Comes Soft": "April Comes Soft", // Typo in Excel
    "Heartland Rhythms": "Heartland Rythms", // Typo in folder
    "Echoes of Us": "Echos Of Us", // Typo in folder
    "Forever Starts Today (Country Music for Weddings)": "Forever Starts Today - Country Album", // Different formatting
    "Night Drive: 80s Beats & Ballads": "Night Drive - 80s Beats & Ballads", // Different separator
    "Popstar Winter Wonderland": "Pop Star Winter Wonderland", // Spacing difference
    "Summer Fever": "Summer fever" // Case difference (though search is case-insensitive, explicit mapping is safe)
};

for (const [albumName, tracks] of Object.entries(tracksByAlbum)) {
    // Find matching folder (case-insensitive, flexible matching) or use manual mapping
    let matchingFolder = folderMappings[albumName];

    if (!matchingFolder) {
        matchingFolder = albumFolders.find(folder =>
            folder.toLowerCase().includes(albumName.toLowerCase()) ||
            albumName.toLowerCase().includes(folder.toLowerCase()) ||
            folder.toLowerCase().replace(/[^a-z0-9]/g, '') === albumName.toLowerCase().replace(/[^a-z0-9]/g, '')
        );
    }

    if (!matchingFolder) {
        console.log(`   ⚠️  No folder found for album: "${albumName}"`);
        continue;
    }

    const folderPath = path.join(ALBUMS_SOURCE_DIR, matchingFolder);
    const year = tracks[0]?.year || new Date().getFullYear();
    const releaseDate = tracks[0]?.releaseDate || `${year}-01-01`; // Use full date from first track

    // Create album slug
    const albumSlug = `${albumName}-${year}`
        .toLowerCase()
        .replace(/[^a-z0-9]+/g, '-')
        .replace(/^-|-$/g, '');

    // Get Audio files from folder for matching (MP3 or WAV)
    let audioFiles = [];
    try {
        // Recursive function to find all audio files
        function getAudioFiles(dirPath) {
            let results = [];
            let list = [];
            try {
                list = fs.readdirSync(dirPath);
            } catch (e) {
                return [];
            }

            list.forEach(file => {
                const filePath = path.join(dirPath, file);
                const stat = fs.statSync(filePath);
                if (stat && stat.isDirectory()) {
                    results = results.concat(getAudioFiles(filePath));
                } else {
                    if (file.toLowerCase().endsWith('.wav') || file.toLowerCase().endsWith('.mp3')) {
                        results.push(filePath); // Store full path for now
                    }
                }
            });
            return results;
        }

        const fullAlbumPath = path.join(ALBUMS_SOURCE_DIR, matchingFolder);
        const allFilePaths = getAudioFiles(fullAlbumPath);

        // Map to filenames for matching logic, but now we know they exist
        audioFiles = allFilePaths
            .map(filePath => path.basename(filePath))
            .filter(file => {
                const ext = file.toLowerCase();

                // Exclude version numbers like "song-2.wav", "song 2.wav", "song(1).wav"
                const baseName = path.parse(file).name;
                const hasVersionNumber = /[- ]\d+$/.test(baseName) || /\(\d+\)$/.test(baseName);

                if (hasVersionNumber) return false;

                return true;
            })
            .sort();
    } catch (e) {
        console.log(`   ⚠️  Could not read folder: ${matchingFolder}`);
    }

    // Create clean slug for S3 folder name (must match upload script logic)
    const s3FolderSlug = matchingFolder
        .toLowerCase()
        .replace(/[^a-z0-9 ]/g, '')  // Remove special chars except spaces
        .replace(/ /g, '-');         // Replace spaces with hyphens

    // Get genres from tracks
    const genres = [...new Set(tracks.map(t => t.genre))];

    // Determine Album Type (Studio, Live, or Standard)
    // If ANY track is marked Studio/Live in Column K, the whole album gets that tag
    let albumType = 'standard';
    const hasStudioTag = tracks.some(t => t.latestMarker && t.latestMarker.includes('studio'));
    const hasLiveTag = tracks.some(t => t.latestMarker && t.latestMarker.includes('live'));

    if (hasStudioTag) albumType = 'studio';
    else if (hasLiveTag) albumType = 'live';

    // Initialize album
    albums[albumSlug] = {
        id: albumSlug,
        title: albumName,
        year: year,
        genre: genres,
        coverArt: `/albums/artwork/${albumSlug}.jpg`,
        tracks: [],
        releaseDate: releaseDate, // Use full date
        folderPath: matchingFolder,
        mp3Count: audioFiles.length,
        type: albumType // New field
    };

    // Add tracks
    tracks.forEach((track, index) => {
        const trackSlug = track.title
            .toLowerCase()
            .replace(/[^a-z0-9]+/g, '-')
            .replace(/^-|-$/g, '');

        const trackNum = String(track.trackNumber || index + 1).padStart(2, '0');

        // Default filenames
        let mp3Filename = `${trackNum}-${trackSlug}.mp3`;
        let wavFilename = `${trackNum}-${trackSlug}.wav`;
        let foundMp3 = false;
        let foundWav = false;

        // Try to find matching files in physical folder
        if (audioFiles.length > 0) {
            // Find MP3
            const mp3Match = audioFiles.find(f =>
                f.toLowerCase().endsWith('.mp3') && (
                    f.toLowerCase().startsWith(track.title.toLowerCase() + '.') ||
                    f.toLowerCase().includes(track.title.toLowerCase()) ||
                    f.toLowerCase().includes(trackSlug.replace(/-/g, ' '))
                )
            );

            // Find WAV
            const wavMatch = audioFiles.find(f =>
                f.toLowerCase().endsWith('.wav') && (
                    f.toLowerCase().startsWith(track.title.toLowerCase() + '.') ||
                    f.toLowerCase().includes(track.title.toLowerCase()) ||
                    f.toLowerCase().includes(trackSlug.replace(/-/g, ' '))
                )
            );

            if (mp3Match) {
                mp3Filename = mp3Match;
                foundMp3 = true;
            }
            if (wavMatch) {
                wavFilename = wavMatch;
                foundWav = true;
            }
        }

        albums[albumSlug].tracks.push({
            id: index + 1,
            title: track.title,
            duration: '3:30',
            plays: '0',
            locked: false, // Lock logic handled by client component based on tier
            price: 0.99,
            genre: track.genre,
            // WAV for VIPs only (if exists)
            highResUrl: foundWav ? `${S3_BUCKET_URL}/albums/${s3FolderSlug}/${encodeURIComponent(wavFilename)}` : undefined,
            // MP3 for everyone else (streaming)
            audioUrl: foundMp3 ? `${S3_BUCKET_URL}/albums/${s3FolderSlug}/${encodeURIComponent(mp3Filename)}` : undefined,
            sourceFolder: matchingFolder,
            albumId: albumSlug,
            isSingle: !!(track.singleType && track.singleType.includes('single')) // Column D marks all singles
        });
    });

    console.log(`   ✅ ${albumName} (${year}) - ${tracks.length} tracks, ${audioFiles.length} Audio Files`);
}

// Convert to array and sort by year (newest first)
const albumsArray = Object.values(albums).sort((a, b) => b.year - a.year);

console.log(`\n✨ Processed ${albumsArray.length} albums successfully!\n`);

// Generate TypeScript file
const tsContent = `/**
 * Album Data
 * Auto-generated from Excel spreadsheet
 * Generated: ${new Date().toISOString()}
 * 
 * Source: ${EXCEL_PATH}
 * Albums folder: ${ALBUMS_SOURCE_DIR}
 * S3 Bucket: ${S3_BUCKET_URL}
 */

export interface Track {
    id: number;
    title: string;
    duration: string;
    plays: string;
    locked: boolean;
    price: number;
    genre: string;
    highResUrl?: string;
    audioUrl?: string;
    albumId?: string;
    sourceFolder?: string;
    isSingle?: boolean;
}

export interface Album {
    id: string;
    title: string;
    year: number;
    genre: string[];
    coverArt: string;
    tracks: Track[];
    releaseDate: string;
    description?: string;
    featured?: boolean;
    trending?: boolean;
    folderPath?: string;
    mp3Count?: number;
    type?: 'studio' | 'live' | 'standard';
}

export const albums: Album[] = ${JSON.stringify(albumsArray, null, 2)};

// Helper functions
export function getAlbumById(id: string): Album | undefined {
    return albums.find(album => album.id === id);
}

export function getAlbumsByGenre(genre: string): Album[] {
    return albums.filter(album => 
        album.genre.some(g => g.toLowerCase() === genre.toLowerCase())
    );
}

export function getAlbumsByYear(year: number): Album[] {
    return albums.filter(album => album.year === year);
}

export function searchAlbums(query: string): Album[] {
    const lowerQuery = query.toLowerCase();
    return albums.filter(album =>
        album.title.toLowerCase().includes(lowerQuery) ||
        album.tracks.some(track => track.title.toLowerCase().includes(lowerQuery))
    );
}

export function getAllGenres(): string[] {
    const genres = new Set<string>();
    albums.forEach(album => {
        album.genre.forEach(g => genres.add(g));
    });
    return Array.from(genres).sort();
}

export function getAllYears(): number[] {
    const years = new Set<number>();
    albums.forEach(album => years.add(album.year));
    return Array.from(years).sort((a, b) => b - a);
}

// Latest Release Helpers
export function getLatestStudioAlbum(): Album | undefined {
    // Filter for type 'studio', fallback to 'standard' if none found
    // Sort by year descending, then by releaseDate if available
    const studioAlbums = albums.filter(a => a.type === 'studio');
    return studioAlbums.length > 0 ? studioAlbums[0] : albums[0];
}

export function getLatestSingle(): Track | undefined {
    // Find the latest album that contains a single
    // Then find the specific track marked as single
    for (const album of albums) {
        const singleTrack = album.tracks.find(t => t.isSingle);
        if (singleTrack) {
            return singleTrack;
        }
    }
    return undefined;
}
`;

// Write to file
const outputPath = path.join(__dirname, '../src/data/albumData.ts');
fs.mkdirSync(path.dirname(outputPath), { recursive: true });
fs.writeFileSync(outputPath, tsContent);

// Generate summary
const totalTracks = albumsArray.reduce((sum, album) => sum + album.tracks.length, 0);
const allGenres = getAllGenres();
const allYears = getAllYears();

console.log('📊 Statistics:');
console.log(`   - Total albums: ${albumsArray.length}`);
console.log(`   - Total tracks: ${totalTracks}`);
console.log(`   - Genres: ${allGenres.join(', ')}`);
console.log(`   - Year range: ${Math.min(...allYears)} - ${Math.max(...allYears)}`);
console.log(`\n📁 Output: ${outputPath}\n`);

// Generate a summary JSON for review
const summaryPath = path.join(__dirname, '../src/data/albumSummary.json');
const summary = {
    generated: new Date().toISOString(),
    totalAlbums: albumsArray.length,
    totalTracks: totalTracks,
    genres: allGenres,
    years: allYears,
    albums: albumsArray.map(album => ({
        id: album.id,
        title: album.title,
        year: album.year,
        trackCount: album.tracks.length,
        genres: album.genre,
        folderPath: album.folderPath,
        s3Url: `${S3_BUCKET_URL}/albums/${album.folderPath.toLowerCase().replace(/[^a-z0-9 ]/g, '').replace(/ /g, '-')}/`
    }))
};
fs.writeFileSync(summaryPath, JSON.stringify(summary, null, 2));
console.log(`📋 Summary: ${summaryPath}\n`);

function getAllGenres() {
    const genres = new Set();
    albumsArray.forEach(album => {
        album.genre.forEach(g => genres.add(g));
    });
    return Array.from(genres).sort();
}

function getAllYears() {
    const years = new Set();
    albumsArray.forEach(album => years.add(album.year));
    return Array.from(years).sort((a, b) => b - a);
}

console.log('✅ Done!\n');
