import { NextResponse } from "next/server";
import Stripe from "stripe";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY || "", {
    apiVersion: "2026-01-28.clover",
});

export async function POST(req: Request) {
    try {
        const { trackId, trackTitle, buyerName, buyerEmail, tier } = await req.json();

        if (!trackId || !trackTitle || !tier) {
            return NextResponse.json({ error: "Missing track details or tier" }, { status: 400 });
        }

        let unitAmount = 5000;
        let tierLabel = 'Diamond';
        
        if (tier === 'gold') {
            unitAmount = 1000;
            tierLabel = 'Gold';
        } else if (tier === 'platinum') {
            unitAmount = 2500;
            tierLabel = 'Platinum';
        }

        const session = await stripe.checkout.sessions.create({
            payment_method_types: ["card"],
            line_items: [
                {
                    price_data: {
                        currency: "gbp",
                        product_data: {
                            name: `${tierLabel} Sponsor: ${trackTitle}`,
                            description: `Become an official ${tierLabel} Sponsor for '${trackTitle}' on SingIt Pop.`,
                        },
                        unit_amount: unitAmount,
                    },
                    quantity: 1,
                },
            ],
            mode: "payment",
            success_url: `${process.env.NEXT_PUBLIC_APP_URL}/music?sponsorship=success&track=${encodeURIComponent(trackTitle)}`,
            cancel_url: `${process.env.NEXT_PUBLIC_APP_URL}/music`,
            metadata: {
                type: "sponsorship",
                trackId,
                trackTitle,
                tier
            },
            customer_email: buyerEmail,
        });

        return NextResponse.json({ url: session.url });
    } catch (error: any) {
        console.error("Stripe Checkout Error:", error);
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}
