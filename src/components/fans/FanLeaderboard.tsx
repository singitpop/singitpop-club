"use client";

import { Crown, Share2 } from 'lucide-react';
import styles from './FanLeaderboard.module.css';

const fans = [
    { rank: 1, name: "@MusicLover99", score: 1250, avatar: "🎵" },
    { rank: 2, name: "@PopStan_UK", score: 980, avatar: "🇬🇧" },
    { rank: 3, name: "@NeonDreamer", score: 850, avatar: "✨" },
];

export default function FanLeaderboard() {
    return (
        <div className={styles.container}>
            <div className={styles.header}>
                <h3><Crown size={18} color="#ffd700" /> Top Fans</h3>
                <span className={styles.week}>This Week</span>
            </div>

            <div className={styles.list}>
                {fans.map((fan) => (
                    <div key={fan.rank} className={styles.row}>
                        <div className={styles.rank}>{fan.rank}</div>
                        <div className={styles.avatar}>{fan.avatar}</div>
                        <div className={styles.info}>
                            <div className={styles.name}>{fan.name}</div>
                            <div className={styles.score}>{fan.score} pts</div>
                        </div>
                        <Crown size={14} className={fan.rank === 1 ? styles.gold : styles.muted} />
                    </div>
                ))}
            </div>
        </div>
    );
}
