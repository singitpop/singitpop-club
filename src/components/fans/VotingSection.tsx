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
        audioUrl: "https://singitpop-music.s3.eu-north-1.amazonaws.com/albums/Valentine%20Country/front%20porch%20valentine/Front%20Porch%20Valentine.mp3"
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
    const [tracks, setTracks] = useState<any[]>([]);
    const [campaignTitle, setCampaignTitle] = useState("Help Choose the Next Single! 🗳️");
    const [deadline, setDeadline] = useState<string | null>(null);
    const [daysLeft, setDaysLeft] = useState(3);
    const [userVotes, setUserVotes] = useState<number[]>([]);
    const [playingId, setPlayingId] = useState<number | null>(null);
    const audioRef = useRef<HTMLAudioElement | null>(null);

    // Stop audio on unmount
    useEffect(() => {
        return () => {
            if (audioRef.current) audioRef.current.pause();
        };
    }, []);

    // Fetch Active Campaign & Votes
    useEffect(() => {
        async function loadData() {
            try {
                // 1. Fetch Campaign
                const campRes = await fetch('/api/community/campaign');
                if (!campRes.ok) {
                    setTracks(initialTracks);
                    return;
                }
                const campaign = await campRes.json();

                // 2. Fetch User Vote
                const voteRes = await fetch('/api/community/vote');
                if (voteRes.ok) {
                    const voteData = await voteRes.json();
                    if (voteData.votedTrackId) {
                        // If API returns single ID, wrap in array. Since we moved to multi-vote, 
                        // we should ideally update API to return array, but robust frontend handles both.
                        const v = voteData.votedTrackId;
                        setUserVotes(Array.isArray(v) ? v : [v]);
                    }
                }

                // 3. Process Tracks & Time
                if (campaign) {
                    setCampaignTitle(campaign.title);
                    setDeadline(campaign.deadline);

                    // Calculate Days Left
                    const end = new Date(campaign.deadline).getTime();
                    const now = Date.now();
                    setDaysLeft(Math.max(0, Math.ceil((end - now) / (1000 * 60 * 60 * 24))));

                    // Mock stats logic
                    const tracksWithStats = campaign.tracks.map((t: any) => ({
                        ...t,
                        votes: Math.floor(Math.random() * 500) + 100,
                        percentage: 25
                    }));

                    const totalVotes = tracksWithStats.reduce((acc: number, t: any) => acc + t.votes, 0);
                    const finalTracks = tracksWithStats.map((t: any) => ({
                        ...t,
                        percentage: totalVotes > 0 ? Math.round((t.votes / totalVotes) * 100) : 0
                    }));

                    setTracks(finalTracks);
                }
            } catch (e) {
                console.error("Error loading voting data:", e);
                setTracks(initialTracks);
            }
        }
        loadData();
    }, []);

    // Audio Player Logic
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
        }
    };

    const handleVote = async (id: number) => {
        let newVotes = [...userVotes];

        if (newVotes.includes(id)) {
            newVotes = newVotes.filter(v => v !== id);
        } else {
            if (newVotes.length >= 3) {
                alert("You can only vote for up to 3 tracks!");
                return;
            }
            newVotes.push(id);
        }

        setUserVotes(newVotes);

        // Optimistic UI Update
        setTracks(prev => {
            const updated = prev.map(t => {
                const wasVoted = userVotes.includes(t.id);
                const isVoted = newVotes.includes(t.id);
                let change = 0;
                if (!wasVoted && isVoted) change = 1;
                if (wasVoted && !isVoted) change = -1;
                return { ...t, votes: t.votes + change };
            });

            const total = updated.reduce((acc, t) => acc + t.votes, 0);
            return updated.map(t => ({
                ...t,
                percentage: total > 0 ? Math.round((t.votes / total) * 100) : 0
            }));
        });

        try {
            await fetch('/api/community/vote', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ trackId: id, campaignId: 'active' })
            });
        } catch (e) {
            console.error("Vote failed", e);
            setUserVotes(userVotes);
        }
    };

    const handlePlay = (id: number) => {
        setPlayingId(playingId === id ? null : id);
    };

    return (
        <section className={styles.section}>
            <div className={styles.header}>
                <div className={styles.titleArea}>
                    <h2>{campaignTitle}</h2>
                    <p className={styles.subtitle}>
                        Listen to previews and vote for your top 3 favorites!
                        The winner will be released next month.
                    </p>
                </div>
                <div className={styles.timerBadge}>
                    <div className={styles.timerDot} />
                    <span>Voting ends in {daysLeft} Days</span>
                </div>
            </div>

            <div className={styles.grid}>
                {tracks.map(track => (
                    <VotingCard
                        key={track.id}
                        track={track}
                        isPlaying={playingId === track.id}
                        isVoted={userVotes.includes(track.id)}
                        onPlay={() => handlePlay(track.id)}
                        onVote={() => handleVote(track.id)}
                    />
                ))}
            </div>

            <audio
                ref={audioRef}
                onTimeUpdate={handleTimeUpdate}
                onEnded={() => setPlayingId(null)}
            />
        </section>
    );
}
