
import { NextResponse } from 'next/server';
import { auth, clerkClient } from '@clerk/nextjs/server';

export async function GET() {
    const { userId } = await auth();
    if (!userId) {
        return NextResponse.json({ favorites: [] });
    }

    try {
        const client = await clerkClient();
        const user = await client.users.getUser(userId);
        const favorites = (user.publicMetadata.favorites as string[]) || [];
        return NextResponse.json({ favorites });
    } catch (error) {
        console.error('Error fetching favorites:', error);
        return NextResponse.json({ error: 'Failed to fetch favorites' }, { status: 500 });
    }
}

export async function POST(req: Request) {
    const { userId } = await auth();
    if (!userId) {
        return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    try {
        const { trackId } = await req.json();
        if (!trackId) {
            return NextResponse.json({ error: 'Track ID required' }, { status: 400 });
        }

        const client = await clerkClient();
        const user = await client.users.getUser(userId);
        const favorites = (user.publicMetadata.favorites as string[]) || [];

        if (!favorites.includes(trackId)) {
            const newFavorites = [...favorites, trackId];
            await client.users.updateUserMetadata(userId, {
                publicMetadata: {
                    ...user.publicMetadata,
                    favorites: newFavorites
                }
            });
            return NextResponse.json({ favorites: newFavorites, added: true });
        }

        return NextResponse.json({ favorites, added: false });
    } catch (error) {
        console.error('Error adding favorite:', error);
        return NextResponse.json({ error: 'Failed to add favorite' }, { status: 500 });
    }
}

export async function DELETE(req: Request) {
    const { userId } = await auth();
    if (!userId) {
        return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    try {
        const { trackId } = await req.json();
        if (!trackId) {
            return NextResponse.json({ error: 'Track ID required' }, { status: 400 });
        }

        const client = await clerkClient();
        const user = await client.users.getUser(userId);
        const favorites = (user.publicMetadata.favorites as string[]) || [];

        const newFavorites = favorites.filter(id => id !== trackId);

        if (favorites.length !== newFavorites.length) {
            await client.users.updateUserMetadata(userId, {
                publicMetadata: {
                    ...user.publicMetadata,
                    favorites: newFavorites
                }
            });
        }

        return NextResponse.json({ favorites: newFavorites, removed: true });
    } catch (error) {
        console.error('Error removing favorite:', error);
        return NextResponse.json({ error: 'Failed to remove favorite' }, { status: 500 });
    }
}
