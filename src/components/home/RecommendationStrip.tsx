"use client";

import { Sparkles } from 'lucide-react';
import styles from './RecommendationStrip.module.css';

const recommendations = [
    { id: 1, title: 'Southern Lights', reason: '🔥 Latest Single', icon: '🎵' },
    { id: 2, title: 'SingIt Pop Vol. 1', reason: '💿 Latest Album', icon: '💿' },
    { id: 3, title: 'Whiskey Slide', reason: '📈 Top Trending', icon: '🚀' },
    { id: 4, title: 'Neon Nights', reason: '💎 Fan Favorite', icon: '🎧' },
];

// Duplicate list for seamless loop effect
const loopItems = [...recommendations, ...recommendations, ...recommendations];

export default function RecommendationStrip() {
    return (
        <section className={styles.strip}>
            <div className={styles.container}>
                {/* Header removed for ticker style, or we can make it part of the item */}
                <div className={styles.items}>
                    {loopItems.map((item, index) => (
                        <div key={`${item.id}-${index}`} className={styles.item}>
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
