/**
 * re-integrate-all.js
 * Restores the 4 new albums and updates the 5 custom covers.
 */
const fs = require('fs');
const path = require('path');

const albumsPath = path.join(process.cwd(), 'src/data/albums.json');
const albums = JSON.parse(fs.readFileSync(albumsPath, 'utf8'));

// 1. Data for the 4 New Albums (previously discovered)
const NEW_ALBUMS = [
    {
        id: "skin-and-silence",
        title: "Skin and Silence",
        releaseDate: "2026-04-14",
        type: "studio",
        genre: ["R&B"],
        folderPath: "Skin And Silence",
        coverArt: "https://singitpop-music.s3.eu-north-1.amazonaws.com/albums/Skin%20And%20Silence/Cover.png",
        tracks: [
            { id: 1, title: "Afterglow Motion", artist: "SingIt Pop", isSingle: true, ringtoneUrl: "https://singitpop-music.s3.eu-north-1.amazonaws.com/ringtones/afterglow-motion.mp3" },
            { id: 2, title: "Electric Lover", artist: "SingIt Pop" }
        ]
    },
    {
        id: "last-ones-standing",
        title: "Last Ones Standing",
        releaseDate: "2026-04-12",
        type: "studio",
        genre: ["Country"],
        folderPath: "Last Ones Standing",
        coverArt: "https://singitpop-music.s3.eu-north-1.amazonaws.com/albums/Last%20Ones%20Standing/Cover.png",
        tracks: [
            { id: 1, title: "Back Pocket Summer", artist: "SingIt Pop", isSingle: true, ringtoneUrl: "https://singitpop-music.s3.eu-north-1.amazonaws.com/ringtones/back-pocket-summer.mp3" },
            { id: 2, title: "Before the Lights Come On", artist: "SingIt Pop" }
        ]
    },
    {
        id: "solstice",
        title: "Solstice",
        releaseDate: "2026-04-11",
        type: "studio",
        genre: ["Dance Pop"],
        folderPath: "Solstice",
        coverArt: "https://singitpop-music.s3.eu-north-1.amazonaws.com/albums/Solstice/Cover.png",
        tracks: [
            { id: 1, title: "Afterglow Pulse", artist: "SingIt Pop", isSingle: true, ringtoneUrl: "https://singitpop-music.s3.eu-north-1.amazonaws.com/ringtones/afterglow-pulse.mp3" },
            { id: 2, title: "Before the Dawn", artist: "SingIt Pop" }
        ]
    },
    {
        id: "live-nashville-in-june",
        title: "Live Nashville in June",
        releaseDate: "2026-04-10",
        type: "live",
        genre: ["Country"],
        folderPath: "Live Nashville in June",
        coverArt: "https://singitpop-music.s3.eu-north-1.amazonaws.com/albums/Live%20Nashville%20in%20June/cover.png",
        tracks: [
            { id: 1, title: "Backroom Bandits", artist: "SingIt Pop", isSingle: true, ringtoneUrl: "https://singitpop-music.s3.eu-north-1.amazonaws.com/ringtones/backroom-bandits.mp3" },
            { id: 2, title: "Barstool Halo", artist: "SingIt Pop" }
        ]
    }
];

// 2. Mapping for the 5 Custom Covers (previously uploaded to S3)
const CUSTOM_COVERS = {
    'echoes-of-us': 'https://singitpop-music.s3.eu-north-1.amazonaws.com/albums/Echos%20Of%20Us/cover.png',
    'heartland-rhythms': 'https://singitpop-music.s3.eu-north-1.amazonaws.com/albums/Heartland%20Rythms/cover.png',
    'singles': 'https://singitpop-music.s3.eu-north-1.amazonaws.com/albums/Singles/cover.png',
    'popstar-winter-wonderland': 'https://singitpop-music.s3.eu-north-1.amazonaws.com/albums/Pop%20Star%20Winter%20Wonderland/cover.png',
    'forever-starts-today-country-music-for-weddings': 'https://singitpop-music.s3.eu-north-1.amazonaws.com/albums/Forever%20Starts%20Today%20-%20Country%20Album/cover.png'
};

// Update Covers
albums.forEach(album => {
    if (CUSTOM_COVERS[album.id]) {
        album.coverArt = CUSTOM_COVERS[album.id];
    }
});

// Add New Albums at the beginning
const existingIds = new Set(albums.map(a => a.id));
const toAdd = NEW_ALBUMS.filter(a => !existingIds.has(a.id));

const updatedAlbums = [...toAdd, ...albums];

fs.writeFileSync(albumsPath, JSON.stringify(updatedAlbums, null, 2));
console.log(`✨ Re-integrated ${toAdd.length} new albums and updated ${Object.keys(CUSTOM_COVERS).length} covers.`);
