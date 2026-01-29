"use client";

import { X, Heart, Play, Pause, Share2, MoreHorizontal, Clock, Music, Trash2 } from 'lucide-react';
import styles from './PlaylistViewer.module.css';
import { useState, useEffect } from 'react';

import { albums } from '@/data/albumData'; // Import data to resolve tracks

interface PlaylistViewerProps {
    playlist: any;
    onClose: () => void;
    onPlayTrack: (track: any) => void;
    currentTrackId: number | string | null;
    isPlaying: boolean; // Global playing state
    onLike: () => void;
    hasLiked?: boolean;
    onDelete?: () => void;
    canDelete?: boolean;
}

export default function PlaylistViewer({ playlist, onClose, onPlayTrack, currentTrackId, isPlaying, onLike, hasLiked, onDelete, canDelete }: PlaylistViewerProps) {
    const [resolvedTracks, setResolvedTracks] = useState<any[]>([]);

    // Resolve tracks on mount or playlist change
    useEffect(() => {
        if (!playlist || !playlist.tracks) return;

        const tracks = playlist.tracks.map((tId: string | number) => {
            // Logic to find track from albumData
            const parts = String(tId).split('-');
            const uniqueId = `track-${tId}`; // Prefix to avoid collision with playlist ID
            if (parts.length >= 2) {
                const aId = parts.slice(0, -1).join('-');
                const trId = parseInt(parts[parts.length - 1]);
                const album = albums.find(a => a.id === aId);
                const track = album?.tracks.find(t => t.id === trId);
                if (track) return { ...track, uniqueId: uniqueId, id: uniqueId, originalId: trId, albumTitle: album?.title, coverArt: album?.coverArt };
            } else {
                const idNum = parseInt(String(tId));
                for (const album of albums) {
                    const match = album.tracks.find(t => t.id === idNum);
                    if (match) return { ...match, uniqueId: uniqueId, id: uniqueId, originalId: idNum, albumTitle: album.title, coverArt: album.coverArt };
                }
            }
            return null;
        }).filter(Boolean);

        setResolvedTracks(tracks);
    }, [playlist]);

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
                            style={{
                                background: playlist.color || '#333',
                                backgroundImage: resolvedTracks.length > 0 ? `url(${resolvedTracks[0].artwork || resolvedTracks[0].coverArt})` : undefined,
                                backgroundSize: 'cover'
                            }}
                        />
                    </div>

                    <div className={styles.info}>
                        <span className={styles.subtitle}>Curated Playlist</span>
                        <h2 className={styles.title}>{playlist.title}</h2>

                        <div className={styles.meta}>
                            <div className={styles.creator}>
                                <span className={styles.avatar}>{playlist.creator.substring(0, 2).toUpperCase()}</span>
                                <span>{playlist.creator}</span>
                            </div>
                            <span>•</span>
                            <span>{playlist.likes} Likes</span>
                            <span>•</span>
                            <span>{resolvedTracks.length} Tracks</span>
                        </div>

                        <div className={styles.actions}>
                            <button
                                className={styles.playBtn}
                                onClick={() => resolvedTracks.length > 0 && onPlayTrack(resolvedTracks[0])}
                            >
                                {isPlaying && currentTrackId === resolvedTracks[0]?.id ?
                                    <Pause size={28} fill="white" color="white" /> :
                                    <Play size={28} fill="white" color="white" style={{ marginLeft: 4 }} />
                                }
                            </button>

                            <button
                                className={`${styles.actionBtn} ${hasLiked ? styles.liked : ''}`}
                                onClick={onLike}
                            >
                                <Heart size={28} fill={hasLiked ? "currentColor" : "none"} />
                            </button>

                            <button className={styles.actionBtn}>
                                <Share2 size={24} />
                            </button>

                            {canDelete && onDelete && (
                                <button
                                    className={styles.actionBtn}
                                    style={{ color: '#ff4444', borderColor: '#ff4444' }}
                                    onClick={(e) => {
                                        e.stopPropagation();
                                        if (confirm("Are you sure you want to delete this mix? This cannot be undone.")) {
                                            onDelete();
                                        }
                                    }}
                                    title="Delete Mix"
                                >
                                    <Trash2 size={24} />
                                </button>
                            )}
                        </div>
                    </div>
                </div>

                <div className={styles.tracklist}>
                    <div className={styles.trackHeader}>
                        <span>#</span>
                        <span>Title</span>
                        <span style={{ textAlign: 'right' }}><Clock size={14} /></span>
                    </div>

                    {resolvedTracks.map((track, i) => {
                        const isTrackPlaying = isPlaying && currentTrackId === track.id;
                        return (
                            <div
                                key={track.uniqueId || i}
                                className={`${styles.track} ${isTrackPlaying ? styles.activeTrack : ''}`}
                                onClick={() => onPlayTrack(track)}
                            >
                                <div className={styles.trackNum}>
                                    <span className={styles.num}>
                                        {isTrackPlaying ? (
                                            <div className={styles.playingAnim}>
                                                <span />
                                                <span />
                                                <span />
                                            </div>
                                        ) : i + 1}
                                    </span>
                                    <span className={styles.trackPlayIcon}>
                                        {isTrackPlaying ? <Pause size={12} fill="white" color="white" /> : <Play size={12} fill="white" color="white" />}
                                    </span>
                                </div>

                                <div>
                                    <div className={styles.trackTitle} style={{ color: isTrackPlaying ? 'var(--primary)' : 'white' }}>
                                        {track.title}
                                    </div>
                                    <span className={styles.trackArtist}>{track.artist || "SingIt Pop"} • {track.albumTitle}</span>
                                </div>

                                <div className={styles.trackDuration}>{track.duration || "3:00"}</div>
                            </div>
                        );
                    })}
                </div>
            </div>
        </div>
    );
}
