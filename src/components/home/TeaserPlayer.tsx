"use client";

import { useState, useEffect } from 'react';
import { Play, Pause, Lock } from 'lucide-react';
import styles from './TeaserPlayer.module.css';

import { siteContent } from '@/config/siteContent';

export default function TeaserPlayer() {
    const [isPlaying, setIsPlaying] = useState(false);
    const [progress, setProgress] = useState(0);
    const track = siteContent.floatingPlayer;
    const duration = track.duration;

    useEffect(() => {
        let interval: NodeJS.Timeout;
        if (isPlaying) {
            interval = setInterval(() => {
                setProgress((prev) => {
                    if (prev >= 100) {
                        setIsPlaying(false);
                        return 0; // Loop or stop
                    }
                    return prev + (100 / (duration * 10)); // Fix duration math: duration is seconds, interval is 100ms
                });
            }, 100);
        }
        return () => clearInterval(interval);
    }, [isPlaying, duration]);

    const togglePlay = () => {
        setIsPlaying(!isPlaying);
        // In a real app, this would trigger the actual audio element
    };

    return (
        <div className={styles.playerWrapper}>
            <div className={`container glass-panel ${styles.player}`}>
                <div className={styles.trackInfo}>
                    <div className={styles.coverArt} />
                    <div>
                        <h5>{track.title}</h5>
                        <span className={styles.badge} style={{ background: '#ffd700', color: 'black' }}>{track.badge}</span>
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
                        {Math.floor((progress * duration / 100) / 60)}:{Math.floor((progress * duration / 100) % 60).toString().padStart(2, '0')} / {Math.floor(duration / 60)}:{Math.floor(duration % 60).toString().padStart(2, '0')}
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
