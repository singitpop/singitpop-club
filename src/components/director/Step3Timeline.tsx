"use client";

import { useState, useEffect } from "react";
import { Clock, Plus, GripVertical, Trash2, Film, Users, Video, MoveRight, PlayCircle, Sparkles, FileText, X, Wand2 } from "lucide-react";
import { motion, Reorder } from "framer-motion";

interface Character {
    id: string;
    name: string;
    avatarUrl?: string;
}

interface Scene {
    id: string;
    description: string;
    duration: number; // in seconds
    castIds: string[]; // Who is in this scene?
    action: string;
    camera: string;
}

interface Step3Props {
    onNext: (data: any) => void;
    project: any; // Contains track, concept, cast
}

export default function Step3Timeline({ onNext, project }: Step3Props) {
    const [showImport, setShowImport] = useState(false);
    const [importText, setImportText] = useState("");

    // Parse actual duration from project track (format: "3:45" or raw seconds)
    const parseDuration = (track: any) => {
        if (!track) return 180;
        if (typeof track.duration === 'number') return track.duration; // Already seconds
        if (typeof track.duration === 'string') {
            const parts = track.duration.split(':');
            if (parts.length === 2) {
                return (parseInt(parts[0]) * 60) + parseInt(parts[1]);
            }
        }
        return 180; // Default 3 mins
    };

    const trackDuration = parseDuration(project.track);
    const [totalDuration, setTotalDuration] = useState(trackDuration);

    // Initial scenes based on track
    const [scenes, setScenes] = useState<Scene[]>(() => {
        // If scenes passed from wizard state (back navigation), use them
        if (project.scenes && project.scenes.length > 0) return project.scenes;

        // Otherwise default
        return [
            { id: '1', description: "Opening wide shot, establishing the mood.", duration: Math.floor(trackDuration * 0.15), castIds: [], action: "Ambient movement", camera: "Wide Drone" },
            { id: '2', description: "Lead singer enters, emotional close-up.", duration: Math.floor(trackDuration * 0.25), castIds: [], action: "Lip syncing", camera: "Close Up" }
        ];
    });


    // Update if project track changes
    useEffect(() => {
        const newDur = parseDuration(project.track);
        setTotalDuration(newDur);
    }, [project.track]);

    // 🧠 AUTO-SEQUENCE LOGIC
    const handleAutoSequence = () => {
        const theme = project.vibe?.theme || "cinematic";
        const total = totalDuration;

        // Structure: Intro (15%) -> Verse 1 (25%) -> Chorus (20%) -> Bridge (25%) -> Outro (15%)
        const segments = [
            { pct: 0.15, type: 'Intro', action: 'Ambient movement' },
            { pct: 0.25, type: 'Verse', action: 'Lip syncing' },
            { pct: 0.20, type: 'Chorus', action: 'Performance' },
            { pct: 0.25, type: 'Bridge/Story', action: 'Story Action' },
            { pct: 0.15, type: 'Outro', action: 'B-Roll / Cinematic' }
        ];

        let accumulatedTime = 0;
        const newScenes = segments.map((seg, i) => {
            const dur = Math.floor(total * seg.pct);
            const isLast = i === segments.length - 1;
            // Ensure exact total matches for last item
            const finalDur = isLast ? (total - accumulatedTime) : dur;
            accumulatedTime += finalDur;

            let desc = "";
            switch (theme) {
                case 'dark':
                    desc = seg.type === 'Intro' ? "Slow pan over dark city streets." :
                        seg.type === 'Chorus' ? "Intense performance with strobes." : "Shadowy figures moving.";
                    break;
                case 'romance':
                    desc = seg.type === 'Intro' ? "Soft focus on candles." :
                        seg.type === 'Chorus' ? "Emotional close up, singing to camera." : "Walking hand in hand.";
                    break;
                case 'energy':
                    desc = seg.type === 'Intro' ? "Fast cuts of the venue." :
                        seg.type === 'Chorus' ? "Explosive dance sequence." : "High energy movement.";
                    break;
                default:
                    desc = `${seg.type}: Establishing ${project.vibe?.selections?.mood || "cinematic"} atmosphere.`;
            }

            return {
                id: Date.now().toString() + i,
                description: desc,
                duration: finalDur,
                castIds: [],
                action: seg.action,
                camera: i % 2 === 0 ? "Wide Shot" : "Close Up"
            };
        });

        setScenes(newScenes);
    };

    // 🤖 CHATGPT PARSER
    const handleImport = () => {
        if (!importText) return;

        // 1. Regex to find "Header (0:00-0:15)" pattern
        // Supports: "INTRO (0:00-0:15)", "Verse 1 [0:15 - 0:45]", "1. Scene Name (10s)"
        const sceneRegex = /(?:^|\n)(.*?)(?:\(|\[)(\d{1,2}:\d{2}|\d+s?)(?:\s*(?:-|–|to)\s*(\d{1,2}:\d{2}))?(?:\)|\])(?::)?/g;

        const parsedScenes: Scene[] = [];
        let match;
        let lastIndex = 0;

        // Helper to convert "1:30" or "90s" to seconds
        const toSeconds = (str: string) => {
            if (!str) return 0;
            if (str.includes(':')) {
                const [m, s] = str.split(':').map(Number);
                return (m * 60) + s;
            }
            return parseInt(str);
        };

        while ((match = sceneRegex.exec(importText)) !== null) {
            const header = match[1].trim().replace(/^\d+[\.\)]\s*/, ''); // "INTRO"
            const startStr = match[2]; // "0:00"
            const endStr = match[3];   // "0:18" (Optional)

            // Calculate Duration
            let duration = 15; // Default
            if (endStr) {
                duration = toSeconds(endStr) - toSeconds(startStr);
            } else if (startStr.includes('s')) {
                duration = parseInt(startStr);
            }

            // Capture Description (Text *between* this match and the next match)
            const startOfDesc = match.index + match[0].length;
            const nextMatch = sceneRegex.lastIndex; // Wait, exec moves lastIndex? No, need to peek.

            // Actually, we can just grab everything until the next regex hit or end of string
            // But regex iteration is tricky. Let's start simple:
            // The description is the text IMMEDIATELY following this match, until the next newline that looks like a header.
        }

        // Simpler "Split by blocks" approach for robustness
        // We split by lines, look for "Header (Time)" lines, then group subsequent lines as description.
        const blocks = importText.split(/\n+/);
        let currentScene: Partial<Scene> | null = null;
        let accumulatedDesc = [];

        blocks.forEach(line => {
            // Check for "HEADER (0:00...)"
            const timeMatch = line.match(/(.*?)(?:\(|\[)(\d{1,2}:\d{2})(?:\s*(?:-|–|to)\s*(\d{1,2}:\d{2}))?(?:\)|\])/);

            if (timeMatch) {
                // Save Previous
                if (currentScene) {
                    parsedScenes.push({
                        ...currentScene as Scene,
                        description: accumulatedDesc.join(" ").trim() || currentScene.description
                    } as Scene);
                }

                // Start New
                const start = toSeconds(timeMatch[2]);
                const end = timeMatch[3] ? toSeconds(timeMatch[3]) : start + 15;

                currentScene = {
                    id: Date.now().toString() + Math.random(),
                    description: timeMatch[1].trim(), // Header as provisional desc
                    duration: Math.max(5, end - start), // Min 5s
                    castIds: [],
                    action: "Performance",
                    camera: "Medium Shot"
                };
                accumulatedDesc = [];
            } else {
                // It's a description line
                if (currentScene && line.trim().length > 0) {
                    accumulatedDesc.push(line.trim());
                }
            }
        });

        // Push final
        if (currentScene) {
            parsedScenes.push({
                ...currentScene as Scene,
                description: accumulatedDesc.join(" ").trim() || currentScene.description
            } as Scene);
        }

        if (parsedScenes.length > 0) {
            setScenes(parsedScenes);
            setShowImport(false);
            setImportText("");
        }
    };


    const handleAddScene = () => {
        const newScene: Scene = {
            id: Date.now().toString(),
            description: "New dramatic moment...",
            duration: 10,
            castIds: [],
            action: "Performance",
            camera: "Medium Shot"
        };
        setScenes([...scenes, newScene]);
    };

    const handleRemoveScene = (id: string) => {
        setScenes(scenes.filter(s => s.id !== id));
    };

    const handleUpdateScene = (id: string, field: keyof Scene, value: any) => {
        setScenes(scenes.map(s => s.id === id ? { ...s, [field]: value } : s));
    };

    const toggleCastMember = (sceneId: string, charId: string) => {
        setScenes(scenes.map(s => {
            if (s.id !== sceneId) return s;
            const currentCast = s.castIds || [];
            const newCast = currentCast.includes(charId)
                ? currentCast.filter(id => id !== charId)
                : [...currentCast, charId];
            return { ...s, castIds: newCast };
        }));
    };

    const currentDuration = scenes.reduce((acc, s) => acc + s.duration, 0);
    const progress = Math.min((currentDuration / totalDuration) * 100, 100);

    return (
        <div className="grid grid-cols-1 xl:grid-cols-12 gap-8 h-full font-sans">

            {/* LEFT: Timeline Editor (8 Cols) */}
            <div className="xl:col-span-8 flex flex-col h-full space-y-6">

                {/* Header & Progress */}
                <div className="bg-white/5 border border-white/10 rounded-2xl p-6">
                    <div className="flex items-center justify-between mb-4">
                        <div className="flex items-center gap-3">
                            <Clock className="text-blue-400" />
                            <div>
                                <h2 className="text-xl font-bold">Timeline Sequencer</h2>
                                <p className="text-xs text-white/40">song_track.mp3 • {Math.floor(totalDuration / 60)}:{(totalDuration % 60).toString().padStart(2, '0')}m</p>
                            </div>
                        </div>
                        <div className="text-right">
                            <div className="text-2xl font-mono font-bold text-white">
                                {Math.floor(currentDuration / 60)}:{(currentDuration % 60).toString().padStart(2, '0')}
                                <span className="text-white/30 text-sm"> / {Math.floor(totalDuration / 60)}:{(totalDuration % 60).toString().padStart(2, '0')}</span>
                            </div>
                        </div>
                    </div>
                    {/* Progress Bar */}
                    <div className="h-4 bg-black/50 rounded-full overflow-hidden relative">
                        <div
                            className="absolute top-0 left-0 h-full bg-gradient-to-r from-blue-600 to-indigo-600 transition-all duration-300"
                            style={{ width: `${progress}%` }}
                        />
                        {/* Markers */}
                        {[25, 50, 75].map(p => (
                            <div key={p} className="absolute top-0 h-full w-0.5 bg-white/10" style={{ left: `${p}%` }} />
                        ))}
                    </div>
                </div>

                {/* Scene List (Scrollable) */}
                <div className="flex-1 overflow-y-auto space-y-4 pr-2">

                    {/* 🛠️ TOOLBAR: Auto-Tools */}
                    <div className="flex gap-2 mb-2">
                        <button
                            onClick={handleAutoSequence}
                            className="flex-1 py-3 bg-gradient-to-r from-violet-600/20 to-pink-600/20 border border-violet-500/30 rounded-xl text-violet-200 text-sm font-bold flex items-center justify-center gap-2 hover:bg-violet-600/30 transition-all"
                        >
                            <Wand2 size={16} /> Auto-Sequence (Director Brain)
                        </button>
                        <button
                            onClick={() => setShowImport(!showImport)}
                            className="flex-1 py-3 bg-white/5 border border-white/10 rounded-xl text-white/60 text-sm font-bold flex items-center justify-center gap-2 hover:bg-white/10 transition-all"
                        >
                            <FileText size={16} /> Paste from ChatGPT
                        </button>
                    </div>

                    {/* 📥 IMPORT PANEL */}
                    <AnimatePresence>
                        {showImport && (
                            <motion.div
                                initial={{ height: 0, opacity: 0 }}
                                animate={{ height: 'auto', opacity: 1 }}
                                exit={{ height: 0, opacity: 0 }}
                                className="overflow-hidden"
                            >
                                <div className="bg-black/40 border border-white/10 rounded-xl p-4 mb-4">
                                    <div className="flex justify-between items-center mb-2">
                                        <label className="text-xs font-bold text-white/40 uppercase">Paste Scene List</label>
                                        <button onClick={() => setShowImport(false)} className="text-white/20 hover:text-white"><X size={14} /></button>
                                    </div>
                                    <textarea
                                        value={importText}
                                        onChange={(e) => setImportText(e.target.value)}
                                        placeholder={`1. [0:00-0:15] Intense close up of singer...\n2. [0:15-0:30] Wide shot of city skyline...`}
                                        className="w-full h-32 bg-black/50 border border-white/10 rounded-lg p-3 text-sm text-white font-mono focus:border-violet-500 outline-none resize-none mb-3"
                                    />
                                    <button
                                        onClick={handleImport}
                                        className="w-full py-2 bg-violet-600 rounded-lg text-white font-bold text-sm hover:bg-violet-500"
                                    >
                                        Parse & Generate Scenes
                                    </button>
                                </div>
                            </motion.div>
                        )}
                    </AnimatePresence>

                    <Reorder.Group axis="y" values={scenes} onReorder={setScenes} className="space-y-4">
                        {scenes.map((scene, index) => (
                            <Reorder.Item key={scene.id} value={scene}>
                                <div className="bg-white/5 border border-white/10 rounded-xl p-4 hover:border-blue-500/30 transition-all group">
                                    <div className="flex items-start gap-4">
                                        {/* Drag Handle & Index */}
                                        <div className="flex flex-col items-center gap-2 text-white/20 pt-2 cursor-grab active:cursor-grabbing">
                                            <GripVertical size={20} />
                                            <span className="font-mono text-sm font-bold opacity-50">{index + 1}</span>
                                        </div>

                                        {/* Main Content */}
                                        <div className="flex-1 space-y-3">
                                            {/* Top Row: Desc & Duration */}
                                            <div className="flex gap-4">
                                                <input
                                                    type="text"
                                                    value={scene.description}
                                                    onChange={(e) => handleUpdateScene(scene.id, 'description', e.target.value)}
                                                    className="flex-1 bg-black/20 border border-white/10 rounded-lg px-3 py-2 text-white font-medium focus:border-blue-500 outline-none"
                                                    placeholder="Describe this scene..."
                                                />
                                                <div className="flex items-center gap-2 bg-black/20 rounded-lg px-3 border border-white/10">
                                                    <Clock size={14} className="text-white/40" />
                                                    <input
                                                        type="number"
                                                        value={scene.duration}
                                                        onChange={(e) => handleUpdateScene(scene.id, 'duration', parseInt(e.target.value))}
                                                        className="w-12 bg-transparent text-white text-center outline-none font-mono"
                                                    />
                                                    <span className="text-xs text-white/40">sec</span>
                                                </div>
                                            </div>

                                            {/* Bottom Row: Cast & Controls */}
                                            <div className="flex items-center gap-4">
                                                {/* Cast Selector (Mini) */}
                                                <div className="flex items-center gap-2">
                                                    <Users size={14} className="text-pink-400" />
                                                    <div className="flex -space-x-2">
                                                        {project.castMembers?.map((char: Character) => (
                                                            <button
                                                                key={char.id}
                                                                onClick={() => toggleCastMember(scene.id, char.id)}
                                                                className={`w-6 h-6 rounded-full border border-black overflow-hidden transition-all
                                                                    ${scene.castIds?.includes(char.id) ? 'opacity-100 scale-110 ring-2 ring-pink-500 z-10' : 'opacity-40 grayscale hover:opacity-100'}
                                                                `}
                                                                title={char.name}
                                                            >
                                                                <img src={char.avatarUrl} className="w-full h-full object-cover" />
                                                            </button>
                                                        ))}
                                                        {(!project.castMembers || project.castMembers.length === 0) && (
                                                            <span className="text-xs text-white/20 italic">No cast available</span>
                                                        )}
                                                    </div>
                                                </div>

                                                <div className="h-4 w-[1px] bg-white/10" />

                                                {/* Quick Action Tags */}
                                                <select
                                                    value={scene.action}
                                                    onChange={(e) => handleUpdateScene(scene.id, 'action', e.target.value)}
                                                    className="bg-black/20 border border-white/10 rounded-lg px-2 py-1 text-xs text-white/60 outline-none"
                                                >
                                                    <option>Performance</option>
                                                    <option>B-Roll / Cinematic</option>
                                                    <option>Story Action</option>
                                                    <option>Dance Sequence</option>
                                                </select>

                                                <div className="flex-1" />

                                                {/* Delete */}
                                                <button
                                                    onClick={() => handleRemoveScene(scene.id)}
                                                    className="text-white/20 hover:text-red-400 transition-colors"
                                                >
                                                    <Trash2 size={16} />
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </Reorder.Item>
                        ))}
                    </Reorder.Group>

                    <button
                        onClick={handleAddScene}
                        className="w-full py-4 border-2 border-dashed border-white/10 rounded-xl text-white/40 hover:text-white hover:border-white/20 hover:bg-white/5 transition-all flex items-center justify-center gap-2 font-bold"
                    >
                        <Plus size={20} /> Add Next Scene
                    </button>
                </div>
            </div>

            {/* RIGHT: Production Monitor (4 cols) */}
            <div className="xl:col-span-4 space-y-6 flex flex-col h-full">
                <div className="bg-black border border-white/10 rounded-2xl overflow-hidden aspect-video relative group">
                    <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                        <PlayCircle size={64} className="text-white/20 group-hover:text-blue-500/50 transition-colors" />
                    </div>
                    <div className="absolute bottom-4 left-4 right-4 flex justify-between text-xs font-mono text-white/60">
                        <span>PREVIEW MONITOR</span>
                        <span>1080p • 24fps</span>
                    </div>
                </div>

                <div className="flex-1 bg-white/5 border border-white/10 rounded-2xl p-6">
                    <h3 className="font-bold text-white/60 mb-4 flex items-center gap-2">
                        <Video size={16} className="text-purple-400" /> Director's Notes
                    </h3>
                    <div className="text-sm text-white/40 space-y-4">
                        <p>Total Scenes: <span className="text-white">{scenes.length}</span></p>
                        <p>Total Cast: <span className="text-white">{project.castMembers?.length || 0}</span></p>
                        <div className="p-4 bg-indigo-900/20 border border-indigo-500/30 rounded-xl mt-8">
                            <div className="text-xs font-bold text-indigo-300 uppercase mb-2">AI Cost Estimate</div>
                            <div className="text-2xl font-bold text-white">£{(scenes.length * 0.15).toFixed(2)}</div>
                            <div className="text-xs text-indigo-400/60 mt-1">Based on {scenes.length} generations</div>
                        </div>
                    </div>

                    <div className="mt-auto pt-6">
                        <button
                            onClick={() => onNext({ scenes })}
                            className="w-full py-4 bg-gradient-to-r from-blue-600 to-indigo-600 rounded-xl font-bold text-lg flex items-center justify-center gap-2 hover:scale-[1.02] transition-all shadow-lg shadow-blue-900/50"
                        >
                            Start Production <MoveRight size={20} />
                        </button>
                    </div>
                </div>
            </div>

        </div>
    );
}
