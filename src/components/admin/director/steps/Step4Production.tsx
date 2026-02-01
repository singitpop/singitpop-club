
import React, { useState, useEffect } from 'react';
import { Play, Sparkles, Image as ImageIcon, CheckCircle, BrainCircuit, Key, Film } from 'lucide-react';
import { CharacterProfile } from './Step3Casting'; // Import Type

interface Step4Props {
    scenes: any[];
    aspectRatio?: "16:9" | "9:16";
    onNext: (completedScenes: any[]) => void;
    onBack: () => void;
}

export const Step4Production: React.FC<Step4Props> = ({ scenes, aspectRatio, onNext, onBack }) => {
    const [generating, setGenerating] = useState(false);
    const [progress, setProgress] = useState(0);
    const [localScenes, setLocalScenes] = useState<any[]>([...scenes]);
    const [apiKey, setApiKey] = useState("");
    const [hasKey, setHasKey] = useState(false);

    // Initial Load - Check for key
    useEffect(() => {
        const storedKey = localStorage.getItem('google_api_key');
        if (storedKey) {
            setApiKey(storedKey);
            setHasKey(true);
        }
    }, []);

    const saveKey = () => {
        if (apiKey.trim().length > 10) {
            localStorage.setItem('google_api_key', apiKey);
            setHasKey(true);
        }
    };

    const startProduction = async () => {
        if (!apiKey) return alert("Please enter your Google API Key first.");

        setGenerating(true);
        setProgress(0);

        // REAL Generation Loop (Sequential)
        let completedCount = 0;
        const total = localScenes.length;
        const newScenes = [...localScenes];

        for (let i = 0; i < total; i++) {
            const scene = newScenes[i];

            // Skip if already has image
            if (scene.image && scene.image !== 'generated') {
                completedCount++;
                continue;
            }

            try {
                console.log('🎬 Scene', i + 1, '- Calling API with prompt:', scene.prompt);

                // Call our Proxy Route
                const res = await fetch('/api/admin/generate-video', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({
                        apiKey: apiKey,
                        prompt: scene.prompt,
                        dna: scene.description, // Pass the DNA description
                        style: 'cinematic music video',
                        duration: (scene.endTime - scene.startTime),
                        aspectRatio: aspectRatio || "16:9"
                    })
                });

                const data = await res.json();

                console.log('📡 Scene', i + 1, '- API Response:', data);

                if (data.success) {
                    newScenes[i].image = data.url;
                    newScenes[i].assetType = data.assetType || 'image';
                    newScenes[i].status = 'ready';
                    newScenes[i].apiMessage = data.message;
                    console.log('✅ Scene', i + 1, '- Success:', data.message);
                } else {
                    newScenes[i].error = "Generation Failed";
                    console.error('❌ Scene', i + 1, '- Failed:', data.error);
                }

            } catch (e) {
                console.error("❌ Scene", i + 1, "- Network Error:", e);
                newScenes[i].error = "Network Error";
            }

            completedCount++;
            setProgress(Math.round((completedCount / total) * 100));
            setLocalScenes([...newScenes]); // Force update

            // Rate Limit Buffer (Video Gen is heavy)
            await new Promise(r => setTimeout(r, 1000));
        }

        setGenerating(false);
    };

    return (
        <div style={{ maxWidth: '1000px', margin: '0 auto', color: 'white', height: '100%', display: 'flex', flexDirection: 'column' }}>
            <div style={{ display: 'flex', alignItems: 'center', marginBottom: '1.5rem', flexShrink: 0 }}>
                <button onClick={onBack} style={{ background: 'transparent', border: 'none', color: '#888', cursor: 'pointer', fontSize: '1rem', padding: 0 }}>
                    ← Back
                </button>
                <div style={{ marginLeft: 'auto', textAlign: 'right' }}>
                    <h2 style={{ fontSize: '1.8rem', margin: 0 }}>Step 4: AI Production</h2>
                    <span style={{ color: '#FF0080', fontSize: '0.9rem' }}>
                        {generating ? "Filming on Location... (Virtual)" : `Generating Assets for ${scenes.length} Scenes`}
                    </span>
                </div>
            </div>

            <div style={{ textAlign: 'center', marginBottom: '2rem' }}>

                {/* API Key Input */}
                {!generating && !hasKey && (
                    <div style={{ background: '#111', padding: '1.5rem', borderRadius: '12px', border: '1px solid #333', maxWidth: '500px', margin: '0 auto 1.5rem auto' }}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', justifyContent: 'center', marginBottom: '1rem', color: '#FF0080' }}>
                            <Key size={20} /> <span style={{ fontWeight: 'bold' }}>Google AI Key Required</span>
                        </div>
                        <p style={{ color: '#888', fontSize: '0.9rem', marginBottom: '1rem' }}>
                            To generate real videos/images using your subscription, enter your Google API Key below.
                            <br />
                            <a href="https://aistudio.google.com/app/apikey" target="_blank" rel="noreferrer" style={{ color: '#FF0080', textDecoration: 'underline', marginTop: '0.5rem', display: 'inline-block' }}>
                                Get your key here →
                            </a>
                        </p>
                        <input
                            type="password"
                            placeholder="AIzaSy..."
                            value={apiKey}
                            onChange={(e) => setApiKey(e.target.value)}
                            style={{ width: '100%', padding: '0.8rem', borderRadius: '6px', border: '1px solid #444', background: 'black', color: 'white', marginBottom: '1rem' }}
                        />
                        <button
                            onClick={saveKey}
                            style={{ width: '100%', padding: '0.8rem', background: '#333', color: 'white', border: 'none', borderRadius: '6px', cursor: 'pointer', fontWeight: 'bold' }}
                        >
                            Save Key & Unlock Engine
                        </button>
                    </div>
                )}

                {/* Start Button */}
                {!generating && hasKey && progress !== 100 && (
                    <>
                        <p style={{ fontSize: '1.1rem', color: '#ccc', maxWidth: '600px', margin: '0 auto 1.5rem auto' }}>
                            Ready to film? This will use your stored API Key to generate {scenes.length} video clips.
                        </p>
                        <button
                            onClick={startProduction}
                            style={{
                                padding: '1rem 3rem',
                                background: 'linear-gradient(90deg, #FF0080, #0070f3)',
                                color: 'white',
                                border: 'none',
                                borderRadius: '50px',
                                fontWeight: 'bold',
                                fontSize: '1.2rem',
                                cursor: 'pointer',
                                display: 'inline-flex',
                                alignItems: 'center',
                                gap: '0.8rem',
                                boxShadow: '0 0 30px rgba(255,0,128,0.3)',
                                transition: 'transform 0.2s'
                            }}
                        >
                            <Film size={24} fill="white" /> Start Filming (Beta)
                        </button>
                        <div style={{ marginTop: '1rem' }}>
                            <button onClick={() => setHasKey(false)} style={{ background: 'none', border: 'none', color: '#666', fontSize: '0.8rem', cursor: 'pointer', textDecoration: 'underline' }}>
                                Change API Key
                            </button>
                        </div>
                    </>
                )}

                {/* Progress Bar */}
                {generating && (
                    <div style={{ width: '100%', maxWidth: '500px', margin: '0 auto' }}>
                        <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.5rem', fontSize: '0.9rem', color: '#FF0080' }}>
                            <span>Filming Scenes...</span>
                            <span>{progress}%</span>
                        </div>
                        <div style={{ width: '100%', height: '8px', background: '#333', borderRadius: '4px', overflow: 'hidden' }}>
                            <div style={{ width: `${progress}%`, height: '100%', background: '#FF0080', transition: 'width 0.3s' }} />
                        </div>
                    </div>
                )}
            </div>

            {/* Scene Grid */}
            <div style={{ flex: 1, overflowY: 'auto', display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', gap: '1rem', padding: '1rem', border: '1px solid #333', borderRadius: '8px', background: '#111' }}>
                {localScenes.map((scene, idx) => (
                    <div key={scene.id} style={{ position: 'relative', aspectRatio: '16/9', background: '#000', borderRadius: '8px', overflow: 'hidden', border: '1px solid #222' }}>
                        {scene.image ? (
                            scene.assetType === 'video' ? (
                                <video
                                    src={scene.image}
                                    autoPlay loop muted
                                    style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                                />
                            ) : (
                                <img
                                    src={scene.image === 'generated' ? '/placeholder-gradient.jpg' : scene.image}
                                    style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                                />
                            )
                        ) : (
                            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', height: '100%', color: '#333', flexDirection: 'column', gap: '0.5rem' }}>
                                <ImageIcon size={24} />
                                <span style={{ fontSize: '0.8rem' }}>Awaiting Footage</span>
                            </div>
                        )}

                        {/* Overlay Prompt text only if not generated or if error */}
                        <div style={{ position: 'absolute', bottom: 0, left: 0, right: 0, padding: '0.5rem', background: 'rgba(0,0,0,0.7)' }}>
                            <div style={{ fontSize: '0.7rem', color: '#ddd', overflow: 'hidden', whiteSpace: 'nowrap', textOverflow: 'ellipsis' }}>
                                {scene.prompt}
                            </div>
                        </div>

                        <div style={{ position: 'absolute', top: '5px', left: '5px', background: 'rgba(255, 0, 128, 0.4)', color: 'white', padding: '2px 6px', borderRadius: '4px', fontSize: '0.7rem', fontWeight: 'bold' }}>
                            Scene {idx + 1}
                        </div>
                    </div>
                ))}
            </div>

            {progress === 100 && (
                <div style={{ display: 'flex', justifyContent: 'center', marginTop: '1.5rem' }}>
                    <button
                        onClick={() => onNext(localScenes)}
                        style={{
                            padding: '1rem 3rem',
                            background: '#4ade80',
                            color: 'black',
                            border: 'none',
                            borderRadius: '8px',
                            fontWeight: 'bold',
                            fontSize: '1.2rem',
                            cursor: 'pointer',
                            display: 'flex',
                            alignItems: 'center',
                            gap: '0.5rem'
                        }}
                    >
                        <Play size={20} fill="black" /> Enter Editing Suite
                    </button>
                </div>
            )}
        </div>
    );
};
