"use client";

import { useState, useEffect } from "react";
import { Mic2, Film, Zap, Sun, CloudRain, Moon, Camera, Palette } from "lucide-react";
import { motion } from "framer-motion";

interface Track {
    id: number | string;
    title: string;
    albumTitle?: string;
    albumId?: string;
    duration?: string;
}

interface Step1Props {
    tracks: Track[];
    onNext: (data: any) => void;
}

export default function Step1Briefing({ tracks, onNext }: Step1Props) {
    const [selectedTrackId, setSelectedTrackId] = useState<string | number>("");
    const [prompt, setPrompt] = useState("");
    const [vibe, setVibe] = useState({
        mood: "Cinematic",
        lighting: "Golden Hour",
        weather: "Clear"
    });

    const moods = ["Cinematic", "Dark Neon", "Euphoric", "Melancholic", "Retro VHS", "Cyberpunk"];
    const lightings = ["Golden Hour", "Studio", "Neon", "Moonlight", "Natural"];
    const weathers = ["Clear", "Rain", "Fog", "Snow", "Storm"];

    const handleGenerate = () => {
        if (!selectedTrackId) return;
        const selectedTrack = tracks.find(t => t.id === selectedTrackId);

        onNext({
            track: selectedTrack,
            userPrompt: prompt,
            vibe: vibe
        });
    };

    return (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 h-full">
            {/* Left Col: Track Selection */}
            <div className="space-y-6">
                <div className="bg-white/5 border border-white/10 rounded-2xl p-6">
                    <div className="flex items-center gap-3 mb-4">
                        <div className="p-2 bg-indigo-500/20 rounded-lg text-indigo-400">
                            <Mic2 size={20} />
                        </div>
                        <h3 className="text-lg font-semibold">Select Methodology</h3>
                    </div>

                    <div className="relative">
                        <select
                            value={selectedTrackId}
                            onChange={(e) => setSelectedTrackId(e.target.value)}
                            className="w-full bg-black/40 border border-white/10 rounded-xl p-4 text-white appearance-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 transition-all cursor-pointer"
                        >
                            <option value="">-- Choose a Track to Direct --</option>
                            {tracks.map((t) => (
                                <option key={t.id} value={t.id}>
                                    {t.title} {t.albumTitle ? `(${t.albumTitle})` : ''}
                                </option>
                            ))}
                        </select>
                        <div className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none text-white/30">
                            ▼
                        </div>
                    </div>

                    {selectedTrackId && (
                        <div className="mt-4 p-4 bg-indigo-900/20 border border-indigo-500/30 rounded-xl flex items-center gap-3">
                            <div className="w-2 h-2 rounded-full bg-green-400 animate-pulse" />
                            <span className="text-sm text-indigo-200">Track Loaded & Ready for Analysis</span>
                        </div>
                    )}
                </div>

                <div className="bg-white/5 border border-white/10 rounded-2xl p-6">
                    <div className="flex items-center gap-3 mb-4">
                        <div className="p-2 bg-pink-500/20 rounded-lg text-pink-400">
                            <Film size={20} />
                        </div>
                        <h3 className="text-lg font-semibold">Director's Vision</h3>
                    </div>

                    <textarea
                        value={prompt}
                        onChange={(e) => setPrompt(e.target.value)}
                        placeholder="Describe your vision... (e.g., A heartbreak story in a futuristic Tokyo, neon rain, emotional close-ups)"
                        className="w-full bg-black/40 border border-white/10 rounded-xl p-4 text-white h-32 focus:border-pink-500 focus:ring-1 focus:ring-pink-500 transition-all resize-none"
                    />
                </div>
            </div>

            {/* Right Col: Vibe Settings (The "Mega Prompt" Engine) */}
            <div className="space-y-6">
                <div className="bg-white/5 border border-white/10 rounded-2xl p-6 h-full flex flex-col">
                    <div className="flex items-center gap-3 mb-6">
                        <div className="p-2 bg-purple-500/20 rounded-lg text-purple-400">
                            <Zap size={20} />
                        </div>
                        <h3 className="text-lg font-semibold">Cinematography Settings</h3>
                    </div>

                    <div className="space-y-6 flex-1">
                        {/* Mood */}
                        <div>
                            <label className="text-xs text-white/40 uppercase tracking-widest mb-3 block flex items-center gap-2">
                                <Palette size={12} /> Desired Mood
                            </label>
                            <div className="flex flex-wrap gap-2">
                                {moods.map(m => (
                                    <button
                                        key={m}
                                        onClick={() => setVibe({ ...vibe, mood: m })}
                                        className={`px-3 py-1.5 rounded-full text-xs font-medium border transition-all
                                            ${vibe.mood === m
                                                ? 'bg-purple-600 border-purple-500 text-white shadow-lg shadow-purple-900/50'
                                                : 'bg-white/5 border-white/10 text-white/50 hover:bg-white/10'}
                                        `}
                                    >
                                        {m}
                                    </button>
                                ))}
                            </div>
                        </div>

                        {/* Lighting */}
                        <div>
                            <label className="text-xs text-white/40 uppercase tracking-widest mb-3 block flex items-center gap-2">
                                <Sun size={12} /> Lighting Setup
                            </label>
                            <div className="flex flex-wrap gap-2">
                                {lightings.map(l => (
                                    <button
                                        key={l}
                                        onClick={() => setVibe({ ...vibe, lighting: l })}
                                        className={`px-3 py-1.5 rounded-full text-xs font-medium border transition-all
                                            ${vibe.lighting === l
                                                ? 'bg-yellow-600/80 border-yellow-500 text-white shadow-lg shadow-yellow-900/50'
                                                : 'bg-white/5 border-white/10 text-white/50 hover:bg-white/10'}
                                        `}
                                    >
                                        {l}
                                    </button>
                                ))}
                            </div>
                        </div>

                        {/* Weather */}
                        <div>
                            <label className="text-xs text-white/40 uppercase tracking-widest mb-3 block flex items-center gap-2">
                                <CloudRain size={12} /> Environmental FX
                            </label>
                            <div className="flex flex-wrap gap-2">
                                {weathers.map(w => (
                                    <button
                                        key={w}
                                        onClick={() => setVibe({ ...vibe, weather: w })}
                                        className={`px-3 py-1.5 rounded-full text-xs font-medium border transition-all
                                            ${vibe.weather === w
                                                ? 'bg-blue-600/80 border-blue-500 text-white shadow-lg shadow-blue-900/50'
                                                : 'bg-white/5 border-white/10 text-white/50 hover:bg-white/10'}
                                        `}
                                    >
                                        {w}
                                    </button>
                                ))}
                            </div>
                        </div>
                    </div>

                    {/* Action Button */}
                    <div className="mt-8 pt-6 border-t border-white/10">
                        <button
                            onClick={handleGenerate}
                            disabled={!selectedTrackId}
                            className={`w-full py-4 rounded-xl font-bold text-lg flex items-center justify-center gap-2 transition-all
                                ${selectedTrackId
                                    ? 'bg-gradient-to-r from-indigo-600 to-purple-600 hover:scale-[1.02] shadow-xl shadow-indigo-900/50'
                                    : 'bg-white/5 text-white/20 cursor-not-allowed'}
                            `}
                        >
                            <Sparkles size={20} />
                            {selectedTrackId ? "Initialize Director Engine" : "Select a Track to Begin"}
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}
