"use client";

import { useState } from 'react';
import { Disc, ChevronRight } from 'lucide-react';
import styles from './AlbumBrowser.module.css';

// Mock Discography Data
export const albums = [
    { id: 'latest', title: "Southern Lights", year: 2024, coverColor: "linear-gradient(45deg, #FF0080, #7928CA)" },
    { id: 'acoustic', title: "Unplugged Sessions", year: 2023, coverColor: "linear-gradient(45deg, #FF4D4D, #F9CB28)" },
    { id: 'live', title: "Live at Wembley", year: 2022, coverColor: "linear-gradient(45deg, #007CF0, #00DFD8)" },
    { id: 'debut', title: "First Spark", year: 2020, coverColor: "linear-gradient(45deg, #7928CA, #FF0080)" },
    { id: 'remix', title: "Remix Vol. 1", year: 2021, coverColor: "linear-gradient(45deg, #4ade80, #3b82f6)" },
    { id: 'b-sides', title: "Lost Tapes", year: 2019, coverColor: "linear-gradient(45deg, #f472b6, #db2777)" },
];

interface AlbumBrowserProps {
    activeAlbumId: string;
    onSelectAlbum: (id: string, title: string) => void;
}

export default function AlbumBrowser({ activeAlbumId, onSelectAlbum }: AlbumBrowserProps) {
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
                        <div className={styles.cover} style={{ background: album.coverColor }}>
                            <Disc size={32} color="white" opacity={0.7} />
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
