
import { StratifyProject } from "@/types/stratify";
import { AgentContext, AgentResult, DirectorAgent } from "./agentTypes";

export class ProducerAgent implements DirectorAgent {
    name = "Producer Agent";
    role = "producer" as const;

    async run(context: AgentContext): Promise<AgentResult> {
        const { project } = context;
        const log: string[] = [];

        log.push("📋 [Producer] Reviewing Project Brief...");

        // 1. Validate Core Intake
        if (!project.song.title) {
            return { success: false, agentName: this.name, error: "Missing Song Title", log };
        }
        if (!project.song.lyrics.rawText) {
            return { success: false, agentName: this.name, error: "Missing Lyrics", log };
        }

        // 2. Enforce Format/Budget
        const spec = project.project.outputSpec;
        log.push(`   - Format: ${spec.aspectRatio} @ ${spec.resolution}`);
        log.push(`   - Rating: ${spec.contentRating}`);
        log.push(`   - Mode: ${spec.visualMode}`);

        // 3. Set Global Constraints
        // (In a real app, this might check credits/tokens)
        log.push("✅ [Producer] Greenlight. Project approved for pre-production.");

        return {
            success: true,
            agentName: this.name,
            data: { project },
            log
        };
    }
}
