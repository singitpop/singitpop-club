const fs = require('fs');
const path = require('path');

const ALBUMS_PATH = path.join(__dirname, '../src/data/albums.json');
const newAlbum = {
    "id": "between-the-lines-of-love-2024",
    "title": "Between The Lines Of Love",
    "year": 2024,
    "genre": ["Country"],
    "coverArt": "cover.png",
    "tracks": [
        { "id": 1, "title": "Forever Yours", "duration": "3:00", "plays": "0", "locked": false, "price": 0.99, "genre": "Country", "mood": "Romantic", "highResUrl": "https://singitpop-music.s3.eu-north-1.amazonaws.com/albums/between-the-lines-of-love/Forever%20Yours.wav", "sourceFolder": "Between the lines of love", "albumId": "between-the-lines-of-love-2024", "isSingle": false },
        { "id": 2, "title": "I'm Missing You", "duration": "3:00", "plays": "0", "locked": false, "price": 0.99, "genre": "Country", "mood": "Sentimental", "highResUrl": "https://singitpop-music.s3.eu-north-1.amazonaws.com/albums/between-the-lines-of-love/I'm%20Missing%20You.wav", "sourceFolder": "Between the lines of love", "albumId": "between-the-lines-of-love-2024", "isSingle": false },
        { "id": 3, "title": "A Love That Never Fades", "duration": "3:00", "plays": "0", "locked": false, "price": 0.99, "genre": "Country", "mood": "Uplifting", "highResUrl": "https://singitpop-music.s3.eu-north-1.amazonaws.com/albums/between-the-lines-of-love/A%20Love%20That%20Never%20Fades.wav", "sourceFolder": "Between the lines of love", "albumId": "between-the-lines-of-love-2024", "isSingle": true },
        { "id": 4, "title": "a dream with you", "duration": "3:00", "plays": "0", "locked": false, "price": 0.99, "genre": "Country", "mood": "Dreamy", "highResUrl": "https://singitpop-music.s3.eu-north-1.amazonaws.com/albums/between-the-lines-of-love/a%20dream%20with%20you.wav", "sourceFolder": "Between the lines of love", "albumId": "between-the-lines-of-love-2024", "isSingle": false },
        { "id": 5, "title": "I want to know what love is", "duration": "3:00", "plays": "0", "locked": false, "price": 0.99, "genre": "Country", "mood": "Emotional", "highResUrl": "https://singitpop-music.s3.eu-north-1.amazonaws.com/albums/between-the-lines-of-love/I%20want%20to%20know%20what%20love%20is.wav", "sourceFolder": "Between the lines of love", "albumId": "between-the-lines-of-love-2024", "isSingle": true },
        { "id": 6, "title": "chasing waterfalls", "duration": "3:00", "plays": "0", "locked": false, "price": 0.99, "genre": "Country", "mood": "Reflective", "highResUrl": "https://singitpop-music.s3.eu-north-1.amazonaws.com/albums/between-the-lines-of-love/chasing%20waterfalls.wav", "sourceFolder": "Between the lines of love", "albumId": "between-the-lines-of-love-2024", "isSingle": false },
        { "id": 7, "title": "Endless Love", "duration": "3:00", "plays": "0", "locked": false, "price": 0.99, "genre": "Country", "mood": "Romantic", "highResUrl": "https://singitpop-music.s3.eu-north-1.amazonaws.com/albums/between-the-lines-of-love/Endless%20Love.wav", "sourceFolder": "Between the lines of love", "albumId": "between-the-lines-of-love-2024", "isSingle": false },
        { "id": 8, "title": "How Long", "duration": "3:00", "plays": "0", "locked": false, "price": 0.99, "genre": "Country", "mood": "Steadfast", "highResUrl": "https://singitpop-music.s3.eu-north-1.amazonaws.com/albums/between-the-lines-of-love/How%20Long.wav", "sourceFolder": "Between the lines of love", "albumId": "between-the-lines-of-love-2024", "isSingle": false },
        { "id": 9, "title": "I'm Coming Back to You", "duration": "3:00", "plays": "0", "locked": false, "price": 0.99, "genre": "Country", "mood": "Hopeful", "highResUrl": "https://singitpop-music.s3.eu-north-1.amazonaws.com/albums/between-the-lines-of-love/I'm%20Coming%20Back%20to%20You.wav", "sourceFolder": "Between the lines of love", "albumId": "between-the-lines-of-love-2024", "isSingle": true },
        { "id": 10, "title": "This Moment is Ours", "duration": "3:00", "plays": "0", "locked": false, "price": 0.99, "genre": "Country", "mood": "Intimate", "highResUrl": "https://singitpop-music.s3.eu-north-1.amazonaws.com/albums/between-the-lines-of-love/This%20Moment%20is%20Ours.wav", "sourceFolder": "Between the lines of love", "albumId": "between-the-lines-of-love-2024", "isSingle": false },
        { "id": 11, "title": "Love Like This", "duration": "3:00", "plays": "0", "locked": false, "price": 0.99, "genre": "Country", "mood": "Vibrant", "highResUrl": "https://singitpop-music.s3.eu-north-1.amazonaws.com/albums/between-the-lines-of-love/Love%20Like%20This.wav", "sourceFolder": "Between the lines of love", "albumId": "between-the-lines-of-love-2024", "isSingle": true },
        { "id": 12, "title": "You and Me Forever", "duration": "3:00", "plays": "0", "locked": false, "price": 0.99, "genre": "Ballad", "mood": "Tender", "highResUrl": "https://singitpop-music.s3.eu-north-1.amazonaws.com/albums/between-the-lines-of-love/You%20and%20Me%20Forever.wav", "sourceFolder": "Between the lines of love", "albumId": "between-the-lines-of-love-2024", "isSingle": false },
        { "id": 13, "title": "Making Love to You", "duration": "3:00", "plays": "0", "locked": false, "price": 0.99, "genre": "Country", "mood": "Passionate", "highResUrl": "https://singitpop-music.s3.eu-north-1.amazonaws.com/albums/between-the-lines-of-love/Making%20Love%20to%20You.wav", "sourceFolder": "Between the lines of love", "albumId": "between-the-lines-of-love-2024", "isSingle": true },
        { "id": 14, "title": "Love to Last", "duration": "3:00", "plays": "0", "locked": false, "price": 0.99, "genre": "Country", "mood": "Enduring", "highResUrl": "https://singitpop-music.s3.eu-north-1.amazonaws.com/albums/between-the-lines-of-love/Love%20to%20Last.wav", "sourceFolder": "Between the lines of love", "albumId": "between-the-lines-of-love-2024", "isSingle": false }
    ],
    "releaseDate": "2024-11-19",
    "folderPath": "Between the lines of love",
    "mp3Count": 14,
    "type": "standard",
    "trending": false,
    "exclusive": false,
    "accessTier": "free"
};

try {
    const data = fs.readFileSync(ALBUMS_PATH, 'utf8');
    const albums = JSON.parse(data);
    
    // Check if duplicate
    if (albums.find(a => a.id === newAlbum.id)) {
        console.log('⚠️ Album already exists. Updating tracks...');
        const index = albums.findIndex(a => a.id === newAlbum.id);
        albums[index] = newAlbum;
    } else {
        albums.push(newAlbum);
    }
    
    fs.writeFileSync(ALBUMS_PATH, JSON.stringify(albums, null, 2));
    console.log('✅ Successfully added Between The Lines Of Love to albums.json');
} catch (err) {
    console.error('❌ Error updating albums.json:', err);
    process.exit(1);
}
