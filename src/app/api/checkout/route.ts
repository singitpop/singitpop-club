import { NextRequest, NextResponse } from 'next/server';
import { auth, currentUser } from '@clerk/nextjs/server';
import { stripe } from '../../../lib/stripe';
import Stripe from 'stripe'; // Fix: Import Stripe type
import { normalizeEmail } from '../../../lib/email-utils';

export async function POST(req: NextRequest) {
    try {
        const { userId } = await auth();
        const user = await currentUser();

        if (!userId || !user) {
            return new NextResponse("Unauthorized", { status: 401 });
        }

        const { priceId: inputPriceId, mode = 'subscription', trackId, albumId, returnUrl } = await req.json();

        let priceId = inputPriceId;

        // Handle Track & Ringtone Purchase - Authoritative £0.99 Rule
        if (!priceId && (trackId || req.nextUrl.searchParams.get('type') === 'ringtone')) {
            priceId = process.env.NEXT_PUBLIC_STRIPE_PRICE_TRACK || 'price_1 AUTHORITATIVE_99P';
        }

        if (!priceId) {
            return new NextResponse("Price ID required", { status: 400 });
        }

        // 1. Check if user already has a Stripe Customer ID stored in Clerk publicMetadata
        let stripeCustomerId = user.publicMetadata.stripeCustomerId as string;

        if (!stripeCustomerId) {
            // 2. Create a new Customer in Stripe if checks fail
            const userEmail = user.emailAddresses?.[0]?.emailAddress;
            if (!userEmail) { return new NextResponse("User email missing from account", { status: 400 }); }
            const normalizedEmail = normalizeEmail(userEmail);

            const customer = await stripe.customers.create({
                email: normalizedEmail,
                metadata: {
                    clerkUserId: userId,
                    originalEmail: userEmail // Store original for reference
                }
            });
            stripeCustomerId = customer.id;
        }

        // Determine base URLs
        const successBaseUrl = returnUrl || process.env.NEXT_PUBLIC_APP_URL || "https://club.singitpop.com";
        const cancelBaseUrl = returnUrl || process.env.NEXT_PUBLIC_APP_URL || "https://club.singitpop.com";

        // 3. Create Checkout Session
        const session = await stripe.checkout.sessions.create({
            customer: stripeCustomerId,
            mode: mode as Stripe.Checkout.SessionCreateParams.Mode,
            payment_method_types: ['card'], // 'link' is often auto-enabled
            line_items: [
                {
                    price: priceId,
                    quantity: 1,
                },
            ],
            metadata: {
                clerkUserId: userId,
                trackId: trackId || undefined, // Add trackId if present
                albumId: albumId || undefined  // Add albumId if present
            },
            success_url: returnUrl ? `${successBaseUrl}?success=true` : `${successBaseUrl}/club?success=true`,
            cancel_url: returnUrl ? `${cancelBaseUrl}?canceled=true` : `${cancelBaseUrl}/music?canceled=true`,
            billing_address_collection: 'auto',
            allow_promotion_codes: true,
        });

        return NextResponse.json({ url: session.url });

    } catch (error: any) {
        console.error("[CHECKOUT_ERROR]", error);

        // If customer doesn't exist anymore, we could delete the metadata in Clerk.
        // For now, we return the specific Stripe error message so the user knows.
        const errorMessage = error instanceof Error ? error.message : "Internal Error";
        return new NextResponse(errorMessage, { status: 500 });
    }
}
