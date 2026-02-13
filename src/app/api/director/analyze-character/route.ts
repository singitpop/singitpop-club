
import { NextRequest, NextResponse } from "next/server";
import { GoogleGenerativeAI } from "@google/generative-ai";

// Increase body size limit for image uploads (10MB)
export const config = {
    api: {
        bodyParser: {
            sizeLimit: '10mb',
        },
    },
};

export async function POST(req: NextRequest) {
    if (!process.env.GEMINI_API_KEY) {
        return NextResponse.json({ error: "No Gemini API Key" }, { status: 500 });
    }

    try {
        console.log("Analyzing Character: Start");
        const formData = await req.formData();
        const file = formData.get("image") as File;

        if (!file) {
            console.error("No file found in formData");
            return NextResponse.json({ error: "No image provided" }, { status: 400 });
        }

        console.log(`File received: ${file.name} (${file.size} bytes, ${file.type})`);

        const buffer = Buffer.from(await file.arrayBuffer());
        const base64Image = buffer.toString("base64");

        const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
        const model = genAI.getGenerativeModel({ model: "gemini-2.0-flash-001" });

        const prompt = `Analyze this image and extract character visual details.

RESPOND WITH ONLY THIS JSON FORMAT - NO OTHER TEXT:

{
    "face": "description of face, hair, facial features",
    "wardrobe": "description of clothing, accessories, style",
    "vibe": "aesthetic vibe in 3-5 keywords"
}

EXAMPLE VALID RESPONSE:
{"face":"Young man, short dark hair, light beard, warm brown eyes","wardrobe":"Olive green jacket over beige tank top, white pants, gold chain necklace, bracelet","vibe":"Urban sophisticated, sunset rooftop, modern R&B aesthetic"}

DO NOT include any text before or after the JSON. Start with { and end with }.`;

        console.log("Calling Gemini...");
        const result = await model.generateContent([
            prompt,
            {
                inlineData: {
                    data: base64Image,
                    mimeType: file.type || 'image/jpeg'
                }
            }
        ]);

        const responseText = result.response.text();
        console.log("Gemini Response (raw):", responseText);

        // More robust JSON extraction
        let jsonStr = responseText.trim();

        // Remove markdown code blocks if present
        jsonStr = jsonStr.replace(/```json\s*/g, '').replace(/```\s*/g, '');

        // Try to find JSON object in the response
        const jsonMatch = jsonStr.match(/\{[\s\S]*\}/);
        if (!jsonMatch) {
            console.error("Failed to extract JSON. Full response:", responseText);
            throw new Error(`No valid JSON found. Gemini returned: ${responseText.substring(0, 200)}`);
        }

        jsonStr = jsonMatch[0];
        console.log("Extracted JSON:", jsonStr);

        const data = JSON.parse(jsonStr);

        // Validate required fields
        if (!data.face || !data.wardrobe || !data.vibe) {
            throw new Error("Missing required fields in response");
        }

        return NextResponse.json(data);

    } catch (error: any) {
        console.error("Character Analysis Failed:", error);
        return NextResponse.json({ error: error.message || "Unknown Error" }, { status: 500 });
    }
}
