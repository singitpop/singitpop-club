"use client";

import { Sparkles } from 'lucide-react';
import styles from './RecommendationStrip.module.css';

const recommendations = [
    { id: 1, title: 'Southern Lights', reason: '🔥 Latest Single', icon: '/images/icons/music-note-clean.png' },
    { id: 2, title: 'SingIt Pop Vol. 1', reason: '🎵 Latest Album', icon: '/images/icons/music-note-clean.png' },
    { id: 3, title: 'Whiskey Slide', reason: '📈 Top Trending', icon: '/images/icons/trending-clean.png' },
    { id: 4, title: 'Neon Nights', reason: '💎 Fan Favorite', icon: '/images/icons/diamond-clean.png' },
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
                            <div style={{ width: '45px', height: '45px', position: 'relative', flexShrink: 0 }}>
                                <img
                                    src={item.icon}
                                    alt=""
                                    style={{
                                        width: '100%',
                                        height: '100%',
                                        objectFit: 'contain',
                                        filter: 'drop-shadow(0 0 8px rgba(100, 100, 255, 0.4))'
                                    }}
                                />
                            </div>
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
