const { GoogleGenerativeAI } = require("@google/generative-ai");

async function testGemini() {
    const key = process.env.GEMINI_API_KEY || "AIzaSyBZeL74cslE090NWLn-Sg07RnlEN85a0P4"; // Fallback to the one user provided
    console.log("Testing Gemini API with Key:", key.substring(0, 10) + "...");

    const genAI = new GoogleGenerativeAI(key);
    // const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

    try {
        /*
        console.log("Attempting to generate content...");
        const result = await model.generateContent("Explain how AI works to a 5 year old.");
        const response = await result.response;
        const text = response.text();
        console.log("✅ Success! Response:", text.substring(0, 50) + "...");
        */

        // List models
        const modelList = await genAI.getGenerativeModel({ model: "gemini-pro" }).apiKey; // Hack to get client? No, need direct access or use listModels if available in SDK, actually SDK doesn't have listModels on the instance easily. 
        // Actually, the error message suggested calling ListModels. 
        // In Node SDK:
        // const { GoogleGenerativeAI } = require("@google/generative-ai");
        // const genAI = new GoogleGenerativeAI(process.env.API_KEY);
        // This SDK might not expose listModels directly on the main class in this version or it is on a different import.

        // Let's try a different model known to exist usually: gemini-pro
        console.log("Retrying with 'gemini-pro'...");
        const modelPro = genAI.getGenerativeModel({ model: "gemini-pro" });
        const resultPro = await modelPro.generateContent("Hello");
        console.log("✅ 'gemini-pro' worked!");

        console.log("Retrying with 'gemini-1.0-pro'...");
        const model10 = genAI.getGenerativeModel({ model: "gemini-1.0-pro" });
        const result10 = await model10.generateContent("Hello");
        console.log("✅ 'gemini-1.0-pro' worked!");

    } catch (error) {
        console.error("❌ Failed!");
        console.error("Error Name:", error.name);
        console.error("Error Message:", error.message);
    }
}

testGemini();
