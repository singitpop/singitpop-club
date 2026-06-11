import { headers } from "next/headers";
import { NextResponse } from "next/server";
import Stripe from "stripe";
import { Resend } from "resend";
import { getSignedFileUrl } from "@/lib/s3";
import { createClerkClient } from '@clerk/nextjs/server';
import { saveMixtape } from "@/lib/mixtape-s3";
import { createArtbookAccess } from "@/lib/artbook-s3";

// Init Stripe
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY || "", {
    apiVersion: "2025-01-27.acacia" as any,
});

// Init Clerk
const clerkClient = createClerkClient({ secretKey: process.env.CLERK_SECRET_KEY });

// Init Resend
const resend = new Resend(process.env.RESEND_API_KEY);

const STRIPE_WEBHOOK_SECRET = process.env.STRIPE_WEBHOOK_SECRET!;
const STRIPE_WEBHOOK_SECRET_TEST = process.env.STRIPE_WEBHOOK_SECRET_TEST;

export async function POST(req: Request) {
    if (!STRIPE_WEBHOOK_SECRET) {
        console.error("❌ Missing STRIPE_WEBHOOK_SECRET");
        return new NextResponse("Webhook Secret Missing", { status: 500 });
    }

    const body = await req.text();
    const sig = (await headers()).get("stripe-signature") || "";

    let event: Stripe.Event | null = null;
    let verificationError: any = null;

    // Try primary secret first
    try {
        event = stripe.webhooks.constructEvent(body, sig, STRIPE_WEBHOOK_SECRET);
    } catch (err: any) {
        verificationError = err;
    }

    // Try fallback test secret if primary failed
    if (!event && STRIPE_WEBHOOK_SECRET_TEST) {
        try {
            event = stripe.webhooks.constructEvent(body, sig, STRIPE_WEBHOOK_SECRET_TEST);
            console.log("ℹ️ Verified webhook event using STRIPE_WEBHOOK_SECRET_TEST");
        } catch (err: any) {
            verificationError = err;
        }
    }

    if (!event) {
        console.error(`❌ Webhook signature verification failed: ${verificationError?.message}`);
        return new NextResponse(`Webhook Error: ${verificationError?.message}`, { status: 400 });
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
                } else if (priceId === process.env.NEXT_PUBLIC_STRIPE_PRICE_RYKER_VIP) {
                    console.log("🎸 Ryker VIP Subscription Active!");
                    await clerkClient.users.updateUser(clerkUserId, {
                        publicMetadata: { rykerTier: 'VIP' }
                    });
                    grantedTier = 'RYKER VIP';
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
                const ownerEmail = process.env.OWNER_EMAIL || 'gazzab7@gmail.com';
                const memberName = session.customer_details?.name || 'Unknown';
                const memberEmail = customerEmail || 'Unknown';
                const amountPaid = session.amount_total
                    ? `£${(session.amount_total / 100).toFixed(2)}`
                    : 'Unknown';

                try {
                    await resend.emails.send({
                        from: 'SingitPop Records <orders@singitpop.com>',
                        to: [ownerEmail],
                        subject: `🎉 New ${grantedTier} Member: ${memberName}`,
                        html: `
                            <div style="font-family: sans-serif; max-width: 600px; margin: 0 auto; background: #0a0a0a; color: #fff; padding: 30px; border-radius: 12px;">
                                <h1 style="color: #10b981; margin-bottom: 4px;">New Member Joined! 🎉</h1>
                                <p style="color: #6b7280; margin-top: 0;">SingitPop Records Membership Notification</p>
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

        // 2. Handle Creator Pack Purchases
        if (session.metadata?.type === "creator-pack") {
            const volume = session.metadata.volume || "1";
            const zipKey = `shop/SingItPop_CreatorPack_v${volume}.zip`;
            console.log(`🎬 Creator Pack Purchase: Volume ${volume}`);

            try {
                // Generate secure link (24h)
                const downloadUrl = await getSignedFileUrl(zipKey, 24 * 60 * 60, true);

                // Send Delivery Email
                await resend.emails.send({
                    from: 'SingitPop Records <orders@singitpop.com>',
                    to: [customerEmail],
                    subject: `Your Digital Creator Pack Download (Volume ${volume})`,
                    html: `
                        <div style="font-family: sans-serif; max-width: 600px; margin: 0 auto; background: #0a0a0a; color: #fff; padding: 40px; border-radius: 20px; border: 1px solid #22d3ee;">
                            <h1 style="color: #22d3ee; margin-bottom: 20px;">Your Sound Pack is Ready! 🎬</h1>
                            <p style="font-size: 16px; line-height: 1.6; color: #d1d5db;">
                                Thanks for grabbing <strong>SingitPop Records: Digital Creator Pack Vol ${volume}</strong>. 
                                Your professional 192Khz WAV assets are ready for download.
                            </p>
                            
                            <div style="background: rgba(34, 211, 238, 0.1); padding: 30px; border-radius: 15px; margin: 30px 0; border: 1px solid rgba(34, 211, 238, 0.2); text-align: center;">
                                <p style="color: #22d3ee; font-weight: bold; margin-bottom: 20px;">Volume ${volume} Contents:</p>
                                <ul style="list-style: none; padding: 0; color: #9ca3af; font-size: 14px; margin-bottom: 25px;">
                                    <li>⚡ 10x High-Impact Transitions</li>
                                    <li>🌊 5x Cinematic Atmos Loops</li>
                                    <li>🎼 5x Narrative Stingers</li>
                                </ul>
                                <a href="${downloadUrl}" style="background: #22d3ee; color: #000; padding: 15px 30px; text-decoration: none; border-radius: 12px; display: inline-block; font-weight: bold; font-size: 18px;">Download ZIP Collection</a>
                            </div>

                            <p style="font-size: 13px; color: #6b7280; margin-top: 30px;">
                                * This link is valid for 24 hours. If you need help, just reply to this email.
                            </p>
                            <p style="color: #22adbe; font-size: 14px; margin-top: 20px; font-weight: bold;">
                                Keep Creating,<br/>SingitPop Records
                            </p>
                        </div>
                    `
                });
                console.log(`✅ Creator Pack v${volume} delivered to ${customerEmail}`);
            } catch (err) {
                console.error("❌ Failed to deliver Creator Pack:", err);
            }
        }

        // 3. Handle Digital Mixtapes
        if (session.metadata?.type === "mixtape") {
            const { to, from, occasion, message, tracks, theme } = session.metadata;
            console.log(`🎁 Mixtape Order for: ${to}`);

            try {
                const id = await saveMixtape({
                    to,
                    from,
                    occasion,
                    message,
                    tracks: JSON.parse(tracks),
                    theme: theme as any,
                    orderId: session.id
                });

                if (id) {
                    const mixtapeUrl = `${process.env.NEXT_PUBLIC_APP_URL}/mixtape/${id}`;
                    await resend.emails.send({
                        from: 'SingitPop Records <orders@singitpop.com>',
                        to: [customerEmail],
                        subject: `Your Digital Mixtape Gift for ${to} is Ready! 🎁`,
                        html: `
                            <div style="font-family: sans-serif; max-width: 600px; margin: 0 auto; background: #050505; color: #fff; padding: 40px; border-radius: 20px; border: 1px solid #f43f5e;">
                                <h1 style="color: #f43f5e; margin-bottom: 20px; font-style: italic;">A Special Gift has Arrived! 🎁</h1>
                                <p style="font-size: 16px; line-height: 1.6;">
                                    Thanks for creating a <strong>SingitPop Records Digital Mixtape</strong> for ${to}. 
                                    Your personalized curation and dedication have been securely packaged.
                                </p>
                                
                                <div style="background: rgba(244, 63, 94, 0.1); padding: 30px; border-radius: 15px; margin: 30px 0; border: 1px solid rgba(244, 63, 94, 0.2); text-align: center;">
                                    <p style="color: #f43f5e; font-weight: bold; margin-bottom: 20px; letter-spacing: 0.1em;">THE GIFT LINK:</p>
                                    <a href="${mixtapeUrl}" style="background: #f43f5e; color: #fff; padding: 15px 30px; text-decoration: none; border-radius: 12px; display: inline-block; font-weight: bold; font-size: 18px; font-style: italic;">Open Digital Mixtape</a>
                                </div>

                                <p style="font-size: 14px; color: #9ca3af;">
                                    Share this link with ${to}. It will remain active forever as a digital keepsake of your dedication.
                                </p>
                                <p style="color: #f43f5e; font-size: 14px; margin-top: 30px; font-weight: bold; font-style: italic;">
                                    Keep Spreading the Love,<br/>SingitPop Records
                                </p>
                            </div>
                        `
                    });
                    console.log(`✅ Mixtape delivered: ${id}`);
                }
            } catch (err) {
                console.error("❌ Failed to fulfill Mixtape:", err);
            }
        }

        // 4. Handle Digital Artbooks
        if (session.metadata?.type === "artbook") {
            const albumId = session.metadata.albumId;
            console.log(`📖 Artbook Order: ${albumId}`);

            try {
                const token = await createArtbookAccess(albumId, customerEmail);
                if (token) {
                    const artbookUrl = `${process.env.NEXT_PUBLIC_APP_URL}/artbook/${token}`;
                    await resend.emails.send({
                        from: 'SingitPop Records <orders@singitpop.com>',
                        to: [customerEmail],
                        subject: `Your Digital Artbook Access: ${albumId} 📖`,
                        html: `
                            <div style="font-family: sans-serif; max-width: 600px; margin: 0 auto; background: #050505; color: #fff; padding: 40px; border-radius: 20px; border: 1px solid #10b981;">
                                <h1 style="color: #10b981; margin-bottom: 20px;">Your Digital Artbook is Ready! 📖</h1>
                                <p style="font-size: 16px; line-height: 1.6;">
                                    Thanks for purchasing the <strong>Digital Artbook & Lyric Companion</strong> for ${albumId}. 
                                    You can now access your high-resolution lyrics and exclusive visual companion.
                                </p>
                                
                                <div style="background: rgba(16, 185, 129, 0.1); padding: 30px; border-radius: 15px; margin: 30px 0; border: 1px solid rgba(16, 185, 129, 0.2); text-align: center;">
                                    <div style="margin-bottom: 15px;">
                                        <a href="${artbookUrl}" style="background: #10b981; color: #fff; padding: 15px 30px; text-decoration: none; border-radius: 12px; display: inline-block; font-weight: bold; font-size: 18px; width: 100%; max-width: 280px;">📖 Open Digital Artbook</a>
                                    </div>
                                    <div>
                                        <a href="${artbookUrl}/download" style="background: transparent; color: #10b981; border: 2px solid #10b981; padding: 15px 30px; text-decoration: none; border-radius: 12px; display: inline-block; font-weight: bold; font-size: 16px; width: 100%; max-width: 280px;">⬇️ Download Digital Extras (.zip)</a>
                                    </div>
                                </div>

                                <p style="font-size: 14px; color: #9ca3af;">
                                    These links are securely tied to your purchase. The Digital Extras vault contains your high-resolution 4K Desktop & Mobile wallpapers, and exclusive Thematic Lore.
                                </p>
                            </div>
                        `
                    });
                    console.log(`✅ Artbook token delivered: ${token}`);
                }
            } catch (err) {
                console.error("❌ Failed to fulfill Artbook:", err);
            }
        }

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
                    from: 'SingitPop Records <orders@singitpop.com>', // Ensure you have this domain verified in Resend
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
                            
                            <p>Enjoy!<br/>The SingitPop Records Team</p>
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


