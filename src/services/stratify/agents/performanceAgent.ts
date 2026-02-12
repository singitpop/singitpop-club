
import { StratifyProject } from "@/types/stratify";
import { AgentContext, AgentResult, DirectorAgent } from "./agentTypes";

export class PerformanceAgent implements DirectorAgent {
    name = "Performance Director";
    role = "performance" as const;

    async run(context: AgentContext): Promise<AgentResult> {
        const { project } = context;
        const log: string[] = [];

        log.push("🎭 [Performance] Aligning Lyrics & Acting...");

        const lead = project.cast.lead;
        if (!lead) {
            log.push("   ⚠️ No Lead Cast found. Skipping lip-sync checks.");
        }

        if (project.scenes) {
            project.scenes.forEach(s => {
                s.shots.forEach(shot => {
                    // Initialize audioSync if missing
                    if (!shot.audioSync) {
                        shot.audioSync = {
                            mode: 'none',
                            startSec: 0,
                            endSec: shot.durationSec
                        };
                    }

                    if (shot.audioSync?.mode === 'lead' && !shot.audioSync.lyricLineText) {
                        log.push(`   ⚠️ Shot ${shot.index} marked for lip-sync but missing lyrics.`);
                    }

                    if (lead && shot.audioSync?.mode === 'lead') {
                        const hasLead = shot.subjects.some(sub => sub.characterId === lead.characterId);
                        if (!hasLead) {
                            log.push(`   - Adding Lead Singer to Shot ${shot.index} for lip-sync.`);
                            shot.subjects.push({
                                characterId: lead.characterId,
                                purpose: 'singing',
                                screenPosition: 'center',
                                action: "Singing passionately"
                            });
                        }
                    }
                });
            });
        }

        return {
            success: true,
            agentName: this.name,
            data: { project },
            log
        };
    }
}
