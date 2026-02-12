
import React from 'react';
import { StratifyProject } from '@/types/stratify';

interface StepProps {
    project: StratifyProject;
    updateProject: (p: any) => void;
    onNext: () => void;
}

export const IntakeStep: React.FC<StepProps> = ({ project, updateProject, onNext }) => {

    const handleChange = (field: string, value: any) => {
        updateProject({
            ...project,
            song: { ...project.song, [field]: value }
        });
    };

    const handleCastChange = (field: string, value: any) => {
        updateProject({
            ...project,
            cast: {
                ...project.cast,
                lead: { ...project.cast.lead, [field]: value }
            }
        });
    };

    return (
        <div className="space-y-8 max-w-4xl mx-auto">
            <div className="text-center space-y-2">
                <h2 className="text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-white to-gray-500">
                    The Producer's Office
                </h2>
                <p className="text-gray-400">Let's get the basics down before we bring in the creative team.</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {/* SONG DATA */}
                <section className="space-y-4 bg-black/20 p-6 rounded-xl border border-gray-800">
                    <h3 className="text-xl font-bold text-emerald-400 flex items-center gap-2">
                        🎵 The Track
                    </h3>

                    <div>
                        <label className="block text-xs text-gray-500 mb-1">Song Title</label>
                        <input
                            type="text"
                            className="w-full bg-gray-900 border border-gray-700 rounded p-3 text-white focus:border-emerald-500 outline-none transition-colors"
                            placeholder="e.g. Midnight City"
                            value={project.song.title}
                            onChange={(e) => handleChange('title', e.target.value)}
                        />
                    </div>

                    <div>
                        <label className="block text-xs text-gray-500 mb-1">Lyrics (Paste Full Text)</label>
                        <textarea
                            className="w-full h-40 bg-gray-900 border border-gray-700 rounded p-3 text-white focus:border-emerald-500 outline-none transition-colors font-mono text-sm"
                            placeholder="Verse 1..."
                            value={project.song.lyrics.rawText}
                            onChange={(e) => handleChange('lyrics', { rawText: e.target.value })}
                        />
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                        <div>
                            <label className="block text-xs text-gray-500 mb-1">Genre</label>
                            <input
                                type="text"
                                className="w-full bg-gray-900 border border-gray-700 rounded p-2 text-white"
                                placeholder="Synthwave"
                                value={project.song.genre}
                                onChange={(e) => handleChange('genre', e.target.value)}
                            />
                        </div>
                        <div>
                            <label className="block text-xs text-gray-500 mb-1">BPM</label>
                            <input
                                type="number"
                                className="w-full bg-gray-900 border border-gray-700 rounded p-2 text-white"
                                value={project.song.bpm}
                                onChange={(e) => handleChange('bpm', parseInt(e.target.value))}
                            />
                        </div>
                        <div className="col-span-2">
                            {/* Audio file is now auto-detected from Song Title via albumData.ts */}
                        </div>
                    </div>
                </section>

                {/* VISUAL & CAST DATA */}
                <section className="space-y-4 bg-black/20 p-6 rounded-xl border border-gray-800">
                    <h3 className="text-xl font-bold text-purple-400 flex items-center gap-2">
                        🎥 The Vision & Cast
                    </h3>

                    <div>
                        <label className="block text-xs text-gray-500 mb-1">Lead Artist Name</label>
                        <input
                            type="text"
                            className="w-full bg-gray-900 border border-gray-700 rounded p-3 text-white focus:border-purple-500 outline-none transition-colors"
                            placeholder="e.g. The Weeknd"
                            value={project.cast.lead?.name}
                            onChange={(e) => handleCastChange('name', e.target.value)}
                        />
                    </div>

                    {/* Character Reference Image */}
                    <div className="bg-gray-900 border border-gray-700 rounded p-4">
                        <label className="block text-xs text-gray-500 mb-2 uppercase tracking-wider">Visual Reference (e.g. Album Cover)</label>
                        <div className="flex gap-4 items-center">
                            <input
                                type="file"
                                accept="image/*"
                                onChange={async (e) => {
                                    const file = e.target.files?.[0];
                                    if (!file) return;

                                    // 1. Show Preview (Optional, handled by simple text for now)
                                    // 2. Upload/Analyze
                                    const formData = new FormData();
                                    formData.append("image", file);

                                    try {
                                        const btn = document.getElementById('analyze-btn') as HTMLButtonElement;
                                        if (btn) btn.innerText = "Analyzing...";

                                        const res = await fetch('/api/director/analyze-character', {
                                            method: 'POST',
                                            body: formData
                                        });
                                        const data = await res.json();

                                        if (data.error) throw new Error(data.error);

                                        // 3. Auto-Fill
                                        updateProject({
                                            ...project,
                                            cast: {
                                                ...project.cast,
                                                lead: {
                                                    ...project.cast.lead,
                                                    ageRange: project.cast.lead.ageRange || data.face, // Fallback/Overwrite logic?
                                                    wardrobeSignature: [data.wardrobe],
                                                    lookSpec: { ...project.cast.lead.lookSpec, face: data.face, style: data.vibe },
                                                    extractedVisuals: data
                                                }
                                            }
                                        });
                                        if (btn) btn.innerText = "✅ Look Extracted";

                                    } catch (err: any) {
                                        console.error("Image analysis error:", err);
                                        const btn = document.getElementById('analyze-btn') as HTMLButtonElement;
                                        if (btn) btn.innerText = "❌ Analysis Failed";

                                        // Show specific error message
                                        const errorMsg = err.message || "Unknown error occurred";
                                        alert(`Failed to analyze image: ${errorMsg}\n\nPlease try again or use a different image.`);
                                    }
                                }}
                                className="text-xs text-gray-400 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-xs file:font-semibold file:bg-purple-900 file:text-purple-400 hover:file:bg-purple-800"
                            />
                            <button id="analyze-btn" disabled className="text-xs text-purple-400 font-mono">
                                {project.cast.lead.extractedVisuals ? "✅ Look Extracted" : "Upload to Analyze"}
                            </button>
                        </div>
                        {project.cast.lead.extractedVisuals && (
                            <div className="mt-2 text-[10px] text-gray-500 bg-black/40 p-2 rounded border border-gray-800">
                                <span className="text-purple-400 block mb-1">AI ANALYSIS:</span>
                                {project.cast.lead.extractedVisuals.face} • {project.cast.lead.extractedVisuals.wardrobe}
                            </div>
                        )}
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                        <div>
                            <label className="block text-xs text-gray-500 mb-1">Look / Style</label>
                            <input
                                type="text"
                                className="w-full bg-gray-900 border border-gray-700 rounded p-2 text-white"
                                placeholder="Red Suit, Bandaged Node"
                                value={project.cast.lead?.wardrobeSignature?.join(', ')}
                                onChange={(e) => handleCastChange('wardrobeSignature', e.target.value.split(','))}
                            />
                        </div>
                        <div>
                            <label className="block text-xs text-gray-500 mb-1">Age Range</label>
                            <input
                                type="text"
                                className="w-full bg-gray-900 border border-gray-700 rounded p-2 text-white"
                                value={project.cast.lead?.ageRange}
                                onChange={(e) => handleCastChange('ageRange', e.target.value)}
                            />
                        </div>
                    </div>

                    <div className="pt-4 border-t border-gray-800">
                        <label className="block text-xs text-gray-500 mb-2">Director's Approach</label>
                        <div className="flex gap-2">
                            {['performance-first', 'story-first', 'hybrid'].map((mode) => (
                                <button
                                    key={mode}
                                    onClick={() => updateProject({
                                        ...project,
                                        project: {
                                            ...project.project,
                                            directorProfile: { ...project.project.directorProfile, narrativePreference: mode }
                                        }
                                    })}
                                    className={`flex-1 py-2 rounded text-xs font-bold border ${project.project.directorProfile.narrativePreference === mode
                                        ? 'bg-purple-500 text-white border-purple-500'
                                        : 'bg-transparent text-gray-500 border-gray-700 hover:border-gray-500'
                                        }`}
                                >
                                    {mode.toUpperCase()}
                                </button>
                            ))}
                        </div>
                    </div>
                </section>
            </div>

            <div className="flex justify-center pt-8">
                <button
                    onClick={onNext}
                    disabled={!project.song.title || !project.song.lyrics.rawText}
                    className="px-8 py-3 bg-white text-black rounded-full font-bold text-lg hover:scale-105 transition-transform disabled:opacity-50 disabled:scale-100"
                >
                    Confirm & Enter Studio →
                </button>
            </div>
        </div>
    );
};
