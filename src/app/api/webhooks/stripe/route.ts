import { NextResponse } from 'next/server';
import { headers } from 'next/headers';
import Stripe from 'stripe';
import { sendMixtapeEmail } from '@/lib/email';
import { albums } from '@/data/albumData';
import { generateSignedUrl } from '@/lib/s3';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
    apiVersion: '2025-01-27.acacia' as any,
});

const endpointSecret = process.env.STRIPE_WEBHOOK_SECRET;

export async function POST(req: Request) {
    const body = await req.text();
    const headersList = await headers();
    const sig = headersList.get('stripe-signature');

    let event: Stripe.Event;

    try {
        // Strict Null Checks for TypeScript
        if (!sig) {
            console.error('⚠️ Webhook missing signature.');
            return NextResponse.json({ error: 'Webhook Error: Missing signature' }, { status: 400 });
        }

        if (!endpointSecret) {
            console.error('⚠️ STRIPE_WEBHOOK_SECRET is missing.');
            throw new Error('STRIPE_WEBHOOK_SECRET is missing');
        }

        // Now we know sig and endpointSecret are strings (not null)
        event = stripe.webhooks.constructEvent(body, sig, endpointSecret);

    } catch (err: any) {
        console.error(`❌ Webhook Error: ${err.message}`);
        return NextResponse.json({ error: `Webhook Error: ${err.message}` }, { status: 400 });
    }

    // Handle the event
    if (event.type === 'checkout.session.completed') {
        const session = event.data.object as Stripe.Checkout.Session;

        console.log(`💰 Payment succeeded for session: ${session.id}`);

        if (session.payment_status === 'paid') {
            const customerEmail = session.customer_details?.email || session.customer_email;
            const trackIdsString = session.metadata?.trackIds; // Format: "albumId:trackId,albumId:trackId"

            if (customerEmail && trackIdsString) {
                // 1. Resolve Links
                const trackIds = trackIdsString.split(',');
                const downloadLinks = [];

                for (const fullId of trackIds) {
                    let albumId: string | undefined;
                    let trackIdStr: string;

                    if (fullId.includes(':')) {
                        [albumId, trackIdStr] = fullId.split(':');
                    } else {
                        trackIdStr = fullId;
                    }

                    const trackId = parseInt(trackIdStr);

                    // Find the track
                    let track = null;
                    if (albumId) {
                        const album = albums.find(a => a.id === albumId);
                        track = album?.tracks.find(t => t.id === trackId);
                    } else {
                        // Fallback: Search all albums
                        for (const alb of albums) {
                            track = alb.tracks.find(t => t.id === trackId);
                            if (track) break;
                        }
                    }

                    if (track && track.audioUrl) {
                        downloadLinks.push({
                            title: track.title,
                            url: track.audioUrl
                        });
                    }
                }

                // 2. Sign the URLs (Secure Downloads)
                // We resolve all promises in parallel
                const signedLinks = await Promise.all(downloadLinks.map(async (link) => {
                    try {
                        const signedUrl = await generateSignedUrl(link.url);
                        return {
                            ...link,
                            url: signedUrl
                        };
                    } catch (e) {
                        console.error("Failed to sign URL:", link.url);
                        return link; // Fallback to original
                    }
                }));

                // 3. Send Email
                if (signedLinks.length > 0) {
                    const emailResult = await sendMixtapeEmail(
                        customerEmail,
                        session.customer_details?.name || 'Music Fan',
                        signedLinks
                    );

                    if (!emailResult || !emailResult.success) {
                        console.error('❌ Failed to send email via webhook');
                        return NextResponse.json({ error: 'Email send failed' }, { status: 500 });
                    }
                }
            }
        }
    }

    return NextResponse.json({ received: true });
}
