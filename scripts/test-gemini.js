const { GoogleGenerativeAI } = require("@google/generative-ai");

async function testGemini() {
    const key = process.env.GEMINI_API_KEY || "AIzaSyBZeL74cslE090NWLn-Sg07RnlEN85a0P4";
    console.log("Testing Gemini API with Key:", key.substring(0, 10) + "...");

    const genAI = new GoogleGenerativeAI(key);

    try {
        console.log("Testing 'gemini-2.0-flash'...");
        const model = genAI.getGenerativeModel({ model: "gemini-2.0-flash" });
        const result = await model.generateContent("Explain how AI works to a 5 year old.");
        const response = await result.response;
        console.log("✅ 'gemini-2.0-flash' worked! Response:", response.text().substring(0, 50));

    } catch (error) {
        console.error("❌ Failed!");
        console.error("Error Name:", error.name);
        console.error("Error Message:", error.message);
    }
}

testGemini();
