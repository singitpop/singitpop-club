"use client";

import { motion } from 'framer-motion';
import { Play } from 'lucide-react';
import styles from './Hero.module.css';

export default function Hero() {
    return (
        <section className={styles.heroImmersive}>
            <div className={styles.videoBackground}>
                {/* Simulating video with the atmospheric image and slow zoom */}
                <div className={styles.zoomImage} />
                <div className={styles.overlay} />
            </div>

            <div className={styles.centerStage}>
                <motion.button
                    className={styles.giantPlayBtn}
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.95 }}
                    initial={{ scale: 0.8, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    transition={{ duration: 0.8, ease: "easeOut" }}
                >
                    <Play size={48} fill="currentColor" />
                    <div className={styles.pulseRing} />
                </motion.button>
                <span className={styles.watchText}>Watch Premiere</span>
            </div>

            {/* Title Section - Top Left */}
            <motion.div
                className={styles.titleContainer}
                initial={{ opacity: 0, x: -30 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 1, duration: 0.8 }}
            >
                <span className={styles.artistName}>SingIt Pop</span>
                <h1 className={styles.songTitle}>Southern Lights</h1>
            </motion.div>
        </section>
    );
}
