"use client";

import { useState } from 'react';
import SongList from '@/components/music/SongList';
import AlbumBrowser from '@/components/music/AlbumBrowser';
import Charts from '@/components/music/Charts';
import styles from './page.module.css';

export default function MusicPage() {
    const [selectedAlbumId, setSelectedAlbumId] = useState('latest');
    const [selectedAlbumTitle, setSelectedAlbumTitle] = useState('Southern Lights');
    const [selectedGenre, setSelectedGenre] = useState<string | null>(null);

    const genres = [
        { id: 'Country', label: '🤠 Country' },
        { id: 'EDM', label: '⚡ EDM' },
        { id: 'Rock', label: '🎸 Rock' },
        { id: 'Chill', label: '🌙 Chill' }
    ];

    return (
        <div className={`container ${styles.page}`}>
            <div className={styles.header}>
                <h1>Discography</h1>
                <p>Build your ultimate mixtape from the entire collection.</p>

                {/* Vibe Select / Mood Filter */}
                <div style={{ display: 'flex', gap: '0.5rem', justifyContent: 'center', marginTop: '1.5rem', flexWrap: 'wrap' }}>
                    {genres.map(genre => (
                        <button
                            key={genre.id}
                            onClick={() => setSelectedGenre(selectedGenre === genre.id ? null : genre.id)}
                            className={selectedGenre === genre.id ? 'primary-button' : 'secondary-button'}
                            style={{ fontSize: '0.9rem', padding: '0.5rem 1rem' }}
                        >
                            {genre.label}
                        </button>
                    ))}
                </div>
            </div>

            <div className={styles.grid}>
                {/* Left: Album Navigation */}
                <div className={styles.sidebarLeft}>
                    <AlbumBrowser
                        activeAlbumId={selectedAlbumId}
                        onSelectAlbum={(id, title) => {
                            setSelectedAlbumId(id);
                            setSelectedAlbumTitle(title);
                        }}
                    />
                </div>

                {/* Center: Track List */}
                <div className={styles.main}>
                    <SongList albumTitle={selectedAlbumTitle} selectedGenre={selectedGenre} />
                </div>

                {/* Right: Charts/Promo */}
                <div className={styles.sidebarRight}>
                    <Charts />

                    <div className={`glass-panel ${styles.promo}`}>
                        <h4>Stream Everywhere</h4>
                        <div className={styles.platforms} style={{ display: 'flex', flexDirection: 'column', gap: '0.8rem' }}>
                            <a href="https://open.spotify.com/artist/7zC7VXVJ021c3y2C6G130a" target="_blank" rel="noopener noreferrer" className="secondary-button" style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.5rem' }}>
                                <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor"><path d="M12 0C5.4 0 0 5.4 0 12s5.4 12 12 12 12-5.4 12-12S18.66 0 12 0zm5.521 17.34c-.24.359-.66.48-1.021.24-2.82-1.74-6.36-2.101-10.561-1.141-.418.122-.779-.179-.899-.539-.12-.421.18-.78.54-.9 4.56-1.021 8.52-.6 11.64 1.32.42.18.479.659.301 1.02zm1.44-3.3c-.301.42-.841.6-1.262.3-3.239-1.98-8.159-2.58-11.939-1.38-.479.12-1.02-.12-1.14-.6-.12-.48.12-1.021.6-1.141C9.6 9.9 15 10.561 18.72 12.84c.361.181.54.78.241 1.2zm.12-3.36C15.24 8.4 8.82 8.16 5.16 9.301c-.6.179-1.2-.181-1.38-.721-.18-.601.18-1.2.72-1.381 4.26-1.26 11.28-1.02 15.721 1.621.539.3.719 1.02.419 1.56-.299.421-1.02.599-1.559.3z" /></svg>
                                Spotify
                            </a>
                            <a href="https://music.apple.com/gb/artist/singit-pop/1772577862" target="_blank" rel="noopener noreferrer" className="secondary-button" style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.5rem', background: '#FA243C', borderColor: '#FA243C' }}>
                                <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor"><path d="M12 0C5.373 0 0 5.373 0 12s5.373 12 12 12 12-5.373 12-12S18.627 0 12 0zm0 18.334c-2.738 0-4.958-2.22-4.958-4.958S9.262 8.418 12 8.418s4.958 2.22 4.958 4.958-2.22 4.958-4.958 4.958zM8.59 7.025c.571 0 1.034.463 1.034 1.034v8.267c0 .571-.463 1.034-1.034 1.034-.571 0-1.034-.463-1.034-1.034V8.059c0-.571.463-1.034 1.034-1.034zm6.82 0c.571 0 1.034.463 1.034 1.034v8.267c0 .571-.463 1.034-1.034 1.034-.571 0-1.034-.463-1.034-1.034V8.059c0-.571.463-1.034 1.034-1.034z" /></svg>
                                Apple Music
                            </a>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
