
import { Location } from "@/types/stratify";

export const LOCATIONS: Partial<Location>[] = [
    // --- URBAN / CITY ---
    { name: "Cyberpunk Alley", visualNotes: "Neon signs reflecting in rain puddles, steam rising from vents, dark wet pavement." },
    { name: "Rooftop at Midnight", visualNotes: "City skyline bokeh in background, wind blowing hair, atmospheric haze." },
    { name: "Subway Station", visualNotes: "Fluorescent flickering lights, tiled walls, empty platform, brutalist architecture." },
    { name: "Luxury Penthouse", visualNotes: "Floor-to-ceiling windows, golden city lights, modern furniture, expensive vibe." },
    { name: "Gritty Dive Bar", visualNotes: "Red ambient lighting, smoke filled room, neon beer signs, crowded background." },

    // --- NATURE / OUTDOORS ---
    { name: "Desert Highway", visualNotes: "Endless road, heat shimmer, sunset horizon, vintage car interaction." },
    { name: "Misty Forest", visualNotes: "Tall pine trees, thick fog, god rays filtering through branches, cinematic cool tones." },
    { name: "Cliff Edge", visualNotes: "Epically high vantage point, crashing waves below, windy, drone-style scale." },
    { name: "Golden Wheat Field", visualNotes: "Sunset (Golden Hour), hand brushing through tall grass, warm lens flare." },
    { name: "Frozen Lake", visualNotes: "Ice textures, white/blue palette, breath visible in cold air, isolation." },

    // --- ABSTRACT / STUDIO ---
    { name: "Neon Void", visualNotes: "Infinite black space with floating geometric neon shapes (Pink/Blue)." },
    { name: "White Cyclorama", visualNotes: "High-key fashion lighting, pure white background, focus entirely on styling." },
    { name: "Mirror Room", visualNotes: "Kaleidoscope effect, multiple reflections, infinite depth, trippy visuals." },
    { name: "Silhouettes against Smoke", visualNotes: "Backlit wall of light, heavy fog, high contrast shadows." },
    { name: "VHS Glitch World", visualNotes: "Analog static background, retro 90s aesthetic, chromatic aberration." }
];

export const LIGHTING_STYLES = [
    { name: "Cinematic Teal & Orange", keyword: "complementary colors, blockbuster look" },
    { name: "Neon Noir", keyword: "pink and blue rim light, dark shadows" },
    { name: "Golden Hour", keyword: "warm sunset, backlight, lens flare, soft contrast" },
    { name: "High Key Fashion", keyword: "bright, even lighting, white background, commercial look" },
    { name: "Moody Silhouette", keyword: "backlit, rim light only, deep blacks, mystery" },
    { name: "Rembrandt", keyword: "classic portrait lighting, triangle of light, dramatic shadows" },
    { name: "Strobe / Club", keyword: "flashing lights, high energy, motion blur, colorful" },
    { name: "Black & White High Contrast", keyword: "monochrome, film noir, sharp shadows" }
];

export const KEYWORD_MAPPINGS = {
    // --- EMOTIONS ---
    sad: {
        keywords: ["hurt", "gone", "miss", "cry", "tears", "lonely", "alone", "empty", "broken", "pain", "sorry", "leave", "goodbye", "loss", "fade", "blue", "cold", "hard", "rain"],
        vibe: "Melancholic",
        lighting: "Moody Silhouette",
        locationType: "Isolation"
    },
    happy: {
        keywords: ["good", "love", "smile", "laugh", "yeah", "baby", "sweet", "high", "up", "sun", "shiny", "light", "better", "best", "gold", "wanna", "feel"],
        vibe: "Euphoric",
        lighting: "Golden Hour",
        locationType: "Open"
    },
    angry: {
        keywords: ["hate", "fight", "burn", "fire", "mad", "bad", "kill", "shut", "wrong", "lie", "cheat", "scream", "loud", "break", "crash", "hell", "blood"],
        vibe: "Aggressive",
        lighting: "High Key Fashion", // High contrast
        locationType: "Gritty"
    },
    romantic: {
        keywords: ["love", "heart", "hold", "kiss", "forever", "need", "you", "us", "together", "dream", "star", "eye", "touch", "body", "closer", "breath"],
        vibe: "Romantic",
        lighting: "Cinematic Teal & Orange",
        locationType: "Intimate"
    },

    // --- ACTIONS ---
    energy: {
        keywords: ["dance", "move", "shake", "run", "go", "fast", "party", "club", "beat", "rhythm", "jump", "spin", "rock", "roll", "wild", "crazy"],
        vibe: "High Energy",
        lighting: "Strobe / Club",
        locationType: "Dynamic"
    },

    // --- ABSTRACT / ATMOSPHERE ---
    dreamy: {
        keywords: ["dream", "sleep", "sky", "cloud", "fly", "float", "magic", "wonder", "time", "space", "mind", "soul", "heaven", "angel", "ghost"],
        vibe: "Ethereal",
        lighting: "Neon Void",
        locationType: "Surreal"
    },
    dark: {
        keywords: ["night", "dark", "black", "shadow", "fear", "monster", "devil", "deep", "under", "secret", "hide", "blind"],
        vibe: "Dark / Noir",
        lighting: "Neon Noir",
        locationType: "Urban"
    }
};

export const CAMERA_MOVES = [
    "Dolly-In (Slow)", "Orbit / Arc", "Handheld / Shaky", "Tracking Lateral",
    "Low Angle (Hero)", "Top-Down / Drone", "Dutch Angle (Unsettling)", "Crash Zoom"
];

export const ACTIONS = {
    performance: [
        "passionate singing into vintage mic",
        "energetic dancing with backup dancers",
        "walking towards camera with swagger",
        "emotional close-up looking at lens",
        "headbanging/playing instrument aggressively"
    ],
    narrative: [
        "looking out window continuously",
        "running through the location",
        "driving a vintage car",
        "standing still while world moves fast (timelapse)",
        "breaking something in slow motion"
    ]
};
