import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Play, X } from 'lucide-react';
import styles from './Hero.module.css';
import { LATEST_RELEASES } from '@/config/latestReleases';

export default function Hero() {
    const [showVideo, setShowVideo] = useState(false);

    // Simple helper to extract ID from various YouTube URL formats
    const getYouTubeId = (url: string) => {
        const regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|&v=)([^#&?]*).*/;
        const match = url.match(regExp);
        return (match && match[2].length === 11) ? match[2] : null;
    };

    const videoId = getYouTubeId(LATEST_RELEASES.HERO_VIDEO.VIDEO_URL);

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
                    onClick={() => setShowVideo(true)}
                >
                    <Play size={48} fill="currentColor" />
                    <div className={styles.pulseRing} />
                </motion.button>
                <span className={styles.watchText}>{LATEST_RELEASES.HERO_VIDEO.BUTTON_TEXT}</span>
            </div>

            {/* Title Section - Top Left */}
            <motion.div
                className={styles.titleContainer}
                initial={{ opacity: 0, x: -30 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 1, duration: 0.8 }}
            >
                <span className={styles.artistName}>SingIt Pop</span>
                <h1 className={styles.songTitle}>{LATEST_RELEASES.HERO_VIDEO.HERO_TITLE}</h1>
            </motion.div>

            {/* Video Modal */}
            <AnimatePresence>
                {showVideo && videoId && (
                    <motion.div
                        className={styles.videoModal}
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        onClick={() => setShowVideo(false)}
                    >
                        <div className={styles.videoWrapper}>
                            <button className={styles.closeBtn} onClick={() => setShowVideo(false)}>
                                <X size={32} />
                            </button>
                            <iframe
                                src={`https://www.youtube.com/embed/${videoId}?autoplay=1`}
                                title="YouTube video player"
                                frameBorder="0"
                                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                                allowFullScreen
                            />
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </section>
    );
}
