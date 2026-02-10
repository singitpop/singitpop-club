
"use client";

import { StratifyProject, ToolRender } from "@/types/stratify";
import { StratifyAI } from "@/services/stratify/stratifyAI";
import { Zap, Copy, Download, CheckCircle, Terminal, FileText, ArrowLeft } from "lucide-react";
import { useState, useEffect } from "react";

interface Props {
    project: StratifyProject;
    onBack: () => void;
}

export default function ProductionOffice({ project, onBack }: Props) {
    const [activeTool, setActiveTool] = useState<'veo' | 'runway' | 'pika' | 'luma'>('veo');
    const [prompts, setPrompts] = useState<any[]>([]);
    const [isCopied, setIsCopied] = useState(false);

    useEffect(() => {
        // Generate prompts on mount or tool change
        const packs = StratifyAI.generatePromptPack(project, activeTool);
        setPrompts(packs);
    }, [activeTool, project]);

    const copyToClipboard = () => {
        const text = prompts.map(p => `[SCENE ${p.sceneId.substring(0, 4)} SHOT ${p.shotId.substring(0, 4)}]\n${p.prompt}`).join('\n\n---\n\n');
        navigator.clipboard.writeText(text);
        setIsCopied(true);
        setTimeout(() => setIsCopied(false), 2000);
    };

    return (
        <div className="h-full flex flex-col animate-in fade-in duration-500 max-w-6xl mx-auto w-full">
            <div className="text-center mb-8">
                <h2 className="text-3xl font-bold text-white mb-2">Production Office</h2>
                <p className="text-white/50">Export your director pack and generate tool-specific prompts.</p>
            </div>

            <div className="grid grid-cols-12 gap-8 flex-1 min-h-0">

                {/* Left: Tools & Stats */}
                <div className="col-span-4 space-y-6">
                    <div className="bg-white/5 border border-white/10 rounded-xl p-6">
                        <h3 className="text-sm font-bold text-white/60 uppercase mb-4">Prompt Engine</h3>
                        <div className="grid grid-cols-2 gap-3">
                            {(['veo', 'runway', 'luma', 'pika'] as const).map(tool => (
                                <button
                                    key={tool}
                                    onClick={() => setActiveTool(tool)}
                                    className={`p-3 rounded-lg border text-sm font-bold capitalize transition-all ${activeTool === tool
                                            ? "bg-white text-black border-white"
                                            : "bg-black/40 border-white/10 text-white/50 hover:border-white/30"
                                        }`}
                                >
                                    {tool}
                                </button>
                            ))}
                        </div>
                    </div>

                    <div className="bg-white/5 border border-white/10 rounded-xl p-6 space-y-4">
                        <h3 className="text-sm font-bold text-white/60 uppercase">Deliverables</h3>

                        <button className="w-full flex items-center justify-between p-3 bg-black/40 rounded-lg hover:bg-white/5 border border-white/5 hover:border-white/20 transition-all text-left group">
                            <div className="flex items-center gap-3">
                                <FileText className="text-red-400" size={18} />
                                <span className="text-sm font-medium text-gray-300">Director's Bible.pdf</span>
                            </div>
                            <Download size={14} className="opacity-0 group-hover:opacity-50" />
                        </button>

                        <button className="w-full flex items-center justify-between p-3 bg-black/40 rounded-lg hover:bg-white/5 border border-white/5 hover:border-white/20 transition-all text-left group">
                            <div className="flex items-center gap-3">
                                <Terminal className="text-green-400" size={18} />
                                <span className="text-sm font-medium text-gray-300">Shotlist.json</span>
                            </div>
                            <Download size={14} className="opacity-0 group-hover:opacity-50" />
                        </button>
                    </div>

                    <button onClick={onBack} className="flex items-center gap-2 text-white/40 hover:text-white transition-colors text-sm px-2">
                        <ArrowLeft size={14} /> Back to Storyboard
                    </button>
                </div>

                {/* Right: Prompt Output */}
                <div className="col-span-8 flex flex-col bg-black/50 border border-white/10 rounded-xl overflow-hidden shadow-2xl">
                    <div className="bg-white/5 p-4 border-b border-white/5 flex justify-between items-center">
                        <div className="flex items-center gap-2">
                            <Zap className="text-yellow-400 fill-yellow-400" size={16} />
                            <span className="font-bold text-white">{activeTool.toUpperCase()} Prompts</span>
                            <span className="text-xs bg-white/10 px-2 py-0.5 rounded text-white/50">{prompts.length} Shots</span>
                        </div>
                        <button
                            onClick={copyToClipboard}
                            className={`flex items-center gap-2 px-3 py-1.5 rounded-lg text-xs font-bold transition-all ${isCopied ? "bg-green-500/20 text-green-400" : "bg-white/10 hover:bg-white/20 text-white"
                                }`}
                        >
                            {isCopied ? <CheckCircle size={14} /> : <Copy size={14} />}
                            {isCopied ? "Copied!" : "Copy All"}
                        </button>
                    </div>

                    <div className="flex-1 overflow-y-auto custom-scrollbar p-6 space-y-6">
                        {prompts.map((p, idx) => (
                            <div key={idx} className="space-y-2">
                                <div className="flex items-center gap-2 text-[10px] text-white/30 font-mono uppercase">
                                    <span>Shot {idx + 1}</span>
                                    <div className="h-px flex-1 bg-white/5" />
                                </div>
                                <div className="bg-black/40 rounded p-4 border border-white/5 text-sm text-gray-300 font-mono whitespace-pre-wrap leading-relaxed">
                                    {p.prompt}
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

            </div>
        </div>
    );
}
