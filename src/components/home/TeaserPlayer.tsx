"use client";

import { useState, useEffect } from 'react';
import { Play, Pause, Lock } from 'lucide-react';
import styles from './TeaserPlayer.module.css';

import { siteContent } from '@/config/siteContent';

export default function TeaserPlayer() {
    const [isPlaying, setIsPlaying] = useState(false);
    const [progress, setProgress] = useState(0);
    const [signedUrl, setSignedUrl] = useState<string | null>(null);
    const track = siteContent.floatingPlayer;
    const duration = track.duration;

    useEffect(() => {
        // Fetch secure signed URL for the track
        const fetchUrl = async () => {
            try {
                const res = await fetch('/api/music/sign', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({ url: track.fileUrl })
                });
                const data = await res.json();
                if (data.signedUrl) {
                    setSignedUrl(data.signedUrl);
                }
            } catch (error) {
                console.error("Failed to sign hero track:", error);
            }
        };
        fetchUrl();
    }, [track.fileUrl]);

    // Real audio progress is handled by onTimeUpdate directly on the audio element
    // Removed fake interval logic

    const togglePlay = () => {
        const audio = document.getElementById('hero-audio') as HTMLAudioElement;
        if (!audio || !signedUrl) return;

        if (isPlaying) {
            audio.pause();
        } else {
            audio.play().catch(e => console.error("Playback failed:", e));
        }
        setIsPlaying(!isPlaying);
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
                    <button className="glow-button sm" onClick={() => window.location.href = '/music'}>
                        Add to Mixtape 📼
                    </button>
                </div>
            </div>
            <audio id="hero-audio" src={signedUrl || ''} onEnded={() => setIsPlaying(false)} onTimeUpdate={(e) => {
                const audio = e.currentTarget;
                if (audio.duration) {
                    setProgress((audio.currentTime / audio.duration) * 100);
                }
            }} />
        </div>
    );
}
