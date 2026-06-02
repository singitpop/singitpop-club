
import { NextRequest, NextResponse } from 'next/server';
import { GoogleAuth } from 'google-auth-library';

export async function POST(req: NextRequest) {
    try {
        const { apiKey, prompt, dna, style, duration, aspectRatio } = await req.json();

        console.log("🎨 Generating image with Imagen 3 for:", prompt);
        console.log("📐 Aspect Ratio:", aspectRatio || "16:9");

        const projectId = process.env.GOOGLE_CLOUD_PROJECT_ID;
        const credentialsJson = process.env.GOOGLE_APPLICATION_CREDENTIALS_JSON;

        if (!projectId || !credentialsJson) {
            throw new Error("Google Cloud credentials not configured");
        }

        const location = 'us-central1';

        try {
            const credentials = JSON.parse(credentialsJson);
            const auth = new GoogleAuth({
                credentials,
                scopes: ['https://www.googleapis.com/auth/cloud-platform']
            });

            const client = await auth.getClient();
            const accessToken = await client.getAccessToken();

            if (!accessToken.token) {
                throw new Error("Failed to get access token");
            }

            console.log("🔑 Got access token");

            // Imagen 3 endpoint
            const imagenEndpoint = `https://${location}-aiplatform.googleapis.com/v1/projects/${projectId}/locations/${location}/publishers/google/models/imagen-3.0-generate-001:predict`;

            const imagenPayload = {
                instances: [{
                    prompt: `Cinematic music video scene: ${prompt}. ${dna ? `Featuring: ${dna}.` : ''} Professional photography, dramatic lighting, vibrant colors, ${aspectRatio || "16:9"} aspect ratio.`
                }],
                parameters: {
                    sampleCount: 1,
                    aspectRatio: aspectRatio || "16:9",
                    negativePrompt: "blurry, low quality, distorted, text, watermark",
                    safetySetting: "block_some"
                }
            };

            console.log("📡 Calling Imagen 3...");

            const imagenResponse = await fetch(imagenEndpoint, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${accessToken.token}`
                },
                body: JSON.stringify(imagenPayload)
            });

            const imagenData = await imagenResponse.json();

            console.log("🎨 Imagen Response Status:", imagenResponse.status);

            if (imagenResponse.ok && imagenData.predictions && imagenData.predictions[0]) {
                const prediction = imagenData.predictions[0];

                // Imagen returns base64 encoded image
                if (prediction.bytesBase64Encoded) {
                    return NextResponse.json({
                        success: true,
                        assetType: 'image',
                        url: `data:image/png;base64,${prediction.bytesBase64Encoded}`,
                        message: "✅ AI Generated Image (Imagen 3)"
                    });
                }
            }

            if (imagenData.error) {
                console.warn("⚠️ Imagen Error:", imagenData.error.message);
                throw new Error(`Imagen: ${imagenData.error.message}`);
            }

            throw new Error("Imagen returned unexpected format");

        } catch (error: any) {
            console.error("❌ Imagen Failed:", error.message);

            // Fallback: Generate a gradient placeholder
            return NextResponse.json({
                success: true,
                assetType: 'image',
                url: `https://via.placeholder.com/1920x1080/FF0080/FFFFFF?text=${encodeURIComponent(prompt.substring(0, 50))}`,
                message: `⚠️ Imagen unavailable (${error.message.substring(0, 50)}) - Using placeholder`
            });
        }

    } catch (error: any) {
        console.error("❌ Route Error:", error);
        return NextResponse.json({ success: false, error: error.message }, { status: 500 });
    }
}
