import { NextResponse } from 'next/server';
import { getAlbums } from '@/lib/data';
import { getSignedFileUrl, findImageKey } from '@/lib/s3';

export const dynamic = 'force-dynamic';

// Server-side in-memory cache for signed albums.
// Signed URLs are valid for 1 hour — we refresh every 45 minutes to stay safe.
let cachedSignedAlbums: any[] | null = null;
let cacheExpiry = 0;
const CACHE_TTL_MS = 45 * 60 * 1000; // 45 minutes

// Throttle: process items in batches to avoid AWS S3 rate limits
async function processInBatches<T, R>(items: T[], batchSize: number, fn: (item: T) => Promise<R>): Promise<R[]> {
    const results: R[] = [];
    for (let i = 0; i < items.length; i += batchSize) {
        const batch = items.slice(i, i + batchSize);
        const batchResults = await Promise.all(batch.map(fn));
        results.push(...batchResults);
    }
    return results;
}

export async function GET() {
    try {
        const now = Date.now();

        // Return cached result if still valid
        if (cachedSignedAlbums && now < cacheExpiry) {
            console.log('[Albums-API] Returning cached signed albums');
            const headers = new Headers();
            headers.set('Cache-Control', 'no-store, no-cache, must-revalidate, proxy-revalidate, max-age=0');
            return NextResponse.json(cachedSignedAlbums, { headers });
        }

        console.log('[Albums-API] Signing fresh album data...');
        const albums = await getAlbums();

        const filteredAlbums = albums.filter((a: any) => {
            return (a.type === 'studio' || a.type === 'standard' || a.type === 'mixtape' || a.type === 'live');
        });

        // Process 10 albums at a time to balance speed vs S3 rate limits
        const signedAlbums = await processInBatches(filteredAlbums, 10, async (album: any) => {
            try {
                const folderName = album.folderPath || album.title;
                const dynamicKey = await findImageKey(folderName, undefined, false);
                let signedCover = album.coverArt;

                if (dynamicKey) {
                    signedCover = await getSignedFileUrl(dynamicKey, 3600);
                } else if (album.coverArt) {
                    if (!album.coverArt.startsWith('/images/') && !album.coverArt.startsWith('http')) {
                        signedCover = await getSignedFileUrl(album.coverArt, 3600);
                    } else if (album.coverArt.includes('singitpop-music.s3') || album.coverArt.includes('s3.eu-north-1.amazonaws.com')) {
                        try {
                            const url = new URL(album.coverArt);
                            const key = decodeURIComponent(url.pathname.substring(1));
                            signedCover = await getSignedFileUrl(key, 3600);
                        } catch (e) {
                            // ignore URL parse errors
                        }
                    }
                }

                // Sign tracks in batches (6 at a time per album)
                const signedTracks = await processInBatches(album.tracks || [], 6, async (track: any) => {
                    try {
                        let signedAudio = track.audioUrl;
                        if (track.audioUrl && (track.audioUrl.includes('s3.eu-north-1.amazonaws.com') || track.audioUrl.includes('singitpop-music.s3'))) {
                            const url = new URL(track.audioUrl);
                            const key = decodeURIComponent(url.pathname.substring(1));
                            signedAudio = await getSignedFileUrl(key);
                        }
                        return { ...track, audioUrl: signedAudio };
                    } catch (e) {
                        return { ...track, audioUrl: track.audioUrl };
                    }
                });

                return {
                    ...album,
                    coverArt: signedCover,
                    tracks: signedTracks
                };
            } catch (err) {
                console.error(`[Albums-API] Failed to process album ${album.id}:`, err);
                return album;
            }
        });

        // Cache the result server-side for 45 minutes
        cachedSignedAlbums = signedAlbums;
        cacheExpiry = now + CACHE_TTL_MS;
        console.log(`[Albums-API] Signed ${signedAlbums.length} albums. Cache valid until ${new Date(cacheExpiry).toISOString()}`);

        const headers = new Headers();
        // Tell the browser not to cache (we manage freshness server-side)
        headers.set('Cache-Control', 'no-store, no-cache, must-revalidate, proxy-revalidate, max-age=0');

        return NextResponse.json(signedAlbums, { headers });
    } catch (error) {
        console.error('[Albums-API] Critical Error:', error);
        return NextResponse.json({ error: 'Failed to fetch album data' }, { status: 500 });
    }
}
