
import { StratifyProject, ProjectMeta, Song, Cast, Location } from "@/types/stratify";
import { LyricAnalyst } from "./lyricAnalyst";
import { CreativeDirector } from "./creativeDirector";
import { PromptCompiler } from "./promptCompiler";
import { v4 as uuidv4 } from 'uuid';

export const StratifyAI = {
    /**
     * Initialize a new project from Lyrics + Basics
     */
    initProject: async (title: string, rawLyrics: string, artistName: string): Promise<StratifyProject> => {

        // 1. Analyze Lyrics
        const sections = LyricAnalyst.analyze(rawLyrics);
        const genre = LyricAnalyst.detectGenre(rawLyrics);

        // 2. Default Cast (User will edit later)
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

        // 3. Creative Direction (Initial Pass)
        const scenes = CreativeDirector.planScenes(sections, cast);
        const locations = CreativeDirector.suggestLocations("General");

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
                    stylePreset: "Cinematic Blocked",
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
