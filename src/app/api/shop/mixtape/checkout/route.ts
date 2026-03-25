import { NextResponse } from "next/server";
import { stripe } from "@/lib/stripe";

export async function POST(req: Request) {
    try {
        const body = await req.json();
        const { to, from, occasion, message, tracks, theme } = body;

        if (!to || !from || !tracks || tracks.length !== 5) {
            return NextResponse.json({ error: "Invalid mixtape data. Exactly 5 tracks required." }, { status: 400 });
        }

        const session = await stripe.checkout.sessions.create({
            payment_method_types: ["card"],
            line_items: [
                {
                    price_data: {
                        currency: "gbp",
                        product_data: {
                            name: `Digital Mixtape Gift`,
                            description: `A personalized 5-track music curation for ${to}.`,
                        },
                        unit_amount: 1000, // £10.00
                    },
                    quantity: 1,
                },
            ],
            mode: "payment",
            success_url: `${process.env.NEXT_PUBLIC_APP_URL}/shop?mixtape=success&session_id={CHECKOUT_SESSION_ID}`,
            cancel_url: `${process.env.NEXT_PUBLIC_APP_URL}/shop/mixtape/builder`,
            metadata: {
                type: "mixtape",
                to,
                from,
                occasion: occasion || "Just Because",
                message: message.substring(0, 500), // Limit message length
                tracks: JSON.stringify(tracks),
                theme: theme || 'pink'
            },
        });

        return NextResponse.json({ url: session.url });
    } catch (error: any) {
        console.error("Mixtape Checkout Error:", error);
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}
