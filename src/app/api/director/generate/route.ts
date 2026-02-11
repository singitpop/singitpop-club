import { GoogleGenerativeAI, HarmCategory, HarmBlockThreshold } from "@google/generative-ai";
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

    const model = genAI.getGenerativeModel({
      model: "gemini-2.0-flash",
      safetySettings: [
        { category: HarmCategory.HARM_CATEGORY_HARASSMENT, threshold: HarmBlockThreshold.BLOCK_ONLY_HIGH },
        { category: HarmCategory.HARM_CATEGORY_HATE_SPEECH, threshold: HarmBlockThreshold.BLOCK_ONLY_HIGH },
        { category: HarmCategory.HARM_CATEGORY_SEXUALLY_EXPLICIT, threshold: HarmBlockThreshold.BLOCK_ONLY_HIGH },
        { category: HarmCategory.HARM_CATEGORY_DANGEROUS_CONTENT, threshold: HarmBlockThreshold.BLOCK_ONLY_HIGH },
      ]
    });

    const prompt = `
      You are a visionary film director (like Christopher Nolan or Wes Anderson). 
      Analyse the song and create a stunning, cinematic music video shot list.

      Song: "${songTitle}" by ${artistName}
      Lyrics:
      "${lyrics}"
      
      Cast:
      Lead: ${cast.lead.name} (${cast.lead.lookSpec?.style || 'Realistic'})
      
      Task:
      1. Break the song into logical SCENES (e.g. Intro, Verse 1, Chorus).
      2. For EACH Scene, create a sequence of SHOTS that visualize the lyrics.
      3. BE SPECIFIC. No generic "singing". Describe the lighting, the lens, the camera move, and the specific action.
      4. Use the specific lyrics provided to time the shots.

      Output MUST be valid JSON with this structure:
      {
        "scenes": [
          {
            "title": "Scene Title (e.g. Verse 1)",
            "location": "Detailed location name",
            "mood": "Emotional vibe",
            "lighting": "Lighting style (e.g. Neon Noir)",
            "shots": [
              {
                "shotType": "WS / MS / CU", 
                "camera": "Camera move (e.g. Tracking Lateral)",
                "action": "Detailed action description...", 
                "timing": "Lyrics line this shot covers"
              }
            ]
          }
        ]
      }
      
      Do not include markdown formatting like \`\`\`json. Just the raw JSON.
    `;

    const result = await model.generateContent(prompt);
    const response = await result.response;
    const text = response.text();

    // Clean up potential markdown code blocks
    const cleanJson = text.replace(/```json/g, "").replace(/```/g, "").trim();

    const data = JSON.parse(cleanJson);

    return NextResponse.json(data);
  } catch (error: any) {
    console.error("AI Director Error:", error);
    return NextResponse.json(
      { error: "Failed to generate scenes", details: error.message || String(error) },
      { status: 500 }
    );
  }
}
