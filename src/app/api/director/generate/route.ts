import { GoogleGenerativeAI } from "@google/generative-ai";
import { NextResponse } from "next/server";

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY || "");

export async function POST(req: Request) {
    try {
        const { lyrics, songTitle, artistName, cast } = await req.json();

        if (!process.env.GEMINI_API_KEY) {
            return NextResponse.json(
                { error: "Gemini API Key not configured" },
                { status: 500 }
            );
        }

        const model = genAI.getGenerativeModel({ model: "gemini-pro" });

        const prompt = `
      You are a visionary film director known for cinematic, emotionally resonant music videos.
      
      Song: "${songTitle}" by ${artistName}
      
      Lyrics:
      "${lyrics}"
      
      Cast:
      Lead: ${cast.lead.name} (${cast.lead.lookSpec?.style || 'Realistic'})
      
      Task:
      Direct a music video scene-by-scene. 
      For each distinct section of the song (Intro, Verse, Chorus, etc.), create a VIVID, CINEMATIC scene description.
      
      Output MUST be valid JSON with this structure:
      {
        "scenes": [
          {
            "title": "Scene Title",
            "location": "Detailed location name",
            "lighting": "Lighting style (e.g. Neon Noir, Golden Hour)",
            "camera": "Camera movement (e.g. Tracking Shot, Handheld)",
            "action": "Full paragraph description of the action. Be poetic, visual, and specific. Include metaphors from the lyrics.",
            "mood": "Emotional vibe"
          }
        ]
      }
      
      Do not include markdown formatting like \`\`\`json. Just the raw JSON.
    `;

        const result = await model.generateContent(prompt);
        const response = await result.response;
        const text = response.text();

        // Clean up potential markdown code blocks if the model ignores instruction
        const cleanJson = text.replace(/```json/g, "").replace(/```/g, "").trim();

        const data = JSON.parse(cleanJson);

        return NextResponse.json(data);
    } catch (error) {
        console.error("AI Director Error:", error);
        return NextResponse.json(
            { error: "Failed to generate specific scenes" },
            { status: 500 }
        );
    }
}
