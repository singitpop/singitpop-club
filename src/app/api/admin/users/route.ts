import { NextResponse } from 'next/server';
import { clerkClient } from '@clerk/nextjs/server';

// Ensure this route is protected in production (check for LABEL tier session)
// For now, we'll assume the client-side check protects the view, but secure this!

export async function GET() {
    try {
        const client = await clerkClient();
        const users = await client.users.getUserList({
            limit: 100,
        });

        // Map to simpler object
        const userData = users.data.map(u => ({
            id: u.id,
            email: u.emailAddresses[0]?.emailAddress,
            firstName: u.firstName,
            lastName: u.lastName,
            publicMetadata: u.publicMetadata,
            lastSignInAt: u.lastSignInAt
        }));

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

        if (action === 'ban') {
            await client.users.banUser(userId);
            return NextResponse.json({ success: true, banned: true });
        }

        return NextResponse.json({ error: 'Invalid action' }, { status: 400 });

    } catch (error: any) {
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}
