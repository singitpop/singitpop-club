import { NextResponse } from 'next/server';
import { S3Client, PutObjectCommand, GetObjectCommand } from "@aws-sdk/client-s3";
import { getSignedUrl } from "@aws-sdk/s3-request-presigner";
import { Readable } from 'stream';

// Initialize S3 Client
const s3Client = new S3Client({
    region: process.env.AWS_REGION || "eu-north-1",
    credentials: {
        accessKeyId: process.env.AWS_ACCESS_KEY_ID || "",
        secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY || "",
    },
});

const BUCKET_NAME = "singitpop-music"; // Using your music bucket
const FILE_KEY = "data/projects.json";

// Initial seed data if file doesn't exist
const INITIAL_DATA = [
    {
        id: "1",
        type: "album",
        title: "Velvet Frequency",
        description: "Upcoming EP featuring electronic soundscapes and intimate vocals",
        status: "in_progress",
        progress: 82,
        releaseDate: "2026-04-01",
        createdAt: "2025-12-01"
    },
    {
        id: "2",
        type: "video",
        title: "You Are My Valentine",
        description: "Romantic AI-generated music video",
        status: "in_progress",
        progress: 60,
        releaseDate: "2026-02-14",
        createdAt: "2026-01-20"
    },
    {
        id: "3",
        type: "album",
        title: "Summer Vibes 2026",
        description: "Upbeat tracks for the sunny season",
        status: "planned",
        progress: 0,
        releaseDate: "2026-06-01",
        createdAt: "2026-02-01"
    }
];

export async function GET() {
    try {
        const command = new GetObjectCommand({
            Bucket: BUCKET_NAME,
            Key: FILE_KEY,
        });

        try {
            const response = await s3Client.send(command);
            const str = await response.Body?.transformToString();
            const data = JSON.parse(str || "[]");
            return NextResponse.json(data);
        } catch (error: any) {
            // If file not found, return initial data (and optionally create it)
            if (error.name === 'NoSuchKey') {
                console.log("Projects file not found, returning initial data");
                return NextResponse.json(INITIAL_DATA);
            }
            throw error;
        }
    } catch (error) {
        console.error("Error fetching projects:", error);
        return NextResponse.json({ error: "Failed to fetch projects" }, { status: 500 });
    }
}

export async function POST(req: Request) {
    try {
        const projects = await req.json();

        const command = new PutObjectCommand({
            Bucket: BUCKET_NAME,
            Key: FILE_KEY,
            Body: JSON.stringify(projects, null, 2),
            ContentType: "application/json",
            CacheControl: "no-cache"
        });

        await s3Client.send(command);

        return NextResponse.json({ success: true });
    } catch (error) {
        console.error("Error saving projects:", error);
        return NextResponse.json({ error: "Failed to save projects" }, { status: 500 });
    }
}
