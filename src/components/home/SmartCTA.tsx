"use client";

import styles from './SmartCTA.module.css';

export default function SmartCTA() {
    return (
        <section className={styles.section}>
            <div className={styles.header}>
                <h2 className={styles.title}>Choose Your Access 🔑</h2>
                <p className={styles.subtitle}>Unlock the full SingIt Pop experience.</p>
            </div>

            <div className={styles.grid}>
                {/* Tier 1: Fan */}
                <div className={styles.card}>
                    <div className={styles.cardHeader}>
                        <img src="/images/icon-tier-fan-clean.png" alt="" className={styles.icon} />
                        <h3>Fan</h3>
                        <span className={styles.price}>Free</span>
                    </div>
                    <ul className={styles.features}>
                        <li>✅ Listen to 30s Previews</li>
                        <li>✅ Newsletter Updates</li>
                    </ul>
                    <button className={styles.outlineBtn}>Join Free</button>
                </div>

                {/* Tier 2: Premium */}
                <div className={styles.card}>
                    <div className={styles.cardHeader}>
                        <img src="/images/icon-tier-premium-clean.png" alt="" className={styles.icon} />
                        <h3>Premium</h3>
                        <span className={styles.price}>£3.99<small>/mo</small></span>
                    </div>
                    <ul className={styles.features}>
                        <li>✅ <strong>Unlock Full Songs</strong></li>
                        <li>✅ Ad-Free Experience</li>
                        <li>✅ Plus all Fan perks</li>
                    </ul>
                    <button className={styles.glowBtn}>Go Premium 💎</button>
                </div>

                {/* Tier 3: Creator */}
                <div className={styles.card}>
                    <div className={styles.cardHeader}>
                        <img src="/images/icon-tier-creator-clean.png" alt="" className={styles.icon} />
                        <h3>Creator</h3>
                        <span className={styles.price}>£9.99<small>/mo</small></span>
                    </div>
                    <ul className={styles.features}>
                        <li>✅ <strong>Lyrics Creator, Image Prompts & Marketing Tools</strong></li>
                        <li>✅ Releasio AI Assistant</li>
                        <li>✅ Plus all Premium perks</li>
                    </ul>
                    <button className={styles.outlineBtn}>Start Creating 🚀</button>
                </div>
            </div>
        </section>
    );
}
