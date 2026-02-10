
import { LyricSection, EmotionArcPoint } from "@/types/stratify";
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

function createSection(type: LyricSection['type'], lines: string[], startLine: number): LyricSection {
    const text = lines.join('\n');
    const moodScore = analyzeVisualSentiment(text);

    // Estimate Duration (approx 4s per line)
    const duration = lines.length * 4;

    return {
        sectionId: uuidv4(),
        type,
        startLine,
        endLine: startLine + lines.length,
        text,
        emotion: moodScore,
        timeRange: {
            startSec: 0,
            endSec: duration
        }
    };
}

import { KEYWORD_MAPPINGS } from "./data/lexicon";

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
        labels,
        // We're pivoting 'intensity' to store our suggest lighting style key for now
        intensity // This will be passed to CreativeDirector
    };
}
