const http = require('http');

http.get('http://localhost:3000/api/content/albums', (res) => {
    let data = '';
    res.on('data', chunk => data += chunk);
    res.on('end', () => {
        try {
            const albums = JSON.parse(data);
            console.log("Total albums fetched:", albums.length);
            const a = albums[0];
            console.log("First album:", a.title, "\nCover:", a.coverArt);
        } catch (e) {
            console.error("Failed to parse", e);
        }
    });
}).on('error', (e) => {
    console.error(`Got error: ${e.message}`);
});
