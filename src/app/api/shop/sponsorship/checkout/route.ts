import { NextResponse } from "next/server";
import Stripe from "stripe";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY || "", {
    apiVersion: "2026-01-28.clover",
});

export async function POST(req: Request) {
    try {
        const { trackId, trackTitle, buyerName, buyerEmail } = await req.json();

        if (!trackId || !trackTitle) {
            return NextResponse.json({ error: "Missing track details" }, { status: 400 });
        }

        const session = await stripe.checkout.sessions.create({
            payment_method_types: ["card"],
            line_items: [
                {
                    price_data: {
                        currency: "gbp",
                        product_data: {
                            name: `Executive Producer Sponsorship: ${trackTitle}`,
                            description: `Become the official sponsor and Executive Producer of '${trackTitle}' on SingIt Pop.`,
                        },
                        unit_amount: 5000, // £50.00
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
            },
            customer_email: buyerEmail,
        });

        return NextResponse.json({ url: session.url });
    } catch (error: any) {
        console.error("Stripe Checkout Error:", error);
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}
