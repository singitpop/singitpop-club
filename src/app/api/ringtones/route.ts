import { NextResponse } from 'next/server';
import Stripe from 'stripe';

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

import { albums } from '@/data/albumData';

// Helper to find release date for a ringtone title
// Helper to find release date for a ringtone title
// Normalize: remove "Ringtone", "ringtone", extra spaces, dashes
const getRingtoneReleaseDate = (ringtoneTitle: string) => {
    // Normalize: remove "Ringtone", "ringtone", extra spaces, dashes
    const normalize = (s: string) => s.replace(/[- ]*Ringtone$/i, '').toLowerCase().replace(/[^\w\s]/g, '').trim();
    const cleanRingtone = normalize(ringtoneTitle);

    // Find matching track in any album
    for (const album of albums) {
        const track = album.tracks.find(t => {
            const cleanTrack = normalize(t.title);
            return cleanRingtone === cleanTrack || cleanRingtone.includes(cleanTrack) && cleanTrack.length > 3;
        });

        if (track) {
            // console.log(`✅ Matched "${ringtoneTitle}" to Album: ${album.title} (${album.releaseDate})`);
            return new Date(album.releaseDate).getTime();
        }
    }

    // Fallback: If title contains "2026", assume it's new
    if (cleanRingtone.includes('2026') || ringtoneTitle.includes('2026')) {
        return new Date('2026-01-01').getTime();
    }

    // console.log(`❌ Could not match "${ringtoneTitle}" to any album. Falling back to old date.`);
    return 0; // Unknown/Old
};

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

        const allRingtones = ringtoneProducts.map((product) => {
            const price = priceMap.get(product.id);
            const title = product.name.replace(/[- ]*Ringtone$/i, '').trim();

            let releaseDate = 0;
            if (product.metadata?.releaseDate) {
                try {
                    const dateStr = product.metadata.releaseDate;
                    if (dateStr.includes('/')) {
                        const [day, month, year] = dateStr.split('/');
                        releaseDate = new Date(`${year}-${month}-${day}`).getTime();
                    } else {
                        releaseDate = new Date(dateStr).getTime();
                    }
                } catch (e) {
                    // console.warn(`Failed to parse release date for ${title}:`, product.metadata.releaseDate);
                }
            }

            if (releaseDate === 0) {
                releaseDate = getRingtoneReleaseDate(title);
            }

            // isNew IF released between (Today - 60 days) AND (Today)
            const isNew = releaseDate >= sixtyDaysAgo && releaseDate <= now;

            return {
                id: product.id,
                title: title,
                description: product.description || '',
                price: price?.unit_amount ? price.unit_amount / 100 : 3.00,
                priceId: price?.id || '',
                genre: product.metadata?.genre || 'Pop',
                duration: product.description?.match(/(\d+)s/)?.[1] || '30',
                createdAt: releaseDate,
                isNew: isNew
            };
        });

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
