import { NextResponse } from "next/server";
import { stripe } from "@/lib/stripe";

export async function POST(req: Request) {
    try {
        const { albumId, albumTitle } = await req.json();

        if (!albumId || !albumTitle) {
            return NextResponse.json({ error: "Missing album details" }, { status: 400 });
        }

        const session = await stripe.checkout.sessions.create({
            payment_method_types: ["card"],
            line_items: [
                {
                    price_data: {
                        currency: "gbp",
                        product_data: {
                            name: `Digital Artbook: ${albumTitle}`,
                            description: `Official high-resolution Digital Lyric Book and production notes for the album '${albumTitle}'.`,
                        },
                        unit_amount: 500, // £5.00
                    },
                    quantity: 1,
                },
            ],
            mode: "payment",
            success_url: `${process.env.NEXT_PUBLIC_APP_URL}/shop?artbook=success&album=${encodeURIComponent(albumId)}`,
            cancel_url: `${process.env.NEXT_PUBLIC_APP_URL}/shop`,
            metadata: {
                type: "artbook",
                albumId,
                albumTitle
            },
        });

        return NextResponse.json({ url: session.url });
    } catch (error: any) {
        console.error("Artbook Checkout Error:", error);
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}
