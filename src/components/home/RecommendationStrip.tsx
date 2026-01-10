"use client";

import { Sparkles } from 'lucide-react';
import styles from './RecommendationStrip.module.css';

const recommendations = [
    { id: 1, title: 'Whiskey Slide', reason: 'Because you liked Southern Lights' },
    { id: 2, title: 'Neon Heart', reason: 'Similar energy' },
    { id: 3, title: 'Midnight Drive', reason: 'Fan favorite' },
];

export default function RecommendationStrip() {
    return (
        <section className={styles.strip}>
            <div className={`container ${styles.container}`}>
                <div className={styles.header}>
                    <Sparkles size={18} className={styles.sparkle} />
                    <span>Suggested for you</span>
                </div>

                <div className={styles.items}>
                    {recommendations.map((item) => (
                        <div key={item.id} className={styles.item}>
                            <span className={styles.title}>{item.title}</span>
                            <span className={styles.reason}>{item.reason}</span>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}
