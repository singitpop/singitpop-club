import { albums as staticAlbums, Track, Album } from '@/data/albumData';

// Re-export types
export type { Track, Album };

const S3_DATA_URL = 'https://singitpop-music.s3.eu-north-1.amazonaws.com/data/albums.json';

// In-memory cache to avoid fetching on every request (simple caching)
// In a serverless environment (Netlify/Vercel), this cache persists only for the lambda instance duration
let cachedAlbums: Album[] | null = null;
let lastFetchTime = 0;
let activeFetchPromise: Promise<Album[]> | null = null;
const CACHE_DURATION = 60 * 1000; // 1 minute

export async function getAlbums(): Promise<Album[]> {
    // During Next.js static build, return local static albums to prevent
    // duplicate network calls and timeouts across 7 parallel workers.
    if (process.env.NEXT_PHASE === 'phase-production-build') {
        return staticAlbums;
    }

    const now = Date.now();
    if (cachedAlbums && (now - lastFetchTime < CACHE_DURATION)) {
        return cachedAlbums;
    }

    if (activeFetchPromise) {
        return activeFetchPromise;
    }

    activeFetchPromise = (async () => {
        try {
            console.log(`Fetching albums from S3: ${S3_DATA_URL}`);
            const res = await fetch(S3_DATA_URL, {
                next: { revalidate: 60 }, // Next.js specific caching mechanism
                cache: 'no-store' // Ensure we get fresh data or manage via Revalidate
            });

            if (!res.ok) {
                console.warn(`S3 Data Fetch Failed: ${res.status} ${res.statusText}`);
                return staticAlbums;
            }

            const data = await res.json();
            if (Array.isArray(data) && data.length > 0) {
                cachedAlbums = data;
                lastFetchTime = Date.now();
                return data;
            }
        } catch (error) {
            console.error("Error fetching dynamic albums:", error);
        } finally {
            activeFetchPromise = null;
        }
        return staticAlbums;
    })();

    return activeFetchPromise;
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
