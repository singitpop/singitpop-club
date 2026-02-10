
"use client";

import { StratifyProject, Scene, Shot } from "@/types/stratify";
import { Film, Edit3, Camera, MapPin, Clock, ArrowRight, ArrowLeft, PlayCircle, Layers } from "lucide-react";
import { useState } from "react";

interface Props {
    project: StratifyProject;
    updateProject: (p: StratifyProject) => void;
    onNext: () => void;
    onBack: () => void;
}

export default function StoryboardEditor({ project, updateProject, onNext, onBack }: Props) {
    const [selectedSceneId, setSelectedSceneId] = useState<string>(project.scenes[0]?.sceneId);

    const activeScene = project.scenes.find(s => s.sceneId === selectedSceneId);

    const updateShot = (sceneId: string, shotId: string, field: string, value: any) => {
        const updated = { ...project };
        const scene = updated.scenes.find(s => s.sceneId === sceneId);
        const shot = scene?.shots.find(s => s.shotId === shotId);

        if (shot) {
            // @ts-ignore
            if (field.includes('.')) {
                const [p, c] = field.split('.');
                // @ts-ignore
                shot[p][c] = value;
            } else {
                // @ts-ignore
                shot[field] = value;
            }
            updateProject(updated);
        }
    };

    return (
        <div className="h-full flex flex-col animate-in fade-in duration-500">
            {/* Header */}
            <div className="flex items-center justify-between mb-6 px-4">
                <div>
                    <h2 className="text-2xl font-bold text-white flex items-center gap-2">
                        <Layers className="text-yellow-400" /> Storyboard
                    </h2>
                    <p className="text-white/50 text-sm">Review and refine the generated shot list.</p>
                </div>
                <div className="flex gap-4">
                    <button onClick={onBack} className="text-white/50 hover:text-white px-4 py-2 text-sm">Back</button>
                    <button onClick={onNext} className="bg-yellow-500 text-black px-6 py-2 rounded-full font-bold hover:bg-yellow-400 text-sm flex items-center gap-2">
                        Process Production <ArrowRight size={14} />
                    </button>
                </div>
            </div>

            <div className="flex-1 grid grid-cols-12 gap-6 min-h-0">

                {/* Scene List (Left sidebar) */}
                <div className="col-span-3 bg-white/5 border border-white/10 rounded-xl overflow-y-auto custom-scrollbar p-2 space-y-2">
                    {project.scenes.map((scene, idx) => (
                        <button
                            key={scene.sceneId}
                            onClick={() => setSelectedSceneId(scene.sceneId)}
                            className={`w-full text-left p-3 rounded-lg border transition-all ${selectedSceneId === scene.sceneId
                                    ? "bg-yellow-500/20 border-yellow-500/50 text-white"
                                    : "bg-black/20 border-transparent text-white/60 hover:bg-white/5"
                                }`}
                        >
                            <div className="flex justify-between items-start mb-1">
                                <span className="text-xs font-bold uppercase tracking-wider opacity-70">Scene {idx + 1}</span>
                                <span className="text-[10px] bg-black/40 px-1.5 rounded">{scene.shots.length} shots</span>
                            </div>
                            <h3 className="font-semibold truncate">{scene.title}</h3>
                            <div className="flex items-center gap-2 mt-2 text-[10px] opacity-50">
                                <MapPin size={10} />
                                <span className="truncate">Global Location</span>
                            </div>
                        </button>
                    ))}
                </div>

                {/* Shot List (Main Content) */}
                <div className="col-span-9 bg-black/30 border border-white/5 rounded-xl overflow-hidden flex flex-col">
                    {activeScene ? (
                        <div className="flex-1 overflow-y-auto custom-scrollbar p-6 space-y-6">

                            {/* Scene Header */}
                            <div className="bg-gradient-to-r from-yellow-900/20 to-transparent p-4 rounded-lg border border-yellow-500/10 mb-6">
                                <h3 className="text-xl font-bold text-yellow-100 mb-1">{activeScene.title}</h3>
                                <p className="text-sm text-yellow-200/60 italic">"{activeScene.mood?.keywords?.join(', ')}", {activeScene.mood?.lighting} lighting.</p>
                            </div>

                            {/* Shots */}
                            <div className="space-y-4">
                                {activeScene.shots.map((shot, sIdx) => (
                                    <div key={shot.shotId} className="bg-white/5 border border-white/5 rounded-lg p-4 hover:border-white/20 transition-colors group">
                                        <div className="flex gap-4">
                                            {/* Shot Index */}
                                            <div className="w-12 h-12 bg-black/50 rounded flex items-center justify-center font-mono text-xl text-white/30 font-bold shrink-0">
                                                {sIdx + 1}
                                            </div>

                                            {/* Shot Details */}
                                            <div className="flex-1 space-y-3">
                                                <div className="flex justify-between items-start">
                                                    <div className="flex gap-2">
                                                        <span className="bg-blue-500/20 text-blue-300 text-xs px-2 py-0.5 rounded font-bold uppercase">{shot.shotType}</span>
                                                        <span className="bg-purple-500/20 text-purple-300 text-xs px-2 py-0.5 rounded font-bold uppercase">{shot.camera.movement}</span>
                                                    </div>
                                                    <div className="flex items-center gap-2 text-xs text-white/40">
                                                        <Clock size={12} />
                                                        {shot.durationSec}s
                                                    </div>
                                                </div>

                                                <textarea
                                                    value={shot.action}
                                                    onChange={(e) => updateShot(activeScene.sceneId, shot.shotId, 'action', e.target.value)}
                                                    className="w-full bg-transparent text-sm text-white resize-none border-b border-transparent focus:border-white/30 outline-none leading-relaxed"
                                                    rows={2}
                                                />

                                                <div className="flex gap-4 text-xs text-white/40 pt-2 border-t border-white/5">
                                                    <div className="flex items-center gap-1">
                                                        <Camera size={12} />
                                                        {shot.camera.angle}, {shot.camera.lensFeel}
                                                    </div>
                                                    {shot.audioSync?.mode !== 'none' && (
                                                        <div className="flex items-center gap-1 text-green-400/70">
                                                            <PlayCircle size={12} />
                                                            Lip-Sync
                                                        </div>
                                                    )}
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>

                        </div>
                    ) : (
                        <div className="flex items-center justify-center h-full text-white/20">
                            Select a scene to edit shots
                        </div>
                    )}
                </div>

            </div>
        </div>
    );
}
