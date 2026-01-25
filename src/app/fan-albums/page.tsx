"use client";

import FanLeaderboard from '@/components/fans/FanLeaderboard';
import { Play, Heart, Share2, Sparkles, Filter, Pause } from 'lucide-react';
import styles from './page.module.css';
import { useState, useRef, useEffect } from 'react';
import { albums } from '@/data/albumData';

// Map playlist IDs to real tracks for demo purposes
const trackMapping: Record<number, { albumId: string, trackId: number }> = {
    1: { albumId: 'a-love-that-never-ends-2026', trackId: 1 }, // Summer Vibes -> Slow Motion Love
    2: { albumId: 'echoes-of-light-2026', trackId: 1 }, // Sad Boi -> The Silent Conversation
    3: { albumId: 'desert-winds-and-open-roads-2026', trackId: 1 }, // Gym -> Riding Down the Line
    4: { albumId: 'valentine-country-2026', trackId: 1 }, // Midnight -> Front Porch
    5: { albumId: 'echoes-of-light-2026', trackId: 2 }, // Acoustic -> Stillness
    6: { albumId: 'a-love-that-never-ends-2026', trackId: 4 }, // Party -> Unspoken Fire
};

const playlists = [
    { id: 1, title: 'Summer Vibes Mix', creator: '@NeonDreamer', likes: 240, color: 'linear-gradient(135deg, #cd93ff 0%, #a5fecb 100%)', size: 'large' }, // Lavender to Mint (Fresh/Light)
    { id: 2, title: 'Sad Boi Hours', creator: '@EmoKid2000', likes: 185, color: 'linear-gradient(135deg, #e0c3fc 0%, #8ec5fc 100%)', size: 'small' }, // Soft Lavender Blue (Light)
    { id: 3, title: 'Gym Hype', creator: '@FitFam', likes: 890, color: 'linear-gradient(135deg, #ffffff 0%, #e6e6fa 100%)', size: 'medium' }, // White to Mist
    { id: 4, title: 'Midnight Drive', creator: '@NightOwl', likes: 420, color: 'linear-gradient(135deg, #5ee7df 0%, #b490ca 100%)', size: 'small' }, // Aqua to Light Purple
    { id: 5, title: 'Acoustic Covers', creator: '@GuitarHero', likes: 310, color: 'linear-gradient(135deg, #fdfbfb 0%, #ebedee 100%)', size: 'medium' }, // Pure Cloud White
    { id: 6, title: 'Party Anthems', creator: '@DJKhaledFan', likes: 1200, color: 'linear-gradient(135deg, #a18cd1 0%, #fbc2eb 100%)', size: 'large' }, // Soft Violet to Pinkish-White
];

export default function FanAlbumsPage() {
    const [playingId, setPlayingId] = useState<number | null>(null);
    const audioRef = useRef<HTMLAudioElement | null>(null);
    const [currentSignedUrl, setCurrentSignedUrl] = useState<string | null>(null);

    // Stop audio when component unmounts
    useEffect(() => {
        return () => {
            if (audioRef.current) {
                audioRef.current.pause();
            }
        };
    }, []);

    // Handle Signed URL fetching and playback
    useEffect(() => {
        if (!playingId) {
            if (audioRef.current) audioRef.current.pause();
            return;
        }

        const map = trackMapping[playingId];
        if (!map) return;

        const album = albums.find(a => a.id === map.albumId);
        const track = album?.tracks.find(t => t.id === map.trackId);

        if (!track || !track.audioUrl) {
            console.error("Track not found or no audio URL");
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
                if (data.signedUrl) {
                    setCurrentSignedUrl(data.signedUrl);
                    // Audio element will auto-play when src changes effectively if we manage it right, 
                    // but safer to trigger play() in a useEffect dependency on url
                }
            } catch (error) {
                console.error("Playback error:", error);
                setPlayingId(null);
            }
        }

        playTrack();
    }, [playingId]);

    // Effect to trigger play when URL updates
    useEffect(() => {
        if (currentSignedUrl && audioRef.current) {
            audioRef.current.src = currentSignedUrl;
            audioRef.current.play().catch(e => console.error("Play failed:", e));
        }
    }, [currentSignedUrl]);

    const handlePlay = (id: number) => {
        if (playingId === id) {
            setPlayingId(null); // Pause/Stop
            if (audioRef.current) audioRef.current.pause();
        } else {
            setPlayingId(id);
        }
    };

    return (
        <div className={`container ${styles.page}`}>
            {/* Spotlight Hero */}
            <section className={styles.spotlight}>
                <div className={styles.spotlightContent}>
                    <div className={styles.badge}><Sparkles size={14} /> Creator of the Month</div>
                    <h1>@NeonDreamer</h1>
                    <p className={styles.quote}>"I just wanted to capture that feeling of driving with the windows down."</p>
                    <button className={styles.listenBtn} onClick={() => handlePlay(1)}>
                        {playingId === 1 ? <Pause size={18} fill="currentColor" /> : <Play size={18} fill="currentColor" />}
                        {playingId === 1 ? "Listening..." : "Listen to 'Summer Vibes'"}
                    </button>
                </div>
                <div className={styles.spotlightVisual} />
            </section>

            <div className={styles.grid}>
                <div className={styles.mainContent}>
                    <div className={styles.filterBar}>
                        <button className={styles.activeFilter}>All</button>
                        <button>Chill</button>
                        <button>Hype</button>
                        <button>Remix</button>
                        <button className={styles.filterBtn}><Filter size={16} /> Filter</button>
                    </div>

                    <div className={styles.masonry}>
                        {playlists.map((playlist) => (
                            <div key={playlist.id} className={styles.card} style={{ background: playlist.color }}>
                                <div className={styles.cardOverlay}>
                                    <button className={styles.playFab} onClick={() => handlePlay(playlist.id)}>
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
                </div>

                <div className={styles.sidebarSecondary}>
                    <div className={styles.rulesCard}>
                        <h4>Rank Up 📈</h4>
                        <ul>
                            <li>+10 pts / Like</li>
                            <li>+20 pts / Share</li>
                        </ul>
                        <button className={styles.joinBtn}>Join Leaderboard</button>
                    </div>
                </div>

                <div className={styles.sidebarPrimary}>
                    <div className={styles.challengeCard}>
                        <h3> Weekly Challenge 🎯</h3>
                        <p>Create a "Rainy Day" playlist using at least 3 tracks from *Blue Horizon*.</p>
                        <button className={styles.challengeBtn}>Accept Challenge</button>
                    </div>
                    <FanLeaderboard />
                </div>
            </div>

            {/* Hidden Audio Element */}
            <audio
                ref={audioRef}
                onEnded={() => setPlayingId(null)}
                onError={(e) => { console.error("Audio error", e); setPlayingId(null); }}
            />
        </div>
    );
}
