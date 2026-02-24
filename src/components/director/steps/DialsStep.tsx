
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

    const [isAnalyzing, setIsAnalyzing] = React.useState(false);
    const dials = project.project.directorProfile.influenceDials;
    const [directorNote, setDirectorNote] = React.useState(project.project.directorProfile.notes || "");

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

    // Update project when note changes (debounced or on blur/submit)
    const updateDirectorNote = (note: string) => {
        setDirectorNote(note);
        updateProject({
            ...project,
            project: {
                ...project.project,
                directorProfile: {
                    ...project.project.directorProfile,
                    notes: note
                }
            }
        });
    };

    const runAutoAnalysis = async () => {
        setIsAnalyzing(true);
        try {
            console.log('[DialsStep] Starting auto-analysis...');
            console.log('[DialsStep] Song:', project.song.title);

            const res = await fetch('/api/director/analyze', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    song: project.song,
                    project: project.project
                })
            });

            console.log('[DialsStep] Response status:', res.status);

            if (!res.ok) {
                const errorText = await res.text();
                console.error('[DialsStep] API Error:', errorText);
                throw new Error(`API returned ${res.status}: ${errorText}`);
            }

            const data = await res.json();
            console.log('[DialsStep] Received analysis data:', data);

            // Check if response has error property
            if (data.error) {
                throw new Error(data.error);
            }

            // Validate response format
            if (!data.dials || typeof data.dials.blockingPrecision !== 'number') {
                console.error('[DialsStep] Invalid response format:', data);
                throw new Error('Invalid response format - missing dial values');
            }

            // Apply Dials, Themes, and Treatments
            console.log('[DialsStep] Applying AI vision to project...');

            updateProject({
                ...project,
                treatments: data.treatments || [], // Save generated treatments
                project: {
                    ...project.project,
                    directorProfile: {
                        ...project.project.directorProfile,
                        influenceDials: data.dials,
                        coreThemes: data.coreThemes || [] // Save extracted themes
                    }
                }
            });
            console.log('[DialsStep] Vision applied successfully!');

        } catch (e: any) {
            console.error("[DialsStep] Analysis failed:", e);
            if (e.message?.includes('429')) {
                alert(`The Director AI is currently experiencing high traffic (Error 429: Too Many Requests).\n\nYou can bypass this error! Simply scroll down and click the 'Generate Treatments →' button at the bottom of the page to proceed using our fallback presets.`);
            } else {
                alert(`Director analysis failed: ${e.message}\n\nPlease check the console for details or set dials manually.`);
            }
        } finally {
            setIsAnalyzing(false);
        }
    };

    return (
        <div className="space-y-8 max-w-5xl mx-auto">
            <div className="text-center space-y-4">
                <h2 className="text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-emerald-400 to-cyan-500">
                    Director's Influence Dials
                </h2>
                <p className="text-gray-400">Review the AI Director's vision. Tweak if you disagree.</p>

                {/* DIRECTOR'S NOTE INPUT */}
                <div className="mb-6 w-full max-w-2xl mx-auto">
                    <label className="block text-sm font-bold text-gray-400 mb-2 uppercase tracking-wide">
                        Director's Note (Optional)
                    </label>
                    <textarea
                        className="w-full bg-gray-900/50 border border-gray-700 rounded-lg p-3 text-white text-sm focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500 transition-all placeholder-gray-600"
                        placeholder="e.g. 'A 90s grunge performance in a garage', 'Neon chases in heavy rain', 'Quiet emotional close-ups in black and white'..."
                        rows={3}
                        value={directorNote}
                        onChange={(e) => updateDirectorNote(e.target.value)}
                    />
                    <p className="text-xs text-gray-500 mt-1 text-right">
                        Give the AI a specific vision to guide the treatments.
                    </p>
                </div>

                <button
                    onClick={runAutoAnalysis}
                    disabled={isAnalyzing}
                    className="flex items-center gap-2 mx-auto px-6 py-2 bg-purple-900/50 hover:bg-purple-900 border border-purple-500 rounded-full text-purple-200 text-sm font-bold transition-all disabled:opacity-50"
                >
                    {isAnalyzing ? (
                        <span className="animate-spin">⚡</span>
                    ) : (
                        <span>✨</span>
                    )}
                    {isAnalyzing ? "Director is Analyzing Song..." : "Ask Director to Generate Treatments"}
                </button>

                {/* VEO TEMPLATE SELECTOR */}
                <div className="mt-8 mb-4">
                    <h3 className="text-sm font-bold text-gray-400 uppercase tracking-wider mb-3">
                        Veo visual style template
                    </h3>
                    <div className="flex flex-wrap justify-center gap-2">
                        {['Civilisation', 'Metallic', 'Memo', 'Glam', 'Crochet', 'Video game', 'Cosmos', 'Action hero'].map((t) => (
                            <button
                                key={t}
                                onClick={() => updateProject({
                                    ...project,
                                    project: {
                                        ...project.project,
                                        outputSpec: {
                                            ...project.project.outputSpec,
                                            veoTemplate: t as any
                                        }
                                    }
                                })}
                                className={`px-4 py-2 rounded-lg text-xs font-bold transition-all border ${project.project.outputSpec.veoTemplate === t
                                    ? 'bg-emerald-500 text-black border-emerald-400 shadow-lg shadow-emerald-500/20'
                                    : 'bg-gray-900/50 text-gray-400 border-gray-700 hover:border-gray-500 hover:text-white'
                                    }`}
                            >
                                {t}
                            </button>
                        ))}
                    </div>
                </div>

                {/* CORE THEMES DISPLAY */}
                {project.project.directorProfile.coreThemes && project.project.directorProfile.coreThemes.length > 0 && (
                    <motion.div
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="mt-4 flex flex-wrap justify-center gap-2"
                    >
                        {project.project.directorProfile.coreThemes.map((theme, i) => (
                            <span key={i} className="px-3 py-1 bg-emerald-900/30 border border-emerald-500/30 text-emerald-300 text-xs rounded-full uppercase tracking-wider font-mono">
                                {theme}
                            </span>
                        ))}
                    </motion.div>
                )}
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
                    ← Back to Sync Setup
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
