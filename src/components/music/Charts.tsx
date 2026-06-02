"use client";

import { useMemo } from 'react';
import { Album } from '@/data/albumData';
import styles from './Charts.module.css';

interface ChartsProps {
    albums: Album[];
}

export default function Charts({ albums }: ChartsProps) {
    const topTracks = useMemo(() => {
        if (!albums || albums.length === 0) return [];

        const now = new Date();
        const activeAlbums = albums.filter(a => new Date(a.releaseDate) <= now);

        // Flatten and sort by plays
        return activeAlbums
            .flatMap(a => a.tracks.map(t => ({ ...t, albumId: a.id })))
            .sort((a, b) => {
                const playsA = parseInt(String(a.plays).replace(/[^0-9]/g, '')) || 0;
                const playsB = parseInt(String(b.plays).replace(/[^0-9]/g, '')) || 0;
                return playsB - playsA;
            })
            .slice(0, 5)
            .map((track, index) => ({
                rank: index + 1,
                title: track.title,
                change: index === 0 ? 'up' : (index === 4 ? 'down' : 'same') // Dummy change indicator
            }));
    }, [albums]);

    if (topTracks.length === 0) return null;

    return (
        <div className={`glass-panel ${styles.container}`}>
            <h3>Fan Favourites 🏆</h3>
            <div className={styles.list}>
                {topTracks.map((item) => (
                    <div key={item.rank} className={styles.item} style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', width: '100%' }}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '0.8rem' }}>
                            <span className={styles.rank}>#{item.rank}</span>
                            <span className={styles.title}>{item.title}</span>
                        </div>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                            <span className={`${styles.badge} ${styles[item.change]}`}>
                                {item.change === 'up' && '▲'}
                                {item.change === 'down' && '▼'}
                                {item.change === 'same' && '-'}
                                {item.change === 'new' && 'NEW'}
                            </span>
                            <button
                                className={styles.voteBtn}
                                style={{
                                    background: 'none',
                                    border: '1px solid rgba(255,255,255,0.2)',
                                    borderRadius: '50%',
                                    width: '24px',
                                    height: '24px',
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                    cursor: 'pointer',
                                    color: 'var(--accent)'
                                }}
                                title="Vote for this track"
                                onClick={() => alert(`Voted for ${item.title}!`)}
                            >
                                ⚡️
                            </button>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}
