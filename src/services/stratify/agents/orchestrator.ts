
import { StratifyProject } from "@/types/stratify";
import { AgentContext, AgentResult, DirectorAgent } from "./agentTypes";

import { ProducerAgent } from "./producerAgent";
import { ShowrunnerAgent } from "./showrunnerAgent";
import { DPAgent } from "./dpAgent";
import { PerformanceAgent } from "./performanceAgent";
import { ContinuityAgent } from "./continuityAgent";
import { EditorAgent } from "./editorAgent";
import { CompilerAgent } from "./compilerAgent";
import { QCAgent } from "./qcAgent";

export class StratifyOrchestrator {
    private context: AgentContext;
    private log: string[] = [];

    constructor(project: StratifyProject) {
        this.context = { project };
    }

    public async runPipeline(): Promise<StratifyProject> {
        this.log.push("🎬 Director Swarm: Orchestration Started");
        this.log.push("----------------------------------------");

        // Execute the 8-Step Plan (Sequential Pipeline)
        await this.runAgent(new ProducerAgent());
        await this.runAgent(new ShowrunnerAgent());
        await this.runAgent(new DPAgent());
        await this.runAgent(new PerformanceAgent());
        await this.runAgent(new ContinuityAgent());
        await this.runAgent(new EditorAgent());
        await this.runAgent(new CompilerAgent());
        await this.runAgent(new QCAgent());

        this.log.push("----------------------------------------");
        this.log.push("✅ Director Swarm: Pipeline Complete");
        return this.context.project;
    }

    private async runAgent(agent: DirectorAgent) {
        this.log.push(`🤖 Running ${agent.name}...`);
        try {
            const result = await agent.run(this.context);
            if (!result.success) {
                this.log.push(`❌ ${agent.name} FAILED: ${result.error}`);
                throw new Error(result.error || `${agent.name} Failed`);
            }

            // Merge Result into Context
            if (result.data) {
                // If the agent returned a project update, merge it.
                // In this simplified architecture, we often just replace or patch the project
                if (result.data.project) {
                    this.context.project = result.data.project;
                }
            }

            // Append Agent Logs
            if (result.log) {
                result.log.forEach(l => this.log.push(`   ${l}`));
            }

        } catch (err: any) {
            this.log.push(`❌ CRITICAL FAILURE in ${agent.name}: ${err.message}`);
            throw err;
        }
    }

    public getLogs() {
        return this.log;
    }
}
