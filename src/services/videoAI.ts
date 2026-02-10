
// Admin-only service for generating video prompts
// Decoupled from any previous "Releasio" branding

/**
 * Represents a single scene in the director's vision
 */
export interface DirectorScene {
    id: string;
    location: string;
    timeOfDay: string;
    lighting: string;
    cameraAngle: string;
    action: string;
    visualStyle: string;
}

/**
 * Represents the full project context
 */
export interface DirectorProject {
    title: string;
    aspectRatio: '16:9' | '9:16' | '1:1';
    audioContext?: string; // Lyrics or vibe description
    scenes: DirectorScene[];
}

// Mock AI response for now (would connect to Gemini/OpenAI in production)
const mockGenerate = async (prompt: string): Promise<string> => {
    console.log("[VideoAI] Generating for prompt:", prompt);
    await new Promise(r => setTimeout(r, 1500)); // Simulate latency
    return `(Generated Prompt)\n\n${prompt}\n\n--ar 16:9 --v 6.0 --style raw`;
};

export const VideoAI = {
    /**
     * Genereates a cohesive prompt for a single scene or the entire sequence
     */
    generateScenePrompt: async (scene: DirectorScene, context?: string) => {
        const prompt = `
Cinematic Shot Description:
Location: ${scene.location}
Time: ${scene.timeOfDay}
Lighting: ${scene.lighting}
Camera: ${scene.cameraAngle}
Style: ${scene.visualStyle}

Action: ${scene.action}
${context ? `Audio Context/Vibe: ${context}` : ''}
        `.trim();

        return await mockGenerate(prompt);
    },

    /**
     * Generates a multi-scene breakdown script
     */
    generateFullScript: async (project: DirectorProject) => {
        const scenesText = project.scenes.map((s, i) => `
SCENE ${i + 1}:
[${s.timeOfDay}, ${s.location}]
Shot: ${s.cameraAngle}, ${s.lighting} lighting.
Action: ${s.action}
        `.trim()).join('\n\n');

        const prompt = `
Title: ${project.title}
Global Vibe: ${project.audioContext || 'N/A'}

${scenesText}
        `.trim();

        return await mockGenerate(prompt);
    }
};
