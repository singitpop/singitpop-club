"use client";

import { X, Heart, Play, Pause, Share2, MoreHorizontal } from 'lucide-react';
import styles from './PlaylistViewer.module.css';
import { useState, useEffect } from 'react';

interface PlaylistViewerProps {
    playlist: any; // Type strictly later
    onClose: () => void;
}

export default function PlaylistViewer({ playlist, onClose }: PlaylistViewerProps) {
    const [liked, setLiked] = useState(false);
    const [isPlaying, setIsPlaying] = useState(false);

    // Close on escape
    useEffect(() => {
        const handleEsc = (e: KeyboardEvent) => {
            if (e.key === 'Escape') onClose();
        };
        window.addEventListener('keydown', handleEsc);
        return () => window.removeEventListener('keydown', handleEsc);
    }, [onClose]);

    if (!playlist) return null;

    return (
        <div className={styles.overlay} onClick={onClose}>
            <div className={styles.modal} onClick={e => e.stopPropagation()}>
                <button className={styles.closeBtn} onClick={onClose}>
                    <X size={24} />
                </button>

                <div className={styles.header}>
                    <div className={styles.artwork} style={{ background: playlist.color || '#333' }}>
                        {/* Placeholder for actual cover image if available */}
                        <div className={styles.artworkPlaceholder}>
                            {isPlaying ? (
                                <div className={styles.visualizer}>
                                    <div className={styles.bar}></div>
                                    <div className={styles.bar}></div>
                                    <div className={styles.bar}></div>
                                    <div className={styles.bar}></div>
                                    <div className={styles.bar}></div>
                                </div>
                            ) : (
                                <span>🎵</span>
                            )}
                        </div>
                    </div>

                    <div className={styles.info}>
                        <h2 className={styles.title}>{playlist.title}</h2>
                        <div className={styles.creator}>
                            <span className={styles.avatar}>👤</span>
                            <span className={styles.username}>{playlist.creator}</span>
                        </div>

                        <div className={styles.stats}>
                            <span>{playlist.likes + (liked ? 1 : 0)} Likes</span>
                            <span>•</span>
                            <span>12 Tracks</span>
                            <span>•</span>
                            <span>45 min</span>
                        </div>

                        <div className={styles.actions}>
                            <button
                                className={styles.playBtn}
                                onClick={() => setIsPlaying(!isPlaying)}
                            >
                                {isPlaying ? <Pause size={24} fill="black" /> : <Play size={24} fill="black" />}
                            </button>

                            <button
                                className={`${styles.actionBtn} ${liked ? styles.liked : ''}`}
                                onClick={() => setLiked(!liked)}
                            >
                                <Heart size={24} fill={liked ? "#ff0080" : "none"} stroke={liked ? "#ff0080" : "currentColor"} />
                            </button>

                            <button className={styles.actionBtn}>
                                <Share2 size={24} />
                            </button>

                            <button className={styles.actionBtn}>
                                <MoreHorizontal size={24} />
                            </button>
                        </div>
                    </div>
                </div>

                <div className={styles.tracklist}>
                    <h3>Tracks</h3>
                    {/* Mock Tracks for now - replace with real data if available in playlist obj */}
                    {[1, 2, 3, 4, 5, 6, 7, 8].map((num) => (
                        <div key={num} className={styles.track}>
                            <span className={styles.trackNum}>{num}</span>
                            <span className={styles.trackTitle}>Hit Song #{num}</span>
                            <span className={styles.trackArtist}>Singitpop</span>
                            <span className={styles.trackDuration}>3:45</span>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}
