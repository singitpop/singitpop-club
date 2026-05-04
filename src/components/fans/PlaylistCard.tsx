'use client';

import { Play, Pause, Heart } from 'lucide-react';
import styles from './PlaylistCard.module.css';

interface PlaylistCardProps {
    playlist: {
        id: number | string;
        title: string;
        creator: string;
        likes: number;
        color: string; // Fallback
        themeColor?: string;
        coverImage?: string; // New: Custom cover
    };
    coverImages?: string[]; // Array of up to 4 artwork URLs
    isPlaying: boolean;
    onPlay: (e: React.MouseEvent) => void;
    onClick: () => void;
    onLike?: () => void;
    hasLiked?: boolean;
    canDelete?: boolean;
    onDelete?: (e: React.MouseEvent) => void;
}

import RadialVisualizer from '../ui/RadialVisualizer';

export default function PlaylistCard({ playlist, coverImages = [], isPlaying, onPlay, onClick, onLike, hasLiked, canDelete, onDelete }: PlaylistCardProps) {
    const glowColor = playlist.themeColor || '#8b5cf6';
    
    // Priority: Custom coverImage -> First track artwork -> default color
    const mainImage = playlist.coverImage || (coverImages.length > 0 ? coverImages[0] : null);

    return (
        <div
            className={`${styles.card} ${isPlaying ? styles.playing : ''}`}
            onClick={onClick}
            style={{ '--glow-color': glowColor } as React.CSSProperties}
        >
            {/* The Vinyl Record (Behind Sleeve) */}
            <div className={styles.vinyl}>
                <div
                    className={styles.vinylLabel}
                    style={{
                        background: mainImage ? `url(${mainImage}) center/cover no-repeat` : playlist.color,
                        boxShadow: 'inset 0 0 0 2px rgba(255,255,255,0.2)'
                    }}
                />
            </div>

            {/* The Sleeve (Front) */}
            <div
                className={styles.sleeve}
                style={{ background: '#111', overflow: 'hidden', position: 'relative' }}
            >
                {/* Custom Cover or 2x2 Grid or Fallback */}
                {playlist.coverImage ? (
                    <img
                        src={playlist.coverImage}
                        alt=""
                        style={{
                            width: '100%',
                            height: '100%',
                            objectFit: 'cover',
                            position: 'absolute',
                            top: 0,
                            left: 0,
                            opacity: isPlaying ? 0.4 : 1,
                            transition: 'opacity 0.3s ease'
                        }}
                    />
                ) : coverImages.length > 0 ? (
                    <div style={{
                        display: 'grid',
                        gridTemplateColumns: coverImages.length >= 4 ? '1fr 1fr' : '1fr',
                        gridTemplateRows: coverImages.length >= 4 ? '1fr 1fr' : '1fr',
                        width: '100%',
                        height: '100%',
                        position: 'absolute',
                        top: 0,
                        left: 0,
                        opacity: isPlaying ? 0.4 : 1,
                        transition: 'opacity 0.3s ease'
                    }}>
                        {coverImages.slice(0, 4).map((img, i) => (
                            <img
                                key={i}
                                src={img}
                                alt=""
                                style={{
                                    width: '100%',
                                    height: '100%',
                                    objectFit: 'cover',
                                    display: (coverImages.length === 3 && i === 2) ? 'none' : 'block'
                                }}
                            />
                        ))}
                    </div>
                ) : (
                    <div style={{
                        width: '100%', height: '100%', position: 'absolute', top: 0,
                        background: playlist.color,
                        opacity: 0.8
                    }} />
                )}

                {/* Radial Visualizer Overlay */}
                {isPlaying && (
                    <div style={{
                        position: 'absolute',
                        inset: 0,
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        zIndex: 4,
                        pointerEvents: 'none'
                    }}>
                        <RadialVisualizer isPlaying={true} width={200} height={200} color="rgba(255,255,255,0.8)" />
                    </div>
                )}

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
                        {!isPlaying && (
                            <div style={{ marginLeft: 'auto', display: 'flex', alignItems: 'center', gap: '8px' }}>
                                <button
                                    onClick={(e) => { e.stopPropagation(); onLike && onLike(); }}
                                    className={styles.likeBtn}
                                    style={{ display: 'flex', alignItems: 'center', gap: '4px', fontSize: '0.8rem', background: 'none', border: 'none', color: 'white', cursor: 'pointer' }}
                                >
                                    <Heart size={14} fill={hasLiked ? "var(--primary)" : "rgba(255,255,255,0.5)"} color={hasLiked ? "var(--primary)" : "white"} />
                                    {playlist.likes}
                                </button>
                                {canDelete && onDelete && (
                                    <button
                                        onClick={(e) => { e.stopPropagation(); onDelete(e); }}
                                        style={{ background: 'none', border: 'none', color: '#ff4444', cursor: 'pointer', padding: '2px', display: 'flex', alignItems: 'center' }}
                                        title="Delete Mix"
                                    >
                                        <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M3 6h18"></path><path d="M19 6v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6"></path><path d="M8 6V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2"></path></svg>
                                    </button>
                                )}
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
}
