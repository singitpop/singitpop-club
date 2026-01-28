"use client";

import { X, Heart, Play, Pause, Share2, MoreHorizontal, Clock, Music } from 'lucide-react';
import styles from './PlaylistViewer.module.css';
import { useState, useEffect } from 'react';

interface PlaylistViewerProps {
    playlist: any;
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
                    <X size={20} />
                </button>

                <div className={styles.header}>
                    <div className={styles.artworkContainer}>
                        <div
                            className={styles.artwork}
                            style={{ background: playlist.color || '#333' }}
                        />
                    </div>

                    <div className={styles.info}>
                        <span className={styles.subtitle}>Curated Playlist</span>
                        <h2 className={styles.title}>{playlist.title}</h2>

                        <div className={styles.meta}>
                            <div className={styles.creator}>
                                <span className={styles.avatar}>GB</span>
                                <span>{playlist.creator}</span>
                            </div>
                            <span>•</span>
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
                                {isPlaying ? <Pause size={28} fill="white" /> : <Play size={28} fill="white" style={{ marginLeft: 4 }} />}
                            </button>

                            <button
                                className={`${styles.actionBtn} ${liked ? styles.liked : ''}`}
                                onClick={() => setLiked(!liked)}
                            >
                                <Heart size={28} fill={liked ? "currentColor" : "none"} />
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
                    <div className={styles.trackHeader}>
                        <span>#</span>
                        <span>Title</span>
                        <span style={{ textAlign: 'right' }}><Clock size={14} /></span>
                    </div>

                    {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((num) => (
                        <div key={num} className={styles.track}>
                            <div className={styles.trackNum}>
                                <span className={styles.num}>{num}</span>
                                <span className={styles.trackPlayIcon}><Play size={12} fill="white" /></span>
                            </div>

                            <div>
                                <div className={styles.trackTitle}>Hit Song #{num}</div>
                                <span className={styles.trackArtist}>SingIt Pop</span>
                            </div>

                            <div className={styles.trackDuration}>3:45</div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}
