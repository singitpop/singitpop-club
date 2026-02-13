
import { NextRequest, NextResponse } from "next/server";
import { GoogleGenerativeAI } from "@google/generative-ai";
import { GoogleAIFileManager } from "@google/generative-ai/server";
import { InfluenceDials } from "@/types/stratify";
import { albums } from "@/data/albumData";
import { s3Client } from "@/lib/s3";
import { GetObjectCommand } from "@aws-sdk/client-s3";
import { writeFile, unlink } from "fs/promises";
import path from "path";
import os from "os";
import { Readable } from "stream";

// Helper to save stream to temp file (Gemini FileManager needs a file path)
async function streamToTempFile(stream: Readable, suffix: string): Promise<string> {
    const tempPath = path.join(os.tmpdir(), `director_audio_${Date.now()}${suffix}`);
    const chunks: Buffer[] = [];

    for await (const chunk of stream) {
        chunks.push(Buffer.from(chunk));
    }

    await writeFile(tempPath, Buffer.concat(chunks));
    return tempPath;
}

export async function POST(req: NextRequest) {
    if (!process.env.GEMINI_API_KEY) {
        return NextResponse.json({ error: "No Gemini API Key" }, { status: 500 });
    }

    try {
        const body = await req.json();
        const { song, project } = body;

        // 1. Setup Gemini
        const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY!);
        const fileManager = new GoogleAIFileManager(process.env.GEMINI_API_KEY!);
        const model = genAI.getGenerativeModel({ model: "gemini-2.0-flash-exp" });

        // 2. Lookup Audio File from Trusted Data (albumData.ts)
        let audioUri: string | null = null;
        let tempFilePath: string | null = null;
        let filePart = null;

        console.log(`[Director Analysis] Looking up track: "${song.title}"`);

        // Helper to normalize strings for comparison
        const normalize = (s: string) => s.toLowerCase().replace(/[^a-z0-9]/g, '');
        const targetTitle = normalize(song.title);

        // Find track in albumData
        const allTracks = albums.flatMap(a => a.tracks);
        const foundTrack = allTracks.find(t => normalize(t.title) === targetTitle);

        if (foundTrack && foundTrack.audioUrl) {
            console.log(`[Director Analysis] Found Track: ${foundTrack.title}`);
            console.log(`[Director Analysis] MP3 URL: ${foundTrack.audioUrl}`);

            try {
                // Parse Bucket and Key from URL
                // Format: https://[bucket].s3.[region].amazonaws.com/[key]
                const url = new URL(foundTrack.audioUrl);
                let bucket = process.env.AWS_S3_BUCKET || "singitpop-music";
                let key = "";

                if (url.hostname.startsWith("s3.") || url.hostname.includes(".s3.")) {
                    // Virtual-hosted style logic from s3.ts ... or just simple split for this specific URL format
                    // The URLs in albumData are consistent: https://bucket.s3.region.amazonaws.com/albums/...
                    // So pathname is /albums/...
                    key = url.pathname.substring(1); // Remove leading slash
                } else {
                    // Path style
                    const parts = url.pathname.split('/').filter(Boolean);
                    // bucket = parts[0]; 
                    key = parts.slice(1).join('/');
                }

                key = decodeURIComponent(key);
                console.log(`[Director Analysis] Fetching S3 Key: ${key}`);

                const s3Cmd = new GetObjectCommand({ Bucket: bucket, Key: key });
                const s3Res = await s3Client.send(s3Cmd);

                if (s3Res.Body) {
                    console.log("[Director Analysis] Audio Stream Open. Downloading to Temp...");
                    const suffix = ".mp3";
                    tempFilePath = await streamToTempFile(s3Res.Body as Readable, suffix);

                    console.log("[Director Analysis] Uploading to Gemini...");
                    const uploadResult = await fileManager.uploadFile(tempFilePath, {
                        mimeType: "audio/mp3",
                        displayName: song.title,
                    });

                    audioUri = uploadResult.file.uri;
                    console.log(`[Director Analysis] Gemini File Ready: ${audioUri}`);

                    filePart = {
                        fileData: {
                            mimeType: uploadResult.file.mimeType,
                            fileUri: audioUri
                        }
                    };
                }

            } catch (err) {
                console.error("[Director Analysis] Audio Fetch Error:", err);
            }
        } else {
            console.warn(`[Director Analysis] Track not found in albumData or missing audioUrl.`);
        }

        // 3. Construct Prompt (Multimodal or Text)
        const promptText = `
        Act as a World-Class Music Video Director.
        Analyze the ${filePart ? "attached audio file AND" : ""} details below.
        Determine the 10 Cinematic Influence Dials (0-100) that best suit the vibe, genre, ${filePart ? "AUDIO CHARACTERISTICS (Tempo, Timbre, Energy)," : ""} and lyrics.
        
        Song: "${song.title}" by ${song.artist}
        Genre: ${song.genre}
        Lyrics Snippet: "${song.lyrics.rawText?.substring(0, 300)}..."
        Director's Note: ${project?.summary || "No specific notes."}

        Return ONLY a JSON object with this exact structure (no markdown):
        {
            "blockingPrecision": number,
            "motivatedCamera": number,
            "wonderAndScale": number,
            "intimateEmotion": number,
            "rhythmicMontage": number,
            "naturalism": number,
            "stylizedSymmetry": number,
            "highContrastMood": number,
            "longTakeConfidence": number,
            "iconicHeroFrames": number
        }
        `;

        const parts: any[] = [promptText];
        if (filePart) parts.push(filePart);

        const result = await model.generateContent(parts);
        const responseText = result.response.text().replace(/```json/g, '').replace(/```/g, '').trim();
        const dials = JSON.parse(responseText) as InfluenceDials;

        // Cleanup
        if (tempFilePath) {
            await unlink(tempFilePath).catch(err => console.error("Temp cleanup failed", err));
        }

        return NextResponse.json(dials);

    } catch (error: any) {
        console.error("Director Analysis Failed:", error);
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}
