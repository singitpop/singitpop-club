const isReleased = (dateStr) => {
    if (!dateStr || dateStr === '0') return false;
    const releaseDate = new Date(dateStr);
    const today = new Date("2026-02-05T18:25:11Z"); // User's current time
    today.setHours(0, 0, 0, 0);
    console.log(`Checking ${dateStr}: ReleaseDate=${releaseDate.toISOString()} vs Today=${today.toISOString()} -> ${releaseDate <= today}`);
    return releaseDate <= today;
};

isReleased("2026-01-30");
isReleased("2026-04-17");
isReleased("2025-12-25");
