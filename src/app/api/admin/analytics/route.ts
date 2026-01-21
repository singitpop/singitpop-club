import { NextRequest, NextResponse } from 'next/server';
import { clerkClient } from '@clerk/nextjs/server';
import { stripe } from '@/lib/stripe';

export async function GET(req: NextRequest) {
    try {
        const { searchParams } = new URL(req.url);
        const metric = searchParams.get('metric');

        const client = await clerkClient();

        switch (metric) {
            case 'users': {
                // Get all users and group by creation date
                const users = await client.users.getUserList({ limit: 500 });

                // Group by day for last 30 days
                const last30Days = Array.from({ length: 30 }, (_, i) => {
                    const date = new Date();
                    date.setDate(date.getDate() - (29 - i));
                    return date.toISOString().split('T')[0];
                });

                const usersByDay = last30Days.map(day => {
                    const count = users.data.filter(u => {
                        const createdDate = new Date(u.createdAt).toISOString().split('T')[0];
                        return createdDate === day;
                    }).length;
                    return { date: day, count };
                });

                return NextResponse.json(usersByDay);
            }

            case 'tiers': {
                const users = await client.users.getUserList({ limit: 500 });

                const tierCounts = users.data.reduce((acc, user) => {
                    const tier = (user.publicMetadata.tier as string) || 'FAN';
                    acc[tier] = (acc[tier] || 0) + 1;
                    return acc;
                }, {} as Record<string, number>);

                return NextResponse.json([
                    { name: 'Fan', value: tierCounts.FAN || 0, color: '#6b7280' },
                    { name: 'Insider', value: tierCounts.INSIDER || 0, color: '#3b82f6' },
                    { name: 'VIP', value: tierCounts.VIP || 0, color: '#8b5cf6' },
                ]);
            }

            case 'revenue': {
                // Get active subscriptions from Stripe
                const subscriptions = await stripe.subscriptions.list({
                    status: 'active',
                    limit: 100,
                });

                const insiderPrice = process.env.NEXT_PUBLIC_STRIPE_PRICE_INSIDER;
                const vipPrice = process.env.NEXT_PUBLIC_STRIPE_PRICE_VIP;

                let mrr = 0;
                let insiderCount = 0;
                let vipCount = 0;

                subscriptions.data.forEach(sub => {
                    const priceId = sub.items.data[0]?.price.id;
                    if (priceId === insiderPrice) {
                        mrr += 3.99;
                        insiderCount++;
                    } else if (priceId === vipPrice) {
                        mrr += 8.99;
                        vipCount++;
                    }
                });

                return NextResponse.json({
                    mrr: mrr.toFixed(2),
                    totalSubscribers: insiderCount + vipCount,
                    insiderCount,
                    vipCount,
                    churnRate: 0, // TODO: Calculate from canceled subscriptions
                });
            }

            case 'engagement': {
                // Placeholder for engagement metrics
                // In a real app, you'd track this in a database
                return NextResponse.json({
                    topUsers: [],
                    totalStreams: 0,
                    totalDownloads: 0,
                });
            }

            default:
                return NextResponse.json({ error: 'Invalid metric' }, { status: 400 });
        }
    } catch (error: any) {
        console.error('Analytics error:', error);
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}
