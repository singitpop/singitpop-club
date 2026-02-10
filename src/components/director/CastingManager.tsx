
"use client";

import { StratifyProject, Character } from "@/types/stratify";
import { User, Users, Plus, Trash2, ArrowRight, ArrowLeft, Shirt, Sparkles } from "lucide-react";
import { v4 as uuidv4 } from 'uuid';

interface Props {
    project: StratifyProject;
    updateProject: (p: StratifyProject) => void;
    onNext: () => void;
    onBack: () => void;
}

export default function CastingManager({ project, updateProject, onNext, onBack }: Props) {

    const updateCharacter = (isLead: boolean, index: number, field: string, value: any) => {
        const updated = { ...project };
        const char = isLead ? updated.cast.lead : updated.cast.band[index];

        if (field.includes('.')) {
            const [parent, child] = field.split('.');
            // @ts-ignore
            if (!char[parent]) char[parent] = {};
            // @ts-ignore
            char[parent][child] = value;
        } else {
            // @ts-ignore
            char[field] = value;
        }

        updateProject(updated);
    };

    const addBandMember = () => {
        if (project.cast.band.length >= 5) return;
        const updated = { ...project };
        updated.cast.band.push({
            characterId: uuidv4(),
            name: "Band Member " + (updated.cast.band.length + 1),
            role: 'guitarist',
            lookSpec: { style: 'realistic' },
            consistency: { strictness: 'medium' }
        });
        updateProject(updated);
    };

    const removeBandMember = (index: number) => {
        const updated = { ...project };
        updated.cast.band.splice(index, 1);
        updateProject(updated);
    };

    return (
        <div className="max-w-6xl mx-auto space-y-8 animate-in fade-in slide-in-from-right-8 duration-500">
            <div className="text-center space-y-2">
                <h2 className="text-3xl font-bold text-white">Casting & Character Bible</h2>
                <p className="text-white/50">Define the look and identity of your star and band members.</p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">

                {/* LEAD SINGER */}
                <div className="lg:col-span-12 xl:col-span-12">
                    <div className="bg-gradient-to-br from-violet-900/20 to-purple-900/20 border border-violet-500/30 rounded-2xl p-6 relative overflow-hidden">
                        <div className="absolute top-0 right-0 p-4 opacity-10">
                            <Sparkles size={120} />
                        </div>

                        <div className="flex items-center gap-4 mb-6 relative z-10">
                            <div className="w-16 h-16 rounded-full bg-violet-500 flex items-center justify-center text-white shadow-lg shadow-violet-500/30">
                                <User size={32} />
                            </div>
                            <div>
                                <h3 className="text-2xl font-bold text-white">Lead Star</h3>
                                <p className="text-violet-300 text-sm">The main focus of the video</p>
                            </div>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 relative z-10">
                            <div className="space-y-2">
                                <label className="text-xs uppercase font-bold text-white/40">Name</label>
                                <input
                                    type="text"
                                    value={project.cast.lead.name}
                                    onChange={(e) => updateCharacter(true, 0, 'name', e.target.value)}
                                    className="w-full bg-black/50 border border-white/10 rounded-lg p-3 text-white focus:outline-none focus:border-violet-500"
                                />
                            </div>
                            <div className="space-y-2">
                                <label className="text-xs uppercase font-bold text-white/40">Gender / Age</label>
                                <div className="flex gap-2">
                                    <select
                                        className="bg-black/50 border border-white/10 rounded-lg p-3 text-white flex-1"
                                        value={project.cast.lead.genderPresentation}
                                        onChange={(e) => updateCharacter(true, 0, 'genderPresentation', e.target.value)}
                                    >
                                        <option value="unspecified">Any</option>
                                        <option value="male">Male</option>
                                        <option value="female">Female</option>
                                        <option value="androgynous">Non-Binary</option>
                                    </select>
                                    <select
                                        className="bg-black/50 border border-white/10 rounded-lg p-3 text-white w-24"
                                        value={project.cast.lead.ageRange}
                                        onChange={(e) => updateCharacter(true, 0, 'ageRange', e.target.value)}
                                    >
                                        <option value="20s">20s</option>
                                        <option value="teen">Teen</option>
                                        <option value="30s">30s</option>
                                        <option value="40s">40s</option>
                                        <option value="50s+">50+</option>
                                    </select>
                                </div>
                            </div>
                            <div className="col-span-1 md:col-span-3">
                                <label className="text-xs uppercase font-bold text-white/40 mb-2 flex items-center gap-2">
                                    <User size={14} /> Visual Description (Face/Hair)
                                </label>
                                <textarea
                                    value={project.cast.lead.lookSpec?.face || ""}
                                    onChange={(e) => updateCharacter(true, 0, 'lookSpec.face', e.target.value)}
                                    className="w-full bg-black/50 border border-white/10 rounded-lg p-3 text-white focus:outline-none focus:border-violet-500 h-24 resize-none"
                                    placeholder="e.g. Platinum blonde bob cut, sharp jawline, blue eyes, futuristic makeup..."
                                />
                            </div>
                            <div className="col-span-1 md:col-span-3">
                                <label className="text-xs uppercase font-bold text-white/40 mb-2 flex items-center gap-2">
                                    <Shirt size={14} /> Wardrobe Signature
                                </label>
                                <input
                                    type="text"
                                    value={project.cast.lead.wardrobeSignature?.join(", ") || ""}
                                    onChange={(e) => updateCharacter(true, 0, 'wardrobeSignature', e.target.value.split(','))}
                                    className="w-full bg-black/50 border border-white/10 rounded-lg p-3 text-white focus:outline-none focus:border-violet-500"
                                    placeholder="e.g. Black leather jacket, silver chain, torn jeans"
                                />
                            </div>
                        </div>
                    </div>
                </div>

                {/* BAND MEMBERS */}
                <div className="lg:col-span-12 space-y-4">
                    <div className="flex items-center justify-between">
                        <h3 className="text-xl font-bold text-white flex items-center gap-2">
                            <Users size={20} className="text-gray-400" /> Band Members
                        </h3>
                        <button
                            onClick={addBandMember}
                            disabled={project.cast.band.length >= 5}
                            className="text-xs bg-white/10 hover:bg-white/20 text-white px-3 py-1.5 rounded-full transition-colors flex items-center gap-1 disabled:opacity-30"
                        >
                            <Plus size={14} /> Add Member
                        </button>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
                        {project.cast.band.map((member, idx) => (
                            <div key={member.characterId} className="bg-white/5 border border-white/10 rounded-xl p-4 relative group hover:border-white/20 transition-colors">
                                <button
                                    onClick={() => removeBandMember(idx)}
                                    className="absolute top-2 right-2 text-white/20 hover:text-red-400 opacity-0 group-hover:opacity-100 transition-all"
                                >
                                    <Trash2 size={16} />
                                </button>

                                <div className="space-y-3">
                                    <input
                                        value={member.name}
                                        onChange={(e) => updateCharacter(false, idx, 'name', e.target.value)}
                                        className="bg-transparent text-white font-bold border-b border-transparent hover:border-white/20 focus:border-white w-full outline-none"
                                    />

                                    <div className="flex gap-2">
                                        <select
                                            value={member.role}
                                            onChange={(e) => updateCharacter(false, idx, 'role', e.target.value)}
                                            className="bg-black/30 text-xs text-gray-300 rounded px-2 py-1 border border-white/5"
                                        >
                                            <option value="guitarist">Guitarist</option>
                                            <option value="bassist">Bassist</option>
                                            <option value="drummer">Drummer</option>
                                            <option value="keys">Keys</option>
                                            <option value="dj">DJ</option>
                                            <option value="dancer">Dancer</option>
                                        </select>
                                    </div>
                                    <textarea
                                        value={member.lookSpec?.face || ""}
                                        onChange={(e) => updateCharacter(false, idx, 'lookSpec.face', e.target.value)}
                                        className="w-full bg-black/30 border border-white/5 rounded-lg p-2 text-xs text-gray-400 h-16 resize-none"
                                        placeholder="Brief visual description..."
                                    />
                                </div>
                            </div>
                        ))}

                        {project.cast.band.length === 0 && (
                            <div className="col-span-full py-8 text-center text-white/20 text-sm border border-dashed border-white/10 rounded-xl">
                                No band members added. Solo performance?
                            </div>
                        )}
                    </div>
                </div>

            </div>

            <div className="flex justify-between pt-8 border-t border-white/10">
                <button onClick={onBack} className="text-white/50 hover:text-white flex items-center gap-2 px-4 py-2">
                    <ArrowLeft size={16} /> Back
                </button>
                <button
                    onClick={onNext}
                    className="group flex items-center gap-2 bg-white text-black px-8 py-3 rounded-full font-bold hover:bg-gray-200 transition-colors"
                >
                    Confirm Casting
                    <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
                </button>
            </div>
        </div>
    );
}
