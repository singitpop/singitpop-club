
import { Shot, StratifyProject } from "@/types/stratify";

export const PromptCompiler = {
    compile: (project: StratifyProject, shot: Shot, tools: ('veo' | 'runway' | 'pika' | 'luma' | 'kling')[]) => {
        const results: Record<string, string> = {};

        // 1. Resolve Character Details
        const characterContext = resolveCharacterContext(project, shot);

        // 2. Resolve Audio/Lip Sync
        const audioContext = resolveAudioContext(shot);

        // 3. Resolve Environmental/Style Context
        const styleContext = resolveStyleContext(project, shot);

        if (tools.includes('veo')) results.veo = VeoAdapter.generate(shot, characterContext, audioContext, styleContext);
        if (tools.includes('runway')) results.runway = RunwayAdapter.generate(shot, characterContext, audioContext, styleContext);
        if (tools.includes('luma')) results.luma = LumaAdapter.generate(shot, characterContext, audioContext, styleContext);
        if (tools.includes('kling')) results.kling = KlingAdapter.generate(shot, characterContext, audioContext, styleContext);
        if (tools.includes('pika')) results.pika = PikaAdapter.generate(shot, characterContext, audioContext, styleContext);

        return results;
    }
};

// --- HELPER FUNCTIONS ---

const resolveCharacterContext = (project: StratifyProject, shot: Shot): string => {
    // Find who is in the shot
    const subjectIds = shot.subjects.map(s => s.characterId);
    let descriptions: string[] = [];

    if (subjectIds.includes('lead') || (project.cast.lead && subjectIds.includes(project.cast.lead.characterId))) {
        const lead = project.cast.lead;
        let desc = `The Lead Singer (${lead.name}, ${lead.ageRange}, ${lead.genderPresentation})`;
        if (lead.lookSpec?.face) desc += `, ${lead.lookSpec.face}`;
        if (lead.wardrobeSignature) desc += `, wearing ${lead.wardrobeSignature.join(', ')}`;
        descriptions.push(desc);
    }

    project.cast.band.forEach(member => {
        if (subjectIds.includes(member.characterId)) {
            let desc = `${member.role} (${member.name})`;
            if (member.lookSpec?.face) desc += `, ${member.lookSpec.face}`;
            descriptions.push(desc);
        }
    });

    if (descriptions.length === 0) return "A cinematic subject";
    return descriptions.join(". Also visible: ");
};

const resolveAudioContext = (shot: Shot): string => {
    if (shot.audioSync?.lyricLineText) {
        return `The character is singing the line "${shot.audioSync.lyricLineText}", lips moving in perfect sync with the lyrics, passionate performance.`;
    }
    return "No speaking, natural expression.";
};

const resolveStyleContext = (project: StratifyProject, shot: Shot): string => {
    // Director Dials could influence this further
    const lighting = shot.lighting?.style || "dramatic lighting";
    const lens = shot.camera.lensFeel || "50mm prime lens";
    return `${lighting}. Shot on ${lens}. High fidelity, 8k, photorealistic textures, volumetric fog.`;
};


// --- ADAPTERS (STRICT RULES) ---

const VeoAdapter = {
    generate: (shot: Shot, charCtx: string, audioCtx: string, styleCtx: string): string => {
        // Veo 3.1 "Master Prompt" Structure:
        // [Medium/Shot Type] of [Subject + Visual DNA] [Action]. [Environment/Lighting]. [Camera Move]. [Technical Specs].

        const cam = shot.camera;
        let prompt = `${shot.shotType} of ${charCtx}. `;
        prompt += `${shot.action}. `;

        if (audioCtx.includes("singing")) {
            prompt += `${audioCtx}. `; // Explicit lip sync instruction
        }

        prompt += `${styleCtx} `;

        if (cam.movement !== 'locked') {
            prompt += `Camera movement: ${cam.movement} ${cam.angle ? `at ${cam.angle}` : ''}. `;
        }

        return prompt.trim();
    }
};

const RunwayAdapter = {
    generate: (shot: Shot, charCtx: string, audioCtx: string, styleCtx: string): string => {
        // Runway Gen-3 Structure:
        // [Camera Move]: [Subject] [Action]. [Style].
        const cam = shot.camera;
        const move = cam.movement === 'locked' ? 'Static' :
            cam.movement === 'pan' ? 'Pan' :
                cam.movement === 'tilt' ? 'Tilt' :
                    cam.movement === 'dolly-in' ? 'Zoom in' :
                        cam.movement;

        return `[${move}]: ${charCtx} performing ${shot.action}. ${audioCtx}. ${styleCtx}`;
    }
};

const LumaAdapter = {
    generate: (shot: Shot, charCtx: string, audioCtx: string, styleCtx: string): string => {
        return `${charCtx} ${shot.action}. ${audioCtx}. ${shot.camera.movement} camera motion. ${styleCtx}`;
    }
};

const KlingAdapter = {
    generate: (shot: Shot, charCtx: string, audioCtx: string, styleCtx: string): string => {
        return `High quality video, ${charCtx}, ${shot.action}, ${audioCtx}, ${shot.camera.movement}, ${styleCtx}`;
    }
};

const PikaAdapter = {
    generate: (shot: Shot, charCtx: string, audioCtx: string, styleCtx: string): string => {
        return `${charCtx} ${shot.action}. ${audioCtx}. ${styleCtx}. Camera: ${shot.camera.movement}.`;
    }
};
