"use client";

import { useState, useEffect } from "react";
import { Film, DollarSign, Zap, CheckCircle, Loader, Play, Music, Users, Camera, AlertTriangle } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

interface Step4Props {
    onBack: () => void;
    project: any;
}

export default function Step4Production({ onBack, project }: Step4Props) {
    const [isRendering, setIsRendering] = useState(false);
    const [progress, setProgress] = useState(0);
    const [renderStep, setRenderStep] = useState<string>("Initializing Studio...");
    const [completedSteps, setCompletedSteps] = useState<string[]>([]);
    const [showPreview, setShowPreview] = useState(false);

    // Dynamic Cost Logic based on Location Tier
    const location = project.vibe?.selections?.location || "Studio";

    const getCostPerScene = (loc: string) => {
        if (["Stadium Stage", "Luxury Penthouse"].includes(loc)) return 0.50; // Premium
        if (["Abandoned Warehouse", "Jazz Club", "Tokyo Streets"].includes(loc)) return 0.25; // Standard
        return 0.15; // Budget (Dive Bar, Field, etc)
    };

    const costPerScene = getCostPerScene(location);
    const sceneCost = (project.scenes?.length || 0) * costPerScene;
    const durationCost = (trackDurationSeconds / 60) * 0.05;
    const totalCost = sceneCost + durationCost;

    const renderSequence = [
        `Initializing set at ${location}...`,
        "Analyzing Script & Pacing...",
        "Allocating AI Cast Members...",
        "Generating Consistency Seeds...",
        "Lighting & Atmosphere Pass...",
        "Rendering Scene 1: Opening Wide Shot...",
        "Rendering Scene 2: Performance Close-Up...",
        "Syncing Lip Movements (Wav2Lip)...",
        "Color Grading (Kodak Portra 400)...",
        "Final Compilation..."
    ];

    const startProduction = () => {
        setIsRendering(true);
        let currentStep = 0;

        const interval = setInterval(() => {
            if (currentStep >= renderSequence.length) {
                clearInterval(interval);
                setIsRendering(false);
                setShowPreview(true);
                setRenderStep("Production Complete");
                return;
            }

            setRenderStep(renderSequence[currentStep]);
            setCompletedSteps(prev => [...prev, renderSequence[currentStep]]);
            setProgress(p => Math.min(p + (100 / renderSequence.length), 100));
            currentStep++;

        }, 1500); // Simulate 1.5s per step
    };

    if (showPreview) {
        return (
            <div className="h-full flex flex-col items-center justify-center space-y-8 animate-in fade-in duration-500">
                <div className="relative w-full max-w-4xl aspect-video bg-black rounded-2xl overflow-hidden shadow-2xl border border-white/10 group">
                    {/* Placeholder for actual video player */}
                    <div className="absolute inset-0 flex items-center justify-center bg-gradient-to-br from-gray-900 to-black">
                        <Play size={80} className="text-white fill-white/20 group-hover:scale-110 transition-transform cursor-pointer" />
                    </div>
                    <div className="absolute bottom-0 left-0 right-0 p-8 bg-gradient-to-t from-black/80 to-transparent">
                        <h2 className="text-3xl font-bold text-white mb-2">{project.track?.title || "Untitled Masterpiece"}</h2>
                        <div className="flex gap-4 text-sm text-gray-300 font-mono">
                            <span>4K ULTRA HD</span>
                            <span>•</span>
                            <span>{Math.floor(trackDurationSeconds / 60)}:{(trackDurationSeconds % 60).toString().padStart(2, '0')} DURATION</span>
                            <span>•</span>
                            <span>Location: {location.toUpperCase()}</span>
                        </div>
                    </div>
                </div>

                <div className="flex gap-4">
                    <button className="px-8 py-3 bg-white text-black font-bold rounded-full hover:bg-gray-200 transition-colors flex items-center gap-2">
                        <DollarSign size={18} /> Purchase Master (£{totalCost.toFixed(2)})
                    </button>
                    <button onClick={() => setShowPreview(false)} className="px-8 py-3 border border-white/20 rounded-full hover:bg-white/10 transition-colors">
                        Back to Studio
                    </button>
                </div>
            </div>
        );
    }

    return (
        <div className="grid grid-cols-1 xl:grid-cols-12 gap-8 h-full">

            {/* LEFT: Project Manifest */}
            <div className="xl:col-span-8 flex flex-col space-y-6">
                <div className="bg-white/5 border border-white/10 rounded-2xl p-8">
                    <h2 className="text-2xl font-bold mb-6 flex items-center gap-3">
                        <Film className="text-yellow-400" />
                        Production Manifest
                    </h2>

                    <div className="grid grid-cols-2 gap-8 mb-8">
                        <div>
                            <h3 className="text-xs font-bold text-white/40 uppercase mb-2">Soundtrack</h3>
                            <div className="flex items-center gap-3 bg-black/30 p-3 rounded-lg border border-white/5">
                                <Music size={20} className="text-blue-400" />
                                <div>
                                    <div className="font-bold">{project.track?.title || "No Track Selected"}</div>
                                    <div className="text-xs text-white/50">{project.track?.duration} • BPM: 124</div>
                                </div>
                            </div>
                        </div>
                        <div>
                            <h3 className="text-xs font-bold text-white/40 uppercase mb-2">Director's Vision</h3>
                            <div className="bg-black/30 p-3 rounded-lg border border-white/5 text-sm text-white/70 italic">
                                "Shooting at <span className="text-white font-bold">{location}</span> with {project.concept?.vibe?.selections?.lighting || "Standard"} lighting."
                            </div>
                        </div>
                    </div>

                    <div className="space-y-4">
                        <h3 className="text-xs font-bold text-white/40 uppercase">Cast & Crew</h3>
                        <div className="flex gap-4 overflow-x-auto pb-2">
                            {project.castMembers?.map((c: any) => (
                                <div key={c.id} className="min-w-[120px] bg-black/30 p-3 rounded-xl border border-white/5 flex flex-col items-center gap-2">
                                    <div className="w-12 h-12 rounded-full bg-indigo-500/20 flex items-center justify-center text-xl">
                                        {c.name[0]}
                                    </div>
                                    <span className="text-sm font-bold truncate w-full text-center">{c.name}</span>
                                    <span className="text-[10px] text-white/40 px-2 py-0.5 bg-white/5 rounded-full">Lead Role</span>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>

                {/* AI Console Output */}
                <div className="flex-1 bg-black border border-white/10 rounded-2xl p-6 font-mono text-sm relative overflow-hidden">
                    <div className="absolute top-0 left-0 right-0 h-8 bg-gradient-to-b from-black to-transparent z-10" />
                    <div className="space-y-2 h-full overflow-y-auto pb-4 custom-scrollbar">
                        {completedSteps.map((step, i) => (
                            <div key={i} className="flex items-center gap-3 text-green-400/80 animate-in slide-in-from-left-2 fade-in duration-300">
                                <CheckCircle size={14} />
                                <span>{step}</span>
                            </div>
                        ))}
                        {isRendering && (
                            <div className="flex items-center gap-3 text-blue-400 animate-pulse">
                                <Loader size={14} className="animate-spin" />
                                <span>{renderStep}</span>
                            </div>
                        )}
                        {!isRendering && completedSteps.length === 0 && (
                            <div className="flex items-center justify-center h-full text-white/20">
                                System Standby. Awaiting Production Command.
                            </div>
                        )}
                    </div>
                </div>
            </div>

            {/* RIGHT: Budget & Action */}
            <div className="xl:col-span-4 flex flex-col space-y-6">
                <div className="bg-gradient-to-br from-indigo-900/40 to-purple-900/40 border border-indigo-500/30 rounded-2xl p-8 sticky top-6">
                    <h3 className="text-sm font-bold text-indigo-300 uppercase mb-6 flex items-center gap-2">
                        <DollarSign size={16} /> Production Budget
                    </h3>

                    <div className="space-y-4 mb-8">
                        <div className="flex justify-between items-center text-sm">
                            <span className="text-white/60">Location Fee ({location})</span>
                            <span className={costPerScene >= 0.5 ? "text-yellow-400 font-bold" : "text-white"}>
                                {costPerScene >= 0.5 ? "PREMIUM" : "STANDARD"}
                            </span>
                        </div>
                        <div className="flex justify-between items-center text-sm">
                            <span className="text-white/60">Generations ({project.scenes?.length || 0} x £{costPerScene.toFixed(2)})</span>
                            <span>£{sceneCost.toFixed(2)}</span>
                        </div>
                        <div className="flex justify-between items-center text-sm">
                            <span className="text-white/60">Lip Sync Processing</span>
                            <span>£{durationCost.toFixed(2)}</span>
                        </div>
                        <div className="h-px bg-white/10 my-2" />
                        <div className="flex justify-between items-center text-xl font-bold">
                            <span>Total Estimated</span>
                            <span className="text-green-400">£{totalCost.toFixed(2)}</span>
                        </div>
                    </div>

                    {!isRendering ? (
                        <button
                            onClick={startProduction}
                            className="w-full py-4 bg-white text-black rounded-xl font-bold text-lg flex items-center justify-center gap-2 hover:bg-gray-100 hover:scale-[1.02] transition-all shadow-xl shadow-white/10"
                        >
                            <Zap size={20} className="fill-black" /> Start Production
                        </button>
                    ) : (
                        <div className="space-y-2">
                            <div className="h-2 bg-black/50 rounded-full overflow-hidden">
                                <motion.div
                                    className="h-full bg-blue-500"
                                    initial={{ width: 0 }}
                                    animate={{ width: `${progress}%` }}
                                    transition={{ duration: 0.5 }}
                                />
                            </div>
                            <div className="text-center text-xs text-blue-300 animate-pulse">
                                Processing... Do not close window.
                            </div>
                        </div>
                    )}

                    <div className="mt-6 p-4 bg-yellow-900/20 border border-yellow-500/20 rounded-lg flex gap-3">
                        <AlertTriangle size={16} className="text-yellow-500 shrink-0" />
                        <p className="text-xs text-yellow-200/60 leading-relaxed">
                            Generating a {Math.ceil(trackDurationSeconds / 60)}-minute video takes significant GPU resources.
                            Your account will be debited only upon successful render.
                        </p>
                    </div>
                </div>
            </div>

        </div>
    );
}
