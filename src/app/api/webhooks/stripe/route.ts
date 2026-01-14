import { NextResponse } from 'next/server';
import { headers } from 'next/headers';
import Stripe from 'stripe';
import { sendMixtapeEmail } from '@/lib/email';
import { albums } from '@/data/albumData';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
    apiVersion: '2025-01-27.acacia' as any, // Using 'as any' to bypass the lint error for now if package is older
});

const endpointSecret = process.env.STRIPE_WEBHOOK_SECRET;

export async function POST(req: Request) {
    const body = await req.text();
    const headersList = await headers();
    const sig = headersList.get('stripe-signature');

    let event: Stripe.Event;

    try {
        if (!sig || !endpointSecret) {
            // For local testing without CLI, you might bypass this check, 
            // BUT for production security, this is critical.
            // If secret is missing, we can't verify signature.
            console.warn('⚠️ Webhook signature verification failed: Missing secret or signature.');
            // Uncomment next line to enforce security (Recommended for production)
            // return NextResponse.json({ error: 'Webhook Error: Missing secret/signature' }, { status: 400 });

            // For now, if no secret, we assume trust (DEV MODE ONLY) or fail?
            // Safest is to fail if we want to be secure. 
            // But if user hasn't set up CLI, this will fail.
            // Let's rely on standard Stripe construction if variables exist.
            if (!endpointSecret) throw new Error('STRIPE_WEBHOOK_SECRET is missing');

            event = stripe.webhooks.constructEvent(body, sig, endpointSecret);
        } else {
            event = stripe.webhooks.constructEvent(body, sig, endpointSecret);
        }
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
                    // Try parsing "albumId:trackId" or fallback to just "trackId" (legacy)
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
                        // Fallback: Search all albums (slow but safe)
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

                // 2. Send Email
                if (downloadLinks.length > 0) {
                    const emailResult = await sendMixtapeEmail(
                        customerEmail,
                        session.customer_details?.name || 'Music Fan',
                        downloadLinks
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
