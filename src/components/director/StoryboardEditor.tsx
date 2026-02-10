
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
                            {/* Scene List Sidebar Item */}
                            <div className="flex justify-between items-start mb-1">
                                <span className="text-xs font-bold uppercase tracking-wider opacity-70">Scene {idx + 1}</span>
                                <span className="text-[10px] bg-black/40 px-1.5 rounded">{scene.shots.length} shots</span>
                            </div>
                            <h3 className="font-semibold truncate">{scene.title.split('@')[0]}</h3>
                            <div className="flex items-center gap-2 mt-2 text-[10px] opacity-50">
                                <MapPin size={10} />
                                <span className="truncate">{scene.locationId}</span>
                            </div>
                        </button>
                    ))}
                </div>

                {/* Shot List (Main Content) */}
                <div className="col-span-9 bg-black/30 border border-white/5 rounded-xl overflow-hidden flex flex-col">
                    {activeScene ? (
                        <div className="p-6 h-full flex flex-col">

                            {/* Scene Header */}
                            <div className="bg-gradient-to-r from-yellow-900/20 to-transparent p-4 rounded-lg border border-yellow-500/10 mb-6 flex-shrink-0">
                                <h3 className="text-xl font-bold text-yellow-100 mb-1">{activeScene.title}</h3>
                                <div className="flex gap-4 text-sm text-yellow-200/60 mt-2">
                                    <span className="flex items-center gap-1"><MapPin size={12} /> {activeScene.locationId}</span>
                                    <span className="flex items-center gap-1"><Camera size={12} /> {activeScene.mood?.lighting} lighting</span>
                                    <span className="italic opacity-50">"{activeScene.mood?.keywords?.join(', ')}"</span>
                                </div>
                            </div>

                            {/* Shots Container */}
                            <div className="flex-1 overflow-y-auto custom-scrollbar space-y-4 pr-2">
                                {activeScene.shots.map((shot, sIdx) => (
                                    <div key={shot.shotId} className="bg-white/5 border border-white/5 rounded-lg p-4 hover:border-white/20 transition-colors group">
                                        <div className="flex gap-4">
                                            {/* Shot Index */}
                                            <div className="w-12 h-full min-h-[80px] bg-black/50 rounded flex flex-col items-center justify-center gap-1 font-mono shrink-0">
                                                <span className="text-xl text-white/30 font-bold">{sIdx + 1}</span>
                                                <span className="text-[10px] text-white/20">{shot.durationSec}s</span>
                                            </div>

                                            {/* Shot Details */}
                                            <div className="flex-1 space-y-3">
                                                {/* Header Badges */}
                                                <div className="flex justify-between items-start">
                                                    <div className="flex gap-2">
                                                        <span className="bg-blue-500/20 text-blue-300 text-xs px-2 py-0.5 rounded font-bold uppercase">{shot.shotType}</span>
                                                        <span className="bg-purple-500/20 text-purple-300 text-xs px-2 py-0.5 rounded font-bold uppercase">{shot.camera.movement}</span>
                                                        <span className="bg-white/10 text-white/50 text-xs px-2 py-0.5 rounded uppercase">{shot.camera.angle}</span>
                                                    </div>
                                                </div>

                                                {/* Visual Action Description */}
                                                <div>
                                                    <div className="text-[10px] uppercase tracking-wide text-white/30 mb-1">Visual Action</div>
                                                    <textarea
                                                        value={shot.action}
                                                        onChange={(e) => updateShot(activeScene.sceneId, shot.shotId, 'action', e.target.value)}
                                                        className="w-full bg-transparent text-sm text-white resize-none border-b border-transparent focus:border-white/30 outline-none leading-relaxed"
                                                        rows={2}
                                                    />
                                                </div>

                                                {/* Lyric / Audio Sync */}
                                                {shot.audioSync?.lineText && (
                                                    <div className="bg-black/30 p-2 rounded border border-white/5">
                                                        <div className="flex items-center gap-2 mb-1">
                                                            <PlayCircle size={10} className="text-green-400" />
                                                            <span className="text-[10px] uppercase text-green-400/70 font-bold">Lip Sync Line</span>
                                                        </div>
                                                        <p className="text-sm text-white/80 italic font-serif">"{shot.audioSync.lineText}"</p>
                                                    </div>
                                                )}

                                                <div className="flex gap-4 text-xs text-white/30 pt-2 border-t border-white/5">
                                                    <span>Lens: {shot.camera.lensFeel}</span>
                                                    <span>Style: {shot.promptIntent?.visualStyle}</span>
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
