'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import styles from '@/app/licensing/page.module.css';
import PricingCalculator from './PricingCalculator';
import SponsorshipModal from './SponsorshipModal';

import { Play, Pause, Search, Award, Music, ArrowLeft, X } from 'lucide-react';

interface TrackLibraryProps {
    albums: any[];
    advertTracks: any[];
}

export default function TrackLibrary({ albums, advertTracks }: TrackLibraryProps) {
    const [selectedAlbum, setSelectedAlbum] = useState<any | null>(null);
    const [selectedTrack, setSelectedTrack] = useState<any | null>(null);
    const [searchQuery, setSearchQuery] = useState('');
    const [activeTab, setActiveTab] = useState<'all' | 'niche'>('all');
    
    // Audio State
    const [playingTrackId, setPlayingTrackId] = useState<string | null>(null);
    const [isPlaying, setIsPlaying] = useState(false);
    const [currentSignedUrl, setCurrentSignedUrl] = useState<string | null>(null);
    const [previewEnded, setPreviewEnded] = useState(false);
    const audioRef = React.useRef<HTMLAudioElement | null>(null);

    const [sponsorships, setSponsorships] = useState<Record<string, any>>({});

    // Fetch sponsorships on mount
    React.useEffect(() => {
        fetch('/api/music/sponsorships')
            .then(res => res.json())
            .then(data => {
                const map: Record<string, any> = {};
                if (data.sponsorships) {
                    data.sponsorships.forEach((s: any) => map[s.trackId] = s);
                }
                setSponsorships(map);
            })
            .catch(err => console.error('Error loading sponsorships:', err));
    }, []);

    const handlePlay = async (track: any, albumId: string) => {
        const uniqueId = `${albumId}-${track.id}`;
        if (playingTrackId === uniqueId) {
            if (isPlaying) {
                audioRef.current?.pause();
            } else {
                audioRef.current?.play();
            }
            setIsPlaying(!isPlaying);
            return;
        }

        setPlayingTrackId(uniqueId);
        setIsPlaying(false);
        setCurrentSignedUrl(null);

        try {
            const res = await fetch('/api/music/sign', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ url: track.audioUrl, title: track.title, albumId })
            });
            const data = await res.json();
            if (data.signedUrl) {
                setCurrentSignedUrl(data.signedUrl);
                setIsPlaying(true);
            }
        } catch (e) {
            console.error("Failed to sign audio", e);
        }
    };

    const filteredAlbums = React.useMemo(() => {
        if (activeTab === 'niche') return [];
        return albums.filter(album => 
            album.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
            album.tracks.some((t: any) => t.title.toLowerCase().includes(searchQuery.toLowerCase()))
        );
    }, [albums, searchQuery, activeTab]);

    const nicheTracks = React.useMemo(() => {
        return advertTracks.filter(track => 
            track.title.toLowerCase().includes(searchQuery.toLowerCase())
        );
    }, [advertTracks, searchQuery]);

    return (
        <section id="library" className={styles.librarySection}>
            <div className={styles.libraryHeader}>
                <h2 className={styles.sectionHeading}>{selectedAlbum ? selectedAlbum.title : 'Licensing Catalog'}</h2>
                <div className={styles.libraryTabs}>
                    <button 
                        className={activeTab === 'all' ? styles.activeTab : ''} 
                        onClick={() => { setActiveTab('all'); setSelectedAlbum(null); }}
                    >
                        Official Albums
                    </button>
                    <button 
                        className={activeTab === 'niche' ? styles.activeTab : ''} 
                        onClick={() => { setActiveTab('niche'); setSelectedAlbum(null); }}
                    >
                        Sync for Brands
                    </button>
                </div>
            </div>

            <div className={styles.filtersBar}>
                <div className={styles.searchWrapper}>
                    <Search size={18} className={styles.searchIcon} />
                    <input 
                        type="text" 
                        placeholder={selectedAlbum ? `Search tracks in ${selectedAlbum.title}...` : "Search albums or tracks..."}
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                    />
                </div>
                {selectedAlbum && (
                    <button className={styles.backBtn} onClick={() => setSelectedAlbum(null)}>
                        <ArrowLeft size={16} /> Back to Albums
                    </button>
                )}
            </div>

            {/* ALBUM GRID VIEW */}
            {!selectedAlbum && activeTab === 'all' && (
                <div className={styles.albumGrid}>
                    {filteredAlbums.map((album, i) => (
                        <div key={album.id} className={styles.albumCard} onClick={() => setSelectedAlbum(album)}>
                            <div className={styles.albumArtWrapper}>
                                <Image 
                                    src={album.coverArt} 
                                    alt={album.title} 
                                    width={300} 
                                    height={300} 
                                    className={styles.albumArt}
                                />
                                {album.accessTier === 'vip' && (
                                    <div className={styles.vipBadge}>VIP EXCLUSIVE</div>
                                )}
                            </div>
                            <div className={styles.albumInfo}>
                                <h3>{album.title}</h3>
                                <p>{album.tracks.length} Licensable Tracks</p>
                            </div>
                        </div>
                    ))}
                </div>
            )}

            {/* TRACK LIST VIEW (When album selected or Niche tab) */}
            {(selectedAlbum || activeTab === 'niche') && (
                <div className={styles.trackLibraryList}>
                    {(selectedAlbum ? selectedAlbum.tracks : nicheTracks).map((track: any, i: number) => {
                        const albumId = selectedAlbum ? selectedAlbum.id : 'niche';
                        const uniqueId = `${albumId}-${track.id}`;
                        const isCurrent = playingTrackId === uniqueId;
                        const sponsor = sponsorships[uniqueId];

                        return (
                            <div key={uniqueId} className={styles.licensingTrackRow}>
                                <div className={styles.trackPlayCell}>
                                    <button 
                                        className={styles.rowPlayBtn} 
                                        onClick={() => handlePlay(track, albumId)}
                                    >
                                        {isCurrent && isPlaying ? <Pause size={16} fill="white" /> : <Play size={16} fill="white" />}
                                    </button>
                                </div>
                                <div className={styles.trackInfoCell}>
                                    <div className={styles.trackPrimary}>
                                        <span className={styles.trackTitle}>{track.title}</span>
                                        {sponsor && (
                                            <span className={styles.rowSponsorBadge} title={`Sponsored by ${sponsor.name}`}>
                                                <Award size={12} fill="currentColor" /> {sponsor.name}
                                            </span>
                                        )}
                                    </div>
                                    <div className={styles.trackSecondary}>
                                        {track.genre} &bull; {track.mood || 'Commercial'} &bull; {track.duration}
                                    </div>
                                </div>
                                <div className={styles.trackActionCell}>
                                    <button 
                                        className={styles.rowLicenseBtn}
                                        onClick={() => setSelectedTrack({ ...track, albumTitle: selectedAlbum?.title || 'Sync Archive' })}
                                    >
                                        License
                                    </button>
                                </div>
                            </div>
                        );
                    })}
                </div>
            )}

            {/* PREVIEW LIMIT NOTIFICATION */}
            {previewEnded && (
                <div className={styles.previewToast}>
                    <div className={styles.toastContent}>
                        <Music className="text-cyan-400" size={24} />
                        <div>
                            <h4 className="font-bold">Preview Ended</h4>
                            <p className="text-sm opacity-70 text-white">License this track to unlock the full high-quality version.</p>
                        </div>
                    </div>
                    <button 
                        className={styles.toastAction}
                        onClick={() => {
                            setPreviewEnded(false);
                            const track = playingTrackId ? (albums.flatMap(a => a.tracks).find(t => `${a.id}-${t.id}` === playingTrackId) || nicheTracks.find(t => `niche-${t.id}` === playingTrackId)) : null;
                            if (track) setSelectedTrack(track);
                        }}
                    >
                        License Now
                    </button>
                    <button className={styles.toastClose} onClick={() => setPreviewEnded(false)}>
                        <X size={16} />
                    </button>
                </div>
            )}

            <audio 
                ref={audioRef} 
                src={currentSignedUrl || undefined}
                onPlay={() => { setIsPlaying(true); setPreviewEnded(false); }}
                onPause={() => setIsPlaying(false)}
                onEnded={() => setIsPlaying(false)}
                onTimeUpdate={(e) => {
                    const audio = e.currentTarget;
                    // Industry Standard Preview: 90 seconds (1.5 mins)
                    if (audio.currentTime > 90) {
                        console.warn("🔐 Preview limit reached (90s). Pausing playback.");
                        audio.pause();
                        audio.currentTime = 0;
                        setIsPlaying(false);
                        setPreviewEnded(true);
                    }
                }}
                autoPlay
            />

            {/* Render Pricing Calculator Modal */}
            {selectedTrack && (
                <PricingCalculator 
                    track={selectedTrack} 
                    onClose={() => setSelectedTrack(null)} 
                />
            )}
        </section>
    );
}
