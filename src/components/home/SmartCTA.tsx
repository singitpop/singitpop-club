"use client";

import styles from './SmartCTA.module.css';

export default function SmartCTA() {
    return (
        <section className={styles.section}>
            <div className={`container ${styles.container}`}>
                <div className={`glass-panel ${styles.card}`}>
                    <div className={styles.content}>
                        <h2>Join the Inner Circle</h2>
                        <p>Get exclusive access to unreleased tracks, BTS content, and presale tickets.</p>
                    </div>
                    <div className={styles.action}>
                        <button className="glow-button">Check Membership Tiers</button>
                    </div>
                </div>
            </div>
        </section>
    );
}
