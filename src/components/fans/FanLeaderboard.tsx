"use client";

import { Crown, Trophy, Medal, Star, TrendingUp } from 'lucide-react';
import { useMemo } from 'react';
import styles from './FanLeaderboard.module.css';

interface FanLeaderboardProps {
    playlists: any[];
    currentUserId?: string | null;
    currentUserName?: string | null;
}

export default function FanLeaderboard({ playlists, currentUserId, currentUserName }: FanLeaderboardProps) {
    // Calculate Top Fans based on actual activity
    const leaderboardData = useMemo(() => {
        const stats: Record<string, { mixes: number, likes: number, userId: string, name: string }> = {};

        // 1. Process Playlists
        playlists.forEach(p => {
            const userId = p.userId || "anonymous";
            const userName = p.creator || "Anonymous Fan";

            if (!stats[userId]) {
                stats[userId] = { mixes: 0, likes: 0, userId, name: userName };
            }

            stats[userId].mixes += 1;
            stats[userId].likes += (p.likes || 0);
        });

        // 2. Ensure Current User is in the list (even if 0 points)
        if (currentUserId && !stats[currentUserId]) {
            stats[currentUserId] = {
                mixes: 0,
                likes: 0,
                userId: currentUserId,
                name: currentUserName || "You"
            };
        }

        // 3. Score & Sort
        const allFans = Object.values(stats).map(data => {
            // Score Formula: (Mixes * 50) + (Likes * 10)
            const score = (data.mixes * 50) + (data.likes * 10);

            // Assign Avatar based on score tier
            let avatar = "👤";
            if (score > 500) avatar = "👑";
            else if (score > 200) avatar = "🔥";
            else if (score > 100) avatar = "🎵";
            else if (score > 0) avatar = "🎧";

            return { ...data, score, avatar };
        });

        const sortedFans = allFans.sort((a, b) => b.score - a.score);

        // 4. Assign Ranks
        return sortedFans.map((fan, index) => ({
            ...fan,
            rank: index + 1
        }));

    }, [playlists, currentUserId, currentUserName]);

    const top3 = leaderboardData.slice(0, 3);
    const rest = leaderboardData.slice(3, 8); // Show next 5
    const currentUserStats = currentUserId ? leaderboardData.find(f => f.userId === currentUserId) : null;
    const isUserInTop8 = currentUserStats && currentUserStats.rank <= 8;

    if (leaderboardData.length === 0) return null;

    return (
        <div className={styles.container}>
            <div className={styles.header}>
                <h3><Trophy size={16} className="text-yellow-500" /> Top Superfans</h3>
                <span className={styles.week}>All Time</span>
            </div>

            {/* PODIUM SECTION */}
            <div className={styles.podium}>
                {top3[1] && (
                    <div className={`${styles.podiumPlace} ${styles.secondPlace}`}>
                        <div className={styles.avatarLarge}>{top3[1].avatar}</div>
                        <div className={styles.podiumRank}>2</div>
                        <div className={styles.podiumName}>{top3[1].name}</div>
                        <div className={styles.podiumScore}>{top3[1].score}</div>
                    </div>
                )}

                {top3[0] && (
                    <div className={`${styles.podiumPlace} ${styles.firstPlace}`}>
                        <div className={styles.crown}><Crown size={24} fill="#FFD700" color="#B8860B" /></div>
                        <div className={styles.avatarLarge}>{top3[0].avatar}</div>
                        <div className={styles.podiumRank}>1</div>
                        <div className={styles.podiumName}>{top3[0].name}</div>
                        <div className={styles.podiumScore}>{top3[0].score} pts</div>
                    </div>
                )}

                {top3[2] && (
                    <div className={`${styles.podiumPlace} ${styles.thirdPlace}`}>
                        <div className={styles.avatarLarge}>{top3[2].avatar}</div>
                        <div className={styles.podiumRank}>3</div>
                        <div className={styles.podiumName}>{top3[2].name}</div>
                        <div className={styles.podiumScore}>{top3[2].score}</div>
                    </div>
                )}
            </div>

            {/* LIST SECTION */}
            <div className={styles.list}>
                {rest.map((fan) => (
                    <div
                        key={fan.userId}
                        className={`${styles.row} ${fan.userId === currentUserId ? styles.currentUserRow : ''}`}
                    >
                        <div className={styles.rank}>{fan.rank}</div>
                        <div className={styles.info}>
                            <div className={styles.name}>{fan.name}</div>
                            <div className={styles.details}>{fan.mixes} Mixes • {fan.likes} Likes</div>
                        </div>
                        <div className={styles.score}>{fan.score} pts</div>
                    </div>
                ))}
            </div>

            {/* STICKY FOOTER (If user not visible) */}
            {currentUserStats && !isUserInTop8 && (
                <div className={styles.stickyFooter}>
                    <div className={styles.stickyLabel}>Your Rank</div>
                    <div className={styles.stickyRow}>
                        <div className={styles.rank}>{currentUserStats.rank}</div>
                        <div className={styles.info}>
                            <div className={styles.name}>You</div>
                            <div className={styles.details}>Keep mixing to climb!</div>
                        </div>
                        <div className={styles.score}>{currentUserStats.score} pts</div>
                    </div>
                </div>
            )}
        </div>
    );
}
