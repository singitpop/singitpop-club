'use client';

import { useState, useEffect, useMemo } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/context/AuthContext';
import { ArrowLeft, Save, Music, CheckCircle, Search, Grid, List, ChevronRight, X, Trash2 } from 'lucide-react';
import Link from 'next/link';
import { Album, Track } from '@/data/albumData';
import { motion, AnimatePresence } from 'framer-motion';

export default function CreatePlaylistPage() {
    const router = useRouter();
    const { user, isInsider } = useAuth();
    const [title, setTitle] = useState('');
    const [selectedTracks, setSelectedTracks] = useState<string[]>([]);
    const [isSubmitting, setIsSubmitting] = useState(false);

    // Dynamic Data States
    const [albums, setAlbums] = useState<Album[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [searchQuery, setSearchQuery] = useState('');
    const [viewMode, setViewMode] = useState<'albums' | 'tracks' | 'review'>('albums');
    const [activeAlbumId, setActiveAlbumId] = useState<string | null>(null);

    // Redirect if not Insider/VIP
    useEffect(() => {
        if (user && !isInsider) {
            alert("Creating community mixes is an Insider feature!");
            router.push('/membership');
        }
    }, [user, isInsider, router]);

    // Fetch Dynamic/Signed Data
    useEffect(() => {
        async function fetchData() {
            try {
                const res = await fetch('/api/content/albums');
                const data = await res.json();
                if (Array.isArray(data)) {
                    setAlbums(data);
                }
            } catch (e) {
                console.error("Failed to fetch albums:", e);
            } finally {
                setIsLoading(false);
            }
        }
        fetchData();
    }, []);

    const allTracks = useMemo(() => {
        return albums.flatMap(album =>
            album.tracks.map(track => ({
                ...track,
                albumId: album.id,
                albumTitle: album.title,
                albumCover: album.coverArt,
                uniqueId: `${album.id}-${track.id}`
            }))
        );
    }, [albums]);

    const activeAlbum = useMemo(() => {
        return albums.find(a => a.id === activeAlbumId) || null;
    }, [albums, activeAlbumId]);

    const filteredAlbums = useMemo(() => {
        if (!searchQuery.trim()) return albums;
        const q = searchQuery.toLowerCase();
        return albums.filter(a =>
            a.title.toLowerCase().includes(q) ||
            a.tracks.some(t => t.title.toLowerCase().includes(q))
        );
    }, [albums, searchQuery]);

    const toggleTrack = (uniqueId: string) => {
        if (selectedTracks.includes(uniqueId)) {
            setSelectedTracks(prev => prev.filter(id => id !== uniqueId));
        } else {
            if (selectedTracks.length >= 20) {
                alert("Maximum 20 tracks per playlist.");
                return;
            }
            setSelectedTracks(prev => [...prev, uniqueId]);
        }
    };

    const handleCreate = async () => {
        if (!title.trim()) return alert("Please enter a playlist title");
        if (selectedTracks.length === 0) return alert("Select at least one track");

        setIsSubmitting(true);
        try {
            const res = await fetch('/api/community/playlist', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    title: title,
                    tracks: selectedTracks
                })
            });

            if (res.ok) {
                router.push('/fan-albums');
            } else {
                alert("Failed to create playlist");
            }
        } catch (e) {
            console.error(e);
            alert("Error creating playlist");
        } finally {
            setIsSubmitting(false);
        }
    };

    if (!isInsider && user) return null;

    return (
        <div className="min-h-screen bg-[#050505] text-white p-4 md:p-8 pt-24 pb-32">
            <div className="max-w-7xl mx-auto h-full flex flex-col">

                {/* Header Section */}
                <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6 mb-12">
                    <div className="space-y-2">
                        <AnimatePresence mode="wait">
                            {viewMode === 'albums' ? (
                                <motion.div
                                    key="albums-title"
                                    initial={{ opacity: 0, x: -20 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    exit={{ opacity: 0, x: 20 }}
                                >
                                    <Link href="/fan-albums" className="flex items-center gap-2 text-white/40 hover:text-white mb-2 transition-colors text-sm uppercase tracking-widest font-bold">
                                        <ArrowLeft size={14} /> Back to Hub
                                    </Link>
                                    <h1 className="text-4xl md:text-6xl font-black tracking-tighter bg-gradient-to-r from-white via-white to-white/20 bg-clip-text text-transparent">
                                        CREATE A PLAYLIST
                                    </h1>
                                    <p className="text-white/40 text-lg">Step 1: Choose an album to explore</p>
                                </motion.div>
                            ) : (
                                <motion.div
                                    key="tracks-title"
                                    initial={{ opacity: 0, x: -20 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    exit={{ opacity: 0, x: 20 }}
                                >
                                    <button
                                        onClick={() => { setViewMode('albums'); setActiveAlbumId(null); }}
                                        className="flex items-center gap-2 text-purple-400 hover:text-purple-300 mb-2 transition-colors text-sm uppercase tracking-widest font-bold"
                                    >
                                        <ArrowLeft size={14} /> Back to Albums
                                    </button>
                                    <h1 className="text-4xl md:text-6xl font-black tracking-tighter">
                                        {activeAlbum?.title || 'SELECT TRACKS'}
                                    </h1>
                                    <p className="text-white/40 text-lg">Step 2: Pick your favorite tracks for your playlist</p>
                                </motion.div>
                            )}
                        </AnimatePresence>
                    </div>

                    <div className="flex flex-col gap-4 w-full md:w-auto">
                        <div className="relative">
                            <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-white/20" size={18} />
                            <input
                                type="text"
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                                placeholder="Search everything..."
                                className="bg-white/5 border border-white/10 rounded-2xl py-4 pl-12 pr-6 w-full md:w-80 focus:border-purple-500 outline-none transition-all placeholder:text-white/10 italic"
                            />
                        </div>
                    </div>
                </div>

                {/* Main Content Areas */}
                <div className="flex-1">
                    <AnimatePresence mode="wait">
                        {viewMode === 'albums' ? (
                            <motion.div
                                key="album-grid"
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                exit={{ opacity: 0, scale: 0.95 }}
                                className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6 md:gap-8"
                            >
                                {isLoading ? (
                                    Array.from({ length: 10 }).map((_, i) => (
                                        <div key={i} className="aspect-square bg-white/5 rounded-3xl animate-pulse" />
                                    ))
                                ) : filteredAlbums.map(album => (
                                    <motion.div
                                        key={album.id}
                                        whileHover={{ y: -8, scale: 1.02 }}
                                        whileTap={{ scale: 0.98 }}
                                        onClick={() => { setActiveAlbumId(album.id); setViewMode('tracks'); }}
                                        className="group cursor-pointer"
                                    >
                                        <div className="relative aspect-square rounded-[2rem] overflow-hidden border border-white/10 shadow-2xl transition-all group-hover:border-purple-500/50 group-hover:shadow-purple-500/10">
                                            <img src={album.coverArt} alt={album.title} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" />
                                            <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black via-black/80 to-transparent p-6 pt-12 transform translate-y-4 group-hover:translate-y-0 transition-transform">
                                                <h3 className="font-bold text-lg leading-tight mb-1">{album.title}</h3>
                                                <p className="text-white/40 text-xs font-bold uppercase tracking-widest">{album.tracks.length} Tracks</p>
                                            </div>
                                            <div className="absolute top-4 right-4 w-12 h-12 bg-white/10 backdrop-blur-md rounded-2xl flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                                                <ChevronRight size={20} className="text-white" />
                                            </div>
                                        </div>
                                    </motion.div>
                                ))}
                            </motion.div>
                        ) : (
                            <motion.div
                                key="track-list"
                                initial={{ opacity: 0, x: 20 }}
                                animate={{ opacity: 1, x: 0 }}
                                exit={{ opacity: 0, x: -20 }}
                                className="flex flex-col lg:flex-row gap-12"
                            >
                                {/* Album Preview */}
                                <div className="lg:w-1/3 space-y-8">
                                    <div className="aspect-square rounded-[3rem] overflow-hidden border border-white/10 sticky top-32 shadow-2xl shadow-purple-500/5">
                                        <img src={activeAlbum?.coverArt} alt="" className="w-full h-full object-cover" />
                                    </div>
                                    <div className="hidden lg:block space-y-4 sticky top-[calc(32px+33vw+32px)]">
                                        <h2 className="text-2xl font-bold">{activeAlbum?.title}</h2>
                                        <p className="text-white/40 leading-relaxed text-sm">{activeAlbum?.description || `Select tracks from ${activeAlbum?.title} to add them to your playlist.`}</p>
                                    </div>
                                </div>

                                {/* Tracks Container */}
                                <div className="lg:w-2/3 space-y-4">
                                    {activeAlbum?.tracks.map((track, index) => {
                                        const uniqueId = `${activeAlbum.id}-${track.id}`;
                                        const isSelected = selectedTracks.includes(uniqueId);
                                        return (
                                            <motion.div
                                                initial={{ opacity: 0, x: 20 }}
                                                animate={{ opacity: 1, x: 0 }}
                                                transition={{ delay: index * 0.05 }}
                                                key={uniqueId}
                                                onClick={() => toggleTrack(uniqueId)}
                                                className={`group flex items-center gap-6 p-4 md:p-6 rounded-[2rem] cursor-pointer border transition-all ${isSelected
                                                    ? 'bg-purple-600/10 border-purple-500 shadow-inner shadow-purple-500/5'
                                                    : 'bg-white/5 border-white/5 hover:bg-white/10 hover:border-white/10'
                                                    }`}
                                            >
                                                <div className="flex-shrink-0 w-8 text-white/20 font-mono text-sm group-hover:text-purple-400 transition-colors">
                                                    {(index + 1).toString().padStart(2, '0')}
                                                </div>
                                                <div className="flex-1 min-w-0">
                                                    <h4 className={`text-lg font-bold truncate ${isSelected ? 'text-purple-400 text-glow' : 'text-white'}`}>
                                                        {track.title}
                                                    </h4>
                                                    <div className="flex items-center gap-3 mt-1">
                                                        <span className="text-xs text-white/40 font-bold uppercase tracking-widest">{track.duration}</span>
                                                        <span className="w-1 h-1 bg-white/20 rounded-full" />
                                                        <span className="text-xs text-white/40 font-bold uppercase tracking-widest">{activeAlbum.title}</span>
                                                    </div>
                                                </div>
                                                <div className={`w-10 h-10 rounded-2xl flex items-center justify-center transition-all ${isSelected ? 'bg-purple-500 text-white shadow-lg shadow-purple-500/40' : 'bg-white/5 text-white/20 border border-white/10'
                                                    }`}>
                                                    {isSelected ? <CheckCircle size={20} /> : <div className="w-2 h-2 rounded-full bg-current" />}
                                                </div>
                                            </motion.div>
                                        );
                                    })}
                                </div>
                            </motion.div>
                        )}
                    </AnimatePresence>
                </div>
            </div>

            {/* Sticky Selection Bar (Cart) */}
            <AnimatePresence>
                {selectedTracks.length > 0 && (
                    <motion.div
                        initial={{ y: 100 }}
                        animate={{ y: 0 }}
                        exit={{ y: 100 }}
                        className="fixed bottom-0 inset-x-0 bg-black/80 backdrop-blur-2xl border-t border-white/10 p-6 z-50 shadow-[0_-20px_50px_rgba(0,0,0,0.5)]"
                    >
                        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center gap-8">
                            <div className="flex-shrink-0 flex items-center gap-4">
                                <div className="w-16 h-16 bg-gradient-to-br from-purple-500 to-blue-600 rounded-2xl flex flex-col items-center justify-center p-2 shadow-lg shadow-purple-500/20">
                                    <span className="text-2xl font-black leading-none">{selectedTracks.length}</span>
                                    <span className="text-[10px] uppercase font-black tracking-widest opacity-60">Tracks</span>
                                </div>
                                <div className="hidden sm:block">
                                    <h3 className="font-bold text-white mb-1">Your Playlist Selection</h3>
                                    <p className="text-xs text-white/40 uppercase tracking-widest font-black">20 max per playlist</p>
                                </div>
                            </div>

                            <div className="flex-1 flex gap-2 overflow-x-auto no-scrollbar pb-2 mask-fade-right">
                                {selectedTracks.map(uid => {
                                    const track = allTracks.find(t => t.uniqueId === uid);
                                    return (
                                        <motion.div
                                            layout
                                            initial={{ scale: 0, opacity: 0 }}
                                            animate={{ scale: 1, opacity: 1 }}
                                            key={uid}
                                            className="group relative flex-shrink-0 w-12 h-12 md:w-16 md:h-16 rounded-xl overflow-hidden border border-white/20"
                                        >
                                            <img src={track?.albumCover} alt="" className="w-full h-full object-cover" />
                                            <button
                                                onClick={() => toggleTrack(uid)}
                                                className="absolute inset-0 bg-red-600/80 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity"
                                            >
                                                <X size={20} />
                                            </button>
                                        </motion.div>
                                    );
                                })}
                            </div>

                            <div className="flex flex-col sm:flex-row gap-4 items-center w-full md:w-auto">
                                <div className="relative w-full sm:w-64">
                                    <input
                                        type="text"
                                        value={title}
                                        onChange={(e) => setTitle(e.target.value)}
                                        placeholder="Name your masterpiece..."
                                        className="w-full bg-white/10 border border-white/10 rounded-2xl px-6 py-4 focus:border-purple-500 outline-none transition-all font-bold placeholder:italic placeholder:font-normal placeholder:opacity-50"
                                    />
                                </div>
                                <button
                                    onClick={handleCreate}
                                    disabled={isSubmitting || !title.trim()}
                                    className="w-full sm:w-auto bg-purple-600 hover:bg-purple-500 disabled:opacity-50 disabled:grayscale text-white px-10 py-4 rounded-2xl font-black uppercase tracking-tighter flex items-center justify-center gap-3 transition-all hover:scale-105 active:scale-95 shadow-xl shadow-purple-600/20"
                                >
                                    {isSubmitting ? <><div className="w-5 h-5 border-2 border-white/20 border-t-white rounded-full animate-spin" /> Publishing...</> : <><Save size={20} /> Publish Playlist</>}
                                </button>
                                <button
                                    onClick={() => setSelectedTracks([])}
                                    className="p-4 text-white/20 hover:text-red-500 transition-colors"
                                    title="Reset Selection"
                                >
                                    <Trash2 size={20} />
                                </button>
                            </div>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>

            <style jsx>{`
                .no-scrollbar::-webkit-scrollbar { display: none; }
                .no-scrollbar { -ms-overflow-style: none; scrollbar-width: none; }
                .mask-fade-right {
                    mask-image: linear-gradient(to right, black 85%, transparent 100%);
                }
                .text-glow {
                    text-shadow: 0 0 20px rgba(168, 85, 247, 0.4);
                }
            `}</style>
        </div>
    );
}
