"use client";

import styles from './Charts.module.css';

const topTracks = [
    { rank: 1, title: 'Neon Heart', change: 'up' },
    { rank: 2, title: 'Southern Lights', change: 'same' },
    { rank: 3, title: 'Whiskey Slide', change: 'down' },
    { rank: 4, title: 'Electric Soul', change: 'up' },
    { rank: 5, title: 'Midnight Drive', change: 'new' },
];

export default function Charts() {
    return (
        <div className={`glass-panel ${styles.container}`}>
            <h3>Fan Favourites 🏆</h3>
            <div className={styles.list}>
                {topTracks.map((item) => (
                    <div key={item.rank} className={styles.item}>
                        <span className={styles.rank}>#{item.rank}</span>
                        <span className={styles.title}>{item.title}</span>
                        <span className={`${styles.badge} ${styles[item.change]}`}>
                            {item.change === 'up' && '▲'}
                            {item.change === 'down' && '▼'}
                            {item.change === 'same' && '-'}
                            {item.change === 'new' && 'NEW'}
                        </span>
                    </div>
                ))}
            </div>
        </div>
    );
}
