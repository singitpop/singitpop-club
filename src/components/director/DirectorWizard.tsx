"use client";

import { useState, useEffect } from "react";
import { Sparkles, Users, Clapperboard, MonitorPlay, Mic2, LayoutTemplate, ChevronRight } from "lucide-react";
import { motion } from "framer-motion";
import Step1Briefing from "./Step1Briefing";
import Step2Casting from "./Step2Casting";
import Step3Timeline from "./Step3Timeline";
import Step4Production from "./Step4Production";

// Types for our "Ultra" Project
export type DirectorTab = 'briefing' | 'cast' | 'timeline' | 'studio';

interface DirectorState {
    trackId: string | null;
    concept: string;
    castMembers: any[];
    scenes: any[];
    vibe?: any;
}

export default function DirectorWizard() {
    const [activeTab, setActiveTab] = useState<DirectorTab>('briefing');
    const [tracks, setTracks] = useState<any[]>([]);
    const [project, setProject] = useState<DirectorState>({
        trackId: null,
        concept: "",
        castMembers: [],
        scenes: []
    });

    const tabs = [
        { id: 'briefing', label: 'Briefing Room', icon: LayoutTemplate, desc: 'Concept & Vibes' },
        { id: 'cast', label: 'Cast & Crew', icon: Users, desc: 'Characters & Seeds' },
        { id: 'timeline', label: 'Timeline', icon: Clapperboard, desc: 'Story & Sequencing' },
        { id: 'studio', label: 'Production', icon: MonitorPlay, desc: 'Generate & Render' },
    ];

    // Fetch tracks on mount
    useEffect(() => {
        async function loadTracks() {
            try {
                const res = await fetch('/api/music/tracks');
                if (res.ok) {
                    const data = await res.json();
                    if (data.tracks && Array.isArray(data.tracks)) {
                        setTracks(data.tracks);
                    } else if (Array.isArray(data)) {
                        setTracks(data); // Fallback if API changes
                    } else {
                        console.error("Tracks API returned unexpected format:", data);
                        setTracks([]);
                    }
                }
            } catch (e) {
                console.error("Failed to load tracks", e);
            }
        }
        loadTracks();
    }, []);

    const handleBriefingComplete = (data: any) => {
        console.log("Briefing Complete:", data);
        setProject(prev => ({
            ...prev,
            trackId: data.track.id,
            vibe: data.vibe,
            concept: data.userPrompt
        }));
        // Move to next tab (Concept/Cast logic would be next, usually Cast)
        setActiveTab('cast');
    };

    return (
        <div className="flex h-screen bg-[#050507] text-white overflow-hidden font-sans">
            {/* Left Sidebar Navigation */}
            <div className="w-64 border-r border-white/5 bg-[#0a0a0e] flex flex-col">
                <div className="p-6">
                    <h1 className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-indigo-400 to-purple-400">
                        Director<span className="text-white font-light">Ultra</span>
                    </h1>
                    <p className="text-xs text-white/40 mt-1 uppercase tracking-wider">AI Movie Studio v2.4 (Live)</p>
                </div>

                <nav className="flex-1 px-4 space-y-2">
                    <a
                        href="/admin"
                        className="flex items-center gap-3 p-3 rounded-xl text-left hover:bg-white/5 text-white/50 hover:text-white transition-all duration-200 mb-6 border border-transparent hover:border-white/10"
                    >
                        <div className="p-2 rounded-lg bg-white/5">
                            <ChevronRight size={18} className="rotate-180" />
                        </div>
                        <div>
                            <div className="font-semibold text-sm">Back to Admin</div>
                        </div>
                    </a>

                    {tabs.map((tab) => {
                        const Icon = tab.icon;
                        const isActive = activeTab === tab.id;
                        return (
                            <button
                                key={tab.id}
                                onClick={() => setActiveTab(tab.id as DirectorTab)}
                                className={`w-full flex items-center gap-3 p-3 rounded-xl text-left transition-all duration-200
                                    ${isActive
                                        ? 'bg-indigo-600/10 border border-indigo-500/50 text-white shadow-[0_0_15px_rgba(99,102,241,0.2)]'
                                        : 'hover:bg-white/5 text-white/50 hover:text-white'}
                                `}
                            >
                                <div className={`p-2 rounded-lg ${isActive ? 'bg-indigo-500 text-white' : 'bg-white/5'}`}>
                                    <Icon size={18} />
                                </div>
                                <div>
                                    <div className="font-semibold text-sm">{tab.label}</div>
                                    <div className="text-[10px] opacity-60">{tab.desc}</div>
                                </div>
                            </button>
                        );
                    })}
                </nav>

                <div className="p-4 border-t border-white/5">
                    <div className="bg-gradient-to-r from-pink-500/10 to-purple-500/10 rounded-xl p-4 border border-white/5">
                        <div className="flex items-center gap-2 mb-2">
                            <Sparkles size={14} className="text-pink-400" />
                            <span className="text-xs font-bold text-pink-200">BUDGET TRACKER</span>
                        </div>
                        <div className="text-2xl font-bold">£0.00</div>
                        <div className="text-[10px] text-white/40">Est. cost this session</div>
                    </div>
                </div>
            </div>

            {/* Main Content Area */}
            <main className="flex-1 overflow-y-auto bg-[#050507] relative">
                {/* 🌌 ATMOSPHERE: Deep Gradient Mesh for Glass Effects */}
                <div className="fixed inset-0 pointer-events-none overflow-hidden">
                    {/* Brand Primary (Violet) Orb */}
                    <div className="absolute top-[-20%] left-[-10%] w-[600px] h-[600px] bg-[#8b5cf6]/20 rounded-full blur-[120px] opacity-40 mix-blend-screen" />
                    {/* Brand Accent (Pink) Orb */}
                    <div className="absolute bottom-[-10%] right-[-5%] w-[500px] h-[500px] bg-[#f472b6]/20 rounded-full blur-[100px] opacity-30 mix-blend-screen" />
                    {/* Cyan Neon Highlight */}
                    <div className="absolute top-[40%] left-[30%] w-[300px] h-[300px] bg-[#00fff0]/10 rounded-full blur-[80px] opacity-20 mix-blend-overlay" />
                    <div className="absolute inset-0 bg-[url('/grid.svg')] opacity-[0.03] bg-repeat" />
                </div>

                <div className="max-w-[1600px] mx-auto p-8 relative z-10 h-full">
                    {activeTab === 'briefing' && (
                        <div className="space-y-8 h-full">
                            <div className="flex items-end justify-between">
                                <div>
                                    <h2 className="text-4xl font-bold mb-2">The Briefing Room</h2>
                                    <p className="text-white/60 text-lg">Choose your track and set the visual direction.</p>
                                </div>
                            </div>

                            {/* Placeholder for Step 1 Component */}
                            <div className="h-[calc(100%-120px)]">
                                <Step1Briefing
                                    tracks={tracks}
                                    onNext={handleBriefingComplete}
                                />
                            </div>
                        </div>
                    )}

                    {activeTab === 'cast' && (
                        <div className="space-y-8 h-full">
                            <div className="flex items-end justify-between">
                                <div>
                                    <h2 className="text-4xl font-bold mb-2">Cast & Crew</h2>
                                    <p className="text-white/60 text-lg">Define your stars. Consistent characters for your movie.</p>
                                </div>
                            </div>

                            <div className="h-[calc(100%-120px)]">
                                <Step2Casting
                                    onNext={(data) => {
                                        setProject(prev => ({ ...prev, castMembers: data.castMembers }));
                                        setActiveTab('timeline');
                                    }}
                                    initialCast={project.castMembers}
                                />
                            </div>
                        </div>
                    )}

                    {activeTab === 'timeline' && (
                        <div className="space-y-8 h-full">
                            <div className="flex items-end justify-between">
                                <div>
                                    <h2 className="text-4xl font-bold mb-2">Timeline</h2>
                                    <p className="text-white/60 text-lg">Sequence your scenes. Build the narrative arc.</p>
                                </div>
                            </div>

                            <div className="h-[calc(100%-120px)]">
                                <Step3Timeline
                                    project={project}
                                    onNext={(data) => {
                                        setProject(prev => ({ ...prev, scenes: data.scenes }));
                                        setActiveTab('studio');
                                    }}
                                />
                            </div>
                        </div>
                    )}

                    {activeTab === 'studio' && (
                        <div className="space-y-8 h-full">
                            <div className="flex items-end justify-between">
                                <div>
                                    <h2 className="text-4xl font-bold mb-2">Production Studio</h2>
                                    <p className="text-white/60 text-lg">Finalize budget. Generate your masterpiece.</p>
                                </div>
                            </div>

                            <div className="h-[calc(100%-120px)]">
                                <Step4Production
                                    project={project}
                                    onBack={() => setActiveTab('timeline')}
                                />
                            </div>
                        </div>
                    )}
                </div>
            </main>
        </div>
    );
}
