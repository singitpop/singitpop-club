
import { Shot, ProjectMeta, ToolPromptOverride } from "@/types/stratify";

// --- PROMPT TEMPLATES ---

const VEO_TEMPLATE = (s: Shot, ctx: PromptContext) => `
TITLE/SHOT: Scene ${s.index}, Shot ${s.index}

SUBJECTS:
${ctx.subjectsText}

LOCATION:
${ctx.locationName}: ${ctx.locationVisuals}

ACTION:
${s.action}

PERFORMANCE:
${ctx.performanceNotes}. ${s.audioSync?.mode !== 'none' ? `Lead is singing: "${s.audioSync?.lineText}"` : ''}

CAMERA:
${s.camera.angle}, ${s.camera.lensFeel} lens. Movement: ${s.camera.movement} (${s.camera.movementSpeed}). Focus: ${s.camera.focus?.depthOfField}.

LIGHTING / MOOD:
${s.lighting?.timeOfDay}, ${s.lighting?.style}. Style: ${s.promptIntent.visualStyle}.

STYLE:
Cinematic, 8k, highly detailed, photorealistic.
`.trim();

const RUNWAY_TEMPLATE = (s: Shot, ctx: PromptContext) => `
${s.camera.movement} of ${ctx.subjectsSummary}. ${ctx.locationName}, ${s.lighting?.timeOfDay}.
${s.action}. ${s.promptIntent.visualStyle}.
${s.camera.lensFeel} lens, ${s.camera.angle}.
${s.audioSync?.mode !== 'none' ? `Character singing: "${s.audioSync?.lineText}"` : ''}
`.trim();

const PIKA_TEMPLATE = (s: Shot, ctx: PromptContext) => `
${s.action}. ${ctx.subjectsSummary} at ${ctx.locationName}.
${s.promptIntent.visualStyle}. ${s.lighting?.style}.
Camera: ${s.camera.movement}, ${s.camera.angle}.
`.trim();

const LUMA_TEMPLATE = (s: Shot, ctx: PromptContext) => `
${s.action}. Featuring ${ctx.subjectsSummary}.
Location: ${ctx.locationName}.
Mood: ${s.promptIntent.visualStyle}. Lighting: ${s.lighting?.style}.
Cinematic, stable, 4k.
`.trim();

// --- TYPES ---

interface PromptContext {
    subjectsText: string;
    subjectsSummary: string;
    locationName: string;
    locationVisuals: string;
    performanceNotes: string;
}

export const PromptCompiler = {
    compile: (shot: Shot, projectDesc: string, tools: ('veo' | 'runway' | 'pika' | 'luma')[]) => {
        const context: PromptContext = {
            subjectsText: shot.subjects.map(sub => `Role: ${sub.purpose}`).join(', '),
            subjectsSummary: "Band performing", // Placeholder - needs real character lookup
            locationName: "Studio", // Placeholder
            locationVisuals: "Dark void with neon lights",
            performanceNotes: "Energetic performance"
        };

        const results: Record<string, string> = {};

        if (tools.includes('veo')) {
            results.veo = shot.promptIntent.toolPromptOverrides?.veo?.promptText || VEO_TEMPLATE(shot, context);
        }
        if (tools.includes('runway')) {
            results.runway = shot.promptIntent.toolPromptOverrides?.runway?.promptText || RUNWAY_TEMPLATE(shot, context);
        }
        if (tools.includes('pika')) {
            results.pika = shot.promptIntent.toolPromptOverrides?.pika?.promptText || PIKA_TEMPLATE(shot, context);
        }
        if (tools.includes('luma')) {
            results.luma = shot.promptIntent.toolPromptOverrides?.luma?.promptText || LUMA_TEMPLATE(shot, context);
        }

        return results;
    }
};
