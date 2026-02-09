import { NextResponse } from 'next/server';
import { auth, clerkClient } from '@clerk/nextjs/server';
import { getCommunityPlaylists } from '@/lib/community-s3';

export async function GET(req: Request) {
    try {
        const { userId } = await auth();
        if (!userId) {
            return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
        }

        const client = await clerkClient();

        // 1. Fetch Users (Limit 100 for MVP speed)
        const userList = await client.users.getUserList({
            limit: 100,
            orderBy: '-created_at'
        });

        // 2. Fetch Playlists
        const playlists = await getCommunityPlaylists(100);

        return NextResponse.json({
            users: userList.data,
            playlists: playlists
        });

    } catch (error) {
        console.error("Analytics Error:", error);
        return NextResponse.json({ error: 'Internal Error' }, { status: 500 });
    }
}
