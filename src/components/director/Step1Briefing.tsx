"use client";

import { useState } from "react";
import { Mic2, Sparkles, MapPin, Camera, Car, Shirt, CloudRain, Sun, Palette, Globe, Aperture, Dog, ChevronRight, Clapperboard, Wand2 } from "lucide-react";
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
    world: {
        location: ["Cyberpunk City", "Desert Highway", "Abandoned Warehouse", "Luxury Penthouse", "Forest", "Space Station", "Beach at Night", "Tokyo Streets", "Restaurant", "Jazz Club", "Dive Bar", "Ballroom"],
        timeOfDay: ["Dawn", "Noon", "Golden Hour", "Sunset", "Blue Hour", "Twilight", "Midnight", "Pitch Black"],
        weather: ["Clear", "Heavy Rain", "Foggy", "Snow", "Electric Storm", "Sandstorm", "Overcast", "Heatwave"]
    },
    lighting: {
        lighting: ["Cinematic Soft", "Neon Signs", "Moonlight", "Candlelight", "Studio High-Key", "Low-Key Noir", "Volumetric Beams", "Strobe", "Natural Window Light"],
        mood: ["Cinematic", "Dark Neon", "Romantic", "Melancholic", "Retro VHS", "Cyberpunk", "Ethereal", "Gritty", "Tense", "Dreamy"],
        colorGrade: ["Teal & Orange", "Bleach Bypass", "Neon Noir", "Pastel Dream", "Sepia Vintage", "High Contrast", "Black & White"]
    },
    camera: {
        angle: ["Wide Shot", "Close Up", "Drone Shot", "Low Angle", "POV", "Over the Shoulder", "Tracking Shot", "Dutch Angle"],
        lens: ["35mm Classic", "50mm Portrait", "85mm Anamorphic", "Fisheye", "Vintage Film Grain", "Macro"],
        movement: ["Static", "Slow Pan", "Fast Zoom", "Handheld Shaky", "Smooth Gimbal", "Dolly Zoom"]
    },
    style: {
        filmStock: ["Kodak Portra 400", "Fujifilm Velvia", "Kodak Tri-X 400 (B&W)", "IMAX 70mm", "VHS Tape", "16mm Grain", "Digital Crisp"],
        artDirection: ["Minimalist", "Baroque", "Surrealist", "Hyper-Realistic", "Anime Style", "Oil Painting", "Gothic"]
    },
    elements: {
        vehicles: ["None", "Vintage Muscle Car", "Cyberpunk Bike", "Luxury Sports Car", "Spaceship", "Subway Train", "Private Jet"],
        props: ["Microphone", "Guitar", "Neon Sign", "Smoke Grenade", "Confetti", "Rain Umbrella", "Champagne Glass", "Old Photo"],
        animals: ["None", "Wolf", "Doves", "Black Cat", "Horse", "Robot Dog", "Owl"],
        clothing: ["Streetwear", "Cyber Armor", "Elegant Gown", "Suit & Tie", "Vintage Leather", "Techwear", "Casual Chic"]
    }
};

// THE DIRECTOR INTELLIGENCE ENGINE 🧠
// Maps keywords to likely cinematic choices.
type DeepPartialOptions = {
    [K in keyof typeof OPTIONS]?: Partial<typeof OPTIONS[K]>
};

const DIRECTOR_BRAIN: Record<string, DeepPartialOptions> = {
    // Vibe / Mood
    "love": { lighting: { mood: ["Romantic", "Dreamy"], lighting: ["Cinematic Soft", "Candlelight", "Golden Hour"] } },
    "heart": { lighting: { mood: ["Romantic", "Melancholic"], colorGrade: ["Pastel Dream", "Teal & Orange"] }, camera: { angle: ["Close Up"] } },
    "kiss": { lighting: { mood: ["Romantic"], lighting: ["Candlelight"] }, camera: { angle: ["Close Up", "POV"] } },
    "smile": { lighting: { mood: ["Romantic", "Dreamy"], lighting: ["Cinematic Soft", "Natural Window Light"] }, camera: { angle: ["Close Up", "Portrait"] } },
    "eyes": { camera: { lens: ["50mm Portrait", "85mm Anamorphic"], angle: ["Close Up"] } },
    "chest": { camera: { angle: ["Close Up", "Low Angle"] } },

    // Action / Energy
    "dance": { lighting: { mood: ["Cinematic", "Neon Noir"], lighting: ["Strobe", "Neon Signs"] }, camera: { movement: ["Fast Zoom", "Handheld Shaky"] } },
    "party": { lighting: { mood: ["Cinematic"], lighting: ["Strobe", "Neon Signs"] }, world: { location: ["Jazz Club", "Ballroom", "Dive Bar"] } },
    "run": { camera: { movement: ["Tracking Shot", "Handheld Shaky"] }, lighting: { mood: ["Tense", "Gritty"] } },
    "walk": { camera: { movement: ["Tracking Shot", "Slow Pan"] } }, // Removed "Tokyo Streets" to avoid forcing a location
    "slow": { camera: { movement: ["Slow Pan", "Smooth Gimbal"] }, lighting: { mood: ["Dreamy", "Melancholic"] } },
    "wave": { camera: { movement: ["Slow Pan"] } },
    "breath": { lighting: { mood: ["Tense", "Romantic"] }, camera: { angle: ["Close Up"] } },

    // Emotion
    "sad": { lighting: { mood: ["Melancholic", "Gritty"], colorGrade: ["Bleach Bypass", "Black & White"] }, world: { weather: ["Heavy Rain", "Foggy"] } },
    "cry": { lighting: { mood: ["Melancholic"], lighting: ["Low-Key Noir"] }, world: { weather: ["Heavy Rain"] } },
    "lonely": { lighting: { mood: ["Melancholic"], lighting: ["Low-Key Noir"] }, camera: { angle: ["Wide Shot"] } },
    "dark": { lighting: { mood: ["Gritty", "Tense"], lighting: ["Low-Key Noir", "Moonlight"] }, world: { timeOfDay: ["Pitch Black", "Midnight"] } },
    "quiet": { lighting: { mood: ["Tense", "Melancholic"], lighting: ["Low-Key Noir", "Natural Window Light"] } },

    // Setting / Objects
    "room": { world: { location: ["Luxury Penthouse", "Restaurant", "Ballroom", "Abandoned Warehouse"] }, lighting: { lighting: ["Natural Window Light", "Candlelight"] } },
    "floor": { world: { location: ["Luxury Penthouse", "Ballroom"] }, camera: { angle: ["Low Angle"] } },
    "future": { lighting: { mood: ["Cyberpunk"], lighting: ["Neon Signs"] }, world: { location: ["Cyberpunk City", "Space Station", "Tokyo Streets"] }, elements: { vehicles: ["Cyberpunk Bike", "Spaceship"], clothing: ["Cyber Armor", "Techwear"] } },
    "neon": { lighting: { mood: ["Dark Neon", "Cyberpunk"], lighting: ["Neon Signs"] }, style: { artDirection: ["Hyper-Realistic"] } },
    "retro": { lighting: { mood: ["Retro VHS"], colorGrade: ["Sepia Vintage"] }, style: { filmStock: ["VHS Tape", "16mm Grain"] }, elements: { clothing: ["Vintage Leather"] } },
    "dream": { lighting: { mood: ["Ethereal", "Dreamy"], lighting: ["Volumetric Beams"] }, style: { filmStock: ["Fujifilm Velvia"] } },

    // Nature / Elements
    "rain": { world: { weather: ["Heavy Rain", "Electric Storm"] }, lighting: { mood: ["Melancholic", "Cinematic"] } },
    "sun": { world: { timeOfDay: ["Noon", "Golden Hour"], weather: ["Clear", "Heatwave"] }, lighting: { lighting: ["Natural Window Light"] } },
    "spring": { world: { location: ["Forest"], timeOfDay: ["Dawn", "Golden Hour"] }, lighting: { mood: ["Ethereal", "Dreamy"] } },
    "sky": { world: { location: ["Forest", "Beach at Night"] }, camera: { angle: ["Low Angle", "POV"] } },
    "ground": { world: { location: ["Forest", "Desert Highway"] }, camera: { angle: ["High Angle", "Tracking Shot"] } },
    "night": { world: { timeOfDay: ["Midnight", "Blue Hour"], location: ["Beach at Night"] }, lighting: { lighting: ["Moonlight", "Neon Signs"] } },
    "car": { elements: { vehicles: ["Vintage Muscle Car", "Luxury Sports Car"] }, world: { location: ["Desert Highway", "Tokyo Streets"] } },
    "drive": { elements: { vehicles: ["Vintage Muscle Car"] }, camera: { movement: ["Tracking Shot"] } },
    "space": { world: { location: ["Space Station"] }, elements: { vehicles: ["Spaceship"], clothing: ["Cyber Armor"] } },
    "city": { world: { location: ["Cyberpunk City", "Tokyo Streets"] } },
    "forest": { world: { location: ["Forest"] }, lighting: { lighting: ["Volumetric Beams"] } },
};

type OptionCategory = 'world' | 'lighting' | 'camera' | 'style' | 'elements';

const INITIAL_SELECTIONS = {
    location: "",
    timeOfDay: "",
    weather: "Clear",
    lighting: "Cinematic Soft",
    mood: "Cinematic",
    colorGrade: "",
    angle: "",
    lens: "",
    movement: "",
    filmStock: "",
    artDirection: "",
    vehicles: "",
    props: [] as string[],
    animals: "",
    clothing: "",
    details: [] as string[]
};

export default function Step1Briefing({ tracks, onNext }: Step1Props) {
    const [selectedTrackId, setSelectedTrackId] = useState<string | number>("");
    const [activeCategory, setActiveCategory] = useState<OptionCategory>('world');
    const [prompt, setPrompt] = useState("");

    // Selection State
    const [selections, setSelections] = useState({ ...INITIAL_SELECTIONS });

    const toggleSelection = (field: keyof typeof selections, value: string) => {
        setSelections(prev => {
            const current = prev[field];
            if (Array.isArray(current)) {
                // Toggle for arrays
                if (current.includes(value)) {
                    return { ...prev, [field]: current.filter(i => i !== value) };
                } else {
                    return { ...prev, [field]: [...current, value] };
                }
            } else {
                // Radio behavior for strings
                return { ...prev, [field]: value === current ? "" : value };
            }
        });
    };

    // Auto-generate context string
    const constructedPrompt = [
        selections.location, selections.timeOfDay, selections.weather,
        selections.lighting, selections.mood, selections.filmStock, selections.artDirection
    ].filter(Boolean).join(" • ");

    const handleGenerate = () => {
        onNext({
            trackId: selectedTrackId,
            prompt,
            selections
        });
    };

    const categories = [
        { id: 'world', label: '1. Scene (Where & When)', icon: MapPin },
        { id: 'lighting', label: '2. Light & Ambience', icon: Sun },
        { id: 'camera', label: '3. Camera & Lens', icon: Aperture },
        { id: 'style', label: '4. Film Stock', icon: Clapperboard },
        { id: 'elements', label: '5. Set Dressing', icon: Car },
    ];

    const [isAnalyzing, setIsAnalyzing] = useState(false);

    const analyzeLyrics = () => {
        if (!prompt || prompt.length < 5) return;
        setIsAnalyzing(true);

        // Simulate "Thinking" time for the AI Director
        setTimeout(() => {
            const lowerPrompt = prompt.toLowerCase();

            // 1. Reset categories to a "Neutral" state to avoid stale data.
            // MUST reset all fields so we don't keep "Heatwave" from a previous run!
            const newSelections = { ...INITIAL_SELECTIONS };

            // 🧠 PHASE 1: EMOTIONAL SCORING (The Vibe Check)
            // We count keywords to find the DOMINANT EMOTION.
            const scores = {
                romance: 0,
                energy: 0,
                melancholy: 0,
                dark: 0,
                dreamy: 0
            };

            const keywords = {
                romance: ["love", "heart", "kiss", "baby", "smile", "touch", "hold", "forever", "you", "beautiful", "sweet"],
                energy: ["dance", "party", "run", "fast", "jump", "beat", "rhythm", "go", "shake", "loud", "crazy", "wild", "move"],
                melancholy: ["sad", "cry", "lonely", "tears", "pain", "gone", "miss", "blue", "broken", "rain", "hurt", "quiet", "goodbye", "loss"],
                dark: ["dark", "night", "blood", "kill", "gun", "fear", "shadow", "black", "death", "fight", "war", "danger", "cold"],
                dreamy: ["dream", "sleep", "sky", "cloud", "fly", "float", "star", "moon", "magic", "wonder", "high", "light", "sun", "spring", "rise", "change", "new"]
            };

            // Count hits
            Object.entries(keywords).forEach(([theme, words]) => {
                words.forEach(w => {
                    const regex = new RegExp(`\\b${w}\\b`, 'i');
                    if (regex.test(lowerPrompt)) {
                        scores[theme as keyof typeof scores] += 1;
                    }
                });
            });

            // Find Winning Theme
            let winningTheme = "dreamy"; // Default
            let maxScore = -1;
            Object.entries(scores).forEach(([theme, score]) => {
                if (score > maxScore) {
                    maxScore = score;
                    winningTheme = theme;
                }
            });

            // Apply COHESIVE PRESETS based on Winning Theme
            switch (winningTheme) {
                case "romance":
                    newSelections.mood = "Romantic";
                    newSelections.lighting = "Cinematic Soft";
                    newSelections.colorGrade = "Pastel Dream";
                    newSelections.filmStock = "Kodak Portra 400";
                    newSelections.angle = "Close Up";
                    // Default location for romance if none found later
                    newSelections.location = "Luxury Penthouse";
                    break;
                case "energy":
                    newSelections.mood = "Cinematic";
                    newSelections.lighting = "Strobe";
                    newSelections.colorGrade = "High Contrast";
                    newSelections.filmStock = "Digital Crisp";
                    newSelections.movement = "Fast Zoom";
                    newSelections.location = "Jazz Club";
                    break;
                case "melancholy":
                    newSelections.mood = "Melancholic";
                    newSelections.lighting = "Natural Window Light";
                    newSelections.colorGrade = "Bleach Bypass";
                    newSelections.filmStock = "16mm Grain";
                    newSelections.weather = "Heavy Rain";
                    newSelections.angle = "Wide Shot"; // Isolation
                    break;
                case "dark":
                    newSelections.mood = "Gritty";
                    newSelections.lighting = "Low-Key Noir";
                    newSelections.colorGrade = "Black & White";
                    newSelections.timeOfDay = "Midnight";
                    newSelections.weather = "Foggy";
                    break;
                case "dreamy":
                default:
                    newSelections.mood = "Dreamy";
                    newSelections.lighting = "Volumetric Beams";
                    newSelections.colorGrade = "Teal & Orange";
                    newSelections.filmStock = "Fujifilm Velvia";
                    newSelections.timeOfDay = "Golden Hour";
                    break;
            }

            // 🧠 PHASE 2: CONTEXT EXTRACTION (The Details)
            // Now we look for specific NOUNS to override/fill details without breaking the vibe.

            // Location Overrides
            if (/\b(room|home|house|bed|sofa)\b/i.test(lowerPrompt)) {
                if (winningTheme === 'energy') newSelections.location = "Jazz Club";
                else if (winningTheme === 'dark') newSelections.location = "Abandoned Warehouse";
                else newSelections.location = "Luxury Penthouse";
            }
            if (/\b(bar|club|pub|drink)\b/i.test(lowerPrompt)) newSelections.location = winningTheme === 'energy' ? "Jazz Club" : "Dive Bar";
            if (/\b(street|road|city|town)\b/i.test(lowerPrompt)) newSelections.location = "Tokyo Streets";
            if (/\b(car|drive|ride)\b/i.test(lowerPrompt)) {
                newSelections.location = "Desert Highway";
                newSelections.vehicles = "Vintage Muscle Car";
            }
            if (/\b(beach|sea|ocean|sand)\b/i.test(lowerPrompt)) newSelections.location = winningTheme === 'dark' ? "Beach at Night" : "Beach at Night"; // Could add a sunny beach if available

            // Musical/Atmosphere Overrides (The "Boy Band" Fix)
            const isBanger = /\b(fire|electric|burn|heat|tighten|loud|fast|spark)\b/i.test(lowerPrompt);
            const isMusic = /\b(rhythm|tempo|beat|music|band|stage)\b/i.test(lowerPrompt);

            if (isMusic || isBanger) {
                if (isBanger) newSelections.location = "Stadium Stage"; // Concert/Boy Band Banger
                else if (winningTheme === 'romance') newSelections.location = isBanger ? "Stadium Stage" : "Open Field"; // Boy Band Ballad
                else newSelections.location = "Dive Bar"; // General band vibe
            }

            // Weather/Time Overrides (Only if explicit)
            if (/\b(rain|storm|wet)\b/i.test(lowerPrompt)) newSelections.weather = "Heavy Rain";
            if (/\b(sun|sunny|hot)\b/i.test(lowerPrompt)) { newSelections.weather = "Clear"; newSelections.timeOfDay = "Noon"; }
            if (/\b(night|dark|moon|midnight)\b/i.test(lowerPrompt)) newSelections.timeOfDay = "Midnight";

            // SUPER-MEGA PROMPT PARSING (User Paste Support / "Training")
            // If the user pastes a ChatGPT prompt, we extract the "Director Language"
            if (/\b(burgundy|ember|rose-gold)\b/i.test(lowerPrompt)) newSelections.colorGrade = "Pastel Dream";
            if (/\b(low-key|silhouette|rim light)\b/i.test(lowerPrompt)) newSelections.lighting = "Low-Key Noir";
            if (/\b(shallow depth|push-in|close-up)\b/i.test(lowerPrompt)) newSelections.angle = "Close Up";
            if (/\b(ribbons|particles|haze)\b/i.test(lowerPrompt)) newSelections.lighting = "Volumetric Beams";


            // Explicit Location Extraction from Paste (The "Self-Training" effect)
            // These MUST come last to override any "Banger/Music" defaults
            if (/\b(stadium|concert|arena|stage)\b/i.test(lowerPrompt)) newSelections.location = "Stadium Stage";
            if (/\b(field|meadow|open|nature)\b/i.test(lowerPrompt)) newSelections.location = "Open Field";
            if (/\b(city|urban|concrete|street|pavement)\b/i.test(lowerPrompt)) newSelections.location = "Neon City Street";
            if (/\b(rooftop|roof)\b/i.test(lowerPrompt)) newSelections.location = "City Rooftop";
            if (/\b(apartment|home|room|loft|flat)\b/i.test(lowerPrompt)) newSelections.location = "Modern Apartment";
            if (/\b(studio|dance)\b/i.test(lowerPrompt)) newSelections.location = "Dance Studio";

            setSelections(newSelections);
            setIsAnalyzing(false);
        }, 1500); // Slightly longer "thinking" time
    };

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
                            className="block w-full bg-white/5 border border-white/10 rounded-xl py-3 pl-4 pr-10 text-white text-base appearance-none focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all"
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
                    <div className="flex items-center justify-between mb-4">
                        <div className="flex items-center gap-2">
                            <Sparkles size={16} className="text-yellow-400" />
                            <h3 className="text-sm font-bold uppercase tracking-wider text-white/60">Mega Prompt Preview</h3>
                        </div>
                        {isAnalyzing && <span className="text-xs text-yellow-400 animate-pulse font-mono">DIRECTOR IS ANALYZING...</span>}
                    </div>

                    <div className="bg-black/40 rounded-xl p-4 font-mono text-sm text-indigo-200 overflow-y-auto mb-4 border border-white/5 h-24">
                        <span className="text-white/40 block mb-2 text-xs uppercase tracking-wider">Auto-Generated Context:</span>
                        {constructedPrompt || <span className="text-white/20">Select options from the right...</span>}
                    </div>

                    <div className="flex-1 flex flex-col min-h-0">
                        <div className="flex justify-between items-center mb-2">
                            <label className="text-xs font-bold text-white/60 uppercase tracking-widest">
                                Input Source (Lyrics or ChatGPT)
                            </label>

                            {/* AUTO-DIRECT BUTTON */}
                            <button
                                onClick={analyzeLyrics}
                                disabled={!prompt || prompt.length < 5 || isAnalyzing}
                                className={`text-[10px] px-3 py-1.5 rounded-full border flex items-center gap-2 transition-all
                                    ${prompt && prompt.length >= 5 && !isAnalyzing
                                        ? 'bg-indigo-500/20 border-indigo-500/50 text-indigo-300 hover:bg-indigo-500 hover:text-white cursor-pointer shadow-lg shadow-indigo-500/20'
                                        : 'bg-white/5 border-white/5 text-white/20 cursor-not-allowed'}
                                `}
                            >
                                <Wand2 size={10} />
                                {isAnalyzing ? "Analyzing Input..." : "Auto-Direct Scene"}
                            </button>
                        </div>

                        <textarea
                            value={prompt}
                            onChange={(e) => setPrompt(e.target.value)}
                            placeholder={`PASTE HERE:\n• Song Lyrics\n• OR Your ChatGPT "Ultra-Compact" Prompt\n\nThe Director Engine will analyze either input to set the scene.`}
                            className="w-full bg-black/20 border border-white/10 rounded-xl p-4 text-sm text-white flex-1 focus:border-indigo-500 transition-all resize-none leading-relaxed placeholder:text-white/20 min-h-[120px]"
                        />
                    </div>

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
                    {
                        categories.map(c => (
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
                        ))
                    }
                </div>

                {/* Scrollable Options Area */}
                <div className="flex-1 overflow-y-auto p-8 space-y-8 bg-black/20">

                    {activeCategory === 'world' && (
                        <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
                            <ControlGroup title="1. Location (Where is this happening?)" options={OPTIONS.world.location} current={selections.location} onSelect={(v) => toggleSelection('location', v)} allowCustom={true} />
                            <ControlGroup title="2. Time of Day" options={OPTIONS.world.timeOfDay} current={selections.timeOfDay} onSelect={(v) => toggleSelection('timeOfDay', v)} />
                            <ControlGroup title="3. Weather / Element" options={OPTIONS.world.weather} current={selections.weather} onSelect={(v) => toggleSelection('weather', v)} />
                        </div>
                    )
                    }

                    {
                        activeCategory === 'lighting' && (
                            <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
                                <ControlGroup title="Lighting Setup" options={OPTIONS.lighting.lighting} current={selections.lighting} onSelect={(v) => toggleSelection('lighting', v)} />
                                <ControlGroup title="Overall Mood" options={OPTIONS.lighting.mood} current={selections.mood} onSelect={(v) => toggleSelection('mood', v)} />
                                <ControlGroup title="Color Grading" options={OPTIONS.lighting.colorGrade} current={selections.colorGrade} onSelect={(v) => toggleSelection('colorGrade', v)} />
                            </div>
                        )
                    }

                    {
                        activeCategory === 'camera' && (
                            <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
                                <ControlGroup title="Camera Angle" options={OPTIONS.camera.angle} current={selections.angle} onSelect={(v) => toggleSelection('angle', v)} />
                                <ControlGroup title="Lens Info" options={OPTIONS.camera.lens} current={selections.lens} onSelect={(v) => toggleSelection('lens', v)} />
                                <ControlGroup title="Camera Movement" options={OPTIONS.camera.movement} current={selections.movement} onSelect={(v) => toggleSelection('movement', v)} />
                            </div>
                        )
                    }

                    {
                        activeCategory === 'style' && (
                            <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
                                <ControlGroup title="Film Stock / Medium" options={OPTIONS.style.filmStock} current={selections.filmStock} onSelect={(v) => toggleSelection('filmStock', v)} />
                                <ControlGroup title="Art Direction Style" options={OPTIONS.style.artDirection} current={selections.artDirection} onSelect={(v) => toggleSelection('artDirection', v)} />
                            </div>
                        )
                    }

                    {
                        activeCategory === 'elements' && (
                            <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
                                <ControlGroup title="Lead Character Outfit" options={OPTIONS.elements.clothing} current={selections.clothing} onSelect={(v) => toggleSelection('clothing', v)} />
                                <ControlGroup title="Key Props" options={OPTIONS.elements.props} current={selections.props} onSelect={(v) => toggleSelection('props', v)} isMulti />
                                <ControlGroup title="Vehicles" options={OPTIONS.elements.vehicles} current={selections.vehicles} onSelect={(v) => toggleSelection('vehicles', v)} />
                                <ControlGroup title="Animals" options={OPTIONS.elements.animals} current={selections.animals} onSelect={(v) => toggleSelection('animals', v)} />
                            </div>
                        )
                    }

                </div >
            </div >
        </div >
    );
}

// Sub-component for options grid
function ControlGroup({ title, options, current, onSelect, isMulti = false, allowCustom = false }: { title: string, options: string[], current: string | string[], onSelect: (v: string) => void, isMulti?: boolean, allowCustom?: boolean }) {
    const isCustomSelected = allowCustom && !Array.isArray(current) && current && !options.includes(current);

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

                {allowCustom && (
                    <div className={`relative flex items-center transition-all duration-200
                        ${isCustomSelected
                            ? 'w-64 border-indigo-500 ring-1 ring-indigo-500/50'
                            : 'w-40 border-white/10 hover:border-white/30'}
                        rounded-lg border bg-white/5
                    `}>
                        <div className="absolute left-3 text-white/40 pointer-events-none">
                            <MapPin size={14} />
                        </div>
                        <input
                            type="text"
                            value={isCustomSelected ? (current as string) : ''}
                            onChange={(e) => onSelect(e.target.value)}
                            placeholder="Scout Location..."
                            className="w-full bg-transparent text-sm text-white px-3 py-2 pl-9 outline-none placeholder:text-white/20"
                        />
                    </div>
                )}
            </div>
        </div>
    );
}
