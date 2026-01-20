"use client";

import { useState, useEffect } from 'react';
import { Play, Pause, Lock } from 'lucide-react';
import { useUser } from '@clerk/nextjs';
import styles from './TeaserPlayer.module.css';

import { siteContent } from '@/config/siteContent';

export default function TeaserPlayer() {
    const { isSignedIn } = useUser();
    const [isPlaying, setIsPlaying] = useState(false);
    const [progress, setProgress] = useState(0);
    const [signedUrl, setSignedUrl] = useState<string | null>(null);
    const [limitReached, setLimitReached] = useState(false);

    const track = siteContent.floatingPlayer;
    const duration = track.duration; // note: this seems to be in seconds in config usually, but let's trust existing code uses it correctly or it's just for display? 
    // Wait, the existing code calculates time: Math.floor((progress * duration / 100) / 60)
    // If 'duration' is just a number (e.g. 210 seconds), this works.

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

    const togglePlay = () => {
        const audio = document.getElementById('hero-audio') as HTMLAudioElement;
        if (!audio || !signedUrl) return;

        if (limitReached && !isSignedIn) {
            window.location.href = '/club'; // Redirect or just show prompt?
            return;
        }

        if (isPlaying) {
            audio.pause();
        } else {
            // Check if we are already at the limit
            if (!isSignedIn && audio.currentTime >= 30) {
                setLimitReached(true);
                return;
            }
            audio.play().catch(e => console.error("Playback failed:", e));
        }
        setIsPlaying(!isPlaying);
    };

    const handleTimeUpdate = (e: React.SyntheticEvent<HTMLAudioElement>) => {
        const audio = e.currentTarget;
        if (audio.duration) {
            // Check for 30s limit
            if (!isSignedIn && audio.currentTime >= 30) {
                audio.pause();
                setIsPlaying(false);
                setLimitReached(true);
                // Optionally clamp time
                // audio.currentTime = 30; // Creates specific behavior, maybe keep it at 30
            } else {
                setLimitReached(false);
            }
            setProgress((audio.currentTime / audio.duration) * 100);
        }
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
                        {limitReached && !isSignedIn ? <Lock size={16} fill="currentColor" /> : (isPlaying ? <Pause fill="currentColor" /> : <Play fill="currentColor" />)}
                    </button>

                    <div className={styles.progressBar}>
                        <div
                            className={styles.progressFill}
                            style={{
                                width: `${progress}%`,
                                background: limitReached ? '#ef4444' : 'var(--primary)'
                            }}
                        />
                    </div>

                    <span className={styles.time}>
                        {Math.floor((progress * duration / 100) / 60)}:{Math.floor((progress * duration / 100) % 60).toString().padStart(2, '0')} / {Math.floor(duration / 60)}:{Math.floor(duration % 60).toString().padStart(2, '0')}
                    </span>
                </div>

                <div className={styles.cta}>
                    <button className="glow-button sm" onClick={() => window.location.href = `/music?addTrack=${encodeURIComponent(track.title)}`}>
                        Add to Mixtape 📼
                    </button>
                </div>
            </div>

            {!isSignedIn && limitReached && (
                <div className={styles.memberPrompt}>
                    <span>🔒 Preview ended.</span>
                    <a href="/club">Join the Club</a>
                    <span>to listen to the full track!</span>
                </div>
            )}

            <audio
                id="hero-audio"
                src={signedUrl || undefined}
                onEnded={() => setIsPlaying(false)}
                onTimeUpdate={handleTimeUpdate}
            />
        </div>
    );
}
