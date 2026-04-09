"use client";

import { useState, useEffect } from 'react';
import Link from 'next/link';
// @ts-ignore
import { motion, AnimatePresence } from 'framer-motion';
import { Play, X } from 'lucide-react';
import styles from './Hero.module.css';
import { LATEST_RELEASES } from '@/config/latestReleases';
import { albums } from '@/data/albumData';

import WelcomeOverlay from './WelcomeOverlay';
import ValueRibbon from './ValueRibbon';

export default function Hero() {
    const [showVideo, setShowVideo] = useState(false);
    const [heroData, setHeroData] = useState({
        HERO_TITLE: '',
        BUTTON_TEXT: '', // Start empty
        VIDEO_URL: ''
    });
    const [bgImage, setBgImage] = useState<string | null>(null); // Start null
    const [showWelcome, setShowWelcome] = useState(true);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        // ... (existing fetch logic remains same)
        fetch('/api/content/latest')
            .then(res => res.json())
            .then(data => {
                // ... logic to set data ...
                let newHeroData: any = {};

                if (data.latestVideoId) {
                    newHeroData.VIDEO_URL = `https://www.youtube.com/watch?v=${data.latestVideoId}`;
                }

                // Use custom video title if available, otherwise fall back to single title
                const titleToUse = data.latestVideoTitle || data.latestSingleTitle;
                if (titleToUse) {
                    newHeroData.HERO_TITLE = titleToUse;
                    newHeroData.BUTTON_TEXT = "WATCH VIDEO";
                }

                setHeroData(prev => ({ ...prev, ...newHeroData }));

                // Prioritize video-specific cover (backgroundCoverArt)
                if (data.backgroundCoverArt) {
                    setBgImage(data.backgroundCoverArt);
                } else {
                    setBgImage('/images/hero-desert.jpg'); // Valid Fallback
                }
            })
            .catch(err => {
                console.error("Failed to fetch hero data", err);
                setHeroData(LATEST_RELEASES.HERO_VIDEO); // Fallback to config
                setBgImage('/images/hero-desert.jpg');
            })
            .finally(() => setIsLoading(false));
    }, []);

    // Simple helper to extract ID from various YouTube URL formats
    const getYouTubeId = (url: string) => {
        const regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|&v=)([^#&?]*).*/;
        const match = url.match(regExp);
        return (match && match[2].length === 11) ? match[2] : null;
    };

    const videoId = getYouTubeId(heroData.VIDEO_URL);

    // Auto-dismiss welcome when video starts
    const handleshowVideo = () => {
        setShowVideo(true);
        setShowWelcome(false);
    };

    return (
        <section className={styles.heroImmersive}>
            <div className={styles.videoBackground}>
                {/* Simulating video with the atmospheric image and slow zoom */}
                {bgImage && <div className={styles.zoomImage} style={{ backgroundImage: `url(${bgImage})`, opacity: isLoading ? 0 : 1, transition: 'opacity 0.5s ease-in' }} />}
                <div className={styles.overlay} />
                {isLoading && (
                    <div style={{ position: 'absolute', inset: 0, display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 10 }}>
                        {/* Optional Spinner or just empty black */}
                    </div>
                )}
            </div>

            {/* NEW: Integrated Welcome Overlay */}
            <AnimatePresence>
                {showWelcome && !showVideo && !isLoading && (
                    <WelcomeOverlay onDismiss={() => setShowWelcome(false)} />
                )}
            </AnimatePresence>

            {!isLoading && (
                <div className={styles.centerStage}>
                    <motion.button
                        className={styles.giantPlayBtn}
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.95 }}
                        initial={{ scale: 0.8, opacity: 0 }}
                        animate={{ scale: 1, opacity: 1 }}
                        transition={{ duration: 0.8, ease: "easeOut" }}
                        onClick={handleshowVideo}
                    >
                        <Play size={48} fill="currentColor" />
                        <div className={styles.pulseRing} />
                    </motion.button>
                    <span className={styles.watchText}>{heroData.BUTTON_TEXT}</span>
                    <Link href="/radio/live" className={styles.radioCTA}>
                        <div className={styles.miniDot} />
                        LISTEN TO COUNTRY MUSIC LIVE 📻
                    </Link>
                </div>
            )}

            {/* Title Section - Top Left */}
            {!isLoading && (
                <motion.div
                    className={styles.titleContainer}
                    initial={{ opacity: 0, x: -30 }}
                    animate={{ opacity: heroData.HERO_TITLE ? 1 : 0, x: heroData.HERO_TITLE ? 0 : -30 }}
                    transition={{ delay: 1, duration: 0.8 }}
                >
                    <span className={styles.artistName}>SingIt Pop</span>
                    {heroData.HERO_TITLE && <h1 className={styles.songTitle}>{heroData.HERO_TITLE}</h1>}
                </motion.div>
            )}

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
                            <button
                                className={styles.closeBtn}
                                onClick={() => setShowVideo(false)}
                                style={{
                                    position: 'absolute',
                                    top: '20px',
                                    right: '20px',
                                    zIndex: 3000,
                                    background: 'rgba(0,0,0,0.5)',
                                    border: '1px solid rgba(255,255,255,0.2)',
                                    borderRadius: '50%',
                                    width: '40px',
                                    height: '40px',
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                    cursor: 'pointer',
                                    color: 'white'
                                }}
                            >
                                <X size={24} />
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

            {/* Top Scroll Hint */}
            {!showVideo && !isLoading && (
                <motion.div 
                    className={styles.scrollHint}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: [0.4, 0.8, 0.4] }}
                    transition={{ delay: 2, duration: 3, repeat: Infinity }}
                >
                    <span>SCROLL TO EXPLORE</span>
                    <div className={styles.scrollLine} />
                </motion.div>
            )}

            {/* NEW: Feature Discovery Ribbon */}
            {!showVideo && !isLoading && <ValueRibbon />}
        </section>
    );
}
