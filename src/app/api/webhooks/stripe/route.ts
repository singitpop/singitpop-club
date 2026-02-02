import { headers } from "next/headers";
import { NextResponse } from "next/server";
import Stripe from "stripe";
import { Resend } from "resend";
import { getSignedFileUrl } from "@/lib/s3";

// Init Stripe
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY || "", {
    apiVersion: "2026-01-28.clover",
});

// Init Resend
const resend = new Resend(process.env.RESEND_API_KEY);

const STRIPE_WEBHOOK_SECRET = process.env.STRIPE_WEBHOOK_SECRET!;

export async function POST(req: Request) {
    if (!STRIPE_WEBHOOK_SECRET) {
        console.error("❌ Mising STRIPE_WEBHOOK_SECRET");
        return new NextResponse("Webhook Secret Missing", { status: 500 });
    }

    const body = await req.text();
    const sig = (await headers()).get("stripe-signature") || "";

    let event: Stripe.Event;

    try {
        event = stripe.webhooks.constructEvent(body, sig, STRIPE_WEBHOOK_SECRET);
    } catch (err: any) {
        console.error(`❌ Webhook signature verification failed: ${err.message}`);
        return new NextResponse(`Webhook Error: ${err.message}`, { status: 400 });
    }

    // Handle the event
    if (event.type === "checkout.session.completed") {
        const session = event.data.object as Stripe.Checkout.Session;

        // Retrieve the expanded session to get line items and product metadata
        // We usually store product specific metadata on the Product object, not just the session
        // But in our sync script, we set metadata on the PRODUCT

        // 1. Get the line items to find which product was bought
        const lineItems = await stripe.checkout.sessions.listLineItems(session.id, {
            expand: ['data.price.product']
        });

        const customerEmail = session.customer_details?.email;

        if (!customerEmail) {
            console.error("❌ No customer email found in session");
            return new NextResponse("No email found", { status: 200 });
        }

        console.log(`📦 Processing order for: ${customerEmail}`);

        for (const item of lineItems.data) {
            const product = item.price?.product as Stripe.Product;

            if (!product || !product.metadata.mp3_key) {
                console.log(`⚠️ Item ${item.description} has no ringtone metadata. Skipping.`);
                continue;
            }

            const { title, mp3_key, m4r_key, genre } = product.metadata; // metadata from Stripe Product

            console.log(`🎵 Generating download links for: ${title} (${mp3_key})`);

            // Generate signed URLs (valid for 24 hours)
            // Using getSignedFileUrl from lib/s3
            // Note: getSignedFileUrl receives (key, expiresIn, isDownload)
            const mp3Url = await getSignedFileUrl(mp3_key, 24 * 60 * 60, true);
            const m4rUrl = await getSignedFileUrl(m4r_key, 24 * 60 * 60, true);

            // Send Email
            try {
                const { data, error } = await resend.emails.send({
                    from: 'SingIt Pop <orders@singitpop.com>', // Ensure you have this domain verified in Resend
                    to: [customerEmail],
                    subject: `Your Ringtone Download: ${title}`,
                    html: `
                        <div style="font-family: sans-serif; max-width: 600px; margin: 0 auto;">
                            <h1 style="color: #ec4899;">Thanks for your order! 🎵</h1>
                            <p>Here are your download links for <strong>${title}</strong>.</p>
                            
                            <div style="background: #f4f4f5; padding: 20px; border-radius: 12px; margin: 20px 0;">
                                <p style="margin-bottom: 10px;"><strong>📱 For iPhone (M4R)</strong></p>
                                <a href="${m4rUrl}" style="background: #000; color: #fff; padding: 10px 20px; text-decoration: none; border-radius: 6px; display: inline-block;">Download M4R</a>
                                <p style="font-size: 12px; color: #666; margin-top: 5px;">Save to Files, then import to GarageBand or sync via iTunes.</p>
                                
                                <hr style="border: 0; border-top: 1px solid #ddd; margin: 20px 0;" />
                                
                                <p style="margin-bottom: 10px;"><strong>🤖 For Android (MP3)</strong></p>
                                <a href="${mp3Url}" style="background: #000; color: #fff; padding: 10px 20px; text-decoration: none; border-radius: 6px; display: inline-block;">Download MP3</a>
                                <p style="font-size: 12px; color: #666; margin-top: 5px;">Download and set as ringtone in Settings.</p>
                            </div>

                            <p style="font-size: 14px; color: #666;">Links are valid for 24 hours.</p>
                            
                            <p>Enjoy!<br/>The SingIt Pop Team</p>
                        </div>
                    `
                });

                if (error) {
                    console.error('❌ Resend Error:', error);
                } else {
                    console.log(`✅ Email sent to ${customerEmail}`);
                }

            } catch (emailErr) {
                console.error("❌ Failed to send email:", emailErr);
            }
        }
    }

    return new NextResponse(null, { status: 200 });
}

export const config = {
    api: {
        bodyParser: false,
    },
};
