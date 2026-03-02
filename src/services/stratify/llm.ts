
import { GoogleGenerativeAI } from "@google/generative-ai";

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY || "");
const model = genAI.getGenerativeModel({
    model: "gemini-2.5-pro-exp-03-25",
    generationConfig: {
        temperature: 0.7,
        maxOutputTokens: 8192,
    }
});

export const LLMProvider = {
    generateJSON: async <T>(prompt: string): Promise<T> => {
        try {
            const result = await model.generateContent(prompt + "\n\nCRITICAL: Output strictly valid JSON only. No markdown fences, no explanation, no preamble.");
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
