
import { StratifyProject, Scene, Shot, LyricSection, Location, Character, CameraMovement } from "@/types/stratify";
// @ts-ignore
import { v4 as uuidv4 } from 'uuid';
import { LOCATIONS, LIGHTING_STYLES, CAMERA_MOVES, ACTIONS, KEYWORD_MAPPINGS, VERB_MAPPINGS, PHYSICAL_CONTEXTS, ATMOSPHERIC_CONTEXTS } from "./data/lexicon";

export const CreativeDirector = {
    /**
     * Allocates scenes based on lyric structure and mood.
     */
    planScenes: (sections: LyricSection[], cast: { lead: Character, band: Character[] }): Scene[] => {
        const scenes: Scene[] = [];
        let sceneIndex = 1;

        // 1. Assign Locations based on Lyrics (or Random if generic)
        sections.forEach(section => {
            const sectionText = section.text.toLowerCase();

            // A. Try to match specific visual nouns first (Strongest Match)
            let location = LOCATIONS.find(l =>
                l.name && l.visualNotes?.toLowerCase().split(' ').some(word => word.length > 3 && sectionText.includes(word))
            );

            // B. If no specific noun, match based on MOOD (from LyricAnalyst)
            if (!location) {
                const mood = section.emotion?.labels?.[0]; // e.g. "Melancholic"
                if (mood === "Melancholic" || mood === "Sad") location = LOCATIONS.find(l => l.name?.includes("Rain") || l.name?.includes("Misty"));
                else if (mood === "Euphoric" || mood === "Happy") location = LOCATIONS.find(l => l.name?.includes("Field") || l.name?.includes("Penthouse"));
                else if (mood === "Aggressive") location = LOCATIONS.find(l => l.name?.includes("Alley") || l.name?.includes("Bar"));
                else if (mood === "High Energy") location = LOCATIONS.find(l => l.name?.includes("Studio") || l.name?.includes("Void"));
            }

            // C. Fallback: Random but consistent
            if (!location) {
                location = LOCATIONS[Math.floor(Math.random() * LOCATIONS.length)];
            }

            // Ensure variety (don't use same location twice in a row if possible)
            if (scenes.length > 0 && scenes[scenes.length - 1].locationId === location.name) {
                const idx = LOCATIONS.indexOf(location);
                // Safe wrap
                const nextIndex = (idx + 1) % LOCATIONS.length;
                location = LOCATIONS[nextIndex];
            }

            const isHighEnergy = section.type === 'chorus' || section.type === 'bridge' || section.emotion?.labels?.[0] === "High Energy";

            // Use the lighting detected by Analyst if available, else infer
            let lightingObj = LIGHTING_STYLES[0]; // Default

            // @ts-ignore
            if (section.emotion?.intensity && section.emotion.intensity > 0) {
                const mood = section.emotion?.labels?.[0];
                // @ts-ignore
                const match = Object.values(KEYWORD_MAPPINGS).find(m => m.vibe === mood);
                if (match) {
                    const found = LIGHTING_STYLES.find(l => l.name === match.lighting);
                    if (found) lightingObj = found;
                }
            } else {
                const lStyle = isHighEnergy
                    ? LIGHTING_STYLES.find(l => l.name.includes("Neon") || l.name.includes("Strobe"))
                    : LIGHTING_STYLES.find(l => l.name.includes("Cinematic") || l.name.includes("Moody"));
                if (lStyle) lightingObj = lStyle;
            }

            const scene: Scene = {
                sceneId: uuidv4(),
                index: sceneIndex++,
                title: `${section.type.toUpperCase()} @ ${location.name}`,
                mappedSectionIds: [section.sectionId],
                locationId: location.name || "Unknown", // Temporarily storing Name as ID for UI simplicity
                mood: {
                    keywords: [...(section.emotion?.labels || []), isHighEnergy ? "Dynamic" : "Atmospheric"],
                    lighting: lightingObj.name,
                    // Use location notes as color grade hint
                    colorGrade: location.visualNotes?.includes("Neon") ? "Cyberpunk" : "Natural"
                },
                shots: []
            };

            // 2. Generate Shots
            const lines = section.text.split('\n');

            lines.forEach((line, i) => {
                if (!line.trim()) return;

                const isWide = i === 0 || i === lines.length - 1; // Start/End on Wide
                const cameraMove = CAMERA_MOVES[Math.floor(Math.random() * CAMERA_MOVES.length)] as CameraMovement;

                // --- NARRATIVE ENGINE (V2) ---
                let actionBase = "";
                let contextSuffix = "";

                // 1. Identify Contexts from Lyrics
                let physicalContext: keyof typeof PHYSICAL_CONTEXTS | null = null;
                let atmosphericContext: string | null = null;

                if (section.narrative?.context) {
                    for (const ctx of section.narrative.context) {
                        if (PHYSICAL_CONTEXTS[ctx]) physicalContext = ctx;
                        if (ATMOSPHERIC_CONTEXTS[ctx]) atmosphericContext = ATMOSPHERIC_CONTEXTS[ctx];
                    }
                }

                // 2. Determine Action Base
                if (physicalContext) {
                    // A. STRICT OVERRIDE: If we are in a car/bed/water, ONLY use actions safe for that environment
                    const safeActions = PHYSICAL_CONTEXTS[physicalContext].actions;
                    actionBase = safeActions[Math.floor(Math.random() * safeActions.length)];
                } else {
                    // B. Default Verb Mapping (Standard)
                    if (section.narrative?.verbs && section.narrative.verbs.length > 0) {
                        const verb = section.narrative.verbs[i % section.narrative.verbs.length];
                        const possibleActions = VERB_MAPPINGS[verb];
                        if (possibleActions) {
                            actionBase = possibleActions[Math.floor(Math.random() * possibleActions.length)];
                        }
                    }
                }

                // 3. Fallback Action
                if (!actionBase) {
                    const actionList = isHighEnergy ? ACTIONS.performance : ACTIONS.narrative;
                    actionBase = actionList[Math.floor(Math.random() * actionList.length)];
                }

                // 4. Append Atmospheric Context (Safe Suffix)
                if (atmosphericContext) {
                    contextSuffix = ` ${atmosphericContext}`;
                }

                // 5. Anti-Repetition
                if (scene.shots.length > 0) {
                    const lastShot = scene.shots[scene.shots.length - 1];
                    // If we generated the exact same string, force a different random one or fallback
                    if (lastShot.action.includes(actionBase)) {
                        if (physicalContext) {
                            const safeActions = PHYSICAL_CONTEXTS[physicalContext].actions;
                            // Try to pick a different one
                            const others = safeActions.filter(a => a !== actionBase);
                            if (others.length > 0) actionBase = others[Math.floor(Math.random() * others.length)];
                        } else {
                            actionBase = ACTIONS.performance[Math.floor(Math.random() * ACTIONS.performance.length)];
                        }
                    }
                }

                // C. Fallback to Random Action if extracted verbs didn't produce a string
                if (!actionBase) {
                    const actionList = isHighEnergy ? ACTIONS.performance : ACTIONS.narrative;
                    actionBase = actionList[Math.floor(Math.random() * actionList.length)];
                }

                // D. Anti-Repetition (for fallback or generated)
                if (scene.shots.length > 0) {
                    const lastShot = scene.shots[scene.shots.length - 1];
                    if (lastShot.action.includes(actionBase)) {
                        // If we are repetitive, force a generic performance shot
                        actionBase = ACTIONS.performance[Math.floor(Math.random() * ACTIONS.performance.length)];
                    }
                }

                // Construct full action
                const finalAction = `${actionBase}${contextSuffix}.`;

                scene.shots.push({
                    shotId: uuidv4(),
                    index: i + 1,
                    durationSec: 4,
                    shotType: isWide ? 'WS' : (Math.random() > 0.5 ? 'CU' : 'MS'),
                    camera: {
                        movement: cameraMove,
                        angle: isWide ? 'eye-level' : 'low-angle',
                        lensFeel: isWide ? 'wide' : 'telephoto'
                    },
                    subjects: [{ characterId: cast.lead.characterId, purpose: 'singing' }],
                    action: finalAction,
                    promptIntent: {
                        visualStyle: `${lightingObj.name}, ${lightingObj.keyword}, 8k fidelity.`,
                        sceneDescription: `${location?.name || "Scene"}: ${location?.visualNotes || "Atmospheric"}. ${finalAction}`
                    },
                    audioSync: {
                        mode: 'lip-sync-lead',
                        lineText: line // CRITICAL: Inject the actual lyric line for lip sync/context
                    }
                });
            });

            scenes.push(scene);
        });

        return scenes;
    },

    suggestLocations: (theme: string): Location[] => {
        // Return our full rich list but cast as Location types
        return LOCATIONS.map(l => ({
            locationId: uuidv4(),
            name: l.name || "Unknown",
            type: 'studio',
            visualNotes: l.visualNotes || "",
            continuityRules: []
        }));
    }
};
