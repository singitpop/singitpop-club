
import { StratifyProject, Scene, Shot, LyricSection, Location, Character } from "@/types/stratify";
import { v4 as uuidv4 } from 'uuid';

export const CreativeDirector = {
    /**
     * Allocates scenes based on lyric structure and mood.
     */
    planScenes: (sections: LyricSection[], cast: { lead: Character, band: Character[] }): Scene[] => {
        const scenes: Scene[] = [];
        let sceneIndex = 1;

        // Create a default location
        const baseLocationId = uuidv4();

        sections.forEach(section => {
            // Determine Scene Type based on Section Type
            let actionType = "Performance";
            let cameraStyle = "Dynamic";

            if (section.type === 'intro' || section.type === 'outro') {
                actionType = "Atmospheric / Establishing";
                cameraStyle = "Wide / Fixed";
            } else if (section.type === 'chorus') {
                actionType = "High Energy Performance";
                cameraStyle = "Fast / Handheld";
            }

            const scene: Scene = {
                sceneId: uuidv4(),
                index: sceneIndex++,
                title: `${section.type.toUpperCase()} - ${section.emotion?.labels?.[0] || 'Vibe'}`,
                mappedSectionIds: [section.sectionId],
                locationId: baseLocationId,
                mood: {
                    keywords: section.emotion?.labels || [],
                    lighting: section.type === 'chorus' ? "Strobe / Dynamic" : "Cinematic",
                    colorGrade: "Teal & Orange"
                },
                shots: []
            };

            // Generate Basic Shot List (1 shot per 4 lines approx)
            const lines = section.text.split('\n').length;
            const shotCount = Math.max(1, Math.ceil(lines / 2));

            for (let i = 0; i < shotCount; i++) {
                scene.shots.push({
                    shotId: uuidv4(),
                    index: i + 1,
                    durationSec: 4, // Default
                    shotType: i === 0 ? 'WS' : (i % 2 === 0 ? 'MS' : 'CU'),
                    camera: {
                        movement: 'dolly-in',
                        angle: 'eye-level',
                        lensFeel: 'normal'
                    },
                    subjects: [{ characterId: cast.lead.characterId, purpose: 'singing' }],
                    action: `${actionType} - ${cast.lead.name} performing`,
                    promptIntent: {
                        visualStyle: "Cinematic 8k",
                        sceneDescription: `${actionType} in ${section.emotion?.labels?.[0]} lighting.`
                    },
                    audioSync: {
                        mode: 'lip-sync-lead',
                        lineText: "Example line..."
                    }
                });
            }

            scenes.push(scene);
        });

        return scenes;
    },

    /**
     * Generates a Mood Board / Suggests Locations (Mock)
     */
    suggestLocations: (theme: string): Location[] => {
        return [
            {
                locationId: uuidv4(),
                name: "Neon Studio",
                type: 'studio',
                visualNotes: "Dark space with geometric neon lights",
                continuityRules: ["Keep lights blue/pink"]
            },
            {
                locationId: uuidv4(),
                name: "Rooftop at Night",
                type: 'exterior',
                visualNotes: "City skyline bokeh in background",
                continuityRules: ["Wet pavement reflection"]
            }
        ];
    }
};
