import { NextRequest, NextResponse } from 'next/server';
import { auth, currentUser } from '@clerk/nextjs/server';
import { stripe } from '@/lib/stripe';
import { normalizeEmail } from '@/lib/email-utils';

export async function POST(req: NextRequest) {
    try {
        const { userId } = await auth();
        const user = await currentUser();

        if (!userId || !user) {
            return new NextResponse("Unauthorized", { status: 401 });
        }

        const { priceId } = await req.json();

        if (!priceId) {
            return new NextResponse("Price ID required", { status: 400 });
        }

        // 1. Check if user already has a Stripe Customer ID stored in Clerk publicMetadata
        let stripeCustomerId = user.publicMetadata.stripeCustomerId as string;

        if (!stripeCustomerId) {
            // 2. Create a new Customer in Stripe if checks fail
            const userEmail = user.emailAddresses[0].emailAddress;
            const normalizedEmail = normalizeEmail(userEmail);

            const customer = await stripe.customers.create({
                email: normalizedEmail,
                metadata: {
                    clerkUserId: userId,
                    originalEmail: userEmail // Store original for reference
                }
            });
            stripeCustomerId = customer.id;

            // 2b. We should sync this back to Clerk, but we can relies on the webhook for resilience 
            // OR do it here to be faster. Let's rely on webhook for the "Source of Truth" 
            // but for this session, we pass the customer ID.
        }

        // 3. Create Checkout Session
        const session = await stripe.checkout.sessions.create({
            customer: stripeCustomerId,
            mode: 'subscription',
            payment_method_types: ['card'], // 'link' is often auto-enabled
            line_items: [
                {
                    price: priceId,
                    quantity: 1,
                },
            ],
            metadata: {
                clerkUserId: userId,
            },
            success_url: `${process.env.NEXT_PUBLIC_APP_URL}/club?success=true`,
            cancel_url: `${process.env.NEXT_PUBLIC_APP_URL}/membership?canceled=true`,
            billing_address_collection: 'auto',
            allow_promotion_codes: true,
        });

        return NextResponse.json({ url: session.url });

    } catch (error) {
        console.error("[CHECKOUT_ERROR]", error);
        return new NextResponse("Internal Error", { status: 500 });
    }
}
