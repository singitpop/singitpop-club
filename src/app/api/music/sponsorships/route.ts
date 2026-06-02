import { NextResponse } from 'next/server';
import { getSponsorships } from '@/lib/s3-storage';

export async function GET() {
    try {
        const sponsorships = await getSponsorships();
        return NextResponse.json({ sponsorships });
    } catch (error) {
        console.error('Failed to fetch sponsorships:', error);
        return NextResponse.json({ error: 'Failed to fetch sponsorships' }, { status: 500 });
    }
}
