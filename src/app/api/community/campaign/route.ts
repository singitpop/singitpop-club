
import { NextResponse } from 'next/server';
import { getActiveCampaign } from '@/lib/voting-s3';

export async function GET() {
    try {
        const campaign = await getActiveCampaign();

        if (!campaign) {
            return NextResponse.json({ error: 'No active campaign' }, { status: 404 });
        }

        // Calculate time remaining logic could go here, or just return the raw data
        return NextResponse.json(campaign);
    } catch (error) {
        return NextResponse.json({ error: 'Internal Error' }, { status: 500 });
    }
}
