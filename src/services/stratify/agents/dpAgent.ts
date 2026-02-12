
import { StratifyProject, Shot, CameraSpec } from "@/types/stratify";
import { AgentContext, AgentResult, DirectorAgent } from "./agentTypes";
import { LLMProvider } from "../llm";

export class DPAgent implements DirectorAgent {
    name = "Director of Photography (DP)";
    role = "dp" as const;

    async run(context: AgentContext): Promise<AgentResult> {
        const { project } = context;
        const log: string[] = [];

        log.push("🎥 [DP] Developing Shot List & Cinematography...");
        const dials = project.project.directorProfile.influenceDials;
        const song = project.song;

        if (project.scenes) {
            let totalShots = 0;

            // Process scenes sequentially (could be parallel but sequential checks context)
            for (const scene of project.scenes) {
                if (!scene.shots || scene.shots.length === 0) {
                    log.push(`   - Generating shots for Scene "${scene.title}"...`);

                    try {
                        const prompt = `
                        ACT AS A MASTER CINEMATOGRAPHER.
                        Project: Music Video for "${song.title}" (${song.genre}).
                        Director Style: ${project.project.outputSpec.visualMode}.
                        Influence Dials (0-100):
                        - Wonder/Scale: ${dials.wonderAndScale}
                        - Motivated Camera: ${dials.motivatedCamera}
                        - Rhythmic Montage: ${dials.rhythmicMontage}
                        - Intimate Emotion: ${dials.intimateEmotion}

                        SCENE CONTEXT:
                        - Title: "${scene.title}"
                        - Location: "${scene.locationId}"
                        - Mood: ${scene.mood.visual} (Lighting: ${scene.mood.lighting})
                        - Ambience: ${scene.mood.ambience || "Natural"}
                        - Narrative Beat: ${scene.narrativeBeat}
                        - Cast: ${project.cast.lead.name} (Lead) + Band

                        TASK:
                        Create a sequence of 3-6 cinematic shots for this scene.
                        CRITICAL: detailed visual breakdown. Separate Foreground vs Background action.
                        
                        OUTPUT STRICT JSON ARRAY of Shot objects:
                        [{
                            "shotType": "EWS"|"WS"|"MS"|"MCU"|"CU"|"ECU",
                            "camera": { 
                                "movement": "locked"|"pan"|"tilt"|"dolly-in"|"dolly-out"|"truck-left"|"truck-right"|"orbit"|"handheld"|"drone"|"zoom-in", 
                                "lensFeel": "wide"|"normal"|"telephoto",
                                "angle": "eye-level"|"low-angle"|"high-angle"
                            },
                            "lighting": { "style": "string" },
                            "foregroundAction": "detailed action of subject",
                            "backgroundAction": "detailed bg action/environment",
                            "composition": "rule of thirds, center, etc",
                            "audioEnvironment": "ambience/sfx",
                            "subjects": [{ "characterId": "lead"|"band", "action": "string", "period": "string" }],
                            "durationSec": number,
                            "basePrompt": "summary string"
                        }]
                        `;

                        const generatedShots = await LLMProvider.generateJSON<any[]>(prompt);

                        // Hydrate and Validate
                        scene.shots = generatedShots.map((s, i) => ({
                            shotId: crypto.randomUUID(),
                            index: i + 1,
                            sceneId: scene.sceneId,
                            shotType: s.shotType,
                            camera: s.camera,
                            lighting: s.lighting || { style: scene.mood.lighting },
                            subjects: s.subjects || [],
                            action: s.foregroundAction, // Deprecated map
                            foregroundAction: s.foregroundAction || "Subject performs action",
                            backgroundAction: s.backgroundAction || "Background texture",
                            composition: s.composition || "Cinematic framing",
                            basePrompt: s.basePrompt || `${s.shotType} of action`,
                            durationSec: s.durationSec || 4,
                            audioEnvironment: s.audioEnvironment || "Room tone",
                            audioSync: { mode: 'none', startSec: 0, endSec: s.durationSec || 4 }
                        }));

                        log.push(`     ✅ Generated ${scene.shots.length} shots.`);

                    } catch (err) {
                        log.push(`     ❌ Failed to generate shots for scene ${scene.title}: ${err}`);
                        // Fallback mock
                        scene.shots = [{
                            shotId: crypto.randomUUID(),
                            index: 1,
                            sceneId: scene.sceneId,
                            shotType: "WS",
                            camera: { movement: "locked", lensFeel: "normal", angle: "eye-level" },
                            lighting: { style: scene.mood.lighting },
                            subjects: [],
                            action: "Fallback shot",
                            foregroundAction: "Fallback shot",
                            backgroundAction: "",
                            composition: "Center",
                            basePrompt: "Fallback",
                            durationSec: 4,
                            audioEnvironment: "Silence",
                            audioSync: { mode: 'none', startSec: 0, endSec: 4 }
                        }];
                    }
                }
                totalShots += scene.shots.length;
            }
            log.push(`✅ [DP] Shot List Finalized: ${totalShots} total shots.`);
        }

        return {
            success: true,
            agentName: this.name,
            data: { project },
            log
        };
    }
}
