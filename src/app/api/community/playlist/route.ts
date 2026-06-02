import { NextResponse } from 'next/server';
import { auth, clerkClient } from '@clerk/nextjs/server';
import { saveCommunityPlaylist, getCommunityPlaylists, getCommunityPlaylist, deleteCommunityPlaylist } from '@/lib/community-s3';
import { getSignedAlbumCoverUrl } from '@/lib/server-image-utils';
import { albums } from '@/data/albumData';

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
            // Check Admin or Label
            const client = await clerkClient();
            const user = await client.users.getUser(userId);
            const role = user.publicMetadata.role as string; // 'admin'
            const tier = String(user.publicMetadata.tier || '').toUpperCase(); // 'LABEL'
            
            if (role === 'admin' || tier === 'LABEL') {
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
        const rawPlaylists = await getCommunityPlaylists();
        
        // Resolve Signed URLs and Track Artworks for all playlists
        const playlists = await Promise.all(rawPlaylists.map(async (playlist: any) => {
            let coverUrl = playlist.coverImage || playlist.coverArt;
            const trackArtworks: string[] = [];

            // Resolve First 4 Track Artworks (Signed)
            if (playlist.tracks && playlist.tracks.length > 0) {
                const previewTracks = playlist.tracks.slice(0, 4);
                
                for (const tId of previewTracks) {
                    const parts = String(tId).split('-');
                    let foundAlbum: any = null;

                    if (parts.length >= 2) {
                        const albumId = parts.slice(0, -1).join('-');
                        foundAlbum = albums.find(a => a.id === albumId);
                    }
                    
                    if (!foundAlbum) {
                        const numericId = parseInt(String(tId).match(/\d+/)?.[0] || "");
                        if (!isNaN(numericId)) {
                            foundAlbum = albums.find(a => a.tracks.some(t => t.id === numericId));
                        }
                    }

                    if (foundAlbum) {
                        const signedArt = await getSignedAlbumCoverUrl(foundAlbum);
                        trackArtworks.push(signedArt);
                    }
                }
            }
            
            // If no custom cover, use the first signed track artwork
            if (!coverUrl && trackArtworks.length > 0) {
                coverUrl = trackArtworks[0];
            } else if (coverUrl && !coverUrl.startsWith('http')) {
                // It's a relative path/ID string, sign it separately
                const match = albums.find(a => a.id === coverUrl || a.title === coverUrl);
                coverUrl = await getSignedAlbumCoverUrl(match || { id: coverUrl });
            }

            return {
                ...playlist,
                coverImage: coverUrl,
                trackArtworks: trackArtworks // New: Signed URLs for 2x2 grid
            };
        }));

        return NextResponse.json(playlists);
    } catch (error) {
        console.error("GET Playlists Error:", error);
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
        const { title, tracks, coverImage } = body;

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
            title: title.substring(0, 50),
            creator: `@${creatorName}`,
            creatorId: userId,
            userId: userId,
            tracks: tracks,
            coverImage: coverImage, // Save the selected cover (ID or relative path)
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
