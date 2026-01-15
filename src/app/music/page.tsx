"use client";

import { useState, useMemo, useEffect, Suspense } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { Music, TrendingUp, Star, Clock, Grid } from 'lucide-react';
import SongList from '@/components/music/SongList';
import AlbumOverlay from '@/components/music/AlbumOverlay';
import Charts from '@/components/music/Charts';
import styles from './page.module.css';
import { albums } from '@/data/albumData';

import { siteContent } from '@/config/siteContent';

function MusicContent() {
    const searchParams = useSearchParams();
    const router = useRouter();
    const [selectedAlbumId, setSelectedAlbumId] = useState<string | null>(siteContent.musicPage.latestAlbumId);
    const [filterMode, setFilterMode] = useState<'all' | 'trending' | 'favorites' | 'latest' | 'album'>('latest');
    const [isOverlayOpen, setIsOverlayOpen] = useState(false);
    const [selectedTracks, setSelectedTracks] = useState<string[]>([]);

    // Auto-Add Track Logic
    useEffect(() => {
        const trackTitleToAdd = searchParams.get('addTrack');
        if (trackTitleToAdd) {
            // Find the track
            const allTracks = albums.flatMap(a => a.tracks);
            const foundTrack = allTracks.find(t => t.title.toLowerCase() === trackTitleToAdd.toLowerCase());

            if (foundTrack) {
                const uniqueId = foundTrack.albumId ? `${foundTrack.albumId}:${foundTrack.id}` : String(foundTrack.id);
                setSelectedTracks(prev => {
                    if (!prev.includes(uniqueId)) {
                        if (prev.length >= 12) {
                            alert("Mixtape is full!");
                            return prev;
                        }
                        return [...prev, uniqueId];
                    }
                    return prev;
                });
                // Clear param
                const newParams = new URLSearchParams(searchParams.toString());
                newParams.delete('addTrack');
                router.replace(`/music?${newParams.toString()}`, { scroll: false });
            }
        }
    }, [searchParams, router]);

    const filterButtons = [
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
            const latest = albums.find(a => a.id === siteContent.musicPage.latestAlbumId);
            return {
                tracks: latest ? latest.tracks : [],
                title: latest ? `Latest Release: ${latest.title}` : 'Latest Release'
            };
        }

        if (filterMode === 'all') {
            return {
                tracks: albums.flatMap(a => a.tracks),
                title: 'All Tracks'
            };
        }

        if (filterMode === 'trending') {
            return {
                tracks: albums.slice(0, 5).flatMap(a => a.tracks.slice(0, 2)),
                title: 'Trending Now'
            };
        }

        if (filterMode === 'favorites') {
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

    // Fixed price for mixtape
    const mixtapePrice = siteContent.musicPage.prices.mixtape.toFixed(2);

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
                            <span style={{ fontSize: '1.2rem' }}>📼</span>
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
                                onClick={() => window.location.href = `/music/checkout?type=download&tracks=${selectedTracks.join(',')}`}
                            >
                                Purchase Mixtape (£{mixtapePrice})
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
                    <div style={{ marginBottom: '1.5rem', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                            <h2 style={{ fontSize: '1.8rem', fontWeight: 700 }}>{title}</h2>
                            {filterMode === 'album' && (
                                <span className="badge" style={{ background: 'var(--accent)', padding: '4px 12px', borderRadius: '20px', fontSize: '0.8rem' }}>
                                    {tracks.length} Tracks
                                </span>
                            )}
                        </div>



                        {(filterMode === 'album' || filterMode === 'latest') && (
                            <button
                                className="primary-button"
                                style={{ fontSize: '0.9rem', padding: '0.6rem 1.2rem' }}
                                onClick={() => {
                                    const allTrackIds = tracks.map(t => t.albumId ? `${t.albumId}:${t.id}` : String(t.id));
                                    window.location.href = `/music/checkout?type=download&tracks=${allTrackIds.join(',')}`;
                                }}
                            >
                                Purchase Full Album (£{siteContent.musicPage.prices.album.toFixed(2)})
                            </button>
                        )}
                    </div>
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
                            <a href="https://open.spotify.com/artist/4RbG3nPMT1J5zrNxzNxHGC" target="_blank" rel="noopener noreferrer" className="secondary-button" style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.5rem', background: '#1DB954', borderColor: '#1DB954', color: '#FFF' }}>
                                <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor"><path d="M12 0C5.4 0 0 5.4 0 12s5.4 12 12 12 12-5.4 12-12S18.66 0 12 0zm5.521 17.34c-.24.359-.66.48-1.021.24-2.82-1.74-6.36-2.101-10.561-1.141-.418.122-.779-.179-.899-.539-.12-.421.18-.78.54-.9 4.56-1.021 8.52-.6 11.64 1.32.42.18.479.659.301 1.02zm1.44-3.3c-.301.42-.841.6-1.262.3-3.239-1.98-8.159-2.58-11.939-1.38-.479.12-1.02-.12-1.14-.6-.12-.48.12-1.021.6-1.141C9.6 9.9 15 10.561 18.72 12.84c.361.181.54.78.241 1.2zm.12-3.36C15.24 8.4 8.82 8.16 5.16 9.301c-.6.179-1.2-.181-1.38-.721-.18-.601.18-1.2.72-1.381 4.26-1.26 11.28-1.02 15.721 1.621.539.3.719 1.02.419 1.56-.299.421-1.02.599-1.559.3z" /></svg>
                                Spotify
                            </a>
                            <a href="https://music.apple.com/gb/artist/singit-pop/1772577862" target="_blank" rel="noopener noreferrer" className="secondary-button" style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.5rem', background: '#FA243C', borderColor: '#FA243C', color: '#FFF' }}>
                                <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor"><path d="M12 0C5.373 0 0 5.373 0 12s5.373 12 12 12 12-5.373 12-12S18.627 0 12 0zm3.321 13.916c-.029.073-.396 1.341-.396 1.341s-1.042 3.511-3.953 3.511-3.667-2.906-3.667-4.406c0-2.438 1.958-5.354 5.25-5.354 1.76 0 2.875.927 2.875.927-.729-2.229-2.021-3.521-3.833-3.521-2.99 0-4.635 3.031-4.635 6.01 0 3.323 2.505 5.865 5.75 5.865 3.271 0 4.635-2.25 4.635-2.25l-2.026-.123z" /></svg>
                                Apple Music
                            </a>
                            <a href="https://music.amazon.com/artists/B0DPVVWV4L/singit-pop" target="_blank" rel="noopener noreferrer" className="secondary-button" style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.5rem', background: '#FF9900', borderColor: '#FF9900', color: '#000' }}>
                                <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor"><path d="M2.25 18.901a10.281 10.281 0 0 0 17.547 0l.844 1.548a12.281 12.281 0 0 1-20.781 0l.844-1.548zm19.5-13.802a10.281 10.281 0 0 0-17.547 0L3.36 3.551a12.281 12.281 0 0 1 20.781 0l-.844 1.548zM14.447 12.001c0 1.347-1.1 2.447-2.447 2.447s-2.447-1.1-2.447-2.447 1.1-2.447 2.447-2.447 2.447 1.1 2.447 2.447z" /></svg>
                                Amazon Music
                            </a>
                        </div>
                    </div>
                </div>
            </div>
            {/* VERSION STAMP - Forces content change and verifies deployment */}
            <div style={{ textAlign: 'center', padding: '20px', color: '#666', fontSize: '0.8rem' }}>
                System Version: v2026.01.15-AutoAddFix (Build: Checked)
            </div>
        </div>
    );
}

export default function MusicPage() {
    return (
        <Suspense fallback={<div>Loading...</div>}>
            <MusicContent />
        </Suspense>
    )
}
