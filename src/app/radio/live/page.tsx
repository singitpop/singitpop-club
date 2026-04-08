'use client';

export const dynamic = 'force-dynamic';

import React, { useState, useEffect, useMemo } from 'react';
import nextDynamic from 'next/dynamic';

// 1. Ghost Isolation - Player
const Player = nextDynamic(
    () => import('@remotion/player').then((mod) => mod.Player),
    { ssr: false }
);

// 2. Ghost Isolation - Visuals (Important: This prevents SSR crashes!)
const CountrySignalVisuals = nextDynamic(
    () => import('@/video/compositions/CountrySignalRadio').then((mod) => mod.CountrySignalRadio),
    { ssr: false }
);

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
    const [skippedTracks, setSkippedTracks] = useState<string[]>([]);
    const [isCooldown, setIsCooldown] = useState(false);
    
    // Auto-start for OBS if ?autoplay=true is in the URL
    useEffect(() => {
        if (typeof window !== 'undefined') {
            const params = new URLSearchParams(window.location.search);
            if (params.get('autoplay') === 'true' || params.get('obs') === 'true') {
                // We add a tiny delay to ensure the DOM is ready
                setTimeout(() => {
                    setStarted(true);
                    // Also try to find any audio elements and play them
                    const audios = document.querySelectorAll('audio');
                    audios.forEach(a => a.play().catch(() => {}));
                }, 1000);
            }
        }
    }, []);

    useEffect(() => {
        const fetchAlbums = async () => {
            try {
                const res = await fetch('/api/content/albums');
                const data = await res.json();
                
                // 1. DATA SOURCE: Using the Whitelisted Nashville API
                // All filtering is now handled server-side for maximum performance and stability.
                const countryAlbums = data;

                console.log(`[Radio] Station Locked: ${countryAlbums.length} Nashville albums synchronized.`);
                
                // 2. BULLETPROOF POOL GENERATION (Strict De-duplication by Audio URL)
                const seenUrls = new Set();
                const uniquePlaylist: any[] = [];
                
                countryAlbums.forEach((a: any) => {
                    a.tracks.forEach((t: any) => {
                        // Master Filter Logic (Broken, Old, Drafts)
                        if (t.title?.toLowerCase().includes("haven in the hills")) return;
                        if (!t.audioUrl || t.audioUrl.trim() === "" || t.audioUrl.toLowerCase().includes("example.com")) return;
                        
                        const title = t.title?.toLowerCase().trim() || "";
                        if (title.endsWith(" old") || title.includes(" (old)")) return;
                        if (title.match(/\s\d$/) || title.match(/\(\d\)$/)) return;
                        
                        const url = t.audioUrl.toLowerCase().trim();
                        if (url.includes("old") || url.includes("-1.mp3") || url.includes("-2.mp3") || url.includes("-3.mp3")) return;
                        
                        // Christmas / Holiday Exclusion Filter
                        if (title.includes("christmas") || title.includes("holiday") || title.includes("noel") || title.includes("mistletoe")) return;
                        if (a.title?.toLowerCase().includes("christmas") || a.title?.toLowerCase().includes("holiday")) return;

                        // DE-DUPLICATION CHECK: Prevent repeated audio files from different albums
                        if (seenUrls.has(url)) return;
                        seenUrls.add(url);

                        uniquePlaylist.push({
                            ...t,
                            artist: a.artist,
                            albumTitle: a.title,
                            coverArt: a.coverArt,
                            releaseDate: a.releaseDate
                        });
                    });
                });

                // 3. FINGERPRINTING: Detect any change in the unique pool
                // NUCLEAR FLUSH (v5): Final Whitelist Enforcement
                const FLUSH_ID = "RADIO_V5"; 
                const libraryFingerprint = FLUSH_ID + uniquePlaylist.map(t => t.audioUrl).sort().join("|").substring(0, 500);
                const savedFingerprint = localStorage.getItem('countrySignal_fingerprint');

                // 4. PERSISTENT SHUFFLE ENGINE
                let finalPlaylist: any[] = [];
                const savedPlaylistStr = localStorage.getItem('countrySignal_playlist');
                const savedIndexStr = localStorage.getItem('countrySignal_index');
                const historyStr = localStorage.getItem('countrySignal_history') || "[]";
                
                let savedPlaylist = savedPlaylistStr ? JSON.parse(savedPlaylistStr) : [];
                let history = JSON.parse(historyStr);

                // We only resume if the library hasn't changed (Fingerprint Match)
                if (libraryFingerprint === savedFingerprint && savedPlaylist.length === uniquePlaylist.length) {
                    console.log(`[Radio] Resume Session: ${uniquePlaylist.length} unique tracks in cycle.`);
                    finalPlaylist = savedPlaylist;
                    if (savedIndexStr) {
                        const idx = parseInt(savedIndexStr, 10);
                        setCurrentIndex(isNaN(idx) ? 0 : idx);
                    }
                } else {
                    console.log(`[Radio] Library Change Detected (or Nuclear Flush): Re-shuffling ${uniquePlaylist.length} tracks.`);
                    
                    // Fisher-Yates Shuffle
                    finalPlaylist = [...uniquePlaylist];
                    for (let i = finalPlaylist.length - 1; i > 0; i--) {
                        const j = Math.floor(Math.random() * (i + 1));
                        [finalPlaylist[i], finalPlaylist[j]] = [finalPlaylist[j], finalPlaylist[i]];
                    }

                    // "COOL DOWN" Gating: Prevent any of the last 10 tracks from appearing first in the new shuffle
                    if (history.length > 0) {
                        const lastPlayedUrls = history.slice(-10);
                        const cleanStarts: any[] = [];
                        const deferred: any[] = [];
                        
                        finalPlaylist.forEach(t => {
                            if (lastPlayedUrls.includes(t.audioUrl)) deferred.push(t);
                            else cleanStarts.push(t);
                        });
                        finalPlaylist = [...cleanStarts, ...deferred];
                    }

                    localStorage.setItem('countrySignal_playlist', JSON.stringify(finalPlaylist));
                    localStorage.setItem('countrySignal_index', '0');
                    localStorage.setItem('countrySignal_fingerprint', libraryFingerprint);
                    setCurrentIndex(0);
                }
                
                setAlbums(finalPlaylist as any);
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

    
    const nextTrack = (wasError: boolean = false) => {
        if (wasError && albums[currentIndex]) {
            setSkippedTracks(prev => [...prev.slice(-9), albums[currentIndex].title]);
        }
        
        const nextIndex = (currentIndex + 1) % albums.length;
        
        // Record History for "Cool Down" logic (Last 50 tracks)
        const historyStr = localStorage.getItem('countrySignal_history') || "[]";
        const history = JSON.parse(historyStr);
        const currentAudioUrl = (albums[currentIndex] as any).audioUrl;
        
        const newHistory = [...history.slice(-49), currentAudioUrl];
        localStorage.setItem('countrySignal_history', JSON.stringify(newHistory));

        setCurrentIndex(nextIndex);
        localStorage.setItem('countrySignal_index', nextIndex.toString());
    };

    return (
        <main className="fixed inset-0 bg-black overflow-hidden flex items-center justify-center">
            {started && (
                <div className="absolute top-10 right-10 z-[100] pointer-events-auto">
                    <a 
                        href="/"
                        className="flex items-center gap-3 bg-black/40 hover:bg-red-600/80 backdrop-blur-xl px-6 py-3 rounded-full border border-white/10 text-white transition-all group lg:px-8 lg:py-4"
                    >
                        <svg className="w-4 h-4 group-hover:-translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M10 19l-7-7m0 0l7-7m-7 7h18" />
                        </svg>
                        <span className="text-[10px] font-black uppercase tracking-[4px]">Back to Home</span>
                    </a>
                </div>
            )}

            {/* The Broadcast Audio Engine - 24/7 Loop */}
            {started && (
                <audio 
                    src={(currentTrack as any).audioUrl} 
                    autoPlay 
                    onEnded={() => nextTrack(false)}
                    onError={() => {
                        if (isCooldown) return;
                        setIsCooldown(true);
                        // Diagnostic Logging: Identify broken links
                        console.error(`[Signal Leak] Skipping Broken Track: ${currentTrack.title} - ${currentTrack.audioUrl}`);
                        
                        // SAFETY BRAKE: Wait 2 seconds before skipping to stop the 'crazy' HUD flushing
                        setTimeout(() => {
                            nextTrack(true);
                            setIsCooldown(false);
                        }, 2000);
                    }}
                />
            )}

            {/* Diagnostic HUD hidden for production/user request */}

            {/* The Broadcast Player - True Full Screen Background */}
            <div className="absolute inset-0 z-0">
                <Player
                    component={CountrySignalVisuals as any}
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
                        releaseDate: (currentTrack as any).releaseDate,
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
                        <div className="absolute bottom-20 right-0 w-[550px] flex flex-col items-end animate-in fade-in slide-in-from-right duration-1000">
                            <div className="bg-black/80 backdrop-blur-2xl border-r-[12px] border-red-600 px-8 py-6 rounded-l-[32px] shadow-[0_30px_60px_rgba(0,0,0,1)] flex flex-col items-end text-right">
                                
                                {(() => {
                                    const releaseDate = (currentTrack as any).releaseDate;
                                    const isReleased = releaseDate ? new Date(releaseDate) <= new Date() : true;
                                    const formattedDate = releaseDate ? new Date(releaseDate).toLocaleDateString("en-GB", { day: 'numeric', month: 'long' }) : "";
                                    
                                    if (!isReleased) {
                                        return (
                                            <div className="bg-red-600 text-white px-3 py-1 rounded-md text-[10px] font-black tracking-[2px] mb-4 animate-pulse shadow-[0_0_20px_rgba(220,38,38,0.5)]">
                                                COMING {formattedDate.toUpperCase()}
                                            </div>
                                        );
                                    }
                                    return null;
                                })()}

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
