"use client";

import { useState, useEffect } from 'react';
import { Image as ImageIcon, Wand2, Upload, RefreshCw, Trash2, Layers } from 'lucide-react';

interface LyricLine {
    text: string;
    timestamp: number;
}

interface Scene {
    id: string;
    startTime: number;
    endTime: number;
    lyrics: string[];
    prompt: string;
    image?: string;
    zoomEffect?: 'zoom-in' | 'zoom-out' | 'static' | 'pan-left' | 'pan-right';
    textAnimation?: 'fade' | 'slide' | 'typewriter' | 'kinetic';
    visualEffect?: 'none' | 'dust' | 'pulse' | 'flash' | 'grain' | 'vhs' | 'chromatic' | 'bloom' | 'shake' | 'film-damage' | 'light-leak';
}

interface SceneManagerProps {
    syncedLyrics: LyricLine[];
    vibe: string;
    scenes: Scene[];
    onScenesUpdate: (scenes: Scene[]) => void;
}

export default function SceneManager({ syncedLyrics, vibe, scenes, onScenesUpdate }: SceneManagerProps) {
    // Controlled component - no local state for scenes

    // Auto-Generate Scenes when lyrics change (initial load)
    useEffect(() => {
        if (syncedLyrics.length > 0 && scenes.length === 0) {
            generateScenes();
        }
    }, [syncedLyrics]);

    // Advanced Prompt Logic
    const CAMERA_ANGLES = [
        "Cinematic wide shot, epic scale",
        "Intimate close-up, shallow depth of field, bokeh",
        "Low angle dramatic shot, imposing",
        "Aerial drone view, high altitude",
        "Medium shot, dynamic composition",
        "Dutch angle, chaotic energy"
    ];

    const QUALITY_MODIFIERS = [
        "8k resolution",
        "Unreal Engine 5 render",
        "photorealistic",
        "volumetric lighting",
        "highly detailed",
        "masterpiece",
        "raytracing",
        "sharp focus",
        "cinematic color grading"
    ];

    const generateScenes = () => {
        const newScenes: Scene[] = [];
        const linesPerScene = 4;

        let sceneIndex = 0;
        for (let i = 0; i < syncedLyrics.length; i += linesPerScene) {
            const chunk = syncedLyrics.slice(i, i + linesPerScene);
            const startTime = chunk[0].timestamp;
            const nextChunkStart = syncedLyrics[i + linesPerScene]?.timestamp;
            const endTime = nextChunkStart ? nextChunkStart : startTime + 10;

            const textContent = chunk.map(l => l.text).join(" ");

            newScenes.push({
                id: `scene_${Date.now()}_${i}`,
                startTime,
                endTime,
                lyrics: chunk.map(l => l.text),
                // Pass sceneIndex to rotate camera angles
                prompt: generatePrompt(textContent, vibe, sceneIndex),
                image: undefined,
                zoomEffect: sceneIndex % 2 === 0 ? 'zoom-in' : 'zoom-out',
                textAnimation: 'fade',
                visualEffect: 'none' // Default to none as requested
            });
            sceneIndex++;
        }
        onScenesUpdate(newScenes);
    };

    const cleanText = (text: string) => {
        // Aggressive stop word list to remove lyrics and keep visual subjects
        const stopWords = [
            'the', 'a', 'an', 'and', 'or', 'but', 'in', 'on', 'at', 'to', 'for', 'of', 'with', 'by',
            'i', 'you', 'he', 'she', 'it', 'we', 'they', 'me', 'him', 'her', 'us', 'them',
            'my', 'your', 'his', 'her', 'its', 'our', 'their', 'mine', 'yours', 'ours', 'theirs',
            'is', 'am', 'are', 'was', 'were', 'be', 'been', 'being', 'have', 'has', 'had', 'do', 'does', 'did',
            'can', 'could', 'will', 'would', 'shall', 'should', 'may', 'might', 'must',
            'that', 'this', 'these', 'those', 'who', 'whom', 'whose', 'which', 'what',
            'just', 'like', 'from', 'up', 'down', 'out', 'over', 'under', 'about', 'into',
            'when', 'where', 'why', 'how', 'all', 'any', 'some', 'no', 'not', 'only',
            'walk', 'gets', 'back', 'hits', 'pulling', // Common lyric verbs that might not be visual
            'so', 'very', 'too', 'quite', 'really'
        ];

        // 1. Lowercase and remove punctuation
        const clean = text.toLowerCase().replace(/[.,/#!$%^&*;:{}=\-_`~()]/g, "");

        // 2. Filter words
        const words = clean.split(/\s+/)
            .filter(w => !stopWords.includes(w) && w.length > 2); // formatting check

        // 3. De-duplicate and take top visual words (max 5)
        const uniqueWords = Array.from(new Set(words));
        return uniqueWords.slice(0, 5).join(' ');
    };

    const generatePrompt = (text: string, vibe: string, index: number) => {
        // 1. Camera Angle (Rotate based on index)
        const angle = CAMERA_ANGLES[index % CAMERA_ANGLES.length];

        // 2. Subject (Cleaned text)
        const subject = cleanText(text).substring(0, 100); // Limit length

        // 3. Vibe Styles (Expanded)
        const styles: any = {
            // Base Styles
            'Neo-Noir': 'neo-noir city, neon lights, rain, reflections, futuristic, cinematic 4k, trending on artstation',
            'Neon': 'abstract neon shapes, glowing lines, dark background, synthwave style, vibrant colors',
            'Retro': 'vintage 80s style, vhs glitch, warm colors, grain, nostalgic, lo-fi aesthetic',
            'Nature': 'beautiful landscape, mountains, cinematic lighting, photorealistic, 8k, serene atmosphere',
            'Abstract': 'abstract shapes, flowing liquid, dreamlike, surreal, colorful',
            'Dark': 'moody, shadows, cinematic noir, minimal lighting, dramatic',
            'Fantasy': 'magical world, glowing particles, etherial, dreamlike, detailed fantasy art',
            'Sci-Fi': 'spaceship interior, stars, nebula, futuristic architecture, clean lines',
            'Space': 'deep space, nebula, stars, galaxy, cosmic, cinematic, 8k',

            // Holidays
            'Valentine': 'romantic atmosphere, floating rose petals, pink and red heart bokeh, soft warm lighting, dreamy love concept, elegant',
            'Christmas': 'snowy winter wonderland, twinkling christmas lights, warm fireplace glow, festive decorations, magical atmosphere',
            'Easter': 'bright spring morning, blooming pastel flowers, green grass, playful, sunny, fresh dew',
            'Halloween': 'spooky dark forest, rolling fog, cobwebs, jack-o-lanterns, eerie green lighting, cinematic horror',
            'New Year': 'explosive fireworks, champagne gold sparkles, celebration, midnight atmosphere, party confetti, luxury',

            // Genres
            'Pop': 'vibrant studio photography, colorful backdrop, high energy, fashion editorial style',
            'Dance Pop': 'nightclub laser show, smoke machine, energetic movement, neon rim lights, party vibe',
            'Rock': 'gritty grunge texture, concert stage smoke, dramatic spotlights, electric energy, raw atmosphere',
            'Country': 'golden hour sunlight, rustic wooden textures, wheat field, acoustic warmth, americana',
            'R&B': 'luxurious silk textures, mood lighting, purple and gold palette, urban night view, smooth atmosphere',
            'Disco': 'sparkling disco ball reflections, 70s retro funk style, colorful dance floor lights, vintage film grain',
            'EDM': 'massive festival stage, futuristic lasers, digital glitch art, high contrast, adrenaline',
            'Trance': 'psychedelic fractals, tunnel of light, ethereal energy, mesmerizing patterns, spiritual atmosphere',
            'Scottish': 'majestic scottish highlands, misty loch, ancient castle ruins, dramatic clouds, cinematic epic',
            'Folk': 'intimate campfire light, deep forest background, natural textures, storytelling atmosphere',
            'Classical': 'grand opera house, baroque architecture, golden details, dramatic shadow and light, oil painting style',
            'Disney': 'pixar 3d animation style, magical dust, vibrant colors, expressive character design, storybook world',
            'Worldbeat': 'rich cultural patterns, earthy tones, global landmarks, tribal textures, diverse atmosphere',
            'Instrumental': 'minimalist abstract art, clean lines, neutral background, focus on form and shape'
        };

        const vibeKeywords = styles[vibe] || `${vibe} style, cinematic, high quality`;

        // 4. Construct Layered Prompt
        // Format: [Camera Angle] of [Subject], [Vibe Keywords], [Quality Modifiers]
        return `${angle} of ${subject}, ${vibeKeywords}, ${QUALITY_MODIFIERS.join(', ')}.`;
    };

    const handleImageUpload = async (sceneId: string, e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (!file) return;

        // Optimistic UI update (preview immediately)
        const previewUrl = URL.createObjectURL(file);
        updateScene(sceneId, { image: previewUrl }); // Show local preview first

        // Upload to S3
        const formData = new FormData();
        formData.append("file", file);

        try {
            const res = await fetch("/api/admin/upload-image", {
                method: "POST",
                body: formData,
            });

            if (!res.ok) throw new Error("Upload failed");

            const data = await res.json();

            // Replace preview URL with permament S3 URL
            updateScene(sceneId, { image: data.url });

        } catch (err) {
            console.error(err);
            alert("Failed to upload image. Please try again.");
            // Revert image if failed (optional, but good UX)
            // updateScene(sceneId, { image: undefined }); 
        }
    };

    const updateScene = (id: string, updates: Partial<Scene>) => {
        const updated = scenes.map(s => s.id === id ? { ...s, ...updates } : s);
        onScenesUpdate(updated);
    };

    return (
        <div style={{ background: '#1a1a1a', padding: '1.5rem', borderRadius: '12px', border: '1px solid #333' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '1.5rem' }}>
                <h3 style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', margin: 0 }}>
                    <Layers size={20} color="#FF0080" />
                    Scene Manager
                </h3>
                <button
                    onClick={generateScenes}
                    style={{ background: '#333', color: 'white', border: 'none', padding: '0.5rem 1rem', borderRadius: '4px', cursor: 'pointer', display: 'flex', gap: '0.5rem', alignItems: 'center', fontSize: '0.9rem' }}
                >
                    <RefreshCw size={14} /> Regenerate Scenes
                </button>
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
                {scenes.map((scene, index) => (
                    <div key={scene.id} style={{ background: '#111', borderRadius: '8px', border: '1px solid #333', overflow: 'hidden' }}>
                        {/* Scene Header */}
                        <div style={{ background: '#222', padding: '0.8rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                            <span style={{ fontWeight: 'bold', fontSize: '0.9rem', color: '#888' }}>
                                Scene {index + 1} ({scene.startTime.toFixed(1)}s - {scene.endTime.toFixed(1)}s)
                            </span>
                            {/* Scene Controls */}
                            <div style={{ display: 'flex', gap: '0.5rem' }}>
                                <select
                                    value={scene.zoomEffect || 'static'}
                                    onChange={(e) => updateScene(scene.id, { zoomEffect: e.target.value as any })}
                                    style={{ background: '#333', color: 'white', border: '1px solid #444', borderRadius: '4px', padding: '2px 4px', fontSize: '0.8rem' }}
                                >
                                    <option value="zoom-in">Zoom In</option>
                                    <option value="zoom-out">Zoom Out</option>
                                    <option value="pan-left">Pan Left</option>
                                    <option value="pan-right">Pan Right</option>
                                    <option value="static">Static</option>
                                </select>
                                <select
                                    value={scene.textAnimation || 'fade'}
                                    onChange={(e) => updateScene(scene.id, { textAnimation: e.target.value as any })}
                                    style={{ background: '#333', color: 'white', border: '1px solid #444', borderRadius: '4px', padding: '2px 4px', fontSize: '0.8rem' }}
                                >
                                    <option value="fade">Fade</option>
                                    <option value="slide">Slide</option>
                                    <option value="typewriter">Typewriter</option>
                                    <option value="kinetic">Kinetic</option>
                                </select>
                                <select
                                    value={scene.visualEffect || 'none'}
                                    onChange={(e) => updateScene(scene.id, { visualEffect: e.target.value as any })}
                                    style={{ background: '#333', color: 'white', border: '1px solid #444', borderRadius: '4px', padding: '2px 4px', fontSize: '0.8rem' }}
                                >
                                    <option value="none">No Effect</option>
                                    <option value="dust">Dust</option>
                                    <option value="grain">Grain</option>
                                    <option value="flash">Flash</option>
                                    <option value="vhs">VHS</option>
                                    <option value="chromatic">Chromatic</option>
                                    <option value="light-leak">Light Leak</option>
                                    <option value="film-damage">Film Damage</option>
                                    <option value="bloom">Bloom</option>
                                    <option value="shake">Shake</option>
                                </select>
                            </div>
                        </div>

                        <div style={{ padding: '1rem', display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                            {/* Top: Lyrics & Prompt */}
                            <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                                <div>
                                    <label style={{ display: 'block', fontSize: '0.8rem', color: '#666', marginBottom: '0.4rem' }}>LYRICS</label>
                                    <div style={{ color: '#ccc', fontStyle: 'italic', fontSize: '0.95rem', padding: '0.5rem', background: '#1a1a1a', borderRadius: '4px' }}>
                                        {scene.lyrics.map((l, i) => <div key={i}>"{l}"</div>)}
                                    </div>
                                </div>

                                <div>
                                    <label style={{ display: 'block', fontSize: '0.8rem', color: '#666', marginBottom: '0.4rem' }}>AI PROMPT ({vibe})</label>
                                    <div style={{ display: 'flex', gap: '0.5rem' }}>
                                        <textarea
                                            value={scene.prompt}
                                            onChange={(e) => updateScene(scene.id, { prompt: e.target.value })}
                                            style={{ flex: 1, background: '#111', color: '#0f0', border: '1px solid #333', borderRadius: '4px', padding: '0.8rem', fontSize: '0.9rem', minHeight: '80px', fontFamily: 'monospace' }}
                                        />
                                        <button
                                            title="Copy Prompt"
                                            onClick={() => navigator.clipboard.writeText(scene.prompt)}
                                            style={{ background: '#333', border: '1px solid #444', color: 'white', width: '50px', borderRadius: '4px', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center' }}
                                        >
                                            <Wand2 size={20} />
                                        </button>
                                    </div>
                                </div>
                            </div>

                            {/* Bottom: Image Upload (Full Width) */}
                            <div>
                                <label style={{ cursor: 'pointer', width: '100%', display: 'flex', alignItems: 'center', gap: '1rem', background: '#1a1a1a', padding: '0.8rem', borderRadius: '6px', border: scene.image ? '1px solid #555' : '2px dashed #444', transition: 'all 0.2s' }}
                                    onMouseEnter={(e) => e.currentTarget.style.borderColor = '#FF0080'}
                                    onMouseLeave={(e) => e.currentTarget.style.borderColor = scene.image ? '#555' : '#444'}
                                >
                                    {/* Preview wrapper */}
                                    <div style={{ width: '80px', height: '80px', background: scene.image ? `url(${scene.image}) center/cover` : '#222', borderRadius: '4px', flexShrink: 0, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                                        {!scene.image && <ImageIcon size={24} color="#555" />}
                                    </div>

                                    {/* Text/Button */}
                                    <div style={{ flex: 1 }}>
                                        <div style={{ fontWeight: 'bold', color: scene.image ? '#fff' : '#888', marginBottom: '0.2rem' }}>
                                            {scene.image ? 'Artwork Uploaded' : 'Upload Scene Artwork'}
                                        </div>
                                        <div style={{ fontSize: '0.8rem', color: '#555' }}>
                                            {scene.image ? 'Click to replace image' : 'Drag & drop or click to browse'}
                                        </div>
                                    </div>

                                    {/* Upload Icon Button */}
                                    <div style={{ background: '#333', padding: '0.6rem', borderRadius: '50%', color: 'white' }}>
                                        <Upload size={18} />
                                    </div>

                                    <input
                                        type="file"
                                        accept="image/*"
                                        onChange={(e) => handleImageUpload(scene.id, e)}
                                        style={{ display: 'none' }}
                                    />
                                </label>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}
