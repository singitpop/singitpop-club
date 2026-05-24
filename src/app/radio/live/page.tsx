'use client';

export const dynamic = 'force-dynamic';

import React, { useState, useEffect } from 'react';
import nextDynamic from 'next/dynamic';
import Link from 'next/link';

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
 * RADIO 7.0: COUNTRY SIGNAL BASELINE
 * A high-performance, strictly whitelisted radio engine.
 * V15 SIGNAL LOCK ensures drift prevention and eliminates track flipping.
 */
export default function RadioLivePage() {
    const [tracks, setTracks] = useState<Track[]>([]);
    const [currentIndex, setCurrentIndex] = useState(0);
    const [loading, setLoading] = useState(true);
    const [started, setStarted] = useState(false);
    const [isCooldown, setIsCooldown] = useState(false);
    
    // NUCLEAR FLUSH VERSION: V15-SIGNAL-LOCK
    // This version uses ACTUAL track durations with a 5-second sync buffer to prevent flipping.
    const STATION_VERSION = "RADIO_V15_SIGNAL_LOCK";
    const SYNC_THRESHOLD = 5; // 5 seconds buffer

    const durationToSeconds = (dur: string) => {
        if (!dur) return 180;
        const [m, s] = dur.split(':').map(Number);
        return (m * 60) + (s || 0);
    };

    useEffect(() => {
        let isMounted = true;
        let syncInterval: NodeJS.Timeout;

        const fetchStationData = async () => {
            try {
                const res = await fetch('/api/content/albums');
                if (!res.ok) throw new Error("Station Signal Failure");
                const albums = await res.json();
                
                const rawPool: Track[] = [];
                const seenUrls = new Set();
                albums.sort((a: any, b: any) => a.id.localeCompare(b.id));

                albums.forEach((a: any) => {
                    (a.tracks || []).forEach((t: any) => {
                        if (!t.audioUrl || t.audioUrl.trim() === "") return;
                        if (seenUrls.has(t.audioUrl)) return;
                        seenUrls.add(t.audioUrl);
                        rawPool.push({
                            ...t,
                            artist: a.artist,
                            albumTitle: a.title,
                            coverArt: a.coverArt,
                            releaseDate: a.releaseDate,
                            // Ensure duration is handled
                            durationSeconds: durationToSeconds(t.duration)
                        });
                    });
                });

                const pool = rawPool.filter(t => t.audioUrl && t.audioUrl.length > 20);
                const seededShuffle = (array: any[], seed: string) => {
                    let m = array.length, t, i;
                    let seedNum = Array.from(seed).reduce((acc, char) => acc + char.charCodeAt(0), 0);
                    const random = () => {
                        seedNum = (seedNum * 9301 + 49297) % 233280;
                        return seedNum / 233280;
                    };
                    while (m) {
                        i = Math.floor(random() * m--);
                        t = array[m]; array[m] = array[i]; array[i] = t;
                    }
                    return array;
                };

                const masterPlaylist = seededShuffle([...pool], STATION_VERSION);
                if (!isMounted) return;

                setTracks(masterPlaylist);
                setLoading(false);

                // 4. PRECISION SIGNAL LOCK: Periodic global clock synchronization
                const totalCycleSeconds = masterPlaylist.reduce((acc, t: any) => acc + (t.durationSeconds || 180), 0);

                const syncAudio = () => {
                    const secondsSinceEpoch = Math.floor(Date.now() / 1000);
                    const currentCyclePosition = secondsSinceEpoch % totalCycleSeconds;
                    
                    let accumulatedTime = 0;
                    let masterIndex = 0;
                    let seekTime = 0;

                    for (let i = 0; i < masterPlaylist.length; i++) {
                        const trackDur = (masterPlaylist[i] as any).durationSeconds || 180;
                        if (accumulatedTime + trackDur > currentCyclePosition) {
                            masterIndex = i;
                            seekTime = currentCyclePosition - accumulatedTime;
                            break;
                        }
                        accumulatedTime += trackDur;
                    }

                    setCurrentIndex((currentIdx) => {
                        const audio = document.querySelector('audio');
                        
                        if (currentIdx !== masterIndex) {
                            console.log(`[Country-Signal] Phase shifted. Forcing track ${masterIndex + 1}.`);
                            return masterIndex; 
                        } else if (audio) {
                            const drift = Math.abs(audio.currentTime - seekTime);
                            if (drift > SYNC_THRESHOLD) {
                                console.warn(`[Country-Signal] Time drift detected (${drift.toFixed(1)}s). Re-locking signal...`);
                                audio.currentTime = seekTime;
                            }
                        }
                        return currentIdx;
                    });
                };

                syncAudio();
                const audio = document.querySelector('audio');
                if (audio) {
                    const secondsSinceEpoch = Math.floor(Date.now() / 1000);
                    const currentCyclePosition = secondsSinceEpoch % totalCycleSeconds;
                    let accumulatedTime = 0;
                    let seekTime = 0;
                    for (let i = 0; i < masterPlaylist.length; i++) {
                        const trackDur = (masterPlaylist[i] as any).durationSeconds || 180;
                        if (accumulatedTime + trackDur > currentCyclePosition) {
                            seekTime = currentCyclePosition - accumulatedTime;
                            break;
                        }
                        accumulatedTime += trackDur;
                    }
                    audio.currentTime = seekTime;
                }

                syncInterval = setInterval(syncAudio, 2500); 

            } catch (err) {
                console.error("[Country-Signal] Sync Failure:", err);
            }
        };
        fetchStationData();

        return () => {
            isMounted = false;
            clearInterval(syncInterval);
        };
    }, []);

    const nextTrack = (force = false) => {
        if (force) {
            const nextIndex = (currentIndex + 1) % tracks.length;
            setCurrentIndex(nextIndex);
        }
    };

    const currentTrack = tracks[currentIndex];

    if (loading || !currentTrack) {
        return (
            <div className="min-h-screen bg-black flex items-center justify-center text-white font-mono">
                <div className="flex flex-col items-center gap-4">
                    <div className="w-12 h-12 border-4 border-red-600 border-t-transparent rounded-full animate-spin"></div>
                    <p className="text-xl tracking-widest uppercase text-red-600 animate-pulse">Tuning Master Signal...</p>
                </div>
            </div>
        );
    }

    return (
        <main className="fixed inset-0 bg-black overflow-hidden flex items-center justify-center">
            {started && (
                <div className="absolute top-10 right-10 z-[100] pointer-events-auto">
                    <Link href="/" className="flex items-center gap-3 bg-black/40 hover:bg-red-600/80 backdrop-blur-xl px-6 py-3 rounded-full border border-white/10 text-white transition-all transform hover:scale-105">
                        <span className="text-[10px] font-black uppercase tracking-[4px]">Back to Home</span>
                    </Link>
                </div>
            )}

            {/* Country Signal Native Audio Engine */}
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
                        albumTitle: currentTrack.albumTitle || "Country Signal - Geordie Land",
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
                    <h2 className="text-white text-3xl font-black uppercase tracking-[15px]">
                        COUNTRY SIGNAL
                    </h2>
                    <p className="text-white/40 mt-4 text-[10px] tracking-[4px] uppercase">Click to resume 24/7 Geordie Land broadcast</p>
                </div>
            ) : (
                <div className="absolute inset-0 z-50 pointer-events-none">
                    {/* Branded HUD Layer */}
                    <div className="absolute bottom-20 left-20 animate-in fade-in slide-in-from-left duration-1000">
                        <img src="/country-signal-logo.png" alt="Country Signal Radio Logo" className="w-32 h-auto opacity-90 drop-shadow-2xl mb-4" />
                        <div className="flex items-center gap-3 bg-red-600/20 backdrop-blur-xl px-4 py-2 rounded-full border border-red-600/30">
                            <div className="w-2 h-2 bg-red-600 rounded-full animate-pulse"></div>
                            <span className="text-white text-[8px] font-black tracking-[2px] uppercase">Master Signal Locked</span>
                        </div>
                    </div>

                    <div className="absolute bottom-20 right-0 w-[550px] flex flex-col items-end animate-in fade-in slide-in-from-right duration-1000">
                        <div className="bg-black/95 backdrop-blur-3xl border-r-[12px] border-red-600 px-10 py-8 rounded-l-[40px] shadow-2xl flex flex-col items-end text-right">
                            <span className="text-white/30 text-[10px] font-black tracking-[4px] uppercase mb-4">Now Broadcasting</span>
                            
                            {/* Release Countdown / Coming Soon Banner */}
                            {currentTrack.releaseDate && new Date(currentTrack.releaseDate) > new Date() && (
                                <div className="flex items-center gap-2 bg-red-600 px-3 py-1.5 rounded-lg mb-4 animate-pulse">
                                    <span className="text-white text-[10px] font-black tracking-[2px] uppercase">
                                        Coming Soon: {new Date(currentTrack.releaseDate).toLocaleDateString("en-GB", { day: 'numeric', month: 'long' })}
                                    </span>
                                </div>
                            )}

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
