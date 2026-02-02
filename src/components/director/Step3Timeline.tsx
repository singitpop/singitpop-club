"use client";

import { useState, useEffect } from "react";
import { Clock, Plus, GripVertical, Trash2, Film, Users, Video, MoveRight, PlayCircle } from "lucide-react";
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
    // Parse actual duration from project track (format: "3:45")
    const parseDuration = (durStr?: string) => {
        if (!durStr) return 180; // Default 3 mins
        const parts = durStr.split(':');
        if (parts.length === 2) {
            return (parseInt(parts[0]) * 60) + parseInt(parts[1]);
        }
        return 180;
    };

    const trackDuration = parseDuration(project.track?.duration);

    // Initial scenes based on track
    const [scenes, setScenes] = useState<Scene[]>(() => {
        return [
            { id: '1', description: "Opening wide shot, establishing the mood.", duration: Math.floor(trackDuration * 0.15), castIds: [], action: "Ambient movement", camera: "Wide Drone" },
            { id: '2', description: "Lead singer enters, emotional close-up.", duration: Math.floor(trackDuration * 0.25), castIds: [], action: "Lip syncing", camera: "Close Up" }
        ];
    });

    const [totalDuration, setTotalDuration] = useState(trackDuration);

    // Update if project track changes
    useEffect(() => {
        if (project.track?.duration) {
            const newDur = parseDuration(project.track.duration);
            setTotalDuration(newDur);
            // Optional: Adjust scenes? For now keep existing but update total limit logic if needed
        }
    }, [project.track?.duration]);

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
