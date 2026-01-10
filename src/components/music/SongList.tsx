"use client";

import { Play, Lock, Share2, Heart, Check, ShoppingBag } from 'lucide-react';
import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useAuth } from '@/context/AuthContext';
import styles from './SongList.module.css';

const tracks = [
    { id: 1, title: 'Southern Lights', duration: '3:45', plays: '1.2M', locked: false, price: 0.99, genre: 'Country', audioUrl: '/audio/southern-lights.mp3', highResUrl: '/audio/southern-lights-hires.wav' },
    { id: 2, title: 'Whiskey Slide', duration: '3:12', plays: '850K', locked: true, price: 0.99, genre: 'Country', audioUrl: '/audio/whiskey-slide.mp3', highResUrl: '/audio/whiskey-slide-hires.wav' },
    { id: 3, title: 'Neon Heart', duration: '2:58', plays: '2.1M', locked: true, price: 0.99, genre: 'EDM', audioUrl: '/audio/neon-heart.mp3', highResUrl: '/audio/neon-heart-hires.wav' },
    { id: 4, title: 'Midnight Drive', duration: '4:02', plays: '500K', locked: true, price: 0.99, genre: 'Rock', audioUrl: '/audio/midnight-drive.mp3', highResUrl: '/audio/midnight-drive-hires.wav' },
    { id: 5, title: 'Electric Soul', duration: '3:30', plays: '300K', locked: true, price: 0.99, genre: 'EDM', audioUrl: '/audio/electric-soul.mp3', highResUrl: '/audio/electric-soul-hires.wav' },
    { id: 6, title: 'Retrograde', duration: '3:15', plays: '420K', locked: true, price: 0.99, genre: 'Chill', audioUrl: '/audio/retrograde.mp3', highResUrl: '/audio/retrograde-hires.wav' },
];

interface SongListProps {
    albumTitle: string;
    selectedGenre: string | null;
}

export default function SongList({ albumTitle, selectedGenre }: SongListProps) {
    const { isPro, isInsider } = useAuth();
    const [activeTrack, setActiveTrack] = useState<number | null>(null);
    const [selectedTracks, setSelectedTracks] = useState<number[]>([]);

    const toggleSelection = (id: number) => {
        setSelectedTracks(prev =>
            prev.includes(id) ? prev.filter(tid => tid !== id) : [...prev, id]
        );
    };

    const totalPrice = (selectedTracks.length * 0.99).toFixed(2);

    return (
        <div className={styles.container}>
            <h2 className={styles.sectionTitle}>Build Your Mixtape</h2>
            <p className={styles.subtitle} style={{ color: 'var(--text-muted)', marginBottom: '2rem' }}>
                Select tracks to create your custom digital album.
            </p>

            <div className={styles.list}>
                {tracks
                    .filter(track => !selectedGenre || track.genre === selectedGenre)
                    .map((track) => {
                        const isSelected = selectedTracks.includes(track.id);
                        const isLocked = track.locked && !isPro;

                        return (
                            <div
                                key={track.id}
                                className={`${styles.row} ${activeTrack === track.id ? styles.active : ''} ${isLocked ? styles.locked : ''}`}
                                onClick={() => !isLocked && setActiveTrack(track.id)}
                                style={{ opacity: isLocked ? 0.6 : 1, cursor: isLocked ? 'not-allowed' : 'pointer' }}
                            >
                                <div
                                    className={`${styles.checkbox} ${isSelected ? styles.checked : ''}`}
                                    onClick={(e) => { e.stopPropagation(); toggleSelection(track.id); }}
                                >
                                    {isSelected && <Check size={14} strokeWidth={4} />}
                                </div>

                                <div className={styles.mainInfo}>
                                    <button className={styles.playBtn} onClick={(e) => {
                                        if (isLocked) {
                                            e.stopPropagation();
                                            alert("Join the Club to unlock this track!");
                                        }
                                    }}>
                                        {isLocked ? <Lock size={16} /> : <Play size={16} fill="currentColor" />}
                                    </button>
                                    <div>
                                        <div className={styles.trackTitle}>{track.title}</div>
                                        <div className={styles.meta}>
                                            £{track.price} • {track.plays} plays
                                        </div>
                                    </div>
                                </div>

                                <div className={styles.actions}>
                                    <span className={styles.duration}>{track.duration}</span>

                                    {/* Download Logic */}
                                    {(isInsider || isPro) && (
                                        <a
                                            href={(isPro && track.highResUrl) ? track.highResUrl : track.audioUrl}
                                            className={styles.actionBtn}
                                            title={isPro ? "Download High-Res WAV" : "Download MP3"}
                                            download
                                        >
                                            <span style={{ fontSize: '0.7rem', fontWeight: 700 }}>
                                                {isPro ? 'WAV' : 'MP3'}
                                            </span>
                                        </a>
                                    )}

                                    <button className={styles.actionBtn}><Heart size={18} /></button>
                                    <button className={styles.actionBtn}><Share2 size={18} /></button>
                                </div>
                            </div>
                        );
                    })}
            </div>

            <div className={`${styles.mixtapeBar} ${selectedTracks.length > 0 ? styles.visible : ''}`}>
                <ShoppingBag size={24} color="var(--accent)" />
                <div className={styles.mixtapeInfo}>
                    <span className={styles.mixtapeCount}>{selectedTracks.length} Tracks Selected</span>
                    <span className={styles.mixtapeTotal}>Total: £{totalPrice}</span>
                </div>
                <button
                    className={styles.checkoutBtn}
                    onClick={() => {
                        // In V1, we redirect to the main shop for bundle purchase
                        window.location.href = '/shop';
                    }}
                >
                    Checkout (Visit Shop)
                </button>
            </div>
        </div>
    );
}
