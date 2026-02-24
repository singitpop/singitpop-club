
import React, { useState } from 'react';
import { StratifyProject, InfluenceDials } from '@/types/stratify';
import { AnimatePresence, motion } from 'framer-motion';
import { IntakeStep } from './steps/IntakeStep';
import { DialsStep } from './steps/DialsStep';
import { TreatmentStep } from './steps/TreatmentStep';
import { LocationStep } from './steps/LocationStep';
import { SyncStep } from './steps/SyncStep';
import { ScriptView } from './steps/ScriptView';

// DEFAULT STATE
const initialProject: Partial<StratifyProject> = {
    song: {
        title: '',
        artist: '',
        bpm: 120,
        genre: '',
        audioFile: '',
        lyrics: { rawText: '' },
        moodKeywords: []
    },
    cast: {
        lead: { characterId: 'lead-1', name: 'Lead Singer', role: 'lead', genderPresentation: 'female', ageRange: '20s', lookSpec: {}, wardrobeSignature: [] },
        band: [],
        principals: []
    },
    locations: [
        { locationId: 'loc-1', name: 'Main Set', description: 'Primary performance area', timeOfDay: 'night', weather: 'clear' }
    ],
    project: {
        summary: '',
        directorProfile: {
            narrativePreference: 'hybrid',
            influenceDials: {
                blockingPrecision: 50,
                motivatedCamera: 50,
                wonderAndScale: 50,
                intimateEmotion: 50,
                rhythmicMontage: 50,
                naturalism: 50,
                stylizedSymmetry: 50,
                highContrastMood: 50,
                longTakeConfidence: 50,
                iconicHeroFrames: 50
            }
        },
        outputSpec: {
            aspectRatio: '16:9',
            resolution: '4k',
            contentRating: 'family',
            visualMode: 'realistic'
        }
    }
};

export const DirectorWizard: React.FC = () => {
    const [step, setStep] = useState(1);
    const [project, setProject] = useState<Partial<StratifyProject>>(initialProject);
    const [isGenerating, setIsGenerating] = useState(false);

    const handleNext = () => setStep(prev => prev + 1);
    const handleBack = () => setStep(prev => prev - 1);

    // The Master "Call Action" button
    const runDirectorSwarm = async () => {
        setIsGenerating(true);
        try {
            const res = await fetch('/api/director/generate', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ project })
            });
            const data = await res.json();
            if (data.error) throw new Error(data.error);
            setProject(data);
            setStep(7); // Move to Results (Step 7 now)
        } catch (e) {
            console.error("Director Failed", e);
            alert("Director Swarm Failed. Check console.");
        } finally {
            setIsGenerating(false);
        }
    };

    return (
        <div className="w-full max-w-6xl mx-auto min-h-screen bg-black text-white font-sans p-6">
            <header className="mb-8 flex justify-between items-center border-b border-gray-800 pb-4">
                <h1 className="text-3xl font-bold tracking-tighter text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 to-cyan-500">
                    DIRECTOR MODE <span className="text-xs text-gray-500 font-mono align-top ml-2">v8.0 SWARM</span>
                </h1>
                <div className="flex gap-2">
                    {[1, 2, 3, 4, 5, 6, 7].map(s => (
                        <div key={s} className={`h-2 w-8 rounded-full transition-colors ${step >= s ? 'bg-emerald-500' : 'bg-gray-800'}`} />
                    ))}
                </div>
            </header>

            <AnimatePresence mode='wait'>
                <motion.div
                    key={step}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    className="min-h-[600px] bg-gray-900/50 rounded-2xl border border-gray-800 p-8 backdrop-blur-xl"
                >
                    {step === 1 && (
                        <IntakeStep
                            project={project as StratifyProject}
                            updateProject={setProject}
                            onNext={handleNext}
                        />
                    )}

                    {step === 2 && (
                        <SyncStep
                            project={project as StratifyProject}
                            updateProject={setProject}
                            onNext={handleNext}
                            onBack={handleBack}
                        />
                    )}

                    {step === 3 && (
                        <DialsStep
                            project={project as StratifyProject}
                            updateProject={setProject}
                            onNext={handleNext}
                            onBack={handleBack}
                        />
                    )}

                    {step === 4 && (
                        <TreatmentStep
                            project={project as StratifyProject}
                            updateProject={setProject}
                            onNext={handleNext}
                            onBack={handleBack}
                        />
                    )}

                    {step === 5 && (
                        <LocationStep
                            project={project as StratifyProject}
                            updateProject={setProject}
                            onNext={handleNext}
                            onBack={handleBack}
                        />
                    )}

                    {step === 6 && (
                        <div className="text-center p-20">
                            <h2 className="text-3xl font-bold text-white mb-4">Roll Camera?</h2>
                            <p className="text-gray-400 mb-8 max-w-md mx-auto">
                                The 8-Agent Swarm is ready. We will process your intake, apply your influence dials, and generate a shot-by-shot plan with tool-specific prompts.
                            </p>
                            <button
                                onClick={runDirectorSwarm}
                                disabled={isGenerating}
                                className="px-12 py-5 bg-gradient-to-r from-emerald-500 to-cyan-600 text-white rounded-full font-bold text-xl hover:scale-105 transition-transform disabled:opacity-50 shadow-lg shadow-emerald-500/20"
                            >
                                {isGenerating ? (
                                    <span className="flex items-center gap-2">
                                        <span className="animate-spin text-xl">⚡</span> Orchestrating Swarm...
                                    </span>
                                ) : (
                                    "ACTION!"
                                )}
                            </button>
                            <div className="mt-6">
                                <button onClick={handleBack} className="text-gray-500 hover:text-white underline text-sm">
                                    Back to Location Setup
                                </button>
                            </div>
                        </div>
                    )}

                    {step === 7 && (
                        <ScriptView
                            project={project as StratifyProject}
                            updateProject={setProject}
                            onReset={() => {
                                setStep(1);
                                setProject(initialProject);
                            }}
                            onBack={() => setStep(6)}
                        />
                    )}
                </motion.div>
            </AnimatePresence>
        </div>
    );
};
