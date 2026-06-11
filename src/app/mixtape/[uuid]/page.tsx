'use client';

import { useState, useEffect, useMemo, useRef } from 'react';
import { notFound } from 'next/navigation';
import { Mixtape, getMixtape } from '@/lib/mixtape-s3';
import albumsData from '@/data/albums.json';
import { Play, Pause, SkipForward, SkipBack, Heart, Music, Gift, Share2, Volume2, MessageCircle } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

export default function MixtapePlaybackPage({ params }: { params: { uuid: string } }) {
    const { uuid } = params;
    const [mixtape, setMixtape] = useState<Mixtape | null>(null);
    const [isLoading, setIsLoading] = useState(true);
    const [currentTrackIndex, setCurrentTrackIndex] = useState(0);
    const [isPlaying, setIsPlaying] = useState(false);
    const [progress, setProgress] = useState(0);
    const audioRef = useRef<HTMLAudioElement | null>(null);

    // Fetch Mixtape Data
    useEffect(() => {
        async function fetchMixtape() {
            try {
                const res = await fetch(`/api/shop/mixtape/get?id=${uuid}`);
                const data = await res.json();
                if (data.mixtape) {
                    setMixtape(data.mixtape);
                } else {
                    setMixtape(null);
                }
            } catch (e) {
                console.error(e);
            } finally {
                setIsLoading(false);
            }
        }
        fetchMixtape();
    }, [uuid]);

    const tracks = useMemo(() => {
        if (!mixtape) return [];
        return mixtape.tracks.map(uid => {
            const [albumId, trackId] = uid.split('-');
            const album = (albumsData as any[]).find(a => a.id === albumId);
            const track = album?.tracks.find((t: any) => t.id === parseInt(trackId));
            return {
                ...track,
                albumTitle: album?.title,
                coverArt: album?.coverArt,
                uniqueId: uid
            };
        });
    }, [mixtape]);

    const currentTrack = tracks[currentTrackIndex];

    // Audio Logic
    useEffect(() => {
        if (audioRef.current) {
            if (isPlaying) {
                audioRef.current.play().catch(() => setIsPlaying(false));
            } else {
                audioRef.current.pause();
            }
        }
    }, [isPlaying, currentTrackIndex]);

    const handleTimeUpdate = () => {
        if (audioRef.current) {
            const p = (audioRef.current.currentTime / audioRef.current.duration) * 100;
            setProgress(p || 0);
        }
    };

    const handleTrackEnd = () => {
        if (currentTrackIndex < tracks.length - 1) {
            setCurrentTrackIndex(prev => prev + 1);
        } else {
            setIsPlaying(false);
            setProgress(0);
        }
    };

    if (isLoading) return (
        <div className="min-h-screen bg-black flex items-center justify-center">
            <div className="w-12 h-12 border-4 border-pink-500/20 border-t-pink-500 rounded-full animate-spin" />
        </div>
    );

    if (!mixtape) return (
        <div className="min-h-screen bg-black text-white flex flex-col items-center justify-center p-8 text-center font-sans">
             <Gift size={64} className="text-white/10 mb-8" />
             <h1 className="text-4xl font-black mb-4 uppercase italic">Gift Not Found</h1>
             <p className="text-zinc-500 max-w-md">The mixtape link you followed appears to be invalid or has expired.</p>
        </div>
    );

    const themeClass = mixtape.theme === 'pink' ? 'from-rose-500 to-pink-600 border-pink-500' :
                      mixtape.theme === 'purple' ? 'from-purple-600 to-indigo-700 border-purple-500' :
                      mixtape.theme === 'gold' ? 'from-amber-400 to-orange-600 border-amber-500' :
                      'from-cyan-400 to-blue-600 border-cyan-500';

    return (
        <div className="min-h-screen bg-[#050505] text-white flex flex-col items-center justify-center p-4 md:p-8 font-sans overflow-hidden">
            
            {/* Cinematic Background Blur */}
            <AnimatePresence mode="wait">
                <motion.div 
                    key={currentTrack?.uniqueId}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 0.3 }}
                    exit={{ opacity: 0 }}
                    className="fixed inset-0 z-0 pointer-events-none"
                    style={{ 
                        backgroundImage: `url(${currentTrack?.coverArt})`,
                        backgroundSize: 'cover',
                        backgroundPosition: 'center',
                        filter: 'blur(100px) saturate(2)'
                    }}
                />
            </AnimatePresence>

            <div className="relative z-10 w-full max-w-6xl grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-24 items-center">
                
                {/* Visual Card Side */}
                <motion.div 
                    initial={{ x: -50, opacity: 0 }}
                    animate={{ x: 0, opacity: 1 }}
                    className="relative aspect-[3/4] w-full max-w-md mx-auto"
                >
                    <div className={`absolute inset-0 bg-gradient-to-br ${themeClass} rounded-[3rem] shadow-[0_0_100px_rgba(0,0,0,0.5)] transform -rotate-3 scale-[1.02] opacity-50 blur-xl`} />
                    <div className={`relative h-full bg-gradient-to-br ${themeClass} rounded-[3rem] p-10 border-4 border-white/20 shadow-2xl flex flex-col justify-between overflow-hidden group`}>
                        
                        {/* Interactive Vinyl/CD Mockup */}
                        <div className="absolute top-0 right-0 p-8">
                             <motion.div 
                                animate={{ rotate: isPlaying ? 360 : 0 }}
                                transition={{ duration: 10, repeat: Infinity, ease: "linear" }}
                                className="w-32 h-32 rounded-full border-8 border-black shadow-2xl overflow-hidden relative group-hover:scale-110 transition-transform"
                             >
                                <img src={currentTrack?.coverArt} alt={currentTrack?.title || "Track Cover"} className="w-full h-full object-cover" />
                                <div className="absolute inset-0 bg-black/40 flex items-center justify-center">
                                    <div className="w-4 h-4 bg-white rounded-full shadow-inner" />
                                </div>
                             </motion.div>
                        </div>

                        <div>
                            <div className="bg-white/10 w-fit px-4 py-2 rounded-full text-[10px] font-black uppercase tracking-[0.3em] mb-8">Digital Mixtape</div>
                            <h1 className="text-6xl font-black tracking-tighter italic leading-none mb-2 uppercase">FOR {mixtape.to}</h1>
                            <div className="flex items-center gap-2 mb-12">
                                <span className="text-white/40 uppercase font-bold tracking-widest text-xs">A special gift from</span>
                                <span className="text-white font-black uppercase italic text-sm">{mixtape.from}</span>
                            </div>

                            <div className="space-y-4">
                                <div className="flex items-center gap-2 text-pink-200/60 uppercase font-black text-[10px] tracking-[0.2em]">
                                    <MessageCircle size={12} /> Personal Message
                                </div>
                                <p className="text-xl md:text-2xl font-black italic leading-tight text-white/90">
                                    "{mixtape.message}"
                                </p>
                            </div>
                        </div>

                        <div className="pt-12 space-y-6">
                            <div className="flex items-center gap-4 text-white/40 font-black uppercase text-[10px] tracking-[0.2em]">
                                 <Heart size={14} className="fill-current" /> Made with Love in SingitPop Records
                            </div>
                        </div>
                    </div>
                </motion.div>

                {/* Player Side */}
                <motion.div 
                    initial={{ x: 50, opacity: 0 }}
                    animate={{ x: 0, opacity: 1 }}
                    className="space-y-12"
                >
                    <div className="space-y-6">
                        <div className="flex items-center justify-between">
                            <h2 className="text-4xl font-black uppercase tracking-tighter italic">NOW PLAYING</h2>
                            <div className="text-pink-500 font-black italic">{currentTrackIndex + 1} / 5</div>
                        </div>

                        <div className="space-y-2">
                             <h3 className="text-5xl font-black tracking-tight uppercase italic truncate">{currentTrack?.title}</h3>
                             <p className="text-xl text-white/40 font-bold uppercase tracking-widest">{currentTrack?.albumTitle}</p>
                        </div>
                    </div>

                    {/* Transport Controls */}
                    <div className="space-y-8">
                        <div className="relative h-2 bg-white/5 rounded-full overflow-hidden border border-white/5">
                            <motion.div 
                                className={`absolute inset-y-0 left-0 bg-gradient-to-r ${themeClass}`}
                                style={{ width: `${progress}%` }}
                            />
                        </div>

                        <div className="flex items-center justify-between">
                            <button 
                                onClick={() => {
                                    if (currentTrackIndex > 0) setCurrentTrackIndex(i => i - 1);
                                }}
                                className="w-16 h-16 bg-white/5 rounded-2xl flex items-center justify-center hover:bg-white/10 transition-all active:scale-95 border border-white/10"
                            >
                                <SkipBack size={32} />
                            </button>
                            
                            <button 
                                onClick={() => setIsPlaying(!isPlaying)}
                                className={`w-24 h-24 rounded-[2rem] flex items-center justify-center transition-all bg-gradient-to-br ${themeClass} shadow-2xl shadow-pink-500/20 active:scale-95 hover:scale-105`}
                            >
                                {isPlaying ? <Pause size={48} className="fill-current" /> : <Play size={48} className="fill-current ml-2" />}
                            </button>

                            <button 
                                onClick={() => {
                                    if (currentTrackIndex < tracks.length - 1) setCurrentTrackIndex(i => i + 1);
                                }}
                                className="w-16 h-16 bg-white/5 rounded-2xl flex items-center justify-center hover:bg-white/10 transition-all active:scale-95 border border-white/10"
                            >
                                <SkipForward size={32} />
                            </button>
                        </div>
                    </div>

                    {/* Tracklist Preview */}
                    <div className="space-y-4">
                        <h4 className="text-[10px] font-black uppercase tracking-[0.3em] text-white/20">The Collection</h4>
                        <div className="space-y-3">
                            {tracks.map((track, i) => (
                                <div 
                                    key={track.uniqueId}
                                    onClick={() => setCurrentTrackIndex(i)}
                                    className={`flex items-center gap-6 p-4 rounded-2xl cursor-pointer transition-all border ${
                                        i === currentTrackIndex ? 'bg-white/10 border-white/20' : 'hover:bg-white/5 border-transparent'
                                    }`}
                                >
                                    <div className={`w-8 h-8 rounded-lg flex items-center justify-center text-xs font-black ${
                                        i === currentTrackIndex ? 'bg-pink-500 text-white' : 'bg-white/5 text-white/20'
                                    }`}>
                                        {i + 1}
                                    </div>
                                    <div className="flex-1">
                                        <p className={`font-black uppercase italic ${i === currentTrackIndex ? 'text-white' : 'text-white/40'}`}>{track.title}</p>
                                    </div>
                                    {i === currentTrackIndex && isPlaying && (
                                        <div className="flex gap-1">
                                            {[1,2,3].map(j => (
                                                <motion.div 
                                                    key={j}
                                                    animate={{ height: [8, 16, 8] }}
                                                    transition={{ duration: 0.5, repeat: Infinity, delay: j * 0.1 }}
                                                    className="w-1 bg-pink-500 rounded-full"
                                                />
                                            ))}
                                        </div>
                                    )}
                                </div>
                            ))}
                        </div>
                    </div>
                </motion.div>
            </div>

            {/* Audio Element */}
            <audio 
                ref={audioRef}
                src={currentTrack?.audioUrl}
                onTimeUpdate={handleTimeUpdate}
                onEnded={handleTrackEnd}
            />

            <style jsx>{`
                .text-glow {
                    text-shadow: 0 0 30px rgba(244, 63, 94, 0.4);
                }
            `}</style>
        </div>
    );
}
