async function listModels() {
    const key = process.env.GEMINI_API_KEY || "AIzaSyBZeL74cslE090NWLn-Sg07RnlEN85a0P4";
    const url = `https://generativelanguage.googleapis.com/v1beta/models?key=${key}`;

    console.log("Fetching models from:", url.replace(key, "HIDDEN_KEY"));

    try {
        const response = await fetch(url);
        const data = await response.json();

        if (data.models) {
            console.log("✅ Available Models:");
            data.models.forEach(m => {
                if (m.supportedGenerationMethods && m.supportedGenerationMethods.includes("generateContent")) {
                    console.log(`- ${m.name}`);
                }
            });
        } else {
            console.error("❌ No models found or error:", data);
        }
    } catch (error) {
        console.error("❌ Fetch failed:", error.message);
    }
}

listModels();
