import Link from 'next/link';
// @ts-ignore
import { motion, AnimatePresence } from 'framer-motion';
import { useEffect, useState } from 'react';
import styles from './WelcomeOverlay.module.css';
import { ArrowRight, X } from 'lucide-react';

interface WelcomeOverlayProps {
    onDismiss?: () => void;
}

export default function WelcomeOverlay({ onDismiss }: WelcomeOverlayProps) {
    const [timeLeft, setTimeLeft] = useState(10); // 10 seconds auto-entry
    const [isExiting, setIsExiting] = useState(false);

    useEffect(() => {
        const timer = setInterval(() => {
            setTimeLeft((prev) => {
                if (prev <= 1) {
                    clearInterval(timer);
                    handleDismiss();
                    return 0;
                }
                return prev - 1;
            });
        }, 1000);

        return () => clearInterval(timer);
    }, []);

    const handleDismiss = () => {
        setIsExiting(true);
        setTimeout(() => {
            if (onDismiss) onDismiss();
        }, 500); // Wait for exit animation
    };

    return (
        <motion.div
            className={styles.overlayContainer}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0, scale: 1.1, filter: "blur(20px)" }}
            transition={{ duration: 0.8, ease: "easeInOut" }}
        >
            {/* Background Video Ambience */}
            <div className={styles.videoBackground}>
                <video autoPlay loop muted playsInline>
                    {/* Using a subtle abstract background or reuse hero video if available. 
                         For now using a dark color fallback in CSS, video tag is prepared for v2 */}
                </video>
            </div>

            <motion.div
                className={styles.contentWrapper}
                initial={{ y: 50, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.3, duration: 0.8 }}
            >
                <div className={styles.logo}>
                    <div className={styles.logoLine} />
                    <span>SingIt Pop</span>
                    <div className={styles.logoLine} />
                </div>

                <h1 className={styles.title}>
                    Welcome to<br />
                    <span className={styles.gradientText}>The Club</span>
                </h1>

                <p className={styles.text}>
                    Your exclusive access to unreleased tracks, <br />
                    behind-the-scenes content, and VIP experiences.
                </p>

                <div className={styles.actions}>
                    <button
                        onClick={() => {
                            handleDismiss();
                            setTimeout(() => {
                                const element = document.getElementById('access');
                                if (element) element.scrollIntoView({ behavior: 'smooth' });
                            }, 600);
                        }}
                        className={styles.enterClubBtn}
                    >
                        Choose Your Access
                    </button>

                    <button onClick={handleDismiss} className={styles.enterSiteBtn}>
                        Explore Site <ArrowRight size={14} style={{ display: 'inline', marginLeft: '4px' }} />
                    </button>
                </div>
            </motion.div>

            {/* Countdown Timer (Subtle) */}
            <div className={styles.timerWrapper} onClick={handleDismiss} style={{ cursor: 'pointer' }}>
                <svg width="40" height="40" className={styles.timerSvg}>
                    <circle
                        cx="20" cy="20" r="18"
                        fill="none" stroke="rgba(255,255,255,0.1)" strokeWidth="2"
                    />
                    <circle
                        cx="20" cy="20" r="18"
                        fill="none" stroke="rgba(255,255,255,0.4)" strokeWidth="2"
                        className={styles.timerCircle}
                        style={{ strokeDashoffset: 113 - (113 * timeLeft) / 10 }}
                    />
                </svg>
            </div>

        </motion.div>
    );
}
