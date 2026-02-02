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
                        duration: product.description?.match(/(\d+)s/)?.[1] || '20'
                    };
                })
        );

        return NextResponse.json({ ringtones });
    } catch (error: any) {
        console.error('Error fetching ringtones:', error);
        return NextResponse.json(
            { error: 'Failed to fetch ringtones' },
            { status: 500 }
        );
    }
}
