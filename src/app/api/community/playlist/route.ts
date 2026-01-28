import { NextResponse } from 'next/server';
import { auth, clerkClient } from '@clerk/nextjs/server';
import { saveCommunityPlaylist, getCommunityPlaylists } from '@/lib/community-s3';

// Mock vibrant gradients for new mixes
const GRADIENTS = [
    { color: 'linear-gradient(135deg, #FF0080 0%, #7928CA 100%)', themeColor: '#FF0080' },
    { color: 'linear-gradient(135deg, #007CF0 0%, #00DFD8 100%)', themeColor: '#007CF0' },
    { color: 'linear-gradient(135deg, #FF4D4D 0%, #F9CB28 100%)', themeColor: '#FF4D4D' },
    { color: 'linear-gradient(135deg, #100C29 0%, #7d1c69 100%)', themeColor: '#7d1c69' },
    { color: 'linear-gradient(135deg, #FAD961 0%, #F76B1C 100%)', themeColor: '#F76B1C' },
    { color: 'linear-gradient(135deg, #FF00CC 0%, #333399 100%)', themeColor: '#FF00CC' },
];

export async function GET() {
    try {
        const playlists = await getCommunityPlaylists();
        return NextResponse.json(playlists);
    } catch (error) {
        return NextResponse.json({ error: 'Failed to fetch playlists' }, { status: 500 });
    }
}

export async function POST(req: Request) {
    try {
        const { userId } = await auth();
        if (!userId) {
            return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
        }

        const body = await req.json();
        const { title, tracks } = body;

        if (!title || !tracks || !Array.isArray(tracks) || tracks.length === 0) {
            return NextResponse.json({ error: 'Invalid data' }, { status: 400 });
        }

        // Fetch user details for creator name
        const client = await clerkClient();
        const user = await client.users.getUser(userId);
        const creatorName = user.username || user.firstName || "Anonymous Fan";

        // Pick random style
        const style = GRADIENTS[Math.floor(Math.random() * GRADIENTS.length)];

        const newPlaylist = {
            id: "", // set in lib
            title: title.substring(0, 50), // Limit length
            creator: `@${creatorName}`,
            creatorId: userId,
            userId: userId,
            tracks: tracks,
            createdAt: new Date().toISOString(),
            color: style.color,
            themeColor: style.themeColor,
            likes: 0
        };

        const success = await saveCommunityPlaylist(newPlaylist);

        if (!success) {
            throw new Error("Failed to save to S3");
        }

        return NextResponse.json({ success: true, playlist: newPlaylist });

    } catch (error) {
        console.error("Create playlist error:", error);
        return NextResponse.json({ error: 'Internal Error' }, { status: 500 });
    }
}
