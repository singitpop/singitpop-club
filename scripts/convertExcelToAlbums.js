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
    const albumName = row[6];  // Column G: Album Title
    const trackNumber = row[5]; // Column F: Track No
    const releaseDate = row[8]; // Column I: Release Date (Excel date number)

    // Skip empty rows
    if (!trackTitle || !albumName) continue;

    // Convert Excel date to year
    let year = new Date().getFullYear();
    if (releaseDate && typeof releaseDate === 'number') {
        // Excel dates are days since 1900-01-01
        const excelEpoch = new Date(1900, 0, 1);
        const date = new Date(excelEpoch.getTime() + (releaseDate - 2) * 24 * 60 * 60 * 1000);
        year = date.getFullYear();
    }

    // Store track info by album name
    if (!tracksByAlbum[albumName]) {
        tracksByAlbum[albumName] = [];
    }

    tracksByAlbum[albumName].push({
        title: trackTitle,
        genre: genre || 'Pop',
        trackNumber: trackNumber || tracksByAlbum[albumName].length + 1,
        year: year
    });
}

console.log('🔍 Matching albums with folders and MP3 files...\n');

// Match albums with folders
for (const [albumName, tracks] of Object.entries(tracksByAlbum)) {
    // Find matching folder (case-insensitive, flexible matching)
    const matchingFolder = albumFolders.find(folder =>
        folder.toLowerCase().includes(albumName.toLowerCase()) ||
        albumName.toLowerCase().includes(folder.toLowerCase()) ||
        folder.toLowerCase().replace(/[^a-z0-9]/g, '') === albumName.toLowerCase().replace(/[^a-z0-9]/g, '')
    );

    if (!matchingFolder) {
        console.log(`   ⚠️  No folder found for album: "${albumName}"`);
        continue;
    }

    const folderPath = path.join(ALBUMS_SOURCE_DIR, matchingFolder);
    const year = tracks[0]?.year || new Date().getFullYear();

    // Create album slug
    const albumSlug = `${albumName}-${year}`
        .toLowerCase()
        .replace(/[^a-z0-9]+/g, '-')
        .replace(/^-|-$/g, '');

    // Get Audio files from folder for matching (MP3 or WAV)
    let audioFiles = [];
    try {
        const allFiles = fs.readdirSync(folderPath);

        // Filter and clean files
        audioFiles = allFiles
            .filter(file => {
                const ext = file.toLowerCase();
                if (!ext.endsWith('.mp3') && !ext.endsWith('.wav')) return false;

                // Exclude version numbers like "song-2.wav", "song 2.wav", "song(1).wav"
                // Regex checks for hyphen/space followed by digits at the end of name
                const baseName = path.parse(file).name;
                const hasVersionNumber = /[- ]\d+$/.test(baseName) || /\(\d+\)$/.test(baseName);

                // User explicitly requested to ignore numbered files (older versions)
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

    // Initialize album
    albums[albumSlug] = {
        id: albumSlug,
        title: albumName,
        year: year,
        genre: genres,
        coverArt: `/albums/artwork/${albumSlug}.jpg`,
        tracks: [],
        releaseDate: `${year}-01-01`,
        folderPath: matchingFolder,
        mp3Count: audioFiles.length
    };

    // Add tracks
    tracks.forEach((track, index) => {
        const trackSlug = track.title
            .toLowerCase()
            .replace(/[^a-z0-9]+/g, '-')
            .replace(/^-|-$/g, '');

        const trackNum = String(track.trackNumber || index + 1).padStart(2, '0');

        // Default S3 URL structure (fallback to mp3)
        let filename = `${trackNum}-${trackSlug}.mp3`;

        // Try to find matching file in physical folder to get exact filename case
        if (audioFiles.length > 0) {
            // Priority: Exact match > Partial match
            // Priority: MP3 > WAV

            // 1. Try to find exact title match
            let matchingFile = audioFiles.find(f =>
                f.toLowerCase().startsWith(track.title.toLowerCase() + '.') ||
                f.toLowerCase() === track.title.toLowerCase()
            );

            // 2. If not found, try includes
            if (!matchingFile) {
                matchingFile = audioFiles.find(f =>
                    f.toLowerCase().includes(track.title.toLowerCase()) ||
                    f.toLowerCase().includes(trackSlug.replace(/-/g, ' '))
                );
            }

            if (matchingFile) {
                filename = matchingFile;
            }
        }

        albums[albumSlug].tracks.push({
            id: index + 1,
            title: track.title,
            duration: '3:30', // Default, update if you have duration data
            plays: '0',
            locked: false,
            price: 0.99,
            genre: track.genre,
            // S3 URL: https://singitpop-music.s3.us-east-1.amazonaws.com/albums/[folder-slug]/[filename]
            audioUrl: `${S3_BUCKET_URL}/albums/${s3FolderSlug}/${encodeURIComponent(filename)}`,
            sourceFolder: matchingFolder,
            albumId: albumSlug
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
    audioUrl: string;
    highResUrl?: string;
    albumId?: string;
    sourceFolder?: string;
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
