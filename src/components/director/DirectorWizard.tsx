
import React, { useState, useEffect, useRef } from 'react';
import { StratifyProject, InfluenceDials } from '@/types/stratify';
import { AnimatePresence, motion } from 'framer-motion';
import { IntakeStep } from './steps/IntakeStep';
import { DialsStep } from './steps/DialsStep';
import { TreatmentStep } from './steps/TreatmentStep';
import { LocationStep } from './steps/LocationStep';
import { SyncStep } from './steps/SyncStep';
import { ScriptView } from './steps/ScriptView';
import { Save, UploadCloud, Download, FileUp } from 'lucide-react';

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

    // Save/Load States
    const [savedProjects, setSavedProjects] = useState<{ id: string, name: string, data: any }[]>([]);
    const [showLoadMenu, setShowLoadMenu] = useState(false);
    const fileInputRef = useRef<HTMLInputElement>(null);

    // Initialization
    useEffect(() => {
        try {
            const stored = localStorage.getItem('director_saved_projects');
            if (stored) {
                setSavedProjects(JSON.parse(stored));
            }
        } catch (e) {
            console.error("Failed to load saved projects", e);
        }
    }, []);

    // Save to Local Storage
    const saveToLocal = () => {
        const title = project.song?.title || `Untitled ${new Date().toLocaleDateString()}`;
        const newEntry = {
            id: project.id || `proj_${Date.now()}`,
            name: title,
            data: { ...project, id: project.id || `proj_${Date.now()}` }
        };

        const existingIndex = savedProjects.findIndex(p => p.id === newEntry.id);
        const updated = [...savedProjects];
        if (existingIndex >= 0) {
            updated[existingIndex] = newEntry; // update existing
        } else {
            updated.push(newEntry); // add new
        }

        setProject(newEntry.data); // Set ID into active project
        setSavedProjects(updated);
        localStorage.setItem('director_saved_projects', JSON.stringify(updated));
        alert('Project Saved to Browser!');
        setShowLoadMenu(false);
    };

    const loadFromLocal = (data: any) => {
        setProject(data);
        setStep(1); // Return to intake so they can review
        setShowLoadMenu(false);
    };

    // Export JSON File
    const exportProject = () => {
        const title = project.song?.title || 'Singitpop_Director_Project';
        const blob = new Blob([JSON.stringify(project, null, 2)], { type: 'application/json' });
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = `${title.replace(/\s+/g, '_')}_Project.json`;
        a.click();
        URL.revokeObjectURL(url);
    };

    // Import JSON File
    const importProject = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (!file) return;

        const reader = new FileReader();
        reader.onload = (event) => {
            try {
                const importedProject = JSON.parse(event.target?.result as string);
                setProject(importedProject);
                setStep(1);
                alert('Project Successfully Imported!');
            } catch (err) {
                alert('Invalid Project File');
            }
        };
        reader.readAsText(file);
        if (fileInputRef.current) fileInputRef.current.value = ''; // Reset input
    };

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
            <header className="mb-8 flex justify-between items-center border-b border-gray-800 pb-4 relative">
                <div>
                    <h1 className="text-3xl font-bold tracking-tighter text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 to-cyan-500">
                        DIRECTOR MODE <span className="text-xs text-gray-500 font-mono align-top ml-2">v8.0 SWARM</span>
                    </h1>

                    {/* Project Save/Load Controls */}
                    <div className="flex items-center gap-3 mt-2">
                        <button onClick={saveToLocal} className="text-xs flex items-center gap-1 bg-gray-900 border border-gray-700 hover:border-emerald-500 hover:text-emerald-400 px-3 py-1 rounded transition-colors text-gray-400">
                            <Save size={12} /> Save Project (Browser)
                        </button>
                        <div className="relative">
                            <button onClick={() => setShowLoadMenu(!showLoadMenu)} className="text-xs flex items-center gap-1 bg-gray-900 border border-gray-700 hover:border-blue-500 hover:text-blue-400 px-3 py-1 rounded transition-colors text-gray-400">
                                <UploadCloud size={12} /> Load Project
                            </button>
                            {showLoadMenu && (
                                <div className="absolute top-full left-0 mt-2 w-64 bg-gray-900 border border-gray-700 rounded-lg shadow-xl z-50 overflow-hidden">
                                    <div className="bg-gray-800 px-3 py-2 text-xs font-bold text-gray-400 border-b border-gray-700">Saved Projects</div>
                                    <div className="max-h-48 overflow-y-auto">
                                        {savedProjects.length === 0 ? (
                                            <div className="px-3 py-4 text-xs text-gray-500 text-center">No saved projects found.</div>
                                        ) : (
                                            savedProjects.map(p => (
                                                <button key={p.id} onClick={() => loadFromLocal(p.data)} className="w-full text-left px-3 py-2 text-sm text-gray-300 hover:bg-gray-800 hover:text-white border-b border-gray-800 last:border-0 truncate">
                                                    🎵 {p.name}
                                                </button>
                                            ))
                                        )}
                                    </div>
                                </div>
                            )}
                        </div>
                        <div className="h-4 w-px bg-gray-800 mx-1"></div>
                        <button onClick={exportProject} className="text-xs flex items-center gap-1 bg-gray-900 border border-gray-700 hover:border-white px-3 py-1 rounded transition-colors text-gray-400">
                            <Download size={12} /> Export JSON
                        </button>
                        <label className="text-xs flex items-center gap-1 bg-gray-900 border border-gray-700 hover:border-white px-3 py-1 rounded transition-colors text-gray-400 cursor-pointer">
                            <FileUp size={12} /> Import JSON
                            <input type="file" accept=".json" onChange={importProject} ref={fileInputRef} className="hidden" />
                        </label>
                    </div>
                </div>

                <div className="flex gap-2 self-start mt-2">
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
