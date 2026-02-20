import { albums as staticAlbums, Track, Album } from '@/data/albumData';

// Re-export types
export type { Track, Album };

const S3_DATA_URL = 'https://singitpop-music.s3.eu-north-1.amazonaws.com/data/albums.json';

// In-memory cache to avoid fetching on every request (simple caching)
// In a serverless environment (Netlify/Vercel), this cache persists only for the lambda instance duration
let cachedAlbums: Album[] | null = null;
let lastFetchTime = 0;
const CACHE_DURATION = 60 * 1000; // 1 minute

export async function getAlbums(): Promise<Album[]> {
    const now = Date.now();
    if (cachedAlbums && (now - lastFetchTime < CACHE_DURATION)) {
        return cachedAlbums;
    }

    try {
        const fetchUrl = `${S3_DATA_URL}?t=${now}`;
        console.log(`Fetching albums from S3: ${fetchUrl}`);
        const res = await fetch(fetchUrl, {
            cache: 'no-store' // Ensure we get fresh data, circumventing Next.js fetch cache aggressiveness
        });

        if (!res.ok) {
            console.warn(`S3 Data Fetch Failed: ${res.status} ${res.statusText}`);
            // Fallback
            return staticAlbums;
        }

        const data = await res.json();
        if (Array.isArray(data) && data.length > 0) {
            cachedAlbums = data;
            lastFetchTime = now;
            return data;
        }
    } catch (error) {
        console.error("Error fetching dynamic albums:", error);
    }

    return staticAlbums;
}

// Client-side helper (but best used in Server Components or API routes)
export async function getLatestStudioAlbum() {
    const albums = await getAlbums();
    const studio = albums
        .filter(a => a.type === 'studio' && new Date(a.releaseDate) <= new Date())
        .sort((a, b) => new Date(b.releaseDate).getTime() - new Date(a.releaseDate).getTime());
    return studio[0] || null;
}

export async function getAllTracks(): Promise<Track[]> {
    const albums = await getAlbums();
    return albums.flatMap(a => a.tracks.map(t => ({ ...t, albumId: a.id })));
}
