
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
                        const lead = project.cast.lead;
                        const bpm = (song as any).bpm as number | undefined;
                        const beatsPerClip = 4;
                        const estimatedDuration = bpm ? parseFloat(((60 / bpm) * beatsPerClip).toFixed(1)) : 5;

                        // Build character DNA string
                        const lookSpec = lead.lookSpec as any;
                        const wardrobeItems = (lead.wardrobeSignature || []).join(', ') || 'Not specified';
                        const characterDNA = `
CHARACTER DNA — Embed EXACTLY as described in every shot:
  Full Name: ${lead.name}
  Role: Lead Singer / Protagonist
  Age Range: ${lead.ageRange || 'Late 20s'}
  Gender: ${lead.genderPresentation || 'Male'}
  Skin Tone: ${lookSpec?.skinTone || 'Not specified'}
  Build: ${lookSpec?.build || 'Average build'}
  Hair: ${lookSpec?.hairColor || 'Not specified'} — ${lookSpec?.hairStyle || 'natural'}
  Facial Hair: ${lookSpec?.facialHair || 'None'}
  Defining Look: ${lookSpec?.style || 'Contemporary, understated'}
  Wardrobe: ${wardrobeItems}
  Eyes: ${lookSpec?.eyeColor || 'Not specified'}
`.trim();

                        const prompt = `
ACT AS A WORLD-CLASS MUSIC VIDEO DIRECTOR OF PHOTOGRAPHY.
Your shots must be SPECIFIC, CINEMATIC, and EMOTIONALLY PRECISE — not generic descriptions.
Do NOT describe "a performer singing". Describe EXACTLY what we see: their posture, jaw, eyes, hands.

═══════════════════════════════════════════════════════
${characterDNA}
═══════════════════════════════════════════════════════

PROJECT CONTEXT:
  Music Video: "${song.title}" by ${song.artist || lead.name}
  Genre: ${song.genre || 'R&B/Soul'}
  BPM: ${bpm || 'Unknown — use 5s default clip duration'}
  Estimated clip duration: ~${estimatedDuration}s per shot (based on ${beatsPerClip} beats @ ${bpm || '?'} BPM)
  Director Style: ${project.project.outputSpec.visualMode || 'Cinematic Realism'}

INFLUENCE DIALS (0-100, use these to calibrate shot choices):
  Wonder/Scale: ${dials.wonderAndScale} → ${dials.wonderAndScale > 60 ? 'Favour wide establishing shots with environmental grandeur' : 'Favour tight, personal framing'}
  Motivated Camera: ${dials.motivatedCamera} → ${dials.motivatedCamera > 60 ? 'Camera moves must feel emotionally justified, not decorative' : 'Mostly static or locked shots'}
  Rhythmic Montage: ${dials.rhythmicMontage} → ${dials.rhythmicMontage > 60 ? 'Cut fast and tight to beat — clip length matters' : 'Longer, breathing takes'}
  Intimate Emotion: ${dials.intimateEmotion} → ${dials.intimateEmotion > 60 ? 'Prioritise CU/ECU, emotional facial performance, stillness' : 'Let environment carry emotion, not just the face'}

SCENE CONTEXT:
  Scene: "${scene.title}"
  Location: "${scene.locationId}"
  Mood / Visual: ${scene.mood.visual}
  Lighting Style: ${scene.mood.lighting}
  Ambience: ${scene.mood.ambience || 'Natural room tone'}
  Narrative Beat: ${scene.narrativeBeat}
  SYNCED TIMESTAMPS: ${song.syncedLyrics ? JSON.stringify(song.syncedLyrics.filter((sl: any) => scene.lyrics?.includes(sl.text))) : 'None — estimate from BPM'}

LYRIC LINES TO COVER (one shot per line, in order):
${(scene.lyrics || []).map((line: string, i: number) => `  ${i + 1}. "${line}"`).join('\n')}

═══════════════════════════════════════════════════════
SHOT GENERATION RULES:
1. ONE shot per lyric line, in order. Do NOT skip or combine lines.
2. VARY shot types across the scene — don't repeat ECU 3 times in a row.
3. Foreground action MUST be SPECIFIC to that lyric — what is he physically doing as he sings that line?
4. Performance direction = describe jaw, eyes, head position, stillness or movement. NOT just "he sings".
5. For EVERY shot: write a START FRAME (still image of the very first frame) and END FRAME (very last frame before cut).
6. flowMode: If shotType is CU or ECU, output "QUALITY". If MS or MCU with lip sync, "QUALITY". Otherwise "FAST".
═══════════════════════════════════════════════════════

OUTPUT STRICT JSON ARRAY (one object per lyric line):
[{
    "shotType": "EWS"|"WS"|"MS"|"MCU"|"CU"|"ECU",
    "camera": { 
        "movement": "EXACTLY ONE of: dolly-in|dolly-out|fast-dolly-in|pan-left|pan-right|tilt-up|tilt-down|truck-left|truck-right|pedestal-up|orbit-180|orbit-360|slow-cinematic-arc|crane-up|crane-down|crane-overhead|smooth-zoom-in|smooth-zoom-out|crash-zoom-in|crash-zoom-out|rack-focus|reveal-from-blur|drone-flyover|epic-drone-reveal|large-aerial-orbit|overhead-top-down|fpv-drone|aerial-pullback|leading-shot|following-shot|side-tracking|pov-walk|dolly-zoom|through-shot|reveal-from-behind|dutch-angle|whip-pan|handheld-documentary|locked",
        "lensFeel": "wide"|"normal"|"telephoto",
        "angle": "eye-level"|"low-angle"|"high-angle"
    },
    "lighting": { "style": "specific lighting description, not just a name" },
    "foregroundAction": "SPECIFIC physical action of ${lead.name} as he sings this exact line — posture, jaw, eyes, hands",
    "backgroundAction": "What is happening behind him — environment, movement, texture",
    "composition": "Specific framing — rule of thirds, centered, looking-room, etc.",
    "performanceDirection": "Director note: e.g. 'Jaw soft, barely open, eyes cast down-left — the weight of the lyric sits in stillness'",
    "audioEnvironment": "Ambient sound description",
    "subjects": [{ "characterId": "lead", "action": "Singing line with specific physical note", "period": "throughout shot" }],
    "durationSec": ${estimatedDuration},
    "lyricLineText": "The exact lyric line this shot covers",
    "startSec": 0,
    "endSec": ${estimatedDuration},
    "flowMode": "FAST"|"QUALITY",
    "startFrameDescription": "Hyper-specific still image description of the VERY FIRST frame — compose as an Imagen prompt. Include ${lead.name}'s exact position, expression, lighting, environment, lens depth. DO NOT describe motion.",
    "endFrameDescription": "Hyper-specific still image description of the VERY LAST frame before cut — how has he moved or shifted during the clip? What's the final composition?",
    "imagenPrompt": "Full image generation prompt for the first frame — character DNA + composition + lighting + environment + NO motion",
    "veoPrompt": "Motion prompt — start with exact camera movement, then describe ${lead.name}'s physical performance during the clip, then describe any background animation"
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
                            action: s.foregroundAction,
                            foregroundAction: s.foregroundAction || "Subject performs action",
                            backgroundAction: s.backgroundAction || "Background texture",
                            composition: s.composition || "Cinematic framing",
                            performanceDirection: s.performanceDirection || "",
                            flowMode: s.flowMode || "FAST",
                            startFrameDescription: s.startFrameDescription || "",
                            endFrameDescription: s.endFrameDescription || "",
                            basePrompt: s.basePrompt || `${s.shotType} of action`,
                            imagenPrompt: s.imagenPrompt || `Cinematic ${s.shotType}, ${scene.mood.lighting} lighting, ${s.composition}.`,
                            veoPrompt: s.veoPrompt || `Camera ${s.camera?.movement || 'locked'}, ${s.foregroundAction}`,
                            durationSec: s.durationSec || estimatedDuration,
                            audioEnvironment: s.audioEnvironment || "Room tone",
                            audioSync: {
                                mode: s.lyricLineText ? 'lead' : 'none',
                                lyricLineText: s.lyricLineText,
                                startSec: s.startSec || 0,
                                endSec: s.endSec || (s.startSec || 0) + (s.durationSec || estimatedDuration)
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
