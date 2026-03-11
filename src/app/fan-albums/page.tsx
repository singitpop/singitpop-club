"use client";

import { useUser } from '@clerk/nextjs';

import SidebarNav from '@/components/fans/SidebarNav';
import PlaylistViewer from '@/components/fans/PlaylistViewer';
import FanLeaderboard from '@/components/fans/FanLeaderboard';
import PlaylistCard from '@/components/fans/PlaylistCard';
import VotingSection from '@/components/fans/VotingSection'; // New Import
import StationView from '@/components/fans/StationView'; // New Import
import { Search, Filter, TrendingUp, Clock } from 'lucide-react';
import styles from './page.module.css';
import { useState, useRef, useEffect } from 'react';
import { albums } from '@/data/albumData';
import { useAuth } from '@/context/AuthContext';
import Roadmap from '@/components/fans/Roadmap';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

// Map playlist IDs to real tracks for demo purposes
const trackMapping: Record<number, { albumId: string, trackId: number }> = {
    1: { albumId: 'a-love-that-never-ends-2026', trackId: 1 },
    2: { albumId: 'echoes-of-light-2026', trackId: 1 },
    3: { albumId: 'desert-winds-and-open-roads-2026', trackId: 1 },
    4: { albumId: 'valentine-country-2026', trackId: 1 },
    5: { albumId: 'echoes-of-light-2026', trackId: 2 },
    6: { albumId: 'a-love-that-never-ends-2026', trackId: 4 },
};

// Initial Mock Data (Fallback)
const initialPlaylists: any[] = [];

export default function CommunityHubPage() {
    const { user: clerkUser } = useUser();
    const { isPro: isVIP, isInsider } = useAuth(); // Get VIP/Insider status
    const userId = clerkUser?.id;
    const router = useRouter();
    const [activeTab, setActiveTab] = useState('home');
    const [playlists, setPlaylists] = useState<any[]>(initialPlaylists);
    const [isLoading, setIsLoading] = useState(true);

    const [selectedPlaylist, setSelectedPlaylist] = useState<any>(null);
    const [currentTrackId, setCurrentTrackId] = useState<number | string | null>(null);
    const [isPlaying, setIsPlaying] = useState(false);
    const audioRef = useRef<HTMLAudioElement | null>(null);
    const [currentSignedUrl, setCurrentSignedUrl] = useState<string | null>(null);
    const [activeSort, setActiveSort] = useState<'newest' | 'popular'>('newest');
    const [activeChallenge, setActiveChallenge] = useState<any>(null);

    const getSortedPlaylists = () => {
        let filtered = [...playlists];

        // Filter by Tab
        if (activeTab === 'favorites' && userId) {
            filtered = filtered.filter(p => p.likedBy && p.likedBy.includes(userId));
        }

        if (activeTab === 'my-mixes' && userId) {
            // Filter by creatorId or userId
            filtered = filtered.filter(p => p.userId === userId || p.creatorId === userId);
        }

        const sorted = filtered;
        if (activeSort === 'newest') {
            sorted.sort((a, b) => {
                const idA = parseInt(String(a.id)) || 0;
                const idB = parseInt(String(b.id)) || 0;
                return idB - idA;
            });
        } else {
            // Popular = Most Likes
            sorted.sort((a, b) => (b.likes || 0) - (a.likes || 0));
        }
        return sorted;
    };

    // Prevent rapid-fire clicks
    const isSwitchingRef = useRef(false);

    // Extracted Shuffle Logic
    const playNextRadioTrack = () => {
        // Get all valid tracks (must have audioUrl)
        // Also exclude the CURRENT track to prevent repeating the same broken one
        const now = new Date();

        const allTracks = albums.flatMap(a => {
            // VIP Check
            if (!isVIP && new Date(a.releaseDate) > now) return [];

            return a.tracks.filter(t => t.audioUrl && t.id !== currentTrackId);
        });

        if (allTracks.length === 0) {
            console.error("No valid tracks found for radio");
            return;
        }

        const randomTrack = allTracks[Math.floor(Math.random() * allTracks.length)];
        const album = albums.find(a => a.tracks.some(t => t.id === randomTrack.id));

        console.log("📻 Auto-skipping to:", randomTrack.title);

        handleTrackPlay({
            ...randomTrack,
            id: randomTrack.id, // Original ID
            uniqueId: `${album?.id}-${randomTrack.id}`,
            albumId: album?.id,
            audioUrl: randomTrack.audioUrl
        });
    };

    // Fetch Live Community Playlists
    useEffect(() => {
        async function fetchPlaylists() {
            try {
                const res = await fetch('/api/community/playlist');
                if (res.ok) {
                    const data = await res.json();
                    if (Array.isArray(data)) {
                        setPlaylists(data);
                    }
                }
            } catch (e) {
                console.error("Failed to fetch community playlists", e);
            } finally {
                setIsLoading(false);
            }
        }

        fetchPlaylists();

        // Fetch Active Challenge
        fetch('/api/community/challenge', { cache: 'no-store' }).then(res => res.json()).then(data => {
            if (data && data.active) {
                setActiveChallenge(data);
            }
        });
    }, []);

    // Stop audio/effects on unmount
    useEffect(() => {
        return () => {
            if (audioRef.current) audioRef.current.pause();
        };
    }, []);

    // Handle Playback Logic (Side Effects for Audio Element)
    useEffect(() => {
        if (!audioRef.current) return;

        const audio = audioRef.current;

        const attemptPlay = async () => {
            if (audio.src !== currentSignedUrl) {
                // Only set SRC if different. This prevents reloading on re-renders.
                if (currentSignedUrl) {
                    audio.src = currentSignedUrl;
                    audio.load();
                    try {
                        await audio.play();
                    } catch (e: any) {
                        // Ignore AbortError which happens on rapid skipping
                        if (e.name !== 'AbortError') {
                            console.error("Play call failed:", e);
                        }
                    }
                }
            } else if (isPlaying && audio.paused) {
                // Resume
                try {
                    await audio.play();
                } catch (e: any) {
                    if (e.name !== 'AbortError') {
                        console.error("Resume call failed:", e);
                    }
                }
            }
        };

        if (isPlaying && currentSignedUrl) {
            attemptPlay();
        } else {
            // Only pause if explicitly set to false
            if (!audio.paused) audio.pause();
        }
    }, [isPlaying, currentSignedUrl]);



    // Handle Play Button Click (Card Play)
    const handlePlay = (e: React.MouseEvent, playlistId: number | string) => {
        e.stopPropagation(); // Prevent opening modal

        // AUTH CHECK: Require sign-in to play community mixes
        if (!userId) {
            router.push('/sign-in');
            return;
        }

        // Find the playlist
        const playlist = playlists.find(p => p.id === playlistId);
        if (!playlist || !playlist.tracks || playlist.tracks.length === 0) return;

        // Resolve first track ID
        const firstTrackId = playlist.tracks[0];

        // NOTE: We rely on the loose coupling here. If we click play on a playlist, we try to play its first track.
        // But we need to map "playlistId" to a "currentTrackId" check?
        // Actually, let's keep it simple: If any track FROM this playlist is playing, we pause. 
        // Otherwise, we play the first track.

        // Optimization: Check if currentTrackId belongs to this playlist? 
        // For now, if we click play on the playlist card, we just want to play the first track.

        // Logic:
        // 1. Resolve first track ID (to match format)
        // 2. See if that is currentTrackId

        // Issue: We don't easily know the Resolved Track ID without doing the split logic again.
        // Let's reuse the logic inside `handleTrackPlay` if possible, but we don't have the track object yet.

        // For now, let's call `handleTrackPlay` with the resolved first track if possible.
        // But we need to resolve it.

        // Copied resolution logic:
        let foundTrack: any = null;
        const parts = String(firstTrackId).split('-');
        let realId: string | number = firstTrackId;

        if (parts.length >= 2) {
            const aId = parts.slice(0, -1).join('-');
            const tId = parseInt(parts[parts.length - 1]);
            const album = albums.find(a => a.id === aId);
            foundTrack = album?.tracks.find(t => t.id === tId);
            // Construct unique ID used in Viewer
            if (foundTrack) foundTrack = { ...foundTrack, id: `track-${firstTrackId}` }; // Use consistent ID
        } else {
            const tId = parseInt(firstTrackId);
            for (const album of albums) {
                const match = album.tracks.find(t => t.id === tId);
                if (match) {
                    foundTrack = match;
                    foundTrack = { ...foundTrack, id: `track-${firstTrackId}` };
                    break;
                }
            }
        }

        if (foundTrack) {
            handleTrackPlay(foundTrack);
        }
    };

    const handleTrackPlay = async (track: any) => {
        if (!track || !track.audioUrl) {
            console.warn("Invalid track requested:", track);
            // If radio, skip
            if (activeTab === 'radio' && !isSwitchingRef.current) {
                playNextRadioTrack();
            }
            return;
        }

        // Debounce / Guard
        if (isSwitchingRef.current) {
            console.log("Ignored click: Track switch in progress");
            return;
        }

        // Check if same track toggling
        if (currentTrackId === track.id) {
            setIsPlaying(!isPlaying);
            return;
        }

        // ACCESS CONTROL: Prevents non-VIPs from playing unreleased tracks via playlists
        if (track.albumId) {
            // Find album to check release date
            const album = albums.find(a => a.id === track.albumId);
            if (album) {
                const releaseDate = new Date(album.releaseDate);
                const now = new Date();
                if (releaseDate > now && !isVIP) {
                    alert("This track is from an unreleased album and is exclusive to VIP members!");
                    setIsPlaying(false);
                    return;
                }
            }
        }

        // Start Switch
        isSwitchingRef.current = true;
        setIsLoading(true);
        setIsPlaying(false); // Stop previous
        setCurrentTrackId(track.id);

        try {
            // Sign URL
            console.log(`🔐 Signing audio URL for: "${track.title}" | URL: ${track.audioUrl}`);
            const res = await fetch('/api/music/sign', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ url: track.audioUrl })
            });

            if (!res.ok) {
                const errorText = await res.text();
                console.error(`❌ Sign API failed (${res.status}):`, errorText);
                throw new Error(`Failed to sign URL: ${res.status} - ${errorText}`);
            }
            const data = await res.json();

            if (data.signedUrl) {
                console.log(`✅ Signed URL received for: "${track.title}"`);
                setCurrentSignedUrl(data.signedUrl);

                // Reset Audio Props safely
                if (audioRef.current) {
                    audioRef.current.volume = 1.0;
                    audioRef.current.muted = false;
                }

                setIsPlaying(true);
            } else {
                console.error(`❌ No signed URL in response for: "${track.title}"`, data);
                throw new Error("No signed URL returned");
            }
        } catch (e) {
            console.error(`❌ Track play error for "${track.title}":`, e);

            if (activeTab === 'radio') {
                console.log("📻 Radio error -> Skipping to next track");
                setTimeout(() => {
                    isSwitchingRef.current = false; // Reset lock before recursing
                    playNextRadioTrack();
                }, 500);
                return; // Return early, don't unlock yet (the recursive call will lock)
            } else {
                setCurrentTrackId(null);
                setIsPlaying(false);
            }
        } finally {
            setIsLoading(false);
            // Only unlock if we didn't recurse into radio skip (handled above)
            // Actually, safe to just unlock after a short delay to ensure UI updates
            setTimeout(() => {
                isSwitchingRef.current = false;
            }, 300);
        }
    };

    const handleLike = async (playlistId: string | number) => {
        if (!userId) {
            router.push('/sign-in'); // Redirect to sign in if not logged in (using clerk)
            return;
        }

        // Optimistic Update
        let isLiked = false;
        setPlaylists(prev => prev.map(p => {
            if (p.id === playlistId) {
                const likedBy = p.likedBy || [];
                const alreadyLiked = likedBy.includes(userId);
                isLiked = !alreadyLiked;

                return {
                    ...p,
                    likes: alreadyLiked ? (p.likes - 1) : (p.likes + 1),
                    likedBy: alreadyLiked ? likedBy.filter((id: string) => id !== userId) : [...likedBy, userId]
                };
            }
            return p;
        }));

        // Update selectedPlaylist if it matches, to reflect in modal instantly
        if (selectedPlaylist && selectedPlaylist.id === playlistId) {
            setSelectedPlaylist((prev: any) => {
                const likedBy = prev.likedBy || [];
                const alreadyLiked = likedBy.includes(userId);
                return {
                    ...prev,
                    likes: alreadyLiked ? (prev.likes - 1) : (prev.likes + 1),
                    likedBy: alreadyLiked ? likedBy.filter((id: string) => id !== userId) : [...likedBy, userId]
                };
            });
        }

        try {
            const res = await fetch('/api/community/playlist/like', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ playlistId })
            });

            if (!res.ok) {
                // Revert on failure (complex to revert exact state, but fetching fresh might be better)
                // For now, accept occasional desync on error
                console.error("Like failed");
            }
        } catch (e) {
            console.error(e);
        }
    };

    const handleDeletePlaylist = async (playlistId: string) => {
        try {
            const res = await fetch(`/api/community/playlist?id=${playlistId}`, {
                method: 'DELETE'
            });
            if (res.ok) {
                // Remove from state
                setPlaylists(prev => prev.filter(p => p.id !== playlistId));
                setSelectedPlaylist(null); // Close modal
                // If it was playing, maybe stop?
                if (currentTrackId && String(currentTrackId).includes(String(playlistId))) {
                    setIsPlaying(false);
                    setCurrentTrackId(null);
                }
            } else {
                alert("Failed to delete playlist. You might not have permission.");
            }
        } catch (e) {
            console.error("Delete failed", e);
            alert("Error deleting playlist");
        }
    };

    // Helper: Get artwork URLs for a playlist
    const getPlaylistArtwork = (playlist: any) => {
        if (!playlist || !playlist.tracks) return [];

        // Take up to 4 tracks
        const trackIds = playlist.tracks.slice(0, 4);
        const imageUrls: string[] = [];

        trackIds.forEach((tId: string | number) => {
            // Logic to find artwork from albumData
            const parts = String(tId).split('-');
            if (parts.length >= 2) {
                const aId = parts.slice(0, -1).join('-');
                const album = albums.find(a => a.id === aId);
                if (album) imageUrls.push(album.coverArt);
            } else {
                // Try brute force search if just number
                const idNum = parseInt(String(tId));
                for (const album of albums) {
                    if (album.tracks.some(t => t.id === idNum)) {
                        imageUrls.push(album.coverArt);
                        break;
                    }
                }
            }
        });

        // Remove duplicates if multiple tracks from same album
        return Array.from(new Set(imageUrls)).slice(0, 4);
    };



    return (
        <div className={`container ${styles.pageContainer}`}>
            <div className={styles.appLayout}>
                {/* Left Sidebar: Navigation */}
                <aside className={styles.sidebarLeft}>
                    <SidebarNav activeTab={activeTab} onTabChange={setActiveTab} />
                </aside>

                {/* Center: Feed / Main Content */}
                <main className={styles.feed}>
                    {/* Header / Search - Hide on Radio Tab */}
                    {activeTab !== 'radio' && (
                        <div className={styles.feedHeader}>
                            <div className={styles.searchBar}>
                                <Search size={18} color="var(--text-muted)" />
                                <input type="text" placeholder="Search artists, mixes, vibes..." />
                            </div>
                            <div className={styles.profileBadge}>
                                <span>Gary Birrell</span>
                                <div className={styles.avatar}>GB</div>
                            </div>
                        </div>
                    )}

                    {activeTab === 'home' && (
                        <>
                            {/* Spotlight / Trending Section */}
                            <div className={styles.sectionHeader}>
                                <h2>Trending Right Now 🔥</h2>
                                {isInsider && <button className={styles.seeAllBtn}>See all</button>}
                            </div>

                            {/* Featured / Trending Grid - LOCKED for non-insiders */}
                            {isInsider ? (
                                playlists.length > 0 ? (
                                    <div className={styles.trendingGrid}>
                                        {playlists.slice(0, 3).map(playlist => (
                                            <div key={playlist.id} className={styles.trendingCardWrapper}>
                                                <PlaylistCard
                                                    playlist={playlist}
                                                    coverImages={getPlaylistArtwork(playlist)}
                                                    isPlaying={isPlaying && currentTrackId === `track-${playlist.tracks[0]}`}
                                                    onPlay={(e) => handlePlay(e, playlist.id)}
                                                    onClick={() => setSelectedPlaylist(playlist)}
                                                    onLike={() => handleLike(playlist.id)}
                                                    hasLiked={playlist.likedBy?.includes(userId)}
                                                />
                                            </div>
                                        ))}
                                    </div>
                                ) : (
                                    <div style={{ padding: '2rem', textAlign: 'center', color: '#666' }}>
                                        {isLoading ? "Loading Community Hub..." : "No playlists shared yet. Be the first!"}
                                    </div>
                                )
                            ) : (
                                // LOCKED STATE FOR NON-INSIDERS
                                <div className="flex flex-col items-center justify-center p-12 text-center bg-white/5 rounded-3xl border border-white/10 m-4">
                                    <div className="w-16 h-16 bg-purple-600/20 rounded-full flex items-center justify-center mb-4">
                                        <TrendingUp size={32} className="text-purple-400" />
                                    </div>
                                    <h3 className="text-2xl font-bold mb-2">Community Mixes Locked</h3>
                                    <p className="text-white/60 max-w-md mb-6">
                                        Only Insiders can browse and listen to community-created mixes. Join the club to unlock this feature.
                                    </p>
                                    <Link href="/membership" className="px-6 py-3 bg-white text-black font-bold rounded-full hover:scale-105 transition-transform">
                                        Unlock Community Access
                                    </Link>
                                </div>
                            )}

                            {/* Voting Section */}
                            <VotingSection />
                        </>
                    )}




                    {activeTab === 'radio' && (
                        isVIP ? (
                            <StationView
                                currentTrackId={currentTrackId}
                                isPlaying={isPlaying}
                                onPlayTrack={handleTrackPlay}
                                currentTrack={(() => {
                                    if (!currentTrackId) return undefined;
                                    const parts = String(currentTrackId).split('-');
                                    if (parts.length >= 2) {
                                        const aId = parts.slice(0, -1).join('-');
                                        const tId = parseInt(parts[parts.length - 1]);
                                        const album = albums.find(a => a.id === aId);
                                        const t = album?.tracks.find(tr => tr.id === tId);
                                        return t ? { ...t, coverArt: album?.coverArt } : undefined;
                                    }
                                    return undefined;
                                })()}
                                onNext={playNextRadioTrack}
                                onStop={() => setIsPlaying(false)}
                            />
                        ) : (
                            <div className="flex flex-col items-center justify-center h-[60vh] text-center p-8 bg-white/5 rounded-3xl border border-white/10">
                                <div className="w-20 h-20 bg-gradient-to-br from-yellow-400 to-orange-500 rounded-full flex items-center justify-center mb-6 shadow-lg shadow-orange-500/20">
                                    <Clock size={40} className="text-white" />
                                </div>
                                <h2 className="text-3xl font-bold mb-3">VIP Access Only</h2>
                                <p className="text-white/60 max-w-md mb-8">
                                    The "SingItPop Radio" station is an exclusive perk for our VIP members.
                                    Upgrade to listen to non-stop curated mixes.
                                </p>
                                <Link href="/membership" className="px-8 py-3 bg-white text-black font-bold rounded-full hover:scale-105 transition-transform">
                                    Upgrade to VIP
                                </Link>
                            </div>
                        )
                    )}

                    {/* ... (Recommendations grid code) ... */}

                </main>

                {/* Right Sidebar: Activity */}
                <aside className={styles.sidebarRight}>
                    <div className={styles.challengeCard}>
                        <h3>🎯 Weekly Challenge</h3>
                        {activeChallenge ? (
                            <>
                                <h4 style={{ color: '#4ade80', fontSize: '1.1rem', marginBottom: '0.5rem' }}>{activeChallenge.title}</h4>
                                <p>{activeChallenge.description}</p>
                                {isInsider ? (
                                    <Link href={`/fan-albums/create?challenge=${encodeURIComponent(activeChallenge.title)}`}>
                                        <button className={styles.challengeBtn}>Accept Challenge</button>
                                    </Link>
                                ) : (
                                    <div>
                                        <button disabled className={`${styles.challengeBtn} opacity-50 cursor-not-allowed mb-2`}>
                                            Locked (Insider Only)
                                        </button>
                                        <Link href="/membership" className="text-xs text-pink-400 hover:text-pink-300 underline">
                                            Join the Club to Enter
                                        </Link>
                                    </div>
                                )}
                            </>
                        ) : (
                            <p style={{ color: '#aaa', fontStyle: 'italic' }}>Loading challenge details...</p>
                        )}
                    </div>

                    <FanLeaderboard
                        playlists={playlists}
                        currentUserId={userId}
                        currentUserName={clerkUser?.firstName}
                    />

                    <div className={styles.nowPlayingWidget}>
                        <h4>Now Playing</h4>
                        <div className={styles.nowPlayingTrack}>
                            {currentTrackId ? (() => {
                                // Resolve current track title from albums data
                                let trackTitle = 'Playing...';
                                let trackArtist = '';
                                const parts = String(currentTrackId).split('-');
                                if (parts.length >= 2) {
                                    const aId = parts.slice(0, -1).join('-');
                                    const tId = parseInt(parts[parts.length - 1]);
                                    const album = albums.find(a => a.id === aId);
                                    const t = album?.tracks.find(tr => tr.id === tId);
                                    if (t) { trackTitle = t.title; trackArtist = album?.title || ''; }
                                }
                                return (
                                    <>
                                        <div className={styles.waveVisual}>
                                            <div className={`${styles.bar} ${!isPlaying ? styles.paused : ''}`}></div>
                                            <div className={`${styles.bar} ${!isPlaying ? styles.paused : ''}`}></div>
                                            <div className={`${styles.bar} ${!isPlaying ? styles.paused : ''}`}></div>
                                        </div>
                                        <div style={{ minWidth: 0 }}>
                                            <p style={{ fontWeight: 'bold', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{trackTitle}</p>
                                            {trackArtist && <p style={{ fontSize: '0.75rem', color: '#aaa', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{trackArtist}</p>}
                                            <p style={{ fontSize: '0.8rem', color: '#888' }}>{isPlaying ? 'Playing' : 'Paused'}</p>
                                        </div>
                                    </>
                                );
                            })() : (
                                <p style={{ fontSize: '0.8rem', color: '#666', fontStyle: 'italic' }}>Nothing playing...</p>
                            )}
                        </div>
                    </div>
                </aside>
            </div>

            {/* Roadmap Section */}
            {/* Roadmap Section Removed as per Phase 4 completion */}

            {/* Viewer Modal */}
            {
                selectedPlaylist && (
                    <PlaylistViewer
                        playlist={selectedPlaylist}
                        onClose={() => setSelectedPlaylist(null)}
                        onPlayTrack={handleTrackPlay}
                        currentTrackId={currentTrackId}
                        isPlaying={isPlaying}
                        onLike={() => handleLike(selectedPlaylist.id)}
                        hasLiked={selectedPlaylist.likedBy?.includes(userId)}
                        onDelete={() => handleDeletePlaylist(selectedPlaylist.id)}
                        canDelete={userId === selectedPlaylist.userId || clerkUser?.publicMetadata?.role === 'admin'}
                    />
                )
            }

            {/* Hidden Audio Element */}
            <audio
                ref={audioRef}
                onWaiting={() => console.log("⏳ Audio Buffering...")}
                onCanPlay={() => console.log("✅ Audio Ready to Play")}
                onStalled={() => console.log("⚠️ Audio Stalled (Network)")}
                onEnded={() => {
                    if (activeTab === 'radio') {
                        playNextRadioTrack();
                    } else {
                        setIsPlaying(false);
                    }
                }}
                onError={(e) => {
                    const target = e.target as HTMLAudioElement;
                    console.error("❌ Audio playback error event:", {
                        src: target.src,
                        error: target.error,
                        code: target.error?.code,
                        message: target.error?.message
                    });

                    // AUTO-SKIP LOGIC
                    if (activeTab === 'radio') {
                        console.log("📻 Radio track failed (Event). Auto-skipping in 500ms...");
                        setTimeout(() => {
                            isSwitchingRef.current = false;
                            playNextRadioTrack();
                        }, 500);

                    } else {
                        setIsPlaying(false);
                        setCurrentTrackId(null);
                    }
                }}
            />
        </div >
    );
}
