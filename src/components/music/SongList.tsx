"use client";

import { Play, Lock, Share2, Heart, Check, ShoppingBag, Download, X, ListMusic } from 'lucide-react';
import { createPortal } from 'react-dom';
import { useState, useEffect, useRef } from 'react';
import { useAuth } from '@/context/AuthContext';
import styles from './SongList.module.css';
import { Track, Album } from '@/data/albumData'; // Just types

interface SongListProps {
    tracks: Track[];
    albums: Album[]; // New Prop
    filterMode?: 'all' | 'trending' | 'favorites' | 'latest' | 'album';
    selectedTracks: string[];
    onToggleSelection: (id: string) => void;
    latestSingleUid?: string | null;
    autoPlayTrackId?: string | null;
}

const MAX_MIXTAPE_TRACKS = 12;

// Helper to generate unique ID
const getUniqueId = (track: Track) => track.albumId ? `${track.albumId}-${track.id}` : String(track.id);

export default function SongList({ tracks, albums, filterMode = 'all', selectedTracks, onToggleSelection, latestSingleUid, autoPlayTrackId }: SongListProps) {
    const { isPro, isInsider, isLabel, user, hasTrackAccess } = useAuth();
    const [isPlaying, setIsPlaying] = useState(false);
    const audioRef = useRef<HTMLAudioElement | null>(null);
    const [activeTrackId, setActiveTrackId] = useState<string | null>(null);
    const [currentSignedUrl, setCurrentSignedUrl] = useState<string | null>(null);
    const [showPreviewModal, setShowPreviewModal] = useState(false);
    const [favorites, setFavorites] = useState<string[]>([]);
    const [claimsLeft, setClaimsLeft] = useState<number | null>(null);
    const [downloadLinks, setDownloadLinks] = useState<{ title: string; url: string }[]>([]);
    const [showDownloadModal, setShowDownloadModal] = useState(false);
    const [showConfirmModal, setShowConfirmModal] = useState(false);
    const [showReviewModal, setShowReviewModal] = useState(false);
    const [isClaiming, setIsClaiming] = useState(false);

    // Fetch initial claims usage
    useEffect(() => {
        if (!user) return;
        // Simple fetch to get usage (re-using the claim endpoint with a dry-run or a specific usage endpoint would be better,
        // but for now we can infer it or just start with null and let it update on first claim, 
        // OR we can make a lightweight endpoint.
        // Let's create a tailored fetch.)
        async function fetchUsage() {
            try {
                // We'll add a GET handler to the claim route to return usage
                const res = await fetch('/api/user/mixtapes/claim', { method: 'GET' });
                if (res.ok) {
                    const data = await res.json();
                    setClaimsLeft(data.remaining);
                }
            } catch (e) {
                console.error("Failed to fetch mixtape usage", e);
            }
        }
        fetchUsage();
    }, [user]);

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
                    body: JSON.stringify({
                        url: track.audioUrl,
                        title: track.title,
                        albumId: track.albumId
                    })
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

    // Track previous filterMode to detect actual changes
    const prevFilterModeRef = useRef(filterMode);

    // Stop audio when filter mode changes (tab switching)
    useEffect(() => {
        // Only stop if filterMode actually changed (not initial mount)
        if (prevFilterModeRef.current !== filterMode) {
            // ALWAYS clear ALL audio state when switching tabs
            setIsPlaying(false);
            setActiveTrackId(null);
            setCurrentSignedUrl(null);

            // ALWAYS stop and reset audio element
            if (audioRef.current) {
                audioRef.current.pause();
                audioRef.current.currentTime = 0;
                // Remove src to fully disconnect audio
                audioRef.current.removeAttribute('src');
                // Force reload to clear any buffered audio
                audioRef.current.load();
            }
        }
        // Update ref for next comparison
        prevFilterModeRef.current = filterMode;
    }, [filterMode]);

    // Handle Auto-Play from Props
    useEffect(() => {
        if (autoPlayTrackId) {
            const track = tracks.find(t => getUniqueId(t) === autoPlayTrackId);
            if (track) {
                const uniqueId = getUniqueId(track);
                if (activeTrackId === uniqueId) {
                    // If already active but not playing, force start
                    if (!isPlaying) setIsPlaying(true);
                } else {
                    handlePlay(track);
                }

                // Scroll to it
                const el = document.getElementById(`track-${track.id}`);
                if (el) el.scrollIntoView({ behavior: 'smooth', block: 'center' });
            }
        }
    }, [autoPlayTrackId, tracks, activeTrackId, isPlaying]);

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
        } else if (audioRef.current && !currentSignedUrl) {
            // If no URL, ensure audio is stopped
            audioRef.current.pause();
        }
    }, [isPlaying, activeTrackId, currentSignedUrl]);

    const handleTimeUpdate = () => {
        if (!audioRef.current || !activeTrackId) return;

        const track = tracks.find(t => getUniqueId(t) === activeTrackId);
        if (!track) return;

        // Access Logic (Mirrors render logic)
        let album = track.albumId ? albums.find(a => a.id === track.albumId) : undefined;
        if (!album) album = albums.find(a => a.tracks.some(t => t.id === track.id));

        const uniqueId = getUniqueId(track);
        // Ensure latestSingleUid is string comparison
        const isLatestSingle = String(uniqueId) === String(latestSingleUid);

        // 1. Latest Single: Guests = Preview, Fans+ = Full
        if (isLatestSingle) {
            if (!user && audioRef.current.currentTime >= 30) {
                audioRef.current.pause();
                setIsPlaying(false);
                audioRef.current.currentTime = 0;
                setShowPreviewModal(true);
            }
            return;
        }

        // 2. Standard Album Tracks: Guest/Fan = Preview, Insider+ = Full
        const isFullAccess = isPro || isInsider;

        // If not full access, enforce 30s limit
        if (!isFullAccess && audioRef.current.currentTime >= 30) {
            audioRef.current.pause();
            setIsPlaying(false);
            audioRef.current.currentTime = 0;
            setShowPreviewModal(true);
        }
    };

    const handleBuy = async (track: Track) => {
        if (!user) {
            window.location.href = '/sign-in'; // Or show auth modal
            return;
        }

        try {
            const res = await fetch('/api/checkout', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    mode: 'payment',
                    trackId: getUniqueId(track),
                    albumId: track.albumId
                })
            });
            const data = await res.json();
            if (data.url) window.location.href = data.url;
        } catch (e) {
            console.error("Buy error", e);
            alert("Checkout failed. Please try again.");
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

    const processClaim = async () => {
        setIsClaiming(true);
        // Claim Logic
        try {
            const res = await fetch('/api/user/mixtapes/claim', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ trackIds: selectedTracks })
            });
            const data = await res.json();

            if (data.success) {
                // Update local state immediately
                if (data.remaining !== undefined) setClaimsLeft(data.remaining);

                // Trigger downloads via Modal
                if (data.links && Array.isArray(data.links) && data.links.length > 0) {
                    setDownloadLinks(data.links);
                    setShowConfirmModal(false); // Close confirm
                    setShowDownloadModal(true); // Open download
                } else {
                    // Success but no links? Likely an issue.
                    console.warn("Claim success but no links", data.debug);
                    alert(`Mixtape claimed, but no download links were generated.\nDebug: ${JSON.stringify(data.debug?.logs || "Unknown error")}`);
                    setShowConfirmModal(false);
                }
                // Clear selection
                selectedTracks.forEach(id => onToggleSelection(id));
            } else {
                alert(data.error || "Claim failed");
                setShowConfirmModal(false);
            }
        } catch (e) {
            alert("Error processing claim");
            console.error(e);
            setShowConfirmModal(false);
        } finally {
            setIsClaiming(false);
        }
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

                        const isLatestSingle = String(uniqueId) === String(latestSingleUid);
                        const isOwned = hasTrackAccess(uniqueId);

                        if (isPreRelease && !isLatestSingle) {
                            // Pre-Release (VIP Only)
                            if (!isPro) {
                                isLocked = true;
                                lockMessage = "VIP Exclusive! Upgrade to listen before release.";
                            }
                        } else {
                            // Standard Release Logic
                            if (!isOwned) {
                                isPreview = true;
                            }
                        }

                        const isCurrentTrack = activeTrackId === uniqueId;

                        return (
                            <div
                                key={uniqueId}
                                id={`track-${track.id}`}
                                className={`${styles.row} ${isCurrentTrack ? styles.active : ''} ${isLocked ? styles.locked : ''}`}
                                onClick={() => !isLocked && handlePlay(track)}
                                style={{
                                    opacity: isLocked ? 0.6 : 1,
                                    cursor: isLocked ? 'not-allowed' : 'pointer',
                                    '--index': index
                                } as React.CSSProperties}
                            >
                                {(isInsider || isPro || isLabel) && (
                                    <div
                                        className={`${styles.checkbox} ${isSelected ? styles.checked : ''}`}
                                        onClick={(e) => { e.stopPropagation(); toggleSelection(uniqueId); }}
                                    >
                                        {isSelected && <Check size={14} strokeWidth={4} />}
                                    </div>
                                )}

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

                                    {/* Buy Button for Non-Owners */}
                                    {isPreview && !isLocked && (
                                        <button
                                            className={styles.actionBtn}
                                            title="Buy Track (£0.99)"
                                            onClick={(e) => {
                                                e.stopPropagation();
                                                handleBuy(track);
                                            }}
                                            style={{ background: 'var(--accent)', color: 'white', border: 'none' }}
                                        >
                                            <ShoppingBag size={14} />
                                            <span style={{ fontSize: '0.75rem', marginLeft: '4px', fontWeight: 'bold' }}>£0.99</span>
                                        </button>
                                    )}

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

            {/* Floating Mixtape Status Box (Top Right) - Always visible for Premium to indicate feature availability */}
            {/* Floating Mixtape Status Box - Portalled to body to escape parent stacking contexts */}
            {/* Floating Mixtape Status Box - Portalled to body to escape parent stacking contexts */}
            {(isInsider || isPro || isLabel) && (
                typeof document !== 'undefined' ? (
                    // @ts-ignore - createPortal is standard but sometimes TS complains if not imported
                    createPortal(
                        <div className={styles.floatingMixtapeBox}>
                            <div className={styles.floatingHeader}>
                                <ShoppingBag size={18} color="var(--accent)" />
                                <span>Mixtape Builder</span>
                            </div>
                            <div className={styles.floatingContent}>
                                {selectedTracks.length === 0 ? (
                                    <div style={{ opacity: 0.7, fontSize: '0.9rem' }}>
                                        <div><strong>0 / {MAX_MIXTAPE_TRACKS} Selected</strong></div>
                                        <div>Tap checkboxes to add tracks</div>
                                    </div>
                                ) : (
                                    <>
                                        <strong>{selectedTracks.length} / {MAX_MIXTAPE_TRACKS} Selected</strong>
                                        <p style={{ fontSize: '0.8rem', opacity: 0.8 }}>
                                            {claimsLeft !== null
                                                ? `Remaining Claims: ${claimsLeft} / ${(isPro || isLabel ? 10 : 3)}`
                                                : (isPro || isLabel ? "VIP Limit: 10 Mixes/Month" : "Insider Limit: 3 Mixes/Month")
                                            }
                                        </p>
                                    </>
                                )}
                            </div>

                            {selectedTracks.length > 0 ? (
                                <>
                                    <button
                                        className={styles.claimBtn}
                                        onClick={() => setShowConfirmModal(true)}
                                    >
                                        Claim Mixtape 🎁
                                    </button>
                                    <button
                                        className={styles.reviewBtn}
                                        onClick={() => setShowReviewModal(true)}
                                    >
                                        Review Selection
                                    </button>
                                </>
                            ) : (
                                <div style={{ fontSize: '0.8rem', color: '#666', fontStyle: 'italic', textAlign: 'center' }}>
                                    Start selecting...
                                </div>
                            )}
                        </div>,
                        document.body
                    )
                ) : null
            )
            }

            <audio
                ref={audioRef}
                src={currentSignedUrl || undefined}
                onEnded={() => setIsPlaying(false)}
                onPause={() => setIsPlaying(false)}
                onTimeUpdate={handleTimeUpdate}
                preload="none"
            />
            {/* Preview Modal */}
            {
                showPreviewModal && (
                    <div className={styles.modalOverlay} onClick={() => setShowPreviewModal(false)}>
                        <div className={styles.modal} onClick={e => e.stopPropagation()}>
                            {user ? (
                                <>
                                    <h3 className={styles.modalTitle}>Upgrade for Full Access 🎧</h3>
                                    <p className={styles.modalText}>
                                        You've hit the preview limit on this premium track.<br />
                                        Upgrade to <strong>Insider</strong> or <strong>VIP</strong> to unlock full streaming!
                                    </p>
                                    <div className={styles.modalActions}>
                                        <a href="/club/account" className={`${styles.modalBtn} ${styles.modalBtnPrimary}`}>
                                            Upgrade Plan
                                        </a>
                                        <button className={`${styles.modalBtn} ${styles.modalBtnSecondary}`} onClick={() => setShowPreviewModal(false)}>
                                            Close
                                        </button>
                                    </div>
                                </>
                            ) : (
                                <>
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
                                </>
                            )}
                        </div>
                    </div>
                )
            }

            {/* Download Ready Modal */}
            {
                showDownloadModal && (
                    <div className={styles.modalOverlay} onClick={() => setShowDownloadModal(false)}>
                        <div className={styles.modal} onClick={e => e.stopPropagation()}>
                            <h3 className={styles.modalTitle}>Mixtape Ready! 📼</h3>
                            <p className={styles.modalText}>
                                Your tracks have been claimed successfully.<br />
                                Click below to download each one.
                            </p>
                            <div className={styles.modalActions} style={{ maxHeight: '60vh', overflowY: 'auto', paddingRight: '5px', marginBottom: '1rem' }}>
                                {downloadLinks.map((link, i) => (
                                    <div key={i} style={{ display: 'flex', gap: '8px', alignItems: 'center', marginBottom: '8px' }}>
                                        <a
                                            href={link.url}
                                            download={link.title} // Hint to browser
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className={`${styles.modalBtn} ${styles.modalBtnPrimary}`}
                                            style={{ justifyContent: 'space-between', fontSize: '0.9rem', flex: 1 }}
                                        >
                                            <span style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                                                <Download size={16} /> {link.title}
                                            </span>
                                        </a>
                                        <button
                                            className={`${styles.modalBtn} ${styles.modalBtnSecondary}`}
                                            style={{ width: '40px', padding: '0', flexShrink: 0 }}
                                            title="Copy Link"
                                            onClick={(e) => {
                                                e.stopPropagation();
                                                navigator.clipboard.writeText(link.url);
                                                alert("Link copied!");
                                            }}
                                        >
                                            <Share2 size={16} />
                                        </button>
                                    </div>
                                ))}
                            </div>
                            <button className={`${styles.modalBtn} ${styles.modalBtnSecondary}`} onClick={() => setShowDownloadModal(false)}>
                                Done
                            </button>
                        </div>
                    </div>
                )
            }

            {/* Confirm Claim Modal */}
            {
                showConfirmModal && (
                    <div className={styles.modalOverlay} onClick={() => !isClaiming && setShowConfirmModal(false)}>
                        <div className={styles.modal} onClick={e => e.stopPropagation()}>
                            <h3 className={styles.modalTitle}>Confirm Claim 🎁</h3>
                            <p className={styles.modalText}>
                                Claim these {selectedTracks.length} tracks as one of your monthly mixtapes?
                                <br />
                                <small style={{ opacity: 0.7 }}>
                                    {claimsLeft !== null ? `${claimsLeft} claims remaining this month` : 'Processing...'}
                                </small>
                            </p>
                            <div className={styles.modalActions}>
                                <button
                                    className={`${styles.modalBtn} ${styles.modalBtnPrimary}`}
                                    onClick={processClaim}
                                    disabled={isClaiming}
                                    style={{ opacity: isClaiming ? 0.7 : 1 }}
                                >
                                    {isClaiming ? 'Processing...' : 'Yes, Claim Now'}
                                </button>
                                <button
                                    className={`${styles.modalBtn} ${styles.modalBtnSecondary}`}
                                    onClick={() => setShowConfirmModal(false)}
                                    disabled={isClaiming}
                                >
                                    Cancel
                                </button>
                            </div>
                        </div>
                    </div>
                )}

            {/* Review Modal */}
            {showReviewModal && (
                <div className={styles.modalOverlay} onClick={() => setShowReviewModal(false)}>
                    <div className={styles.modal} onClick={e => e.stopPropagation()}>
                        <h3 className={styles.modalTitle}>Your Selection 🎧</h3>
                        <p className={styles.modalText} style={{ marginBottom: '1.5rem' }}>
                            {selectedTracks.length} / {MAX_MIXTAPE_TRACKS} tracks selected
                        </p>

                        <div className={styles.reviewList}>
                            {selectedTracks.map(id => {
                                const track = tracks.find(t => getUniqueId(t) === id);
                                if (!track) return null;
                                return (
                                    <div key={id} className={styles.reviewItem}>
                                        <span className={styles.reviewItemTitle}>{track.title}</span>
                                        <button
                                            className={styles.removeBtn}
                                            onClick={() => toggleSelection(id)}
                                            title="Remove track"
                                        >
                                            <X size={18} />
                                        </button>
                                    </div>
                                );
                            })}
                            {selectedTracks.length === 0 && (
                                <div style={{ color: '#666', fontStyle: 'italic', padding: '1rem' }}>
                                    No tracks selected yet.
                                </div>
                            )}
                        </div>

                        <div className={styles.modalActions}>
                            <button
                                className={`${styles.modalBtn} ${styles.modalBtnPrimary}`}
                                onClick={() => {
                                    setShowReviewModal(false);
                                    if (selectedTracks.length > 0) setShowConfirmModal(true);
                                }}
                                disabled={selectedTracks.length === 0}
                            >
                                Proceed to Claim
                            </button>
                            <button
                                className={`${styles.modalBtn} ${styles.modalBtnSecondary}`}
                                onClick={() => setShowReviewModal(false)}
                            >
                                Continue Selecting
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}
