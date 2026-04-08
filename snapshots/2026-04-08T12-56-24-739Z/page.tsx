'use client';

export const dynamic = 'force-dynamic';

import React, { useState, useEffect } from 'react';
import nextDynamic from 'next/dynamic';

// Ghost Isolation for Visuals & Player
const Player = nextDynamic(
    () => import('@remotion/player').then((mod) => mod.Player),
    { ssr: false }
);

const CountrySignalVisuals = nextDynamic(
    () => import('@/video/compositions/CountrySignalRadio').then((mod) => mod.CountrySignalRadio),
    { ssr: false }
);

interface Track {
    id: number;
    title: string;
    artist?: string;
    audioUrl: string;
    albumTitle?: string;
    coverArt?: string;
    releaseDate?: string;
}

/**
 * RADIO 7.0: NASHVILLE BASELINE
 * A high-performance, strictly whitelisted radio engine.
 * Redundant filters purged. Stability maximized.
 */
export default function RadioLivePage() {
    const [tracks, setTracks] = useState<Track[]>([]);
    const [currentIndex, setCurrentIndex] = useState(0);
    const [loading, setLoading] = useState(true);
    const [started, setStarted] = useState(false);
    const [isCooldown, setIsCooldown] = useState(false);
    
    // NUCLEAR FLUSH VERSION: Ensures all client caches are overwritten
    const STATION_VERSION = "RADIO_V7_NASHVILLE_STABLE";

    useEffect(() => {
        const fetchStationData = async () => {
            try {
                const res = await fetch('/api/content/albums');
                if (!res.ok) throw new Error("Station Signal Failure");
                const albums = await res.json();
                
                // 1. Flatten into dynamic playlist
                const pool: Track[] = [];
                const seenUrls = new Set();

                albums.forEach((a: any) => {
                    (a.tracks || []).forEach((t: any) => {
                        if (!t.audioUrl || t.audioUrl.trim() === "") return;
                        if (seenUrls.has(t.audioUrl)) return;
                        
                        seenUrls.add(t.audioUrl);
                        pool.push({
                            ...t,
                            artist: a.artist,
                            albumTitle: a.title,
                            coverArt: a.coverArt,
                            releaseDate: a.releaseDate
                        });
                    });
                });

                // 2. Persistence / Cache Flush Check
                const savedFingerprint = localStorage.getItem('countrySignal_fingerprint');
                const savedPlaylistStr = localStorage.getItem('countrySignal_playlist');
                const fingerprint = STATION_VERSION + pool.length;

                let finalPlaylist = [];

                if (savedFingerprint === fingerprint && savedPlaylistStr) {
                    console.log("[Nashville-UI] Resuming cached session.");
                    finalPlaylist = JSON.parse(savedPlaylistStr);
                    const savedIdx = parseInt(localStorage.getItem('countrySignal_index') || "0", 10);
                    setCurrentIndex(isNaN(savedIdx) ? 0 : savedIdx);
                } else {
                    console.log("[Nashville-UI] Station Refresh: Shuffling library.");
                    finalPlaylist = [...pool].sort(() => Math.random() - 0.5); // Fast Shuffle
                    localStorage.setItem('countrySignal_playlist', JSON.stringify(finalPlaylist));
                    localStorage.setItem('countrySignal_fingerprint', fingerprint);
                    setCurrentIndex(0);
                }

                setTracks(finalPlaylist);
                setLoading(false);
            } catch (err) {
                console.error("[Nashville-UI] Signal Failure:", err);
            }
        };
        fetchStationData();
    }, []);

    const nextTrack = (wasError = false) => {
        const nextIndex = (currentIndex + 1) % tracks.length;
        setCurrentIndex(nextIndex);
        localStorage.setItem('countrySignal_index', nextIndex.toString());
    };

    const currentTrack = tracks[currentIndex];

    if (loading || !currentTrack) {
        return (
            <div className="min-h-screen bg-black flex items-center justify-center text-white font-mono">
                <div className="flex flex-col items-center gap-4">
                    <div className="w-12 h-12 border-4 border-red-600 border-t-transparent rounded-full animate-spin"></div>
                    <p className="text-xl tracking-widest uppercase">Tuning Nashville Stable...</p>
                </div>
            </div>
        );
    }

    return (
        <main className="fixed inset-0 bg-black overflow-hidden flex items-center justify-center">
            {started && (
                <div className="absolute top-10 right-10 z-[100] pointer-events-auto">
                    <a href="/" className="flex items-center gap-3 bg-black/40 hover:bg-red-600/80 backdrop-blur-xl px-6 py-3 rounded-full border border-white/10 text-white transition-all transform hover:scale-105">
                        <span className="text-[10px] font-black uppercase tracking-[4px]">Back to Home</span>
                    </a>
                </div>
            )}

            {/* Nashville Native Audio Engine */}
            {started && (
                <audio 
                    src={currentTrack.audioUrl} 
                    autoPlay 
                    onEnded={() => nextTrack()}
                    onError={() => {
                        if (isCooldown) return;
                        setIsCooldown(true);
                        console.warn(`[Station-Safety] Link unstable: ${currentTrack.title}. Skipping...`);
                        setTimeout(() => {
                            nextTrack(true);
                            setIsCooldown(false);
                        }, 2000); // 2s Safety Barrier
                    }}
                />
            )}

            {/* The Cinematic Stage */}
            <div className="absolute inset-0 z-0 scale-105">
                <Player
                    component={CountrySignalVisuals as any}
                    durationInFrames={900 * 30}
                    fps={30}
                    compositionWidth={1920}
                    compositionHeight={1080}
                    style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                    inputProps={{
                        title: currentTrack.title,
                        albumTitle: currentTrack.albumTitle || "Nashville Broadcast",
                        releaseDate: currentTrack.releaseDate,
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
                    className="absolute inset-0 z-[10000] bg-black/80 flex flex-col items-center justify-center cursor-pointer group backdrop-blur-sm"
                >
                    <div className="w-24 h-24 mb-6 border-4 border-white/20 group-hover:border-red-600 rounded-full flex items-center justify-center transition-all bg-white/5">
                        <div className="w-0 h-0 border-t-[15px] border-t-transparent border-l-[25px] border-l-white border-b-[15px] border-b-transparent ml-2 group-hover:scale-110 transition-transform"></div>
                    </div>
                    <h2 className="text-white text-3xl font-black uppercase tracking-[15px]">STABLE SIGNAL</h2>
                    <p className="text-white/40 mt-4 text-[10px] tracking-[4px] uppercase">Click to resume 24/7 Nashville broadcast</p>
                </div>
            ) : (
                <div className="absolute inset-0 z-50 pointer-events-none">
                    {/* Branded HUD Layer */}
                    <div className="absolute bottom-20 left-20 animate-in fade-in slide-in-from-left duration-1000">
                        <img src="/country-signal-logo.png" className="w-32 h-auto opacity-90 drop-shadow-2xl mb-4" />
                        <div className="flex items-center gap-3 bg-red-600/20 backdrop-blur-xl px-4 py-2 rounded-full border border-red-600/30">
                            <div className="w-2 h-2 bg-red-600 rounded-full animate-pulse"></div>
                            <span className="text-white text-[8px] font-black tracking-[2px] uppercase">Master Signal Locked</span>
                        </div>
                    </div>

                    <div className="absolute bottom-20 right-0 w-[550px] flex flex-col items-end animate-in fade-in slide-in-from-right duration-1000">
                        <div className="bg-black/95 backdrop-blur-3xl border-r-[12px] border-red-600 px-10 py-8 rounded-l-[40px] shadow-2xl flex flex-col items-end text-right">
                            <span className="text-white/30 text-[10px] font-black tracking-[4px] uppercase mb-4">Now Broadcasting</span>
                            <h1 className="text-white text-4xl font-black leading-tight mb-2 uppercase tracking-tighter shadow-black drop-shadow-lg">
                                {currentTrack.title}
                            </h1>
                            <h2 className="text-red-600 text-lg font-black tracking-[2px] uppercase">
                                {currentTrack.albumTitle}
                            </h2>
                            <div className="flex items-end gap-1.5 h-8 mt-6 opacity-40">
                                {Array.from({ length: 25 }).map((_, i) => (
                                    <div key={i} className="w-1.5 bg-red-600 rounded-full animate-pulse" style={{ height: `${30 + Math.random() * 70}%`, animationDelay: `${i * 0.1}s` }} />
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </main>
    );
}
