
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
        const model = genAI.getGenerativeModel({ model: "gemini-2.0-flash" });

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
        Act as a World-Class Music Video Director (A24 / Hype Williams style).
        Analyze the ${filePart ? "attached audio file AND" : ""} details below.

        1. IDENTIFY 5 CORE THEMES: Abstract, emotional, or narrative themes hidden in the lyrics.
        2. GENERATE           FOR EACH LOCATION, YOU MUST DEFINE THE "MISE-EN-SCÈNE" (The Total Visual World):
           1. ART DIRECTION (Set & Props): Detailed physical environment. (e.g. "Vintage microphone, Fog machine, Broken mirror").
           2. LIGHTING & COLOR: Specific film lighting style AND the 60-30-10 COLOR RULE (e.g. "60% Deep Navy, 30% Neon Pink, 10% White").
           3. BLOCKING (Actor Staging): Where they move, how they interact with the space.
           4. EXTRAS / ATMOSPHERE: Background action (e.g. "Crowd of 50 people", "Solitary figure") and SOUNDSCAPE (audioEnvironment).
           5. CAMERA VIBE: Specific movement (e.g. "Slow Dolly In", "Handheld Tracking").

           Fill these JSON fields:
           - lighting: ...
           - colorPalette: ...
           - cameraVibe: ...
           - artDirection: ...
           - extras: ...
           - blocking: ...
           - audioEnvironment: ...
           - timeOfDay: ...
           - weather: ...erformance-focused approach.
        3. SET 10 INFLUENCE DIALS (0-100): Based on the song's energy and the themes.
        
        STRICT CONSTRAINT: The Lead Artist IS the protagonist. Usage of "he/him" or "she/her" MUST match the artist's gender presentation.
        
        Song: "${song.title}" by ${song.artist}
        Genre: ${song.genre}
        Lyrics Snippet: "${song.lyrics.rawText?.substring(0, 1000)}..."
        
        CAST / LOOK:
        Lead Artist: ${project?.cast?.lead?.name || "The Artist"}
        Gender Presentation: ${project?.cast?.lead?.genderPresentation || "Not specified"}
        Age/Look: ${project?.cast?.lead?.ageRange || "Not specified"}
        Wardrobe/Vibe: ${project?.cast?.lead?.wardrobeSignature?.join(", ") || "Not specified"}
        Visual Analysis (Face/Style): ${project?.cast?.lead?.extractedVisuals ? JSON.stringify(project.cast.lead.extractedVisuals) : "N/A"}

        Director's Note: ${project?.project?.summary || "No specific notes."}

        Return ONLY a JSON object with this exact structure (no markdown):
        {
            "coreThemes": ["Theme 1", "Theme 2", "Theme 3", "Theme 4", "Theme 5"],
            "treatments": [
                { "id": "t1", "title": "Concept Title", "summary": "2-sentence visual pitch." },
                { "id": "t2", "title": "Concept Title", "summary": "2-sentence visual pitch." },
                { "id": "t3", "title": "Concept Title", "summary": "2-sentence visual pitch." }
            ],
            "dials": {
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
        }
        `;

        const parts: any[] = [promptText];
        if (filePart) parts.push(filePart);

        const result = await model.generateContent(parts);
        const responseText = result.response.text().replace(/```json/g, '').replace(/```/g, '').trim();
        const data = JSON.parse(responseText);

        // Transform to expected frontend format (flattening if needed, but we'll return the whole object)
        // Frontend expects just dials by default, but we'll send the enhanced object.
        // We'll let the frontend destructure it.

        // Cleanup
        if (tempFilePath) {
            await unlink(tempFilePath).catch(err => console.error("Temp cleanup failed", err));
        }

        return NextResponse.json(data);

    } catch (error: any) {
        console.error("Director Analysis Failed:", error);
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}
