"use client";

import styles from './Charts.module.css';

const topTracks = [
    { rank: 1, title: 'Desert Winds', change: 'up' },
    { rank: 2, title: 'A Love That Never Ends', change: 'same' },
    { rank: 3, title: 'Front Porch Valentine', change: 'down' },
    { rank: 4, title: 'The Silent Conversation', change: 'up' },
    { rank: 5, title: 'Slow Motion Love', change: 'new' },
];

export default function Charts() {
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
