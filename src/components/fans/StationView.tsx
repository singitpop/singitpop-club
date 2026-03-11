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
}

const STATIONS = [
    { freq: '101.5', name: 'Pop Hits', genre: 'Pop', color: '#FF0080', img: '/stations/station_pop_hits_1769687866768.png' },
    { freq: '98.5', name: 'Country Roads', genre: 'Country', color: '#FFA500', img: '/stations/station_country_roads_1769687894278.png' },
    { freq: '104.2', name: 'Rock Classics', genre: 'Rock', color: '#007CF0', img: '/stations/station_rock_classics_1769688015837.png' },
    { freq: '107.9', name: 'Party Mix', genre: 'Dance', color: '#7928CA', img: '/stations/station_party_mix_1769688110910.png' },
    { freq: '88.0', name: 'Chill / Folk', genre: 'Folk', color: '#4ade80', img: '/stations/station_chill_folk_1769687928384.png' },
    { freq: '92.3', name: 'All Hits', genre: 'All', color: '#ffd700', img: '/stations/station_all_hits_gold_label_1769698667175.png' }
];

import { useAuth } from '@/context/AuthContext';

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

        // Handle albumGenre safely
        const rawAg = (t as any).albumGenre;
        const ag = Array.isArray(rawAg)
            ? rawAg.map((x: string) => x.toLowerCase()).join(' ')
            : (typeof rawAg === 'string' ? rawAg.toLowerCase() : "");

        const s = stationGenre.toLowerCase();

        // Strict genre matching to prevent cross-contamination
        if (s === 'pop') {
            // Pop ONLY - exclude rock, dance, country, folk
            return g.includes('pop') && !g.includes('rock') && !g.includes('dance') && !g.includes('country') && !g.includes('folk');
        }
        if (s === 'rock') return g.includes('rock') || g.includes('alternative') || g.includes('metal') || g.includes('grunge');
        if (s === 'country') return g.includes('country') || g.includes('americana');
        if (s === 'folk') return g.includes('folk') || g.includes('acoustic') || g.includes('singer-songwriter');
        if (s === 'dance') return g.includes('dance') || g.includes('disco') || g.includes('edm') || g.includes('house');

        return g.includes(s) || ag.includes(s);
    });
};

export default function StationView({ currentTrackId, isPlaying, onPlayTrack, currentTrack, onNext, onStop }: StationViewProps) {
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

        // Find album for artwork
        const album = albums.find(a => a.id === randomTrack.albumId);

        const trackToPlay = {
            ...randomTrack,
            uniqueId: `${album?.id}-${randomTrack.id}`,
            coverArt: album?.coverArt
        };

        onPlayTrack(trackToPlay);
    };

    // Auto-switch station logic
    const handleStationChange = (station: any) => {
        setActiveStation(station);
        // We trigger a play immediately with new station context
        setTimeout(() => {
            playRandomForStation(station);
        }, 100);
    };

    const playRandomForStation = (station: any) => {
        let filtered = getStationTracks(station.genre, isPro);

        if (filtered.length === 0) {
            // Fallback to all tracks if no specific genre tracks are found
            filtered = getStationTracks('All', isPro);
        }

        const randomTrack = filtered[Math.floor(Math.random() * filtered.length)];
        const album = albums.find(a => a.id === randomTrack.albumId);
        onPlayTrack({
            ...randomTrack,
            uniqueId: `${album?.id}-${randomTrack.id}`,
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
                    <h2 className={styles.trackTitle}>{capitalizeTitle(displayTrack.title)}</h2>
                    <p className={styles.artistName}>
                        {displayTrack.artist || (currentTrack ? "SingIt Pop" : "Tune In Now")}
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
