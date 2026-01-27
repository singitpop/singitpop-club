import SidebarNav from '@/components/fans/SidebarNav';
import PlaylistViewer from '@/components/fans/PlaylistViewer';
import FanLeaderboard from '@/components/fans/FanLeaderboard';
import { Play, Heart, Share2, Sparkles, Filter, Pause, Search } from 'lucide-react';
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

// Enhanced Mock Data
const playlists = [
    { id: 1, title: 'Summer Vibes Mix', creator: '@NeonDreamer', likes: 240, color: 'linear-gradient(135deg, #cd93ff 0%, #a5fecb 100%)', size: 'large' },
    { id: 2, title: 'Sad Boi Hours', creator: '@EmoKid2000', likes: 185, color: 'linear-gradient(135deg, #e0c3fc 0%, #8ec5fc 100%)', size: 'small' },
    { id: 3, title: 'Gym Hype', creator: '@FitFam', likes: 890, color: 'linear-gradient(135deg, #ffffff 0%, #e6e6fa 100%)', size: 'medium' },
    { id: 4, title: 'Midnight Drive', creator: '@NightOwl', likes: 420, color: 'linear-gradient(135deg, #5ee7df 0%, #b490ca 100%)', size: 'small' },
    { id: 5, title: 'Acoustic Covers', creator: '@GuitarHero', likes: 310, color: 'linear-gradient(135deg, #fdfbfb 0%, #ebedee 100%)', size: 'medium' },
    { id: 6, title: 'Party Anthems', creator: '@DJKhaledFan', likes: 1200, color: 'linear-gradient(135deg, #a18cd1 0%, #fbc2eb 100%)', size: 'large' },
];

export default function CommunityHubPage() {
    const [activeTab, setActiveTab] = useState('home');
    const [selectedPlaylist, setSelectedPlaylist] = useState<any>(null);
    const [playingId, setPlayingId] = useState<number | null>(null);
    const audioRef = useRef<HTMLAudioElement | null>(null);
    const [currentSignedUrl, setCurrentSignedUrl] = useState<string | null>(null);

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

        const map = trackMapping[playingId];
        if (!map) return;

        const album = albums.find(a => a.id === map.albumId);
        const track = album?.tracks.find(t => t.id === map.trackId);

        if (!track?.audioUrl) {
            setPlayingId(null);
            return;
        }

        async function playTrack() {
            try {
                const res = await fetch('/api/music/sign', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({ url: track!.audioUrl })
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
    }, [playingId]);

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

                    <div className={styles.trendingGrid}>
                        {/* Highlight the top playlist specifically */}
                        <div
                            className={`${styles.trendingCard} ${styles.heroCard}`}
                            style={{ background: playlists[0].color }}
                            onClick={() => setSelectedPlaylist(playlists[0])}
                        >
                            <div className={styles.cardContent}>
                                <div className={styles.cardText}>
                                    <span className={styles.tag}>#1 Trending</span>
                                    <h3>{playlists[0].title}</h3>
                                    <p>{playlists[0].creator}</p>
                                </div>
                                <button className={styles.heroPlayBtn} onClick={(e) => handlePlay(e, playlists[0].id)}>
                                    {playingId === playlists[0].id ? <Pause size={24} fill="currentColor" /> : <Play size={24} fill="currentColor" />}
                                </button>
                            </div>
                        </div>

                        {/* Smaller trending items */}
                        <div className={styles.miniGrid}>
                            {playlists.slice(1, 3).map(playlist => (
                                <div
                                    key={playlist.id}
                                    className={`${styles.trendingCard} ${styles.miniCard}`}
                                    style={{ background: playlist.color }}
                                    onClick={() => setSelectedPlaylist(playlist)}
                                >
                                    <div className={styles.cardContent}>
                                        <h4>{playlist.title}</h4>
                                        <button className={styles.miniPlayBtn} onClick={(e) => handlePlay(e, playlist.id)}>
                                            {playingId === playlist.id ? <Pause size={16} fill="currentColor" /> : <Play size={16} fill="currentColor" />}
                                        </button>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Recommendations / Grid */}
                    <div className={styles.sectionHeader} style={{ marginTop: '2rem' }}>
                        <h2>Fresh Mixes 🎧</h2>
                        <button className={styles.filterBtn}><Filter size={16} /> Filter</button>
                    </div>

                    <div className={styles.masonry}>
                        {playlists.map((playlist) => (
                            <div key={playlist.id} className={styles.card} style={{ background: playlist.color }} onClick={() => setSelectedPlaylist(playlist)}>
                                <div className={styles.cardOverlay}>
                                    <button className={styles.playFab} onClick={(e) => handlePlay(e, playlist.id)}>
                                        {playingId === playlist.id ? <Pause size={24} fill="currentColor" /> : <Play size={24} fill="currentColor" />}
                                    </button>
                                    <div className={styles.cardInfo}>
                                        <h4>{playlist.title}</h4>
                                        <div className={styles.meta}>
                                            <span>{playlist.creator}</span>
                                            <span className={styles.likes}><Heart size={12} fill="currentColor" /> {playlist.likes}</span>
                                        </div>
                                    </div>
                                </div>
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

                    <FanLeaderboard />

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
                onError={(e) => { console.error("Audio error", e); setPlayingId(null); }}
            />
        </div>
    );
}
