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
const getRingtoneReleaseDate = (ringtoneTitle: string) => {
    // Normalize: remove "Ringtone", "ringtone", extra spaces, dashes
    const cleanRingtone = ringtoneTitle.replace(/ -? ?Ringtone$/i, '').toLowerCase().trim();

    // Find matching track in any album
    for (const album of albums) {
        const track = album.tracks.find(t => {
            const cleanTrack = t.title.toLowerCase().trim();
            return cleanRingtone === cleanTrack || cleanRingtone.includes(cleanTrack) && cleanTrack.length > 3;
        });

        if (track) {
            // console.log(`✅ Matched "${ringtoneTitle}" to Album: ${album.title} (${album.releaseDate})`);
            return new Date(album.releaseDate).getTime();
        }
    }

    // Fallback: If title contains "2026", assume it's new
    if (cleanRingtone.includes('2026')) return new Date('2026-01-01').getTime();

    // console.log(`❌ Could not match "${ringtoneTitle}" to any album. Falling back to old date.`);
    return 0; // Unknown/Old
};

export async function GET() {
    if (!process.env.STRIPE_SECRET_KEY) {
        console.warn("⚠️ No STRIPE_SECRET_KEY found. Returning mock data.");
        return NextResponse.json({ ringtones: MOCK_DATA });
    }

    try {
        // Use search endpoint for better filtering
        const products = await stripe.products.search({
            query: "active:'true' AND name~'Ringtone'",
            limit: 100,
        });

        if (products.data.length === 0) {
            console.log("No ringtones found via search.");
            return NextResponse.json({ ringtones: MOCK_DATA });
        }

        // Fetch prices in parallel
        const ringtones = await Promise.all(products.data.map(async (product) => {
            // Explicitly fetch prices since default_price might be null on manually created items
            const prices = await stripe.prices.list({
                product: product.id,
                active: true,
                limit: 1
            });

            const price = prices.data[0];
            const title = product.name.replace(/ Ringtone$/i, '');

            // Use real release date from Album Data if available, fallback to 2020-01-01 (Old)
            const realReleaseDate = getRingtoneReleaseDate(title) || (new Date('2020-01-01').getTime());

            // "New" if released in the last 60 days
            const isNew = (Date.now() - realReleaseDate) < (60 * 24 * 60 * 60 * 1000);

            return {
                id: product.id,
                title: title,
                description: product.description || '',
                price: price?.unit_amount ? price.unit_amount / 100 : 3.00,
                // Critical Fix: Ensure priceId is never empty if we found a price
                priceId: price?.id || '',
                genre: product.metadata?.genre || 'Pop',
                duration: product.description?.match(/(\d+)s/)?.[1] || '20',
                createdAt: realReleaseDate,
                isNew: isNew
            };
        }));

        // Sort by Release Date (Newest First)
        ringtones.sort((a, b) => b.createdAt - a.createdAt);

        return NextResponse.json({ ringtones });

    } catch (error: any) {
        console.error('❌ Error fetching ringtones:', error);
        return NextResponse.json({ ringtones: MOCK_DATA });
    }
}
