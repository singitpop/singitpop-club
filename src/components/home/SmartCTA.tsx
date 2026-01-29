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
                        <img src="/images/icon-tier-fan-neon.png" alt="" className={styles.icon} />
                        <h3>The Fan</h3>
                        <span className={styles.price}>Free</span>
                    </div>
                    <ul className={styles.features}>
                        <li>✅ Vote on Next Single</li>
                        <li>✅ Stream Public Singles</li>
                        <li>✅ Newsletter Updates</li>
                    </ul>
                    <button className={styles.outlineBtn}>Join Free</button>
                </div>

                {/* Tier 2: Insider */}
                <div className={styles.card}>
                    <div className={styles.cardHeader}>
                        <img src="/images/icon-tier-premium-neon.png" alt="" className={styles.icon} />
                        <h3>The Insider</h3>
                        <span className={styles.price}>£3.99<small>/mo</small></span>
                    </div>
                    <ul className={styles.features}>
                        <li>✅ <strong>Unlock Full Catalog</strong></li>
                        <li>✅ Stream Full Albums</li>
                        <li>✅ MP3 Downloads</li>
                    </ul>
                    <button className={styles.glowBtn}>Go Insider</button>
                </div>

                {/* Tier 3: VIP */}
                <div className={styles.card}>
                    <div className={styles.cardHeader}>
                        <img src="/images/icon-tier-creator-neon.png" alt="" className={styles.icon} />
                        <h3>The VIP</h3>
                        <span className={styles.price}>£8.99<small>/mo</small></span>
                    </div>
                    <ul className={styles.features}>
                        <li>✅ <strong>Lossless WAV Downloads</strong></li>
                        <li>✅ 20% Shop Discount</li>
                        <li>✅ Exclusive Future Album Content</li>
                    </ul>
                    <button className={styles.outlineBtn}>Get VIP Access</button>
                </div>
            </div>
        </section>
    );
}
