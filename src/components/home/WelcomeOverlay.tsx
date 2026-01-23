import Link from 'next/link';
// @ts-ignore
import { motion } from 'framer-motion';
import styles from './WelcomeOverlay.module.css';

interface WelcomeOverlayProps {
    onDismiss?: () => void;
}

export default function WelcomeOverlay({ onDismiss }: WelcomeOverlayProps) {
    return (
        <motion.div
            className={styles.overlayContainer}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5, duration: 0.8 }}
        >
            <div className={styles.glassPanel}>
                <h2 className={styles.title}>Welcome to the Club</h2>
                <p className={styles.text}>
                    Join the SingIt Pop family for exclusive access to unreleased tracks,
                    behind-the-scenes content, and special VIP events.
                </p>
                <div className={styles.actions}>
                    <Link href="/club" className="primary-button">
                        Join the Club
                    </Link>
                    <button onClick={onDismiss} className={styles.dismissBtn}>
                        Dismiss
                    </button>
                </div>
            </div>
        </motion.div>
    );
}
