"use client";

import FanLeaderboard from '@/components/fans/FanLeaderboard';
import { Play, Heart, Share2, Sparkles, Filter } from 'lucide-react';
import styles from './page.module.css';

const playlists = [
    { id: 1, title: 'Summer Vibes Mix', creator: '@NeonDreamer', likes: 240, color: 'linear-gradient(135deg, #cd93ff 0%, #a5fecb 100%)', size: 'large' }, // Lavender to Mint (Fresh/Light)
    { id: 2, title: 'Sad Boi Hours', creator: '@EmoKid2000', likes: 185, color: 'linear-gradient(135deg, #e0c3fc 0%, #8ec5fc 100%)', size: 'small' }, // Soft Lavender Blue (Light)
    { id: 3, title: 'Gym Hype', creator: '@FitFam', likes: 890, color: 'linear-gradient(135deg, #ffffff 0%, #e6e6fa 100%)', size: 'medium' }, // White to Mist
    { id: 4, title: 'Midnight Drive', creator: '@NightOwl', likes: 420, color: 'linear-gradient(135deg, #5ee7df 0%, #b490ca 100%)', size: 'small' }, // Aqua to Light Purple
    { id: 5, title: 'Acoustic Covers', creator: '@GuitarHero', likes: 310, color: 'linear-gradient(135deg, #fdfbfb 0%, #ebedee 100%)', size: 'medium' }, // Pure Cloud White
    { id: 6, title: 'Party Anthems', creator: '@DJKhaledFan', likes: 1200, color: 'linear-gradient(135deg, #a18cd1 0%, #fbc2eb 100%)', size: 'large' }, // Soft Violet to Pinkish-White
];

export default function FanAlbumsPage() {
    return (
        <div className={`container ${styles.page}`}>
            {/* Spotlight Hero */}
            <section className={styles.spotlight}>
                <div className={styles.spotlightContent}>
                    <div className={styles.badge}><Sparkles size={14} /> Creator of the Month</div>
                    <h1>@NeonDreamer</h1>
                    <p className={styles.quote}>"I just wanted to capture that feeling of driving with the windows down."</p>
                    <button className={styles.listenBtn}><Play size={18} fill="currentColor" /> Listen to 'Summer Vibes'</button>
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
                                    <button className={styles.playFab}><Play size={24} fill="currentColor" /></button>
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
        </div>
    );
}
