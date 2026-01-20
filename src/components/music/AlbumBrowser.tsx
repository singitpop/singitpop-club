"use client";

import { useState } from 'react';
import { Disc, ChevronRight } from 'lucide-react';
import styles from './AlbumBrowser.module.css';

import { Album } from '@/data/albumData';

interface AlbumBrowserProps {
    albums: Album[];
    activeAlbumId: string;
    onSelectAlbum: (id: string, title: string) => void;
}

export default function AlbumBrowser({ albums, activeAlbumId, onSelectAlbum }: AlbumBrowserProps) {
    return (
        <div className={styles.container}>
            <div className={styles.header}>
                <h3>Albums</h3>
                <span className={styles.count}>{albums.length} Releases</span>
            </div>

            <div className={styles.grid}>
                {albums.map((album) => (
                    <div
                        key={album.id}
                        className={`${styles.card} ${activeAlbumId === album.id ? styles.active : ''}`}
                        onClick={() => onSelectAlbum(album.id, album.title)}
                    >
                        <div className={styles.cover}>
                            {/* Fallback for now if no real image */}
                            {album.coverArt ? (
                                <img src={album.coverArt} alt={album.title} style={{ width: '100%', height: '100%', objectFit: 'cover' }} onError={(e) => {
                                    e.currentTarget.style.display = 'none';
                                    e.currentTarget.parentElement!.style.background = 'linear-gradient(45deg, #FF0080, #7928CA)';
                                }} />
                            ) : (
                                <Disc size={32} color="white" opacity={0.7} />
                            )}
                        </div>
                        <div className={styles.info}>
                            <h4 className={styles.title}>{album.title}</h4>
                            <span className={styles.year}>{album.year}</span>
                        </div>
                        {activeAlbumId === album.id && <ChevronRight size={16} className={styles.indicator} />}
                    </div>
                ))}
            </div>
        </div>
    );
}
