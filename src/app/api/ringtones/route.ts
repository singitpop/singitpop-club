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
const getRingtoneReleaseDate = (ringtoneTitle: string) => {
    const cleanTitle = ringtoneTitle.toLowerCase().trim();

    // Find matching track in any album
    for (const album of albums) {
        const track = album.tracks.find(t => t.title.toLowerCase().trim() === cleanTitle);
        if (track) {
            // Return album release date
            return new Date(album.releaseDate).getTime();
        }
    }

    // Fallback: If title contains "2026", assume it's new
    if (cleanTitle.includes('2026')) return new Date('2026-01-01').getTime();

    return 0; // Unknown/Old
};

export async function GET() {
    if (!process.env.STRIPE_SECRET_KEY) {
        console.warn("⚠️ No STRIPE_SECRET_KEY found. Returning mock data.");
        return NextResponse.json({ ringtones: MOCK_DATA });
    }

    try {
        // Use search endpoint for better filtering and pagination
        // Query: active:'true' AND name~'Ringtone'
        const products = await stripe.products.search({
            query: "active:'true' AND name~'Ringtone'",
            limit: 100, // Fetch max to ensure we can sort them all
            expand: ['data.default_price']
        });

        if (products.data.length === 0) {
            return NextResponse.json({ ringtones: MOCK_DATA });
        }

        const ringtones = products.data.map(product => {
            const price = product.default_price as Stripe.Price;
            const title = product.name.replace(/ Ringtone$/i, '');

            // Use real release date from Album Data if available, fallback to 2025 (old) if not found
            // We ignore Stripe created date because they were all bulk created at once.
            const realReleaseDate = getRingtoneReleaseDate(title) || (new Date('2025-01-01').getTime());

            // "New" if released in the last 60 days
            const isNew = (Date.now() - realReleaseDate) < (60 * 24 * 60 * 60 * 1000);

            return {
                id: product.id,
                title: title,
                description: product.description || '',
                price: price?.unit_amount ? price.unit_amount / 100 : 3.00,
                priceId: price?.id || '',
                genre: product.metadata?.genre || 'Pop',
                duration: product.description?.match(/(\d+)s/)?.[1] || '20',
                createdAt: realReleaseDate, // Use REAL date for sorting
                isNew: isNew
            };
        });

        // Sort by Release Date (Newest First)
        ringtones.sort((a, b) => b.createdAt - a.createdAt);

        return NextResponse.json({ ringtones });

    } catch (error: any) {
        console.error('❌ Error fetching ringtones:', error);
        return NextResponse.json({ ringtones: MOCK_DATA });
    }
}
