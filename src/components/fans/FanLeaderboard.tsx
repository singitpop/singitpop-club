"use client";

import { Crown, Share2 } from 'lucide-react';
import { useMemo } from 'react';
import styles from './FanLeaderboard.module.css';


interface FanLeaderboardProps {
    playlists: any[];
}

export default function FanLeaderboard({ playlists }: FanLeaderboardProps) {
    // Calculate Top Fans based on number of playlists shared
    const topFans = useMemo(() => {
        const stats: Record<string, { mixes: number, likes: number }> = {};

        // Count mixes and likes per creator
        playlists.forEach(p => {
            const creator = p.creator || "Anonymous";
            if (!stats[creator]) stats[creator] = { mixes: 0, likes: 0 };

            stats[creator].mixes += 1;
            stats[creator].likes += (p.likes || 0);
        });

        // Convert to array and sort
        return Object.entries(stats)
            .map(([name, data], index) => {
                // Score = (Mixes * 50) + (Likes * 10) + Random Activity Bonus (Voting etc)
                const activityBonus = Math.floor(Math.random() * 20);
                const score = (data.mixes * 50) + (data.likes * 10) + activityBonus;

                return {
                    name,
                    score,
                    avatar: ["✨", "🎵", "🇬🇧", "🎧", "📈"][index % 5] || "👤"
                };
            })
            .sort((a, b) => b.score - a.score)
            .slice(0, 5)
            .map((fan, i) => ({ ...fan, rank: i + 1 }));

    }, [playlists]);

    if (topFans.length === 0) {
        return (
            <div className={styles.container}>
                <div className={styles.header}>
                    <h3><Crown size={16} color="var(--accent)" /> Top Fans</h3>
                </div>
                <div className={styles.list} style={{ textAlign: 'center', padding: '1rem', color: '#666' }}>
                    No activity yet. Be the first!
                </div>
            </div>
        );
    }

    return (
        <div className={styles.container}>
            <div className={styles.header}>
                <h3><Crown size={16} color="var(--accent)" /> Top Fans</h3>
                <span className={styles.week}>All Time</span>
            </div>

            <div className={styles.list}>
                {topFans.map((fan: any) => (
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
