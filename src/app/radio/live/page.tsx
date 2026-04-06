'use client';

import React, { useState, useEffect, useMemo } from 'react';
import { Player } from '@remotion/player';
import { CountrySignalRadio } from '@/video/compositions/CountrySignalRadio';

interface Track {
    id: number;
    title: string;
    artist?: string;
    audioUrl: string;
    coverArt?: string;
}

interface Album {
    id: string;
    title: string;
    artist: string;
    genre: string[];
    coverArt: string;
    tracks: Track[];
}

export default function RadioLivePage() {
    const [albums, setAlbums] = useState<Album[]>([]);
    const [currentIndex, setCurrentIndex] = useState(0);
    const [loading, setLoading] = useState(true);

    const [started, setStarted] = useState(false);
    
    // Auto-start for OBS if ?autoplay=true is in the URL
    useEffect(() => {
        if (typeof window !== 'undefined') {
            const params = new URLSearchParams(window.location.search);
            if (params.get('autoplay') === 'true' || params.get('obs') === 'true') {
                setStarted(true);
            }
        }
    }, []);

    useEffect(() => {
        const fetchAlbums = async () => {
            try {
                const res = await fetch('/api/content/albums');
                const data = await res.json();
                
                // 1. Definitive Country Signal Allowlist (ONLY these 18 albums play)
                const PERMITTED_ALBUM_IDS = [
                    "southern-lights-2026",
                    "winding-roads-2026",
                    "last-ones-standing-2026",
                    "live-nashville-in-june-2026",
                    "through-the-glass-2026",
                    "boots-and-beats-country-line-dance-anthems-2024",
                    "whispers-of-the-heart-country-ballads-for-the-soul-2026",
                    "highways-of-the-heart-2024",
                    "heartland-rhythms-2026",
                    "dust-and-diamonds-2026",
                    "wildcards-and-whiskey-2026",
                    "october-boots-and-fall-roots-2026",
                    "the-long-way-home-2026",
                    "live-at-autumn-lights-2026",
                    "live-step-into-the-light-2025",
                    "desert-winds-and-open-roads-2026",
                    "forever-starts-today-country-music-for-weddings-2024"
                ];

                const countryAlbums = data.filter((a: any) => PERMITTED_ALBUM_IDS.includes(a.id));
                console.log(`[Radio] Station Locked: ${countryAlbums.length} approved albums in rotation.`);
                
                // Shuffle playlist
                const playlist = countryAlbums.flatMap((a: any) => 
                    a.tracks.map((t: any) => ({
                        ...t,
                        artist: a.artist,
                        albumTitle: a.title,
                        coverArt: a.coverArt
                    }))
                );
                
                const shuffled = [...playlist].sort(() => Math.random() - 0.5);
                setAlbums(shuffled as any);
                setLoading(false);
            } catch (err) {
                console.error("Failed to load radio tracks:", err);
            }
        };
        fetchAlbums();
    }, []);

    const currentTrack = albums[currentIndex];

    if (loading || !currentTrack) {
        return (
            <div className="min-h-screen bg-black flex items-center justify-center text-white font-mono">
                <div className="flex flex-col items-center gap-4">
                    <div className="w-12 h-12 border-4 border-red-600 border-t-transparent rounded-full animate-spin"></div>
                    <p className="text-xl tracking-widest uppercase">Initializing Country Signal...</p>
                </div>
            </div>
        );
    }

    const nextTrack = () => {
        setCurrentIndex((prev) => (prev + 1) % albums.length);
    };

    return (
        <main className="fixed inset-0 bg-black overflow-hidden flex items-center justify-center">
            {/* The Broadcast Audio Engine - 24/7 Loop */}
            {started && (
                <audio 
                    src={(currentTrack as any).audioUrl} 
                    autoPlay 
                    onEnded={nextTrack}
                    onError={() => {
                        // Silent skip to keep the station professional and avoid dev overlays
                        nextTrack();
                    }}
                />
            )}

            {/* The Broadcast Player - True Full Screen Background */}
            <div className="absolute inset-0 z-0">
                <Player
                    component={CountrySignalRadio as any}
                    durationInFrames={900 * 30}
                    fps={30}
                    compositionWidth={1920}
                    compositionHeight={1080}
                    style={{
                        width: '100%',
                        height: '100%',
                        objectFit: 'cover',
                    }}
                    inputProps={{
                        title: currentTrack.title,
                        albumTitle: (currentTrack as any).albumTitle || "Country Signal",
                        backgroundImg: "/radio-station-background.png",
                        accentColor: "#FF0000"
                    }}
                    autoPlay={started}
                    loop
                />
            </div>

            {!started ? (
                <div 
                    onClick={() => setStarted(true)}
                    className="absolute inset-0 z-[10000] bg-black/90 flex flex-col items-center justify-center cursor-pointer group hover:bg-black/80 transition-all"
                >
                    <div className="w-24 h-24 mb-6 border-4 border-white/20 group-hover:border-red-600 rounded-full flex items-center justify-center transition-all">
                        <div className="w-0 h-0 border-t-[15px] border-t-transparent border-l-[25px] border-l-white border-b-[15px] border-b-transparent ml-2 group-hover:scale-110 transition-transform"></div>
                    </div>
                    <h2 className="text-white text-3xl font-black uppercase tracking-[10px] items-center flex gap-4">
                        Enter Station
                    </h2>
                    <p className="text-white/40 mt-4 text-xs tracking-[4px] uppercase">Click to start broadcast audio</p>
                </div>
            ) : (
                <>
                    {/* UI Layer - Always Visible and Corner-Pinned */}
                    <div className="absolute inset-0 z-50 pointer-events-none">
                        
                        {/* Branded Watermark - Bottom Left */}
                        <div className="absolute bottom-20 left-20 flex flex-col items-start gap-4 animate-in fade-in slide-in-from-left duration-1000">
                            <img 
                                src="/country-signal-logo.png" 
                                className="w-32 h-auto drop-shadow-[0_10px_30px_rgba(0,0,0,0.8)]" 
                                alt="Station Logo"
                            />
                            <div className="flex items-center gap-3 bg-black/40 backdrop-blur-md px-4 py-2 rounded-full border border-white/10">
                                <div className="w-2 h-2 bg-red-600 rounded-full animate-pulse shadow-[0_0_10px_#dc2626]"></div>
                                <span className="text-white text-[8px] font-bold tracking-[2px] uppercase">Broadcast Online</span>
                            </div>
                        </div>

                        {/* Now Playing HUD - Bottom Right */}
                        <div className="absolute bottom-20 right-0 w-[500px] flex flex-col items-end animate-in fade-in slide-in-from-right duration-1000">
                            <div className="bg-black/80 backdrop-blur-2xl border-r-[12px] border-red-600 px-8 py-6 rounded-l-[32px] shadow-[0_30px_60px_rgba(0,0,0,1)] flex flex-col items-end text-right">
                                <span className="text-white/40 text-xs font-bold tracking-[4px] uppercase mb-2">Now Playing</span>
                                <h1 className="text-white text-4xl font-black leading-tight mb-2 uppercase tracking-tighter drop-shadow-lg">
                                    {currentTrack.title}
                                </h1>
                                <h2 className="text-red-600 text-lg font-bold tracking-[2px] uppercase">
                                    {(currentTrack as any).albumTitle || "Country Signal"}
                                </h2>
                                
                                {/* Visualizer Decoration */}
                                <div className="flex items-end gap-1 h-6 mt-4 opacity-60">
                                    {Array.from({ length: 30 }).map((_, i) => (
                                        <div 
                                            key={i} 
                                            className="w-1 bg-red-600 rounded-full animate-pulse"
                                            style={{ 
                                                height: `${20 + Math.random() * 80}%`,
                                                animationDelay: `${i * 0.05}s`
                                            }}
                                        />
                                    ))}
                                </div>
                            </div>
                        </div>

                        {/* Credits - Bottom Right Corner */}
                        <div className="absolute bottom-8 right-20 opacity-40 text-white text-[9px] font-bold tracking-[4px] uppercase">
                            Created by Gary Birrell &bull; SingItPop.com
                        </div>
                    </div>
                </>
            )}
        </main>
    );
}
