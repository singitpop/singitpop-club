'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Sparkles, RefreshCw, Play } from 'lucide-react';
import { albums } from '@/data/albumData';

// Flatten albums to get all tracks
const tracks = albums.flatMap(album => album.tracks.map(track => ({
    ...track,
    albumId: album.id, // Ensure albumId is available
    albumCover: album.coverArt
})));

export default function SongOracle() {
    const [suggestion, setSuggestion] = useState<any>(null);
    const [isSpinning, setIsSpinning] = useState(false);

    const spinOracle = () => {
        setIsSpinning(true);
        setSuggestion(null);

        // Simulate "reading the stars"
        setTimeout(() => {
            const randomTrack = tracks[Math.floor(Math.random() * tracks.length)];
            setSuggestion(randomTrack);
            setIsSpinning(false);
        }, 1500);
    };

    return (
        <section className="py-12 border-t border-white/5 bg-gradient-to-b from-black to-purple-900/10">
            <div className="max-w-4xl mx-auto px-4 text-center">
                <div className="mb-8">
                    <motion.div
                        initial={{ opacity: 0, y: 10 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-purple-500/10 border border-purple-500/20 text-purple-400 text-sm font-medium mb-4"
                    >
                        <Sparkles size={14} />
                        <span>Daily Vibe Check</span>
                    </motion.div>
                    <h2 className="text-3xl md:text-5xl font-black mb-4 bg-gradient-to-r from-purple-400 via-pink-500 to-yellow-500 bg-clip-text text-transparent">
                        The Song Oracle
                    </h2>
                    <p className="text-white/60 text-lg max-w-2xl mx-auto">
                        Not sure what to listen to? Let the universe decide your soundtrack for today.
                    </p>
                </div>

                <div className="relative max-w-md mx-auto aspect-square bg-gradient-to-br from-white/5 to-white/0 rounded-full border border-white/10 flex items-center justify-center overflow-hidden">
                    {/* Background Animation */}
                    <motion.div
                        animate={{ rotate: 360 }}
                        transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                        className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,_rgba(236,72,153,0.1),transparent_70%)]"
                    />

                    <AnimatePresence mode="wait">
                        {!suggestion && !isSpinning ? (
                            <motion.button
                                key="start"
                                initial={{ scale: 0.9, opacity: 0 }}
                                animate={{ scale: 1, opacity: 1 }}
                                exit={{ scale: 0.9, opacity: 0 }}
                                onClick={spinOracle}
                                className="relative z-10 w-40 h-40 rounded-full bg-white/10 hover:bg-white/20 border border-white/20 backdrop-blur-sm flex flex-col items-center justify-center gap-2 transition-all hover:scale-105 group"
                            >
                                <Sparkles size={32} className="text-pink-400 group-hover:rotate-12 transition-transform" />
                                <span className="font-bold tracking-wide">ASK ORACLE</span>
                            </motion.button>
                        ) : isSpinning ? (
                            <motion.div
                                key="spinning"
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                exit={{ opacity: 0 }}
                                className="relative z-10 text-center"
                            >
                                <RefreshCw size={48} className="text-purple-400 animate-spin mb-4 mx-auto" />
                                <p className="text-lg font-medium animate-pulse">Consulting the stars...</p>
                            </motion.div>
                        ) : (
                            <motion.div
                                key="result"
                                initial={{ opacity: 0, scale: 0.8 }}
                                animate={{ opacity: 1, scale: 1 }}
                                className="relative z-10 text-center p-8 w-full"
                            >
                                <div className="text-xs uppercase tracking-widest text-pink-400 mb-2 font-bold">The Universe Chooses</div>
                                <h3 className="text-2xl md:text-3xl font-black mb-2">{suggestion.title}</h3>
                                <p className="text-white/60 mb-6">{suggestion.duration} • {suggestion.genre}</p>

                                <div className="flex justify-center gap-4">
                                    <a
                                        href={`/music?track=${suggestion.albumId}-${suggestion.id}`}
                                        className="px-6 py-3 bg-white text-black rounded-full font-bold flex items-center gap-2 hover:scale-105 transition-transform"
                                    >
                                        <Play size={18} fill="black" />
                                        Listen Now
                                    </a>
                                    <button
                                        onClick={spinOracle}
                                        className="px-4 py-3 bg-white/10 rounded-full hover:bg-white/20 transition-colors"
                                        title="Spin Again"
                                    >
                                        <RefreshCw size={20} />
                                    </button>
                                </div>
                            </motion.div>
                        )}
                    </AnimatePresence>
                </div>
            </div>
        </section>
    );
}
