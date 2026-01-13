"use client";

import { Play, Lock, Share2, Heart, Check, ShoppingBag } from 'lucide-react';
import { useState, useEffect, useRef } from 'react';
import { useAuth } from '@/context/AuthContext';
import styles from './SongList.module.css';
import { Track } from '@/data/albumData';

interface SongListProps {
    tracks: Track[];
    filterMode?: 'all' | 'trending' | 'favorites' | 'latest';
}

const MAX_MIXTAPE_TRACKS = 12;


// Helper to generate unique ID
const getUniqueId = (track: Track) => track.albumId ? `${track.albumId}:${track.id}` : String(track.id);

export default function SongList({ tracks, filterMode = 'all' }: SongListProps) {
    const { isPro, isInsider } = useAuth();
    const [isPlaying, setIsPlaying] = useState(false);
    const audioRef = useRef<HTMLAudioElement | null>(null);
    const [activeTrackId, setActiveTrackId] = useState<string | null>(null); // changed to string
    const [selectedTracks, setSelectedTracks] = useState<string[]>([]); // changed to string[]
    const [currentSignedUrl, setCurrentSignedUrl] = useState<string | null>(null);

    // Fetch Signed URL when active track changes
    useEffect(() => {
        async function fetchSignedUrl() {
            if (!activeTrackId) return;
            const track = tracks.find(t => getUniqueId(t) === activeTrackId);
            if (!track || !track.audioUrl) return;

            try {
                const res = await fetch('/api/music/sign', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({ url: track.audioUrl })
                });
                const data = await res.json();
                if (data.signedUrl) {
                    setCurrentSignedUrl(data.signedUrl);
                    setIsPlaying(true); // Start playing once signed
                } else {
                    console.error("Failed to sign URL:", data.error);
                }
            } catch (e) {
                console.error("Signing request failed", e);
            }
        }

        if (activeTrackId) {
            fetchSignedUrl();
        } else {
            setCurrentSignedUrl(null);
        }
    }, [activeTrackId, tracks]);

    useEffect(() => {
        if (activeTrackId && audioRef.current && currentSignedUrl) {
            if (isPlaying) {
                const playPromise = audioRef.current.play();
                if (playPromise !== undefined) {
                    playPromise.catch(error => {
                        console.error("Playback failed:", error);
                        setIsPlaying(false);
                    });
                }
            } else {
                audioRef.current.pause();
            }
        }
    }, [isPlaying, activeTrackId, currentSignedUrl]);

    const handlePlay = (track: Track) => {
        const uniqueId = getUniqueId(track);
        if (activeTrackId === uniqueId) {
            setIsPlaying(!isPlaying);
        } else {
            setIsPlaying(false); // Stop asking for previous track
            setActiveTrackId(uniqueId);
            // Effect will trigger fetching signed URL, then set isPlaying to true
        }
    };

    const toggleSelection = (uniqueId: string) => {
        setSelectedTracks(prev => {
            if (prev.includes(uniqueId)) {
                return prev.filter(tid => tid !== uniqueId);
            } else {
                if (prev.length >= MAX_MIXTAPE_TRACKS) {
                    alert(`Maximum ${MAX_MIXTAPE_TRACKS} tracks allowed per mixtape!`);
                    return prev;
                }
                return [...prev, uniqueId];
            }
        });
    };

    // Filter Logic
    const filteredTracks = tracks.filter(track => {
        if (filterMode === 'all') return true;
        if (filterMode === 'trending') return track.title === 'Southern Lights' || track.title === 'Neon Heart'; // Mock logic
        if (filterMode === 'favorites') return track.plays.includes('M'); // Mock logic: >1M plays
        if (filterMode === 'latest') return track.title === 'Southern Lights'; // Mock logic
        return true;
    });

    const totalPrice = (selectedTracks.length * 0.99).toFixed(2);

    return (
        <div className={styles.container}>
            <h2 className={styles.sectionTitle}>Build Your Mixtape</h2>
            {/* Hidden Audio Element */}
            <audio
                ref={audioRef}
                src={currentSignedUrl || undefined}
                onEnded={() => setIsPlaying(false)}
                onTimeUpdate={(e) => {
                    if (!isPro && !isInsider && e.currentTarget.currentTime >= 30) {
                        e.currentTarget.pause();
                        setIsPlaying(false);
                        alert("Preview ended. Join the Club to listen to the full track!");
                        e.currentTarget.currentTime = 0; // Reset
                    }
                }}
                onError={(e) => console.error("Audio error:", e.currentTarget.error)}
            />

            <p className={styles.subtitle} style={{ color: 'var(--text-muted)', marginBottom: '2rem' }}>
                Select tracks to create your custom digital album.
            </p>

            <div className={styles.list}>
                {filteredTracks.length === 0 ? (
                    <div style={{ textAlign: 'center', padding: '2rem', color: 'var(--text-muted)' }}>No tracks found.</div>
                ) : (
                    filteredTracks.map((track, index) => {
                        const uniqueId = getUniqueId(track);
                        const isSelected = selectedTracks.includes(uniqueId);
                        const isLocked = track.locked && !isPro;
                        const isCurrentTrack = activeTrackId === uniqueId;

                        return (
                            <div
                                key={uniqueId}
                                className={`${styles.row} ${isCurrentTrack ? styles.active : ''} ${isLocked ? styles.locked : ''}`}
                                onClick={() => !isLocked && handlePlay(track)}
                                style={{
                                    opacity: isLocked ? 0.6 : 1,
                                    cursor: isLocked ? 'not-allowed' : 'pointer',
                                    '--index': index
                                } as React.CSSProperties}
                            >
                                <div
                                    className={`${styles.checkbox} ${isSelected ? styles.checked : ''}`}
                                    onClick={(e) => { e.stopPropagation(); toggleSelection(uniqueId); }}
                                >
                                    {isSelected && <Check size={14} strokeWidth={4} />}
                                </div>

                                <div className={styles.mainInfo}>
                                    <button className={styles.playBtn} onClick={(e) => {
                                        e.stopPropagation();
                                        if (isLocked) {
                                            alert("Join the Club to unlock this track!");
                                        } else {
                                            handlePlay(track);
                                        }
                                    }}>
                                        {isLocked ? <Lock size={16} /> : (isCurrentTrack && isPlaying ? <span style={{ fontSize: '10px' }}>❚❚</span> : <Play size={16} fill="currentColor" />)}
                                    </button>
                                    <div>
                                        <div className={styles.trackTitle}>{track.title}</div>
                                        <div className={styles.meta}>
                                            £{track.price} • {track.plays} plays
                                        </div>
                                    </div>
                                </div>

                                <div className={styles.actions}>
                                    <span className={styles.duration}>{track.duration}</span>

                                    {/* Download Logic */}
                                    {(isInsider || isPro) && (
                                        <a
                                            href={(isPro && track.highResUrl) ? track.highResUrl : track.audioUrl}
                                            className={styles.actionBtn}
                                            title={isPro ? "Download High-Res WAV" : "Download MP3"}
                                            download
                                            onClick={(e) => e.stopPropagation()} // Prevent row click
                                        >
                                            <span style={{ fontSize: '0.7rem', fontWeight: 700 }}>
                                                {isPro ? 'WAV' : 'MP3'}
                                            </span>
                                        </a>
                                    )}

                                    <button className={styles.actionBtn}><Heart size={18} /></button>
                                    <button className={styles.actionBtn}><Share2 size={18} /></button>
                                </div>
                            </div>
                        );
                    })
                )}
            </div>

            <div className={`${styles.mixtapeBar} ${selectedTracks.length > 0 ? styles.visible : ''}`}>
                <ShoppingBag size={24} color="var(--accent)" />
                <div className={styles.mixtapeInfo}>
                    <span className={styles.mixtapeCount}>
                        {selectedTracks.length}/{MAX_MIXTAPE_TRACKS} Tracks Selected
                    </span>
                    <span className={styles.mixtapeTotal}>Total: £{totalPrice}</span>
                </div>
                <div className={styles.purchaseOptions}>
                    <button
                        className={styles.optionBtn}
                        onClick={() => {
                            if (selectedTracks.length === 0) return;
                            window.location.href = `/music/checkout?type=cd&tracks=${selectedTracks.join(',')}`;
                        }}
                        title="Physical CD - £12.99"
                    >
                        💿 CD
                    </button>
                    <button
                        className={styles.optionBtn}
                        onClick={() => {
                            if (selectedTracks.length === 0) return;
                            window.location.href = `/music/checkout?type=vinyl&tracks=${selectedTracks.join(',')}`;
                        }}
                        title="Vinyl Record - £24.99"
                    >
                        🎵 Vinyl
                    </button>
                    <button
                        className={`${styles.optionBtn} ${styles.primary}`}
                        onClick={() => {
                            if (selectedTracks.length === 0) return;
                            window.location.href = `/music/checkout?type=download&tracks=${selectedTracks.join(',')}`;
                        }}
                        title={`Digital Download - £${totalPrice}`}
                    >
                        ⬇️ Download
                    </button>
                </div>
            </div>
        </div>
    );
}

