
import { StratifyProject } from "@/types/stratify";
import { AgentContext, AgentResult, DirectorAgent } from "./agentTypes";

export class QCAgent implements DirectorAgent {
    name = "Quality Control (QC)";
    role = "qc" as const;

    async run(context: AgentContext): Promise<AgentResult> {
        const { project } = context;
        const log: string[] = [];

        log.push("🔍 [QC] Final Quality Assurance Check...");

        const bannedWords = ["morphing", "glitch", "text", "blur"];
        let warnings = 0;

        if (project.scenes) {
            project.scenes.forEach(s => {
                s.shots.forEach(shot => {
                    Object.entries(shot.toolPrompts || {}).forEach(([tool, prompt]) => {
                        const pLower = prompt.toLowerCase();
                        bannedWords.forEach(word => {
                            if (pLower.includes(word)) {
                                log.push(`   ⚠️ Banned word '${word}' found in ${tool} prompt for Shot ${shot.index}.`);
                                warnings++;
                            }
                        });

                        if (tool === 'runway' && !prompt.includes("[")) {
                            log.push(`   ⚠️ Runway prompt missing camera move syntax [] in Shot ${shot.index}.`);
                            warnings++;
                        }
                    });
                });
            });
        }

        if (warnings === 0) {
            log.push("✅ Project PASSED Quality Control.");
        } else {
            log.push(`⚠️ Project PASSED with ${warnings} warnings.`);
        }

        return {
            success: true,
            agentName: this.name,
            data: { project },
            log
        };
    }
}
