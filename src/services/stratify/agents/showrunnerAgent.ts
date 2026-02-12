
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
            ACT AS A MUSIC VIDEO SHOWRUNNER.
            Song: "${song.title}" (${song.genre}).
            Lyrics: "${song.lyrics.rawText?.substring(0, 500)}..."
            Locations Available: ${JSON.stringify(project.locations.map(l => l.name))}
            Director Note: ${project.project.summary}

            TASK: Breakdown the song into 3-5 Distinct Scenes.
            
            OUTPUT STRICT JSON ARRAY of Scene objects:
            [{
                "title": "Verse 1 - The Bedroom",
                "locationId": "must match one of the available location names or IDs perfectly",
                "narrativeBeat": "Introduction of the lonely protagonist",
                "mood": {
                    "visual": "Melancholic",
                    "lighting": "Blue hour, dim practicals",
                    "color": "Cool Teals",
                    "ambience": "Rain against window, distant city traffic"
                }
            }]
            `;

            const generatedScenes = await LLMProvider.generateJSON<any[]>(prompt);

            // Map to Schema
            const scenes: Scene[] = generatedScenes.map((s, i) => {
                // Find matching location ID
                const loc = project.locations.find(l =>
                    l.name.toLowerCase() === s.locationId.toLowerCase() ||
                    l.locationId === s.locationId
                );

                return {
                    sceneId: crypto.randomUUID(),
                    index: i + 1,
                    title: s.title,
                    locationId: loc ? loc.locationId : (project.locations[0]?.locationId || "loc-1"),
                    narrativeBeat: s.narrativeBeat,
                    mood: {
                        visual: s.mood.visual,
                        lighting: s.mood.lighting,
                        color: s.mood.color,
                        ambience: s.mood.ambience || "Natural room tone"
                    },
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
                locationId: project.locations[0]?.locationId || "loc-1",
                mood: { visual: "Atmospheric", lighting: "Dim", color: "Blue", ambience: "Quiet" },
                narrativeBeat: "Introduction",
                shots: []
            }];
            return { success: true, agentName: this.name, data: { project: { ...project, scenes } }, log };
        }
    }
}
