
import { StratifyProject, Scene } from "@/types/stratify";
import { AgentContext, AgentResult, DirectorAgent } from "./agentTypes";
import { LLMProvider } from "../llm";

export class ShowrunnerAgent implements DirectorAgent {
    name = "Showrunner Agent";
    role = "showrunner" as const;

    async run(context: AgentContext): Promise<AgentResult> {
        const { project } = context;
        const log: string[] = [];

        log.push("🎬 [Showrunner] Developing Narrative Arc...");

        if (project.scenes && project.scenes.length > 0) {
            log.push(`   - Using existing ${project.scenes.length} scene breakdown.`);
            return { success: true, agentName: this.name, data: { project }, log };
        }

        log.push("   - Generating new Scene Breakdown based on Lyrics & Mood...");
        const song = project.song;

        try {
            const prompt = `
            ACT AS A MUSIC VIDEO SHOWRUNNER constructing a scene breakdown.
            
            CONTEXT:
            Song: "${song.title}" (${song.genre}).
            Duration: ${song.duration || "Standard"}
            Lyrics: "${song.lyrics.rawText?.substring(0, 1500)}..."
            Director Note: ${project.project.summary}
            
            AVAILABLE LOCATIONS (You MUST use these specific IDs and Names):
            ${JSON.stringify(project.locations.map(l => ({
                id: l.locationId,
                name: l.name,
                time: l.timeOfDay,
                lighting: l.lighting, // e.g. Neon Noir
                camera: l.cameraVibe, // e.g. Handheld
                style: l.artDirection
            })))}

            TASK: 
            1. Analyze the lyrics for the EMOTIONAL ARC (e.g. rising tension, melancholic reflection, explosive release).
            2. Breakdown the song into 3-5 Distinct Scenes that map to this arc.
            3. DISTRIBUTE the lyrics across these scenes. Every line of the song must be assigned to a scene.
            4. ASSIGN the most appropriate Location from the list above to each scene.
            5. INCORPORATE the User's defined Lighting/Camera styles for that location into the mood description.
            
            OUTPUT STRICT JSON ARRAY of Scene objects:
            [{
                "title": "Verse 1 - The Setup",
                "locationId": "loc-1", // MUST match a provided ID exactly
                "narrativeBeat": "Introduction of the protagonist in a moment of solitude.",
                "lyrics": ["Line 1 of verse", "Line 2 of verse"], // The specific lyric lines for this scene
                "mood": {
                    "visual": "Melancholic and isolated, matching the 'Neon Noir' lighting setting.",
                    "lighting": "Deep shadows with harsh neon rim light (User Preference: Neon Noir)",
                    "color": "Cool Teals and Magentas",
                    "ambience": "Rain against window, distant city traffic"
                }
            }]
            `;

            const generatedScenes = await LLMProvider.generateJSON<any[]>(prompt);

            // Map to Schema
            const scenes: Scene[] = generatedScenes.map((s, i) => {
                // Find matching location ID
                const locations = project.locations || [];
                const loc = locations.find(l =>
                    l.name.toLowerCase() === s.locationId.toLowerCase() ||
                    l.locationId === s.locationId
                );

                const defaultLocationId = (locations.length > 0 && locations[0]) ? locations[0].locationId : "loc-1";

                return {
                    sceneId: crypto.randomUUID(),
                    index: i + 1,
                    title: s.title,
                    locationId: loc ? loc.locationId : defaultLocationId,
                    narrativeBeat: s.narrativeBeat,
                    mood: {
                        visual: s.mood.visual,
                        lighting: s.mood.lighting,
                        color: s.mood.color,
                        ambience: s.mood.ambience || "Natural room tone"
                    },
                    lyrics: s.lyrics || [],
                    shots: [] // Emptyshots, DP will fill
                };
            });

            const updatedProject = { ...project, scenes };
            log.push(`   ✅ Generated ${scenes.length} scenes.`);

            return {
                success: true,
                agentName: this.name,
                data: { project: updatedProject },
                log
            };

        } catch (err) {
            log.push(`   ❌ Failed to generate scenes: ${err}`);
            // Fallback
            const scenes = [{
                sceneId: crypto.randomUUID(),
                index: 1,
                title: "Opening Scene",
                locationId: (project.locations && project.locations[0]) ? project.locations[0].locationId : "loc-1",
                mood: { visual: "Atmospheric", lighting: "Dim", color: "Blue", ambience: "Quiet" },
                narrativeBeat: "Introduction",
                shots: []
            }];
            return { success: true, agentName: this.name, data: { project: { ...project, scenes } }, log };
        }
    }
}
