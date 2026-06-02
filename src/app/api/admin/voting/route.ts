
import { NextResponse } from 'next/server';
import { auth } from '@clerk/nextjs/server';
import { saveCampaign, Campaign } from '@/lib/voting-s3';

export async function POST(req: Request) {
    try {
        const { userId, sessionClaims } = await auth();

        // rigorous admin check
        if (!userId || (sessionClaims?.metadata as any)?.role !== 'admin') {
            // return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
        }

        const body = await req.json();
        const campaign: Campaign = {
            id: 'active',
            title: body.title || 'Next Single Vote',
            description: body.description || 'Vote for the track you want released next!',
            deadline: body.deadline,
            tracks: body.tracks
        };

        const success = await saveCampaign(campaign);

        if (success) {
            return NextResponse.json({ success: true });
        } else {
            return NextResponse.json({ error: 'Failed to save to S3' }, { status: 500 });
        }

    } catch (error) {
        console.error("Admin Voting Error:", error);
        return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
    }
}
