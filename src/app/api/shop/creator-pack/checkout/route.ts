import { NextResponse } from "next/server";
import Stripe from "stripe";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY || "", {
    apiVersion: "2026-01-28.clover",
});

export async function POST(req: Request) {
    try {
        const { volume = 1 } = await req.json();
        
        const session = await stripe.checkout.sessions.create({
            payment_method_types: ["card"],
            line_items: [
                {
                    price_data: {
                        currency: "gbp",
                        product_data: {
                            name: `SingIt Pop Digital Creator Pack (v${volume})`,
                            description: `A professional audio toolkit for video creators. Includes 20+ high-quality Transitions, Atmos Loops, and Stingers.`,
                            images: ["https://singitpop-music.s3.eu-north-1.amazonaws.com/visuals/creator-pack-v1-thumb.png"], 
                        },
                        unit_amount: 2000, // £20.00
                    },
                    quantity: 1,
                },
            ],
            mode: "payment",
            success_url: `${process.env.NEXT_PUBLIC_APP_URL}/shop?purchase=success&item=creator-pack&vol=${volume}`,
            cancel_url: `${process.env.NEXT_PUBLIC_APP_URL}/shop`,
            metadata: {
                type: "creator-pack",
                volume: volume.toString()
            },
        });

        return NextResponse.json({ url: session.url });
    } catch (error: any) {
        console.error("Stripe Checkout Error:", error);
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}
