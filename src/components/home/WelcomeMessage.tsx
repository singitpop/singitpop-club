"use client";

import styles from './WelcomeMessage.module.css';

export default function WelcomeMessage() {
    return (
        <section className={styles.parallaxSection}>
            <div className={styles.parallaxBg}></div>
            <div className={styles.overlayContent}>
                <div className={styles.glassCard}>
                    <h2 className={styles.heading}>Welcome to the Club!</h2>
                    <p className={styles.text}>
                        Welcome to the official club! This is where the magic happens.
                        Check out the new track, grab some merch, or join the fam for the real good stuff.
                    </p>
                    <div className={styles.divider} />
                    <strong className={styles.signature}>
                        Let's make some noise! <br />
                        <span style={{ display: 'block', marginTop: '0.5rem' }}>— SingIt Pop</span>
                    </strong>
                </div>
            </div>
        </section>
    );
}
