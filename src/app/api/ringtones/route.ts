import { NextResponse } from 'next/server';
import Stripe from 'stripe';
import { getSignedAlbumCoverUrl } from '@/lib/server-image-utils';
import { albums as albumData } from '@/data/albumData';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY || '', {
    apiVersion: '2026-01-28.clover' as any,
});

const MOCK_DATA = [
    {
        id: 'rt_1',
        title: 'Neon Lights',
        description: 'Chorus - High Energy',
        price: 3.00,
        priceId: 'price_mock_1',
        genre: 'Pop',
        duration: '20',
        createdAt: Date.now(),
        isNew: true
    },
    {
        id: 'rt_2',
        title: 'Midnight Drive',
        description: 'Drop - Synthwave',
        price: 3.00,
        priceId: 'price_mock_2',
        genre: 'Retro',
        duration: '20',
        createdAt: Date.now() - 10000000,
        isNew: true
    },
    {
        id: 'rt_3',
        title: 'Summer Vibes',
        description: 'Hook - Tropical',
        price: 3.00,
        priceId: 'price_mock_3',
        genre: 'Pop',
        duration: '20',
        createdAt: Date.now() - 6000000000,
        isNew: false
    }
];





export async function GET() {
    if (!process.env.STRIPE_SECRET_KEY) {
        console.warn("⚠️ No STRIPE_SECRET_KEY found. Check Vercel Env Vars.");
        return NextResponse.json({
            ringtones: [],
            error: "Configuration Error: STRIPE_SECRET_KEY is missing."
        });
    }

    try {
        // 1. Fetch ALL active ringtone products (paginated)
        let allProducts: Stripe.Product[] = [];
        let hasMoreProducts = true;
        let lastProductId: string | undefined = undefined;

        while (hasMoreProducts) {
            const result: Stripe.ApiList<Stripe.Product> = await stripe.products.list({
                active: true,
                limit: 100,
                starting_after: lastProductId
            });
            allProducts.push(...result.data);
            hasMoreProducts = result.has_more;
            lastProductId = result.data[result.data.length - 1]?.id;
            if (allProducts.length > 500) break; // Safety cap
        }

        // Filter for Ringtones
        const ringtoneProducts = allProducts.filter(p => p.name.toLowerCase().includes('ringtone'));

        if (ringtoneProducts.length === 0) {
            console.log("No ringtones found.");
            return NextResponse.json({ ringtones: [], message: "No ringtones found" });
        }

        // 2. Fetch ALL active prices (paginated)
        let allPrices: Stripe.Price[] = [];
        let hasMorePrices = true;
        let lastPriceId: string | undefined = undefined;

        while (hasMorePrices) {
            const result: Stripe.ApiList<Stripe.Price> = await stripe.prices.list({
                active: true,
                limit: 100,
                starting_after: lastPriceId
            });
            allPrices.push(...result.data);
            hasMorePrices = result.has_more;
            lastPriceId = result.data[result.data.length - 1]?.id;
            if (allPrices.length > 1000) break; // Safety cap
        }

        // Create a map of ProductID -> Price
        const priceMap = new Map();
        allPrices.forEach(price => {
            if (typeof price.product === 'string' && !priceMap.has(price.product)) {
                priceMap.set(price.product, price);
            }
        });

        // 3. Map products to ringtones
        const now = Date.now();
        const sixtyDaysAgo = now - (60 * 24 * 60 * 60 * 1000);

        const allRingtones = await Promise.all(ringtoneProducts.map(async (product) => {
            const price = priceMap.get(product.id);
            const title = product.name.replace(/[- ]*Ringtone$/i, '').trim();

            let releaseDate = 0;
            let albumMatch = null;
            let trackMatch = null;

            // Find matching album for artwork and date
            const normalize = (s: string) => s.toLowerCase().replace(/[^\w\s]/g, '').trim();

            // Improved Fuzzy Matcher with Stop-Word Filtering
            const stopWords = new Set(['the', 'and', 'for', 'with', 'from', 'into', 'them', 'this', 'that', 'with', 'back', 'just']);
            const normalizeWords = (s: string) => normalize(s).split(' ').filter(w => w.length > 3 && !stopWords.has(w));
            
            const isFuzzyMatch = (target: string, candidate: string) => {
                const normA = normalizeWords(target);
                const normB = normalizeWords(candidate);
                
                // Fallback for very short titles - use strict equality only
                if (normA.length === 0 || normB.length === 0) {
                    return normalize(target) === normalize(candidate);
                }
                
                const intersection = normA.filter((word: string) => normB.includes(word));
                // HIGH DENSITY: We want high overlap relative to the LONGER of the two keyword sets
                const coverage = intersection.length / Math.max(normA.length, normB.length);
                return coverage >= 0.8; // High precision
            };

            let bestMatch: { album: any; track: any; score: number } | null = null;
            const exactNormalizedTitle = normalize(title);

            for (const album of albumData) {
                // 1. Try EXACT Track Match (Score: 1.0)
                const exactTrack = album.tracks.find(t => normalize(t.title) === exactNormalizedTitle);
                if (exactTrack) {
                    bestMatch = { album, track: exactTrack, score: 1.0 };
                    break; 
                }

                // 2. Try FUZZY Track Match (Score: coverage)
                const fuzzyTrack = album.tracks.find(t => {
                    const nA = normalizeWords(title);
                    const nB = normalizeWords(t.title);
                    if (nA.length === 0 || nB.length === 0) return normalize(title) === normalize(t.title);
                    const intersect = nA.filter((w: string) => nB.includes(w));
                    return (intersect.length / Math.max(nA.length, nB.length)) >= 0.8;
                });

                if (fuzzyTrack) {
                    const nA = normalizeWords(title);
                    const nB = normalizeWords(fuzzyTrack.title);
                    const intersect = nA.filter((w: string) => nB.includes(w));
                    const score = intersect.length / Math.max(nA.length, nB.length);
                    if (!bestMatch || score > bestMatch.score) {
                        bestMatch = { album, track: fuzzyTrack, score };
                    }
                }

                // 3. Try Album Match (Score: 0.7) - Lower Priority
                if (!bestMatch || bestMatch.score < 0.7) {
                    if (isFuzzyMatch(title, album.title)) {
                        bestMatch = { album, track: null, score: 0.7 };
                    }
                }
            }

            if (bestMatch) {
                albumMatch = bestMatch.album;
                trackMatch = bestMatch.track;
            }

            if (product.metadata?.releaseDate) {
                try {
                    const dateStr = product.metadata.releaseDate;
                    if (dateStr.includes('/')) {
                        const [day, month, year] = dateStr.split('/');
                        releaseDate = new Date(`${year}-${month}-${day}`).getTime();
                    } else {
                        releaseDate = new Date(dateStr).getTime();
                    }
                } catch (e) {}
            }

            if (releaseDate === 0 && albumMatch) {
                releaseDate = new Date(albumMatch.releaseDate).getTime();
            }

            const isNew = releaseDate >= sixtyDaysAgo && releaseDate <= now;

            // Pre-sign the artwork on the server - now PASSING trackMatch for single-specific artwork
            const artwork = albumMatch ? await getSignedAlbumCoverUrl(albumMatch, trackMatch) : "/images/singles-cover.png";

            return {
                id: product.id,
                title: title,
                description: product.description || '',
                price: price?.unit_amount ? price.unit_amount / 100 : 0.99,
                priceId: price?.id || '',
                genre: product.metadata?.genre || 'Pop',
                duration: product.description?.match(/(\d+)s/)?.[1] || '30',
                createdAt: releaseDate,
                isNew: isNew,
                artwork: artwork
            };
        }));

        // 4. Deduplicate by Title (Keep latest releaseDate)
        const deduplicatedMap = new Map();
        allRingtones.forEach(r => {
            const existing = deduplicatedMap.get(r.title);
            if (!existing || r.createdAt > existing.createdAt) {
                deduplicatedMap.set(r.title, r);
            }
        });

        const deduplicatedRingtones = Array.from(deduplicatedMap.values());

        // 5. Visibility Filtering
        // - Must have a price
        // - Must NOT be in the future (releaseDate <= now)
        const activeRingtones = deduplicatedRingtones.filter(r =>
            r.priceId &&
            r.createdAt > 0 &&
            r.createdAt <= now
        );

        // Sort by Release Date (Newest First)
        activeRingtones.sort((a, b) => b.createdAt - a.createdAt);

        return NextResponse.json({ ringtones: activeRingtones });

    } catch (error: any) {
        console.error('❌ Error fetching ringtones:', error);
        // Return actual error in development or simpler message in prod
        return NextResponse.json({
            ringtones: [],
            error: error.message || 'Failed to fetch ringtones'
        });
    }
}
