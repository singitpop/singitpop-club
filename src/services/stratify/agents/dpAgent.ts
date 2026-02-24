
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
                        - LYRICS FOR THIS SCENE: ${JSON.stringify(scene.lyrics || [])}
                        - SYNCED LYRICS DATA: ${song.syncedLyrics ? JSON.stringify(song.syncedLyrics.filter(sl => scene.lyrics?.includes(sl.text))) : "None provided. Estimate duration based on BPM."}

                        AVAILABLE CAMERA MOVEMENTS:
                        Foundation: "dolly-in", "dolly-out", "fast-dolly-in", "pan-left", "pan-right", "tilt-up", "tilt-down", "truck-left", "truck-right", "pedestal-up"
                        Orbital & Crane: "orbit-180", "orbit-360", "slow-cinematic-arc", "crane-up", "crane-down", "crane-overhead"
                        Zoom & Lens: "smooth-zoom-in", "smooth-zoom-out", "crash-zoom-in", "crash-zoom-out", "rack-focus", "reveal-from-blur"
                        Aerial & Drone: "drone-flyover", "epic-drone-reveal", "large-aerial-orbit", "overhead-top-down", "fpv-drone", "aerial-pullback"
                        Subject Tracking: "leading-shot", "following-shot", "side-tracking", "pov-walk"
                        Creative & Advanced: "dolly-zoom", "through-shot", "reveal-from-behind", "dutch-angle", "whip-pan", "handheld-documentary", "locked"

                        TASK:
                        Create a Cinematic Shot for EVERY line of lyrics provided above.
                        Strict Rule: 1 Lyric Line = 1 Shot.
                        The shot action must reflect the emotion/content of that specific line.

                        OUTPUT STRICT JSON ARRAY of Shot objects (One per lyric line):
                        [{
                            "shotType": "EWS"|"WS"|"MS"|"MCU"|"CU"|"ECU",
                            "camera": { 
                                "movement": "<Must be EXACTLY ONE of the string values from AVAILABLE CAMERA MOVEMENTS>", 
                                "lensFeel": "wide"|"normal"|"telephoto",
                                "angle": "eye-level"|"low-angle"|"high-angle"
                            },
                            "lighting": { "style": "string" },
                            "foregroundAction": "detailed action of subject syncing to line",
                            "backgroundAction": "detailed bg action/environment",
                            "composition": "rule of thirds, center, etc",
                            "audioEnvironment": "ambience/sfx",
                            "subjects": [{ "characterId": "lead"|"band", "action": "Singing line...", "period": "string" }],
                            "durationSec": number, // Approx 4s or exact based on SYNCED LYRICS DATA
                            "lyricLineText": "The specific lyric line this shot covers",
                            "startSec": number, // Output exact timestamp if SYNCED LYRICS DATA is available, else 0
                            "endSec": number, // startSec + durationSec
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
                            audioSync: {
                                mode: s.lyricLineText ? 'lead' : 'none',
                                lyricLineText: s.lyricLineText,
                                startSec: s.startSec || 0,
                                endSec: s.endSec || (s.startSec || 0) + (s.durationSec || 4)
                            }
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
