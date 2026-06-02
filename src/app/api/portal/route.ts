import { NextRequest, NextResponse } from 'next/server';
import { auth, currentUser } from '@clerk/nextjs/server';
import { stripe } from '@/lib/stripe';

export async function POST(req: NextRequest) {
    try {
        const { userId } = await auth();
        const user = await currentUser();

        if (!userId || !user) {
            return new NextResponse("Unauthorized", { status: 401 });
        }

        const stripeCustomerId = user.publicMetadata.stripeCustomerId as string;

        if (!stripeCustomerId) {
            return new NextResponse("No Customer ID found", { status: 400 });
        }

        const session = await stripe.billingPortal.sessions.create({
            customer: stripeCustomerId,
            return_url: `${process.env.NEXT_PUBLIC_APP_URL}/club/account`,
        });

        return NextResponse.json({ url: session.url });

    } catch (error) {
        console.error("[PORTAL_ERROR]", error);
        return new NextResponse("Internal Error", { status: 500 });
    }
}
