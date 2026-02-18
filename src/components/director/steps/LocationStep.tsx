import React, { useState } from 'react';
import { StratifyProject, Location } from '@/types/stratify';
import { motion, AnimatePresence } from 'framer-motion';

interface StepProps {
    project: StratifyProject;
    updateProject: (p: any) => void;
    onNext: () => void;
    onBack: () => void;
}

const DEFAULT_LOCATIONS: Location[] = [
    { locationId: 'loc-1', name: 'Main Set', description: 'Primary performance area', timeOfDay: 'night', weather: 'clear', lighting: 'Studio High Key', cameraVibe: 'Smooth Steadicam', artDirection: 'Minimalist' },
    { locationId: 'loc-2', name: 'Alleyway', description: 'Gritty urban exterior', timeOfDay: 'night', weather: 'rain', lighting: 'Neon Noir', cameraVibe: 'Handheld Chaos', artDirection: 'Cyberpunk' },
    { locationId: 'loc-3', name: 'Void', description: 'Abstract black or white space', timeOfDay: 'day', weather: 'clear', lighting: 'Soft Natural', cameraVibe: 'Static Tripod', artDirection: 'Surreal' }
];

export const LocationStep: React.FC<StepProps> = ({ project, updateProject, onNext, onBack }) => {
    const [locations, setLocations] = useState<Location[]>(project.locations || DEFAULT_LOCATIONS.slice(0, 1));
    const [editingId, setEditingId] = useState<string | null>(null);

    // Sync local state to project
    const updateLocations = (newLocs: Location[]) => {
        setLocations(newLocs);
        updateProject({
            ...project,
            locations: newLocs
        });
    };

    const handleAddLocation = () => {
        const newLoc: Location = {
            locationId: `loc-${Date.now()}`,
            name: 'New Location',
            description: '',
            timeOfDay: 'night',
            weather: 'clear',
            lighting: 'Cinematic',
            cameraVibe: 'Dynamic',
            artDirection: 'Stylized'
        };
        updateLocations([...locations, newLoc]);
        setEditingId(newLoc.locationId);
    };

    const handleRemoveLocation = (id: string, e: React.MouseEvent) => {
        e.stopPropagation();
        if (locations.length <= 1) return; // Prevent deleting last location
        const newLocs = locations.filter(l => l.locationId !== id);
        updateLocations(newLocs);
        if (editingId === id) setEditingId(null);
    };

    const handleUpdateLocation = (id: string, field: keyof Location, value: any) => {
        const newLocs = locations.map(l =>
            l.locationId === id ? { ...l, [field]: value } : l
        );
        updateLocations(newLocs);
    };

    return (
        <div className="space-y-8 max-w-6xl mx-auto h-[600px] flex flex-col">
            <div className="text-center space-y-2 flex-shrink-0">
                <h2 className="text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-emerald-400 to-cyan-500">
                    Scene Setup
                </h2>
                <p className="text-gray-400">Define the physical spaces where your video takes place.</p>
            </div>

            <div className="flex-grow flex gap-6 overflow-hidden">
                {/* LIST / SIDEBAR */}
                <div className="w-1/3 bg-black/20 border border-gray-800 rounded-xl p-4 overflow-y-auto">
                    <div className="flex justify-between items-center mb-4">
                        <h3 className="text-sm font-bold text-gray-400 uppercase tracking-wider">Locations</h3>
                        <button onClick={handleAddLocation} className="text-emerald-400 hover:text-emerald-300 text-xs font-bold border border-emerald-900 bg-emerald-900/20 px-2 py-1 rounded">
                            + ADD
                        </button>
                    </div>

                    <div className="space-y-2">
                        {locations.map(loc => (
                            <motion.div
                                key={loc.locationId}
                                onClick={() => setEditingId(loc.locationId)}
                                className={`p-3 rounded-lg border cursor-pointer hover:bg-gray-800/50 relative group ${editingId === loc.locationId ? 'bg-emerald-900/20 border-emerald-500/50' : 'bg-gray-900/50 border-gray-800'
                                    }`}
                            >
                                <div className="font-bold text-sm text-gray-200">{loc.name}</div>
                                <div className="text-[10px] text-gray-500 truncate">{loc.timeOfDay} • {loc.lighting}</div>
                                {locations.length > 1 && (
                                    <button
                                        onClick={(e) => handleRemoveLocation(loc.locationId, e)}
                                        className="absolute top-2 right-2 text-gray-600 hover:text-red-400 opacity-0 group-hover:opacity-100 transition-opacity"
                                    >
                                        ✕
                                    </button>
                                )}
                            </motion.div>
                        ))}
                    </div>
                </div>

                {/* EDIT PANEL */}
                <div className="w-2/3 bg-black/40 border border-gray-800 rounded-xl p-6 overflow-y-auto">
                    {editingId ? (
                        (() => {
                            const loc = locations.find(l => l.locationId === editingId);
                            if (!loc) return null;
                            return (
                                <div className="space-y-6">
                                    <div className="flex justify-between items-center border-b border-gray-800 pb-4">
                                        <input
                                            type="text"
                                            value={loc.name}
                                            onChange={(e) => handleUpdateLocation(loc.locationId, 'name', e.target.value)}
                                            className="bg-transparent text-2xl font-bold text-white outline-none w-full placeholder-gray-600"
                                            placeholder="Location Name"
                                        />
                                    </div>

                                    <div className="grid grid-cols-2 gap-6">
                                        {/* Time of Day */}
                                        <div className="space-y-2">
                                            <label className="text-xs text-gray-500 uppercase">Time of Day</label>
                                            <div className="flex gap-2">
                                                {['dawn', 'day', 'dusk', 'night'].map(t => (
                                                    <button
                                                        key={t}
                                                        onClick={() => handleUpdateLocation(loc.locationId, 'timeOfDay', t)}
                                                        className={`flex-1 py-2 text-xs font-bold rounded border ${loc.timeOfDay === t
                                                            ? 'bg-emerald-500 text-black border-emerald-500'
                                                            : 'bg-gray-900 text-gray-500 border-gray-700 hover:border-gray-500'
                                                            }`}
                                                    >
                                                        {t.toUpperCase()}
                                                    </button>
                                                ))}
                                            </div>
                                        </div>

                                        {/* Weather */}
                                        <div className="space-y-2">
                                            <label className="text-xs text-gray-500 uppercase">Weather</label>
                                            <select
                                                value={loc.weather}
                                                onChange={(e) => handleUpdateLocation(loc.locationId, 'weather', e.target.value)}
                                                className="w-full bg-gray-900 border border-gray-700 rounded p-2 text-white text-sm"
                                            >
                                                <option value="clear">☀️ Clear</option>
                                                <option value="cloudy">☁️ Cloudy</option>
                                                <option value="rain">🌧️ Rain</option>
                                                <option value="storm">⚡ Storm</option>
                                                <option value="fog">🌫️ Fog</option>
                                            </select>
                                        </div>
                                    </div>

                                    {/* VISUAL STYLE */}
                                    <div className="space-y-4 pt-4 border-t border-gray-800">
                                        <h4 className="text-emerald-400 font-bold text-sm">Visual Style</h4>

                                        <div className="grid grid-cols-2 gap-4">
                                            <div>
                                                <label className="block text-xs text-gray-500 mb-1">Lighting</label>
                                                <input
                                                    type="text"
                                                    value={loc.lighting || ''}
                                                    onChange={(e) => handleUpdateLocation(loc.locationId, 'lighting', e.target.value)}
                                                    className="w-full bg-gray-900 border border-gray-700 rounded p-2 text-white text-sm focus:border-emerald-500 outline-none"
                                                    placeholder="e.g. Neon Noir, Soft Natural"
                                                />
                                            </div>
                                            <div>
                                                <label className="block text-xs text-gray-500 mb-1">Camera Vibe</label>
                                                <input
                                                    type="text"
                                                    value={loc.cameraVibe || ''}
                                                    onChange={(e) => handleUpdateLocation(loc.locationId, 'cameraVibe', e.target.value)}
                                                    className="w-full bg-gray-900 border border-gray-700 rounded p-2 text-white text-sm focus:border-emerald-500 outline-none"
                                                    placeholder="e.g. Handheld, Steady"
                                                />
                                            </div>
                                            <div className="col-span-2">
                                                <label className="block text-xs text-gray-500 mb-1">Art Direction / Props</label>
                                                <textarea
                                                    value={loc.artDirection || ''}
                                                    onChange={(e) => handleUpdateLocation(loc.locationId, 'artDirection', e.target.value)}
                                                    className="w-full bg-gray-900 border border-gray-700 rounded p-2 text-white text-sm focus:border-emerald-500 outline-none h-20"
                                                    placeholder="e.g. Minimalist concrete room with a single red chair."
                                                />
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            );
                        })()
                    ) : (
                        <div className="h-full flex flex-col items-center justify-center text-gray-600">
                            <span className="text-4xl mb-4">📍</span>
                            <p>Select a location to edit details.</p>
                        </div>
                    )}
                </div>
            </div>

            <div className="flex justify-between pt-4 flex-shrink-0">
                <button
                    onClick={onBack}
                    className="px-6 py-3 text-gray-400 hover:text-white font-bold"
                >
                    ← Back to Treatments
                </button>
                <button
                    onClick={onNext}
                    className="px-8 py-3 bg-white text-black rounded-full font-bold text-lg hover:scale-105 transition-transform"
                >
                    Ready for Action →
                </button>
            </div>
        </div>
    );
};
