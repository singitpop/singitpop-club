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
import { getAlbumCoverUrl } from '@/lib/image-utils';
import { useAuth } from '@/context/AuthContext';
import { getAccessRules } from '@/lib/access-rules';
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

const EXPLICIT_COUNTRY_ALBUM_IDS = [
    'southern-lights-2026',
    'winding-roads-2025',
    'last-ones-standing-2026',
    'live-nashville-in-june-2026',
    'through-the-glass-2026',
    'boots-and-beats-country-line-dance-anthems-2024',
    'whispers-of-the-heart-country-ballads-for-the-soul-2024',
    'forever-starts-today-country-music-for-weddings-2024',
    'highways-of-the-heart-2024',
    'heartland-rhythms-2025',
    'dust-and-diamonds-2025',
    'line-dancing-after-dark-2025',
    'wildcards-and-whiskey-2025',
    'october-boots-and-fall-roots-2025',
    'snowfall-and-steel-strings-2025',
    'the-long-way-home-2025',
    'live-at-autumn-lights-2025',
    'live-step-into-the-light-2025',
    'desert-winds-and-open-roads-2026'
];

export default function CommunityHubPage() {
    const { user: clerkUser, isLoaded: isClerkLoaded } = useUser();
    const { isPro: isVIP, isInsider, user: authUser } = useAuth(); // Get VIP/Insider status
    const userId = clerkUser?.id;
    const router = useRouter();
    
    const [activeTab, setActiveTab] = useState('home');
    const [playlists, setPlaylists] = useState<any[]>(initialPlaylists);
    const [isLoading, setIsLoading] = useState(true);

    // ACCESS CONTROL: VIP+ Only for the whole page
    useEffect(() => {
        if (!isClerkLoaded) return;
        
        const metadata = clerkUser?.publicMetadata || {};
        const rules = getAccessRules(metadata.tier as string, metadata.role as string);
        
        if (!rules.canAccessFanZone) {
            // Redirect to upgrade
            router.push('/club');
        }
    }, [isClerkLoaded, clerkUser, router]);

    const [selectedPlaylist, setSelectedPlaylist] = useState<any>(null);
    const [currentTrackId, setCurrentTrackId] = useState<number | string | null>(null);
    const [currentTrackData, setCurrentTrackData] = useState<any>(null);
    const [activeStationGenre, setActiveStationGenre] = useState<string>('All');
    const activeStationGenreRef = useRef<string>('All'); // Ref to avoid stale closure in callbacks
    const [isPlaying, setIsPlaying] = useState(false);
    const audioRef = useRef<HTMLAudioElement | null>(null);
    const [currentSignedUrl, setCurrentSignedUrl] = useState<string | null>(null);
    const [activeSort, setActiveSort] = useState<'newest' | 'popular'>('newest');
    const [activeChallenge, setActiveChallenge] = useState<any>(null);
    const [consecutiveFailures, setConsecutiveFailures] = useState<number>(0);

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

    // Removed Radio Shuffle Logic

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
        fetch('/api/community/challenge', { cache: 'no-store' })
            .then(res => res.json())
            .then(data => {
                if (data && data.active) {
                    setActiveChallenge(data);
                } else {
                    setActiveChallenge({ title: 'New Challenge Soon!', description: 'Stay tuned for next week\'s interactive challenge.', active: false });
                }
            })
            .catch(() => {
                setActiveChallenge({ title: 'New Challenge Soon!', description: 'Stay tuned for next week\'s interactive challenge.', active: false });
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
        e.stopPropagation(); 

        if (!userId) {
            router.push('/sign-in');
            return;
        }

        const playlist = playlists.find(p => p.id === playlistId);
        if (!playlist || !playlist.tracks || playlist.tracks.length === 0) {
            alert("This playlist is empty.");
            return;
        }

        const firstTrackId = playlist.tracks[0];
        console.log(`[handlePlay] Resolving first track: ${firstTrackId}`);

        let foundTrack: any = null;
        let resolvedAlbum: any = null;
        
        // 1. Try resolving via album-track format
        const parts = String(firstTrackId).split('-');
        if (parts.length >= 2) {
            const potentialAlbumId = parts.slice(0, -1).join('-');
            const tId = parseInt(parts[parts.length - 1]);
            
            // Try exact album match first
            resolvedAlbum = albums.find(a => a.id === potentialAlbumId);
            
            // If no exact match, try fuzzy album match (folders often change)
            if (!resolvedAlbum) {
                resolvedAlbum = albums.find(a => a.id.includes(potentialAlbumId) || potentialAlbumId.includes(a.id));
            }

            foundTrack = resolvedAlbum?.tracks.find((t: any) => t.id === tId);
            if (foundTrack && resolvedAlbum) {
                foundTrack = { ...foundTrack, albumId: resolvedAlbum.id, albumTitle: resolvedAlbum.title };
            }
        }

        // 2. Global fallback - scan all albums for the numeric ID
        if (!foundTrack) {
            const numericId = parseInt(String(firstTrackId).match(/\d+/)?.[0] || "");
            if (!isNaN(numericId)) {
                for (const album of albums) {
                    const match = album.tracks.find(t => t.id === numericId);
                    if (match) {
                        resolvedAlbum = album;
                        foundTrack = { ...match, albumId: album.id, albumTitle: album.title };
                        break;
                    }
                }
            }
        }

        if (foundTrack) {
            console.log(`🎯 Playlist Auto-Resolved: "${foundTrack.title}" from album "${resolvedAlbum?.title}"`);
            // USE THE EXACT ID FORMAT THE UI EXPECTS: track-[originalId]
            handleTrackPlay({ 
                ...foundTrack, 
                id: `track-${firstTrackId}`, 
                albumId: resolvedAlbum?.id, 
                albumTitle: resolvedAlbum?.title 
            });
        } else {
            console.error(`❌ Resolution failed for track ID: ${firstTrackId}`);
            alert("Sorry, we couldn't find the audio for this track. It may have been moved or removed.");
            setIsLoading(false);
        }
    };

    const handleTrackPlay = async (track: any) => {
        if (!track || !track.audioUrl) {
            console.warn("Invalid track requested:", track);
            // Guard removed
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

        // 🚀 Browser Hack: Prime the audio element immediately on user-click tick
        // This ensures the browser grants permission for subsequent .play() calls
        // even after the async Signing API fetch.
        if (audioRef.current) {
            console.log("🔊 Priming audio element for:", track.title);
            audioRef.current.load(); 
        }

        // Keep the ORIGINAL ID for UI consistency (e.g., "track-Nashville-1")
        const originalTrackId = track.id;
        
        // NEW: Resolve FRESH track data from master albums.json to ensure audioUrl is current
        let freshTrack = { ...track };
        const trackIdStr = String(track.id);
        
        // Handle track-XX or album-XX-trackXX formats to get the numeric track ID
        const trackIdMatch = trackIdStr.match(/(\d+)$/);
        const resolvedNumericId = trackIdMatch ? parseInt(trackIdMatch[1]) : (typeof track.id === 'number' ? track.id : null);
        
        if (resolvedNumericId) {
            for (const album of albums) {
                const match = album.tracks.find(t => t.id === resolvedNumericId);
                if (match) {
                    freshTrack = { ...match, albumId: album.id, albumTitle: album.title };
                    break;
                }
            }
        }

        // IMPORTANT: Use the original track ID (which has prefixes like "track-") for currentTrackId state
        // This ensures the isPlaying comparison in the UI works correctly.
        setCurrentTrackId(originalTrackId);
        setCurrentTrackData(freshTrack);

        try {
            console.log(`🔐 Signing audio URL for: "${freshTrack.title}" | ID: ${originalTrackId}`);
            const res = await fetch('/api/music/sign', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ 
                    url: freshTrack.audioUrl,
                    title: freshTrack.title,
                    albumId: freshTrack.albumId,
                    sourceFolder: freshTrack.sourceFolder
                })
            });

            if (!res.ok) {
                const errorText = await res.text();
                console.error(`❌ Sign API failed (${res.status}):`, errorText);
                throw new Error(`Failed to sign URL: ${res.status}`);
            }
            
            const data = await res.json();

            if (data.signedUrl) {
                console.log(`✅ Signed URL received for: "${freshTrack.title}"`);
                setCurrentSignedUrl(data.signedUrl);

                // Reset Audio Props safely
                if (audioRef.current) {
                    audioRef.current.volume = 1.0;
                    audioRef.current.muted = false;
                }

                setIsPlaying(true);
            } else {
                throw new Error("No signed URL returned");
            }
        } catch (e: any) {
            console.error(`❌ Track play error:`, e.message);
            alert(`Playback Error: ${e.message}. Please try again.`);
        } finally {
            setIsLoading(false);
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

    const getPlaylistArtwork = (playlist: any) => {
        if (!playlist || !playlist.tracks) return [];

        // Take up to 4 tracks
        const trackIds = playlist.tracks.slice(0, 4);
        const imageUrls: string[] = [];

        trackIds.forEach((tId: string | number) => {
            const parts = String(tId).split('-');
            if (parts.length >= 2) {
                const aId = parts.slice(0, -1).join('-');
                const album = albums.find(a => a.id === aId);
                if (album) {
                    imageUrls.push(getAlbumCoverUrl(album));
                }
            } else {
                const idNum = parseInt(String(tId));
                for (const album of albums) {
                    if (album.tracks.some(t => t.id === idNum)) {
                        imageUrls.push(getAlbumCoverUrl(album));
                        break;
                    }
                }
            }
        });

        // Remove duplicates
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

                    {(activeTab === 'browse' || activeTab === 'my-mixes' || activeTab === 'favorites') && (
                        <div className={styles.tabContent}>
                            <div className={styles.sectionHeader}>
                                <h2>
                                    {activeTab === 'browse' ? 'Browse All Mixes' : 
                                     activeTab === 'my-mixes' ? 'My Custom Mixes' : 'My Favorite Mixes'}
                                </h2>
                                <div className={styles.sortControls}>
                                    <button 
                                        className={activeSort === 'newest' ? styles.activeSort : ''} 
                                        onClick={() => setActiveSort('newest')}
                                    >
                                        Newest
                                    </button>
                                    <button 
                                        className={activeSort === 'popular' ? styles.activeSort : ''} 
                                        onClick={() => setActiveSort('popular')}
                                    >
                                        Popular
                                    </button>
                                </div>
                            </div>

                            {getSortedPlaylists().length > 0 ? (
                                <div className={styles.playlistGrid}>
                                    {getSortedPlaylists().map(playlist => (
                                        <PlaylistCard
                                            key={playlist.id}
                                            playlist={playlist}
                                            coverImages={playlist.trackArtworks?.length > 0 ? playlist.trackArtworks : getPlaylistArtwork(playlist)}
                                            isPlaying={isPlaying && currentTrackId === `track-${playlist.tracks[0]}`}
                                            onPlay={(e) => handlePlay(e, playlist.id)}
                                            onClick={() => setSelectedPlaylist(playlist)}
                                            onLike={() => handleLike(playlist.id)}
                                            hasLiked={playlist.likedBy?.includes(userId)}
                                        />
                                    ))}
                                </div>
                            ) : (
                                <div className={styles.emptyState}>
                                    <div className={styles.emptyIcon}>💿</div>
                                    <h3>No mixes found</h3>
                                    <p>
                                        {activeTab === 'favorites' ? "You haven't liked any mixes yet." : 
                                         activeTab === 'my-mixes' ? "You haven't created any custom mixes yet." : "No mixes found matching your search."}
                                    </p>
                                    {activeTab === 'my-mixes' && (
                                        <Link href="/music">
                                            <button className="primary-button" style={{ marginTop: '1rem' }}>Create a Mix in the Music Page</button>
                                        </Link>
                                    )}
                                </div>
                            )}
                        </div>
                    )}

                    {activeTab === 'radio' && (
                        <div className={styles.tabContent}>
                            <div className={styles.sectionHeader}>
                                <h2>Live Radio Stations 📡</h2>
                                <p style={{ color: '#aaa', fontSize: '0.9rem' }}>Tune in to our official 24/7 themed broadcasts.</p>
                            </div>
                            <StationView 
                                currentTrackId={currentTrackId}
                                isPlaying={isPlaying}
                                onPlayTrack={handleTrackPlay}
                                currentTrack={currentTrackData}
                                onStationChange={(genre) => setActiveStationGenre(genre)}
                                onStop={() => {
                                    setIsPlaying(false);
                                    if (audioRef.current) audioRef.current.pause();
                                }}
                            />
                        </div>
                    )}

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
                            {currentTrackData ? (
                                <>
                                    <div className={styles.waveVisual}>
                                        <div className={`${styles.bar} ${!isPlaying ? styles.paused : ''}`}></div>
                                        <div className={`${styles.bar} ${!isPlaying ? styles.paused : ''}`}></div>
                                        <div className={`${styles.bar} ${!isPlaying ? styles.paused : ''}`}></div>
                                    </div>
                                    <div style={{ minWidth: 0 }}>
                                        <p style={{ fontWeight: 'bold', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                                            {currentTrackData.title || 'Playing...'}
                                        </p>
                                        {currentTrackData.albumTitle && (
                                            <p style={{ fontSize: '0.75rem', color: '#aaa', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                                                {currentTrackData.albumTitle}
                                            </p>
                                        )}
                                        <p style={{ fontSize: '0.8rem', color: '#888' }}>{isPlaying ? 'Playing' : 'Paused'}</p>
                                    </div>
                                </>
                            ) : (
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
                            isVIP={isVIP}
                            onUpdate={(updated) => {
                                setPlaylists(prev => prev.map(p => p.id === updated.id ? updated : p));
                                setSelectedPlaylist(updated);
                            }}
                        />
                )
            }

            {/* Hidden Audio Element */}
            <audio
                ref={audioRef}
                onWaiting={() => console.log("⏳ Audio Buffering...")}
                onCanPlay={() => {
                    console.log("✅ Audio Ready to Play (Resetting failure counter)");
                    setConsecutiveFailures(0);
                }}
                onStalled={() => console.log("⚠️ Audio Stalled (Network)")}
                onEnded={() => {
                    if (activeTab === 'radio') {
                        setConsecutiveFailures(0); // Success enough
                        playNextRadioTrack();
                    } else {
                        setIsPlaying(false);
                    }
                }}
                onError={(e) => {
                    const target = e.target as HTMLAudioElement;
                    const errorMsg = target.error?.message || "Unknown error";
                    console.error("❌ Audio playback error event:", {
                        src: target.src,
                        code: target.error?.code,
                        message: errorMsg
                    });

                    // AUTO-SKIP LOGIC WITH CIRCUIT BREAKER
                    if (activeTab === 'radio') {
                        const nextFailCount = consecutiveFailures + 1;
                        setConsecutiveFailures(nextFailCount);

                        if (nextFailCount >= 5) {
                            console.error("⛔ [CIRCUIT BREAKER] Radio station unstable. Stopping playback.");
                            setIsPlaying(false);
                            alert("📡 SIGNAL INTERRUPTED: We're having trouble reaching the broadcaster. Please check back in a few minutes.");
                            // Stop flipping
                            isSwitchingRef.current = false;
                        } else {
                            // Increase skip delay slightly to dampen the 'flipping' frantic effect
                            const delay = 1500 + (nextFailCount * 500); 
                            console.log(`📻 Radio track failed. Attempt ${nextFailCount}/5. Auto-skipping in ${delay}ms...`);
                            
                            setTimeout(() => {
                                isSwitchingRef.current = false;
                                playNextRadioTrack();
                            }, delay);
                        }
                    } else {
                        setIsPlaying(false);
                        setCurrentTrackId(null);
                    }
                }}
            />
        </div >
    );
}
