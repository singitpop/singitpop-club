
import { NextResponse } from 'next/server';
import { auth } from '@clerk/nextjs/server';
import { getCommunityPlaylist, saveCommunityPlaylist } from '@/lib/community-s3';

export async function POST(req: Request) {
    try {
        const { userId } = await auth();
        if (!userId) {
            return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
        }

        const { playlistId } = await req.json();
        if (!playlistId) return NextResponse.json({ error: 'Missing ID' }, { status: 400 });

        // 1. Fetch Playlist
        const playlist = await getCommunityPlaylist(playlistId);
        if (!playlist) {
            return NextResponse.json({ error: 'Playlist not found' }, { status: 404 });
        }

        // Initialize likedBy if missing
        if (!playlist.likedBy) playlist.likedBy = [];

        // 2. Toggle Like
        const hasLiked = playlist.likedBy.includes(userId);

        if (hasLiked) {
            // UNLIKE
            playlist.likedBy = playlist.likedBy.filter(id => id !== userId);
            playlist.likes = Math.max(0, (playlist.likes || 1) - 1);
        } else {
            // LIKE
            playlist.likedBy.push(userId);
            playlist.likes = (playlist.likes || 0) + 1;
        }

        // 3. Save
        const success = await saveCommunityPlaylist(playlist);

        if (!success) {
            throw new Error("Failed to save playlist");
        }

        return NextResponse.json({
            success: true,
            likes: playlist.likes,
            hasLiked: !hasLiked
        });

    } catch (error) {
        console.error("Like Error:", error);
        return NextResponse.json({ error: 'Internal Error' }, { status: 500 });
    }
}
