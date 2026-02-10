
"use client";

import { useState } from "react";
import { StratifyProject } from "@/types/stratify";
import { Music, FileText, mic, ArrowRight } from "lucide-react";

interface Props {
    project: StratifyProject;
    updateProject: (p: StratifyProject) => void;
    onNext: () => void;
}

export default function ProjectSetup({ project, updateProject, onNext }: Props) {
    const [lyrics, setLyrics] = useState(project.song.lyrics.rawText);
    const [title, setTitle] = useState(project.project.title);
    const [artist, setArtist] = useState(project.project.artistName || "");

    const handleSave = () => {
        const updated = { ...project };
        updated.project.title = title;
        updated.project.artistName = artist;
        updated.song.lyrics.rawText = lyrics;
        updated.song.title = title;
        updateProject(updated);
        onNext();
    };

    return (
        <div className="max-w-4xl mx-auto space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
            <div className="text-center space-y-2">
                <h2 className="text-3xl font-bold text-white">Project Setup</h2>
                <p className="text-white/50">Start by defining the core elements of your music video.</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {/* Left: Metadata */}
                <div className="space-y-6">
                    <div className="bg-white/5 border border-white/10 rounded-xl p-6 space-y-4">
                        <div className="flex items-center gap-2 text-xl font-bold text-violet-400">
                            <Music size={24} />
                            <h3>Song Details</h3>
                        </div>

                        <div className="space-y-2">
                            <label className="text-xs uppercase font-bold text-white/40">Project / Song Title</label>
                            <input
                                type="text"
                                value={title}
                                onChange={(e) => setTitle(e.target.value)}
                                className="w-full bg-black/50 border border-white/10 rounded-lg p-3 text-white focus:outline-none focus:border-violet-500 transition-colors"
                                placeholder="e.g. Bohemian Rhapsody"
                            />
                        </div>

                        <div className="space-y-2">
                            <label className="text-xs uppercase font-bold text-white/40">Artist Name</label>
                            <input
                                type="text"
                                value={artist}
                                onChange={(e) => setArtist(e.target.value)}
                                className="w-full bg-black/50 border border-white/10 rounded-lg p-3 text-white focus:outline-none focus:border-violet-500 transition-colors"
                                placeholder="e.g. Queen"
                            />
                        </div>

                        <div className="grid grid-cols-2 gap-4">
                            <div className="space-y-2">
                                <label className="text-xs uppercase font-bold text-white/40">Genre</label>
                                <select
                                    className="w-full bg-black/50 border border-white/10 rounded-lg p-3 text-white focus:outline-none focus:border-violet-500"
                                    value={project.song.genre}
                                    onChange={(e) => {
                                        const p = { ...project };
                                        p.song.genre = e.target.value;
                                        updateProject(p);
                                    }}
                                >
                                    <option value="Pop">Pop</option>
                                    <option value="Rock">Rock</option>
                                    <option value="Hip Hop">Hip Hop</option>
                                    <option value="EDM">EDM</option>
                                    <option value="Country">Country</option>
                                    <option value="R&B">R&B</option>
                                    <option value="Alternative">Alternative</option>
                                </select>
                            </div>
                            <div className="space-y-2">
                                <label className="text-xs uppercase font-bold text-white/40">BPM (Est.)</label>
                                <input
                                    type="number"
                                    className="w-full bg-black/50 border border-white/10 rounded-lg p-3 text-white focus:outline-none focus:border-violet-500"
                                    placeholder="120"
                                    value={project.song.bpm || 120}
                                    onChange={(e) => {
                                        const p = { ...project };
                                        p.song.bpm = parseInt(e.target.value);
                                        updateProject(p);
                                    }}
                                />
                            </div>
                        </div>
                    </div>
                </div>

                {/* Right: Lyrics */}
                <div className="space-y-6">
                    <div className="bg-white/5 border border-white/10 rounded-xl p-6 h-full flex flex-col">
                        <div className="flex items-center justify-between mb-4">
                            <div className="flex items-center gap-2 text-xl font-bold text-pink-400">
                                <FileText size={24} />
                                <h3>Lyrics</h3>
                            </div>
                            <span className="text-xs text-white/30 bg-white/5 px-2 py-1 rounded">Auto-Analysis Ready</span>
                        </div>

                        <textarea
                            value={lyrics}
                            onChange={(e) => setLyrics(e.target.value)}
                            className="flex-1 w-full bg-black/50 border border-white/10 rounded-lg p-4 text-sm text-gray-300 font-mono leading-relaxed focus:outline-none focus:border-pink-500 transition-colors resize-none min-h-[300px]"
                            placeholder="Paste your full lyrics here...&#10;&#10;[Verse 1]&#10;Is this the real life?&#10;Is this just fantasy?&#10;&#10;[Chorus]&#10;Caught in a landslide..."
                        />
                    </div>
                </div>
            </div>

            <div className="flex justify-end pt-8">
                <button
                    onClick={handleSave}
                    disabled={!title || !lyrics}
                    className="group flex items-center gap-2 bg-gradient-to-r from-violet-600 to-pink-600 hover:from-violet-500 hover:to-pink-500 text-white px-8 py-4 rounded-full font-bold text-lg transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                >
                    Analyze & Continue
                    <ArrowRight className="group-hover:translate-x-1 transition-transform" />
                </button>
            </div>
        </div>
    );
}
