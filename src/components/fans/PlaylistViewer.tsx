"use client";

import { X, Heart, Play, Pause, Share2, MoreHorizontal, Clock, Music, Trash2 } from 'lucide-react';
import styles from './PlaylistViewer.module.css';
import { useState, useEffect, useMemo } from 'react';

import { albums } from '@/data/albumData'; // Import data to resolve tracks
import { getAlbumCoverUrl } from '@/lib/image-utils';

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
    isVIP?: boolean;
    onUpdate?: (updatedPlaylist: any) => void;
}

export default function PlaylistViewer({ playlist, onClose, onPlayTrack, currentTrackId, isPlaying, onLike, hasLiked, onDelete, canDelete, isVIP = false, onUpdate }: PlaylistViewerProps) {
    const [resolvedTracks, setResolvedTracks] = useState<any[]>([]);
    const [isEditingCover, setIsEditingCover] = useState(false);
    const [isSaving, setIsSaving] = useState(false);

    // Resolve tracks on mount or playlist change
    useEffect(() => {
        if (!playlist || !playlist.tracks) return;

        const now = new Date();

        const tracks = playlist.tracks.map((tId: string | number) => {
            // Logic to find track from albumData
            const parts = String(tId).split('-');
            const uniqueId = `track-${tId}`; // Prefix to avoid collision with playlist ID
            let album: any = null;
            let track: any = null;

            if (parts.length >= 2) {
                const aId = parts.slice(0, -1).join('-');
                const trId = parseInt(parts[parts.length - 1]);
                album = albums.find(a => a.id === aId);
                track = album?.tracks.find((t: any) => t.id === trId);
            } else {
                const idNum = parseInt(String(tId));
                for (const a of albums) {
                    const match = a.tracks.find((t: any) => t.id === idNum);
                    if (match) {
                        album = a;
                        track = match;
                        break;
                    }
                }
            }

            if (album && track) {
                // If it's a future release and the user isn't VIP, completely hide the track
                if (!isVIP && album.releaseDate && new Date(album.releaseDate) > now) {
                    return null;
                }
                const artwork = getAlbumCoverUrl(album);
                return { ...track, uniqueId: uniqueId, id: uniqueId, originalId: track.id, albumTitle: album.title, coverArt: artwork };
            }
            return null;
        }).filter(Boolean);

        setResolvedTracks(tracks);
    }, [playlist]);

    // All available album artworks for selection
    const availableArtworks = useMemo(() => {
        const set = new Set<string>();
        // Add covers from tracks currently in playlist
        resolvedTracks.forEach(t => {
            if (t.coverArt) set.add(t.coverArt);
        });
        // Add all other album covers as options
        albums.forEach(album => {
            set.add(getAlbumCoverUrl(album));
        });
        return Array.from(set);
    }, [resolvedTracks]);

    const handleUpdateCover = async (artworkUrl: string) => {
        setIsSaving(true);
        try {
            const res = await fetch('/api/community/playlist', {
                method: 'PATCH',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    id: playlist.id,
                    coverImage: artworkUrl
                })
            });
            if (res.ok) {
                const data = await res.json();
                onUpdate?.(data.playlist);
                setIsEditingCover(false);
            }
        } catch (err) {
            console.error("Failed to update cover:", err);
        } finally {
            setIsSaving(false);
        }
    };

    // Calculate total duration
    const totalDuration = useMemo(() => {
        if (!resolvedTracks.length) return "0 min";
        let totalSeconds = 0;
        resolvedTracks.forEach(t => {
            if (t.duration) {
                const parts = t.duration.split(':');
                if (parts.length === 2) {
                    totalSeconds += parseInt(parts[0]) * 60 + parseInt(parts[1]);
                }
            } else {
                totalSeconds += 210; // Default 3:30
            }
        });
        const hours = Math.floor(totalSeconds / 3600);
        const minutes = Math.floor((totalSeconds % 3600) / 60);

        if (hours > 0) return `${hours} hr ${minutes} min`;
        return `${minutes} min`;
    }, [resolvedTracks]);

    // Close on escape
    useEffect(() => {
        const handleEsc = (e: KeyboardEvent) => {
            if (e.key === 'Escape') onClose();
        };
        window.addEventListener('keydown', handleEsc);
        return () => window.removeEventListener('keydown', handleEsc);
    }, [onClose]);

    if (!playlist) return null;

    const displayCover = playlist.coverImage || (resolvedTracks.length > 0 ? resolvedTracks[0].coverArt : null);

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
                                backgroundImage: displayCover ? `url(${displayCover})` : undefined,
                                backgroundSize: 'cover'
                            }}
                        />
                        {canDelete && (
                            <button 
                                className={styles.changeCoverBtn}
                                onClick={() => setIsEditingCover(!isEditingCover)}
                            >
                                <Share2 size={14} /> Change Cover
                            </button>
                        )}
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
                            <span>•</span>
                            <span style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
                                <Clock size={14} /> {totalDuration}
                            </span>
                        </div>

                        {/* Cover Selector Drawer */}
                        {isEditingCover && (
                            <div className={styles.coverSelector}>
                                <h4>Select Artwork</h4>
                                <div className={styles.artworkGrid}>
                                    {availableArtworks.map((art, idx) => (
                                        <button 
                                            key={idx} 
                                            disabled={isSaving}
                                            onClick={() => handleUpdateCover(art)}
                                            className={playlist.coverImage === art ? styles.selectedArt : ''}
                                        >
                                            <img src={art} alt="" />
                                        </button>
                                    ))}
                                    {/* Option to clear to default? */}
                                    <button onClick={() => handleUpdateCover('')} disabled={isSaving}>
                                        Default
                                    </button>
                                </div>
                            </div>
                        )}

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
