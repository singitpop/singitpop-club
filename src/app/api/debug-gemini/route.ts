import { GoogleGenerativeAI } from "@google/generative-ai";
import { NextResponse } from "next/server";

export const dynamic = 'force-dynamic';

export async function GET() {
    const key = process.env.GEMINI_API_KEY;
    if (!key) return NextResponse.json({ error: "No API Key found in Environment" }, { status: 500 });

    // Mask key for safety in response
    const maskedKey = key.substring(0, 5) + "..." + key.substring(key.length - 5);

    try {
        const genAI = new GoogleGenerativeAI(key);
        const model = genAI.getGenerativeModel({ model: "gemini-2.0-flash" });

        const result = await model.generateContent("Say 'Gemini is working' if you can hear me.");
        const response = await result.response;
        const text = response.text();

        return NextResponse.json({
            status: "Success",
            keyUsed: maskedKey,
            model: "gemini-2.0-flash",
            output: text
        });
    } catch (error: any) {
        return NextResponse.json({
            status: "Error",
            keyUsed: maskedKey,
            message: error.message,
            name: error.name,
            stack: error.stack
        }, { status: 500 });
    }
}
