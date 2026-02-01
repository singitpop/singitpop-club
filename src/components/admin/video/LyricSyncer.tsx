"use client";

import { useState, useRef, useEffect } from 'react';
import { Play, Pause, RotateCcw, Check, Music } from 'lucide-react';
import Waveform from './Waveform';

interface LyricLine {
    text: string;
    timestamp: number; // Seconds
}

interface LyricSyncerProps {
    audioUrl: string;
    rawLyrics: string;
    onSyncComplete: (syncedLyrics: LyricLine[]) => void;
}

export default function LyricSyncer({ audioUrl, rawLyrics, onSyncComplete }: LyricSyncerProps) {
    const [lines, setLines] = useState<string[]>([]);
    const [currentIndex, setCurrentIndex] = useState(0);
    const [syncedData, setSyncedData] = useState<LyricLine[]>([]);
    const [isPlaying, setIsPlaying] = useState(false);
    const [currentTime, setCurrentTime] = useState(0);
    const [playbackRate, setPlaybackRate] = useState(1);

    const audioRef = useRef<HTMLAudioElement | null>(null);

    // Initial Split
    useEffect(() => {
        if (rawLyrics) {
            setLines(rawLyrics.split('\n').filter(l => l.trim() !== ''));
        }
    }, [rawLyrics]);

    // Keyboard Handler (Spacebar + Backspace)
    useEffect(() => {
        const handleKeyDown = (e: KeyboardEvent) => {
            if (e.code === 'Space' && isPlaying) {
                e.preventDefault();
                recordTimestamp();
            }
            // Undo / Rewind
            if (e.code === 'Backspace' && currentIndex > 0) {
                e.preventDefault();
                undoLastSync();
            }
        };
        window.addEventListener('keydown', handleKeyDown);
        return () => window.removeEventListener('keydown', handleKeyDown);
    }, [isPlaying, currentIndex, lines]);

    const undoLastSync = () => {
        // 1. Remove last sync entry
        setSyncedData(prev => {
            const newData = prev.slice(0, -1);

            // 3. Smart Rewind Logic
            // We want to rewind to the timestamp of the PREVIOUS line (i.e. the one before the one we just undid)
            // So we can hear the cue again.
            // If we just undid index 5, we are now at index 5. We want to hear the cue for index 5.
            // The cue for index 5 usually happens right after index 4 finishes.
            // So let's jump to index 4's timestamp minus a cushion.

            const prevIndex = newData.length - 1;
            let targetTime = 0;

            if (prevIndex >= 0) {
                targetTime = Math.max(0, newData[prevIndex].timestamp - 2);
            }

            if (audioRef.current) {
                audioRef.current.currentTime = targetTime;
                // audioRef.current.play(); // Optional: assure it keeps playing
            }

            return newData;
        });

        // 2. Move index back
        setCurrentIndex(prev => Math.max(0, prev - 1));
    };

    const recordTimestamp = () => {
        if (getCurrentTime() === 0) return;
        if (currentIndex >= lines.length) return;

        const timestamp = getCurrentTime();

        const newLine = { text: lines[currentIndex], timestamp };
        setSyncedData(prev => [...prev, newLine]);

        setCurrentIndex(prev => prev + 1);
    };

    const getCurrentTime = () => audioRef.current?.currentTime || 0;

    // Apply speed changes
    useEffect(() => {
        if (audioRef.current) {
            audioRef.current.playbackRate = playbackRate;
        }
    }, [playbackRate]);

    const togglePlay = () => {
        if (!audioRef.current) return;
        if (isPlaying) {
            audioRef.current.pause();
        } else {
            audioRef.current.play();
        }
        setIsPlaying(!isPlaying);
    };

    const reset = () => {
        if (audioRef.current) {
            audioRef.current.pause();
            audioRef.current.currentTime = 0;
        }
        setIsPlaying(false);
        setCurrentIndex(0);
        setSyncedData([]);
        setCurrentTime(0);
    };

    // Update time for UI
    const handleTimeUpdate = () => {
        setCurrentTime(audioRef.current?.currentTime || 0);
    };

    const seekAudio = (time: number) => {
        if (audioRef.current) {
            audioRef.current.currentTime = time;
            setCurrentTime(time);
        }
    };

    return (
        <div style={{ background: '#1a1a1a', padding: '1.5rem', borderRadius: '12px', border: '1px solid #333' }}>
            <h3 style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '1rem' }}>
                <Music size={20} color="#FF0080" />
                Tap-to-Sync Engine
            </h3>

            {/* Waveform Visualization */}
            <Waveform
                audioUrl={audioUrl}
                currentTime={currentTime}
                duration={audioRef.current?.duration || 0}
                onSeek={seekAudio}
            />

            <div style={{ marginBottom: '1.5rem', textAlign: 'center' }}>
                <div style={{ fontSize: '2rem', fontWeight: 'bold', fontFamily: 'monospace', color: '#00E5FF' }}>
                    {currentTime.toFixed(2)}s
                </div>
                <p style={{ color: '#666', fontSize: '0.9rem' }}>Press SPACEBAR to sync line</p>
            </div>

            {/* Current Line Display */}
            <div style={{
                height: '120px',
                background: '#000',
                borderRadius: '8px',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
                padding: '1rem',
                marginBottom: '1.5rem',
                border: '1px solid #333'
            }}>
                <p style={{ color: '#444', fontSize: '1rem', marginBottom: '0.5rem' }}>
                    {currentIndex > 0 ? lines[currentIndex - 1] : "..."}
                </p>
                <p style={{ color: 'white', fontSize: '1.5rem', fontWeight: 'bold', textAlign: 'center', animation: isPlaying ? 'pulse 2s infinite' : 'none' }}>
                    {currentIndex < lines.length ? lines[currentIndex] : "✅ Sync Complete!"}
                </p>
                <p style={{ color: '#444', fontSize: '1rem', marginTop: '0.5rem' }}>
                    {currentIndex + 1 < lines.length ? lines[currentIndex + 1] : "..."}
                </p>
            </div>

            {/* Controls */}
            <div style={{ display: 'flex', gap: '1rem', marginBottom: '1.5rem' }}>
                <button
                    onClick={togglePlay}
                    style={{
                        flex: 2,
                        background: isPlaying ? '#444' : '#FF0080',
                        color: 'white',
                        border: 'none',
                        padding: '1rem',
                        borderRadius: '8px',
                        fontWeight: 'bold',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        gap: '0.5rem',
                        cursor: 'pointer'
                    }}
                >
                    {isPlaying ? <Pause size={20} /> : <Play size={20} />}
                    {isPlaying ? "Pause Syncing" : "Start Syncing"}
                </button>

                {/* Speed Controls */}
                <div style={{ display: 'flex', background: '#333', borderRadius: '8px', overflow: 'hidden' }}>
                    {[0.5, 0.75, 1].map(rate => (
                        <button
                            key={rate}
                            onClick={() => setPlaybackRate(rate)}
                            style={{
                                padding: '0 1rem',
                                background: playbackRate === rate ? '#00E5FF' : 'transparent',
                                color: playbackRate === rate ? 'black' : 'white',
                                border: 'none',
                                cursor: 'pointer',
                                fontWeight: 'bold'
                            }}
                        >
                            {rate}x
                        </button>
                    ))}
                </div>

                <button
                    onClick={reset}
                    style={{ flex: 1, background: '#333', color: 'white', border: 'none', padding: '1rem', borderRadius: '8px', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.5rem' }}
                >
                    <RotateCcw size={20} /> Reset
                </button>
            </div>

            <div style={{ textAlign: 'center', marginBottom: '1rem', color: '#666', fontSize: '0.8rem' }}>
                <kbd style={{ background: '#333', padding: '0.2rem 0.5rem', borderRadius: '4px', color: 'white' }}>SPACE</kbd> = Mark Line &nbsp;|&nbsp;
                <kbd style={{ background: '#333', padding: '0.2rem 0.5rem', borderRadius: '4px', color: 'white' }}>BACKSPACE</kbd> = Undo & Rewind
            </div>

            {/* Result Area */}
            {syncedData.length > 0 && (
                <div style={{ background: '#111', padding: '1rem', borderRadius: '8px', maxHeight: '200px', overflowY: 'auto' }}>
                    {syncedData.map((l, i) => (
                        <div key={i} style={{ display: 'flex', justifyContent: 'space-between', borderBottom: '1px solid #222', padding: '0.5rem 0', fontSize: '0.9rem', alignItems: 'center' }}>
                            <span style={{ color: '#ccc', flex: 1 }}>{l.text}</span>
                            <input
                                type="number"
                                step="0.1"
                                value={l.timestamp}
                                onChange={(e) => {
                                    const val = parseFloat(e.target.value);
                                    if (!isNaN(val)) {
                                        const newData = [...syncedData];
                                        newData[i].timestamp = val;
                                        setSyncedData(newData);
                                    }
                                }}
                                style={{
                                    background: '#222',
                                    border: '1px solid #333',
                                    color: '#00E5FF',
                                    width: '80px',
                                    padding: '0.2rem',
                                    borderRadius: '4px',
                                    textAlign: 'right'
                                }}
                            />
                            <span style={{ marginLeft: '0.5rem', color: '#666', fontSize: '0.8rem' }}>s</span>
                        </div>
                    ))}
                </div>
            )}

            <audio
                ref={audioRef}
                src={`/api/proxy-audio?url=${encodeURIComponent(audioUrl)}`}
                onTimeUpdate={handleTimeUpdate}
                onEnded={() => setIsPlaying(false)}
                style={{ display: 'none' }}
                onError={(e) => console.error("Audio Playback Error", e)}
            />

            {syncedData.length === lines.length && lines.length > 0 && (
                <button
                    onClick={() => onSyncComplete(syncedData)}
                    style={{ marginTop: '1rem', width: '100%', background: '#4ade80', color: 'black', fontWeight: 'bold', padding: '1rem', borderRadius: '8px', border: 'none', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.5rem' }}
                >
                    <Check size={20} /> Confirm Sync
                </button>
            )}
        </div>
    );
}
