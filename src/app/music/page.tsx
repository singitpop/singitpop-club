"use client";

import { useState, useMemo, useEffect, Suspense } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { TrendingUp, Star, Clock, Grid, Crown } from 'lucide-react';
import { useAuth } from '@/context/AuthContext';
import SongList from '@/components/music/SongList';
import AlbumOverlay from '@/components/music/AlbumOverlay';
import Charts from '@/components/music/Charts';
import styles from './page.module.css';
import { albums as staticAlbums, Album } from '@/data/albumData';
import { siteContent } from '@/config/siteContent';

// Robust Date Helper: Parses 'YYYY-MM-DD' and compares with current date (ignoring time)
const isReleased = (dateStr: string) => {
    if (!dateStr || dateStr === '0') return false;
    const releaseDate = new Date(dateStr);
    const today = new Date();
    // Normalize to midnight for fair comparison
    today.setHours(0, 0, 0, 0);
    return releaseDate <= today;
};


function MusicContent() {
    const { isPro, isLabel, isInsider } = useAuth();
    const searchParams = useSearchParams();
    const router = useRouter();

    // State for Dynamic Data
    const [albums, setAlbums] = useState<Album[]>(staticAlbums);
    const [isLoading, setIsLoading] = useState(true);

    const [selectedAlbumId, setSelectedAlbumId] = useState<string | null>(null);
    const [latestSingleUid, setLatestSingleUid] = useState<string | null>(null);

    // Fetch Dynamic Data on Mount
    useEffect(() => {
        let isCancelled = false;
        async function loadData() {
            try {
                // 1. Fetch Latest Metadata
                const metaRes = await fetch('/api/content/latest');
                const metaData = await metaRes.json();
                if (!isCancelled && metaData.latestSingleUid) {
                    setLatestSingleUid(metaData.latestSingleUid);
                }

                // 2. Fetch Full Album Data
                const albumsRes = await fetch('/api/content/albums');
                if (albumsRes.ok) {
                    const dynamicAlbums = await albumsRes.json();
                    if (!isCancelled && Array.isArray(dynamicAlbums) && dynamicAlbums.length > 0) {
                        setAlbums(dynamicAlbums);
                    }
                }
            } catch (e) {
                console.error("Failed to load dynamic content", e);
            } finally {
                if (!isCancelled) setIsLoading(false);
            }
        }

        loadData();
        return () => { isCancelled = true; };
    }, []);

    // Set initial Selected Album (Dynamic Logic)
    useEffect(() => {
        // Initialize or Update Current Selection
        if (albums.length > 0) {
            const activeAlbums = albums.filter(a =>
                (a.type === 'studio' || a.type === 'standard') &&
                isReleased(a.releaseDate)
            ).sort((a, b) => {
                const timeA = new Date(a.releaseDate).getTime();
                const timeB = new Date(b.releaseDate).getTime();
                if (timeB === timeA) {
                    if (b.title === 'A Love That Never Ends') return 1;
                    if (a.title === 'A Love That Never Ends') return -1;
                    return 0;
                }
                return timeB - timeA;
            });

            const topActiveId = activeAlbums.length > 0 ? activeAlbums[0].id : siteContent.musicPage.latestAlbumId;

            // Update if no selection OR if current selection is invalid (e.g. future album)
            if (!selectedAlbumId || !activeAlbums.some(a => a.id === selectedAlbumId)) {
                setSelectedAlbumId(topActiveId);
            }
        }
    }, [isLoading, albums, selectedAlbumId]);
    // React to albums update

    const [filterMode, setFilterMode] = useState<'all' | 'trending' | 'favorites' | 'latest' | 'album'>('latest');
    const [isOverlayOpen, setIsOverlayOpen] = useState(false);
    const [isVipOverlayOpen, setIsVipOverlayOpen] = useState(false);
    const [selectedTracks, setSelectedTracks] = useState<string[]>([]);

    // derive VIP albums
    const vipAlbums = useMemo(() => {
        return albums.filter(a => new Date(a.releaseDate) > new Date());
    }, [albums]);


    // Auto-Add Track Logic (Wait for albums to load)
    useEffect(() => {
        const trackTitleToAdd = searchParams?.get('addTrack');
        if (trackTitleToAdd && albums.length > 0) {
            // Find the track
            const allTracks = albums.flatMap(a => a.tracks);
            const foundTrack = allTracks.find(t => t.title.toLowerCase() === trackTitleToAdd.toLowerCase());

            if (foundTrack) {
                const uniqueId = foundTrack.albumId ? `${foundTrack.albumId}-${foundTrack.id}` : String(foundTrack.id);
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
                const newParams = new URLSearchParams(searchParams?.toString() || '');
                newParams.delete('addTrack');
                router.replace(`/music?${newParams.toString()}`, { scroll: false });
            }
        }
    }, [searchParams, router, albums]);

    const filterButtons = [
        { id: 'latest', label: 'Latest Release', icon: Clock },
        { id: 'trending', label: 'Trending', icon: TrendingUp },
        { id: 'favorites', label: 'Fan Favorites', icon: Star }
    ];

    // derive tracks based on state
    const { tracks, title } = useMemo(() => {
        // Helper to filter out future releases
        const activeAlbums = albums.filter(a => isReleased(a.releaseDate));
        const allActiveTracks = activeAlbums.flatMap(a => a.tracks.map(t => ({ ...t, albumId: a.id })));


        if (filterMode === 'album' && selectedAlbumId) {
            const album = albums.find(a => a.id === selectedAlbumId);
            const isReleasedAlbum = album ? isReleased(album.releaseDate) : false;

            return {
                tracks: (album && isReleasedAlbum) ? album.tracks.map(t => ({ ...t, albumId: album.id })) : [],
                title: (album && !isReleasedAlbum) ? 'Coming Soon' : (album ? album.title : 'Album not found')
            };
        }

        if (filterMode === 'latest') {
            const studios = activeAlbums
                .filter(a => {
                    // Exclude Country albums
                    const isCountry = a.genre && a.genre.some(g => g.toLowerCase() === 'country');
                    return !isCountry && (a.type === 'studio' || a.type === 'standard');
                })
                .sort((a, b) => {
                    const timeA = new Date(a.releaseDate).getTime();
                    const timeB = new Date(b.releaseDate).getTime();
                    if (timeB === timeA) {
                        if (b.title === 'A Love That Never Ends') return 1;
                        if (a.title === 'A Love That Never Ends') return -1;
                        return 0;
                    }
                    return timeB - timeA;
                });
            const latestAlbum = studios.length > 0 ? studios[0] : (activeAlbums.length > 0 ? activeAlbums[0] : null);

            return {
                tracks: latestAlbum ? latestAlbum.tracks.map(t => ({ ...t, albumId: latestAlbum.id })) : [],
                title: latestAlbum ? `Latest Release: ${latestAlbum.title}` : 'Latest Release'
            };
        }

        if (filterMode === 'all') {
            return {
                tracks: allActiveTracks,
                title: 'All Tracks'
            };
        }

        if (filterMode === 'trending') {
            // Logic: Manual Trending items first, then Latest Tracks
            const trendingFromMetadata = activeAlbums.filter(a => a.trending)
                .flatMap(a => a.tracks.slice(0, 4).map(t => ({ ...t, albumId: a.id })));

            // Map for quick lookup
            const albumDateMap = new Map(activeAlbums.map(a => [a.id, new Date(a.releaseDate || 0).getTime()]));

            const recentTracks = [...allActiveTracks]
                .sort((a, b) => {
                    const timeB = albumDateMap.get(b.albumId!) || 0;
                    const timeA = albumDateMap.get(a.albumId!) || 0;
                    return timeB - timeA;
                })
                .slice(0, 30);



            // Deduplicate and combine
            const combined = [...trendingFromMetadata];
            recentTracks.forEach(t => {
                if (!combined.some(ct => ct.title === t.title)) {
                    combined.push(t);
                }
            });

            return {
                tracks: combined.slice(0, 20),
                title: 'Trending Now'
            };
        }

        if (filterMode === 'favorites') {
            // Logic: Sort all tracks by "plays" (from spreadsheet)
            const topPlayedTracks = [...allActiveTracks]
                .sort((a, b) => {
                    const playsA = parseInt(String(a.plays).replace(/[^0-9]/g, '')) || 0;
                    const playsB = parseInt(String(b.plays).replace(/[^0-9]/g, '')) || 0;
                    return playsB - playsA;
                })
                .slice(0, 24);

            return {
                tracks: topPlayedTracks,
                title: 'Fan Favorites'
            };
        }

        return { tracks: [], title: '' };
    }, [filterMode, selectedAlbumId, albums]); // Added albums

    const handleSelectAlbum = (id: string) => {
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
                albums={albums} // All albums for standard discography
                onSelectAlbum={handleSelectAlbum}
                title="Explore Discography"
            />
            <AlbumOverlay
                isOpen={isVipOverlayOpen}
                onClose={() => setIsVipOverlayOpen(false)}
                albums={vipAlbums}
                onSelectAlbum={handleSelectAlbum}
                title="VIP Vault 👑"
            />

            <div className={styles.header}>
                <h1>SingIt Pop Music</h1>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem', alignItems: 'center' }}>
                    <p>Create your own custom Mixtapes (Club Members), explore the discography, and unlock exclusive content.</p>
                    {(isInsider || isPro || isLabel) && (
                        <p style={{ fontSize: '0.9rem', color: 'var(--accent)', background: 'rgba(255,0,128,0.1)', padding: '0.5rem 1rem', borderRadius: '20px', border: '1px solid rgba(255,0,128,0.2)' }}>
                            <strong>💡 Tip:</strong> Tap the checkbox next to any track to start building your mix!
                        </p>
                    )}
                </div>

                {/* Top Mixtape CTA - Only for Free Users (Insiders use Floating Box) */}
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

                            {(isPro || isInsider || isLabel) && (
                                <button
                                    className="secondary-button"
                                    style={{ fontSize: '0.9rem', padding: '0.5rem 1rem', background: 'rgba(255,255,255,0.1)', borderColor: 'rgba(255,255,255,0.2)', color: 'white' }}
                                    onClick={() => {
                                        const title = prompt("Name your Mixtape for the Community:");
                                        if (!title) return;

                                        fetch('/api/community/playlist', {
                                            method: 'POST',
                                            headers: { 'Content-Type': 'application/json' },
                                            body: JSON.stringify({
                                                title: title,
                                                tracks: selectedTracks
                                            })
                                        }).then(res => res.json()).then(data => {
                                            if (data.success) {
                                                alert("Mixtape shared to Community Hub!");
                                                router.push('/fan-albums');
                                            } else {
                                                alert("Failed to share: " + (data.error || "Unknown error"));
                                            }
                                        }).catch(err => alert("Error sharing mix"));
                                    }}
                                >
                                    Share to Community 🌍
                                </button>
                            )}
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

                    <div style={{ display: 'flex', gap: '1rem' }}>
                        <button
                            className={styles.browseBtn}
                            onClick={() => {
                                // Check VIP Access
                                if (!isPro && !isLabel) {
                                    alert("VIP Early Access Required! Upgrade your membership to access the VIP Vault.");
                                    return;
                                }
                                setIsVipOverlayOpen(true);
                            }}
                            style={{ background: 'linear-gradient(45deg, #FFD700, #FFA500)', border: 'none', color: '#000', fontWeight: 'bold' }}
                        >
                            <Crown size={18} />
                            VIP Access
                        </button>

                        <button className={styles.browseBtn} onClick={() => setIsOverlayOpen(true)}>
                            <Grid size={18} />
                            Browse Discography
                        </button>
                    </div>
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



                        {(filterMode === 'album' || filterMode === 'latest') && !isInsider && !isPro && !isLabel && (
                            <button
                                className="primary-button"
                                style={{ fontSize: '0.9rem', padding: '0.6rem 1.2rem' }}
                                onClick={() => {
                                    const allTrackIds = tracks.map(t => t.albumId ? `${t.albumId}-${t.id}` : String(t.id));
                                    window.location.href = `/music/checkout?type=download&tracks=${allTrackIds.join(',')}`;
                                }}
                            >
                                Purchase Full Album (£{siteContent.musicPage.prices.album.toFixed(2)})
                            </button>
                        )}
                    </div>
                    <SongList
                        tracks={tracks}
                        albums={albums}
                        selectedTracks={selectedTracks}
                        onToggleSelection={handleToggleSelection}
                        latestSingleUid={latestSingleUid}
                    />
                </div>

                {/* Right: Charts/Promo */}
                <div className={styles.sidebarRight}>
                    <Charts albums={albums} />


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
                System Version: v2026.01.25-MixtapeUpdate (Build: Live)
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
