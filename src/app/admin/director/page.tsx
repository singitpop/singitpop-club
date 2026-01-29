'use client';

import { useState } from 'react';
import { albums } from '@/data/albumData';
import { Search, Music, Image as ImageIcon, Video, Youtube, Type, Play } from 'lucide-react';
import { Player } from '@remotion/player';
import { LyricVideo } from '../../../video/compositions/LyricVideo';
import { Thumbnail } from '../../../video/compositions/Thumbnail';

export default function DirectorPage() {
    const [selectedTrack, setSelectedTrack] = useState<any>(null);
    const [mode, setMode] = useState<'video' | 'thumbnail'>('video');
    const [aspectRatio, setAspectRatio] = useState<'16:9' | '9:16'>('16:9');

    const [isRendering, setIsRendering] = useState(false);
    const [renderUrl, setRenderUrl] = useState<string | null>(null);

    const handleRender = async () => {
        if (!selectedTrack) return;
        setIsRendering(true);
        setRenderUrl(null);

        const compositionId = mode === 'thumbnail' ? 'Thumbnail' : (aspectRatio === '16:9' ? 'LyricVideo169' : 'LyricVideo916');
        const outName = `${selectedTrack.title}_${mode}_${Date.now()}`;

        try {
            const res = await fetch('/api/admin/render', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    compositionId,
                    outName,
                    props: {
                        title: selectedTrack.title,
                        artist: "SingIt Pop",
                        coverImg: selectedTrack.albumCover || "/Club_Gateway_Pop.png",
                        lyrics: "Lyrics would go here..." // Future: Connect to real lyrics
                    }
                })
            });
            const data = await res.json();
            if (data.success) {
                setRenderUrl(data.path);
            } else {
                alert("Render failed: " + data.error);
            }
        } catch (e) {
            console.error(e);
            alert("Render failed");
        } finally {
            setIsRendering(false);
        }
    };

    // Flatten tracks for search
    const allTracks = albums.flatMap(a => a.tracks.map(t => ({
        ...t,
        albumTitle: a.title,
        albumCover: a.coverArt
    })));

    return (
        <div style={{ padding: '2rem', color: 'white', maxWidth: '1600px', margin: '0 auto' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2rem' }}>
                <div>
                    <h1 style={{ fontSize: '2.5rem', fontWeight: 'bold', display: 'flex', alignItems: 'center', gap: '1rem' }}>
                        <Video size={40} color="#FF0080" />
                        Director Mode
                    </h1>
                    <p style={{ color: '#aaa' }}>Create Official Lyric Videos & Thumbnails</p>
                </div>

                <div style={{ display: 'flex', gap: '1rem' }}>
                    <button
                        onClick={() => setMode('video')}
                        style={{
                            padding: '1rem 2rem',
                            background: mode === 'video' ? '#FF0080' : '#222',
                            border: 'none',
                            borderRadius: '8px',
                            fontWeight: 'bold',
                            color: 'white',
                            display: 'flex',
                            alignItems: 'center',
                            gap: '0.5rem',
                            cursor: 'pointer'
                        }}
                    >
                        <Youtube size={20} /> Video Engine
                    </button>
                    <button
                        onClick={() => setMode('thumbnail')}
                        style={{
                            padding: '1rem 2rem',
                            background: mode === 'thumbnail' ? '#0070f3' : '#222',
                            border: 'none',
                            borderRadius: '8px',
                            fontWeight: 'bold',
                            color: 'white',
                            display: 'flex',
                            alignItems: 'center',
                            gap: '0.5rem',
                            cursor: 'pointer'
                        }}
                    >
                        <ImageIcon size={20} /> Thumbnail Creator
                    </button>
                </div>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: '350px 1fr', gap: '2rem' }}>
                {/* Left Panel: Configuration */}
                <div style={{ background: '#111', padding: '1.5rem', borderRadius: '12px', height: 'fit-content' }}>
                    <h3 style={{ marginBottom: '1rem', color: '#888', textTransform: 'uppercase', fontSize: '0.8rem', letterSpacing: '1px' }}>1. Select Track</h3>

                    <div style={{ position: 'relative', marginBottom: '2rem' }}>
                        <Search style={{ position: 'absolute', left: '1rem', top: '50%', transform: 'translateY(-50%)', color: '#666' }} size={16} />
                        <input
                            type="text"
                            placeholder="Search tracks..."
                            onChange={(e) => {
                                const val = e.target.value.toLowerCase();
                                if (!val) return;
                                const found = allTracks.find(t => t.title.toLowerCase().includes(val));
                                if (found) setSelectedTrack(found);
                            }}
                            style={{
                                width: '100%',
                                padding: '1rem 1rem 1rem 3rem',
                                background: '#222',
                                border: '1px solid #333',
                                borderRadius: '8px',
                                color: 'white',
                                fontSize: '1rem'
                            }}
                        />
                        {selectedTrack && (
                            <div style={{ marginTop: '1rem', padding: '1rem', background: '#222', borderRadius: '8px', display: 'flex', alignItems: 'center', gap: '1rem' }}>
                                <img src={selectedTrack.albumCover} style={{ width: '50px', height: '50px', borderRadius: '4px' }} />
                                <div>
                                    <div style={{ fontWeight: 'bold' }}>{selectedTrack.title}</div>
                                    <div style={{ fontSize: '0.8rem', color: '#aaa' }}>{selectedTrack.albumTitle}</div>
                                </div>
                            </div>
                        )}
                    </div>

                    <h3 style={{ marginBottom: '1rem', color: '#888', textTransform: 'uppercase', fontSize: '0.8rem', letterSpacing: '1px' }}>2. Visual Assets</h3>

                    <div style={{ marginBottom: '2rem' }}>
                        <label style={{ display: 'block', marginBottom: '0.5rem' }}>Visual Vibe</label>
                        <div style={{ display: 'flex', gap: '0.5rem', marginBottom: '1rem' }}>
                            <button style={{ padding: '0.5rem', background: '#333', border: '1px solid #444', color: 'white', borderRadius: '4px', cursor: 'pointer' }}>Cyberpunk</button>
                            <button style={{ padding: '0.5rem', background: '#333', border: '1px solid #444', color: 'white', borderRadius: '4px', cursor: 'pointer' }}>Neon</button>
                            <button style={{ padding: '0.5rem', background: '#333', border: '1px solid #444', color: 'white', borderRadius: '4px', cursor: 'pointer' }}>Retro</button>
                        </div>

                        <div style={{ background: '#222', padding: '1rem', borderRadius: '8px', border: '1px solid #333' }}>
                            <p style={{ fontSize: '0.9rem', color: '#aaa', marginBottom: '0.5rem' }}>AI Prompt (Copy & Ask Agent to Generate):</p>
                            <textarea
                                readOnly
                                style={{ width: '100%', background: '#111', color: '#0f0', border: 'none', padding: '0.5rem', height: '60px', fontFamily: 'monospace' }}
                                value="A futuristic neon city with pulsing audio waves, dark cyberpunk atmosphere, cinematic lighting, 4k render."
                            />
                            <button style={{ marginTop: '0.5rem', width: '100%', background: '#444', color: 'white', border: 'none', padding: '0.5rem', cursor: 'pointer' }}>Copy Prompt</button>
                        </div>

                        <label style={{ display: 'block', marginTop: '1.5rem', marginBottom: '0.5rem' }}>Background Image/Video</label>
                        <div style={{ border: '2px dashed #444', borderRadius: '8px', padding: '2rem', textAlign: 'center', color: '#666' }}>
                            <p style={{ marginBottom: '0.5rem' }}>Drag & Drop from Canva/Affinity</p>
                            <p style={{ fontSize: '0.8rem' }}>1920x1080 (Landscape) or 1080x1920 (Portrait)</p>
                            <button style={{ marginTop: '1rem', background: '#333', color: 'white', padding: '0.5rem 1rem', borderRadius: '4px', border: 'none', cursor: 'pointer' }}>Browse Files</button>
                        </div>
                    </div>

                    <h3 style={{ marginBottom: '1rem', color: '#888', textTransform: 'uppercase', fontSize: '0.8rem', letterSpacing: '1px' }}>3. Format</h3>
                    <div style={{ display: 'flex', gap: '1rem', marginBottom: '2rem' }}>
                        <button
                            onClick={() => setAspectRatio('16:9')}
                            style={{
                                flex: 1,
                                padding: '1rem',
                                background: aspectRatio === '16:9' ? '#333' : '#1a1a1a',
                                border: aspectRatio === '16:9' ? '1px solid white' : '1px solid #333',
                                borderRadius: '8px',
                                cursor: 'pointer',
                                color: 'white'
                            }}
                        >
                            16:9 (YouTube)
                        </button>
                        <button
                            onClick={() => setAspectRatio('9:16')}
                            style={{
                                flex: 1,
                                padding: '1rem',
                                background: aspectRatio === '9:16' ? '#333' : '#1a1a1a',
                                border: aspectRatio === '9:16' ? '1px solid white' : '1px solid #333',
                                borderRadius: '8px',
                                cursor: 'pointer',
                                color: 'white'
                            }}
                        >
                            9:16 (TikTok)
                        </button>
                    </div>
                </div>

                {/* Right Panel: Preview Area */}
                <div style={{ background: '#000', borderRadius: '12px', overflow: 'hidden', display: 'flex', alignItems: 'center', justifyContent: 'center', border: '1px solid #222', minHeight: '600px' }}>
                    {selectedTrack ? (
                        mode === 'video' ? (
                            <Player
                                component={LyricVideo}
                                durationInFrames={300 * 30}
                                compositionWidth={aspectRatio === '16:9' ? 1920 : 1080}
                                compositionHeight={aspectRatio === '16:9' ? 1080 : 1920}
                                fps={30}
                                style={{
                                    width: '100%',
                                    height: 'auto',
                                    maxWidth: '100%',
                                    maxHeight: '600px'
                                }}
                                inputProps={{
                                    title: selectedTrack.title,
                                    artist: "SingIt Pop", // Could draw from track if available
                                    coverImg: selectedTrack.albumCover || "/Club_Gateway_Pop.png",
                                    lyrics: "Lyrics will appear here..."
                                }}
                                controls
                            />
                        ) : (
                            <Player
                                component={Thumbnail}
                                durationInFrames={1}
                                compositionWidth={1280}
                                compositionHeight={720}
                                fps={30}
                                style={{
                                    width: '100%',
                                    height: 'auto',
                                    maxWidth: '100%'
                                }}
                                inputProps={{
                                    title: selectedTrack.title,
                                    artist: "SingIt Pop",
                                    coverImg: selectedTrack.albumCover || "/Club_Gateway_Pop.png"
                                }}
                                controls={false} // Static image
                            />
                        )
                    ) : (
                        <div style={{ textAlign: 'center', color: '#444' }}>
                            <Video size={64} style={{ marginBottom: '1rem' }} />
                            <p>Select a track to initialize the Engine</p>
                        </div>
                    )}
                </div>

                {/* Render Controls */}
                <div style={{ gridColumn: '1 / -1', background: '#111', padding: '1.5rem', borderRadius: '12px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <div>
                        <h3 style={{ margin: 0 }}>Render Output</h3>
                        <p style={{ color: '#666', fontSize: '0.9rem' }}>Generate the final {mode === 'video' ? 'MP4 video' : 'PNG thumbnail'} locally.</p>
                    </div>
                    <div style={{ display: 'flex', gap: '1rem', alignItems: 'center' }}>
                        {renderUrl && (
                            <a href={renderUrl} download style={{ color: '#4ade80', fontWeight: 'bold', textDecoration: 'none', marginRight: '1rem' }}>
                                ✅ Download Ready
                            </a>
                        )}
                        <button
                            onClick={handleRender}
                            disabled={!selectedTrack || isRendering}
                            style={{
                                padding: '1rem 3rem',
                                background: isRendering ? '#444' : '#FF0080',
                                color: 'white',
                                border: 'none',
                                borderRadius: '8px',
                                fontWeight: 'bold',
                                fontSize: '1.1rem',
                                cursor: isRendering ? 'not-allowed' : 'pointer',
                                opacity: !selectedTrack ? 0.5 : 1
                            }}
                        >
                            {isRendering ? 'Rendering...' : (mode === 'video' ? 'Render Video' : 'Generate Thumbnail')}
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}
