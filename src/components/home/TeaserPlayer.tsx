"use client";

import { useState, useEffect } from 'react';
import { Play, Pause, Lock } from 'lucide-react';
import styles from './TeaserPlayer.module.css';

export default function TeaserPlayer() {
    const [isPlaying, setIsPlaying] = useState(false);
    const [progress, setProgress] = useState(0);
    const duration = 215; // Full track: 3:35

    useEffect(() => {
        let interval: NodeJS.Timeout;
        if (isPlaying) {
            interval = setInterval(() => {
                setProgress((prev) => {
                    if (prev >= 100) {
                        setIsPlaying(false);
                        return 0; // Loop or stop
                    }
                    return prev + (100 / duration / 10); // Update every 100ms
                });
            }, 100);
        }
        return () => clearInterval(interval);
    }, [isPlaying]);

    const togglePlay = () => {
        setIsPlaying(!isPlaying);
    };

    return (
        <div className={styles.playerWrapper}>
            <div className={`container glass-panel ${styles.player}`}>
                <div className={styles.trackInfo}>
                    <div className={styles.coverArt} />
                    <div>
                        <h5>Southern Lights</h5>
                        <span className={styles.badge} style={{ background: '#ffd700', color: 'black' }}>Full Track 👑</span>
                    </div>
                </div>

                <div className={styles.controls}>
                    <button onClick={togglePlay} className={styles.playBtn}>
                        {isPlaying ? <Pause fill="currentColor" /> : <Play fill="currentColor" />}
                    </button>

                    <div className={styles.progressBar}>
                        <div
                            className={styles.progressFill}
                            style={{ width: `${progress}%` }}
                        />
                    </div>

                    <span className={styles.time}>
                        {Math.floor((progress * duration / 100) / 60)}:{Math.floor((progress * duration / 100) % 60).toString().padStart(2, '0')} / 3:35
                    </span>
                </div>

                <div className={styles.cta}>
                    <button className="glow-button sm">
                        Download MP3 ⬇️
                    </button>
                </div>
            </div>
            {/* No Member Prompt needed for Pro */}
        </div>
    );
}
