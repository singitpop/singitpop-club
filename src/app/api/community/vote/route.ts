import { NextResponse } from 'next/server';
import { auth } from '@clerk/nextjs/server';
import { saveVote, getUserVote } from '@/lib/voting-s3';

const CAMPAIGN_ID = "single-release-feb-2026"; // Hardcoded active campaign

export async function POST(req: Request) {
    try {
        const { userId } = await auth();
        if (!userId) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

        const { trackId } = await req.json();
        if (!trackId) return NextResponse.json({ error: 'Missing trackId' }, { status: 400 });

        const success = await saveVote(CAMPAIGN_ID, userId, trackId);
        if (success) {
            return NextResponse.json({ success: true });
        } else {
            return NextResponse.json({ error: 'Failed to save vote' }, { status: 500 });
        }
    } catch (error) {
        return NextResponse.json({ error: 'Internal Error' }, { status: 500 });
    }
}

export async function GET(req: Request) {
    try {
        const { userId } = await auth();
        if (!userId) return NextResponse.json({ votedTrackId: null });

        const votedTrackId = await getUserVote(CAMPAIGN_ID, userId);
        return NextResponse.json({ votedTrackId });
    } catch (error) {
        return NextResponse.json({ votedTrackId: null });
    }
}
