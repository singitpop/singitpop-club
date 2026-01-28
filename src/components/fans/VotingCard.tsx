'use client';

import { Play, Pause, Vote, Check } from 'lucide-react';
import styles from './VotingCard.module.css';
import RadialVisualizer from '../ui/RadialVisualizer';
import { useState } from 'react';

interface VotingCardProps {
    track: {
        id: number;
        title: string;
        artist: string;
        votes: number;
        percentage: number;
        artwork: string;
        color: string;
    };
    isPlaying: boolean;
    isVoted: boolean;
    onPlay: () => void;
    onVote: () => void;
}

export default function VotingCard({ track, isPlaying, isVoted, onPlay, onVote }: VotingCardProps) {
    const [isHovered, setIsHovered] = useState(false);
    const accentColor = track.color || '#F0F';

    return (
        <div
            className={`${styles.card} ${isPlaying ? styles.playing : ''}`}
            style={{ '--accent': accentColor, '--accent-rgb': hexToRgb(accentColor) } as React.CSSProperties}
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
        >
            {/* Background Visualizer - Only visible when playing */}
            {isPlaying && (
                <div className={styles.visualizerOverlay}>
                    <RadialVisualizer isPlaying={true} width={400} height={400} />
                </div>
            )}

            {/* Artwork & Play */}
            <div className={styles.artworkContainer}>
                <div
                    className={styles.artwork}
                    style={{ backgroundImage: `url(${track.artwork})` }}
                />
                <div className={styles.playOverlay} onClick={(e) => { e.stopPropagation(); onPlay(); }}>
                    <button className={styles.playBtn}>
                        {isPlaying ? (
                            <Pause size={16} fill="black" stroke="none" />
                        ) : (
                            <Play size={16} fill="black" stroke="none" style={{ marginLeft: 2 }} />
                        )}
                    </button>
                </div>
            </div>

            {/* Info */}
            <div className={styles.info}>
                <div className={styles.meta}>
                    <span className={styles.badge}>Upcoming Single</span>
                </div>
                <h3 className={styles.title}>{track.title}</h3>
                <span style={{ fontSize: '0.85rem', color: '#ccc' }}>{track.artist}</span>
            </div>

            {/* Voting Actions */}
            <div className={styles.voteContainer}>
                <button
                    className={`${styles.voteBtn} ${isVoted ? styles.voted : ''}`}
                    onClick={(e) => {
                        e.stopPropagation();
                        onVote();
                    }}
                >
                    {isVoted ? (
                        <>
                            <Check size={16} /> Voted
                        </>
                    ) : (
                        <>
                            <Vote size={16} /> Vote
                        </>
                    )}
                </button>

                <div style={{ width: '100%', minWidth: '100px' }}>
                    <div className={styles.progressWrapper}>
                        <div
                            className={styles.progressBar}
                            style={{ width: `${track.percentage}%` }}
                        />
                    </div>
                    <div className={styles.stats}>
                        <span style={{ fontWeight: 'bold', color: 'var(--accent)' }}>{track.percentage}%</span>
                        <span style={{ margin: '0 4px' }}>•</span>
                        <span>{track.votes} votes</span>
                    </div>
                </div>
            </div>
        </div>
    );
}

function hexToRgb(hex: string) {
    hex = hex.replace('#', '');
    const bigint = parseInt(hex, 16);
    const r = (bigint >> 16) & 255;
    const g = (bigint >> 8) & 255;
    const b = bigint & 255;
    return `${r}, ${g}, ${b}`;
}
