"use client";

import { useState } from "react";
import { Sparkles, Users, Clapperboard, MonitorPlay, Mic2, LayoutTemplate } from "lucide-react";
import { motion } from "framer-motion";

// Types for our "Ultra" Project
export type DirectorTab = 'briefing' | 'cast' | 'timeline' | 'studio';

interface DirectorState {
    trackId: string | null;
    concept: string;
    castMembers: any[]; // To be defined
    scenes: any[];      // To be defined
}

export default function DirectorWizard() {
    const [activeTab, setActiveTab] = useState<DirectorTab>('briefing');
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

    return (
        <div className="flex h-screen bg-[#050507] text-white overflow-hidden font-sans">
            {/* Left Sidebar Navigation */}
            <div className="w-64 border-r border-white/5 bg-[#0a0a0e] flex flex-col">
                <div className="p-6">
                    <h1 className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-indigo-400 to-purple-400">
                        Director<span className="text-white font-light">Ultra</span>
                    </h1>
                    <p className="text-xs text-white/40 mt-1 uppercase tracking-wider">AI Movie Studio</p>
                </div>

                <nav className="flex-1 px-4 space-y-2">
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
            <main className="flex-1 overflow-y-auto bg-[url('/grid.svg')] bg-opacity-5 relative">
                <div className="absolute inset-0 bg-gradient-to-br from-indigo-900/5 via-transparent to-purple-900/5 pointer-events-none" />

                <div className="max-w-7xl mx-auto p-8 relative z-10 h-full">
                    {activeTab === 'briefing' && (
                        <div className="space-y-8">
                            <div className="flex items-end justify-between">
                                <div>
                                    <h2 className="text-4xl font-bold mb-2">The Briefing Room</h2>
                                    <p className="text-white/60 text-lg">Choose your track and set the visual direction.</p>
                                </div>
                            </div>

                            {/* Placeholder for Step 1 Component */}
                            <div className="bg-white/5 border border-white/10 rounded-2xl p-12 text-center min-h-[400px] flex flex-col items-center justify-center border-dashed">
                                <Mic2 size={48} className="text-white/20 mb-4" />
                                <h3 className="text-xl font-semibold mb-2">Select a Track</h3>
                                <p className="text-white/40 mb-6">Load a song from your library to begin analysis.</p>
                                <button className="px-6 py-2 bg-white/10 hover:bg-white/20 rounded-full text-sm font-medium transition-colors">
                                    Browse Library
                                </button>
                            </div>
                        </div>
                    )}

                    {activeTab === 'cast' && (
                        <div className="flex items-center justify-center h-full text-white/30">
                            Cast & Character Lab (Coming Soon)
                        </div>
                    )}

                    {activeTab === 'timeline' && (
                        <div className="flex items-center justify-center h-full text-white/30">
                            8-Minute Timeline Engine (Coming Soon)
                        </div>
                    )}

                    {activeTab === 'studio' && (
                        <div className="flex items-center justify-center h-full text-white/30">
                            Production Studio (Coming Soon)
                        </div>
                    )}
                </div>
            </main>
        </div>
    );
}
