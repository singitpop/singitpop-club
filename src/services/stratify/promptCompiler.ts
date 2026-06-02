
import { Shot, StratifyProject } from "@/types/stratify";


export const PromptCompiler = {
    compile: (project: StratifyProject, shot: Shot, tools: ('veo' | 'veo3' | 'imagen3' | 'runway' | 'pika' | 'luma' | 'kling')[]) => {
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
        if (tools.includes('veo3')) results.veo3 = VeoAdapter.generate(shot, characterContext, actionContext, audioContext, styleContext, composition, project);
        if (tools.includes('imagen3')) results.imagen3 = ImagenAdapter.generate(shot, characterContext, actionContext, audioContext, styleContext, composition);
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
    let action = shot.foregroundAction || shot.action || "Standard action";

    // START CHANGE: Append specific subject actions (e.g., "Singing passionately")
    const subjectActions = shot.subjects
        .filter(s => s.action)
        .map(s => `${s.purpose === 'singing' ? 'The singer is ' : ''}${s.action}`)
        .join(". ");

    if (subjectActions) {
        action += `. ${subjectActions}`;
    }
    // END CHANGE

    const bg = shot.backgroundAction ? `Background action: ${shot.backgroundAction}` : "";
    return `${action}. ${bg}`.trim();
};


// --- ADAPTERS (STRICT RULES) ---

const VeoAdapter = {
    generate: (shot: Shot, charCtx: string, actionCtx: string, audioCtx: string, styleCtx: string, compCtx: string, project?: StratifyProject): string => {
        let prompt = "";

        if (project?.project.outputSpec.veoTemplate) {
            const template = project.project.outputSpec.veoTemplate;
            const keywords = resolveVeoTemplateKeywords(template);
            prompt += `Style: ${template} (${keywords}). `;
        }

        if (shot.veoPrompt) {
            prompt += `${shot.veoPrompt} `;
        } else {
            prompt += `Cinematic ${shot.shotType} of ${charCtx}. ${actionCtx}. ${compCtx}. ${styleCtx} `;
            const cam = shot.camera;
            if (cam.movement !== 'locked') {
                const cameraDesc = resolveCameraMovementContext(cam.movement);
                prompt += `${cameraDesc} ${cam.angle !== 'eye-level' ? `Shot at ${cam.angle}` : ''}. `;
            }
        }

        prompt += `\n[AUDIO]: ${audioCtx}`;
        if (project?.song.audioFile) {
            prompt += ` [REFERENCE: ${project.song.audioFile}]`;
        }

        return prompt.trim();
    }
};

const resolveVeoTemplateKeywords = (template: string): string => {
    switch (template) {
        case 'Civilisation': return "Epic scale, historical grandeur, detailed architecture, atmospheric lighting";
        case 'Metallic': return "Chrome, polished surfaces, high contrast, sleek, futuristic industrial, cool tones";
        case 'Memo': return "Documentary style, natural lighting, handheld feel, raw texture, authentic";
        case 'Glam': return "High fashion, studio lighting, soft focus, elegant, luxurious, beauty shot";
        case 'Crochet': return "Wool texture, knitted, stop-motion animation style, soft lighting, tactile";
        case 'Video game': return "CGI render, game engine aesthetic, dynamic lighting, digital art";
        case 'Cosmos': return "Deep space, nebula, starlight, cinematic sci-fi, vast scale, ethereal";
        case 'Action hero': return "Blockbuster movie look, dramatic angles, high intensity, sharp focus, explosive energy";
        default: return "";
    }
};

const RunwayAdapter = {
    generate: (shot: Shot, charCtx: string, actionCtx: string, audioCtx: string, styleCtx: string, compCtx: string): string => {
        const moveCtx = resolveCameraMovementContext(shot.camera.movement);
        return `${moveCtx} ${charCtx} performing ${actionCtx}. ${compCtx}. ${styleCtx}. ${audioCtx}`;
    }
};

const LumaAdapter = {
    generate: (shot: Shot, charCtx: string, actionCtx: string, audioCtx: string, styleCtx: string, compCtx: string): string => {
        return `${charCtx} ${actionCtx}. ${compCtx}. ${styleCtx}. ${resolveCameraMovementContext(shot.camera.movement)}. ${audioCtx}.`;
    }
};

const KlingAdapter = {
    generate: (shot: Shot, charCtx: string, actionCtx: string, audioCtx: string, styleCtx: string, compCtx: string): string => {
        return `High quality video, ${charCtx}, ${actionCtx}, ${compCtx}, ${styleCtx}, ${audioCtx}, ${resolveCameraMovementContext(shot.camera.movement)}`;
    }
};

const PikaAdapter = {
    generate: (shot: Shot, charCtx: string, actionCtx: string, audioCtx: string, styleCtx: string, compCtx: string): string => {
        return `${charCtx} ${actionCtx}. ${compCtx}. ${styleCtx}. ${audioCtx}. ${resolveCameraMovementContext(shot.camera.movement)}.`;
    }
};

const ImagenAdapter = {
    generate: (shot: Shot, charCtx: string, actionCtx: string, audioCtx: string, styleCtx: string, compCtx: string): string => {
        if (shot.imagenPrompt) {
            return `${shot.imagenPrompt} High dynamic range, sharp focus.`.replace(/\.\./g, '.');
        }
        return `A photorealistic shot of ${charCtx}. ${actionCtx}. The scene features ${styleCtx}. ${compCtx}. ${resolveCameraMovementContext(shot.camera.movement)}. ${audioCtx}. Captured with high dynamic range and sharp focus.`;
    }
};

const resolveCameraMovementContext = (movement: Shot['camera']['movement']): string => {
    switch (movement) {
        // Foundation
        case 'dolly-in': return "The camera slowly dollies forward toward the subject, cinematic lighting, shallow depth of field.";
        case 'dolly-out': return "The camera slowly dollies backward away from the subject, revealing more of the environment.";
        case 'fast-dolly-in': return "The camera rushes quickly forward toward the subject, creating urgency and intensity.";
        case 'pan-left': return "The camera pans slowly to the left while keeping the subject centered in frame.";
        case 'pan-right': return "The camera pans slowly to the right while keeping the subject centered in frame.";
        case 'tilt-up': return "The camera tilts upward from the subject's feet to their face.";
        case 'tilt-down': return "The camera tilts downward from above, moving from the subject's face to their feet.";
        case 'truck-left': return "The camera slides laterally to the left with strong parallax between subject and background.";
        case 'truck-right': return "The camera slides laterally to the right with strong parallax between subject and background.";
        case 'pedestal-up': return "The camera rises vertically from waist level to eye level.";
        // Orbital
        case 'orbit-180': return "The camera orbits 180 degrees around the subject, shifting from a front view to a side profile.";
        case 'orbit-360': return "The camera circles a full 360 degrees around the subject.";
        case 'slow-cinematic-arc': return "The camera moves in a wide, slow arc around the subject in a smooth curved motion.";
        case 'crane-up': return "The camera cranes upward while tilting down to keep the subject framed, revealing the full environment.";
        case 'crane-down': return "The camera descends from a high angle down to eye level.";
        case 'crane-overhead': return "The camera sweeps upward and over the subject's head in a continuous arc, ending in a top-down view.";
        // Zoom
        case 'smooth-zoom-in': return "The camera remains static while slowly zooming in on the subject, background stays compressed.";
        case 'smooth-zoom-out': return "The camera remains static while slowly zooming out to reveal the full environment.";
        case 'crash-zoom-in': return "A sudden fast zoom into the subject's face with motion blur.";
        case 'crash-zoom-out': return "A rapid zoom out from close-up to wide shot in a fraction of a second.";
        case 'rack-focus': return "The shot begins with the subject in focus, then focus shifts to the background.";
        case 'reveal-from-blur': return "The frame starts heavily out of focus and gradually sharpens until the subject is crystal clear.";
        // Aerial
        case 'drone-flyover': return "A high-altitude aerial shot moving forward over the landscape, cinematic scale.";
        case 'epic-drone-reveal': return "The camera rises upward from behind an obstacle while tilting down to reveal the full scene.";
        case 'large-aerial-orbit': return "A wide aerial orbit around the environment from high altitude.";
        case 'overhead-top-down': return "The camera is positioned directly overhead looking straight down, slowly rotating.";
        case 'fpv-drone': return "Fast first-person drone movement diving forward and weaving through obstacles at high speed.";
        case 'aerial-pullback': return "The camera pulls backward and upward, making the subject shrink within the expanding landscape.";
        // Subject Tracking
        case 'leading-shot': return "The subject walks toward the camera while the camera moves backward at the same pace, maintaining distance.";
        case 'following-shot': return "The subject walks away from the camera while the camera follows behind at the same speed.";
        case 'side-tracking': return "The subject moves forward while the camera tracks alongside from the side with background motion blur.";
        case 'pov-walk': return "First-person walking motion with natural handheld bobbing, moving forward toward the subject.";
        // Creative
        case 'dolly-zoom': return "The camera moves backward while simultaneously zooming in, keeping the subject the same size while the background stretches.";
        case 'through-shot': return "The camera moves forward through a foreground object to reveal the scene behind it.";
        case 'reveal-from-behind': return "The camera slides sideways from behind an obstacle, gradually revealing the subject.";
        case 'dutch-angle': return "The camera is tilted diagonally on its axis, creating a tense, off-balance composition.";
        case 'whip-pan': return "The camera whips rapidly to the side with heavy motion blur, transitioning to a new subject.";
        case 'handheld-documentary': return "Natural handheld camera shake and subtle human movement while following the subject.";
        default: return "Static locked-off camera.";
    }
};

// --- MASTER PROMPT (for Google Flow / Veo) ---
// Placed after all helpers to avoid temporal dead zone with const declarations

const resolveLensFeel = (shotType: Shot['shotType']): string => {
    switch (shotType) {
        case 'EWS': return '24mm wide cinematic lens, full environmental depth';
        case 'WS': return '35mm cinematic lens, shallow depth of field';
        case 'MS': return '50mm portrait lens, soft background bokeh';
        case 'MCU': return '50mm portrait lens, shallow depth of field, creamy bokeh';
        case 'CU': return '85mm portrait lens, very shallow depth of field, subject isolated';
        case 'ECU': return '100mm+ macro-portrait lens, extreme shallow depth, skin detail visible';
        default: return '50mm cinematic lens';
    }
};

const resolveFaceProminence = (shotType: Shot['shotType']): 'high' | 'medium' | 'low' => {
    if (shotType === 'CU' || shotType === 'ECU') return 'high';
    if (shotType === 'MCU' || shotType === 'MS') return 'medium';
    return 'low';
};

const resolveFlowMode = (shotType: Shot['shotType'], hasLipSync: boolean): string => {
    const prominence = resolveFaceProminence(shotType);
    if (prominence === 'high') return '🔴 USE QUALITY MODE — close face + lip sync visible';
    if (prominence === 'medium' && hasLipSync) return '🟡 USE QUALITY MODE — lips partially visible';
    if (prominence === 'medium') return '🟡 FAST OK — medium shot, face stable';
    return '🟢 FAST OK — wide/profile shot, face not dominant';
};

export const compileMasterPrompt = (project: StratifyProject, shot: Shot): string => {
    const characterContext = resolveCharacterContext(project, shot);
    const audioContext = resolveAudioContext(project, shot);
    const styleContext = resolveStyleContext(project, shot);
    const composition = shot.composition || 'Cinematic composition';
    const actionContext = resolveActionContext(shot);
    const cameraMovement = resolveCameraMovementContext(shot.camera.movement);
    const lensFeel = resolveLensFeel(shot.shotType);
    const hasLipSync = !!shot.audioSync?.lyricLineText;
    const bpm = (project.song as any).bpm as number | undefined;

    const parts: string[] = [];

    // ── Flow mode hint (not part of the prompt text, shown separately) ──
    const flowModeHint = resolveFlowMode(shot.shotType, hasLipSync);

    // ── Subject + action ──
    parts.push(`Cinematic ${shot.shotType} of ${characterContext}.`);
    parts.push(actionContext + '.');

    // ── Performance direction ──
    const prominence = resolveFaceProminence(shot.shotType);
    if (hasLipSync && shot.audioSync?.lyricLineText) {
        const bpmLine = bpm ? ` in a slow ${bpm} BPM R&B rhythm with long natural breath spacing between phrases` : '';
        parts.push(
            `He sings${bpmLine}: "${shot.audioSync.lyricLineText}". ` +
            `Natural lip movement, ${prominence === 'high' ? 'minimal head movement, restrained jaw, soft eyes' : 'mouth partially visible — prioritise mood over lip precision'}.`
        );
    } else {
        parts.push(`Mouth closed. No lip movement. No dialogue. Calm, grounded expression.`);
    }

    // ── Camera movement ──
    if (shot.camera.movement !== 'locked') {
        parts.push(cameraMovement);
    } else {
        parts.push(`Camera: locked-off tripod shot. No zoom. No orbit. No auto-reframing.`);
    }
    // Always add camera lock guard against AI over-animation
    parts.push(`No zoom oscillation. No pull-back zoom. No automatic reframing. No handheld shake unless specified.`);

    if (shot.camera.angle && shot.camera.angle !== 'eye-level') {
        parts.push(`Camera angle: ${shot.camera.angle}.`);
    }

    // ── Lens ──
    parts.push(`Lens: ${lensFeel}.`);

    // ── Composition ──
    parts.push(`${composition}.`);

    // ── Style / environment ──
    parts.push(styleContext + '.');

    // ── Veo template ──
    if (project.project.outputSpec.veoTemplate) {
        const keywords = resolveVeoTemplateKeywords(project.project.outputSpec.veoTemplate);
        parts.push(`Visual Style: ${project.project.outputSpec.veoTemplate} — ${keywords}.`);
    }

    // ── Audio ──
    parts.push(`[AUDIO]: ${audioContext}`);
    if (project.song.audioFile) parts.push(`[REFERENCE: ${project.song.audioFile}]`);

    // ── Global artifact prevention (always last) ──
    parts.push(
        `Cinematic realism, 24fps motion cadence, natural skin texture, smooth motion. ` +
        `No facial warping. No extra limbs. No morphing artifacts. ` +
        `No text, no logos, no watermark, no branding marks, no overlays, no captions, no subtitles anywhere in the frame.`
    );

    const promptText = parts.filter(Boolean).join(' ').replace(/\.\s*\./g, '.').trim();

    // Prepend the Flow mode hint as a header line
    return `${flowModeHint}\n\n${promptText}`;
};
