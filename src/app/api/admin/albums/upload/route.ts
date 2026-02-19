
import { NextRequest, NextResponse } from 'next/server';
import { S3Client, PutObjectCommand } from "@aws-sdk/client-s3";
import fs from 'fs';
import path from 'path';
import { Album, Track } from '@/data/albumData'; // Import types

// Initialize S3 Client
const s3Client = new S3Client({
    region: process.env.AWS_REGION || "eu-north-1",
    credentials: {
        accessKeyId: process.env.AWS_ACCESS_KEY_ID || "",
        secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY || "",
    },
});

const S3_BUCKET = process.env.AWS_S3_BUCKET || "singitpop-music";
const ALBUMS_JSON_PATH = path.join(process.cwd(), 'src/data/albums.json');

export async function POST(req: NextRequest) {
    try {
        const formData = await req.formData();
        const title = formData.get('title') as string;
        const year = parseInt(formData.get('year') as string);
        const genre = formData.get('genre') as string;
        const releaseDate = formData.get('releaseDate') as string;
        const coverArtFile = formData.get('coverArt') as File;

        // 1. Basic Validation
        if (!title || !year || !genre || !releaseDate || !coverArtFile) {
            return NextResponse.json({ error: "Missing required fields" }, { status: 400 });
        }

        const albumSlug = title.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');
        console.log(`🎵 Processing Upload: ${title} (${albumSlug})`);

        // 2. Upload Cover Art to S3
        const coverArtBuffer = Buffer.from(await coverArtFile.arrayBuffer());
        const coverArtKey = `albums/artwork/${albumSlug}.jpg`; // Standardization: always save as jpg for now or keep original ext

        await s3Client.send(new PutObjectCommand({
            Bucket: S3_BUCKET,
            Key: coverArtKey,
            Body: coverArtBuffer,
            ContentType: coverArtFile.type
        }));
        console.log(`✅ Cover Art Uploaded: ${coverArtKey}`);

        // 3. Process Tracks
        const tracks: Track[] = [];
        let trackIndex = 0;

        // Iterate through formData entries to find tracks
        // Frontend should send tracks as `track_0_title`, `track_0_file`, `track_1_title`, etc.
        const entries = Array.from(formData.entries());
        const trackCount = entries.filter(e => e[0].startsWith('track_') && e[0].endsWith('_title')).length;

        for (let i = 0; i < trackCount; i++) {
            const trackTitle = formData.get(`track_${i}_title`) as string;
            const trackFile = formData.get(`track_${i}_file`) as File;
            const isSingle = formData.get(`track_${i}_isSingle`) === 'true';

            if (trackTitle && trackFile) {
                const trackSlug = trackTitle.toLowerCase().replace(/[^a-z0-9]+/g, '-');
                // Standardize filename: 01-track-title.mp3
                const trackNum = (i + 1).toString().padStart(2, '0');
                const fileName = `${trackNum}-${trackSlug}${path.extname(trackFile.name)}`;
                const s3Key = `albums/${albumSlug}/${fileName}`;

                // Upload Track
                const fileBuffer = Buffer.from(await trackFile.arrayBuffer());
                await s3Client.send(new PutObjectCommand({
                    Bucket: S3_BUCKET,
                    Key: s3Key,
                    Body: fileBuffer,
                    ContentType: trackFile.type
                }));

                // Add to Track List
                tracks.push({
                    id: i + 1,
                    title: trackTitle,
                    duration: "3:30", // Placeholder - could use music-metadata on server if needed
                    plays: "0",
                    locked: false,
                    price: 0.99,
                    genre: genre,
                    audioUrl: `https://${S3_BUCKET}.s3.${process.env.AWS_REGION || "eu-north-1"}.amazonaws.com/${s3Key}`,
                    albumId: albumSlug,
                    sourceFolder: albumSlug, // Logical folder name
                    isSingle: isSingle
                });
                console.log(`   ✅ Track Uploaded: ${s3Key}`);
            }
        }

        // 4. Update albums.json
        let albumsData: Album[] = [];
        if (fs.existsSync(ALBUMS_JSON_PATH)) {
            const fileContent = fs.readFileSync(ALBUMS_JSON_PATH, 'utf-8');
            albumsData = JSON.parse(fileContent);
        }

        const newAlbum: Album = {
            id: albumSlug,
            title: title,
            year: year,
            genre: [genre],
            coverArt: `/albums/artwork/${albumSlug}.jpg`, // Local path style for frontend
            tracks: tracks,
            releaseDate: releaseDate,
            folderPath: albumSlug,
            mp3Count: tracks.length,
            type: 'standard', // Default
            trending: false
        };

        // Remove existing if overwriting
        albumsData = albumsData.filter(a => a.id !== newAlbum.id);
        albumsData.push(newAlbum);

        // Sort by Release Date (Newest First)
        albumsData.sort((a, b) => new Date(b.releaseDate).getTime() - new Date(a.releaseDate).getTime());

        fs.writeFileSync(ALBUMS_JSON_PATH, JSON.stringify(albumsData, null, 2));
        console.log(`💾 albums.json updated`);

        return NextResponse.json({ success: true, album: newAlbum });

    } catch (error: any) {
        console.error("❌ Upload Failed:", error);
        return NextResponse.json({ error: error.message || "Upload failed" }, { status: 500 });
    }
}
