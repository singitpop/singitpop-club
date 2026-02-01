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
        const s3Response = await (s3Client as any).send(command);

        if (!s3Response.Contents) {
            return NextResponse.json({ tracks: [] });
        }

        // Filter and map S3 objects to unique tracks (prefer WAV)
        const trackMap = new Map<string, any>();

        s3Response.Contents.forEach((item: any) => {
            if (!item.Key) return;
            const isMp3 = item.Key.endsWith('.mp3');
            const isWav = item.Key.endsWith('.wav');

            if (isMp3 || isWav) {
                const filename = item.Key.split('/').pop()!;
                const title = filename.replace(/\.(mp3|wav)$/, '');

                // Filter out numbered duplicates/versions (e.g. "Song-2", "Song 2")
                // User requirement: "remove any tracks that have a number on the end"
                if (/[- ]\d+$/.test(title)) return;

                // If exists, only overwrite if current is MP3 and new is WAV
                if (trackMap.has(title)) {
                    if (isWav && !trackMap.get(title).isWav) {
                        trackMap.set(title, { item, isWav: true, title });
                    }
                } else {
                    trackMap.set(title, { item, isWav, title });
                }
            }
        });

        const tracks = await Promise.all(Array.from(trackMap.values())
            .map(async (entry: any, index: number) => {
                const { item, isWav, title } = entry;
                const key = item.Key!;

                // Generate Signed URLs
                const [signedUrl, downloadUrl] = await Promise.all([
                    getSignedFileUrl(key, 3600, false),
                    getSignedFileUrl(key, 3600, true)
                ]);

                return {
                    id: index + 1,
                    title: title,
                    duration: '0:00', // Will be updated by metadata script later
                    plays: '100K',
                    locked: false,
                    price: 0.99,
                    genre: 'Pop',
                    audioUrl: signedUrl,
                    highResUrl: isWav ? signedUrl : '',
                    mp3DownloadUrl: !isWav ? downloadUrl : '',
                    downloadUrl: downloadUrl
                };
            }));

        return NextResponse.json({ tracks });
    } catch (error) {
        console.error("Error fetching tracks from S3:", error);
        return NextResponse.json({ error: "Failed to fetch tracks" }, { status: 500 });
    }
}
