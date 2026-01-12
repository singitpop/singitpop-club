"use client";

import { Sparkles } from 'lucide-react';
import styles from './RecommendationStrip.module.css';

const recommendations = [
    { id: 1, title: 'Southern Lights', reason: '🔥 Top Trending', icon: '🎵' },
    { id: 2, title: 'SingIt Pop Vol. 1', reason: '💿 New Album', icon: '💿' },
    { id: 3, title: 'Neon Nights', reason: '💎 Fan Favorite', icon: '🎧' },
];

export default function RecommendationStrip() {
    return (
        <section className={styles.strip}>
            <div className={`container ${styles.container}`}>
                <div className={styles.header}>
                    <Sparkles size={18} className={styles.sparkle} />
                    <span>Trending Now</span>
                </div>

                <div className={styles.items}>
                    {recommendations.map((item) => (
                        <div key={item.id} className={styles.item}>
                            <span style={{ fontSize: '1.2rem' }}>{item.icon}</span>
                            <div>
                                <span className={styles.title} style={{ display: 'block', lineHeight: '1' }}>{item.title}</span>
                                <span className={styles.reason} style={{ fontSize: '0.75rem', opacity: 0.8 }}>{item.reason}</span>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}
