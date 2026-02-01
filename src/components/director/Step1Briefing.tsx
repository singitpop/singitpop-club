"use client";

import { useState } from "react";
import { Mic2, Sparkles, MapPin, Camera, Car, Shirt, CloudRain, Sun, Palette, Globe, Aperture, Dog, ChevronRight, Clapperboard } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

interface Track {
    id: number | string;
    title: string;
    albumTitle?: string;
    albumId?: string;
}

interface Step1Props {
    tracks: Track[];
    onNext: (data: any) => void;
}

// ULTRA PRESETS
const OPTIONS = {
    atmosphere: {
        mood: ["Cinematic", "Dark Neon", "Euphoric", "Melancholic", "Retro VHS", "Cyberpunk", "Ethereal", "Gritty"],
        weather: ["Clear", "Heavy Rain", "Foggy", "Snow", "Electric Storm", "Sandstorm", "Overcast"],
        lighting: ["Golden Hour", "Neon Lights", "Moonlight", "Studio", "Natural Soft", "Volumetric Fog", "Strobe"],
        timeOfDay: ["Dawn", "Noon", "Sunset", "Midnight", "Blue Hour"]
    },
    world: {
        location: ["Cyberpunk City", "Desert Highway", "Abandoned Warehouse", "Luxury Penthouse", "Forest", "Space Station", "Beach at Night", "Tokyo Streets"],
        era: ["Modern 2026", "1980s Retro", "1950s Noir", "Futuristic 2077", "Victorian", "Ancient Fantasy"],
        details: ["Wet Streets", "Crowded", "Empty/Desolate", "Flying Cars", "Holograms", "Ruins", "Lush Vegetation"]
    },
    camera: {
        angle: ["Wide Shot", "Close Up", "Drone Shot", "Low Angle", "POV", "Over the Shoulder", "Tracking Shot"],
        lens: ["35mm Classic", "50mm Portrait", "85mm Anamorphic", "Fisheye", "Vintage Film Grain"],
        movement: ["Static", "Slow Pan", "Fast Zoom", "Handheld Shaky", "Smooth Gimbal"]
    },
    elements: {
        vehicles: ["None", "Vintage Muscle Car", "Cyberpunk Bike", "Luxury Sports Car", "Spaceship", "Subway Train"],
        props: ["Microphone", "Guitar", "Neon Sign", "Smoke Grenade", "Confetti", "Rain Umbrella"],
        animals: ["None", "Wolf", "Doves", "Black Cat", "Horse", "Robot Dog"],
        clothing: ["Streetwear", "Cyber Armor", "Elegant Gown", "Suit & Tie", "Vintage Leather", "Techwear"]
    },
    style: {
        filmStock: ["Kodak Portra 400", "Fujifilm Velvia", "Black & White Noir", "IMAX 70mm", "VHS Tape", "16mm Grain"],
        colorGrade: ["Teal & Orange", "Bleach Bypass", "Neon Noir", "Pastel Dream", "Sepia Vintage", "High Contrast"],
        artDirection: ["Minimalist", "Baroque", "Surrealist", "Hyper-Realistic", "Anime Style", "Oil Painting"]
    }
};

type OptionCategory = 'atmosphere' | 'world' | 'camera' | 'elements' | 'style';

export default function Step1Briefing({ tracks, onNext }: Step1Props) {
    const [selectedTrackId, setSelectedTrackId] = useState<string | number>("");
    const [activeCategory, setActiveCategory] = useState<OptionCategory>('atmosphere');
    const [prompt, setPrompt] = useState("");

    // Selection State
    const [selections, setSelections] = useState({
        mood: "Cinematic",
        weather: "Clear",
        lighting: "Golden Hour",
        timeOfDay: "",
        location: "",
        era: "",
        details: [] as string[],
        angle: "",
        lens: "",
        movement: "",
        vehicles: "",
        props: [] as string[],
        animals: "",
        clothing: "",
        filmStock: "",
        colorGrade: "",
        artDirection: ""
    });

    // Helper to toggle array items
    const toggleSelection = (key: keyof typeof selections, value: string) => {
        setSelections(prev => {
            const current = prev[key];
            if (Array.isArray(current)) {
                return {
                    ...prev,
                    [key]: current.includes(value) ? current.filter(i => i !== value) : [...current, value]
                };
            } else {
                return { ...prev, [key]: current === value ? "" : value };
            }
        });
    };

    // Construct the "Mega Prompt" string for preview
    const constructedPrompt = [
        selections.mood, selections.era, selections.location,
        selections.weather, selections.timeOfDay, selections.lighting,
        selections.angle, selections.lens, selections.movement,
        selections.filmStock, selections.colorGrade, selections.artDirection,
        selections.vehicles !== "None" ? selections.vehicles : "",
        selections.animals !== "None" ? selections.animals : "",
        selections.clothing,
        selections.details.join(", "),
        selections.props.join(", "),
        prompt // User's manual additions
    ].filter(Boolean).join(", ");

    const handleGenerate = () => {
        if (!selectedTrackId) return;
        const selectedTrack = tracks.find(t => t.id === selectedTrackId);
        onNext({
            track: selectedTrack,
            userPrompt: constructedPrompt,
            rawSelections: selections
        });
    };

    const categories = [
        { id: 'atmosphere', label: 'Atmosphere', icon: CloudRain },
        { id: 'world', label: 'World Building', icon: Globe },
        { id: 'camera', label: 'Camera & Lens', icon: Aperture },
        { id: 'style', label: 'Film & Style', icon: Clapperboard },
        { id: 'elements', label: 'Props & Details', icon: Car },
    ];

    return (
        <div className="grid grid-cols-1 xl:grid-cols-12 gap-6 h-full font-sans">

            {/* LEFT: Track & Prompt Preview (4 cols) */}
            <div className="xl:col-span-4 space-y-6 flex flex-col h-full">
                {/* Track Selector */}
                <div className="bg-white/5 border border-white/10 rounded-2xl p-6">
                    <div className="flex items-center gap-3 mb-4">
                        <div className="p-2 bg-indigo-500/20 rounded-lg text-indigo-400">
                            <Mic2 size={20} />
                        </div>
                        <h3 className="text-lg font-semibold">Select Track</h3>
                    </div>
                    <div className="relative">
                        <select
                            value={selectedTrackId}
                            onChange={(e) => setSelectedTrackId(e.target.value)}
                            className="w-full bg-black/40 border border-white/10 rounded-xl p-4 text-white appearance-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 transition-all cursor-pointer"
                        >
                            <option value="">-- Choose Song --</option>
                            {tracks.map((t) => (
                                <option key={t.id} value={t.id}>
                                    {t.title}
                                </option>
                            ))}
                        </select>
                        <div className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none text-white/30">▼</div>
                    </div>
                </div>

                {/* Live Prompt Preview */}
                <div className="bg-gradient-to-br from-indigo-900/20 to-purple-900/20 border border-white/10 rounded-2xl p-6 flex-1 flex flex-col">
                    <div className="flex items-center gap-2 mb-4">
                        <Sparkles size={16} className="text-yellow-400" />
                        <h3 className="text-sm font-bold uppercase tracking-wider text-white/60">Mega Prompt Preview</h3>
                    </div>
                    <div className="bg-black/40 rounded-xl p-4 flex-1 font-mono text-sm text-indigo-200 overflow-y-auto mb-4 border border-white/5">
                        {constructedPrompt || <span className="text-white/20">Select options to build your prompt...</span>}
                    </div>

                    <textarea
                        value={prompt}
                        onChange={(e) => setPrompt(e.target.value)}
                        placeholder="Add specific custom details..."
                        className="w-full bg-black/20 border border-white/10 rounded-xl p-3 text-sm text-white h-24 focus:border-indigo-500 transition-all resize-none"
                    />

                    <button
                        onClick={handleGenerate}
                        disabled={!selectedTrackId}
                        className={`mt-6 w-full py-4 rounded-xl font-bold text-lg flex items-center justify-center gap-2 transition-all
                            ${selectedTrackId
                                ? 'bg-gradient-to-r from-indigo-600 to-purple-600 hover:scale-[1.02] shadow-xl shadow-indigo-900/50'
                                : 'bg-white/5 text-white/20 cursor-not-allowed'}
                        `}
                    >
                        Initialize Director Engine <ChevronRight size={20} />
                    </button>
                </div>
            </div>

            {/* RIGHT: The Mega Control Panel (8 cols) */}
            <div className="xl:col-span-8 bg-white/5 border border-white/10 rounded-2xl overflow-hidden flex flex-col">

                {/* Category Tabs */}
                <div className="flex border-b border-white/10 overflow-x-auto scrollbar-hide">
                    {categories.map(c => (
                        <button
                            key={c.id}
                            onClick={() => setActiveCategory(c.id as OptionCategory)}
                            className={`flex items-center gap-2 px-6 py-4 text-sm font-medium transition-colors whitespace-nowrap
                                ${activeCategory === c.id ? 'bg-white/10 text-white border-b-2 border-indigo-500' : 'text-white/40 hover:text-white hover:bg-white/5'}
                            `}
                        >
                            <c.icon size={16} />
                            {c.label}
                        </button>
                    ))}
                </div>

                {/* Scrollable Options Area */}
                <div className="flex-1 overflow-y-auto p-8 space-y-8 bg-black/20">

                    {activeCategory === 'atmosphere' && (
                        <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
                            <ControlGroup title="Mood" options={OPTIONS.atmosphere.mood} current={selections.mood} onSelect={(v) => toggleSelection('mood', v)} />
                            <ControlGroup title="Weather" options={OPTIONS.atmosphere.weather} current={selections.weather} onSelect={(v) => toggleSelection('weather', v)} />
                            <ControlGroup title="Lighting" options={OPTIONS.atmosphere.lighting} current={selections.lighting} onSelect={(v) => toggleSelection('lighting', v)} />
                            <ControlGroup title="Time of Day" options={OPTIONS.atmosphere.timeOfDay} current={selections.timeOfDay} onSelect={(v) => toggleSelection('timeOfDay', v)} />
                        </div>
                    )}

                    {activeCategory === 'world' && (
                        <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
                            <ControlGroup title="Location" options={OPTIONS.world.location} current={selections.location} onSelect={(v) => toggleSelection('location', v)} />
                            <ControlGroup title="Era / Period" options={OPTIONS.world.era} current={selections.era} onSelect={(v) => toggleSelection('era', v)} />
                            <ControlGroup title="Details" options={OPTIONS.world.details} current={selections.details} onSelect={(v) => toggleSelection('details', v)} isMulti />
                        </div>
                    )}

                    {activeCategory === 'camera' && (
                        <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
                            <ControlGroup title="Camera Angle" options={OPTIONS.camera.angle} current={selections.angle} onSelect={(v) => toggleSelection('angle', v)} />
                            <ControlGroup title="Lens Type" options={OPTIONS.camera.lens} current={selections.lens} onSelect={(v) => toggleSelection('lens', v)} />
                            <ControlGroup title="Movement" options={OPTIONS.camera.movement} current={selections.movement} onSelect={(v) => toggleSelection('movement', v)} />
                        </div>
                    )}

                    {activeCategory === 'elements' && (
                        <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
                            <ControlGroup title="Vehicles" options={OPTIONS.elements.vehicles} current={selections.vehicles} onSelect={(v) => toggleSelection('vehicles', v)} />
                            <ControlGroup title="Animals" options={OPTIONS.elements.animals} current={selections.animals} onSelect={(v) => toggleSelection('animals', v)} />
                            <ControlGroup title="Clothing Style" options={OPTIONS.elements.clothing} current={selections.clothing} onSelect={(v) => toggleSelection('clothing', v)} />
                            <ControlGroup title="Props" options={OPTIONS.elements.props} current={selections.props} onSelect={(v) => toggleSelection('props', v)} isMulti />
                        </div>
                    )}

                    {activeCategory === 'style' && (
                        <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
                            <ControlGroup title="Film Stock" options={OPTIONS.style.filmStock} current={selections.filmStock} onSelect={(v) => toggleSelection('filmStock', v)} />
                            <ControlGroup title="Color Grading" options={OPTIONS.style.colorGrade} current={selections.colorGrade} onSelect={(v) => toggleSelection('colorGrade', v)} />
                            <ControlGroup title="Art Direction" options={OPTIONS.style.artDirection} current={selections.artDirection} onSelect={(v) => toggleSelection('artDirection', v)} />
                        </div>
                    )}

                </div>
            </div>
        </div>
    );
}

// Sub-component for options grid
function ControlGroup({ title, options, current, onSelect, isMulti = false }: { title: string, options: string[], current: string | string[], onSelect: (v: string) => void, isMulti?: boolean }) {
    return (
        <div>
            <h4 className="text-xs font-bold text-white/40 uppercase tracking-widest mb-3">{title}</h4>
            <div className="flex flex-wrap gap-2">
                {options.map(opt => {
                    const isSelected = isMulti ? (current as string[]).includes(opt) : current === opt;
                    return (
                        <button
                            key={opt}
                            onClick={() => onSelect(opt)}
                            className={`px-4 py-2 rounded-lg text-sm font-medium border transition-all duration-200 hover:scale-105
                                ${isSelected
                                    ? 'bg-indigo-600 border-indigo-500 text-white shadow-lg shadow-indigo-900/50'
                                    : 'bg-white/5 border-white/10 text-white/60 hover:bg-white/10 hover:text-white'}
                            `}
                        >
                            {opt}
                        </button>
                    );
                })}
            </div>
        </div>
    );
}
