import { LyricSection, EmotionArcPoint } from "@/types/stratify";
// @ts-ignore
import { v4 as uuidv4 } from 'uuid';
import { LOCATIONS, LIGHTING_STYLES } from "./data/lexicon";

export const LyricAnalyst = {
    /**
     * Parses raw lyrics into structured sections with estimated timing and emotion.
     */
    analyze: (rawText: string, bpm: number = 120): LyricSection[] => {
        const lines = rawText.split('\n').map(l => l.trim()).filter(l => l);
        const sections: LyricSection[] = [];

        let currentSectionType: LyricSection['type'] = 'verse';
        let currentLines: string[] = [];
        let startLineIndex = 0;

        // Simple heuristic parser
        lines.forEach((line, index) => {
            const lower = line.toLowerCase();

            // Detect Section Headers
            if (lower.match(/^\[?(chorus|hook)/)) {
                if (currentLines.length > 0) {
                    sections.push(createSection(currentSectionType, currentLines, startLineIndex));
                    currentLines = [];
                }
                currentSectionType = 'chorus';
                startLineIndex = index + 1;
                return;
            }
            if (lower.match(/^\[?(verse)/)) {
                if (currentLines.length > 0) {
                    sections.push(createSection(currentSectionType, currentLines, startLineIndex));
                    currentLines = [];
                }
                currentSectionType = 'verse';
                startLineIndex = index + 1;
                return;
            }
            if (lower.match(/^\[?(bridge)/)) {
                if (currentLines.length > 0) {
                    sections.push(createSection(currentSectionType, currentLines, startLineIndex));
                    currentLines = [];
                }
                currentSectionType = 'bridge';
                startLineIndex = index + 1;
                return;
            }

            // Shield against simple brackets
            if (line.startsWith('[') && line.endsWith(']')) return;

            currentLines.push(line);
        });

        // Push final section
        if (currentLines.length > 0) {
            sections.push(createSection(currentSectionType, currentLines, startLineIndex));
        }

        return sections;
    },

    detectGenre: (lyrics: string): string => {
        const lower = lyrics.toLowerCase();
        if (lower.includes("truck") && lower.includes("beer")) return "Country";
        if (lower.includes("love") && lower.includes("baby")) return "Pop";
        if (lower.includes("dark") && lower.includes("night")) return "Alternative";
        if (lower.includes("flow") && lower.includes("money")) return "Hip Hop";
        return "Pop";
    }
};

import { KEYWORD_MAPPINGS, VERB_MAPPINGS, CONTEXT_MAPPINGS } from "./data/lexicon";

function createSection(type: LyricSection['type'], lines: string[], startLine: number): LyricSection {
    const text = lines.join('\n');
    const moodScore = analyzeVisualSentiment(text);
    const narrativeData = analyzeNarrative(text);

    // Estimate Duration (approx 4s per line)
    const duration = lines.length * 4;

    return {
        sectionId: uuidv4(),
        type,
        startLine,
        endLine: startLine + lines.length,
        text,
        emotion: moodScore,
        narrative: narrativeData,
        timeRange: {
            startSec: 0,
            endSec: duration
        }
    };
}

function analyzeNarrative(text: string) {
    const lower = text.toLowerCase();
    const words = lower.replace(/[^a-z0-9 ]/g, '').split(' ');

    // 1. Extract Verbs
    // Simple robust matching: check if any conjugated form (run, running, ran) matches our keys
    // For MVP, we simply check if the text *contains* the key verb string (e.g. "crying" contains "cry")
    const foundVerbs = Object.keys(VERB_MAPPINGS).filter(verb => {
        // We look for the root verb in the text. 
        // "running" includes "run", "cried" includes "cri" (wait, English is hard).
        // Let's stick to simple "includes" for now or exact word match if possible.
        return lower.includes(verb);
    });

    // 2. Extract Context
    const foundContext = Object.keys(CONTEXT_MAPPINGS).filter(ctx => lower.includes(ctx));

    // 3. Extract Subjects (Simple list)
    const possibleSubjects = ["i", "you", "we", "he", "she", "they", "it"];
    const foundSubjects = possibleSubjects.filter(sub => words.includes(sub));

    return {
        verbs: foundVerbs,
        subjects: foundSubjects,
        context: foundContext
    };
}

function analyzeVisualSentiment(text: string): EmotionArcPoint {
    const lower = text.toLowerCase();

    // Scoring
    const scores: Record<string, number> = {};
    let maxScore = 0;
    let dominantCategory = "cinematic"; // Default

    Object.entries(KEYWORD_MAPPINGS).forEach(([category, data]) => {
        let score = 0;
        data.keywords.forEach(k => {
            // Regex for whole word match to avoid "light" matching "flight"
            const regex = new RegExp(`\\b${k}\\b`, 'i');
            if (regex.test(lower)) score += 1;
            // Also partial matches for flexibility? Maybe just stick to regex for now.
            else if (lower.includes(k)) score += 0.5;
        });
        scores[category] = score;
        if (score > maxScore) {
            maxScore = score;
            dominantCategory = category;
        }
    });

    // Default Vibe
    let labels: string[] = ["Cinematic"];
    let lighting = "Cinematic Teal & Orange"; // Default
    let intensity = 0.5;

    if (maxScore > 0) {
        // @ts-ignore
        const match = KEYWORD_MAPPINGS[dominantCategory];
        labels = [match.vibe];
        lighting = match.lighting;
        intensity = Math.min(1, maxScore * 0.3); // Cap at 1
    }

    return {
        valence: 0.5,
        arousal: intensity,
        labels
    };
}
