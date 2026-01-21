import { headers } from 'next/headers';
import { NextRequest, NextResponse } from 'next/server';
import { stripe } from '@/lib/stripe';
import { createClerkClient } from '@clerk/nextjs/server';

const clerk = createClerkClient({ secretKey: process.env.CLERK_SECRET_KEY });

export async function POST(req: NextRequest) {
    const body = await req.text();
    const signature = headers().get('Stripe-Signature') as string;

    let event;

    try {
        event = stripe.webhooks.constructEvent(
            body,
            signature,
            process.env.STRIPE_WEBHOOK_SECRET!
        );
    } catch (err: any) {
        console.error(`Webhook signature verification failed: ${err.message}`);
        return new NextResponse(`Webhook Error: ${err.message}`, { status: 400 });
    }

    const session = event.data.object as any;

    if (event.type === 'checkout.session.completed') {
        const subscriptionId = session.subscription;
        const clerkUserId = session.metadata?.clerkUserId;

        if (!clerkUserId) {
            console.error('No clerkUserId in metadata');
            return new NextResponse('No clerkUserId', { status: 400 });
        }

        // Retrieve subscription to check product/tier
        const subscription = await stripe.subscriptions.retrieve(subscriptionId);
        const priceId = subscription.items.data[0].price.id;

        // Map Price ID to Tier
        let tier = 'FAN'; // Default
        if (priceId === process.env.NEXT_PUBLIC_STRIPE_PRICE_INSIDER) {
            tier = 'INSIDER';
        } else if (priceId === process.env.NEXT_PUBLIC_STRIPE_PRICE_VIP) {
            tier = 'VIP';
        }

        console.log(`[Webhook] Syncing User ${clerkUserId} to Tier: ${tier}`);

        // Update Clerk Metadata
        await clerk.users.updateUserMetadata(clerkUserId, {
            publicMetadata: {
                tier: tier,
                stripeCustomerId: session.customer,
                stripeSubscriptionId: subscriptionId
            }
        });
    }

    if (event.type === 'customer.subscription.updated') {
        // Handle downgrades/upgrades/cancellations
        // Logic: Check status ('active', 'canceled', 'past_due')
        // Update Clerk accordingly.
        // For simplicity v1, we focus on checkout completion.
        // For full robustness, we should handle this to revert to 'FAN' on cancel.
    }

    return new NextResponse('Webhook received', { status: 200 });
}
