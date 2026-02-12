
import { StratifyProject } from "@/types/stratify";
import { AgentContext, AgentResult, DirectorAgent } from "./agentTypes";
import { PromptCompiler } from "../promptCompiler";

export class CompilerAgent implements DirectorAgent {
    name = "Prompt Compiler";
    role = "compiler" as const;

    async run(context: AgentContext): Promise<AgentResult> {
        const { project } = context;
        const log: string[] = [];

        log.push("💾 [Compiler] Generating Tool-Specific Prompt Packs...");

        let promptCount = 0;
        const tools = ['veo', 'runway', 'luma', 'kling', 'pika'] as const;

        if (project.scenes) {
            project.scenes.forEach(s => {
                s.shots.forEach(shot => {
                    const compiled = PromptCompiler.compile(project, shot, [...tools]);
                    shot.toolPrompts = compiled;
                    promptCount += Object.keys(compiled).length;
                });
            });
        }

        log.push(`✅ Generated ${promptCount} prompts across ${tools.length} platforms.`);

        return {
            success: true,
            agentName: this.name,
            data: { project },
            log
        };
    }
}
