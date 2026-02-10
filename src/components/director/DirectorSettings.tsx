
"use client";

import { StratifyProject, DirectorProfile } from "@/types/stratify";
import { Camera, Clapperboard, Monitor, Settings, ArrowRight, ArrowLeft } from "lucide-react";

interface Props {
    project: StratifyProject;
    updateProject: (p: StratifyProject) => void;
    onNext: () => void;
    onBack: () => void;
}

export default function DirectorSettings({ project, updateProject, onNext, onBack }: Props) {

    const updateProfile = (field: keyof DirectorProfile | string, value: any) => {
        const updated = { ...project };
        if (field.includes('.')) {
            const [parent, child] = field.split('.');
            // @ts-ignore
            updated.project.directorProfile.cameraLanguage[child] = value;
        } else {
            // @ts-ignore
            updated.project.directorProfile[field] = value;
        }
        updateProject(updated);
    };

    const updateOutput = (field: string, value: any) => {
        const updated = { ...project };
        // @ts-ignore
        updated.project.outputSpec[field] = value;
        updateProject(updated);
    };

    return (
        <div className="max-w-5xl mx-auto space-y-8 animate-in fade-in slide-in-from-right-8 duration-500">
            <div className="text-center space-y-2">
                <h2 className="text-3xl font-bold text-white">Director's Chair</h2>
                <p className="text-white/50">Configure the cinematography style and technical output specs.</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">

                {/* Visual Style */}
                <div className="bg-white/5 border border-white/10 rounded-2xl p-8 space-y-6">
                    <div className="flex items-center gap-3 text-xl font-bold text-orange-400 mb-4">
                        <Clapperboard size={24} />
                        <h3>Cinematography</h3>
                    </div>

                    <div className="space-y-4">
                        <div className="space-y-2">
                            <label className="text-xs uppercase font-bold text-white/40">Directing Style Preset</label>
                            <select
                                value={project.project.directorProfile.stylePreset}
                                onChange={(e) => updateProfile('stylePreset', e.target.value)}
                                className="w-full bg-black/50 border border-white/10 rounded-lg p-3 text-white focus:outline-none focus:border-orange-500"
                            >
                                <option value="Cinematic Blocked">Cinematic Blocked (Spielberg-esque)</option>
                                <option value="Performance-Heavy">Performance Heavy (Music Video Standard)</option>
                                <option value="Story-Driven">Story Driven (Narrative Focus)</option>
                                <option value="Chaotic/Raw">Chaotic / Raw (Handheld, Punk)</option>
                                <option value="Minimalist">Minimalist (Slow, Static)</option>
                            </select>
                            <p className="text-xs text-white/30">Determines how scenes are broken down and blocked.</p>
                        </div>

                        <div className="space-y-2">
                            <label className="text-xs uppercase font-bold text-white/40">Camera Language</label>
                            <div className="grid grid-cols-2 gap-4">
                                <div>
                                    <span className="text-xs text-white/50 block mb-1">Lens Feel</span>
                                    <select
                                        value={project.project.directorProfile.cameraLanguage.defaultLensFeel}
                                        onChange={(e) => updateProfile('cameraLanguage.defaultLensFeel', e.target.value)}
                                        className="w-full bg-black/50 border border-white/10 rounded-lg p-2 text-sm text-white"
                                    >
                                        <option value="wide">Wide (Dynamic)</option>
                                        <option value="normal">Normal (Realistic)</option>
                                        <option value="telephoto">Telephoto (Cinematic)</option>
                                    </select>
                                </div>
                                <div>
                                    <span className="text-xs text-white/50 block mb-1">Coverage</span>
                                    <select
                                        value={project.project.directorProfile.coveragePreference}
                                        onChange={(e) => updateProfile('coveragePreference', e.target.value)}
                                        className="w-full bg-black/50 border border-white/10 rounded-lg p-2 text-sm text-white"
                                    >
                                        <option value="standard">Standard</option>
                                        <option value="minimal">Minimal (Long takes)</option>
                                        <option value="coverage-heavy">Heavy (Fast cuts)</option>
                                    </select>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Technical Specs */}
                <div className="bg-white/5 border border-white/10 rounded-2xl p-8 space-y-6">
                    <div className="flex items-center gap-3 text-xl font-bold text-cyan-400 mb-4">
                        <Monitor size={24} />
                        <h3>Output Specs</h3>
                    </div>

                    <div className="space-y-4">
                        <div className="grid grid-cols-2 gap-4">
                            <div className="space-y-2">
                                <label className="text-xs uppercase font-bold text-white/40">Aspect Ratio</label>
                                <select
                                    value={project.project.outputSpec.aspectRatio}
                                    onChange={(e) => updateOutput('aspectRatio', e.target.value)}
                                    className="w-full bg-black/50 border border-white/10 rounded-lg p-3 text-white focus:outline-none focus:border-cyan-500"
                                >
                                    <option value="16:9">16:9 (YouTube)</option>
                                    <option value="9:16">9:16 (Shorts/Reels)</option>
                                    <option value="21:9">21:9 (Cinema)</option>
                                    <option value="1:1">1:1 (Social)</option>
                                </select>
                            </div>
                            <div className="space-y-2">
                                <label className="text-xs uppercase font-bold text-white/40">Resolution</label>
                                <select
                                    value={project.project.outputSpec.resolution}
                                    onChange={(e) => updateOutput('resolution', e.target.value)}
                                    className="w-full bg-black/50 border border-white/10 rounded-lg p-3 text-white focus:outline-none focus:border-cyan-500"
                                >
                                    <option value="1080p">1080p HD</option>
                                    <option value="4k">4K UHD</option>
                                </select>
                            </div>
                        </div>
                    </div>

                    <div className="pt-4 border-t border-white/10">
                        <div className="flex items-center gap-2 p-3 bg-cyan-900/20 border border-cyan-500/20 rounded-lg">
                            <Settings className="text-cyan-400" size={16} />
                            <p className="text-xs text-cyan-200/70">
                                These settings will calibrate the prompt engineer agent to output optimized commands for your target AI model (Veo, Runway, etc).
                            </p>
                        </div>
                    </div>
                </div>

            </div>

            <div className="flex justify-between pt-8 border-t border-white/10">
                <button onClick={onBack} className="text-white/50 hover:text-white flex items-center gap-2 px-4 py-2">
                    <ArrowLeft size={16} /> Back
                </button>
                <button
                    onClick={onNext}
                    className="group flex items-center gap-2 bg-gradient-to-r from-cyan-600 to-blue-600 hover:from-cyan-500 hover:to-blue-500 text-white px-8 py-3 rounded-full font-bold transition-all"
                >
                    Generate Storyboard
                    <ArrowRight className="group-hover:translate-x-1 transition-transform" />
                </button>
            </div>
        </div>
    );
}
