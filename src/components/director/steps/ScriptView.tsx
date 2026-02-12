
import React, { useState } from 'react';
import { StratifyProject, Scene, Shot } from '@/types/stratify';
import { motion } from 'framer-motion';

interface StepProps {
    project: StratifyProject;
    onReset: () => void;
}

export const ScriptView: React.FC<StepProps> = ({ project, onReset }) => {

    const [selectedTool, setSelectedTool] = useState<'veo' | 'runway' | 'luma' | 'kling' | 'pika'>('veo');
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

    return (
        <div className="space-y-8 max-w-6xl mx-auto pb-20">
            {/* HEADER ACTIONS */}
            <div className="flex justify-between items-end border-b border-gray-800 pb-6">
                <div>
                    <h2 className="text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-emerald-400 to-cyan-500">
                        Production Script
                    </h2>
                    <p className="text-gray-400 mt-2">
                        {project.scenes?.length || 0} Scenes • {project.project.outputSpec.resolution} • {project.project.outputSpec.aspectRatio}
                    </p>
                </div>
                <div className="flex gap-4">
                    <button
                        onClick={handleDownload}
                        className="px-6 py-2 bg-gray-800 hover:bg-gray-700 rounded-lg text-sm font-bold border border-gray-700 transition-colors"
                    >
                        💾 Download Project JSON
                    </button>
                    <button
                        onClick={onReset}
                        className="px-6 py-2 bg-red-900/40 hover:bg-red-900/60 text-red-400 rounded-lg text-sm font-bold border border-red-900/50 transition-colors"
                    >
                        New Project
                    </button>
                </div>
            </div>

            {/* TOOL SELECTOR (Global) */}
            <div className="flex justify-center gap-2 sticky top-4 z-10 bg-black/80 backdrop-blur-md p-2 rounded-xl border border-gray-800 w-fit mx-auto shadow-2xl">
                {['veo', 'runway', 'luma', 'kling', 'pika'].map((t) => (
                    <button
                        key={t}
                        onClick={() => setSelectedTool(t as any)}
                        className={`px-4 py-2 rounded-lg text-xs font-bold uppercase tracking-wider transition-all ${selectedTool === t
                            ? 'bg-emerald-500 text-black shadow-lg shadow-emerald-500/20'
                            : 'bg-transparent text-gray-500 hover:text-white'
                            }`}
                    >
                        {t}
                    </button>
                ))}
            </div>

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
                            <div className="bg-black/50 px-4 py-2 rounded text-xs font-mono text-gray-500">
                                {scene.shots.length} SHOTS
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

                                        {/* PROMPT BOX (Right) */}
                                        <div className="w-1/3 flex-shrink-0 relative">
                                            <div className="absolute -top-3 right-0">
                                                {/* Tool Badge */}
                                                <span className="text-[10px] font-bold uppercase bg-gray-800 text-gray-400 px-2 py-1 rounded-b">
                                                    {selectedTool} PROMPT
                                                </span>
                                            </div>

                                            <div className="bg-black border border-gray-800 rounded-lg p-3 text-xs text-gray-400 font-mono h-full max-h-40 overflow-y-auto mt-2">
                                                {shot.toolPrompts?.[selectedTool] || "No unique prompt generated."}
                                            </div>

                                            <button
                                                onClick={() => handleCopy(shot.toolPrompts?.[selectedTool] || "", shot.shotId)}
                                                className={`mt-2 w-full py-2 rounded text-xs font-bold transition-colors flex items-center justify-center gap-2 ${copiedId === shot.shotId
                                                    ? 'bg-green-500 text-black'
                                                    : 'bg-gray-800 hover:bg-gray-700 text-white'
                                                    }`}
                                            >
                                                {copiedId === shot.shotId ? "✅ COPIED" : "📋 COPY PROMPT"}
                                            </button>
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
