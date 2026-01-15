import { NextResponse } from 'next/server';
import Stripe from 'stripe';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
    // apiVersion: '2025-01-27.acacia', // Rely on default or package version
});

export async function POST(req: Request) {
    try {
        const { tracks, email } = await req.json();

        if (!tracks || tracks.length === 0) {
            return NextResponse.json({ error: 'No tracks selected' }, { status: 400 });
        }

        // TEST PRICE: £1.00 for Live Verification
        const unitAmount = 100; // 100 pence = £1.00

        // Helper for Base URL with fallback
        const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL || (process.env.NODE_ENV === 'production' ? 'https://club.singitpop.com' : 'http://localhost:3000');

        const session = await stripe.checkout.sessions.create({
            payment_method_types: ['card'],
            line_items: [
                {
                    price_data: {
                        currency: 'gbp',
                        product_data: {
                            name: 'SingIt Pop - Custom Mixtape',
                            description: `${tracks.length} tracks selected`,
                            images: ['https://club.singitpop.com/images/icons/music-note-clean.png'], // Update with real image if available
                        },
                        unit_amount: unitAmount,
                    },
                    quantity: 1,
                },
            ],
            mode: 'payment',
            success_url: `${BASE_URL}/music/checkout?success=true&customer_email=${encodeURIComponent(email)}`,
            cancel_url: `${BASE_URL}/music/checkout?canceled=true`,
            customer_email: email, // Pre-fill email if provided
            metadata: {
                trackIds: tracks.join(','),
                type: 'mixtape_purchase'
            }
        });

        return NextResponse.json({ sessionId: session.id, url: session.url });
    } catch (err: any) {
        console.error('Stripe Error:', err);
        return NextResponse.json({ error: err.message }, { status: 500 });
    }
}
