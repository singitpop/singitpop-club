import { NextResponse } from 'next/server';
import { auth, clerkClient } from '@clerk/nextjs/server';
import { saveCommunityPlaylist, getCommunityPlaylists, getCommunityPlaylist, deleteCommunityPlaylist } from '@/lib/community-s3';

export async function DELETE(req: Request) {
    try {
        const { userId } = await auth();
        if (!userId) {
            return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
        }

        const { searchParams } = new URL(req.url);
        const id = searchParams.get('id');

        if (!id) {
            return NextResponse.json({ error: 'Missing ID' }, { status: 400 });
        }

        // 1. Fetch Playlist
        const playlist = await getCommunityPlaylist(id);
        if (!playlist) {
            return NextResponse.json({ error: 'Not found' }, { status: 404 });
        }

        // 2. Verified Owner or Admin
        let isAllowed = false;
        let isAdminAction = false;

        if (playlist.userId === userId) {
            isAllowed = true;
        } else {
            // Check Admin
            const client = await clerkClient();
            const user = await client.users.getUser(userId);
            const role = user.publicMetadata.role as string; // 'admin'
            if (role === 'admin') {
                isAllowed = true;
                isAdminAction = true;
            }
        }

        if (!isAllowed) {
            console.warn(`⛔ Forbidden delete attempt by user ${userId} on playlist ${id}`);
            return NextResponse.json({ error: 'Forbidden' }, { status: 403 });
        }

        // 3. Delete
        const success = await deleteCommunityPlaylist(id);
        if (success) {
            console.log(`✅ Playlist ${id} deleted by ${isAdminAction ? 'ADMIN' : 'Owner'} (${userId})`);
            return NextResponse.json({ success: true });
        } else {
            console.error(`❌ Failed to delete playlist ${id} (S3 error)`);
            return NextResponse.json({ error: 'Failed to delete' }, { status: 500 });
        }

    } catch (error) {
        console.error("Delete Error:", error);
        return NextResponse.json({ error: 'Internal Error' }, { status: 500 });
    }
}


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

export async function PATCH(req: Request) {
    try {
        const { userId } = await auth();
        if (!userId) {
            return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
        }

        const body = await req.json();
        const { id, title, tracks, coverImage } = body;

        if (!id) {
            return NextResponse.json({ error: 'Missing ID' }, { status: 400 });
        }

        // 1. Fetch Existing
        const playlist = await getCommunityPlaylist(id);
        if (!playlist) {
            return NextResponse.json({ error: 'Not found' }, { status: 404 });
        }

        // 2. Verified Owner or Admin
        let isAllowed = false;
        if (playlist.userId === userId) {
            isAllowed = true;
        } else {
            const client = await clerkClient();
            const user = await client.users.getUser(userId);
            if (user.publicMetadata.role === 'admin') {
                isAllowed = true;
            }
        }

        if (!isAllowed) {
            return NextResponse.json({ error: 'Forbidden' }, { status: 403 });
        }

        // 3. Update Fields
        const updatedPlaylist = {
            ...playlist,
            title: title !== undefined ? title.substring(0, 50) : playlist.title,
            tracks: tracks !== undefined ? tracks : playlist.tracks,
            coverImage: coverImage !== undefined ? coverImage : playlist.coverImage
        };

        const success = await saveCommunityPlaylist(updatedPlaylist);
        if (!success) {
            throw new Error("S3 Update Failed");
        }

        return NextResponse.json({ success: true, playlist: updatedPlaylist });

    } catch (error) {
        console.error("PATCH Error:", error);
        return NextResponse.json({ error: 'Internal Error' }, { status: 500 });
    }
}
