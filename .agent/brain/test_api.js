const http = require('http');

async function testApi() {
    const options = {
        hostname: 'localhost',
        port: 3000,
        path: '/api/content/albums',
        method: 'GET'
    };

    const req = http.request(options, (res) => {
        let data = '';
        res.on('data', (chunk) => data += chunk);
        res.on('end', () => {
            const albums = JSON.parse(data);
            const midnight = albums.find(a => a.id === 'midnight-motion-2025');
            console.log('Midnight Motion API Output:');
            console.log('Title:', midnight.title);
            console.log('CoverArt:', midnight.coverArt);
            console.log('Tracks:', midnight.tracks.length);
        });
    });

    req.on('error', (e) => console.error(e));
    req.end();
}

testApi();
