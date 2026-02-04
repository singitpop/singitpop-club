import { NextResponse } from 'next/server';
import Stripe from 'stripe';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY || '', {
    apiVersion: '2026-01-28.clover',
});

export async function GET() {
    try {
        // Fetch all active ringtone products from Stripe
        const products = await stripe.products.list({
            active: true,
            limit: 100,
        });

        // Filter for ringtones and get their prices
        const ringtones = await Promise.all(
            products.data
                .filter(p => p.metadata?.type === 'ringtone')
                .map(async (product) => {
                    const prices = await stripe.prices.list({
                        product: product.id,
                        active: true,
                        limit: 1
                    });

                    return {
                        id: product.id,
                        title: product.name.replace(' Ringtone', ''),
                        description: product.description,
                        price: prices.data[0]?.unit_amount ? prices.data[0].unit_amount / 100 : 0,
                        priceId: prices.data[0]?.id,
                        genre: product.metadata?.genre,
                        duration: product.description?.match(/(\d+)s/)?.[1] || '20',
                        createdAt: product.created * 1000, // Stripe uses seconds
                        isNew: (Date.now() - (product.created * 1000)) < (60 * 24 * 60 * 60 * 1000) // 60 days (approx 2 months)
                    };
                })
        );

        // Fallback if no Stripe keys/products (for immediate display)
        if (ringtones.length === 0) {
            ringtones.push(
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
                    createdAt: Date.now() - 6000000000, // Old
                    isNew: false
                }
            );
        }

        return NextResponse.json({ ringtones });
    } catch (error: any) {
        console.error('Error fetching ringtones:', error);
        return NextResponse.json(
            { error: 'Failed to fetch ringtones' },
            { status: 500 }
        );
    }
}
