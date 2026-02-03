import { NextResponse } from 'next/server';
import { S3Client, PutObjectCommand, GetObjectCommand } from "@aws-sdk/client-s3";

// Initialize S3 Client
const s3Client = new S3Client({
    region: process.env.AWS_REGION || "eu-north-1",
    credentials: {
        accessKeyId: process.env.AWS_ACCESS_KEY_ID || "",
        secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY || "",
    },
});

const BUCKET_NAME = "singitpop-music";
const FILE_KEY = "data/club-content.json";

// Types matching the frontend needs
interface VipUpdate {
    id: string;
    title: string;
    content: string;
    date: string;
    author: string;
    image?: string;
    likes?: number;
}

interface ExclusiveAlbum {
    id: string;
    title: string;
    artist: string;
    year: number;
    genre: string[];
    coverArt: string;
    tracks: { id: number; title: string; duration: string }[];
    exclusive: boolean;
}

interface ClubContentData {
    updates: VipUpdate[];
    albums: ExclusiveAlbum[];
}

const INITIAL_DATA: ClubContentData = {
    updates: [],
    albums: []
};

// GET: Fetch all club content
export async function GET() {
    try {
        const command = new GetObjectCommand({
            Bucket: BUCKET_NAME,
            Key: FILE_KEY,
        });

        try {
            const response = await s3Client.send(command);
            const str = await response.Body?.transformToString();
            const data = JSON.parse(str || "{}");
            // Ensure structure matches
            return NextResponse.json({
                updates: data.updates || [],
                albums: data.albums || []
            });
        } catch (error: any) {
            if (error.name === 'NoSuchKey') {
                return NextResponse.json(INITIAL_DATA);
            }
            throw error;
        }
    } catch (error) {
        console.error("Error fetching club content:", error);
        return NextResponse.json({ error: "Failed to fetch content" }, { status: 500 });
    }
}

// POST: Save all club content
export async function POST(req: Request) {
    try {
        const data = await req.json();

        const command = new PutObjectCommand({
            Bucket: BUCKET_NAME,
            Key: FILE_KEY,
            Body: JSON.stringify(data, null, 2),
            ContentType: "application/json",
            CacheControl: "no-cache"
        });

        await s3Client.send(command);
        return NextResponse.json({ success: true });
    } catch (error) {
        console.error("Error saving club content:", error);
        return NextResponse.json({ error: "Failed to save content" }, { status: 500 });
    }
}
