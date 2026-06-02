'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useListeningHistory } from '@/hooks/useListeningHistory';
import { Play, Pause, SkipForward, Volume2, Radio, Square } from 'lucide-react';
import styles from './StationView.module.css';
import { albums } from '@/data/albumData';

import { capitalizeTitle } from '@/utils/formatters';

interface StationViewProps {
    currentTrackId: string | number | null;
    isPlaying: boolean;
    onPlayTrack: (track: any) => void;
    currentTrack?: any;
    onNext?: () => void;
    onStop?: () => void;
    onStationChange?: (genre: string) => void;
}

const STATIONS = [
    { freq: '101.5', name: 'Pop Hits', genre: 'Pop', color: '#FF0080', img: '/stations/station_pop_hits_1769687866768.png' },
    { freq: '98.5', name: 'Country Roads', genre: 'Country', color: '#FFA500', img: '/stations/station_country_roads_1769687894278.png' },
    { freq: '104.2', name: 'Rock Classics', genre: 'Rock', color: '#007CF0', img: '/stations/station_rock_classics_1769688015837.png' },
    { freq: '107.9', name: 'Party Mix', genre: 'Dance', color: '#7928CA', img: '/stations/station_party_mix_1769688110910.png' },
    { freq: '88.0', name: 'Chill / Folk', genre: 'Folk', color: '#4ade80', img: '/stations/station_chill_folk_1769687928384.png' }
];

import { useAuth } from '@/context/AuthContext';

const EXPLICIT_COUNTRY_ALBUM_IDS = [
    'southern-lights-2026',
    'winding-roads-2025',
    'last-ones-standing-2026',
    'live-nashville-in-june-2026',
    'through-the-glass-2026',
    'boots-and-beats-country-line-dance-anthems-2024',
    'whispers-of-the-heart-country-ballads-for-the-soul-2024',
    'forever-starts-today-country-music-for-weddings-2024',
    'highways-of-the-heart-2024',
    'heartland-rhythms-2025',
    'dust-and-diamonds-2025',
    'line-dancing-after-dark-2025',
    'wildcards-and-whiskey-2025',
    'october-boots-and-fall-roots-2025',
    'snowfall-and-steel-strings-2025',
    'the-long-way-home-2025',
    'live-at-autumn-lights-2025',
    'live-step-into-the-light-2025',
    'desert-winds-and-open-roads-2026',
    'boots-in-the-autumn-dust-2026',
    'september-turns-gold-2026',
    'when-the-lights-go-gold-2026'
];

const getStationTracks = (stationGenre: string, isVip: boolean) => {
    const now = new Date();

    // Flatten all tracks
    const allTracks = albums.flatMap(album => {
        // VIP Check: If album is future release and user is NOT VIP, skip it
        const releaseDate = new Date(album.releaseDate);
        if (!isVip && releaseDate > now) {
            return [];
        }

        return album.tracks.map(track => ({
            ...track,
            albumId: album.id,
            albumTitle: album.title,
            coverArt: album.coverArt, // Pass cover down
            // Ensure genre is normalized
            genre: track.genre || album.genre || 'Pop',
            albumGenre: album.genre
        }));
    }).filter(t => t.audioUrl); // Must have audio

    if (stationGenre === 'All') return allTracks;

    // Strict Filter
    return allTracks.filter(t => {
        // Handle genre safely (can be string or string[])
        const rawG = t.genre || "";
        const g = Array.isArray(rawG)
            ? rawG.map((x: string) => x.toLowerCase()).join(' ')
            : (typeof rawG === 'string' ? rawG.toLowerCase() : "");

        const s = stationGenre.toLowerCase();

        // 1. COUNTRY RADIO LOCKDOWN
        if (s === 'country') {
            const isExplicitlyPermitted = EXPLICIT_COUNTRY_ALBUM_IDS.includes(t.albumId);
            const isPureCountry = g.includes('country') && !g.includes('christmas') && !g.includes('pop');
            
            // Re-tagged "The Long Way Home" is now "Country" and should be in EXPLICIT_COUNTRY_ALBUM_IDS too just in case
            return isExplicitlyPermitted || isPureCountry;
        }

        // 2. POP RADIO LOCKDOWN
        if (s === 'pop') {
            // Pop + R&B/Soul - exclude rock, dance, country, folk, christmas
            return (g.includes('pop') || g.includes('r&b') || g.includes('soul') || g.includes('funk'))
                && !g.includes('rock') && !g.includes('dance') && !g.includes('country') && !g.includes('folk') && !g.includes('christmas');
        }

        // 3. OTHER GENRES
        if (s === 'rock') return g.includes('rock') || g.includes('alternative') || g.includes('metal');
        if (s === 'folk') return g.includes('folk') || g.includes('acoustic');
        if (s === 'dance') return g.includes('dance') || g.includes('disco') || g.includes('edm') || g.includes('house');

        return g.includes(s);
    });
};

export default function StationView({ currentTrackId, isPlaying, onPlayTrack, currentTrack, onNext, onStop, onStationChange }: StationViewProps) {
    const { isPro } = useAuth();
    const [visualizerBars, setVisualizerBars] = useState<number[]>([]);
    const [activeStation, setActiveStation] = useState(STATIONS[0]);
    const { logPlay } = useListeningHistory();

    useEffect(() => {
        if (currentTrack && isPlaying) {
            console.log("📊 Logging play for:", currentTrack.title);
            // Ensure we have a valid ID for logging, fallback to title if needed for radio
            const trackToLog = {
                ...currentTrack,
                id: currentTrack.id || currentTrack.title, // Fallback ID
                uniqueId: currentTrack.uniqueId || `${Date.now()}-${currentTrack.title}`
            };
            logPlay(trackToLog);
        }
    }, [currentTrack?.title, isPlaying]); // Depend on title to catch changes even if ID is same

    useEffect(() => {
        const interval = setInterval(() => {
            if (isPlaying) {
                setVisualizerBars(Array.from({ length: 20 }, () => Math.random()));
            }
        }, 100);
        return () => clearInterval(interval);
    }, [isPlaying]);

    // Handle "Start Radio"
    const handleStartRadio = () => {
        let filtered = getStationTracks(activeStation.genre, isPro);
        if (filtered.length === 0) filtered = getStationTracks('All', isPro);
        const randomTrack = filtered[Math.floor(Math.random() * filtered.length)];
        // Use albumId for lookup to avoid numeric ID collisions across albums
        const album = albums.find(a => a.id === randomTrack.albumId);
        onPlayTrack({
            ...randomTrack,
            uniqueId: `${album?.id}-${randomTrack.id}`,
            albumTitle: randomTrack.albumTitle || album?.title,
            coverArt: album?.coverArt
        });
    };

    // Auto-switch station logic
    const handleStationChange = (station: any) => {
        setActiveStation(station);
        onStationChange?.(station.genre);
        // We trigger a play immediately with new station context
        setTimeout(() => {
            playRandomForStation(station);
        }, 100);
    };

    const playRandomForStation = (station: any) => {
        let filtered = getStationTracks(station.genre, isPro);
        if (filtered.length === 0) filtered = getStationTracks('All', isPro);
        const randomTrack = filtered[Math.floor(Math.random() * filtered.length)];
        // Use albumId for lookup to avoid numeric ID collisions across albums
        const album = albums.find(a => a.id === randomTrack.albumId);
        onPlayTrack({
            ...randomTrack,
            uniqueId: `${album?.id}-${randomTrack.id}`,
            albumTitle: randomTrack.albumTitle || album?.title,
            coverArt: album?.coverArt
        });
    };

    // Display Logic
    const displayTrack = currentTrack || {
        title: "SingIt Pop Radio",
        artist: "Select a Station",
        coverArt: activeStation.img // Default to station image
    };

    let artwork = displayTrack.coverArt;
    if (!artwork && currentTrack) {
        const album = albums.find(a => a.tracks.some(t => t.id === currentTrack.id || t.title === currentTrack.title));
        if (album) artwork = album.coverArt;
    }
    // Fallback if still no artwork
    if (!artwork) artwork = activeStation.img;

    return (
        <div className={styles.container} style={{ '--glow-color': isPlaying ? activeStation.color : '#222' } as any}>
            <div className={styles.bgGlow} />

            {/* Tuner UI */}
            <div className={styles.tunerContainer}>
                <div className={styles.frequencyDisplay} style={{ color: activeStation.color, textShadow: `0 0 15px ${activeStation.color}` }}>
                    {activeStation.freq} <span style={{ fontSize: '1rem' }}>FM</span>
                </div>

                <div className={styles.tunerDial} style={{ borderColor: activeStation.color }}>
                    {STATIONS.map(s => (
                        <button
                            key={s.freq}
                            className={`${styles.stationBtn} ${activeStation.freq === s.freq ? styles.active : ''}`}
                            onClick={() => handleStationChange(s)}
                            style={{ borderColor: activeStation.freq === s.freq ? s.color : 'rgba(255,255,255,0.1)' }}
                        >
                            <span className={styles.stationFreq}>{s.freq}</span>
                            <span className={styles.stationName}>{s.name}</span>
                        </button>
                    ))}
                </div>
            </div>

            <div className={styles.header}>
                <div className={`${styles.onAirBadge}`} style={{ opacity: isPlaying ? 1 : 0.3 }}>
                    <div className={styles.onAirDot} />
                    ON AIR
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', opacity: 0.7 }}>
                    <Radio size={16} />
                    <span>{activeStation.name}</span>
                </div>
            </div>

            <div className={styles.playerCore}>
                <div className={styles.albumArtContainer}>
                    <div className={`${styles.vinyl} ${isPlaying ? styles.playing : ''}`}>
                        <img
                            src={artwork || "/Club_Gateway_Pop.png"}
                            alt="Album Art"
                            className={styles.artwork}
                            onError={(e) => {
                                const target = e.target as HTMLImageElement;
                                // Fallback to station image if artwork fails
                                if (!target.src.includes(activeStation.img || "")) {
                                    target.src = activeStation.img || "/Club_Gateway_Pop.png";
                                }
                            }}
                        />
                        <div className={styles.centerHole} />
                    </div>
                    {currentTrack && (
                        <div className={styles.diskTrackInfo}>
                            <p className={styles.diskTrackTitle}>{capitalizeTitle(displayTrack.title)}</p>
                            {displayTrack.artist && (
                                <p className={styles.diskTrackArtist}>{displayTrack.artist}</p>
                            )}
                        </div>
                    )}
                </div>

                <div className={styles.trackInfo}>
                    <h2 className={styles.trackTitle}>
                        {currentTrack
                            ? capitalizeTitle(currentTrack.albumTitle || activeStation.name)
                            : capitalizeTitle(displayTrack.title)}
                    </h2>
                    <p className={styles.artistName}>
                        {currentTrack ? activeStation.name : 'Tune In Now'}
                    </p>
                </div>

                <div className={styles.controls}>
                    <button className={`${styles.controlBtn} ${styles.stopBtn}`} onClick={() => onStop && onStop()} title="Stop Radio">
                        <Square size={20} fill="currentColor" />
                    </button>

                    <button
                        className={styles.playBtn}
                        onClick={() => {
                            if (currentTrack) {
                                onPlayTrack(currentTrack); // Toggle
                            } else {
                                handleStartRadio();
                            }
                        }}
                    >
                        {isPlaying ? <Pause size={30} fill="black" /> : <Play size={30} fill="black" style={{ marginLeft: '4px' }} />}
                    </button>

                    <button className={styles.controlBtn} onClick={handleStartRadio} title="Next / Shuffle">
                        <SkipForward size={24} fill="white" />
                    </button>
                </div>

                {/* Visualizer */}
                <div className={styles.visualizer}>
                    {visualizerBars.map((h, i) => (
                        <div
                            key={i}
                            className={styles.bar}
                            style={{
                                height: `${Math.max(5, h * 50)}px`,
                                backgroundColor: activeStation.color,
                                animation: 'none',
                                transition: 'height 0.1s ease',
                                opacity: isPlaying ? 1 : 0.3
                            }}
                        />
                    ))}
                </div>
            </div>
        </div>
    );
}
