
import { NextResponse } from 'next/server';
import { auth, clerkClient } from '@clerk/nextjs/server';
import { getActiveChallenge, saveChallenge, WeeklyChallenge } from '@/lib/community-s3';

export const dynamic = 'force-dynamic';

export async function GET() {
    const challenge = await getActiveChallenge();
    return NextResponse.json(challenge || { active: false }, {
        headers: {
            'Cache-Control': 'no-store, no-cache, must-revalidate, proxy-revalidate',
            'Pragma': 'no-cache',
            'Expires': '0'
        }
    });
}

export async function POST(req: Request) {
    try {
        const { userId } = await auth();
        if (!userId) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

        // Admin Check
        const client = await clerkClient();
        const user = await client.users.getUser(userId);
        const role = user.publicMetadata.role as string;
        if (role !== 'admin') {
            return NextResponse.json({ error: 'Forbidden' }, { status: 403 });
        }

        const body = await req.json();
        const { title, description, reward } = body;

        const newChallenge: WeeklyChallenge = {
            title,
            description,
            reward,
            active: true,
            updatedAt: new Date().toISOString()
        };

        const success = await saveChallenge(newChallenge);

        if (!success) {
            return NextResponse.json({ error: 'Failed to save' }, { status: 500 });
        }

        // Revalidate frontend path
        try {
            const { revalidatePath } = await import('next/cache');
            revalidatePath('/fan-albums');
        } catch (e) {
            console.error("Revalidate failed", e);
        }

        return NextResponse.json({ success: true, challenge: newChallenge });

    } catch (e) {
        console.error("Challenge API Error", e);
        return NextResponse.json({ error: 'Internal Error' }, { status: 500 });
    }
}
