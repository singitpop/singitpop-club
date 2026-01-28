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
        const counts: Record<string, number> = {};

        // Count mixes per creator
        playlists.forEach(p => {
            const creator = p.creator || "Anonymous";
            counts[creator] = (counts[creator] || 0) + 1;
        });

        // Convert to array and sort
        return Object.entries(counts)
            .map(([name, count], index) => ({
                name,
                score: count * 100 + Math.floor(Math.random() * 50), // Mock score logic: 100 pts per mix + activity bonus
                avatar: ["✨", "🎵", "🇬🇧", "🎧", "📈"][index % 5] || "👤"
            }))
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
