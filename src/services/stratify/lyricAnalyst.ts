
import { LyricSection, EmotionArcPoint, TimeRange } from "@/types/stratify";
import { v4 as uuidv4 } from 'uuid';

// Mock Sentiment Dictionary (In real app, use an NLP model or LLM)
const SENTIMENT_KEYWORDS = {
    romance: ["love", "heart", "kiss", "forever", "baby", "hold"],
    energy: ["dance", "party", "run", "fast", "fire", "burn"],
    melancholy: ["sad", "cry", "lonely", "tears", "gone", "miss"],
    dark: ["night", "blood", "kill", "dark", "shadow", "fear"],
    dreamy: ["sky", "cloud", "dream", "star", "fly", "float"]
};

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
                    sections.push(createSection(currentSectionType, currentLines, startLineIndex, bpm));
                    currentLines = [];
                }
                currentSectionType = 'chorus';
                startLineIndex = index + 1;
                return;
            }
            if (lower.match(/^\[?(verse)/)) {
                if (currentLines.length > 0) {
                    sections.push(createSection(currentSectionType, currentLines, startLineIndex, bpm));
                    currentLines = [];
                }
                currentSectionType = 'verse';
                startLineIndex = index + 1;
                return;
            }
            if (lower.match(/^\[?(bridge)/)) {
                if (currentLines.length > 0) {
                    sections.push(createSection(currentSectionType, currentLines, startLineIndex, bpm));
                    currentLines = [];
                }
                currentSectionType = 'bridge';
                startLineIndex = index + 1;
                return;
            }

            // If it's just a bracketed header we missed
            if (line.startsWith('[') && line.endsWith(']')) return;

            currentLines.push(line);
        });

        // Push final section
        if (currentLines.length > 0) {
            sections.push(createSection(currentSectionType, currentLines, startLineIndex, bpm));
        }

        return sections;
    },

    detectGenre: (lyrics: string): string => {
        const lower = lyrics.toLowerCase();
        if (lower.includes("truck") && lower.includes("beer")) return "Country";
        if (lower.includes("love") && lower.includes("baby")) return "Pop";
        if (lower.includes("dark") && lower.includes("night")) return "Alternative";
        return "Pop";
    }
};

function createSection(type: LyricSection['type'], lines: string[], startLine: number, bpm: number): LyricSection {
    const text = lines.join('\n');
    const moodScore = analyzeSentiment(text);

    // Estimate Duration: Average 3 seconds per line? Or use BPM.
    // At 120 BPM, a measure is 2s. A line is often 2-4 measures (4-8s).
    // Let's est 4 seconds per line.
    const duration = lines.length * 4;

    return {
        sectionId: uuidv4(),
        type,
        startLine,
        endLine: startLine + lines.length,
        text,
        emotion: moodScore,
        timeRange: {
            startSec: 0, // Placeholder, needs sequential calc
            endSec: duration
        }
    };
}

function analyzeSentiment(text: string): EmotionArcPoint {
    const lower = text.toLowerCase();
    const scores: Record<string, number> = { romance: 0, energy: 0, melancholy: 0, dark: 0, dreamy: 0 };

    Object.entries(SENTIMENT_KEYWORDS).forEach(([key, words]) => {
        words.forEach(w => {
            if (lower.includes(w)) scores[key]++;
        });
    });

    // Determine dominant mood labels
    const labels = Object.entries(scores)
        .filter(([_, score]) => score > 0)
        .sort((a, b) => b[1] - a[1])
        .slice(0, 2)
        .map(([k]) => k);

    return {
        valence: labels.includes('melancholy') || labels.includes('dark') ? -0.5 : 0.5,
        arousal: labels.includes('energy') ? 0.8 : 0.4,
        labels
    };
}
