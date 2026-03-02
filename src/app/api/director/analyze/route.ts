
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

        // 3. Determine if Director has a specific vision locked in
        const directorNotes = project.directorProfile?.notes?.trim() || '';
        const hasDirectorVision = directorNotes.length > 50; // Meaningful notes, not just a word

        // 4. Construct Prompt (Multimodal or Text)
        const promptText = `
        You are a Collective Intelligence of the World's Top Music Video Directors (Fincher, Gondry, Jonze, Hiro Murai, Hype Williams).
        You are decisive, visionary, and exact. You do not invent generic concepts. You EXECUTE the director's vision.

        ${hasDirectorVision ? `
        ╔══════════════════════════════════════════════════════════╗
        ║  🔴 DIRECTOR'S VISION — LOCKED CREATIVE MANDATE 🔴       ║
        ╚══════════════════════════════════════════════════════════╝
        
        The director has provided a SPECIFIC, DETAILED CREATIVE BRIEF. This is NOT a suggestion — it is a LOCKED mandate.
        You MUST base ALL 3 treatments on this visual world. Do NOT deviate into generic concepts.
        
        DIRECTOR'S BRIEF:
        "${directorNotes}"
        
        TREATMENT RULES WHEN DIRECTOR VISION IS SET:
        - Treatment 1 (id: "t1"): DIRECT, FAITHFUL interpretation of exactly what the director described.
          Execute it precisely as written — same setting, same visual language, same camera logic.
        - Treatment 2 (id: "t2"): BOLD VARIATION within the same visual world. Same tone and aesthetics, 
          but push one element further (e.g. earlier in the same scene, a different emotional beat).
        - Treatment 3 (id: "t3"): UNEXPECTED ANGLE on the same concept — what if the same visual world 
          was filmed from a completely different perspective or time? Stay within the established aesthetics.
        
        ⛔ FORBIDDEN: Do NOT generate treatments about flowers, seasons, digital landscapes, 
        abstract algorithms, or any concept not present in the Director's Brief above.
        ` : `
        ╔══════════════════════════════════════════════════════════╗
        ║  OPEN BRIEF — DERIVE VISION FROM LYRICS & AUDIO          ║
        ╚══════════════════════════════════════════════════════════╝
        
        No specific director vision has been set. You must derive the visual world STRICTLY from the lyrics and audio.
        
        ⛔ FORBIDDEN CLICHÉS (Never use these unless lyrics explicitly demand them):
        - Generic "flowers blooming" or "seasons changing" imagery
        - Clichéd "neon city streets at night" 
        - Abstract "digital landscape" or "algorithm" concepts
        - Generic "time-lapse" nature footage
        - "Black and white flashbacks"
        - "Running through fields"
        
        You MUST find something SPECIFIC to this song's world. What does THIS song smell like? Sound like to touch?
        `}

        ## PROJECT DETAILS
        - **Song Title:** "${song.title}"
        - **Artist:** "${song.artist || 'Unknown'}"
        - **Genre:** "${song.genre || 'Unknown'}"
        - **BPM:** ${song.bpm || 'Unknown'}
        - **Director Style Preference:** ${project.directorProfile?.narrativePreference || 'Hybrid'}
        - **Lead Artist Look:** ${project.cast?.lead?.lookSpec?.style || 'Not specified'}
        - **Lyrics:** 
        "${song.lyrics?.rawText || 'No lyrics provided.'}"

        ## YOUR TASK
        ${filePart ? "Analyze the attached audio file AND the project details above." : "Analyze the project details above."}
        
        1. IDENTIFY 5 CORE THEMES strictly from the LYRICS and the Director's Brief (if set).
        2. DESIGN 3 DISTINCT VIDEO TREATMENTS following the rules above.
        3. FOR EACH TREATMENT, design 3-4 KEY LOCATIONS. For each location define:
           - blocking: Specific actor movement (e.g. "He steps forward, crossing the invisible frame boundary").
           - extras: Background action (e.g. "Empty rooftop. Wind only.").
           - artDirection: Set & Props (e.g. "Minimalist square canopy, flowing white linen curtains").
           - audioEnvironment: Soundscape (e.g. "City ambience at golden hour, soft wind").
           - lighting: Lighting style (e.g. "Warm amber backlight, soft rim glow").
           - colorPalette: 60-30-10 Rule (e.g. "60% Beige/Cream, 30% Sage Green, 10% Gold").
           - cameraVibe: Camera movement (e.g. "Ultra-slow push-in, 35mm to 50mm lens transition").
           - timeOfDay: (dawn/day/dusk/night).
           - weather: (clear/cloudy/rain/storm/fog).
        4. CALIBRATE the influence dials to match the visual language of your chosen treatments.

        Return ONLY a valid JSON object with this exact structure (no markdown, no explanation):
        {
            "coreThemes": ["Theme 1", "Theme 2", "Theme 3", "Theme 4", "Theme 5"],
            "treatments": [
                {
                    "id": "t1",
                    "title": "Specific, Evocative Title (not generic)",
                    "summary": "2-3 sentence visual pitch. Be specific about imagery, not abstract.",
                    "locations": [
                        {
                            "locationId": "l1",
                            "name": "Location Name",
                            "description": "Brief specific desc.",
                            "timeOfDay": "dusk",
                            "weather": "clear",
                            "blocking": "...",
                            "extras": "...",
                            "artDirection": "...",
                            "audioEnvironment": "...",
                            "lighting": "...",
                            "colorPalette": "...",
                            "cameraVibe": "..."
                        }
                    ]
                }
            ],
            "dials": {
                "blockingPrecision": 80,
                "motivatedCamera": 90,
                "wonderAndScale": 70,
                "intimateEmotion": 60,
                "rhythmicMontage": 50,
                "naturalism": 40,
                "stylizedSymmetry": 30,
                "highContrastMood": 90,
                "longTakeConfidence": 20,
                "iconicHeroFrames": 80
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
