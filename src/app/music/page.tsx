"use client";

import { useState, useMemo } from 'react';
import { Music, TrendingUp, Star, Clock, Grid } from 'lucide-react';
import SongList from '@/components/music/SongList';
import AlbumOverlay from '@/components/music/AlbumOverlay';
import Charts from '@/components/music/Charts';
import styles from './page.module.css';
import { albums } from '@/data/albumData';

export default function MusicPage() {
    const [selectedAlbumId, setSelectedAlbumId] = useState<string | null>('latest');
    const [filterMode, setFilterMode] = useState<'all' | 'trending' | 'favorites' | 'latest' | 'album'>('latest');
    const [isOverlayOpen, setIsOverlayOpen] = useState(false);

    const filterButtons = [
        { id: 'latest', label: 'Latest Release', icon: Clock },
        { id: 'trending', label: 'Trending', icon: TrendingUp },
        { id: 'favorites', label: 'Fan Favorites', icon: Star }
    ];

    // derive tracks based on state
    const { tracks, title } = useMemo(() => {
        console.log(`[MusicPage] Recalculating. Filter: ${filterMode}, AlbumID: ${selectedAlbumId}`);

        if (filterMode === 'album' && selectedAlbumId) {
            const album = albums.find(a => a.id === selectedAlbumId);
            console.log(`[MusicPage] Album Search Result:`, album ? `Found: ${album.title} (${album.tracks.length} tracks)` : 'Not Found');
            return {
                tracks: album ? album.tracks : [],
                title: album ? album.title : 'Album not found'
            };
        }

        if (filterMode === 'latest') {
            const latestAlbums = albums.slice(0, 1); // Get the absolute latest album
            return {
                tracks: latestAlbums.flatMap(a => a.tracks), // Flatten tracks from the latest album
                title: 'Latest Release'
            };
        }

        if (filterMode === 'all') { // Fallback or if we keep it internally but hide button
            return {
                tracks: albums.flatMap(a => a.tracks),
                title: 'All Tracks'
            };
        }

        if (filterMode === 'trending') {
            // Mock trending: Take tracks from various albums to simulate "hot now"
            // For now, let's take the first 2 tracks from the first 5 albums
            return {
                tracks: albums.slice(0, 5).flatMap(a => a.tracks.slice(0, 2)),
                title: 'Trending Now'
            };
        }

        if (filterMode === 'favorites') {
            // Mock favorites: Take random tracks (e.g., every 3rd track)
            return {
                tracks: albums.flatMap(a => a.tracks).filter((_, i) => i % 3 === 0).slice(0, 12),
                title: 'Fan Favorites'
            };
        }

        return { tracks: [], title: '' };
    }, [filterMode, selectedAlbumId]);

    const handleSelectAlbum = (id: string) => {
        console.log(`[MusicPage] handleSelectAlbum called with ID: ${id}`);
        setSelectedAlbumId(id);
        setFilterMode('album');
    };

    const [selectedTracks, setSelectedTracks] = useState<string[]>([]);
    const MAX_MIXTAPE_TRACKS = 12;

    const handleToggleSelection = (uniqueId: string) => {
        setSelectedTracks(prev => {
            if (prev.includes(uniqueId)) {
                return prev.filter(tid => tid !== uniqueId);
            } else {
                if (prev.length >= MAX_MIXTAPE_TRACKS) {
                    alert(`Maximum ${MAX_MIXTAPE_TRACKS} tracks allowed per mixtape!`);
                    return prev;
                }
                return [...prev, uniqueId];
            }
        });
    };

    const mixtapePrice = (selectedTracks.length * 0.99).toFixed(2);

    return (
        <div className={`container ${styles.page}`}>
            <AlbumOverlay
                isOpen={isOverlayOpen}
                onClose={() => setIsOverlayOpen(false)}
                albums={albums}
                onSelectAlbum={handleSelectAlbum}
            />

            <div className={styles.header}>
                <h1>SingIt Pop Music</h1>
                <p>Stream authentic mixtapes, explore the discography, and unlock exclusive content.</p>

                {/* Top Mixtape CTA */}
                {selectedTracks.length > 0 && (
                    <div style={{
                        marginTop: '1rem',
                        padding: '1rem',
                        background: 'rgba(255, 255, 255, 0.1)',
                        borderRadius: '12px',
                        border: '1px solid rgba(255, 255, 255, 0.2)',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'space-between',
                        backdropFilter: 'blur(10px)'
                    }}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                            <span style={{ fontSize: '1.2rem' }}>💿</span>
                            <div>
                                <strong>Your Custom Mixtape</strong>
                                <div style={{ fontSize: '0.9rem', color: '#ccc' }}>
                                    {selectedTracks.length} / {MAX_MIXTAPE_TRACKS} tracks selected (£{mixtapePrice})
                                </div>
                            </div>
                        </div>
                        <div style={{ display: 'flex', gap: '0.5rem' }}>
                            <button
                                className="primary-button"
                                style={{ fontSize: '0.9rem', padding: '0.5rem 1rem' }}
                                onClick={() => window.location.href = `/music/checkout?type=vinyl&tracks=${selectedTracks.join(',')}`}
                            >
                                Buy Vinyl (£24.99)
                            </button>
                            <button
                                className="secondary-button"
                                style={{ fontSize: '0.9rem', padding: '0.5rem 1rem' }}
                                onClick={() => window.location.href = `/music/checkout?type=cd&tracks=${selectedTracks.join(',')}`}
                            >
                                Buy CD (£12.99)
                            </button>
                        </div>
                    </div>
                )}

                <div className={styles.controls}>
                    <div className={styles.filterBar}>
                        {filterButtons.map(btn => (
                            <button
                                key={btn.id}
                                className={filterMode === btn.id ? styles.activeFilter : ''}
                                onClick={() => setFilterMode(btn.id as any)}
                            >
                                <btn.icon size={16} />
                                {btn.label}
                            </button>
                        ))}
                    </div>

                    <button className={styles.browseBtn} onClick={() => setIsOverlayOpen(true)}>
                        <Grid size={18} />
                        Browse Discography
                    </button>
                </div>
            </div>

            <div className={styles.content}>
                <div className={styles.main}>
                    <SongList
                        tracks={tracks}
                        selectedTracks={selectedTracks}
                        onToggleSelection={handleToggleSelection}
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
