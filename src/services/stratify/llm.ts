
import { GoogleGenerativeAI } from "@google/generative-ai";

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY || "");
const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

export const LLMProvider = {
    generateJSON: async <T>(prompt: string): Promise<T> => {
        try {
            const result = await model.generateContent(prompt + "\n\nCRITICAL: Output strictly valid JSON.");
            const response = await result.response;
            const text = response.text();

            // Clean markdown code blocks if present
            const jsonStr = text.replace(/```json/g, '').replace(/```/g, '').trim();

            return JSON.parse(jsonStr) as T;
        } catch (error) {
            console.error("LLM Generation Failed:", error);
            throw new Error("Failed to generate valid JSON content.");
        }
    }
};
