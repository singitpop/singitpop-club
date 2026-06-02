
import { StratifyProject } from "@/types/stratify";
import { AgentContext, AgentResult, DirectorAgent } from "./agentTypes";

export class EditorAgent implements DirectorAgent {
    name = "Editor";
    role = "editor" as const;

    async run(context: AgentContext): Promise<AgentResult> {
        const { project } = context;
        const log: string[] = [];

        log.push("✂️ [Editor] Assembling Rough Cut & Pacing Check...");

        let totalDuration = 0;
        let minShotLen = 2;

        if (project.scenes) {
            project.scenes.forEach(s => {
                s.shots.forEach(shot => {
                    if (shot.durationSec < minShotLen) {
                        log.push(`   ⚠️ Shot ${shot.index} matches 'rapid-fire' pacing (<${minShotLen}s).`);
                    }
                    totalDuration += shot.durationSec;
                });
            });
        }

        const mins = Math.floor(totalDuration / 60);
        const secs = totalDuration % 60;
        log.push(`⏱️ Total Runtime: ${mins}:${secs.toString().padStart(2, '0')}`);

        return {
            success: true,
            agentName: this.name,
            data: { project },
            log
        };
    }
}
