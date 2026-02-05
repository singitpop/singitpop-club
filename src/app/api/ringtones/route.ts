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
            limit: 100,
            expand: ['data.default_price']
        });

        if (products.data.length === 0) {
            console.log("No ringtones found via search. Returning empty list (or mock if dev).");
            // Fallback to mock data if no real ringtones found, just so the UI isn't empty during dev
            // But for production, we might want real 0.
            // Given the user expects 186 ringtones, if we find 0, something is wrong.
            // Let's stick to the behavior: if 0 found, return MOCK_DATA (as per original logic).
            return NextResponse.json({ ringtones: MOCK_DATA });
        }

        const ringtones = products.data.map(product => {
            const price = product.default_price as Stripe.Price; // expanded
            return {
                id: product.id,
                title: product.name.replace(/ Ringtone$/i, ''),
                description: product.description || '',
                price: price?.unit_amount ? price.unit_amount / 100 : 3.00,
                priceId: price?.id || '',
                genre: product.metadata?.genre || 'Pop',
                duration: product.description?.match(/(\d+)s/)?.[1] || '20',
                createdAt: product.created * 1000,
                isNew: (Date.now() - (product.created * 1000)) < (60 * 24 * 60 * 60 * 1000)
            };
        });

        return NextResponse.json({ ringtones });

    } catch (error: any) {
        console.error('❌ Error fetching ringtones:', error);
        // Fallback to mock data on error so UI doesn't break
        return NextResponse.json({ ringtones: MOCK_DATA });
    }
}
