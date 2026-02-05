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
        // Use search endpoint for better filtering
        const products = await stripe.products.search({
            query: "active:'true' AND name~'Ringtone'",
            limit: 100,
        });

        if (products.data.length === 0) {
            console.log("No ringtones found via search.");
            return NextResponse.json({ ringtones: [], message: "No ringtones found" });
        }

        // Fetch all active prices in one go to avoid Rate Limiting (N+1 problem)
        const prices = await stripe.prices.list({
            active: true,
            limit: 100,
            type: 'one_time',
        });

        // Create a map of ProductID -> Price
        const priceMap = new Map();
        prices.data.forEach(price => {
            // We prioritize the first price found for a product
            if (typeof price.product === 'string' && !priceMap.has(price.product)) {
                priceMap.set(price.product, price);
            }
        });

        // Map products to ringtones using the price map
        const ringtones = products.data.map((product) => {
            const price = priceMap.get(product.id);
            const title = product.name.replace(/[- ]*Ringtone$/i, '').trim();

            // Get release date from Stripe metadata (if available)
            // Expected format: metadata.releaseDate = "2026-01-30" or "30/01/2026"
            let releaseDate = 0;
            if (product.metadata?.releaseDate) {
                try {
                    // Handle both ISO format (YYYY-MM-DD) and UK format (DD/MM/YYYY)
                    const dateStr = product.metadata.releaseDate;
                    if (dateStr.includes('/')) {
                        // UK format: DD/MM/YYYY
                        const [day, month, year] = dateStr.split('/');
                        releaseDate = new Date(`${year}-${month}-${day}`).getTime();
                    } else {
                        // ISO format: YYYY-MM-DD
                        releaseDate = new Date(dateStr).getTime();
                    }
                } catch (e) {
                    console.warn(`Failed to parse release date for ${title}:`, product.metadata.releaseDate);
                }
            }

            // If no metadata date, try album matching as fallback
            if (releaseDate === 0) {
                releaseDate = getRingtoneReleaseDate(title);
            }

            return {
                id: product.id,
                title: title,
                description: product.description || '',
                price: price?.unit_amount ? price.unit_amount / 100 : 3.00,
                priceId: price?.id || '',
                genre: product.metadata?.genre || 'Pop',
                duration: product.description?.match(/(\d+)s/)?.[1] || '20',
                createdAt: releaseDate,
                isNew: false // Not used anymore
            };
        });

        // Filter: Show ringtones from the past 60 days
        // Also include unmatched ringtones (createdAt === 0) so they appear in "The Vault"
        const twoMonthsAgo = Date.now() - (60 * 24 * 60 * 60 * 1000);

        const filteredRingtones = ringtones.filter(r => {
            // Include if within past 60 days OR unmatched (will go to vault)
            return r.createdAt >= twoMonthsAgo || r.createdAt === 0;
        });

        // Sort by Release Date (Newest First, unmatched go to bottom)
        filteredRingtones.sort((a, b) => {
            if (a.createdAt === 0 && b.createdAt === 0) return 0;
            if (a.createdAt === 0) return 1; // a goes to bottom
            if (b.createdAt === 0) return -1; // b goes to bottom
            return b.createdAt - a.createdAt;
        });

        return NextResponse.json({ ringtones: filteredRingtones });

    } catch (error: any) {
        console.error('❌ Error fetching ringtones:', error);
        // Return actual error in development or simpler message in prod
        return NextResponse.json({
            ringtones: [],
            error: error.message || 'Failed to fetch ringtones'
        });
    }
}
