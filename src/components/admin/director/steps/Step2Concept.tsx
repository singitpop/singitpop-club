
import React, { useState, useEffect } from 'react';
import { Film, RefreshCw, CheckCircle, Sparkles } from 'lucide-react';

interface Step2Props {
    track: any;
    prompt: string;
    onNext: (concept: Concept) => void;
    onBack: () => void;
}

export interface Concept {
    id: string;
    title: string;
    description: string;
    visualStyle: string;
    colorPalette: string[];
    vibe: string;
}

export const Step2Concept: React.FC<Step2Props> = ({ track, prompt, onNext, onBack }) => {
    const [concepts, setConcepts] = useState<Concept[]>([]);
    const [selectedConcept, setSelectedConcept] = useState<Concept | null>(null);
    const [loading, setLoading] = useState(true);

    // AI Logic: Template Matching
    const allTemplates: Concept[] = [
        {
            id: 'romantic',
            title: 'Valentine Romance',
            description: 'Soft golden-hour lighting, rose-gold tones, and intimate close-ups. Floating camera movements.',
            visualStyle: 'Soft Bokeh, Rose Petals, Warm Glow, Slow Motion',
            colorPalette: ['#FFC1CC', '#FFD700', '#FF0080'],
            vibe: 'Valentine'
        },
        {
            id: 'noir',
            title: 'Neon Noir Detective',
            description: 'A moody, rain-soaked visual narrative. High contrast lights reflecting on wet pavement.',
            visualStyle: 'Neo-Noir, High Contrast, Rain, Neon Signs',
            colorPalette: ['#FF0080', '#00FFFF', '#000000'],
            vibe: 'Neo-Noir'
        },
        {
            id: 'abstract',
            title: 'Abstract Ethereal',
            description: 'Fluid shapes and dreamlike transitions that pulse with the beat.',
            visualStyle: 'Soft Focus, Pastel, Floating Particles, Minimalist',
            colorPalette: ['#FFD1DC', '#E0BBE4', '#FFFFFF'],
            vibe: 'Nature'
        },
        {
            id: 'retro',
            title: 'Retro VHS Glitch',
            description: 'Lo-fi aesthetic with tape distortion and 90s camcorder vibes.',
            visualStyle: 'VHS, Grain, Scanlines, Datamosh',
            colorPalette: ['#FF0000', '#00FF00', '#0000FF'],
            vibe: 'Retro'
        },
        {
            id: 'space',
            title: 'Cosmic Journey',
            description: 'A deep space odyssey featuring starfields and nebulas.',
            visualStyle: 'Deep Space, Stars, Lens Flare, Cinematic',
            colorPalette: ['#000033', '#4B0082', '#FFD700'],
            vibe: 'Space'
        },
        {
            id: 'warm',
            title: 'Golden Hour Cinematic',
            description: 'Warm, natural lighting with lens flares and organic textures.',
            visualStyle: 'Sunlight, Bokeh, Warm Tones, Film Stock',
            colorPalette: ['#FFD700', '#FFA500', '#8B4513'],
            vibe: 'Country'
        },
        {
            id: 'dark',
            title: 'Gothic Shadows',
            description: 'Deep shadows, fog, and mystery. Monochromatic with sharp accents.',
            visualStyle: 'Fog, Moonlight, Silhouettes, High Contrast',
            colorPalette: ['#111111', '#333333', '#800000'],
            vibe: 'Dark'
        },
        {
            id: 'party',
            title: 'Neon Party',
            description: 'Fast cuts, strobing lights, and energetic movements.',
            visualStyle: 'Strobe, Glitch, Vibrant, Motion Blur',
            colorPalette: ['#FF00FF', '#00FF00', '#FFFF00'],
            vibe: 'Party'
        }
    ];

    const generateConcepts = () => {
        setLoading(true);
        setTimeout(() => {
            // Intelligent Scoring
            const input = (prompt + " " + track.title + " " + (track.genre || "") + " " + (track.vibe || "")).toLowerCase();
            console.log("AI Input Analysis:", input);

            const scored = allTemplates.map(t => {
                let score = 0;
                // Basic keyword match (2 points)
                const keywords = t.title.toLowerCase().split(' ').concat(t.vibe.toLowerCase()).concat(t.visualStyle.toLowerCase().split(', '));
                keywords.forEach(k => {
                    if (input.includes(k.replace(',', '').trim())) score += 2;
                });

                // Specific manual overrides (Big Boosts)
                if ((input.includes('love') || input.includes('heart') || input.includes('romantic')) && t.id === 'romantic') score += 10;
                if (input.includes('valentine') && t.id === 'romantic') score += 15;
                if (input.includes('dance') && t.id === 'party') score += 5;
                if ((input.includes('sad') || input.includes('lonely')) && (t.id === 'noir' || t.id === 'dark')) score += 5;
                if ((input.includes('space') || input.includes('future')) && t.id === 'space') score += 5;
                if ((input.includes('country') || input.includes('warm')) && t.id === 'warm') score += 5;

                return { ...t, score };
            });

            // Sort by score desc, randomized tie-breaking
            scored.sort((a, b) => b.score - a.score || Math.random() - 0.5);

            // Select Top 4
            let top = scored.slice(0, 4);

            // If top score is 0 (no match), fallback to generic mix
            if (top[0].score === 0) {
                top = scored.sort(() => Math.random() - 0.5).slice(0, 4);
            }

            // Map to output format with dynamic ID
            const finalConcepts = top.map(t => ({
                id: `${t.id}_${Date.now()}`,
                title: t.title,
                description: t.description,
                visualStyle: t.visualStyle,
                colorPalette: t.colorPalette,
                vibe: t.vibe
            }));

            setConcepts(finalConcepts);
            setLoading(false);
        }, 1200);
    };

    useEffect(() => {
        generateConcepts();
    }, []);

    return (
        <div style={{ maxWidth: '1000px', margin: '0 auto', color: 'white' }}>
            <div style={{ display: 'flex', alignItems: 'center', marginBottom: '2rem' }}>
                <button onClick={onBack} style={{ background: 'transparent', border: 'none', color: '#888', cursor: 'pointer', fontSize: '1rem', padding: 0 }}>
                    ← Back
                </button>
                <div style={{ margin: '0 0 0 auto', textAlign: 'right' }}>
                    <h2 style={{ fontSize: '2rem', margin: 0 }}>Step 2: Director's Vision</h2>
                    <span style={{ color: '#666', fontSize: '0.9rem' }}>AI Matching Engine: Active</span>
                </div>
            </div>

            <p style={{ textAlign: 'center', color: '#888', marginBottom: '2rem' }}>
                Analyzing <strong>"{track.title}"</strong> + <em>"{prompt.substring(0, 50)}{prompt.length > 50 ? '...' : ''}"</em>
            </p>

            {loading ? (
                <div style={{ textAlign: 'center', padding: '4rem' }}>
                    <RefreshCw className="spin" size={48} color="#FF0080" style={{ animation: 'spin 1s linear infinite' }} />
                    <p style={{ marginTop: '1rem', color: '#666' }}>Generating visual treatments...</p>
                    <style>{`@keyframes spin { 0% { transform: rotate(0deg); } 100% { transform: rotate(360deg); } }`}</style>
                </div>
            ) : (
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '1.5rem', marginBottom: '2rem' }}>
                    {concepts.map(concept => (
                        <div
                            key={concept.id}
                            onClick={() => setSelectedConcept(concept)}
                            style={{
                                background: selectedConcept?.id === concept.id ? '#1a1a1a' : '#0a0a0a',
                                border: selectedConcept?.id === concept.id ? '2px solid #FF0080' : '1px solid #333',
                                borderRadius: '12px',
                                padding: '1.5rem',
                                cursor: 'pointer',
                                transition: 'all 0.2s',
                                position: 'relative',
                                display: 'flex',
                                flexDirection: 'column',
                                gap: '1rem',
                                boxShadow: selectedConcept?.id === concept.id ? '0 0 20px rgba(255,0,128,0.2)' : 'none'
                            }}
                        >
                            {selectedConcept?.id === concept.id && (
                                <div style={{ position: 'absolute', top: '1rem', right: '1rem', color: '#FF0080' }}>
                                    <CheckCircle size={24} />
                                </div>
                            )}

                            {/* Color Palette Preview */}
                            <div style={{ display: 'flex', gap: '5px', height: '6px', borderRadius: '4px', overflow: 'hidden' }}>
                                {concept.colorPalette.map((c, i) => (
                                    <div key={i} style={{ flex: 1, background: c }} />
                                ))}
                            </div>

                            <div>
                                <h3 style={{ fontSize: '1.2rem', margin: 0, color: 'white' }}>{concept.title}</h3>
                                <span style={{ fontSize: '0.75rem', color: '#888', textTransform: 'uppercase', letterSpacing: '1px', border: '1px solid #333', padding: '2px 6px', borderRadius: '4px' }}>
                                    {concept.vibe}
                                </span>
                            </div>

                            <p style={{ color: '#ccc', fontSize: '0.9rem', lineHeight: '1.5', minHeight: '60px' }}>{concept.description}</p>

                            <div style={{ background: '#111', padding: '0.8rem', borderRadius: '6px', fontSize: '0.8rem', color: '#999', border: '1px dashed #333' }}>
                                <Sparkles size={12} style={{ marginRight: '5px', verticalAlign: 'middle' }} />
                                <strong>Style:</strong> {concept.visualStyle}
                            </div>
                        </div>
                    ))}
                </div>
            )}

            {!loading && (
                <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center' }}>
                    <button
                        onClick={generateConcepts}
                        style={{
                            padding: '1rem 2rem',
                            background: '#222',
                            color: 'white',
                            border: '1px solid #333',
                            borderRadius: '8px',
                            cursor: 'pointer',
                            display: 'flex',
                            alignItems: 'center',
                            gap: '0.5rem'
                        }}
                    >
                        <RefreshCw size={18} /> Regenerate
                    </button>
                    <button
                        onClick={() => selectedConcept && onNext(selectedConcept)}
                        disabled={!selectedConcept}
                        style={{
                            padding: '1rem 3rem',
                            background: !selectedConcept ? '#333' : '#FF0080',
                            color: 'white',
                            border: 'none',
                            borderRadius: '8px',
                            fontWeight: 'bold',
                            fontSize: '1.1rem',
                            cursor: !selectedConcept ? 'not-allowed' : 'pointer',
                            opacity: !selectedConcept ? 0.5 : 1,
                            boxShadow: !selectedConcept ? 'none' : '0 0 20px rgba(255,0,128,0.4)'
                        }}
                    >
                        Approve Concept →
                    </button>
                </div>
            )}
        </div>
    );
};
