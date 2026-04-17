"use client";

import { useState, useEffect } from 'react';
import { Play, Pause, Lock } from 'lucide-react';
import { useUser } from '@clerk/nextjs';
import styles from './TeaserPlayer.module.css';
import { getAccessRules, canStreamFull, shouldEnforcePreview } from '@/lib/access-rules';

import { capitalizeTitle } from '@/utils/formatters';

export default function TeaserPlayer() {
    const { user } = useUser();
    const isSignedIn = !!user;
    const [isPlaying, setIsPlaying] = useState(false);
    const [progress, setProgress] = useState(0);
    const [signedUrl, setSignedUrl] = useState<string | null>(null);
    const [limitReached, setLimitReached] = useState(false);

    // Track State
    const [track, setTrack] = useState<any>(null);
    const [coverUrl, setCoverUrl] = useState<string | null>(null);

    // Fetch latest single from API
    useEffect(() => {
        fetch('/api/content/latest')
            .then(res => res.json())
            .then(data => {
                if (data.latestSingleTrack) {
                    // Parse duration "3:30" -> 210
                    let seconds = 210;
                    if (data.latestSingleTrack.duration && data.latestSingleTrack.duration.includes(':')) {
                        const parts = data.latestSingleTrack.duration.split(':');
                        seconds = parseInt(parts[0]) * 60 + parseInt(parts[1]);
                    }

                    setTrack({
                        ...data.latestSingleTrack,
                        fileUrl: data.latestSingleTrack.audioUrl,
                        duration: seconds,
                        badge: 'LATEST SINGLE 🔥'
                    });
                }
                if (data.latestSingleTrackCover) {
                    setCoverUrl(data.latestSingleTrackCover);
                }
            })
            .catch(err => console.error("Failed to fetch latest single", err));
    }, []);

    useEffect(() => {
        if (!track?.fileUrl) return;

        // Fetch secure signed URL for the track
        const fetchUrl = async () => {
            // OPTIMIZATION: If URL is already signed by the API, skip the extra fetch
            if (track.fileUrl.includes('X-Amz-Signature') || track.fileUrl.includes('Key-Pair-Id')) {
                setSignedUrl(track.fileUrl);
                return;
            }

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
    }, [track?.fileUrl]);

    const togglePlay = () => {
        const audio = document.getElementById('hero-audio') as HTMLAudioElement;
        if (!audio || !signedUrl) return;

        const metadata = user?.publicMetadata || {};
        const rules = getAccessRules(metadata.tier as string, metadata.role as string);
        const isLatestSingle = true; // Hero player always plays the latest single

        if (isPlaying) {
            audio.pause();
        } else {
            if (shouldEnforcePreview(rules, isLatestSingle, audio.currentTime)) {
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
            const metadata = user?.publicMetadata || {};
            const rules = getAccessRules(metadata.tier as string, metadata.role as string);
            const isLatestSingle = true;

            if (shouldEnforcePreview(rules, isLatestSingle, audio.currentTime)) {
                audio.pause();
                setIsPlaying(false);
                setLimitReached(true);
            } else {
                setLimitReached(false);
                setProgress((audio.currentTime / audio.duration) * 100);
            }
        }
    };

    // Don't render until track is loaded
    if (!track) {
        return null;
    }

    return (
        <div className={styles.playerWrapper}>
            <div className={`container glass-panel ${styles.player}`}>
                <div className={styles.trackInfo}>
                    <div
                        className={styles.coverArt}
                        style={coverUrl ? { backgroundImage: `url(${coverUrl})`, backgroundSize: 'cover', backgroundPosition: 'center' } : undefined}
                    />
                    <div>
                        <h5 className={styles.trackTitle}>{capitalizeTitle(track.title)}</h5>
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
                        {Math.floor((progress * (track.duration) / 100) / 60)}:{Math.floor((progress * (track.duration) / 100) % 60).toString().padStart(2, '0')} / {Math.floor(track.duration / 60)}:{Math.floor(track.duration % 60).toString().padStart(2, '0')}
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
