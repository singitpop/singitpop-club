"use client";

import { useState, useEffect } from 'react';
import { X, Search, Disc } from 'lucide-react';
import styles from './AlbumOverlay.module.css';
import { Album } from '@/data/albumData';

interface AlbumOverlayProps {
    isOpen: boolean;
    onClose: () => void;
    albums: Album[];
    onSelectAlbum: (id: string, title: string) => void;
}

export default function AlbumOverlay({ isOpen, onClose, albums, onSelectAlbum }: AlbumOverlayProps) {
    const [searchTerm, setSearchTerm] = useState('');
    const [isVisible, setIsVisible] = useState(false);

    // Handle animation
    useEffect(() => {
        if (isOpen) {
            setIsVisible(true);
            document.body.style.overflow = 'hidden'; // Lock scroll
        } else {
            const timer = setTimeout(() => setIsVisible(false), 300);
            document.body.style.overflow = ''; // Unlock scroll
            return () => clearTimeout(timer);
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

    if (!isVisible && !isOpen) return null;

    const filteredAlbums = albums.filter(album =>
        album.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        album.year.toString().includes(searchTerm) ||
        album.genre.some(g => g.toLowerCase().includes(searchTerm.toLowerCase()))
    );

    return (
        <div className={styles.overlay} style={{ opacity: isOpen ? 1 : 0, pointerEvents: isOpen ? 'all' : 'none' }}>
            <div className={styles.header}>
                <h2 className={styles.title}>Explore Discography</h2>
                <button className={styles.closeBtn} onClick={onClose}>
                    <X size={24} />
                </button>
            </div>

            <div className={styles.searchContainer}>
                <div style={{ position: 'relative', width: '100%', maxWidth: '600px' }}>
                    <Search style={{ position: 'absolute', left: '1.5rem', top: '50%', transform: 'translateY(-50%)', color: 'rgba(255,255,255,0.4)' }} />
                    <input
                        type="text"
                        placeholder="Search albums, years, or genres..."
                        className={styles.searchInput}
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        autoFocus
                    />
                </div>
            </div>

            < div className={styles.gridScroll}>
                <div className={styles.grid}>
                    {filteredAlbums.map((album) => (
                        <div
                            key={album.id}
                            className={styles.card}
                            onClick={() => {
                                // alert(`Debug: Selected ${album.title} (${album.id})`); // PROACTIVE DEBUGGING
                                console.log('Overlay clicked:', album.id);
                                onSelectAlbum(album.id, album.title);
                                onClose();
                            }}
                        >
                            <div className={styles.cover}>
                                {album.coverArt ? (
                                    <img
                                        src={album.coverArt}
                                        alt={album.title}
                                        loading="lazy"
                                        onError={(e) => {
                                            e.currentTarget.style.display = 'none';
                                            e.currentTarget.parentElement!.style.background = 'linear-gradient(45deg, #FF0080, #7928CA)';
                                        }}
                                    />
                                ) : (
                                    <div style={{ width: '100%', height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center', background: '#333' }}>
                                        <Disc size={48} color="rgba(255,255,255,0.2)" />
                                    </div>
                                )}
                            </div>
                            <div className={styles.albumInfo}>
                                <h3>{album.title}</h3>
                                <span className={styles.year}>{album.year} • {album.tracks.length} Tracks</span>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}
