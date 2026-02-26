
import React, { useState } from 'react';
import { StratifyProject, Scene, Shot } from '@/types/stratify';
import { motion } from 'framer-motion';
import { compileMasterPrompt } from '@/services/stratify/promptCompiler';

// ... imports

interface StepProps {
    project: StratifyProject;
    updateProject?: (p: any) => void;
    onReset: () => void;
    onBack: () => void;
}

export const ScriptView: React.FC<StepProps> = ({ project, updateProject, onReset, onBack }) => {

    const [copiedId, setCopiedId] = useState<string | null>(null);

    const handleCopy = (text: string, id: string) => {
        navigator.clipboard.writeText(text);
        setCopiedId(id);
        setTimeout(() => setCopiedId(null), 2000);
    };

    const handleDownload = () => {
        const dataStr = "data:text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(project, null, 2));
        const downloadAnchorNode = document.createElement('a');
        downloadAnchorNode.setAttribute("href", dataStr);
        downloadAnchorNode.setAttribute("download", `${project.song.title.replace(/\s+/g, '_')}_Director_Pack.json`);
        document.body.appendChild(downloadAnchorNode);
        downloadAnchorNode.click();
        downloadAnchorNode.remove();
    };

    const handleEffectChange = (sceneId: string, value: string) => {
        if (!updateProject) return;
        const updatedScenes = project.scenes.map(s =>
            s.sceneId === sceneId ? { ...s, visualEffect: value as any } : s
        );
        updateProject({
            ...project,
            scenes: updatedScenes
        });
    };

    return (
        <div className="space-y-8 max-w-6xl mx-auto pb-20">
            {/* HEADER ACTIONS */}
            <div className="flex justify-between items-end border-b border-gray-800 pb-6">
                <div>
                    <div className="flex items-center gap-4 mb-2">
                        <button
                            onClick={onBack}
                            className="text-gray-500 hover:text-white flex items-center gap-2 text-sm font-bold transition-colors"
                        >
                            ← Back to Director
                        </button>
                    </div>
                    <h2 className="text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-emerald-400 to-cyan-500">
                        Production Script
                    </h2>
                    <div className="flex flex-wrap gap-2 mt-2">
                        <span className="bg-gray-800 text-gray-400 px-2 py-1 rounded text-xs font-mono border border-gray-700">
                            {project.scenes?.length || 0} Scenes
                        </span>
                        <span className="bg-gray-800 text-gray-400 px-2 py-1 rounded text-xs font-mono border border-gray-700">
                            {project.project.outputSpec.resolution} • {project.project.outputSpec.aspectRatio}
                        </span>
                        {project.project.outputSpec.veoTemplate && (
                            <span className="bg-gradient-to-r from-purple-900 to-indigo-900 text-white px-2 py-1 rounded text-xs font-bold border border-purple-500 shadow-sm shadow-purple-500/20">
                                🎬 VEO TEMPLATE: {project.project.outputSpec.veoTemplate.toUpperCase()}
                            </span>
                        )}
                    </div>
                </div>
                <div className="flex gap-4">
                    <button
                        onClick={handleDownload}
                        className="px-6 py-2 bg-gray-800 hover:bg-gray-700 rounded-lg text-sm font-bold border border-gray-700 transition-colors"
                    >
                        💾 Download Project JSON
                    </button>
                    <button
                        onClick={() => {
                            if (confirm("Are you sure? This will DELETE your current project and script.")) {
                                onReset();
                            }
                        }}
                        className="px-6 py-2 bg-red-900/40 hover:bg-red-900/60 text-red-400 rounded-lg text-sm font-bold border border-red-900/50 transition-colors"
                    >
                        🗑️ Delete Project & Start Over
                    </button>
                </div>
            </div>

            {/* TOOL SELECTOR (Global) REMOVED FOR PIPELINE VIEW */}

            {/* SCENE LIST */}
            <div className="space-y-12">
                {project.scenes?.map((scene: Scene) => (
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        key={scene.sceneId}
                        className="bg-gray-900/30 border border-gray-800 rounded-2xl overflow-hidden"
                    >
                        {/* SCENE HEADER */}
                        <div className="bg-gray-900/80 p-6 border-b border-gray-800 flex justify-between items-center">
                            <div>
                                <h3 className="text-xl font-bold text-white mb-1">
                                    {scene.index}. {scene.title.toUpperCase()}
                                </h3>
                                <p className="text-sm text-gray-400 font-mono">
                                    {scene.locationId} • {scene.mood.visual} • {scene.mood.lighting}
                                </p>
                            </div>
                            <div className="flex items-center gap-4">
                                <div className="flex items-center gap-2">
                                    <label className="text-[10px] text-gray-500 font-bold uppercase tracking-wider">Visual Effect</label>
                                    <select
                                        value={scene.visualEffect || 'none'}
                                        onChange={(e) => handleEffectChange(scene.sceneId, e.target.value)}
                                        className="bg-black/50 border border-gray-700 text-xs font-mono text-gray-300 rounded px-2 py-1 outline-none focus:border-emerald-500"
                                    >
                                        <option value="none">None</option>
                                        <option value="dust">Dust</option>
                                        <option value="pulse">Pulse</option>
                                        <option value="flash">Flash</option>
                                        <option value="grain">Grain</option>
                                        <option value="vhs">VHS</option>
                                        <option value="chromatic">Chromatic</option>
                                        <option value="bloom">Bloom</option>
                                        <option value="shake">Shake</option>
                                        <option value="film-damage">Film Damage</option>
                                        <option value="light-leak">Light Leak</option>
                                    </select>
                                </div>
                                <div className="bg-black/50 px-4 py-2 rounded text-xs font-mono text-gray-500">
                                    {scene.shots.length} SHOTS
                                </div>
                            </div>
                        </div>

                        {/* SHOT LIST */}
                        <div className="divide-y divide-gray-800/50">
                            {scene.shots.map((shot: Shot) => (
                                <div key={shot.shotId} className="p-6 hover:bg-white/5 transition-colors group">
                                    <div className="flex gap-6">

                                        {/* SHOT META (Left) */}
                                        <div className="w-32 flex-shrink-0">
                                            <div className="text-4xl font-black text-gray-800 group-hover:text-emerald-500/20 transition-colors">
                                                {shot.index.toString().padStart(2, '0')}
                                            </div>
                                            <div className="mt-2 text-xs font-bold text-emerald-400 bg-emerald-900/20 px-2 py-1 rounded inline-block">
                                                {shot.shotType}
                                            </div>
                                            <div className="mt-2 text-xs text-gray-500 font-mono">
                                                {shot.camera.movement}
                                            </div>
                                            <div className="mt-1 text-xs text-gray-600">
                                                {shot.durationSec}s
                                            </div>
                                        </div>

                                        {/* SHOT CONTENT (Middle) */}
                                        <div className="flex-grow space-y-3">
                                            {/* Cinematic Details */}
                                            <div className="grid grid-cols-2 gap-2 mb-3 bg-gray-900/50 p-3 rounded text-xs border border-gray-700">
                                                <div>
                                                    <span className="text-gray-500 block text-[10px] uppercase tracking-wider">Comp & Camera</span>
                                                    <span className="text-emerald-400 font-mono">
                                                        {shot.composition || 'Standard'} • {shot.camera.movement} ({shot.camera.angle})
                                                    </span>
                                                </div>
                                                <div>
                                                    <span className="text-gray-500 block text-[10px] uppercase tracking-wider">Audio & Ambience</span>
                                                    <span className="text-cyan-400">
                                                        {shot.audioEnvironment || 'Room tone'}
                                                    </span>
                                                </div>
                                                <div className="col-span-2 mt-2 pt-2 border-t border-gray-800">
                                                    <span className="text-gray-500 block text-[10px] uppercase tracking-wider mb-1">Action Breakdown</span>
                                                    <div className="text-gray-300">
                                                        <span className="text-emerald-500 font-bold bg-emerald-950/30 px-1 rounded mr-2">FG</span>
                                                        {shot.foregroundAction || shot.action}
                                                    </div>
                                                    {shot.backgroundAction && (
                                                        <div className="text-gray-400 mt-1">
                                                            <span className="text-blue-500 font-bold bg-blue-950/30 px-1 rounded mr-2">BG</span>
                                                            {shot.backgroundAction}
                                                        </div>
                                                    )}
                                                </div>
                                            </div>

                                            {/* Audio Sync */}
                                            {shot.audioSync.mode !== 'none' && (
                                                <div className="flex items-center gap-2 text-xs text-purple-400 font-mono bg-purple-900/10 px-3 py-2 rounded border border-purple-900/30">
                                                    <span>🎤 LIP SYNC:</span>
                                                    <span className="italic text-white">"{shot.audioSync.lyricLineText}"</span>
                                                    {project.song.audioFile && (
                                                        <span className="text-gray-500 border-l border-gray-700 pl-2 ml-2">
                                                            Ref: {project.song.audioFile}
                                                        </span>
                                                    )}
                                                </div>
                                            )}
                                        </div>

                                        {/* PIPELINE PROMPTS (Right) */}
                                        <div className="w-1/3 flex-shrink-0 flex flex-col gap-4">

                                            {/* MASTER PROMPT */}
                                            <div className="relative border border-cyan-500/40 bg-cyan-950/20 rounded-lg p-3">
                                                <div className="flex justify-between items-center mb-2">
                                                    <span className="text-[10px] font-bold uppercase text-cyan-300 tracking-wider">
                                                        🎯 Master Prompt · Google Flow / Gemini
                                                    </span>
                                                    <button
                                                        onClick={() => {
                                                            const master = compileMasterPrompt(project, shot);
                                                            handleCopy(master, `${shot.shotId}-master`);
                                                        }}
                                                        className={`text-[10px] px-3 py-1 rounded font-bold transition-all ${copiedId === `${shot.shotId}-master`
                                                                ? 'bg-cyan-400 text-black scale-95'
                                                                : 'bg-cyan-700 hover:bg-cyan-500 text-white'
                                                            }`}
                                                    >
                                                        {copiedId === `${shot.shotId}-master` ? '✓ COPIED!' : 'COPY ALL'}
                                                    </button>
                                                </div>
                                                <div className="text-[11px] text-cyan-100/70 font-mono h-28 overflow-y-auto leading-relaxed">
                                                    {compileMasterPrompt(project, shot)}
                                                </div>
                                            </div>

                                            {/* Step 1: Imagen 3 */}
                                            <div className="relative border border-emerald-900/50 bg-black rounded-lg p-3">
                                                <div className="flex justify-between items-center mb-2">
                                                    <span className="text-[10px] font-bold uppercase text-emerald-500 bg-emerald-900/20 px-2 py-0.5 rounded">
                                                        Step 1: Imagen 3 (First Frame)
                                                    </span>
                                                    <button
                                                        onClick={() => handleCopy(shot.toolPrompts?.imagen3 || shot.imagenPrompt || "", `${shot.shotId}-img`)}
                                                        className={`text-[10px] px-2 py-0.5 rounded font-bold transition-colors ${copiedId === `${shot.shotId}-img` ? 'bg-green-500 text-black' : 'bg-gray-800 text-gray-400 hover:text-white'}`}
                                                    >
                                                        {copiedId === `${shot.shotId}-img` ? "COPIED" : "COPY"}
                                                    </button>
                                                </div>
                                                <div className="text-[11px] text-gray-400 font-mono h-24 overflow-y-auto">
                                                    {shot.toolPrompts?.imagen3 || shot.imagenPrompt || "No image prompt generated."}
                                                </div>
                                            </div>

                                            {/* Step 2: Veo 3.1 */}
                                            <div className="relative border border-purple-900/50 bg-black rounded-lg p-3">
                                                <div className="flex justify-between items-center mb-2">
                                                    <span className="text-[10px] font-bold uppercase text-purple-400 bg-purple-900/20 px-2 py-0.5 rounded">
                                                        Step 2: Veo 3.1 (Motion)
                                                    </span>
                                                    <button
                                                        onClick={() => handleCopy(shot.toolPrompts?.veo3 || shot.veoPrompt || "", `${shot.shotId}-veo`)}
                                                        className={`text-[10px] px-2 py-0.5 rounded font-bold transition-colors ${copiedId === `${shot.shotId}-veo` ? 'bg-green-500 text-black' : 'bg-gray-800 text-gray-400 hover:text-white'}`}
                                                    >
                                                        {copiedId === `${shot.shotId}-veo` ? "COPIED" : "COPY"}
                                                    </button>
                                                </div>
                                                <div className="text-[11px] text-gray-400 font-mono h-24 overflow-y-auto">
                                                    {shot.toolPrompts?.veo3 || shot.veoPrompt || "No motion prompt generated."}
                                                </div>
                                            </div>
                                        </div>

                                    </div>
                                </div>
                            ))}
                        </div>
                    </motion.div>
                ))}
            </div>
        </div>
    );
};
