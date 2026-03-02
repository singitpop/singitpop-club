import { headers } from "next/headers";
import { NextResponse } from "next/server";
import Stripe from "stripe";
import { Resend } from "resend";
import { getSignedFileUrl } from "@/lib/s3";
import { createClerkClient } from '@clerk/nextjs/server';

// Init Stripe
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY || "", {
    apiVersion: "2025-01-27.acacia" as any,
});

// Init Clerk
const clerkClient = createClerkClient({ secretKey: process.env.CLERK_SECRET_KEY });

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

        // 1. Get the line items to find which product was bought
        const lineItems = await stripe.checkout.sessions.listLineItems(session.id, {
            expand: ['data.price.product']
        });

        const customerEmail = session.customer_details?.email;
        const clerkUserId = session.metadata?.clerkUserId;

        if (clerkUserId) {
            console.log(`👤 Processing Order for Clerk User: ${clerkUserId}`);

            const trackId = session.metadata?.trackId;

            // HANDLE TRACK PURCHASE
            if (trackId) {
                console.log(`🎵 Track Purchase: ${trackId}`);
                try {
                    const user = await clerkClient.users.getUser(clerkUserId);
                    const currentTracks = (user.publicMetadata.purchasedTracks as string[]) || [];

                    if (!currentTracks.includes(trackId)) {
                        await clerkClient.users.updateUser(clerkUserId, {
                            publicMetadata: {
                                purchasedTracks: [...currentTracks, trackId]
                            }
                        });
                        console.log(`✅ Added ${trackId} to user library`);
                    } else {
                        console.log(`⚠️ User already owns ${trackId}`);
                    }
                } catch (err) {
                    console.error("❌ Error updating user tracks:", err);
                }
            }

            // CHECK FOR MEMBERSHIP TIERS
            let grantedTier: string | null = null;

            for (const item of lineItems.data) {
                const priceId = item.price?.id;

                if (priceId === process.env.NEXT_PUBLIC_STRIPE_PRICE_LIFETIME) {
                    console.log("💎 Lifetime VIP Purchased!");
                    await clerkClient.users.updateUser(clerkUserId, {
                        publicMetadata: { tier: 'LIFETIME' }
                    });
                    grantedTier = 'LIFETIME VIP';
                } else if (priceId === process.env.NEXT_PUBLIC_STRIPE_PRICE_VIP) {
                    console.log("🌟 VIP Subscription Active!");
                    await clerkClient.users.updateUser(clerkUserId, {
                        publicMetadata: { tier: 'VIP' }
                    });
                    grantedTier = 'VIP';
                } else if (priceId === process.env.NEXT_PUBLIC_STRIPE_PRICE_INSIDER) {
                    console.log("💿 Insider Subscription Active!");
                    await clerkClient.users.updateUser(clerkUserId, {
                        publicMetadata: { tier: 'INSIDER' }
                    });
                    grantedTier = 'INSIDER';
                }
            }

            // NOTIFY OWNER OF NEW MEMBERSHIP
            if (grantedTier) {
                const ownerEmail = process.env.OWNER_EMAIL || 'garybirrell@gmail.com';
                const memberName = session.customer_details?.name || 'Unknown';
                const memberEmail = customerEmail || 'Unknown';
                const amountPaid = session.amount_total
                    ? `£${(session.amount_total / 100).toFixed(2)}`
                    : 'Unknown';

                try {
                    await resend.emails.send({
                        from: 'SingIt Pop <orders@singitpop.com>',
                        to: [ownerEmail],
                        subject: `🎉 New ${grantedTier} Member: ${memberName}`,
                        html: `
                            <div style="font-family: sans-serif; max-width: 600px; margin: 0 auto; background: #0a0a0a; color: #fff; padding: 30px; border-radius: 12px;">
                                <h1 style="color: #10b981; margin-bottom: 4px;">New Member Joined! 🎉</h1>
                                <p style="color: #6b7280; margin-top: 0;">SingIt Pop Membership Notification</p>
                                <div style="background: #1a1a1a; padding: 20px; border-radius: 10px; margin: 20px 0; border-left: 4px solid #10b981;">
                                    <table style="width: 100%; border-collapse: collapse;">
                                        <tr>
                                            <td style="padding: 8px 0; color: #9ca3af; width: 40%;">Tier</td>
                                            <td style="padding: 8px 0; color: #fff; font-weight: bold;">${grantedTier}</td>
                                        </tr>
                                        <tr>
                                            <td style="padding: 8px 0; color: #9ca3af;">Name</td>
                                            <td style="padding: 8px 0; color: #fff;">${memberName}</td>
                                        </tr>
                                        <tr>
                                            <td style="padding: 8px 0; color: #9ca3af;">Email</td>
                                            <td style="padding: 8px 0; color: #fff;">${memberEmail}</td>
                                        </tr>
                                        <tr>
                                            <td style="padding: 8px 0; color: #9ca3af;">Amount Paid</td>
                                            <td style="padding: 8px 0; color: #10b981; font-weight: bold;">${amountPaid}</td>
                                        </tr>
                                        <tr>
                                            <td style="padding: 8px 0; color: #9ca3af;">Date</td>
                                            <td style="padding: 8px 0; color: #fff;">${new Date().toUTCString()}</td>
                                        </tr>
                                    </table>
                                </div>
                                <p style="color: #6b7280; font-size: 13px;">You can view all members in the <a href="https://singitpop.com/admin" style="color: #10b981;">Admin Dashboard</a>.</p>
                            </div>
                        `
                    });
                    console.log(`✅ Owner notified of new ${grantedTier} member: ${memberEmail}`);
                } catch (notifyErr) {
                    console.error('❌ Failed to send owner membership notification:', notifyErr);
                }
            }

        }

        if (!customerEmail) {
            console.error("❌ No customer email found in session");
            return new NextResponse("No email found", { status: 200 });
        }

        console.log(`📦 Processing order for: ${customerEmail}`);

        for (const item of lineItems.data) {
            const product = item.price?.product as Stripe.Product;

            // Skip if it's a membership (no ringtone metadata)
            if (!product || !product.metadata.mp3_key) {
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


