
import { StratifyProject, Shot, CameraSpec } from "@/types/stratify";
import { AgentContext, AgentResult, DirectorAgent } from "./agentTypes";

export class DPAgent implements DirectorAgent {
    name = "Director of Photography (DP)";
    role = "dp" as const;

    async run(context: AgentContext): Promise<AgentResult> {
        const { project } = context;
        const log: string[] = [];

        log.push("🎥 [DP] Analyzing Influence Dials...");
        const dials = project.project.directorProfile.influenceDials;

        log.push(`   - Wonder/Scale: ${dials.wonderAndScale}%`);
        log.push(`   - Motivated Camera: ${dials.motivatedCamera}%`);

        if (project.scenes) {
            let totalShots = 0;
            project.scenes.forEach(s => {
                // Mock generation if empty
                if (!s.shots || s.shots.length === 0) {
                    const shot: Shot = {
                        shotId: crypto.randomUUID(),
                        index: 1,
                        sceneId: s.sceneId,
                        shotType: dials.wonderAndScale > 50 ? 'EWS' : 'MS',
                        camera: {
                            movement: dials.motivatedCamera > 80 ? 'locked' : 'pan',
                            lensFeel: 'normal',
                            angle: 'eye-level'
                        },
                        lighting: { style: s.mood.lighting },
                        subjects: [],
                        action: "Establishing the scene.",
                        basePrompt: "A cinematic shot establishing the location.",
                        durationSec: 4,
                        audioSync: { mode: 'none', startSec: 0, endSec: 4 }
                    };
                    s.shots = [shot];
                }

                s.shots.forEach(shot => {
                    // DP Validation Rule: Enforce valid camera moves
                    const validMoves = ['locked', 'pan', 'tilt', 'dolly-in', 'dolly-out', 'truck-left', 'truck-right', 'orbit', 'crane-up', 'crane-down', 'handheld', 'drone', 'zoom-in', 'zoom-out'];
                    if (!validMoves.includes(shot.camera.movement)) {
                        log.push(`   ⚠️ Invalid Move '${shot.camera.movement}' in Shot ${shot.index}. Correcting to 'locked'.`);
                        shot.camera.movement = 'locked';
                    }
                    totalShots++;
                });
            });
            log.push(`✅ [DP] Shot List Locked: ${totalShots} shots.`);
        }

        return {
            success: true,
            agentName: this.name,
            data: { project },
            log
        };
    }
}
