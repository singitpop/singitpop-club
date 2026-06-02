
import React, { useState, useEffect } from 'react';
import { Layout, Clock, Video, Camera, Zap, Coffee } from 'lucide-react';
import { Concept } from './Step2Concept';
import { CharacterProfile } from './Step3Casting';

interface Step3Props {
    concept: Concept;
    character?: CharacterProfile | null;
    syncedLyrics?: any[];
    onNext: (scenes: any[]) => void;
    onBack: () => void;
}

type PacingMode = 'slow' | 'balanced' | 'fast';

export const Step3Storyboard: React.FC<Step3Props> = ({ concept, character, syncedLyrics, onNext, onBack }) => {
    const [scenes, setScenes] = useState<any[]>([]);
    const [pacing, setPacing] = useState<PacingMode>('balanced');
    const [generating, setGenerating] = useState(false);

    useEffect(() => {
        generateStoryboard();
    }, [syncedLyrics, concept, pacing, character]);

    const generateStoryboard = () => {
        if (!syncedLyrics || syncedLyrics.length === 0) return;

        setGenerating(true);
        const generated = [];
        let currentLines: string[] = [];
        let startTime = syncedLyrics[0].startTime;

        // Pacing Configuration
        // "Long Takes" = 4 lines/scene. "Rapid Cuts" = 1 line/scene.
        let maxLinesPerScene = 2; // Balanced
        if (pacing === 'slow') maxLinesPerScene = 4; // Long Takes
        if (pacing === 'fast') maxLinesPerScene = 1; // Rapid Cuts

        // Visual Assets
        const angles = ["Wide establishing shot", "Intimate close-up", "Low angle hero shot", "Cinematic profile", "Over-the-shoulder", "Slow tracking shot", "Extreme close-up of eyes"];
        const movements = ["slow dolly zoom", "gentle handheld drift", "static composition", "slow pan to right", "rack focus reveal", "orbital camera move", "whip pan"];

        // Context Actions
        const isRomantic = concept.vibe.toLowerCase().includes('valentine') || concept.vibe.toLowerCase().includes('love');
        const isParty = concept.vibe.toLowerCase().includes('party') || concept.vibe.toLowerCase().includes('dance');

        const actions = isRomantic
            ? ["singing softly to camera", "looking longingly at distance", "gently touching a light source", "standing still in emotion", "walking slowly towards light", "closing eyes in moment", "reaching out hand"]
            : isParty
                ? ["dancing energetically", "jumping with the beat", "singing with power", "moving through a crowd", "flashing a smile", "raising hands up", "spinning"]
                : ["singing with emotion", "observing the environment", "walking with purpose", "standing stoic", "looking up at the sky", "sitting contemplatively"];

        let lineCounter = 0;

        for (let i = 0; i < syncedLyrics.length; i++) {
            currentLines.push(syncedLyrics[i].text);
            lineCounter++;

            // Break Logic
            const variance = Math.random() > 0.7 ? 1 : 0;
            const threshold = maxLinesPerScene + variance;
            const isLast = i === syncedLyrics.length - 1;

            if (lineCounter >= threshold || isLast) {
                const endTime = syncedLyrics[i].endTime;
                const sceneIndex: number = generated.length;

                // Creative Direction
                const visualDetails = concept.visualStyle.split(', ');
                const detail = visualDetails[sceneIndex % visualDetails.length] || visualDetails[0];
                const mood = concept.colorPalette[sceneIndex % concept.colorPalette.length];

                const angle = angles[sceneIndex % angles.length];
                const movement = movements[sceneIndex % movements.length];
                const action = actions[sceneIndex % actions.length];

                // INJECT CHARACTER DNA
                const characterDesc = character ? `featuring ${character.name}` : 'of character';
                const characterPrompt = character ? character.dna : 'a person';

                const description = `${angle} ${characterDesc} ${action}. ${concept.title} aesthetic with ${detail}. ${movement}. Lighting is ${mood} toned.`;
                const prompt = `${characterPrompt}, ${concept.vibe} music video, ${angle}, ${action}, ${detail}, ${concept.visualStyle}, cinematic lighting, ${concept.colorPalette.join(', ')} color palette, 8k, highly detailed --ar 16:9 --stylize 250`;

                generated.push({
                    id: `scene_${i}`,
                    startTime: startTime || 0,
                    endTime: endTime || 0,
                    lyrics: [...currentLines],
                    description: description,
                    prompt: prompt,
                    visualEffect: 'none',
                    zoomEffect: i % 2 === 0 ? 'zoom-in' : 'zoom-out',
                    image: null
                });

                currentLines = [];
                lineCounter = 0;
                if (!isLast) startTime = syncedLyrics[i + 1].startTime;
            }
        }
        setScenes(generated);
        setGenerating(false);
    };

    if (!syncedLyrics) {
        return (
            <div style={{ textAlign: 'center', padding: '4rem', color: 'white' }}>
                <h3>No Lyrics Found</h3>
                <p style={{ color: '#888' }}>Please go back and ensure lyrics are synced for this track.</p>
                <button onClick={onBack} style={{ marginTop: '1rem', padding: '0.5rem 1rem', background: '#333', color: 'white', border: 'none', borderRadius: '4px', cursor: 'pointer' }}>Back</button>
            </div>
        )
    }

    return (
        <div style={{ maxWidth: '1000px', margin: '0 auto', color: 'white', height: '100%', display: 'flex', flexDirection: 'column' }}>
            <div style={{ display: 'flex', alignItems: 'center', marginBottom: '1rem', flexShrink: 0 }}>
                <button onClick={onBack} style={{ background: 'transparent', border: 'none', color: '#888', cursor: 'pointer', fontSize: '1rem', padding: 0 }}>
                    ← Back
                </button>
                <div style={{ marginLeft: 'auto', textAlign: 'right' }}>
                    <h2 style={{ fontSize: '1.8rem', margin: 0 }}>Step 4: The Script</h2>
                    <span style={{ color: '#aaa', fontSize: '0.9rem' }}>Director Mode</span>
                </div>
            </div>

            {/* Pacing Control */}
            <div style={{ background: '#111', padding: '1rem', borderRadius: '8px', marginBottom: '1.5rem', display: 'flex', alignItems: 'center', gap: '1rem', border: '1px solid #222' }}>
                <div style={{ fontSize: '0.9rem', color: '#888', fontWeight: 'bold' }}>EDIT STYLE:</div>

                <button
                    onClick={() => setPacing('slow')}
                    style={{
                        flex: 1, padding: '0.8rem', borderRadius: '6px', border: 'none', cursor: 'pointer',
                        background: pacing === 'slow' ? '#FF0080' : '#222', color: 'white', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.5rem', transition: 'all 0.2s',
                        opacity: pacing === 'slow' ? 1 : 0.7
                    }}
                >
                    <Coffee size={18} />
                    <div style={{ display: 'flex', flexDirection: 'column', lineHeight: '1' }}>
                        <span style={{ fontWeight: 'bold' }}>Long Takes</span>
                        <span style={{ fontSize: '0.7rem', opacity: 0.8 }}>Cinematic (Few Scenes)</span>
                    </div>
                </button>
                <button
                    onClick={() => setPacing('balanced')}
                    style={{
                        flex: 1, padding: '0.8rem', borderRadius: '6px', border: 'none', cursor: 'pointer',
                        background: pacing === 'balanced' ? '#FF0080' : '#222', color: 'white', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.5rem', transition: 'all 0.2s',
                        opacity: pacing === 'balanced' ? 1 : 0.7
                    }}
                >
                    <Video size={18} />
                    <div style={{ display: 'flex', flexDirection: 'column', lineHeight: '1' }}>
                        <span style={{ fontWeight: 'bold' }}>Balanced</span>
                        <span style={{ fontSize: '0.7rem', opacity: 0.8 }}>Standard Flow</span>
                    </div>
                </button>
                <button
                    onClick={() => setPacing('fast')}
                    style={{
                        flex: 1, padding: '0.8rem', borderRadius: '6px', border: 'none', cursor: 'pointer',
                        background: pacing === 'fast' ? '#FF0080' : '#222', color: 'white', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.5rem', transition: 'all 0.2s',
                        opacity: pacing === 'fast' ? 1 : 0.7
                    }}
                >
                    <Zap size={18} />
                    <div style={{ display: 'flex', flexDirection: 'column', lineHeight: '1' }}>
                        <span style={{ fontWeight: 'bold' }}>Rapid Cuts</span>
                        <span style={{ fontSize: '0.7rem', opacity: 0.8 }}>High Variety (Many Scenes)</span>
                    </div>
                </button>

                <div style={{ marginLeft: 'auto', color: '#FF0080', fontWeight: 'bold', fontSize: '1.2rem' }}>
                    {scenes.length} Scenes
                </div>
            </div>

            <div style={{ flex: 1, overflowY: 'auto', paddingRight: '1rem', marginBottom: '1.5rem' }}>
                {scenes.map((scene, index) => (
                    <div key={scene.id} style={{ display: 'flex', gap: '1rem', marginBottom: '1.5rem', background: '#111', padding: '1rem', borderRadius: '8px', border: '1px solid #333' }}>
                        {/* Time & Info */}
                        <div style={{ minWidth: '120px', borderRight: '1px solid #333', paddingRight: '1rem' }}>
                            <div style={{ color: '#666', fontSize: '0.8rem', textTransform: 'uppercase', marginBottom: '0.5rem' }}>Scene {index + 1}</div>
                            <div style={{ display: 'flex', alignItems: 'center', gap: '0.3rem', color: '#444', fontSize: '0.9rem' }}>
                                <Clock size={14} /> {(scene.startTime || 0).toFixed(1)}s - {(scene.endTime || 0).toFixed(1)}s
                            </div>
                            <div style={{ marginTop: '1rem', fontSize: '0.8rem', color: '#888' }}>
                                {scene.lyrics.length} Lines
                            </div>
                        </div>

                        {/* Script / Visuals */}
                        <div style={{ flex: 1 }}>
                            <div style={{ marginBottom: '1rem' }}>
                                <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.3rem' }}>
                                    <Camera size={14} color="#666" />
                                    <label style={{ display: 'block', color: '#666', fontSize: '0.75rem' }}>DIRECTOR'S NOTES</label>
                                </div>
                                <textarea
                                    value={scene.description}
                                    onChange={(e) => {
                                        const newScenes = [...scenes];
                                        newScenes[index].description = e.target.value;
                                        setScenes(newScenes);
                                    }}
                                    style={{
                                        width: '100%',
                                        background: '#222',
                                        border: 'none',
                                        color: '#ddd',
                                        padding: '0.8rem',
                                        borderRadius: '4px',
                                        fontSize: '0.95rem',
                                        minHeight: '80px',
                                        lineHeight: '1.5',
                                        fontFamily: 'sans-serif'
                                    }}
                                />
                            </div>
                            <div>
                                <label style={{ display: 'block', color: '#666', fontSize: '0.75rem', marginBottom: '0.3rem' }}>LYRICS</label>
                                <p style={{ margin: 0, fontStyle: 'italic', color: '#aaa', fontSize: '0.9rem', borderLeft: '2px solid #FF0080', paddingLeft: '0.8rem' }}>
                                    "{scene.lyrics.join(' / ')}"
                                </p>
                            </div>
                            {/* DNA Inspector */}
                            {character && (
                                <div style={{ marginTop: '0.5rem', fontSize: '0.7rem', color: '#555' }}>
                                    DNA: {character.dna.substring(0, 50)}...
                                </div>
                            )}
                        </div>
                    </div>
                ))}
            </div>

            <div style={{ display: 'flex', justifyContent: 'center', paddingBottom: '1rem' }}>
                <button
                    onClick={() => onNext(scenes)}
                    style={{
                        padding: '1rem 3rem',
                        background: '#FF0080',
                        color: 'white',
                        border: 'none',
                        borderRadius: '8px',
                        fontWeight: 'bold',
                        fontSize: '1.2rem',
                        cursor: 'pointer',
                        display: 'flex',
                        alignItems: 'center',
                        gap: '0.5rem',
                        boxShadow: '0 0 20px rgba(255,0,128,0.4)'
                    }}
                >
                    <Layout size={20} /> Enter Production Studio →
                </button>
            </div>
        </div>
    );
};
