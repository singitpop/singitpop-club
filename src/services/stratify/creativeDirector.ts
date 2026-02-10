
import { StratifyProject, Scene, Shot, LyricSection, Location, Character } from "@/types/stratify";
import { v4 as uuidv4 } from 'uuid';
import { LOCATIONS, LIGHTING_STYLES, CAMERA_MOVES, ACTIONS } from "./data/lexicon";

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
                l.visualNotes?.toLowerCase().split(' ').some(word => word.length > 3 && sectionText.includes(word))
            );

            // B. If no specific noun, match based on MOOD (from LyricAnalyst)
            if (!location) {
                const mood = section.emotion?.labels?.[0]; // e.g. "Melancholic"
                if (mood === "Melancholic" || mood === "Sad") location = LOCATIONS.find(l => l.name.includes("Rain") || l.name.includes("Misty"));
                else if (mood === "Euphoric" || mood === "Happy") location = LOCATIONS.find(l => l.name.includes("Field") || l.name.includes("Penthouse"));
                else if (mood === "Aggressive") location = LOCATIONS.find(l => l.name.includes("Alley") || l.name.includes("Bar"));
                else if (mood === "High Energy") location = LOCATIONS.find(l => l.name.includes("Studio") || l.name.includes("Void"));
            }

            // C. Fallback: Random but consistent
            if (!location) {
                location = LOCATIONS[Math.floor(Math.random() * LOCATIONS.length)];
            }

            // Ensure variety (don't use same location twice in a row if possible)
            if (scenes.length > 0 && scenes[scenes.length - 1].locationId === location.name) {
                location = LOCATIONS[(LOCATIONS.indexOf(location) + 1) % LOCATIONS.length];
            }

            const isHighEnergy = section.type === 'chorus' || section.type === 'bridge' || section.emotion?.labels?.[0] === "High Energy";

            // Use the lighting detected by Analyst if available, else infer
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
                const cameraMove = CAMERA_MOVES[Math.floor(Math.random() * CAMERA_MOVES.length)];

                // Construct Action Prompt
                const actionBase = isHighEnergy
                    ? ACTIONS.performance[Math.floor(Math.random() * ACTIONS.performance.length)]
                    : ACTIONS.narrative[Math.floor(Math.random() * ACTIONS.narrative.length)];

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
                    action: `${actionBase}.`,
                    promptIntent: {
                        visualStyle: `${lightingObj.name}, ${lightingObj.keyword}, 8k fidelity.`,
                        sceneDescription: `${location.name}: ${location.visualNotes}. ${actionBase}.`
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
