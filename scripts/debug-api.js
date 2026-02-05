async function checkApi() {
    const res = await fetch('http://localhost:3000/api/content/albums');
    const data = await res.json();
    console.log('Total Albums:', data.length);
    const now = new Date();
    const active = data.filter(a => new Date(a.releaseDate) <= now);
    const future = data.filter(a => new Date(a.releaseDate) > now);
    console.log('Active Albums:', active.length);
    console.log('Future Albums:', future.length);
    if (future.length > 0) {
        console.log('First Future Album:', future[0].title, future[0].releaseDate);
    }
}
checkApi();
