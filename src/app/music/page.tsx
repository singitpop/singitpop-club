"use client";

import { useState, useMemo } from 'react';
import { Music, TrendingUp, Star, Clock } from 'lucide-react';
import SongList from '@/components/music/SongList';
import AlbumBrowser from '@/components/music/AlbumBrowser';
import Charts from '@/components/music/Charts';
import styles from './page.module.css';
import { albums } from '@/data/albumData';

export default function MusicPage() {
    const [selectedAlbumId, setSelectedAlbumId] = useState<string | null>('latest'); // Default to latest logic
    const [filterMode, setFilterMode] = useState<'all' | 'trending' | 'favorites' | 'latest' | 'album'>('latest');

    const filterButtons = [
        { id: 'all', label: 'All Albums', icon: Music },
        { id: 'latest', label: 'Latest Release', icon: Clock },
        { id: 'trending', label: 'Trending', icon: TrendingUp },
        { id: 'favorites', label: 'Fan Favorites', icon: Star }
    ];

    // derive tracks based on state
    const { tracks, title } = useMemo(() => {
        if (filterMode === 'album' && selectedAlbumId) {
            const album = albums.find(a => a.id === selectedAlbumId);
            return {
                tracks: album ? album.tracks : [],
                title: album ? album.title : 'Album not found'
            };
        }

        if (filterMode === 'latest') {
            const latestAlbum = albums[0];
            return {
                tracks: latestAlbum ? latestAlbum.tracks : [],
                title: latestAlbum ? `Latest: ${latestAlbum.title}` : 'Latest Release'
            };
        }

        if (filterMode === 'all') {
            return {
                tracks: albums.flatMap(a => a.tracks),
                title: 'All Tracks'
            };
        }

        // Mock logic for trending/favorites since we don't have real stats yet
        if (filterMode === 'trending') {
            return {
                tracks: albums.flatMap(a => a.tracks).slice(0, 10), // First 10 for now
                title: 'Trending Now'
            };
        }

        if (filterMode === 'favorites') {
            return {
                tracks: albums.flatMap(a => a.tracks).filter((_, i) => i % 2 === 0).slice(0, 12), // Mock random selection
                title: 'Fan Favorites'
            };
        }

        return { tracks: [], title: 'Music' };
    }, [selectedAlbumId, filterMode]);


    return (
        <div className={`container ${styles.page}`}>
            <div className={styles.header}>
                <h1>Discography</h1>
                <p>Build your ultimate mixtape - up to 12 tracks. Available as CD, Vinyl, or Digital Download.</p>

                {/* Filter Mode Buttons */}
                <div style={{ display: 'flex', gap: '0.75rem', justifyContent: 'center', marginTop: '1.5rem', flexWrap: 'wrap' }}>
                    {filterButtons.map(filter => {
                        const IconComponent = filter.icon;
                        const isActive = filterMode === filter.id;
                        return (
                            <button
                                key={filter.id}
                                onClick={() => {
                                    setFilterMode(filter.id as any);
                                    setSelectedAlbumId(null);
                                }}
                                className={isActive ? 'primary-button' : 'secondary-button'}
                                style={{
                                    fontSize: '0.95rem',
                                    padding: '0.65rem 1.25rem',
                                    display: 'flex',
                                    alignItems: 'center',
                                    gap: '0.5rem'
                                }}
                            >
                                <IconComponent size={18} />
                                {filter.label}
                            </button>
                        );
                    })}
                </div>
            </div>

            <div className={styles.grid}>
                {/* Left: Album Navigation */}
                <div className={styles.sidebarLeft}>
                    <AlbumBrowser
                        albums={albums}
                        activeAlbumId={selectedAlbumId || ''}
                        onSelectAlbum={(id) => {
                            setSelectedAlbumId(id);
                            setFilterMode('album');
                        }}
                    />
                </div>

                {/* Center: Track List */}
                <div className={styles.main}>
                    <h3 style={{ marginBottom: '1rem', color: 'var(--primary)' }}>{title}</h3>
                    <SongList
                        tracks={tracks}
                        filterMode={filterMode === 'album' ? 'all' : filterMode as any}
                    />
                </div>

                {/* Right: Charts/Promo */}
                <div className={styles.sidebarRight}>
                    <Charts />

                    <div className={`glass-panel ${styles.promo}`}>
                        <h4>Stream Everywhere</h4>
                        <div className={styles.platforms} style={{ display: 'flex', flexDirection: 'column', gap: '0.8rem' }}>
                            <a href="https://open.spotify.com/artist/7zC7VXVJ021c3y2C6G130a" target="_blank" rel="noopener noreferrer" className="secondary-button" style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.5rem', background: '#1DB954', borderColor: '#1DB954', color: '#FFF' }}>
                                <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor"><path d="M12 0C5.4 0 0 5.4 0 12s5.4 12 12 12 12-5.4 12-12S18.66 0 12 0zm5.521 17.34c-.24.359-.66.48-1.021.24-2.82-1.74-6.36-2.101-10.561-1.141-.418.122-.779-.179-.899-.539-.12-.421.18-.78.54-.9 4.56-1.021 8.52-.6 11.64 1.32.42.18.479.659.301 1.02zm1.44-3.3c-.301.42-.841.6-1.262.3-3.239-1.98-8.159-2.58-11.939-1.38-.479.12-1.02-.12-1.14-.6-.12-.48.12-1.021.6-1.141C9.6 9.9 15 10.561 18.72 12.84c.361.181.54.78.241 1.2zm.12-3.36C15.24 8.4 8.82 8.16 5.16 9.301c-.6.179-1.2-.181-1.38-.721-.18-.601.18-1.2.72-1.381 4.26-1.26 11.28-1.02 15.721 1.621.539.3.719 1.02.419 1.56-.299.421-1.02.599-1.559.3z" /></svg>
                                Spotify
                            </a>
                            <a href="https://music.amazon.com/artists/B0DPVVWV4L/singit-pop" target="_blank" rel="noopener noreferrer" className="secondary-button" style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.5rem', background: '#FF9900', borderColor: '#FF9900', color: '#000' }}>
                                <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor"><path d="M2.25 18.901a10.281 10.281 0 0 0 17.547 0l.844 1.548a12.281 12.281 0 0 1-20.781 0l.844-1.548zm19.5-13.802a10.281 10.281 0 0 0-17.547 0L3.36 3.551a12.281 12.281 0 0 1 20.781 0l-.844 1.548zM14.447 12.001c0 1.347-1.1 2.447-2.447 2.447s-2.447-1.1-2.447-2.447 1.1-2.447 2.447-2.447 2.447 1.1 2.447 2.447z" /></svg>
                                Amazon Music
                            </a>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
