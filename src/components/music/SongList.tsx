"use client";

import { Play, Lock, Share2, Heart, Check, ShoppingBag, Download } from 'lucide-react';
import { useState, useEffect, useRef } from 'react';
import { useAuth } from '@/context/AuthContext';
import styles from './SongList.module.css';
import { Track, Album } from '@/data/albumData'; // Just types

interface SongListProps {
    tracks: Track[];
    albums: Album[]; // New Prop
    filterMode?: 'all' | 'trending' | 'favorites' | 'latest';
    selectedTracks: string[];
    onToggleSelection: (id: string) => void;
    latestSingleUid?: string | null;
}

const MAX_MIXTAPE_TRACKS = 12;

// Helper to generate unique ID
const getUniqueId = (track: Track) => track.albumId ? `${track.albumId}-${track.id}` : String(track.id);

export default function SongList({ tracks, albums, filterMode = 'all', selectedTracks, onToggleSelection, latestSingleUid }: SongListProps) {
    const { isPro, isInsider, user } = useAuth();
    const [isPlaying, setIsPlaying] = useState(false);
    const audioRef = useRef<HTMLAudioElement | null>(null);
    const [activeTrackId, setActiveTrackId] = useState<string | null>(null);
    const [currentSignedUrl, setCurrentSignedUrl] = useState<string | null>(null);
    const [showPreviewModal, setShowPreviewModal] = useState(false);
    const [favorites, setFavorites] = useState<string[]>([]);

    // Fetch favorites on mount
    useEffect(() => {
        if (!user) return;
        async function fetchFavorites() {
            try {
                const res = await fetch('/api/user/favorites');
                if (res.ok) {
                    const data = await res.json();
                    setFavorites(data.favorites || []);
                }
            } catch (e) {
                console.error("Failed to load favorites", e);
            }
        }
        fetchFavorites();
    }, [user]);

    // Fetch Signed URL when active track changes
    useEffect(() => {
        let isCancelled = false;

        async function fetchSignedUrl() {
            if (!activeTrackId) {
                setCurrentSignedUrl(null);
                return;
            }

            // Clear previous URL immediately to avoid playing stale audio
            setCurrentSignedUrl(null);

            const track = tracks.find(t => getUniqueId(t) === activeTrackId);
            if (!track || !track.audioUrl) return;

            try {
                const res = await fetch('/api/music/sign', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({ url: track.audioUrl })
                });
                const data = await res.json();

                if (!isCancelled) {
                    if (data.signedUrl) {
                        setCurrentSignedUrl(data.signedUrl);
                        setIsPlaying(true); // Start playing once signed
                    } else {
                        console.error("Failed to sign URL:", data.error);
                        setIsPlaying(false);
                    }
                }
            } catch (e) {
                if (!isCancelled) {
                    console.error("Signing request failed", e);
                    setIsPlaying(false);
                }
            }
        }

        fetchSignedUrl();

        return () => {
            isCancelled = true;
        };
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

    const handleTimeUpdate = () => {
        if (!audioRef.current || !activeTrackId) return;

        const track = tracks.find(t => getUniqueId(t) === activeTrackId);
        if (!track) return;

        // Check permissions again to be safe
        // Singles are free for everyone. Album tracks are premium.
        const isPremiumContent = !track.isSingle;
        const isFullAccess = isPro || isInsider || !isPremiumContent;

        // If not full access, enforce 30s limit
        if (!isFullAccess && audioRef.current.currentTime >= 30) {
            audioRef.current.pause();
            setIsPlaying(false);
            audioRef.current.currentTime = 0;
            setShowPreviewModal(true);
        }
    };

    const handlePlay = (track: Track) => {
        const uniqueId = getUniqueId(track);
        if (activeTrackId === uniqueId) {
            setIsPlaying(!isPlaying);
        } else {
            setIsPlaying(false); // Stop asking for previous track
            setActiveTrackId(uniqueId);
        }
    };

    const toggleFavorite = async (track: Track) => {
        if (!user) {
            alert("Please sign in to save favorites!");
            return;
        }

        const uniqueId = getUniqueId(track);
        const isFav = favorites.includes(uniqueId);

        // Optimistic Update
        let newFavs;
        if (isFav) {
            newFavs = favorites.filter(id => id !== uniqueId);
        } else {
            newFavs = [...favorites, uniqueId];
        }
        setFavorites(newFavs);

        // API Call
        try {
            const method = isFav ? 'DELETE' : 'POST';
            const res = await fetch('/api/user/favorites', {
                method,
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ trackId: uniqueId })
            });

            if (!res.ok) {
                // Revert on failure
                setFavorites(favorites);
                alert("Failed to update favorite. Please try again.");
            }
        } catch (e) {
            setFavorites(favorites);
            console.error("Favorite API Error", e);
        }
    };

    const toggleSelection = (uniqueId: string) => {
        onToggleSelection(uniqueId);
    };

    return (
        <div className={styles.container}>
            <div className={styles.list}>
                {tracks.length === 0 ? (
                    <div style={{ textAlign: 'center', padding: '2rem', color: 'var(--text-muted)' }}>No tracks found.</div>
                ) : (
                    tracks.map((track, index) => {
                        const uniqueId = getUniqueId(track);
                        const isSelected = selectedTracks.includes(uniqueId);

                        // Time-Based Gating Logic
                        // Robust Album Lookup using Props
                        let album = track.albumId ? albums.find(a => a.id === track.albumId) : undefined;
                        if (!album) {
                            // Fallback
                            album = albums.find(a => a.tracks.some(t => t.id === track.id));
                        }

                        const releaseDate = album?.releaseDate ? new Date(album.releaseDate) : new Date();
                        const isPreRelease = releaseDate > new Date();

                        // Access Logic
                        let isLocked = false;
                        let isPreview = false;
                        let lockMessage = "";

                        const isLatestSingle = uniqueId === latestSingleUid;
                        const isPremiumContent = !isLatestSingle;

                        if (isPreRelease && !isLatestSingle) {
                            // Pre-Release
                            if (!isPro) {
                                isLocked = true;
                                lockMessage = "Early Access! Upgrade to VIP to listen before the official release.";
                            }
                        } else {
                            // Standard Release
                            if (isPremiumContent && !isInsider && !isPro) {
                                isPreview = true;
                            }
                        }

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
                                            alert(lockMessage);
                                        } else {
                                            handlePlay(track);
                                        }
                                    }}>
                                        {isLocked ? <Lock size={16} /> :
                                            (isCurrentTrack && isPlaying ? <span style={{ fontSize: '10px' }}>❚❚</span> : <Play size={16} fill="currentColor" />)}
                                    </button>
                                    <div>
                                        <div className={styles.trackTitle}>
                                            {track.title}
                                            {isPreRelease && <span className={styles.badge} style={{ marginLeft: '8px', fontSize: '0.6rem', background: 'var(--accent)', color: 'white', padding: '2px 6px', borderRadius: '4px' }}>EARLY ACCESS</span>}
                                            {isPreview && <span className={styles.badge} style={{ marginLeft: '8px', fontSize: '0.6rem', background: '#666', color: 'white', padding: '2px 6px', borderRadius: '4px' }}>PREVIEW</span>}
                                        </div>
                                        <div className={styles.meta}>
                                            £{track.price} • {track.plays} plays
                                        </div>
                                    </div>
                                </div>

                                <div className={styles.actions}>
                                    <span className={styles.duration}>
                                        {isPreview ? "30s Preview" : track.duration}
                                    </span>

                                    {/* Download Logic */}
                                    {isInsider && (
                                        <button
                                            className={styles.actionBtn}
                                            title="Download MP3 (Insider)"
                                            onClick={async (e) => {
                                                e.stopPropagation();
                                                if (!track.audioUrl) return;

                                                try {
                                                    const res = await fetch('/api/music/sign', {
                                                        method: 'POST',
                                                        headers: { 'Content-Type': 'application/json' },
                                                        body: JSON.stringify({ url: track.audioUrl, download: true })
                                                    });
                                                    const data = await res.json();

                                                    if (data.signedUrl) {
                                                        const link = document.createElement('a');
                                                        link.href = data.signedUrl;
                                                        link.setAttribute('download', `${track.title}.mp3`); // Hint to browser
                                                        document.body.appendChild(link);
                                                        link.click();
                                                        document.body.removeChild(link);
                                                    } else {
                                                        alert("Download failed: Access Denied");
                                                    }
                                                } catch (err) {
                                                    console.error("Download error:", err);
                                                    alert("Download failed. Please try again.");
                                                }
                                            }}
                                        >
                                            <Download size={18} />
                                        </button>
                                    )}
                                    {isPro && track.highResUrl && (
                                        <button
                                            className={styles.actionBtn}
                                            title="Download WAV (VIP)"
                                            onClick={async (e) => {
                                                e.stopPropagation();
                                                try {
                                                    const res = await fetch('/api/music/sign', {
                                                        method: 'POST',
                                                        headers: { 'Content-Type': 'application/json' },
                                                        body: JSON.stringify({ url: track.highResUrl, download: true })
                                                    });
                                                    const data = await res.json();

                                                    if (data.signedUrl) {
                                                        const link = document.createElement('a');
                                                        link.href = data.signedUrl;
                                                        link.setAttribute('download', `${track.title}.wav`);
                                                        document.body.appendChild(link);
                                                        link.click();
                                                        document.body.removeChild(link);
                                                    } else {
                                                        alert("Download failed: Access Denied");
                                                    }
                                                } catch (err) {
                                                    console.error("Download error:", err);
                                                    alert("Download failed. Please try again.");
                                                }
                                            }}
                                        >
                                            <Download size={18} color="cyan" style={{ filter: 'drop-shadow(0 0 5px cyan)' }} />
                                        </button>
                                    )}

                                    <button
                                        className={styles.actionBtn}
                                        onClick={(e) => {
                                            e.stopPropagation();
                                            toggleFavorite(track);
                                        }}
                                    >
                                        <Heart size={18} fill={favorites.includes(uniqueId) ? "var(--accent)" : "none"} color={favorites.includes(uniqueId) ? "var(--accent)" : "currentColor"} />
                                    </button>

                                    <button
                                        className={styles.actionBtn}
                                        onClick={(e) => {
                                            e.stopPropagation();
                                            navigator.clipboard.writeText(`${window.location.origin}/music?track=${getUniqueId(track)}`)
                                                .then(() => alert("Link copied to clipboard!"))
                                                .catch(() => alert("Failed to copy link"));
                                        }}
                                    >
                                        <Share2 size={18} />
                                    </button>
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
                    <span className={styles.mixtapeTotal}>Price: £8.99</span>
                </div>
                <div className={styles.purchaseOptions}>
                    <button
                        className={`${styles.optionBtn} ${styles.primary}`}
                        onClick={() => {
                            if (selectedTracks.length === 0) return;
                            window.location.href = `/music/checkout?type=download&tracks=${selectedTracks.join(',')}`;
                        }}
                        title="Purchase Mixtape - £8.99"
                    >
                        Purchase Mixtape (£8.99)
                    </button>
                </div>
            </div>

            <audio
                ref={audioRef}
                src={currentSignedUrl || undefined}
                onEnded={() => setIsPlaying(false)}
                onPause={() => setIsPlaying(false)}
                onPlay={() => setIsPlaying(true)}
                onTimeUpdate={handleTimeUpdate}
                preload="none"
            />
            {/* Preview Modal */}
            {showPreviewModal && (
                <div className={styles.modalOverlay} onClick={() => setShowPreviewModal(false)}>
                    <div className={styles.modal} onClick={e => e.stopPropagation()}>
                        <h3 className={styles.modalTitle}>Preview Ended 🎵</h3>
                        <p className={styles.modalText}>
                            You've hit the 30-second preview limit.<br />
                            Join the Club to unlock full streaming!
                        </p>
                        <div className={styles.modalActions}>
                            <a href="/club" className={`${styles.modalBtn} ${styles.modalBtnPrimary}`}>
                                Join the Club
                            </a>
                            <button className={`${styles.modalBtn} ${styles.modalBtnSecondary}`} onClick={() => setShowPreviewModal(false)}>
                                Close
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}
