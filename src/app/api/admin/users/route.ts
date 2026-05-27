import { NextResponse } from 'next/server';
import { clerkClient } from '@clerk/nextjs/server';

// Ensure this route is protected in production (check for LABEL tier session)
// For now, we'll assume the client-side check protects the view, but secure this!

export async function GET(req: Request) {
    try {
        const { searchParams } = new URL(req.url);
        const query = searchParams.get('query') || undefined;
        const tier = searchParams.get('tier');
        const sort = searchParams.get('sort') || 'lastSignInAt';

        const client = await clerkClient();
        const users = await client.users.getUserList({
            limit: 100,
            query,
        });

        // Map to simpler object
        let userData = users.data.map((u: any) => ({
            id: u.id,
            email: u.emailAddresses[0]?.emailAddress,
            firstName: u.firstName,
            lastName: u.lastName,
            publicMetadata: u.publicMetadata,
            lastSignInAt: u.lastSignInAt,
            createdAt: u.createdAt
        }));

        // Filter by Tier (Client-side filtering as Clerk doesn't support metadata filtering in list)
        if (tier) {
            userData = userData.filter((u: any) => u.publicMetadata?.tier === tier);
        }

        // Sort
        userData.sort((a: any, b: any) => {
            const valA = a[sort as keyof typeof a] || 0;
            const valB = b[sort as keyof typeof b] || 0;
            return valB < valA ? -1 : 1; // Descending
        });

        return NextResponse.json(userData);
    } catch (error: any) {
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}

export async function POST(req: Request) {
    try {
        const { userId, action, tier } = await req.json();
        const client = await clerkClient();

        if (action === 'set_tier') {
            await client.users.updateUserMetadata(userId, {
                publicMetadata: {
                    tier: tier
                }
            });
            return NextResponse.json({ success: true, tier });
        }

        if (action === 'set_ryker_tier') {
            await client.users.updateUserMetadata(userId, {
                publicMetadata: {
                    rykerTier: tier // 'VIP' or 'FREE'
                }
            });
            return NextResponse.json({ success: true, rykerTier: tier });
        }

        if (action === 'toggle_ryker_ban') {
            const userObj = await client.users.getUser(userId);
            const isCurrentlyBanned = userObj.publicMetadata?.rykerBanned === true;
            await client.users.updateUserMetadata(userId, {
                publicMetadata: {
                    rykerBanned: !isCurrentlyBanned
                }
            });
            return NextResponse.json({ success: true, rykerBanned: !isCurrentlyBanned });
        }

        if (action === 'ban') {
            await client.users.banUser(userId);
            return NextResponse.json({ success: true, banned: true });
        }

        if (action === 'reset_downloads') {
            await client.users.updateUserMetadata(userId, {
                publicMetadata: {
                    downloadsThisMonth: 0
                }
            });
            return NextResponse.json({ success: true, reset: true });
        }

        return NextResponse.json({ error: 'Invalid action' }, { status: 400 });

    } catch (error: any) {
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}
