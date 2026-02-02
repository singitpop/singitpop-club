"use client";

import { useState } from "react";
import { Users, UserPlus, Sparkles, Wand2, Trash2, Save, User, UserCheck, ChevronRight } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

interface Character {
    id: string;
    name: string;
    description: string;
    seed?: number; // The "DNA" of the character
    style?: string; // Specific style tag
    avatarUrl?: string; // Placeholder or generated image
}

interface Step2Props {
    onNext: (data: any) => void;
    initialCast?: Character[];
    vibe?: { theme: string; selections: any };
}

// 🌟 SAVED STAR DATABASE (Diverse Archetypes)
const SAVED_STARS: Character[] = [
    // LEADS
    { id: 'lead_f_1', name: "Luna V", description: "Pop superstar, blue hair, futuristic outfit, confident gaze", seed: 1001, style: "Lead" },
    { id: 'lead_m_1', name: "Jaxon", description: "Male lead, leather jacket, brooding look, guitar on back", seed: 1002, style: "Lead" },
    { id: 'lead_dist', name: "The Drifter", description: "Rugged cowboy, dusty coat, mysterious vibe, scar on cheek", seed: 987654, style: "Western" },

    // DANCERS / EXTRAS
    { id: 'dancers_1', name: "Neon Squad", description: "Backup dancers in glowing LED suits, synchronized movement", seed: 2001, style: "Dancers" },
    { id: 'band_1', name: "The Rhythm", description: "Full live band, drummer, bassist, keyboardist, silhouettes", seed: 2002, style: "Band" },

    // THEMATIC
    { id: 'lover_1', name: "The Muse", description: "Dreamy love interest, soft lighting, elegant dress", seed: 3001, style: "Romance" },
    { id: 'villain_1', name: "Shadow King", description: "Antagonist, dark suit, sunglasses, ominous presence", seed: 4001, style: "Villain" },
    { id: 'scifi_1', name: "Unit 734", description: "Android companion, chrome skin, expressive eyes", seed: 5001, style: "Sci-Fi" }
];

export default function Step2Casting({ onNext, initialCast = [], vibe }: Step2Props) {
    const [myCast, setMyCast] = useState<Character[]>(initialCast);
    const [isCreating, setIsCreating] = useState(false);
    const [isAutoCasting, setIsAutoCasting] = useState(false);

    // New Character Form State
    const [newName, setNewName] = useState("");
    const [newDesc, setNewDesc] = useState("");
    const [newSeed, setNewSeed] = useState<number | undefined>(undefined);

    // 🧠 AUTO-CAST LOGIC
    const autoCast = () => {
        if (!vibe?.theme) return;
        setIsAutoCasting(true);

        setTimeout(() => {
            const suggestions: Character[] = [];
            const theme = vibe.theme;

            // 1. ALWAYS need a Lead (Pick randomly between Luna and Jaxon if empty)
            if (myCast.length === 0) {
                suggestions.push(Math.random() > 0.5 ? SAVED_STARS[0] : SAVED_STARS[1]);
            }

            // 2. THEME BASED SUGGESTIONS
            if (theme === 'romance') {
                suggestions.push(SAVED_STARS.find(s => s.id === 'lover_1')!);
            }
            if (theme === 'energy') {
                suggestions.push(SAVED_STARS.find(s => s.id === 'dancers_1')!); // Neon Squad
                suggestions.push(SAVED_STARS.find(s => s.id === 'band_1')!);
            }
            if (theme === 'dark') {
                suggestions.push(SAVED_STARS.find(s => s.id === 'villain_1')!);
            }
            if (theme === 'dreamy' || theme === 'future') {
                suggestions.push(SAVED_STARS.find(s => s.id === 'scifi_1')!);
            }
            // Fallback for bangers if no specific theme match
            if (myCast.length < 2) {
                suggestions.push(SAVED_STARS.find(s => s.id === 'dancers_1')!);
            }

            // Filter out duplicates
            const uniqueNew = suggestions.filter(s => s && !myCast.some(c => c.id === s.id));

            setMyCast(prev => [...prev, ...uniqueNew]);
            setIsAutoCasting(false);
        }, 800);
    };

    const handleAddCharacter = () => {
        if (!newName || !newDesc) return;

        const newCharacter: Character = {
            id: Date.now().toString(),
            name: newName,
            description: newDesc,
            seed: newSeed || Math.floor(Math.random() * 1000000), // Auto-generate if empty
            avatarUrl: `https://api.dicebear.com/7.x/avataaars/svg?seed=${newName}` // Temporary avatar
        };

        setMyCast([...myCast, newCharacter]);
        setIsCreating(false);
        setNewName("");
        setNewDesc("");
        setNewSeed(undefined);
    };

    const handleRemoveCharacter = (id: string) => {
        setMyCast(myCast.filter(c => c.id !== id));
    };

    const handleSelectStar = (char: Character) => {
        if (myCast.some(c => c.id === char.id)) return; // Already in cast
        setMyCast([...myCast, char]);
    };

    const handleComplete = () => {
        onNext({ castMembers: myCast });
    };

    return (
        <div className="grid grid-cols-1 xl:grid-cols-12 gap-8 h-full font-sans p-6 rounded-3xl bg-black/20 backdrop-blur-2xl border border-white/10 shadow-2xl relative overflow-hidden">
            {/* Gloss Reflection */}
            <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-white/20 to-transparent opacity-50" />

            {/* LEFT: Cast Operations (8 Cols) */}
            <div className="xl:col-span-8 space-y-8 flex flex-col h-full">

                {/* Header Actions */}
                <div className="flex items-center justify-between">
                    <div>
                        <h2 className="text-3xl font-bold flex items-center gap-3 text-white">
                            <Users className="text-pink-500 drop-shadow-[0_0_8px_rgba(236,72,153,0.6)]" />
                            Cast & Crew
                        </h2>
                        <p className="text-white/40 mt-1 font-medium tracking-wide">Assemble your stars. Consistent characters across every scene.</p>
                    </div>

                    <div className="flex gap-3">
                        {/* AUTO CAST BUTTON */}
                        <button
                            onClick={autoCast}
                            disabled={isAutoCasting}
                            className="px-6 py-3 bg-gradient-to-r from-indigo-600 to-purple-600 hover:scale-[1.02] text-white rounded-xl font-bold flex items-center gap-2 transition-all shadow-lg shadow-indigo-900/40 border border-white/10"
                        >
                            <Wand2 size={18} className={isAutoCasting ? "animate-spin" : ""} />
                            {isAutoCasting ? "Scouting..." : "Auto-Cast"}
                        </button>

                        <button
                            onClick={() => setIsCreating(true)}
                            className="px-6 py-3 bg-white/10 hover:bg-white/20 text-white rounded-xl font-bold flex items-center gap-2 transition-all border border-white/10"
                        >
                            <UserPlus size={18} />
                            New
                        </button>
                    </div>
                </div>

                {/* My Active Cast Grid */}
                <div className="flex-1 bg-black/40 border border-white/10 rounded-2xl p-8 overflow-y-auto custom-scrollbar shadow-inner">
                    {myCast.length === 0 ? (
                        <div className="h-full flex flex-col items-center justify-center text-center opacity-40">
                            <Users size={64} className="mb-4 text-white/20" />
                            <h3 className="text-xl font-bold mb-2 text-white">The Stage is Empty</h3>
                            <p className="max-w-md text-white/60">Click <span className="text-indigo-400 font-bold">Auto-Cast</span> to let the AI pick your stars based on your Briefing.</p>
                        </div>
                    ) : (
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 animate-in fade-in zoom-in duration-300">
                            {myCast.map(char => (
                                <div key={char.id} className="relative group bg-white/5 border border-white/5 rounded-2xl p-5 hover:border-pink-500/50 hover:bg-white/10 transition-all duration-300 shadow-lg">
                                    <div className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity">
                                        <button
                                            onClick={() => handleRemoveCharacter(char.id)}
                                            className="p-2 bg-red-500/20 text-red-400 hover:bg-red-500 hover:text-white rounded-lg transition-all"
                                        >
                                            <Trash2 size={16} />
                                        </button>
                                    </div>

                                    <div className="flex items-start gap-4 mb-4">
                                        <div className="w-16 h-16 rounded-full bg-gradient-to-br from-pink-500 to-purple-500 p-0.5 shadow-[0_0_15px_rgba(236,72,153,0.3)]">
                                            <div className="w-full h-full rounded-full bg-black flex items-center justify-center font-bold text-xl text-white/20">
                                                {char.name[0]}
                                            </div>
                                            {/* <img src={char.avatarUrl} alt={char.name} className="w-full h-full rounded-full bg-black object-cover" /> */}
                                        </div>
                                        <div>
                                            <h4 className="font-bold text-lg text-white group-hover:text-pink-400 transition-colors">{char.name}</h4>
                                            <div className="text-[10px] bg-white/10 px-2 py-0.5 rounded inline-block text-white/60 font-mono mt-1 border border-white/5">
                                                DNA: {char.seed}
                                            </div>
                                        </div>
                                    </div>
                                    <p className="text-sm text-white/50 line-clamp-2 leading-relaxed">{char.description}</p>
                                </div>
                            ))}
                        </div>
                    )}
                </div>

                {/* Navigation Actions */}
                <div className="flex justify-end pt-4">
                    <button
                        onClick={handleComplete}
                        disabled={myCast.length === 0}
                        className={`px-8 py-4 rounded-xl font-bold text-lg flex items-center gap-2 transition-all duration-300
                            ${myCast.length > 0
                                ? 'bg-white text-black hover:bg-pink-50 hover:scale-[1.02] shadow-[0_0_20px_rgba(255,255,255,0.2)]'
                                : 'bg-white/5 text-white/20 cursor-not-allowed border border-white/5'}
                        `}
                    >
                        Confirm Cast & Go to Timeline <ChevronRight size={20} />
                    </button>
                </div>
            </div>

            {/* RIGHT: Star Locker & Creation (4 Cols) */}
            <div className="xl:col-span-4 space-y-6 flex flex-col h-full">

                {/* Creation Form Overlay / Panel */}
                <AnimatePresence mode="wait">
                    {isCreating ? (
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -20 }}
                            className="bg-pink-900/10 backdrop-blur-md border border-pink-500/30 rounded-2xl p-6 shadow-2xl"
                        >
                            <div className="flex items-center justify-between mb-6">
                                <h3 className="font-bold text-pink-200 flex items-center gap-2">
                                    <Wand2 size={16} /> Create New Star
                                </h3>
                                <button onClick={() => setIsCreating(false)} className="text-xs text-white/40 hover:text-white transition-colors">Cancel</button>
                            </div>

                            <div className="space-y-5">
                                <div>
                                    <label className="text-xs font-bold text-white/40 uppercase mb-2 block tracking-wider">Character Name</label>
                                    <input
                                        type="text"
                                        value={newName}
                                        onChange={(e) => setNewName(e.target.value)}
                                        placeholder="e.g. Chrome Vixon"
                                        className="w-full bg-black/40 border border-white/10 rounded-xl p-3 text-white focus:border-pink-500 outline-none transition-all placeholder:text-white/20"
                                    />
                                </div>
                                <div>
                                    <label className="text-xs font-bold text-white/40 uppercase mb-2 block tracking-wider">Visual Description</label>
                                    <textarea
                                        value={newDesc}
                                        onChange={(e) => setNewDesc(e.target.value)}
                                        placeholder="Detailed description: 'Tall, robotic arm, wearing a trench coat...'"
                                        className="w-full bg-black/40 border border-white/10 rounded-xl p-3 text-white h-32 focus:border-pink-500 outline-none resize-none transition-all placeholder:text-white/20"
                                    />
                                </div>
                                <div>
                                    <label className="text-xs font-bold text-white/40 uppercase mb-2 block tracking-wider">Consistency Seed (Optional)</label>
                                    <input
                                        type="number"
                                        value={newSeed || ""}
                                        onChange={(e) => setNewSeed(parseInt(e.target.value))}
                                        placeholder="Auto-generated if empty"
                                        className="w-full bg-black/40 border border-white/10 rounded-xl p-3 text-white font-mono focus:border-pink-500 outline-none transition-all placeholder:text-white/20"
                                    />
                                </div>

                                <button
                                    onClick={handleAddCharacter}
                                    disabled={!newName || !newDesc}
                                    className={`w-full py-4 rounded-xl font-bold flex items-center justify-center gap-2 transition-all mt-4
                                        ${newName && newDesc ? 'bg-pink-600 hover:bg-pink-500 text-white shadow-lg shadow-pink-900/40' : 'bg-white/10 text-white/20'}
                                    `}
                                >
                                    <Save size={16} /> Save to Cast
                                </button>
                            </div>
                        </motion.div>
                    ) : (
                        <div className="bg-gradient-to-b from-white/10 to-transparent border border-white/10 rounded-2xl p-6 flex-1 flex flex-col shadow-lg backdrop-blur-md">
                            <h3 className="font-bold text-white mb-6 flex items-center gap-2 text-sm uppercase tracking-widest">
                                <Sparkles size={14} className="text-yellow-400" /> Star Locker
                            </h3>
                            <div className="flex-1 overflow-y-auto space-y-3 custom-scrollbar pr-2">
                                {SAVED_STARS.map(star => (
                                    <button
                                        key={star.id}
                                        onClick={() => handleSelectStar(star)}
                                        className="w-full text-left bg-black/40 hover:bg-white/10 border border-white/5 hover:border-white/20 rounded-xl p-4 transition-all duration-300 group shadow-sm hover:scale-[1.02]"
                                    >
                                        <div className="flex items-center gap-4">
                                            <div className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center text-xs font-bold border border-white/10">
                                                {star.name.substring(0, 2).toUpperCase()}
                                            </div>
                                            <div>
                                                <div className="font-bold text-sm text-white group-hover:text-pink-400 transition-colors">{star.name}</div>
                                                <div className="text-[10px] text-white/40 uppercase tracking-wider mt-0.5">{star.style}</div>
                                            </div>
                                        </div>
                                    </button>
                                ))}
                                <div className="p-6 text-center text-xs text-white/20 border-t border-white/5 mt-4">
                                    More saved stars from your previous sessions will appear here...
                                </div>
                            </div>
                        </div>
                    )}
                </AnimatePresence>

            </div>
        </div>
    );
}
