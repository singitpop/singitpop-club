import { NextResponse } from 'next/server';
import { auth, clerkClient } from '@clerk/nextjs/server';
import { getCommunityPlaylists, getPlaylistStats } from '@/lib/community-s3';
import { getDailyVisits } from '@/lib/analytics-s3';

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

        // 2. Fetch Playlists (Recent 20 for list)
        const playlists = await getCommunityPlaylists(20);

        // 3. Fetch Playlist Stats (All time count/graph)
        const playlistStats = await getPlaylistStats(500);

        // 4. Fetch Visitor Stats (S3)
        const visits = await getDailyVisits();

        return NextResponse.json({
            users: userList.data,
            playlists: playlists,
            playlistStats: playlistStats,
            visits: visits
        });

    } catch (error) {
        console.error("Analytics Error:", error);
        return NextResponse.json({ error: 'Internal Error' }, { status: 500 });
    }
}
