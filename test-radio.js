const fs = require('fs');
const albums = JSON.parse(fs.readFileSync('./src/data/albums.json', 'utf8'));

const EXPLICIT_COUNTRY_ALBUM_IDS = [
    'southern-lights-2026',
    'winding-roads-2025',
    'last-ones-standing-2026',
    'live-nashville-in-june-2026',
    'through-the-glass-2026',
    'boots-and-beats-country-line-dance-anthems-2024',
    'whispers-of-the-heart-country-ballads-for-the-soul-2024',
    'forever-starts-today-country-music-for-weddings-2024',
    'highways-of-the-heart-2024',
    'heartland-rhythms-2025',
    'dust-and-diamonds-2025',
    'line-dancing-after-dark-2025',
    'wildcards-and-whiskey-2025',
    'october-boots-and-fall-roots-2025',
    'snowfall-and-steel-strings-2025',
    'the-long-way-home-2025',
    'live-at-autumn-lights-2025',
    'live-step-into-the-light-2025',
    'desert-winds-and-open-roads-2026'
];

const allTracks = albums.flatMap(album => {
    return album.tracks.map(track => ({
        ...track,
        albumId: album.id,
        genre: track.genre || album.genre || 'Pop',
        albumGenre: album.genre
    }));
}).filter(t => t.audioUrl);

const countryTracks = allTracks.filter(t => {
    const rawG = t.genre || "";
    const g = Array.isArray(rawG)
        ? rawG.map((x) => x.toLowerCase()).join(' ')
        : (typeof rawG === 'string' ? rawG.toLowerCase() : "");

    const isExplicitlyPermitted = EXPLICIT_COUNTRY_ALBUM_IDS.includes(t.albumId);
    const isPureCountry = g.includes('country') && !g.includes('christmas') && !g.includes('pop');
    
    return isExplicitlyPermitted || isPureCountry;
});

console.log("Total audio tracks:", allTracks.length);
console.log("Country tracks:", countryTracks.length);
if(countryTracks.length === 0) console.log("FILTER RETURNED EMPTY ARRAY! FALLBACK WILL TRIGGER!");

// Also let's check what genres the EXPLICIT_COUNTRY_ALBUM_IDS have
const explicitAlbums = albums.filter(a => EXPLICIT_COUNTRY_ALBUM_IDS.includes(a.id));
console.log("\nExplicit Albums matching IDs:", explicitAlbums.map(a => `${a.id} -> ${a.genre}`));

