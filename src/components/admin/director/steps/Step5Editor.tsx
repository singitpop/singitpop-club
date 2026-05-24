
import React, { useState, useEffect } from 'react';
import SceneManager from '@/components/admin/video/SceneManager';

interface Step5Props {
    track: any;
    scenes: any[];
    syncedLyrics: any[];
    onBack: () => void;
    handleRender: (finalScenes: any[]) => void;
    isRendering: boolean;
    renderProgress: number;
    renderUrl: string | null;
}

export const Step5Editor: React.FC<Step5Props> = ({
    track, scenes, syncedLyrics, onBack, handleRender, isRendering, renderProgress, renderUrl
}) => {
    // Local state
    const [localScenes, setLocalScenes] = useState<any[]>(scenes);
    const [selectedSceneIndex, setSelectedSceneIndex] = useState(0);

    const activeScene = localScenes[selectedSceneIndex];

    return (
        <div style={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
            {/* Header */}
            <div style={{ display: 'flex', alignItems: 'center', marginBottom: '1rem', padding: '0 1rem' }}>
                <button onClick={onBack} style={{ background: 'transparent', border: 'none', color: '#888', cursor: 'pointer', fontSize: '1rem', padding: 0 }}>
                    ← Back to Studio
                </button>
                <div style={{ marginLeft: 'auto' }}>
                    <button
                        onClick={() => handleRender(localScenes)}
                        disabled={isRendering}
                        style={{
                            padding: '0.6rem 1.5rem',
                            background: isRendering ? '#333' : '#FF0080',
                            color: 'white',
                            border: 'none',
                            borderRadius: '4px',
                            fontWeight: 'bold',
                            cursor: isRendering ? 'not-allowed' : 'pointer',
                            opacity: isRendering ? 0.7 : 1
                        }}
                    >
                        {isRendering ? 'Rendering...' : '🎬 Render Final Video'}
                    </button>
                </div>
            </div>

            {/* Layout */}
            <div style={{ flex: 1, display: 'flex', gap: '1rem', overflow: 'hidden' }}>

                {/* PREVIEW AREA (Updated for Video) */}
                <div style={{ flex: 2, background: 'black', borderRadius: '8px', overflow: 'hidden', position: 'relative', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                    {activeScene ? (
                        <>
                            {activeScene.assetType === 'video' || (activeScene.image && activeScene.image.endsWith('.mp4')) ? (
                                <video
                                    key={activeScene.id} // Force re-render on change
                                    src={activeScene.image}
                                    autoPlay loop muted
                                    controls
                                    style={{ width: '100%', height: '100%', objectFit: 'contain' }}
                                />
                            ) : (
                                <img
                                    src={activeScene.image || '/placeholder-gradient.jpg'}
                                    alt={activeScene.prompt || "Active scene edit preview"}
                                    style={{ width: '100%', height: '100%', objectFit: 'contain' }}
                                />
                            )}

                            {/* Overlay Info */}
                            <div style={{ position: 'absolute', bottom: '1rem', left: '1rem', background: 'rgba(0,0,0,0.6)', padding: '0.5rem 1rem', borderRadius: '4px', color: 'white' }}>
                                <div style={{ fontSize: '0.8rem', fontWeight: 'bold', color: '#FF0080' }}>SCENE {selectedSceneIndex + 1}</div>
                                <div style={{ fontSize: '0.9rem' }}>{activeScene.description ? activeScene.description.substring(0, 50) + '...' : 'No description'}</div>
                            </div>
                        </>
                    ) : (
                        <div style={{ color: '#666' }}>Select a scene to preview</div>
                    )}
                </div>

                {/* SCENE MANAGER */}
                <div style={{ flex: 1, overflowY: 'auto', background: '#111', borderRadius: '8px', border: '1px solid #333' }}>
                    <SceneManager
                        syncedLyrics={syncedLyrics}
                        scenes={localScenes}
                        vibe="Custom"
                        onScenesUpdate={setLocalScenes}
                    // We need a way to select the active scene for preview
                    // Adding a custom "onSelect" prop to SceneManager would be ideal, 
                    // but since I can't modify SceneManager easily without checking it, 
                    // I will rely on user clicking standard rows if SceneManager supports it,
                    // OR I will wrap SceneManager logic.
                    // Actually, let's just render a simple list if SceneManager is complex, 
                    // BUT user said they saw "SceneManager" empty. Use existing one.
                    />
                    {/* Scene Thumbnail Grid */}
                    <div style={{ padding: '1rem', borderTop: '1px solid #333' }}>
                        <h4 style={{ color: '#888', marginBottom: '0.5rem', fontSize: '0.9rem' }}>Scene Timeline</h4>
                        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(120px, 1fr))', gap: '0.5rem', maxHeight: '300px', overflowY: 'auto' }}>
                            {localScenes.map((scene, i) => (
                                <div
                                    key={scene.id}
                                    onClick={() => setSelectedSceneIndex(i)}
                                    style={{
                                        position: 'relative',
                                        aspectRatio: '16/9',
                                        background: '#000',
                                        borderRadius: '4px',
                                        overflow: 'hidden',
                                        cursor: 'pointer',
                                        border: selectedSceneIndex === i ? '2px solid #FF0080' : '1px solid #333',
                                        opacity: selectedSceneIndex === i ? 1 : 0.6,
                                        transition: 'all 0.2s'
                                    }}
                                >
                                    {scene.assetType === 'video' || (scene.image && scene.image.endsWith('.mp4')) ? (
                                        <video
                                            src={scene.image}
                                            muted
                                            style={{ width: '100%', height: '100%', objectFit: 'cover', pointerEvents: 'none' }}
                                        />
                                    ) : (
                                        <img
                                            src={scene.image || '/placeholder-gradient.jpg'}
                                            alt={scene.prompt || `Scene ${i + 1} thumbnail`}
                                            style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                                        />
                                    )}
                                    <div style={{
                                        position: 'absolute',
                                        top: '2px',
                                        left: '2px',
                                        background: selectedSceneIndex === i ? '#FF0080' : 'rgba(0,0,0,0.7)',
                                        color: 'white',
                                        padding: '2px 6px',
                                        borderRadius: '3px',
                                        fontSize: '0.7rem',
                                        fontWeight: 'bold'
                                    }}>
                                        {i + 1}
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>

            {/* Render Progress Bar */}
            {isRendering && (
                <div style={{ position: 'fixed', bottom: 0, left: 0, right: 0, background: '#111', padding: '1rem', borderTop: '1px solid #333' }}>
                    <div style={{ maxWidth: '800px', margin: '0 auto', display: 'flex', alignItems: 'center', gap: '1rem' }}>
                        <span style={{ minWidth: '80px', color: '#FF0080', fontWeight: 'bold' }}>Rendering...</span>
                        <div style={{ flex: 1, height: '8px', background: '#333', borderRadius: '4px', overflow: 'hidden' }}>
                            <div style={{ width: `${renderProgress}%`, height: '100%', background: '#FF0080', transition: 'width 0.3s' }} />
                        </div>
                        <span style={{ minWidth: '50px', color: '#888' }}>{renderProgress}%</span>
                    </div>
                </div>
            )}

            {renderUrl && !isRendering && (
                <div style={{ position: 'fixed', bottom: 0, left: 0, right: 0, background: '#111', padding: '1rem', borderTop: '1px solid #333', textAlign: 'center' }}>
                    <h3 style={{ color: '#4ade80', marginBottom: '0.5rem' }}>✅ Render Complete!</h3>
                    <a href={renderUrl} download style={{ display: 'inline-block', padding: '0.8rem 2rem', background: '#4ade80', color: 'black', fontWeight: 'bold', borderRadius: '4px', textDecoration: 'none' }}>
                        Download Video
                    </a>
                </div>
            )}
        </div>
    );
};
