import { NextResponse } from 'next/server';
import { S3Client, ListObjectsV2Command } from "@aws-sdk/client-s3";
import { getSignedFileUrl } from '@/lib/s3';

const S3_BUCKET = process.env.AWS_S3_BUCKET || "singitpop-music";
const AWS_REGION = "eu-north-1"; // Hardcoded config for now

const s3Client = new S3Client({
    region: AWS_REGION,
    credentials: {
        accessKeyId: process.env.AWS_ACCESS_KEY_ID as string,
        secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY as string,
    },
});

export async function GET() {
    try {
        // List objects from S3
        const command = new ListObjectsV2Command({
            Bucket: S3_BUCKET,
            Prefix: "albums/",
        });
        const s3Response = await s3Client.send(command);

        if (!s3Response.Contents) {
            return NextResponse.json({ tracks: [] });
        }

        // Filter and map S3 objects to tracks
        const tracks = await Promise.all(s3Response.Contents
            .filter(item => item.Key && (item.Key.endsWith('.mp3') || item.Key.endsWith('.wav')))
            .map(async (item, index) => {
                const key = item.Key!;
                const filename = key.split('/').pop()!;
                const title = filename.replace(/\.(mp3|wav)$/, '');

                // Determine format
                const isWav = key.endsWith('.wav');

                // Generate Signed URLs
                // For now, we use the same key for audioUrl. 
                // In a real app we'd map MP3 vs WAV versions. 
                // Here we just serve what we found.
                const [signedUrl, downloadUrl] = await Promise.all([
                    getSignedFileUrl(key, 3600, false),
                    getSignedFileUrl(key, 3600, true)
                ]);

                return {
                    id: index + 1,
                    title: title,
                    duration: '0:00', // S3 doesn't give duration metadata
                    plays: '100K',    // Placeholder
                    locked: false, // Unlock all tracks for verified playback
                    price: 0.99,
                    genre: 'Pop',     // Placeholder
                    audioUrl: signedUrl,
                    highResUrl: isWav ? signedUrl : '', // If it's WAV, treat as highRes
                    mp3DownloadUrl: !isWav ? downloadUrl : '',
                    // Use format specific download if available, otherwise fallback
                    downloadUrl: downloadUrl
                };
            }));

        return NextResponse.json({ tracks });
    } catch (error) {
        console.error("Error fetching tracks from S3:", error);
        return NextResponse.json({ error: "Failed to fetch tracks" }, { status: 500 });
    }
}
