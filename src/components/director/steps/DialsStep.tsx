
import React from 'react';
import { StratifyProject, InfluenceDials } from '@/types/stratify';
import { motion } from 'framer-motion';

interface StepProps {
    project: StratifyProject;
    updateProject: (p: any) => void;
    onNext: () => void;
    onBack: () => void;
}

const DIAL_CONFIG: { key: keyof InfluenceDials; label: string; desc: string }[] = [
    { key: 'blockingPrecision', label: "Blocking Precision", desc: "Complex staging & movement vs. static placement." },
    { key: 'motivatedCamera', label: "Motivated Camera", desc: "Camera moves only when the story demands it." },
    { key: 'wonderAndScale', label: "Wonder & Scale", desc: "Epic wide shots, crane reveals, and drone views." },
    { key: 'intimateEmotion', label: "Intimate Emotion", desc: "Tight close-ups, shallow depth of field." },
    { key: 'rhythmicMontage', label: "Rhythmic Montage", desc: "Fast cuts synced to the beat." },
    { key: 'naturalism', label: "Naturalism", desc: "Handheld camera, documentary feel." },
    { key: 'stylizedSymmetry', label: "Stylized Symmetry", desc: "Perfectly centered, Wes Anderson-style framing." },
    { key: 'highContrastMood', label: "High Contrast", desc: "Deep shadows, neon lights, noir aesthetic." },
    { key: 'longTakeConfidence', label: "Long Takes", desc: "Extended shots (6-12s) without cutting." },
    { key: 'iconicHeroFrames', label: "Iconic Hero Frames", desc: "Poster-worthy composition for key moments." },
];

export const DialsStep: React.FC<StepProps> = ({ project, updateProject, onNext, onBack }) => {

    const dials = project.project.directorProfile.influenceDials;

    const handleDialChange = (key: keyof InfluenceDials, val: number) => {
        updateProject({
            ...project,
            project: {
                ...project.project,
                directorProfile: {
                    ...project.project.directorProfile,
                    influenceDials: {
                        ...dials,
                        [key]: val
                    }
                }
            }
        });
    };

    return (
        <div className="space-y-8 max-w-5xl mx-auto">
            <div className="text-center space-y-2">
                <h2 className="text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-emerald-400 to-cyan-500">
                    Director's Influence Dials
                </h2>
                <p className="text-gray-400">Fine-tune the visual DNA of your music video.</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-8 p-8 bg-black/40 rounded-2xl border border-gray-800">
                {DIAL_CONFIG.map((dial) => (
                    <div key={dial.key} className="space-y-2 group">
                        <div className="flex justify-between items-end">
                            <label className="font-bold text-gray-200 group-hover:text-emerald-400 transition-colors">
                                {dial.label}
                            </label>
                            <span className="text-xs font-mono text-emerald-500">{dials[dial.key]}%</span>
                        </div>
                        <p className="text-xs text-gray-500 h-4">{dial.desc}</p>
                        <input
                            type="range"
                            min="0" max="100"
                            value={dials[dial.key]}
                            onChange={(e) => handleDialChange(dial.key, parseInt(e.target.value))}
                            className="w-full accent-emerald-500 h-2 bg-gray-800 rounded-lg appearance-none cursor-pointer"
                        />
                    </div>
                ))}
            </div>

            <div className="flex justify-between pt-8">
                <button
                    onClick={onBack}
                    className="px-6 py-3 text-gray-400 hover:text-white font-bold"
                >
                    ← Back to Intake
                </button>
                <button
                    onClick={onNext}
                    className="px-8 py-3 bg-white text-black rounded-full font-bold text-lg hover:scale-105 transition-transform"
                >
                    Generate Treatments →
                </button>
            </div>
        </div>
    );
};
