"use client";

import { Share2 } from 'lucide-react';
import styles from './SongList.module.css';
import { Track, Album } from '@/data/albumData';
import { capitalizeTitle } from '@/utils/formatters';

interface SongListProps {
    tracks: Track[];
    albums: Album[];
    filterMode?: 'all' | 'trending' | 'favorites' | 'latest' | 'album';
    selectedTracks: string[];
    onToggleSelection: (id: string) => void;
    latestSingleUid?: string | null;
    autoPlayTrackId?: string | null;
}

export default function SongList({ tracks, albums }: SongListProps) {
    const handleShare = (track: Track) => {
        const trackId = track.id || "";
        const shareUrl = `${window.location.origin}/music?track=${trackId}`;
        navigator.clipboard.writeText(shareUrl)
            .then(() => alert("Link copied to clipboard!"))
            .catch(() => alert("Failed to copy link"));
    };

    return (
        <div className={styles.container}>
            <div className={styles.list}>
                {tracks.length === 0 ? (
                    <div style={{ textAlign: 'center', padding: '2rem', color: 'var(--text-muted)' }}>No tracks found.</div>
                ) : (
                    tracks.map((track, index) => {
                        return (
                            <div
                                key={track.id || index}
                                className={styles.row}
                                style={{
                                    cursor: 'default',
                                    '--index': index
                                } as React.CSSProperties}
                            >
                                <div className={styles.mainInfo}>
                                    <div style={{ minWidth: '30px', opacity: 0.5, fontFamily: 'monospace' }}>
                                        {String(index + 1).padStart(2, '0')}
                                    </div>
                                    <div>
                                        <div className={styles.trackTitle}>
                                            {capitalizeTitle(track.title)}
                                        </div>
                                    </div>
                                </div>

                                <div className={styles.actions}>
                                    <span className={styles.duration}>
                                        {track.duration}
                                    </span>
                                    <button
                                        className={styles.actionBtn}
                                        onClick={(e) => {
                                            e.stopPropagation();
                                            handleShare(track);
                                        }}
                                        title="Copy Share Link"
                                    >
                                        <Share2 size={16} />
                                    </button>
                                </div>
                            </div>
                        );
                    })
                )}
            </div>
        </div>
    );
}
