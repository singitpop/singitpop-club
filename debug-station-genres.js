const fs = require('fs');
const path = require('path');

// Read JSON directly
const albums = JSON.parse(fs.readFileSync(path.join(__dirname, 'src/data/albums.json'), 'utf8'));

const STATIONS = [
    { freq: '101.5', name: 'Pop Hits', genre: 'Pop' },
    { freq: '98.5', name: 'Country Roads', genre: 'Country' },
    { freq: '104.2', name: 'Rock Classics', genre: 'Rock' },
    { freq: '107.9', name: 'Party Mix', genre: 'Dance' },
    { freq: '88.0', name: 'Chill / Folk', genre: 'Folk' },
    { freq: '92.3', name: 'All Hits', genre: 'All' }
];

console.log("📊 Debugging Station Genres...");

const allTracks = albums.flatMap(a => a.tracks.map(t => ({
    title: t.title,
    genre: t.genre,
    albumGenre: a.genre
})));

console.log(`Total Tracks: ${allTracks.length}`);

// Collect all unique genres found
const uniqueGenres = new Set();
allTracks.forEach(t => {
    if (t.genre) uniqueGenres.add(t.genre);
    if (t.albumGenre) t.albumGenre.forEach(g => uniqueGenres.add(g));
});
console.log("Found Genres:", Array.from(uniqueGenres).sort());


STATIONS.forEach(station => {
    let filtered = [];
    if (station.genre === 'All') {
        filtered = allTracks;
    } else {
        filtered = allTracks.filter(t => {
            const g = (t.genre || "").toLowerCase();
            const ag = (t.albumGenre || []).map(x => x.toLowerCase());
            const target = station.genre.toLowerCase();

            if (target === 'dance') return g.includes('dance') || g.includes('disco') || g.includes('edm') || g.includes('club');
            if (target === 'folk') return g.includes('folk') || g.includes('acoustic');

            return g.includes(target) || ag.some(x => x.includes(target));
        });
    }

    console.log(`\n📻 ${station.name} (${station.freq}): found ${filtered.length} tracks`);
    if (filtered.length === 0) {
        console.log("   ❌ WARNING: No tracks found!");
    }
});
