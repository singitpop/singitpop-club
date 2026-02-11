
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
        "passionate singing into vintage mic with eyes closed",
        "energetic dancing with backup dancers in synchronization",
        "walking towards camera with swagger and confidence",
        "emotional close-up looking directly into the lens",
        "headbanging or playing instrument aggressively",
        "sitting on a stool with acoustic guitar, intimate vibe",
        "standing back-to-back with bandmate, playing solo",
        "jumping in slow motion while performing",
        "interacting with the crowd/camera, pointing fingers",
        "silhouetted performance against bright backlight",
        "lying on the floor singing upwards",
        "leaning against a wall, cool and detached performance",
        "walking away from camera while singing over shoulder",
        "surrounded by fans/extras, chaotic energy",
        "singing in the rain/water, dramatic performance",
        "stylized posing with mic stand",
        "playing piano/keyboard with intense focus",
        "dynamic movement following the camera operator"
    ],
    narrative: [
        "looking out window continuously at the rain",
        "running through the location as if chased",
        "driving a vintage car down an empty road",
        "standing still while world moves fast (timelapse)",
        "breaking a mirror or object in slow motion",
        "walking alone through a crowded street",
        "sitting at a table waiting for someone who never comes",
        "writing a letter and then burning it",
        "wandering through a forest looking lost",
        "staring at a phone screen with a worried expression",
        "laughing hysterically but with sad eyes",
        "falling backwards onto a bed/surface",
        "looking at an old photograph with nostalgia",
        "running hand along a textured wall/surface",
        "waking up suddenly from a dream",
        "watching a sunset/sunrise with contemplation",
        "arguing with an unseen partner (silent acting)",
        "getting ready/dressing up in front of a mirror",
        "walking into the ocean/water fully clothed",
        "dancing alone in an empty room"
    ]
};

export const VERB_MAPPINGS: Record<string, string[]> = {
    // MOTION
    run: ["sprinting desperately", "running through the crowd", "fleeing from an unseen threat", "jogging with determination"],
    walk: ["walking slowly", "wandering aimlessly", "striding with confidence", "pacing back and forth"],
    drive: ["driving a vintage car", "gripping the steering wheel", "speeding down a highway", "sitting in a parked car"],
    fly: ["floating in mid-air", "looking down from a height", "arms spread wide like wings", "ascending towards light"],
    fall: ["falling backwards in slow motion", "collapsing to knees", "tripping and recovering", "descending into darkness"],
    dance: ["dancing freely", "swaying to the rhythm", "spinning around", "performing choreography"],

    // EMOTIONAL
    cry: ["wiping away a tear", "face buried in hands", "looking up with glassy eyes", "crying in the rain"],
    laugh: ["throwing head back laughing", "giggling with a friend", "manic laughter", "smiling warmly"],
    scream: ["screaming into the void", "yelling silently (glass mute)", "shouting in anger", "mouth open in a silent scream"],
    smile: ["subtle mysterious smile", "beaming with joy", "smirking confidently", "looking affectionately at camera"],

    // INTERACTION
    hold: ["holding a photograph", "clasping own hands", "reaching out to camera", "embracing invisible figure"],
    touch: ["touching a window pane", "running hand through hair", "fingers tracing a wall", "feeling the rain on skin"],
    break: ["smashing a mirror", "dropping a glass", "tearing up a letter", "punching a wall"],
    write: ["writing in a journal", "scribbling furiously", "typing on a phone", "penning a letter"],
    burn: ["watching a fire burn", "lighting a match", "burning a photo", "standing near flames"],

    // PASSIVE
    sleep: ["lying on a bed", "waking up suddenly", "sleeping peacefully", "drifting in water"],
    wait: ["checking a watch", "leaning against a wall waiting", "looking down the street", "sitting alone at a table"],
    think: ["staring into space", "looking contemplative", "rubbing temples", "lost in thought"]
};

export const ATMOSPHERIC_CONTEXTS: Record<string, string> = {
    rain: "in pouring rain",
    sun: "under bright sunlight",
    night: "at night",
    snow: "in falling snow",
    fog: "in heavy fog",
    wind: "in a windstorm",
    neon: "under neon lights"
};

export const PHYSICAL_CONTEXTS: Record<string, { description: string, actions: string[] }> = {
    car: {
        description: "inside a vehicle",
        actions: [
            "driving with intense focus",
            "looking out the passenger window",
            "gripping the steering wheel",
            "singing passionately from the driver's seat",
            "checking the rearview mirror",
            "resting head against the window"
        ]
    },
    bed: {
        description: "in a bedroom",
        actions: [
            "laying back on the mattress",
            "sitting on the edge of the bed",
            "waking up suddenly",
            "staring at the ceiling",
            "curled up under covers"
        ]
    },
    water: {
        description: "in water",
        actions: [
            "wading through waist-deep water",
            "floating on back",
            "submerging head underwater",
            "standing still in the water",
            "splashing water violently"
        ]
    },
    mirror: {
        description: "in front of a mirror",
        actions: [
            "staring at own reflection",
            "touching the glass surface",
            "fixing hair or makeup",
            "looking away from reflection in shame",
            "practicing a smile"
        ]
    },
    party: {
        description: "at a crowded party",
        actions: [
            "moving through a dense crowd",
            "dancing intimately with someone",
            "standing alone in a chaotic room",
            "holding a red cup and looking lost",
            "laughing with a group of strangers"
        ]
    },
    street: {
        description: "on a city street",
        actions: [
            "walking down the center line",
            "leaning against a brick wall",
            "running past streetlights",
            "waiting at a crosswalk",
            "looking up at skyscrapers"
        ]
    }
};
