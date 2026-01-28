'use client';

import { useState, useRef, useEffect } from 'react';
import { Timer, Info } from 'lucide-react';
import styles from './VotingSection.module.css';
import VotingCard from './VotingCard';

// Mock Data for Upcoming Singles
const initialTracks = [
    {
        id: 101,
        title: "Neon Highway (Demo)",
        artist: "SingIt Pop",
        votes: 1240,
        percentage: 45,
        artwork: "linear-gradient(135deg, #FF0080, #7928CA)",
        color: "#FF0080",
        audioUrl: "https://singitpop-music.s3.eu-north-1.amazonaws.com/albums/Valentine%20Country/front%20porch%20valentine/Front%20Porch%20Valentine.mp3" // Using existing mp3 for demo
    },
    {
        id: 102,
        title: "Midnight Echoes",
        artist: "SingIt Pop",
        votes: 890,
        percentage: 32,
        artwork: "linear-gradient(135deg, #007CF0, #00DFD8)",
        color: "#007CF0",
        audioUrl: "https://singitpop-music.s3.eu-north-1.amazonaws.com/albums/Desert%20Winds%20And%20Open%20Roads/desert%20winds/Desert%20Winds.mp3"
    },
    {
        id: 103,
        title: "Starlight (Unplugged)",
        artist: "SingIt Pop",
        votes: 620,
        percentage: 23,
        artwork: "linear-gradient(135deg, #FF4D4D, #F9CB28)",
        color: "#FF4D4D",
        audioUrl: "https://singitpop-music.s3.eu-north-1.amazonaws.com/albums/Echoes%20Of%20Light/The%20Distance%20Between/The%20Distance%20Between.mp3"
    }
];

export default function VotingSection() {
    const [tracks, setTracks] = useState(initialTracks);
    const [userVote, setUserVote] = useState<number | null>(null);
    const [playingId, setPlayingId] = useState<number | null>(null);
    const audioRef = useRef<HTMLAudioElement | null>(null);

    // Stop audio on unmount
    useEffect(() => {
        return () => {
            if (audioRef.current) audioRef.current.pause();
        };
    }, []);

    // 1-Minute Limit Logic (and Auto-Play)
    useEffect(() => {
        if (!playingId) {
            if (audioRef.current) audioRef.current.pause();
            return;
        }

        const track = tracks.find(t => t.id === playingId);
        if (track && audioRef.current) {
            audioRef.current.src = track.audioUrl;
            audioRef.current.currentTime = 0;
            audioRef.current.play().catch(console.error);
        }
    }, [playingId, tracks]);

    const handleTimeUpdate = () => {
        if (audioRef.current && audioRef.current.currentTime >= 60) {
            audioRef.current.pause();
            setPlayingId(null);
            // Optional: Show toast "Preview ended! Vote now!"
        }
    };

    // Fetch existing vote
    useEffect(() => {
        async function fetchVote() {
            try {
                const res = await fetch('/api/community/vote');
                if (res.ok) {
                    const data = await res.json();
                    if (data.votedTrackId) setUserVote(data.votedTrackId);
                }
            } catch (e) {
                console.error("Failed to fetch vote", e);
            }
        }
        fetchVote();
    }, []);

    const handleVote = async (id: number) => {
        // Optimistic UI update
        const previousVote = userVote;

        if (userVote === id) {
            // Cannot un-vote in this simple logic for now, or maybe toggle?
            // Let's assume toggle OFF is not supported for now to keep it simple, 
            // OR let's support switching.
            // Actually, let's just allow switching.
            return;
        }

        setUserVote(id);

        // Update percentages optimistically (mock)
        setTracks(prev => prev.map(t => {
            if (t.id === id) return { ...t, votes: t.votes + 1 };
            if (t.id === previousVote) return { ...t, votes: t.votes - 1 };
            return t;
        }));

        try {
            await fetch('/api/community/vote', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ trackId: id })
            });
        } catch (e) {
            console.error("Vote failed", e);
            setUserVote(previousVote); // Revert
        }
    };

    const handlePlay = (id: number) => {
        if (playingId === id) {
            setPlayingId(null);
        } else {
            setPlayingId(id);
        }
    };

    return (
        <section className={styles.section}>
            <div className={styles.header}>
                <div className={styles.titleArea}>
                    <h2>Help Choose the Next Single! 🗳️</h2>
                    <p className={styles.subtitle}>
                        Listen to 1-minute previews of our upcoming demos and vote for your favorite.
                        The winner will be released next month!
                    </p>
                </div>
                <div className={styles.timerBadge}>
                    <div className={styles.timerDot} />
                    <span>Voting ends in 3 Days</span>
                </div>
            </div>

            <div className={styles.grid}>
                {tracks.map(track => (
                    <VotingCard
                        key={track.id}
                        track={track}
                        isPlaying={playingId === track.id}
                        isVoted={userVote === track.id}
                        onPlay={() => handlePlay(track.id)}
                        onVote={() => handleVote(track.id)}
                    />
                ))}
            </div>

            {/* Local Audio Element for Previews */}
            <audio
                ref={audioRef}
                onTimeUpdate={handleTimeUpdate}
                onEnded={() => setPlayingId(null)}
            />
        </section>
    );
}
