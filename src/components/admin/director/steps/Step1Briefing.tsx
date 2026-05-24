
import React, { useState } from 'react';
import { Search, Music, Sparkles } from 'lucide-react';

interface Step1Props {
    onNext: (data: { track: any; prompt: string; aspectRatio?: "16:9" | "9:16" }) => void;
    tracks: any[];
}

export const Step1Briefing: React.FC<Step1Props> = ({ onNext, tracks }) => {
    const [selectedTrack, setSelectedTrack] = useState<any>(null);
    const [prompt, setPrompt] = useState("");
    const [searchQuery, setSearchQuery] = useState("");
    const [aspectRatio, setAspectRatio] = useState<"16:9" | "9:16">("16:9");

    const filteredTracks = tracks.filter(t =>
        t.title.toLowerCase().includes(searchQuery) ||
        t.albumTitle?.toLowerCase().includes(searchQuery)
    );

    return (
        <div style={{ maxWidth: '800px', margin: '0 auto', color: 'white' }}>
            <h2 style={{ fontSize: '2rem', marginBottom: '0.5rem', textAlign: 'center' }}>Step 1: The Briefing</h2>
            <p style={{ textAlign: 'center', color: '#888', marginBottom: '2rem' }}>
                Select a track and tell the Director what this video is about.
            </p>

            {/* Track Selection */}
            <div style={{ marginBottom: '2rem' }}>
                <h3 style={{ fontSize: '1.2rem', marginBottom: '1rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                    <Music size={20} color="#FF0080" /> Select Track
                </h3>

                {/* Search */}
                <div style={{ position: 'relative', marginBottom: '1rem' }}>
                    <Search style={{ position: 'absolute', left: '1rem', top: '50%', transform: 'translateY(-50%)', color: '#666' }} size={18} />
                    <input
                        type="text"
                        placeholder="Search your discography..."
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value.toLowerCase())}
                        style={{
                            width: '100%',
                            padding: '1rem 1rem 1rem 3rem',
                            background: '#111',
                            border: '1px solid #333',
                            borderRadius: '8px',
                            color: 'white',
                            fontSize: '1rem'
                        }}
                    />
                </div>

                {/* List */}
                <div style={{ maxHeight: '300px', overflowY: 'auto', border: '1px solid #222', borderRadius: '8px' }}>
                    {filteredTracks.map(track => (
                        <div
                            key={track.uniqueKey || track.id}
                            onClick={() => setSelectedTrack(track)}
                            style={{
                                display: 'flex',
                                alignItems: 'center',
                                gap: '1rem',
                                padding: '1rem',
                                background: selectedTrack?.id === track.id ? 'rgba(255, 0, 128, 0.2)' : 'transparent',
                                borderBottom: '1px solid #222',
                                cursor: 'pointer',
                                transition: 'background 0.2s'
                            }}
                        >
                            <img
                                src={track.albumCover || "/Club_Gateway_Pop.png"}
                                alt={track.title}
                                style={{ width: '50px', height: '50px', borderRadius: '4px', objectFit: 'cover' }}
                            />
                            <div>
                                <div style={{ fontWeight: 'bold' }}>{track.title}</div>
                                <div style={{ color: '#666', fontSize: '0.9rem' }}>{track.albumTitle || 'Unknown Album'}</div>
                            </div>
                            {selectedTrack?.id === track.id && (
                                <div style={{ marginLeft: 'auto', color: '#FF0080', fontWeight: 'bold' }}>Selected</div>
                            )}
                        </div>
                    ))}
                </div>
            </div>

            {/* Prompt Input */}
            <div style={{ marginBottom: '2rem', opacity: selectedTrack ? 1 : 0.5, pointerEvents: selectedTrack ? 'auto' : 'none' }}>
                <h3 style={{ fontSize: '1.2rem', marginBottom: '1rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                    <Sparkles size={20} color="#0070f3" /> Director's Brief
                </h3>
                <textarea
                    placeholder="Describe the vibe, story, or visual theme. E.g., 'A neon detective story in rain' or 'Abstract geometric shapes dancing to the beat'"
                    value={prompt}
                    onChange={(e) => setPrompt(e.target.value)}
                    style={{
                        width: '100%',
                        height: '120px',
                        padding: '1rem',
                        background: '#111',
                        border: '1px solid #333',
                        borderRadius: '8px',
                        color: 'white',
                        fontSize: '1rem',
                        resize: 'none'
                    }}
                />
            </div>

            {/* Aspect Ratio Selection */}
            <div style={{ marginBottom: '2rem', opacity: selectedTrack ? 1 : 0.5, pointerEvents: selectedTrack ? 'auto' : 'none' }}>
                <h3 style={{ fontSize: '1.2rem', marginBottom: '1rem' }}>Video Format</h3>
                <div style={{ display: 'flex', gap: '1rem' }}>
                    <button
                        onClick={() => setAspectRatio("16:9")}
                        style={{
                            flex: 1,
                            padding: '1rem',
                            background: aspectRatio === "16:9" ? 'rgba(255, 0, 128, 0.2)' : '#111',
                            border: aspectRatio === "16:9" ? '2px solid #FF0080' : '1px solid #333',
                            borderRadius: '8px',
                            color: 'white',
                            cursor: 'pointer',
                            transition: 'all 0.2s'
                        }}
                    >
                        <div style={{ fontSize: '1.5rem', marginBottom: '0.5rem' }}>📺</div>
                        <div style={{ fontWeight: 'bold' }}>16:9 Landscape</div>
                        <div style={{ fontSize: '0.8rem', color: '#888' }}>YouTube, Vimeo</div>
                    </button>
                    <button
                        onClick={() => setAspectRatio("9:16")}
                        style={{
                            flex: 1,
                            padding: '1rem',
                            background: aspectRatio === "9:16" ? 'rgba(255, 0, 128, 0.2)' : '#111',
                            border: aspectRatio === "9:16" ? '2px solid #FF0080' : '1px solid #333',
                            borderRadius: '8px',
                            color: 'white',
                            cursor: 'pointer',
                            transition: 'all 0.2s'
                        }}
                    >
                        <div style={{ fontSize: '1.5rem', marginBottom: '0.5rem' }}>📱</div>
                        <div style={{ fontWeight: 'bold' }}>9:16 Portrait</div>
                        <div style={{ fontSize: '0.8rem', color: '#888' }}>TikTok, Reels, Shorts</div>
                    </button>
                </div>
            </div>

            {/* Navigation */}
            <button
                onClick={() => onNext({ track: selectedTrack, prompt, aspectRatio })}
                disabled={!selectedTrack || !prompt}
                style={{
                    width: '100%',
                    padding: '1rem',
                    background: (!selectedTrack || !prompt) ? '#333' : 'linear-gradient(90deg, #FF0080, #7928CA)',
                    color: 'white',
                    border: 'none',
                    borderRadius: '8px',
                    fontSize: '1.2rem',
                    fontWeight: 'bold',
                    cursor: (!selectedTrack || !prompt) ? 'not-allowed' : 'pointer',
                    opacity: (!selectedTrack || !prompt) ? 0.7 : 1
                }}
            >
                Generate Concepts →
            </button>
        </div>
    );
};
