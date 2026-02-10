
// ==========================================
// STRATIFY DIRECTOR - DATA MODEL (v1.0)
// Implements JSON Schema 2020-12
// ==========================================

export type UUID = string;

// --- 1. Top Level Project ---

export interface StratifyProject {
    schemaVersion: string; // e.g. "1.0.0"
    project: ProjectMeta;
    song: Song;
    cast: Cast;
    locations: Location[];
    scenes: Scene[];
    timeline: Timeline;
    exports?: ProjectExports;
}

export interface ProjectMeta {
    projectId: UUID;
    title: string;
    artistName?: string;
    createdAt: string; // ISO Date
    updatedAt: string; // ISO Date
    directorProfile: DirectorProfile;
    brandRules?: BrandRules;
    outputSpec: OutputSpec;
    notes?: string;
    tags?: string[];
}

// --- 2. Configuration & Profiles ---

export interface DirectorProfile {
    stylePreset: string; // "Cinematic Blocked", "Performance-Heavy", etc.
    coveragePreference: 'minimal' | 'standard' | 'coverage-heavy';
    cameraLanguage: {
        allowedMovements: CameraMovement[];
        defaultLensFeel: 'wide' | 'normal' | 'telephoto';
        handheldIntensity?: 'none' | 'subtle' | 'medium' | 'aggressive';
    };
}

export interface BrandRules {
    noUnwantedTextArtifacts?: boolean;
    avoidExtraCharacters?: boolean;
    logoPolicy?: 'no-logo' | 'end-card-only' | 'subtle-watermark-allowed';
    colorPalette?: string[]; // Hex codes
}

export interface OutputSpec {
    aspectRatio: '16:9' | '9:16' | '1:1' | '21:9';
    resolution: '720p' | '1080p' | '1440p' | '4k';
    fps: 24 | 25 | 30 | 50 | 60;
    clipSecondsOptions?: number[]; // e.g. [4, 6] for Veo
    deliverables: ('director-pack-pdf' | 'shotlist-csv' | 'prompt-pack' | 'rough-cut-video' | 'edl-xml')[];
}

// --- 3. Music & Lyrics ---

export interface Song {
    songId: UUID;
    title: string;
    language: string;
    genre: string;
    subGenre?: string;
    moodKeywords?: string[];
    audio?: FileRef;
    bpm?: number;
    key?: string;
    lyrics: Lyrics;
    sections?: LyricSection[]; // Filled by Lyric Analyst
}

export interface Lyrics {
    rawText: string;
    normalizedText?: string;
    explicitSectionTagsPresent?: boolean;
}

export interface LyricSection {
    sectionId: UUID;
    type: 'intro' | 'verse' | 'prechorus' | 'chorus' | 'bridge' | 'drop' | 'outro';
    startLine: number;
    endLine: number;
    text: string;
    emotion?: EmotionArcPoint;
    timeRange?: TimeRange;
}

export interface EmotionArcPoint {
    valence?: number; // -1 to 1
    arousal?: number; // 0 to 1
    labels?: string[];
}

export interface TimeRange {
    startSec: number;
    endSec: number;
}

// --- 4. Cast & Visuals ---

export interface Cast {
    lead: Character;
    band: Character[]; // Max 5
}

export interface Character {
    characterId: UUID;
    role: 'lead-singer' | 'guitarist' | 'bassist' | 'drummer' | 'keys' | 'dj' | 'backing-vocal' | 'other';
    name: string;
    genderPresentation?: 'male' | 'female' | 'androgynous' | 'unspecified';
    ageRange?: 'teen' | '20s' | '30s' | '40s' | '50s+' | 'unspecified';
    lookSpec?: LookSpec;
    wardrobeSignature?: string[];
    instrument?: string;
    referenceImages?: FileRef[];
    consistency?: ConsistencySpec;
}

export interface LookSpec {
    face?: string; // Descriptive identity text
    hair?: string;
    skinTone?: string;
    distinctiveFeatures?: string[];
    style?: string; // "realistic", "stylized", "animated"
}

export interface ConsistencySpec {
    strictness: 'low' | 'medium' | 'high' | 'locked';
    lockFace?: boolean;
    lockWardrobeMotif?: boolean;
    lockHair?: boolean;
}

export interface Location {
    locationId: UUID;
    name: string;
    type: 'interior' | 'exterior' | 'stage' | 'studio' | 'virtual';
    visualNotes: string;
    referenceFrames?: FileRef[];
    continuityRules?: string[];
}

// --- 5. Scene & Shot Structure ---

export interface Scene {
    sceneId: UUID;
    index: number;
    title: string;
    mappedSectionIds?: UUID[]; // Linked lyric sections
    locationId: UUID;
    mood?: {
        keywords?: string[];
        lighting?: string;
        colorGrade?: string;
    };
    theme?: string;
    blockingNotes?: string;
    performanceNotes?: string;
    shots: Shot[];
}

export interface Shot {
    shotId: UUID;
    index: number;
    durationSec: number;
    shotType: 'EWS' | 'WS' | 'MS' | 'CU' | 'ECU' | 'POV' | 'OTS' | 'insert' | 'montage';
    camera: CameraSpec;
    lighting?: LightingSpec;
    subjects: SubjectInShot[];
    action: string;
    audioSync?: AudioSyncSpec;
    promptIntent: PromptIntent; // The generic intent
    toolRenders?: ToolRender[]; // The results
}

export interface CameraSpec {
    movement: CameraMovement;
    movementSpeed?: 'very-slow' | 'slow' | 'medium' | 'fast' | 'snap';
    angle: 'eye-level' | 'low-angle' | 'high-angle' | 'top-down' | 'dutch';
    lensFeel: 'wide' | 'normal' | 'telephoto';
    focalLengthMm?: number;
    framing?: string;
    focus?: {
        depthOfField?: 'deep' | 'medium' | 'shallow';
        rackFocus?: boolean;
        rackFrom?: string;
        rackTo?: string;
    };
}

export type CameraMovement = 'locked' | 'pan' | 'tilt' | 'dolly-in' | 'dolly-out' | 'truck-left' | 'truck-right' | 'orbit' | 'crane-up' | 'crane-down' | 'handheld' | 'drone' | 'zoom-in' | 'zoom-out';

export interface LightingSpec {
    style?: string;
    timeOfDay?: 'dawn' | 'day' | 'golden-hour' | 'dusk' | 'night' | 'interior-unknown';
    practicals?: string[];
}

export interface SubjectInShot {
    characterId: UUID;
    purpose: 'singing' | 'playing' | 'reacting' | 'b-roll' | 'crowd' | 'story';
    screenPosition?: 'left' | 'center' | 'right' | 'foreground' | 'background';
    wardrobeOverride?: string;
}

export interface AudioSyncSpec {
    mode: 'none' | 'lip-sync-lead' | 'lip-sync-background';
    lineText?: string;
    timeRange?: TimeRange;
    phonemeHints?: string[];
}

export interface PromptIntent {
    visualStyle: string;
    sceneDescription: string;
    constraints?: string[];
    negatives?: string[];
    toolPromptOverrides?: {
        veo?: ToolPromptOverride;
        runway?: ToolPromptOverride;
        pika?: ToolPromptOverride;
        luma?: ToolPromptOverride;
    };
}

export interface ToolPromptOverride {
    promptText?: string;
    negativeText?: string;
    params?: Record<string, any>;
}

export interface ToolRender {
    tool: 'veo' | 'runway' | 'pika' | 'luma';
    status: 'queued' | 'running' | 'succeeded' | 'failed';
    renderedClip?: FileRef;
    thumbnail?: FileRef;
    seed?: string;
    notes?: string;
}

// --- 6. Export & Timeline ---

export interface Timeline {
    items: TimelineItem[];
}

export interface TimelineItem {
    sceneId: UUID;
    shotId: UUID;
    startSec: number;
    endSec: number;
    transition?: 'cut' | 'fade' | 'dip-to-black' | 'match-cut' | 'whip-pan';
}

export interface ProjectExports {
    promptPacks?: PromptPackExport[];
    edl?: EDLExport;
    pdfDirectorPack?: FileRef;
}

export interface PromptPackExport {
    tool: 'veo' | 'runway' | 'pika' | 'luma';
    generatedAt: string; // ISO
    file: FileRef;
}

export interface EDLExport {
    format: 'premiere-xml' | 'resolve-xml' | 'cmx3600';
    file: FileRef;
}

// --- Shared Helpers ---

export interface FileRef {
    uri: string;
    mimeType?: string;
    sha256?: string;
}
