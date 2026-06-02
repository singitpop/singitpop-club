
import { StratifyProject } from "@/types/stratify";
import { AgentContext, AgentResult, DirectorAgent } from "./agentTypes";

export class ContinuityAgent implements DirectorAgent {
    name = "Continuity Supervisor";
    role = "continuity" as const;

    async run(context: AgentContext): Promise<AgentResult> {
        const { project } = context;
        const log: string[] = [];

        log.push("👕 [Continuity] Checking Wardrobe & Props...");

        const knownIds = new Set<string>();
        if (project.cast.lead) knownIds.add(project.cast.lead.characterId);
        project.cast.band.forEach(b => knownIds.add(b.characterId));

        let glitches = 0;

        if (project.scenes) {
            project.scenes.forEach(s => {
                s.shots.forEach(shot => {
                    shot.subjects.forEach(sub => {
                        if (!knownIds.has(sub.characterId)) {
                            log.push(`   ⚠️ Unknown Character ID in shot ${shot.index}: ${sub.characterId}.`);
                            glitches++;
                        }
                    });
                });
            });
        }

        if (glitches === 0) log.push("✅ Continuity perfect.");

        return {
            success: true,
            agentName: this.name,
            data: { project },
            log
        };
    }
}
