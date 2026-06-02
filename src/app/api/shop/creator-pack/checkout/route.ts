import { NextResponse } from "next/server";
import { stripe } from "@/lib/stripe";

export async function POST(req: Request) {
    try {
        const { volume } = await req.json();

        if (!volume) {
            return NextResponse.json({ error: "Missing creator pack volume" }, { status: 400 });
        }

        const session = await stripe.checkout.sessions.create({
            payment_method_types: ["card"],
            line_items: [
                {
                    price_data: {
                        currency: "gbp",
                        product_data: {
                            name: `Digital Creator Pack: Vol ${volume}`,
                            description: `Professional, vocal-free production stems, intros, and cinematic stingers from Volume ${volume}.`,
                        },
                        unit_amount: 2000, // £20.00
                    },
                    quantity: 1,
                },
            ],
            mode: "payment",
            success_url: `${process.env.NEXT_PUBLIC_APP_URL}/shop?creator-pack=success&volume=${volume}`,
            cancel_url: `${process.env.NEXT_PUBLIC_APP_URL}/shop`,
            metadata: {
                type: "creator_pack",
                volume: volume.toString()
            },
        });

        return NextResponse.json({ url: session.url });
    } catch (error: any) {
        console.error("Creator Pack Checkout Error:", error);
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}
