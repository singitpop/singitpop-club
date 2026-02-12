
import { StratifyProject } from "@/types/stratify";

export type DirectorRole = 'producer' | 'showrunner' | 'dp' | 'performance' | 'continuity' | 'editor' | 'compiler' | 'qc';

export interface AgentContext {
    project: StratifyProject;
    // Shared state or expensive computation results (like audio analysis) could live here
}

export interface AgentResult {
    success: boolean;
    agentName: string;
    data?: Partial<AgentContext>; // Data to merge back into context
    error?: string;
    log: string[]; // Human readable logs for the UI
}

export interface DirectorAgent {
    name: string;
    role: DirectorRole;
    run(context: AgentContext): Promise<AgentResult>;
}
