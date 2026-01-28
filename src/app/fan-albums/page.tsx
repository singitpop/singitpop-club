"use client";

import SidebarNav from '@/components/fans/SidebarNav';
import PlaylistViewer from '@/components/fans/PlaylistViewer';
import FanLeaderboard from '@/components/fans/FanLeaderboard';
import PlaylistCard from '@/components/fans/PlaylistCard';
import VotingSection from '@/components/fans/VotingSection'; // New Import
import { Search, Filter } from 'lucide-react';
import styles from './page.module.css';
import { useState, useRef, useEffect } from 'react';
import { albums } from '@/data/albumData';

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
    const [activeTab, setActiveTab] = useState('home');
    const [playlists, setPlaylists] = useState<any[]>(initialPlaylists);
    const [isLoading, setIsLoading] = useState(true);

    const [selectedPlaylist, setSelectedPlaylist] = useState<any>(null);
    const [playingId, setPlayingId] = useState<number | null>(null);
    const audioRef = useRef<HTMLAudioElement | null>(null);
    const [currentSignedUrl, setCurrentSignedUrl] = useState<string | null>(null);

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
    }, []);

    // Stop audio/effects on unmount
    useEffect(() => {
        return () => {
            if (audioRef.current) audioRef.current.pause();
        };
    }, []);

    // Handle Playback Logic
    useEffect(() => {
        if (!playingId) {
            if (audioRef.current) audioRef.current.pause();
            return;
        }

        // Find the track in ANY playlist's tracks (flattened search for now)
        // Since we don't have a structured backend for tracks yet, we rely on the playlists having the necessary metadata.
        // However, our `playlists` from S3 mostly have IDs.
        // Real implementation would need to resolve these IDs.
        // For this demo, let's assume we can map the stored IDs back to `albumData` locally.

        // Wait, the playlist objects from S3 store track IDs like "album-track".
        // We need to resolve that ID to a URL.

        async function playTrack() {
            try {
                // Here we cheat a bit: we need the ID to find the track.
                // But `playingId` is just a number in the original code. 
                // Let's assume we pass the FULL track object or a string ID in the future.
                // For now, if we are playing a playlist, we probably clicked play on the CARD (which is a playlist, not a track).
                // Wait, the original code played a *playlist* which mapped to a single *track*.

                // Let's keep it simple: if we click Play on a card (playlist), we play the first track of that playlist.

                const playlist = playlists.find(p => p.id === playingId);
                if (!playlist || !playlist.tracks || playlist.tracks.length === 0) return;

                const firstTrackId = playlist.tracks[0]; // "albumId-trackId" or "trackId"

                // Fetch the signed URL for this track ID via our claim/sign logic?
                // Or just use the sign endpoint if we can resolve the URL.
                // We need to resolve ID -> URL.
                // Let's assume the frontend has access to `albums` data to lookup.
                // This component doesn't import `albums`... wait, it does! line 11.

                // Resolve ID -> Track
                let foundTrack = null;
                const parts = String(firstTrackId).split('-');
                if (parts.length >= 2) {
                    const aId = parts.slice(0, -1).join('-');
                    const tId = parseInt(parts[parts.length - 1]);
                    const album = albums.find(a => a.id === aId);
                    foundTrack = album?.tracks.find(t => t.id === tId);
                } else {
                    const tId = parseInt(firstTrackId);
                    for (const a of albums) {
                        const match = a.tracks.find(t => t.id === tId);
                        if (match) { foundTrack = match; break; }
                    }
                }

                if (!foundTrack?.audioUrl) return;

                const res = await fetch('/api/music/sign', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({ url: foundTrack.audioUrl })
                });

                if (!res.ok) throw new Error("Failed to sign URL");
                const data = await res.json();
                if (data.signedUrl) setCurrentSignedUrl(data.signedUrl);

            } catch (error) {
                console.error("Playback error", error);
                setPlayingId(null);
            }
        }
        playTrack();
    }, [playingId, playlists]);

    useEffect(() => {
        if (currentSignedUrl && audioRef.current) {
            audioRef.current.src = currentSignedUrl;
            audioRef.current.play().catch(console.error);
        }
    }, [currentSignedUrl]);

    const handlePlay = (e: React.MouseEvent, id: number) => {
        e.stopPropagation(); // Prevent opening modal
        if (playingId === id) {
            setPlayingId(null);
            audioRef.current?.pause();
        } else {
            setPlayingId(id);
        }
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
                    {/* Header / Search */}
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

                    {/* Spotlight / Trending Section */}
                    <div className={styles.sectionHeader}>
                        <h2>Trending Right Now 🔥</h2>
                        <button className={styles.seeAllBtn}>See all</button>
                    </div>

                    {/* Featured / Trending Grid */}
                    {playlists.length > 0 ? (
                        <div className={styles.trendingGrid}>
                            {/* Highlight the top playlist specifically as a larger hero item */}
                            <div className={styles.heroCardWrapper}>
                                <PlaylistCard
                                    playlist={playlists[0]}
                                    isPlaying={playingId === playlists[0].id}
                                    onPlay={(e) => handlePlay(e, playlists[0].id)}
                                    onClick={() => setSelectedPlaylist(playlists[0])}
                                />
                            </div>

                            {/* Smaller trending items */}
                            <div className={styles.miniGrid}>
                                {playlists.slice(1, 3).map(playlist => (
                                    <div key={playlist.id} className={styles.miniCardWrapper}>
                                        <PlaylistCard
                                            playlist={playlist}
                                            isPlaying={playingId === playlist.id}
                                            onPlay={(e) => handlePlay(e, playlist.id)}
                                            onClick={() => setSelectedPlaylist(playlist)}
                                        />
                                    </div>
                                ))}
                            </div>
                        </div>
                    ) : (
                        <div style={{ padding: '2rem', textAlign: 'center', color: '#666' }}>
                            {isLoading ? "Loading Community Hub..." : "No playlists shared yet. Be the first!"}
                        </div>
                    )}

                    {/* Voting Section */}
                    <VotingSection />

                    {/* Recommendations / Grid */}
                    <div className={styles.sectionHeader} style={{ marginTop: '3rem' }}>
                        <h2>Fresh Mixes 🎧</h2>
                        <button className={styles.filterBtn}><Filter size={16} /> Filter</button>
                    </div>

                    <div className={styles.masonry}>
                        {playlists.map((playlist) => (
                            <div key={playlist.id} className={styles.masonryItem}>
                                <PlaylistCard
                                    playlist={playlist}
                                    isPlaying={playingId === playlist.id}
                                    onPlay={(e) => handlePlay(e, playlist.id)}
                                    onClick={() => setSelectedPlaylist(playlist)}
                                />
                            </div>
                        ))}
                    </div>
                </main>

                {/* Right Sidebar: Activity */}
                <aside className={styles.sidebarRight}>
                    <div className={styles.challengeCard}>
                        <h3> Weekly Challenge 🎯</h3>
                        <p>Create a "Rainy Day" playlist using at least 3 tracks from *Blue Horizon*.</p>
                        <button className={styles.challengeBtn}>Accept Challenge</button>
                    </div>

                    <FanLeaderboard playlists={playlists} />

                    <div className={styles.nowPlayingWidget}>
                        <h4>Now Playing</h4>
                        <div className={styles.nowPlayingTrack}>
                            {playingId ? (
                                <>
                                    <div className={styles.waveVisual}>
                                        <div className={styles.bar}></div>
                                        <div className={styles.bar}></div>
                                        <div className={styles.bar}></div>
                                    </div>
                                    <div>
                                        <p style={{ fontWeight: 'bold' }}>{playlists.find(p => p.id === playingId)?.title}</p>
                                        <p style={{ fontSize: '0.8rem', color: '#888' }}>Singitpop</p>
                                    </div>
                                </>
                            ) : (
                                <p style={{ fontSize: '0.8rem', color: '#666', fontStyle: 'italic' }}>Nothing playing...</p>
                            )}
                        </div>
                    </div>
                </aside>
            </div>

            {/* Viewer Modal */}
            {selectedPlaylist && (
                <PlaylistViewer playlist={selectedPlaylist} onClose={() => setSelectedPlaylist(null)} />
            )}

            {/* Hidden Audio Element */}
            <audio
                ref={audioRef}
                onEnded={() => setPlayingId(null)}
                onError={(e) => {
                    const target = e.target as HTMLAudioElement;
                    console.error("❌ Audio playback error:", {
                        src: target.src,
                        error: target.error,
                        code: target.error?.code,
                        message: target.error?.message,
                        readyState: target.readyState,
                        networkState: target.networkState,
                        currentSrc: target.currentSrc
                    });
                    setPlayingId(null);
                }}
            />
        </div>
    );
}
