const fs = require('fs');
const d = require('./src/data/albums.json');

const solstice = d.find(a => a.id.includes('solstice'));
if (solstice) {
    // Ignite the Night (Live)
    const ignite = solstice.tracks.find(t => t.title.includes('Ignite'));
    if (ignite) {
        ignite.audioUrl = "https://singitpop-music.s3.eu-north-1.amazonaws.com/albums/solstice/Ignite%20the%20Night.mp3";
        ignite.highResUrl = "https://singitpop-music.s3.eu-north-1.amazonaws.com/albums/solstice/Ignite%20the%20Night.wav";
        ignite.duration = "3:30"; // Usually standard duration based on ID3 tags if possible
    }
    
    // We are Solstice
    const weAre = solstice.tracks.find(t => t.title.includes('We are Solstice') || t.title.includes('We Are'));
    if (weAre) {
        weAre.audioUrl = "https://singitpop-music.s3.eu-north-1.amazonaws.com/albums/solstice/We%20Are%20the%20Solstice.mp3";
        weAre.highResUrl = "https://singitpop-music.s3.eu-north-1.amazonaws.com/albums/solstice/We%20Are%20the%20Solstice.wav";
        weAre.duration = "3:30";
    }
    
    fs.writeFileSync('./src/data/albums.json', JSON.stringify(d, null, 2));
    console.log('✅ Patched albums.json for Solstice missing URLs');
}
