import { NextResponse } from 'next/server';
import Stripe from 'stripe';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY || 'sk_test_mock', {
    apiVersion: '2026-01-28.clover',
});

const DOMAIN = process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:3000';

export async function POST(req: Request) {
    try {
        const body = await req.json();
        const { track, configuration, price, name, email } = body;

        // 1. Create a dynamic Stripe Checkout Session
        const session = await stripe.checkout.sessions.create({
            payment_method_types: ['card'],
            customer_email: email, 
            line_items: [
                {
                    price_data: {
                        currency: 'gbp',
                        product_data: {
                            name: `License: ${configuration.licenseType.toUpperCase()} - ${track.title}`,
                            description: `Usage: ${configuration.usage} | Duration: ${configuration.duration.replace('_', ' ')} | Territory: ${configuration.territory}`,
                            images: [track.coverArt ? (track.coverArt.startsWith('http') ? track.coverArt : `${DOMAIN}${track.coverArt}`) : 'https://singitpop.com/logo.png'],
                        },
                        unit_amount: Math.round(price * 100), // Stripe uses minor units (pence)
                    },
                    quantity: 1,
                },
            ],
            mode: 'payment',
            success_url: `${DOMAIN}/licensing/success?session_id={CHECKOUT_SESSION_ID}`,
            cancel_url: `${DOMAIN}/licensing`,
            
            // 2. Attach configuration data to checkout metadata! 
            // This ensures the webhook knows exactly what PDF certificate to generate.
            metadata: {
                licenseType: configuration.licenseType,
                usage: configuration.usage,
                duration: configuration.duration,
                territory: configuration.territory,
                adSpend: configuration.adSpend,
                reach: configuration.reach,
                version: configuration.version,
                trackTitle: track.title,
                trackId: track.id,
                buyerName: name,
                buyerEmail: email
            }
        });

        return NextResponse.json({ url: session.url });

    } catch (error: any) {
        console.error('Stripe Checkout Error:', error);
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}
