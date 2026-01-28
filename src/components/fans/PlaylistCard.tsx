'use client';

import { Play, Pause, Heart } from 'lucide-react';
import styles from './PlaylistCard.module.css';

interface PlaylistCardProps {
    playlist: {
        id: number;
        title: string;
        creator: string;
        likes: number;
        color: string; // Gradient string
        themeColor?: string; // Hex for glow (e.g. #ff0080)
    };
    isPlaying: boolean;
    onPlay: (e: React.MouseEvent) => void;
    onClick: () => void;
}

export default function PlaylistCard({ playlist, isPlaying, onPlay, onClick }: PlaylistCardProps) {
    // Extract a solid color from the gradient for the glow, or use a default
    // We can try to parse it or just blindly use the themeColor if provided, fallback to neon-pink
    const glowColor = playlist.themeColor || '#8b5cf6'; // Violet default

    return (
        <div
            className={`${styles.card} ${isPlaying ? styles.playing : ''}`}
            onClick={onClick}
            style={{ '--glow-color': glowColor } as React.CSSProperties}
        >
            {/* The Vinyl Record (Behind Sleeve, slides out) */}
            <div className={styles.vinyl}>
                <div
                    className={styles.vinylLabel}
                    style={{ background: playlist.color }}
                />
            </div>

            {/* The Sleeve (Front) */}
            <div
                className={styles.sleeve}
                style={{ background: playlist.color }}
            >
                <div className={styles.sleeveOverlay} />

                {/* Play Button Orb */}
                <button
                    className={styles.playOrb}
                    onClick={onPlay}
                    aria-label={isPlaying ? "Pause" : "Play"}
                >
                    {isPlaying ? (
                        <Pause size={28} fill="white" stroke="none" />
                    ) : (
                        <Play size={28} fill="white" stroke="none" style={{ marginLeft: '4px' }} />
                    )}
                </button>

                <div className={styles.content}>
                    <h3 className={styles.title}>{playlist.title}</h3>

                    <div className={styles.creator}>
                        <span>{playlist.creator}</span>
                        {/* Visualizer if playing */}
                        {isPlaying && (
                            <div className={styles.visualizer}>
                                <div className={styles.bar}></div>
                                <div className={styles.bar}></div>
                                <div className={styles.bar}></div>
                                <div className={styles.bar}></div>
                            </div>
                        )}

                        {!isPlaying && (
                            <span style={{ marginLeft: 'auto', display: 'flex', alignItems: 'center', gap: '4px', fontSize: '0.8rem' }}>
                                <Heart size={14} fill="rgba(255,255,255,0.5)" stroke="none" />
                                {playlist.likes}
                            </span>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
}
