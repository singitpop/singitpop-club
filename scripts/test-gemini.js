
const { GoogleGenerativeAI } = require("@google/generative-ai");
require("dotenv").config({ path: ".env.local" });

async function listModels() {
    const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
    // Hack: The SDK doesn't expose listModels directly on the main class in some versions, 
    // but if it does, it's via a ModelManager or similar.
    // Actually, for v0.24.1, we might not have a direct listModels helper easily accessible 
    // without using the underlying API wrapper.

    // Let's try a simple generation on a model to see if we can get a better error or success
    const modelName = "gemini-1.5-flash";
    console.log(`Testing model: ${modelName}`);

    try {
        const model = genAI.getGenerativeModel({ model: modelName });
        const result = await model.generateContent("Hello");
        console.log("Success!", result.response.text());
    } catch (e) {
        console.error("Error:", e.message);
    }
}

listModels();
