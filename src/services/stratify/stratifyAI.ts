
import { StratifyProject, ProjectMeta, Song, Cast, Location, Scene } from "@/types/stratify";
import { LyricAnalyst } from "./lyricAnalyst";
import { CreativeDirector } from "./creativeDirector";
import { PromptCompiler } from "./promptCompiler";
import { v4 as uuidv4 } from 'uuid';

export const StratifyAI = {
    /**
     * Initialize a new project from Lyrics + Basics
     */
    initProject: async (title: string, rawLyrics: string, artistName: string, aiData?: any): Promise<StratifyProject> => {

        // 1. Analyze Lyrics (Always needed for structure)
        const sections = LyricAnalyst.analyze(rawLyrics);
        const genre = LyricAnalyst.detectGenre(rawLyrics);

        // 2. Default Cast
        const leadId = uuidv4();
        const cast: Cast = {
            lead: {
                characterId: leadId,
                name: artistName || "Lead Singer",
                role: 'lead-singer',
                lookSpec: { style: 'realistic' },
                consistency: { strictness: 'high' }
            },
            band: []
        };

        // 3. Creative Direction
        let scenes: Scene[] = [];
        let locations: Location[] = [];

        if (aiData && aiData.scenes) {
            // --- AI VISIONARY PATH ---
            scenes = aiData.scenes.map((s: any, idx: number) => ({
                sceneId: uuidv4(),
                index: idx + 1,
                title: s.title || `Scene ${idx + 1}`,
                locationId: s.location, // Approximate mapping
                mood: {
                    keywords: [s.mood],
                    lighting: s.lighting,
                    colorGrade: "Cinematic"
                },
                shots: [
                    {
                        shotId: uuidv4(),
                        index: 1,
                        durationSec: 4,
                        shotType: 'WS',
                        camera: {
                            movement: s.camera.toLowerCase().includes('track') ? 'tracking' : 'pan',
                            angle: 'eye-level',
                            lensFeel: 'wide'
                        },
                        subjects: [{ characterId: leadId, purpose: 'singing' }],
                        action: s.action, // THE AI MAGIC TEXT
                        promptIntent: {
                            visualStyle: `Cinematic, ${s.lighting}, 8k fidelity`,
                            sceneDescription: s.action
                        },
                        audioSync: { mode: 'none' }
                    }
                ]
            }));

            // Generate Locations from AI Scenes
            locations = aiData.scenes.map((s: any) => ({
                locationId: uuidv4(),
                name: s.location,
                type: 'exterior', // Default
                visualNotes: s.location
            }));

        } else {
            // --- PROCEDURAL FALLBACK ---
            scenes = CreativeDirector.planScenes(sections, cast);
            locations = CreativeDirector.suggestLocations("General");
        }

        // 4. Build Project Object
        const project: StratifyProject = {
            schemaVersion: "1.0.0",
            project: {
                projectId: uuidv4(),
                title,
                artistName,
                createdAt: new Date().toISOString(),
                updatedAt: new Date().toISOString(),
                directorProfile: {
                    stylePreset: aiData ? "AI Visionary" : "Cinematic Blocked",
                    coveragePreference: "standard",
                    cameraLanguage: {
                        allowedMovements: ['dolly-in', 'pan', 'handheld'],
                        defaultLensFeel: 'normal'
                    }
                },
                outputSpec: {
                    aspectRatio: '16:9',
                    resolution: '1080p',
                    fps: 24,
                    deliverables: ['prompt-pack']
                }
            },
            song: {
                songId: uuidv4(),
                title,
                language: 'en',
                genre,
                lyrics: { rawText: rawLyrics },
                sections
            },
            cast,
            locations,
            scenes,
            timeline: { items: [] }
        };

        return project;
    },

    /**
     * Generate Prompts for a specific tool for the whole project
     */
    generatePromptPack: (project: StratifyProject, tool: 'veo' | 'runway' | 'pika' | 'luma') => {
        const prompts: any[] = [];
        project.scenes.forEach(scene => {
            scene.shots.forEach(shot => {
                const result = PromptCompiler.compile(shot, project.project.title, [tool]);
                prompts.push({
                    sceneId: scene.sceneId,
                    shotId: shot.shotId,
                    prompt: result[tool]
                });
            });
        });
        return prompts;
    }
};
