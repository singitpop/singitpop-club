
import { NextRequest, NextResponse } from "next/server";
import { StratifyProject } from "@/types/stratify";
import { StratifyOrchestrator } from "@/services/stratify/agents/orchestrator";

// NOTE: This route adheres to the "Director Swarm" architecture.
// It DOES NOT generate prompts directly. It delegates to the Agent Orchestrator.

export async function POST(req: NextRequest) {
  // Simple Environment Check
  if (!process.env.GEMINI_API_KEY) {
    return NextResponse.json({ error: "No Gemini API Key" }, { status: 500 });
  }

  try {
    const body = await req.json();
    const project = body.project as StratifyProject;

    // SANITIZATION: Ensure critical arrays exist
    if (!project.locations || !Array.isArray(project.locations)) {
      project.locations = [
        { locationId: 'loc-1', name: 'Main Set', description: 'Default Set', timeOfDay: 'night', weather: 'clear' }
      ];
    }
    if (!project.cast) {
      project.cast = { lead: { characterId: 'lead', name: 'Artist', role: 'lead', genderPresentation: 'female', ageRange: '20s', lookSpec: {}, wardrobeSignature: [] }, band: [], principals: [] };
    }

    // --- EXECUTE THE 8-AGENT SWARM ---
    const orchestrator = new StratifyOrchestrator(project);
    const updatedProject = await orchestrator.runPipeline();

    // The logs are available in orchestrator.getLogs() if we wanted to return them
    // For now, we return the project artifact (the JSON)

    return NextResponse.json(updatedProject);

  } catch (error: any) {
    console.error("Director Swarm Fatal Error:", error);
    return NextResponse.json({ error: error.message || "Director Agent Failed" }, { status: 500 });
  }
}
