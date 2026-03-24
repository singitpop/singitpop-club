import { NextResponse } from "next/server";
import Stripe from "stripe";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY || "", {
    apiVersion: "2026-01-28.clover",
});

export async function POST(req: Request) {
    try {
        const session = await stripe.checkout.sessions.create({
            payment_method_types: ["card"],
            line_items: [
                {
                    price_data: {
                        currency: "gbp",
                        product_data: {
                            name: "SingIt Pop Digital Creator Pack (v1)",
                            description: "A professional audio toolkit for video creators. Includes 15+ high-quality Transitions, Atmos Loops, and Stingers.",
                            images: ["/images/shop/creator-pack-thumb.png"], // Optional image
                        },
                        unit_amount: 2000, // £20.00
                    },
                    quantity: 1,
                },
            ],
            mode: "payment",
            success_url: `${process.env.NEXT_PUBLIC_APP_URL}/shop?purchase=success&item=creator-pack`,
            cancel_url: `${process.env.NEXT_PUBLIC_APP_URL}/shop`,
            metadata: {
                type: "creator-pack",
            },
        });

        return NextResponse.json({ url: session.url });
    } catch (error: any) {
        console.error("Stripe Checkout Error:", error);
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}
