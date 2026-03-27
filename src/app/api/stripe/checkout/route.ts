import { NextResponse } from 'next/server';
import Stripe from 'stripe';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY || '', {
    apiVersion: '2026-01-28.clover',
});

export async function POST(request: Request) {
    try {
        const { priceId, amount, trackTitle, type, successUrl, cancelUrl } = await request.json();

        let line_items = [];
        let metadata: any = { type: type || 'ringtone' };

        if (type === 'tip') {
            line_items = [
                {
                    price_data: {
                        currency: 'gbp',
                        product_data: {
                            name: `Tip for "${trackTitle || 'Artist'}"`,
                            description: 'Direct support for SingIt Pop music production',
                        },
                        unit_amount: (amount || 5) * 100, // Amount in pence
                    },
                    quantity: 1,
                },
            ];
            metadata = { ...metadata, trackTitle };
        } else if (priceId) {
            line_items = [
                {
                    price: priceId,
                    quantity: 1,
                },
            ];
        } else {
            return NextResponse.json(
                { error: 'Price ID or Tip Amount is required' },
                { status: 400 }
            );
        }

        // Create Checkout Session
        const session = await stripe.checkout.sessions.create({
            mode: 'payment',
            line_items,
            success_url: successUrl || `${process.env.NEXT_PUBLIC_BASE_URL}/shop/success?session_id={CHECKOUT_SESSION_ID}`,
            cancel_url: cancelUrl || `${process.env.NEXT_PUBLIC_BASE_URL}/shop`,
            metadata
        });

        return NextResponse.json({ sessionId: session.id, url: session.url });
    } catch (error: any) {
        console.error('Stripe checkout error:', error);
        return NextResponse.json(
            { error: error.message || 'Failed to create checkout session' },
            { status: 500 }
        );
    }
}
