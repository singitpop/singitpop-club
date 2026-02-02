"use client";

import { useState } from "react";
import { Users, UserPlus, Sparkles, Wand2, Trash2, Save, User, UserCheck } from "lucide-react";
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
}

// EXPANDED STAR LOCKER 🌟
const SAVED_STARS: Character[] = [
    // LEADS
    { id: 'lead_f_1', name: "Luna V", description: "Pop superstar, blue hair, futuristic outfit", seed: 1001, style: "Lead" },
    { id: 'lead_m_1', name: "Jaxon", description: "Male lead, leather jacket, brooding look", seed: 1002, style: "Lead" },
    { id: 'lead_dist', name: "The Drifter", description: "Rugged cowboy, dusty coat, mysterious vibe", seed: 987654, style: "Western" },

    // DANCERS
    { id: 'dancers_1', name: "Neon Squad", description: "Backup dancers in glowing LED suits", seed: 2001, style: "Dancers" },
    { id: 'dancers_2', name: "Street Crew", description: "Urban street dancers, hoodies and sneakers", seed: 2002, style: "Dancers" },
    { id: 'dancers_3', name: "Ballet Corps", description: "Ethereal dancers in white silk", seed: 2003, style: "Dancers" },

    // SUPPORTING / VIBE
    { id: 'villain_1', name: "Shadow Man", description: "Antagonist in a suit, obscured face", seed: 3001, style: "Villain" },
    { id: 'lover_1', name: "The Muse", description: "Dreamy love interest, soft lighting, floral dress", seed: 3002, style: "Romance" },
    { id: 'sci_fi_1', name: "Cyborg X", description: "Chrome plated android helper", seed: 4001, style: "Sci-Fi" },
    { id: 'retro_1', name: "Vinyl DJ", description: "70s style DJ with afro and sunglasses", seed: 5001, style: "Retro" },
    { id: 'goth_1', name: "Raven", description: "Gothic style, dark makeup, velvet dress", seed: 6001, style: "Dark" },
    { id: 'band_1', name: "The Band", description: "Drummer and guitarist handling instruments", seed: 7001, style: "Band" }
];

interface Step2Props {
    onNext: (data: any) => void;
    initialCast?: Character[];
    vibe?: {
        selections: any;
        theme: string;
    };
}

export default function Step2Casting({ onNext, initialCast = [], vibe }: Step2Props) {
    const [myCast, setMyCast] = useState<Character[]>(initialCast);
    const [isCreating, setIsCreating] = useState(false);
    const [isAutoCasting, setIsAutoCasting] = useState(false);

    // New Character Form State
    const [newName, setNewName] = useState("");
    const [newDesc, setNewDesc] = useState("");
    const [newSeed, setNewSeed] = useState<number | undefined>(undefined);

    // 🧠 SMART CASTING ENGINE
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
            if (theme === 'melancholy') {
                // Solo vibe, maybe just the lead. Or the Drifter.
                suggestions.push(SAVED_STARS.find(s => s.id === 'lead_dist')!);
            }
            if (theme === 'dark') {
                suggestions.push(SAVED_STARS.find(s => s.id === 'villain_1')!);
                suggestions.push(SAVED_STARS.find(s => s.id === 'goth_1')!);
            }
            if (theme === 'dreamy') {
                suggestions.push(SAVED_STARS.find(s => s.id === 'dancers_3')!); // Ballet
            }

            // Filter out duplicates
            const uniqueNew = suggestions.filter(s => !myCast.some(c => c.id === s.id));

            setMyCast(prev => [...prev, ...uniqueNew]);
            setIsAutoCasting(false);
        }, 1000);
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
        <div className="grid grid-cols-1 xl:grid-cols-12 gap-8 h-full font-sans">

            {/* LEFT: Cast Operations (8 Cols) */}
            <div className="xl:col-span-8 space-y-8 flex flex-col h-full">

                {/* Header Actions */}
                <div className="flex items-center justify-between">
                    <div>
                        <h2 className="text-3xl font-bold flex items-center gap-3">
                            <Users className="text-pink-500" />
                            Cast & Crew
                        </h2>
                        <p className="text-white/40 mt-1">Assemble your stars. Consistent characters across every scene.</p>
                    </div>
                    <div className="flex gap-3">
                        {vibe?.theme && (
                            <button
                                onClick={autoCast}
                                disabled={isAutoCasting}
                                className="px-6 py-3 bg-indigo-600 hover:bg-indigo-500 text-white rounded-xl font-bold flex items-center gap-2 transition-all shadow-lg shadow-indigo-900/20"
                            >
                                <Wand2 size={18} className={isAutoCasting ? "animate-spin" : ""} />
                                {isAutoCasting ? "Casting..." : "Auto-Cast Check"}
                            </button>
                        )}
                        <button
                            onClick={() => setIsCreating(true)}
                            className="px-6 py-3 bg-pink-600 hover:bg-pink-500 text-white rounded-xl font-bold flex items-center gap-2 transition-all shadow-lg shadow-pink-900/20"
                        >
                            <UserPlus size={18} />
                            New Casting
                        </button>
                    </div>
                </div>

                {/* My Active Cast Grid */}
                <div className="flex-1 bg-white/5 border border-white/10 rounded-2xl p-8 overflow-y-auto">
                    {myCast.length === 0 ? (
                        <div className="h-full flex flex-col items-center justify-center text-center opacity-40">
                            <Users size={64} className="mb-4 text-white/20" />
                            <h3 className="text-xl font-bold mb-2">The Stage is Empty</h3>
                            <p className="max-w-md mb-6">Create a new character or select from your Star Locker to begin casting your movie.</p>
                            {vibe?.theme && (
                                <button onClick={autoCast} className="text-indigo-400 hover:text-indigo-300 underline font-semibold">
                                    Auto-Suggest based on "{vibe.theme}" vibe?
                                </button>
                            )}
                        </div>
                    ) : (
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                            {myCast.map(char => (
                                <div key={char.id} className="relative group bg-black/40 border border-white/10 rounded-xl p-4 hover:border-pink-500/50 transition-all">
                                    <div className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity">
                                        <button
                                            onClick={() => handleRemoveCharacter(char.id)}
                                            className="p-2 bg-red-500/20 text-red-400 hover:bg-red-500 hover:text-white rounded-lg"
                                        >
                                            <Trash2 size={16} />
                                        </button>
                                    </div>

                                    <div className="flex items-start gap-4 mb-3">
                                        <div className="w-16 h-16 rounded-full bg-gradient-to-br from-pink-500 to-purple-500 p-0.5">
                                            <img src={`https://api.dicebear.com/7.x/avataaars/svg?seed=${char.seed}`} alt={char.name} className="w-full h-full rounded-full bg-black object-cover" />
                                        </div>
                                        <div>
                                            <h4 className="font-bold text-lg">{char.name}</h4>
                                            <div className="text-[10px] bg-white/10 px-2 py-0.5 rounded inline-block text-white/60 font-mono">
                                                SEED: {char.seed}
                                            </div>
                                        </div>
                                    </div>
                                    <p className="text-sm text-white/50 line-clamp-2">{char.description}</p>
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
                        className={`px-8 py-4 rounded-xl font-bold text-lg flex items-center gap-2 transition-all
                            ${myCast.length > 0
                                ? 'bg-gradient-to-r from-pink-600 to-purple-600 hover:scale-[1.02] shadow-xl shadow-pink-900/50 text-white'
                                : 'bg-white/5 text-white/20 cursor-not-allowed'}
                        `}
                    >
                        Confirm Cast & Go to Timeline <UserCheck size={20} />
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
                            className="bg-pink-900/20 border border-pink-500/30 rounded-2xl p-6"
                        >
                            <div className="flex items-center justify-between mb-4">
                                <h3 className="font-bold text-pink-200 flex items-center gap-2">
                                    <Wand2 size={16} /> Create New Star
                                </h3>
                                <button onClick={() => setIsCreating(false)} className="text-xs text-white/40 hover:text-white">Cancel</button>
                            </div>

                            <div className="space-y-4">
                                <div>
                                    <label className="text-xs font-bold text-white/40 uppercase mb-1 block">Character Name</label>
                                    <input
                                        type="text"
                                        value={newName}
                                        onChange={(e) => setNewName(e.target.value)}
                                        placeholder="e.g. Chrome Vixon"
                                        className="w-full bg-black/40 border border-white/10 rounded-lg p-3 text-white focus:border-pink-500 outline-none"
                                    />
                                </div>
                                <div>
                                    <label className="text-xs font-bold text-white/40 uppercase mb-1 block">Visual Description</label>
                                    <textarea
                                        value={newDesc}
                                        onChange={(e) => setNewDesc(e.target.value)}
                                        placeholder="Detailed description: 'Tall, robotic arm, wearing a trench coat...'"
                                        className="w-full bg-black/40 border border-white/10 rounded-lg p-3 text-white h-24 focus:border-pink-500 outline-none resize-none"
                                    />
                                </div>
                                <div>
                                    <label className="text-xs font-bold text-white/40 uppercase mb-1 block">Consistency Seed (Optional)</label>
                                    <input
                                        type="number"
                                        value={newSeed || ""}
                                        onChange={(e) => setNewSeed(parseInt(e.target.value))}
                                        placeholder="Auto-generated if empty"
                                        className="w-full bg-black/40 border border-white/10 rounded-lg p-3 text-white font-mono focus:border-pink-500 outline-none"
                                    />
                                </div>

                                <button
                                    onClick={handleAddCharacter}
                                    disabled={!newName || !newDesc}
                                    className={`w-full py-3 rounded-lg font-bold flex items-center justify-center gap-2 transition-all
                                        ${newName && newDesc ? 'bg-pink-600 hover:bg-pink-500 text-white' : 'bg-white/10 text-white/20'}
                                    `}
                                >
                                    <Save size={16} /> Save to Cast
                                </button>
                            </div>
                        </motion.div>
                    ) : (
                        <div className="bg-white/5 border border-white/10 rounded-2xl p-6 flex-1 flex flex-col">
                            <h3 className="font-bold text-white/60 mb-4 flex items-center gap-2">
                                <Sparkles size={16} className="text-yellow-400" /> Star Locker
                            </h3>
                            <div className="flex-1 overflow-y-auto space-y-3">
                                {SAVED_STARS.map(star => (
                                    <button
                                        key={star.id}
                                        onClick={() => handleSelectStar(star)}
                                        className="w-full text-left bg-black/20 hover:bg-white/10 border border-white/5 hover:border-white/20 rounded-xl p-3 transition-all group"
                                    >
                                        <div className="flex items-center gap-3">
                                            <div className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center text-xs font-bold overflow-hidden">
                                                <img src={`https://api.dicebear.com/7.x/avataaars/svg?seed=${star.seed}`} alt={star.name} className="w-full h-full object-cover" />
                                            </div>
                                            <div>
                                                <div className="font-bold text-sm text-white group-hover:text-pink-400 transition-colors">{star.name}</div>
                                                <div className="text-xs text-white/40">{star.style}</div>
                                            </div>
                                        </div>
                                    </button>
                                ))}
                                <div className="p-4 text-center text-xs text-white/20 border-t border-white/5 mt-4">
                                    More saved stars will appear here...
                                </div>
                            </div>
                        </div>
                    )}
                </AnimatePresence>

            </div>
        </div>
    );
}
