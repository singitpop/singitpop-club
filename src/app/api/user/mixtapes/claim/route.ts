import { NextResponse } from 'next/server';
import { auth, clerkClient } from '@clerk/nextjs/server';
import { getAlbums } from '@/lib/data'; // Use dynamic data source
import { getSignedUrl } from "@aws-sdk/s3-request-presigner";
import { S3Client, GetObjectCommand } from "@aws-sdk/client-s3";

const s3Client = new S3Client({
    region: process.env.AWS_REGION!,
    credentials: {
        accessKeyId: process.env.AWS_ACCESS_KEY_ID!,
        secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY!,
    },
});

const MIXTAPE_LIMIT_PER_MONTH = 3;

interface UserMetadata {
    downloadsThisMonth?: number;
    lastDownloadMonth?: string; // YYYY-MM
    [key: string]: any;
}

export async function POST(req: Request) {
    const { userId } = await auth();
    if (!userId) {
        return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    try {
        // Fetch fresh album data (source of truth)
        const albums = await getAlbums();

        const { trackIds } = await req.json(); // Array of "albumId-trackId" or just IDs
        if (!trackIds || !Array.isArray(trackIds) || trackIds.length === 0) {
            return NextResponse.json({ error: 'No tracks selected' }, { status: 400 });
        }

        const client = await clerkClient();
        const user = await client.users.getUser(userId);
        const metadata = user.publicMetadata as UserMetadata;

        // 1. Check Eligibility (Insider or VIP/Label)
        const tier = (metadata.tier as string) || 'FAN';
        const isEligible = ['INSIDER', 'VIP', 'LABEL'].includes(tier) || metadata.role === 'admin';

        if (!isEligible) {
            return NextResponse.json({ error: 'This feature is exclusively for Insider and VIP members.' }, { status: 403 });
        }

        // Check Limits
        const currentMonth = new Date().toISOString().slice(0, 7); // "2026-01"
        let count = metadata.downloadsThisMonth || 0;

        // Reset if new month
        if (metadata.lastDownloadMonth !== currentMonth) {
            count = 0;
        }

        // Limits: Insider = 3, VIP = 10, Admin/Label = Unlimited
        const isAdminOrLabel = tier === 'LABEL' || metadata.role === 'admin';
        const limit = (tier === 'VIP') ? 10 : 3;

        if (!isAdminOrLabel && count >= limit) {
            return NextResponse.json({ error: `You have reached your limit of ${limit} mixtapes for this month. Upgrade tier or wait until next month.` }, { status: 429 });
        }

        // 3. Generate Links
        // Resolve track IDs to real audio URLs
        const signedUrls: { title: string, url: string }[] = [];
        const debugLogs: string[] = [];

        for (const uniqueId of trackIds) {
            // Find track
            let foundTrack = null;
            // Parse uniqueId if it's "albumId-trackId"
            const parts = String(uniqueId).split('-');
            if (parts.length >= 2) {
                // Try to find by specific album first
                const albumId = parts.slice(0, -1).join('-'); // Handle hyphens in albumId
                const trackId = parseInt(parts[parts.length - 1]);
                const album = albums.find(a => a.id === albumId);
                foundTrack = album?.tracks.find(t => t.id === trackId);
            }

            // Fallback search if simple ID or not found
            if (!foundTrack) {
                const idNum = parseInt(uniqueId);
                for (const a of albums) {
                    foundTrack = a.tracks.find(t => t.id === idNum);
                    if (foundTrack) break;
                }
            }

            if (foundTrack) {
                if (foundTrack.audioUrl) {
                    try {
                        // Extract Key from URL
                        const urlObj = new URL(foundTrack.audioUrl);
                        const key = decodeURIComponent(urlObj.pathname.substring(1)); // Remove leading slash

                        const command = new GetObjectCommand({
                            Bucket: process.env.AWS_S3_BUCKET || "singitpop-music",
                            Key: key,
                            ResponseContentDisposition: `attachment; filename="${foundTrack.title.replace(/[^a-zA-Z0-9.-]/g, '_')}.mp3"`
                        });

                        const signedUrl = await getSignedUrl(s3Client, command, { expiresIn: 3600 }); // 1 hour link for download
                        signedUrls.push({ title: foundTrack.title, url: signedUrl });
                    } catch (e) {
                        console.error(`Failed to sign ${foundTrack.title}`, e);
                        debugLogs.push(`Failed to sign ${foundTrack.title}: ${e}`);
                    }
                } else {
                    debugLogs.push(`Track ${foundTrack.title} has no audioUrl`);
                }
            } else {
                debugLogs.push(`Track ID ${uniqueId} not found`);
            }
        }

        // 4. Update Usage Metadata
        await client.users.updateUserMetadata(userId, {
            publicMetadata: {
                ...metadata,
                downloadsThisMonth: count + 1,
                lastDownloadMonth: currentMonth
            }
        });

        return NextResponse.json({
            success: true,
            links: signedUrls,
            remaining: isAdminOrLabel ? 9999 : (limit - (count + 1)),
            debug: {
                requested: trackIds.length,
                found: signedUrls.length,
                logs: debugLogs
            }
        });

    } catch (error) {
        console.error('Error claiming mixtape:', error);
        return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
    }
}

export async function GET(req: Request) {
    const { userId } = await auth();
    if (!userId) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

    const client = await clerkClient();
    const user = await client.users.getUser(userId);
    const metadata = user.publicMetadata as UserMetadata;
    const tier = (metadata.tier as string) || 'FAN';

    // Calculate usage
    const currentMonth = new Date().toISOString().slice(0, 7);
    let count = metadata.downloadsThisMonth || 0;
    if (metadata.lastDownloadMonth !== currentMonth) {
        count = 0;
    }
    const limit = (tier === 'VIP') ? 10 : 3;
    const isAdminOrLabel = tier === 'LABEL' || metadata.role === 'admin';

    return NextResponse.json({
        usage: count,
        limit: isAdminOrLabel ? 9999 : limit,
        remaining: isAdminOrLabel ? 9999 : Math.max(0, limit - count)
    });
}
