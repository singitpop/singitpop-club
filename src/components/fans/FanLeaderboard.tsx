"use client";

import { Crown, Share2 } from 'lucide-react';
import styles from './FanLeaderboard.module.css';


const fans = [
    { rank: 1, name: "@NeonDreamer", score: 1250, avatar: "✨" },
    { rank: 2, name: "@MusicLover99", score: 1100, avatar: "🎵" },
    { rank: 3, name: "@PopStan_UK", score: 980, avatar: "🇬🇧" },
    { rank: 4, name: "@VibezOnly", score: 850, avatar: "🎧" },
    { rank: 5, name: "@ChartWatcher", score: 720, avatar: "📈" },
];

export default function FanLeaderboard() {
    return (
        <div className={styles.container}>
            <div className={styles.header}>
                <h3><Crown size={16} color="var(--accent)" /> Top Fans</h3>
                <span className={styles.week}>Week 42</span>
            </div>

            <div className={styles.list}>
                {fans.map((fan) => (
                    <div key={fan.rank} className={styles.row}>
                        <div className={`${styles.rank} ${fan.rank === 1 ? styles.rank1 : fan.rank === 2 ? styles.rank2 : fan.rank === 3 ? styles.rank3 : ''}`}>
                            {fan.rank}
                        </div>
                        <div className={styles.avatar}>{fan.avatar}</div>
                        <div className={styles.info}>
                            <div className={styles.name}>{fan.name}</div>
                            <div className={styles.score}>{fan.score} pts</div>
                        </div>
                        {fan.rank === 1 && <Crown size={14} color="#FFD700" />}
                    </div>
                ))}
            </div>

            <div style={{ marginTop: '1rem', textAlign: 'center' }}>
                <button style={{
                    background: 'transparent',
                    border: '1px solid rgba(255,255,255,0.1)',
                    color: 'var(--text-muted)',
                    fontSize: '0.8rem',
                    padding: '0.5rem 1rem',
                    borderRadius: '20px',
                    cursor: 'pointer',
                    width: '100%'
                }}>
                    View Full Board
                </button>
            </div>
        </div>
    );
}
