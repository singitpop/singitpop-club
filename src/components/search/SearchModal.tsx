
"use client";

import { useEffect, useRef, useState } from 'react';
import { useRouter } from 'next/navigation';
import { X, Search, Disc, Music, Play } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { useSearch } from '@/hooks/useSearch';
import styles from './SearchModal.module.css';

interface SearchModalProps {
    isOpen: boolean;
    onClose: () => void;
}

export default function SearchModal({ isOpen, onClose }: SearchModalProps) {
    const [query, setQuery] = useState('');
    const inputRef = useRef<HTMLInputElement>(null);
    const { albums, tracks } = useSearch(query);
    const router = useRouter();

    // Auto-focus input when opened
    useEffect(() => {
        if (isOpen && inputRef.current) {
            setTimeout(() => inputRef.current?.focus(), 100);
        }
    }, [isOpen]);

    // Close on Escape key
    useEffect(() => {
        const handleEsc = (e: KeyboardEvent) => {
            if (e.key === 'Escape') onClose();
        };
        window.addEventListener('keydown', handleEsc);
        return () => window.removeEventListener('keydown', handleEsc);
    }, [onClose]);

    // Prevent body scroll when open
    useEffect(() => {
        if (isOpen) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = 'unset';
            setQuery(''); // Reset on close
        }
        return () => { document.body.style.overflow = 'unset'; };
    }, [isOpen]);

    const formatTitle = (title: string, isSingle?: boolean) => {
        return isSingle ? title.replace(" - Single", "") : title;
    };

    if (!isOpen) return null;

    return (
        <AnimatePresence>
            {isOpen && (
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.2 }}
                    className={styles.overlay}
                >
                    <div className={styles.header}>
                        <button onClick={onClose} className={styles.closeBtn}>
                            <X size={32} />
                        </button>
                    </div>

                    <div className={styles.searchContainer}>
                        <div className={styles.inputWrapper}>
                            <input
                                ref={inputRef}
                                type="text"
                                value={query}
                                onChange={(e) => setQuery(e.target.value)}
                                placeholder="Search songs, albums..."
                                className={styles.input}
                            />
                        </div>

                        <div className={styles.results}>
                            {/* Tracks Section */}
                            {tracks.length > 0 && (
                                <section>
                                    <h3 className={styles.sectionTitle}>Tracks ({tracks.length})</h3>
                                    <div className={styles.trackList}>
                                        {tracks.map((track, i) => (
                                            <div
                                                key={`${track.id}-${i}`}
                                                className={styles.trackItem}
                                                onClick={() => {
                                                    onClose();
                                                    router.push(`/music?play=${track.id}`);
                                                }}
                                            >
                                                <Music size={20} className={styles.playIcon} />
                                                <div className={styles.trackInfo}>
                                                    <div className={styles.trackTitle}>{formatTitle(track.title, track.isSingle)}</div>
                                                    <div className={styles.trackMeta}>{track.sourceFolder} • {track.genre}</div>
                                                </div>
                                                <Play size={16} fill="currentColor" />
                                            </div>
                                        ))}
                                    </div>
                                </section>
                            )}

                            {/* Albums Section */}
                            {albums.length > 0 && (
                                <section>
                                    <h3 className={styles.sectionTitle}>Albums ({albums.length})</h3>
                                    <div className={styles.albumGrid}>
                                        {albums.map((album, i) => (
                                            <div
                                                key={`${album.id}-${i}`}
                                                className={styles.albumCard}
                                                onClick={() => {
                                                    onClose();
                                                    router.push(`/fan-albums`); // Placeholder
                                                }}
                                            >
                                                <img src={album.coverArt} alt={album.title} className={styles.coverArt} />
                                                <div>
                                                    <div className={styles.albumTitle}>{album.title}</div>
                                                    <div className={styles.albumYear}>{album.year}</div>
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                </section>
                            )}

                            {query.length > 0 && tracks.length === 0 && albums.length === 0 && (
                                <div style={{ textAlign: 'center', opacity: 0.5, marginTop: '2rem' }}>
                                    No results found for "{query}"
                                </div>
                            )}
                        </div>
                    </div>
                </motion.div>
            )}
        </AnimatePresence>
    );
}
