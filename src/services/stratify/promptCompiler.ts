
import { Shot, StratifyProject } from "@/types/stratify";

export const PromptCompiler = {
    compile: (project: StratifyProject, shot: Shot, tools: ('veo' | 'runway' | 'pika' | 'luma' | 'kling')[]) => {
        const results: Record<string, string> = {};

        // 1. Resolve Character Details
        const characterContext = resolveCharacterContext(project, shot);

        // 2. Resolve Audio/Lip Sync
        const audioContext = resolveAudioContext(project, shot);

        // 3. Resolve Environmental/Style Context
        const styleContext = resolveStyleContext(project, shot);

        // 4. Resolve Composition
        const composition = shot.composition || "Cinematic composition";

        // 5. Resolve Action (FG/BG)
        const actionContext = resolveActionContext(shot);

        if (tools.includes('veo')) results.veo = VeoAdapter.generate(shot, characterContext, actionContext, audioContext, styleContext, composition, project);
        if (tools.includes('runway')) results.runway = RunwayAdapter.generate(shot, characterContext, actionContext, audioContext, styleContext, composition);
        if (tools.includes('luma')) results.luma = LumaAdapter.generate(shot, characterContext, actionContext, audioContext, styleContext, composition);
        if (tools.includes('kling')) results.kling = KlingAdapter.generate(shot, characterContext, actionContext, audioContext, styleContext, composition);
        if (tools.includes('pika')) results.pika = PikaAdapter.generate(shot, characterContext, actionContext, audioContext, styleContext, composition);

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

        if (lead.extractedVisuals) {
            desc += `. Visual DNA: ${lead.extractedVisuals.face}, ${lead.extractedVisuals.wardrobe}, ${lead.extractedVisuals.vibe}`;
        } else {
            if (lead.lookSpec?.face) desc += `, ${lead.lookSpec.face}`;
            if (lead.wardrobeSignature) desc += `, wearing ${lead.wardrobeSignature.join(', ')}`;
        }
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

const resolveAudioContext = (project: StratifyProject, shot: Shot): string => {
    let audio = "";

    // Lip Sync
    if (shot.audioSync?.lyricLineText) {
        audio += `The character is singing the line "${shot.audioSync.lyricLineText}", lips moving in perfect sync with the lyrics, passionate performance. `;
    } else {
        audio += "No speaking, natural expression. ";
    }

    // Audio Environment (Ambience) - User Request
    if (shot.audioEnvironment) {
        audio += `Audio Atmosphere: ${shot.audioEnvironment}. `;
    }

    // Background Music
    if (project.song) {
        audio += `Background Music: ${project.song.genre} track "${project.song.title}". `;
    }

    return audio.trim();
};

const resolveStyleContext = (project: StratifyProject, shot: Shot): string => {
    const scene = project.scenes.find(s => s.sceneId === shot.sceneId);

    // Environment & Weather - User Request
    let env = "";
    if (scene) {
        const location = project.locations.find(l => l.locationId === scene.locationId);
        if (location) {
            env = `${location.name}, ${location.description}. Time: ${location.timeOfDay}. Weather: ${location.weather}. `;
        }
        if (scene.mood.ambience) {
            env += `Ambience: ${scene.mood.ambience}. `;
        }
    }

    // Lighting & Style
    const lighting = shot.lighting?.style || "dramatic lighting";
    const lens = shot.camera.lensFeel || "50mm prime lens";
    const style = `${lighting}. Shot on ${lens}. High fidelity, 8k, photorealistic textures, volumetric fog.`;

    return `${env} ${style}`.trim();
};

const resolveActionContext = (shot: Shot): string => {
    const fg = shot.foregroundAction || shot.action || "Standard action";
    const bg = shot.backgroundAction ? `Background action: ${shot.backgroundAction}` : "";
    return `${fg}. ${bg}`.trim();
};


// --- ADAPTERS (STRICT RULES) ---

const VeoAdapter = {
    generate: (shot: Shot, charCtx: string, actionCtx: string, audioCtx: string, styleCtx: string, compCtx: string, project?: StratifyProject): string => {
        // Veo 3.1 "Master Prompt" Structure (Enhanced):
        // [Shot Type] of [Subject] [Action FG/BG]. [Composition]. [Environment/Weather]. [Camera Move]. [Audio].

        const cam = shot.camera;
        let prompt = `Cinematic ${shot.shotType} of ${charCtx}. `;
        prompt += `${actionCtx}. `; // Includes FG and BG
        prompt += `${compCtx}. `;
        prompt += `${styleCtx} `; // Includes Weather/Ambience

        if (cam.movement !== 'locked') {
            prompt += `Camera movement: ${cam.movement} ${cam.angle ? `at ${cam.angle}` : ''}. `;
        }

        // Specific Audio Header for Veo
        prompt += `\n[AUDIO]: ${audioCtx}`;
        if (project?.song.audioFile) {
            prompt += ` [REFERENCE: ${project.song.audioFile}]`;
        }

        return prompt.trim();
    }
};

const RunwayAdapter = {
    generate: (shot: Shot, charCtx: string, actionCtx: string, audioCtx: string, styleCtx: string, compCtx: string): string => {
        // Runway Gen-3 Structure:
        // [Camera Move]: [Subject] [Action]. [Env].
        const cam = shot.camera;
        const move = cam.movement === 'locked' ? 'Static' :
            cam.movement === 'pan' ? 'Pan' :
                cam.movement === 'tilt' ? 'Tilt' :
                    cam.movement === 'dolly-in' ? 'Zoom in' :
                        cam.movement;

        return `[${move}]: ${charCtx} performing ${actionCtx}. ${compCtx}. ${styleCtx}. ${audioCtx}`;
    }
};

const LumaAdapter = {
    generate: (shot: Shot, charCtx: string, actionCtx: string, audioCtx: string, styleCtx: string, compCtx: string): string => {
        return `${charCtx} ${actionCtx}. ${compCtx}. ${styleCtx}. ${audioCtx}. ${shot.camera.movement} camera motion.`;
    }
};

const KlingAdapter = {
    generate: (shot: Shot, charCtx: string, actionCtx: string, audioCtx: string, styleCtx: string, compCtx: string): string => {
        return `High quality video, ${charCtx}, ${actionCtx}, ${compCtx}, ${styleCtx}, ${audioCtx}, ${shot.camera.movement}`;
    }
};

const PikaAdapter = {
    generate: (shot: Shot, charCtx: string, actionCtx: string, audioCtx: string, styleCtx: string, compCtx: string): string => {
        return `${charCtx} ${actionCtx}. ${compCtx}. ${styleCtx}. ${audioCtx}. Camera: ${shot.camera.movement}.`;
    }
};
