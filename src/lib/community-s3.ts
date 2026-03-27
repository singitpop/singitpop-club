import { S3Client, PutObjectCommand, ListObjectsV2Command, GetObjectCommand, DeleteObjectCommand } from "@aws-sdk/client-s3";

const s3Client = new S3Client({
    region: process.env.AWS_REGION!,
    credentials: {
        accessKeyId: process.env.AWS_ACCESS_KEY_ID!,
        secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY!,
    },
});

const BUCKET = process.env.AWS_S3_BUCKET || "singitpop-music";
const PREFIX = "community/playlists/";

export interface CommunityPlaylist {
    id: string; // S3 Key or UUID
    title: string;
    creator: string; // Username or "Anonymous"
    creatorId: string; // UserId
    userId: string; // Owner ID
    tracks: string[]; // List of track unique IDs (e.g. "album-track")
    createdAt: string;
    color: string; // Gradient
    themeColor: string; // Hex
    likes: number; // Stored in JSON
    likedBy?: string[]; // Array of user IDs who liked
    coverImage?: string; // Optional custom artwork URL
}

export async function saveCommunityPlaylist(playlist: CommunityPlaylist): Promise<boolean> {
    try {
        let filename = playlist.id;

        // If new, generate filename
        if (!filename) {
            filename = `${Date.now()}-${playlist.userId.slice(-5)}-${Math.floor(Math.random() * 1000)}.json`;
            playlist.id = filename;
        }

        const key = `${PREFIX}${filename}`;

        const command = new PutObjectCommand({
            Bucket: BUCKET,
            Key: key,
            Body: JSON.stringify(playlist),
            ContentType: "application/json",
            CacheControl: "no-cache" // Dynamic content
        });

        await s3Client.send(command);
        return true;
    } catch (error) {
        console.error("Error saving community playlist:", error);
        return false;
    }
}

export async function getCommunityPlaylists(limit = 50): Promise<CommunityPlaylist[]> {
    try {
        // 1. List Objects
        const listCmd = new ListObjectsV2Command({
            Bucket: BUCKET,
            Prefix: PREFIX,
            MaxKeys: limit
        });

        const listRes = await s3Client.send(listCmd);

        if (!listRes.Contents || listRes.Contents.length === 0) {
            return [];
        }

        // Sort by LastModified descending (newest first)
        const sortedContents = listRes.Contents.sort((a, b) => {
            return (b.LastModified?.getTime() || 0) - (a.LastModified?.getTime() || 0);
        });

        // 2. Fetch Content in Parallel
        const playlists: CommunityPlaylist[] = [];

        // Limit to top 20 for fetch performance if list is larger
        const filesToFetch = sortedContents.slice(0, 20);

        await Promise.all(filesToFetch.map(async (file) => {
            if (!file.Key) return;
            try {
                const getCmd = new GetObjectCommand({
                    Bucket: BUCKET,
                    Key: file.Key
                });
                const getRes = await s3Client.send(getCmd);
                if (getRes.Body) {
                    const str = await getRes.Body.transformToString();
                    const json = JSON.parse(str) as CommunityPlaylist;
                    // Inject ID from key if missing
                    if (!json.id) json.id = file.Key.replace(PREFIX, '');
                    playlists.push(json);
                }
            } catch (err) {
                console.error(`Failed to fetch playlist ${file.Key}`, err);
            }
        }));

        return playlists;

    } catch (error) {
        console.error("Error fetching community playlists:", error);
        return [];
    }
}

export async function getCommunityPlaylist(playlistId: string): Promise<CommunityPlaylist | null> {
    try {
        const cleanId = playlistId.endsWith('.json') ? playlistId : `${playlistId}.json`;
        const key = `${PREFIX}${cleanId}`;
        const cmd = new GetObjectCommand({ Bucket: BUCKET, Key: key });
        const res = await s3Client.send(cmd);

        if (res.Body) {
            const str = await res.Body.transformToString();
            const json = JSON.parse(str);
            if (!json.id) json.id = cleanId;
            return json;
        }
        return null;
    } catch (e) {
        return null;
    }
}

export async function deleteCommunityPlaylist(playlistId: string): Promise<boolean> {
    try {
        const cleanId = playlistId.endsWith('.json') ? playlistId : `${playlistId}.json`;
        const key = `${PREFIX}${cleanId}`;
        const cmd = new DeleteObjectCommand({ Bucket: BUCKET, Key: key });
        await s3Client.send(cmd);
        return true;
    } catch (e) {
        console.error("Delete ID error:", e);
        return false;
    }
}

export interface WeeklyChallenge {
    title: string;
    description: string;
    reward: string;
    active: boolean;
    updatedAt: string;
}

export async function saveChallenge(challenge: WeeklyChallenge): Promise<boolean> {
    try {
        const command = new PutObjectCommand({
            Bucket: BUCKET,
            Key: "community/challenge/weekly_active.json",
            Body: JSON.stringify(challenge),
            ContentType: "application/json",
            CacheControl: "no-cache"
        });
        await s3Client.send(command);
        return true;
    } catch (e) {
        console.error(e);
        return false;
    }
}

export async function getActiveChallenge(): Promise<WeeklyChallenge | null> {
    try {
        const command = new GetObjectCommand({
            Bucket: BUCKET,
            Key: "community/challenge/weekly_active.json"
        });
        const res = await s3Client.send(command);
        if (res.Body) {
            const str = await res.Body.transformToString();
            return JSON.parse(str);
        }
    } catch (e: any) {
        return null;
    }
    return null;
}

export async function getPlaylistStats(limit = 1000): Promise<number[]> {
    try {
        const listCmd = new ListObjectsV2Command({
            Bucket: BUCKET,
            Prefix: PREFIX,
            MaxKeys: limit
        });

        const listRes = await s3Client.send(listCmd);

        if (!listRes.Contents) return [];

        // Extract timestamps from filenames: "timestamp-userid-random.json"
        // Also fallback to LastModified if filename parsing fails
        const stats = listRes.Contents.map(file => {
            const filename = file.Key?.replace(PREFIX, '') || '';
            const parts = filename.split('-');
            if (parts.length >= 3) {
                const ts = parseInt(parts[0]);
                if (!isNaN(ts)) return ts;
            }
            return file.LastModified?.getTime() || 0;
        }).filter(ts => ts > 0);

        return stats.sort((a, b) => a - b); // Oldest first
    } catch (error) {
        console.error("Error fetching playlist stats:", error);
        return [];
    }
}
