'use client';

import { useState, useEffect, useMemo } from 'react';
import { useRouter } from 'next/navigation';
import { ArrowLeft, Music, CheckCircle, Search, Gift, Heart, User, MessageCircle, X, Trash2, ChevronRight, Play, Plus } from 'lucide-react';
import Link from 'next/link';
import { Album, Track } from '@/data/albumData';
import { motion, AnimatePresence } from 'framer-motion';

export default function MixtapeBuilderPage() {
    const router = useRouter();
    const [to, setTo] = useState('');
    const [from, setFrom] = useState('');
    const [occasion, setOccasion] = useState('');
    const [message, setMessage] = useState('');
    const [selectedTracks, setSelectedTracks] = useState<string[]>([]);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [theme, setTheme] = useState<'pink' | 'purple' | 'gold' | 'cyan'>('pink');

    // Data States
    const [albums, setAlbums] = useState<Album[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [searchQuery, setSearchQuery] = useState('');
    const [viewMode, setViewMode] = useState<'selection' | 'dedication'>('selection');
    const [activeAlbumId, setActiveAlbumId] = useState<string | null>(null);

    // Fetch Albums
    useEffect(() => {
        async function fetchData() {
            try {
                const res = await fetch('/api/content/albums');
                const data = await res.json();
                if (Array.isArray(data)) {
                    const now = new Date();
                    // STRICT RELEASE LOGIC: Only show albums released as of TODAY.
                    // Even VIPs cannot select future unreleased tracks for mixtapes.
                    const releasedAlbums = data.filter(a => new Date(a.releaseDate) <= now);
                    setAlbums(releasedAlbums);
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
            if (selectedTracks.length >= 5) {
                alert("A Digital Mixtape contains exactly 5 tracks. Please remove one before adding another.");
                return;
            }
            setSelectedTracks(prev => [...prev, uniqueId]);
        }
    };

    const handleCheckout = async () => {
        if (selectedTracks.length !== 5) return alert("Please select exactly 5 tracks for your mixtape.");
        if (!to || !from || !message) return alert("Please fill out the dedication details.");

        setIsSubmitting(true);
        try {
            const res = await fetch('/api/shop/mixtape/checkout', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    to,
                    from,
                    occasion,
                    message,
                    tracks: selectedTracks,
                    theme
                })
            });

            const data = await res.json();
            if (data.url) {
                window.location.href = data.url;
            } else {
                alert("Failed to create checkout session: " + (data.error || "Unknown error"));
            }
        } catch (e) {
            console.error(e);
            alert("Error initiating checkout");
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <div className="min-h-screen bg-[#050505] text-white p-4 md:p-8 pt-24 pb-32 font-sans">
            <div className="max-w-7xl mx-auto h-full flex flex-col">

                {/* Header Section */}
                <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6 mb-12">
                    <div className="space-y-4">
                        <Link href="/shop" className="flex items-center gap-2 text-white/40 hover:text-white mb-2 transition-colors text-xs uppercase tracking-[0.2em] font-black">
                            <ArrowLeft size={14} /> Back to Shop
                        </Link>
                        <h1 className="text-5xl md:text-7xl font-black tracking-tighter leading-none">
                            <span className="bg-gradient-to-r from-pink-500 to-rose-500 bg-clip-text text-transparent">DIGITAL</span> MIXTAPE
                        </h1>
                        <p className="text-white/40 text-lg max-w-xl font-medium">
                            Pick 5 tracks, write a heartfelt dedication, and give a gift that lasts forever. <span className="text-white">£10.00</span>
                        </p>
                    </div>

                    {viewMode === 'selection' && (
                        <div className="relative w-full md:w-80">
                            <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-white/20" size={18} />
                            <input
                                type="text"
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                                placeholder="Search the catalog..."
                                className="bg-white/5 border border-white/10 rounded-2xl py-4 pl-12 pr-6 w-full focus:border-pink-500 outline-none transition-all placeholder:text-white/10 italic"
                            />
                        </div>
                    )}
                </div>

                <AnimatePresence mode="wait">
                    {viewMode === 'selection' ? (
                        <motion.div
                            key="selection-view"
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -20 }}
                            className="space-y-12"
                        >
                            {/* Album/Track Toggle System */}
                            {activeAlbumId ? (
                                <div className="space-y-8">
                                    <button
                                        onClick={() => setActiveAlbumId(null)}
                                        className="flex items-center gap-2 text-pink-500 hover:text-pink-400 font-black uppercase tracking-widest text-xs"
                                    >
                                        <ArrowLeft size={14} /> Back to Albums
                                    </button>

                                    <div className="flex flex-col lg:flex-row gap-12">
                                        <div className="lg:w-1/3">
                                            <div className="aspect-square rounded-[2rem] overflow-hidden border border-white/10 shadow-2xl shadow-pink-500/10 sticky top-32">
                                                <img src={activeAlbum?.coverArt} alt={activeAlbum?.title || "Album Cover"} className="w-full h-full object-cover" />
                                                <div className="absolute inset-x-0 bottom-0 p-8 bg-gradient-to-t from-black via-black/60 to-transparent">
                                                    <h2 className="text-3xl font-black tracking-tighter italic uppercase">{activeAlbum?.title}</h2>
                                                    <p className="text-white/40 font-bold uppercase tracking-widest text-xs">{activeAlbum?.year}</p>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="lg:w-2/3">
                                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                                {activeAlbum?.tracks.map((track, i) => {
                                                    const uid = `${activeAlbum.id}-${track.id}`;
                                                    const isSelected = selectedTracks.includes(uid);
                                                    return (
                                                        <motion.div
                                                            key={uid}
                                                            initial={{ opacity: 0, scale: 0.95 }}
                                                            animate={{ opacity: 1, scale: 1 }}
                                                            transition={{ delay: i * 0.03 }}
                                                            onClick={() => toggleTrack(uid)}
                                                            className={`group relative flex flex-col p-6 rounded-[2rem] border transition-all cursor-pointer overflow-hidden ${isSelected
                                                                ? 'bg-pink-500/10 border-pink-500 shadow-xl shadow-pink-500/10'
                                                                : 'bg-white/5 border-white/5 hover:bg-white/10 hover:border-white/10'
                                                            }`}
                                                        >
                                                            <div className="flex items-start justify-between mb-4">
                                                                <div className="w-8 h-8 rounded-full bg-black/40 flex items-center justify-center text-[10px] font-black">
                                                                    {i + 1}
                                                                </div>
                                                                <div className={`w-8 h-8 rounded-xl flex items-center justify-center border transition-all ${isSelected ? 'bg-pink-500 border-pink-500 text-white' : 'border-white/10 text-white/20'}`}>
                                                                    {isSelected ? <CheckCircle size={16} /> : <Plus size={16} />}
                                                                </div>
                                                            </div>
                                                            <div>
                                                                <h4 className="font-black text-xl group-hover:text-pink-400 transition-colors uppercase italic leading-tight mb-2">{track.title}</h4>
                                                                <p className="text-[10px] text-white/40 uppercase tracking-[0.2em] font-black">{track.duration}</p>
                                                            </div>
                                                        </motion.div>
                                                    );
                                                })}
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            ) : (
                                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6 md:gap-8">
                                    {isLoading ? (
                                        Array.from({ length: 15 }).map((_, i) => (
                                            <div key={i} className="aspect-square bg-white/5 rounded-3xl animate-pulse" />
                                        ))
                                    ) : filteredAlbums.map(album => (
                                        <motion.div
                                            key={album.id}
                                            whileHover={{ y: -8, scale: 1.02 }}
                                            whileTap={{ scale: 0.98 }}
                                            onClick={() => setActiveAlbumId(album.id)}
                                            className="group cursor-pointer"
                                        >
                                            <div className="relative aspect-square rounded-[2rem] overflow-hidden border border-white/10 shadow-2xl transition-all group-hover:border-pink-500/50">
                                                <img src={album.coverArt} alt={album.title} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" />
                                                <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent opacity-60" />
                                                <div className="absolute inset-x-0 bottom-0 p-6">
                                                    <h3 className="font-black text-sm uppercase tracking-tight italic leading-tight group-hover:text-pink-400 transition-colors">{album.title}</h3>
                                                </div>
                                                <div className="absolute top-4 right-4 w-10 h-10 bg-black/40 backdrop-blur-md rounded-xl flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                                                    <ChevronRight size={18} />
                                                </div>
                                            </div>
                                        </motion.div>
                                    ))}
                                </div>
                            )}
                        </motion.div>
                    ) : (
                        <motion.div
                            key="dedication-view"
                            initial={{ opacity: 0, x: 50 }}
                            animate={{ opacity: 1, x: 0 }}
                            exit={{ opacity: 0, x: -50 }}
                            className="max-w-4xl mx-auto py-12"
                        >
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-16">
                                {/* Form */}
                                <div className="space-y-8">
                                    <div className="flex items-center gap-3 mb-8">
                                        <div className="w-12 h-12 bg-pink-500/20 rounded-2xl flex items-center justify-center text-pink-500">
                                            <Gift size={24} />
                                        </div>
                                        <h2 className="text-3xl font-black uppercase tracking-tighter">Your Dedication</h2>
                                    </div>

                                    <div className="space-y-6">
                                        <div className="grid grid-cols-2 gap-4">
                                            <div className="space-y-2">
                                                <label className="text-[10px] font-black uppercase tracking-widest text-white/40 pl-1">To</label>
                                                <div className="relative">
                                                    <User className="absolute left-4 top-1/2 -translate-y-1/2 text-white/20" size={16} />
                                                    <input
                                                        type="text"
                                                        value={to}
                                                        onChange={(e) => setTo(e.target.value)}
                                                        placeholder="Name"
                                                        className="w-full bg-white/5 border border-white/10 rounded-xl py-4 pl-12 pr-6 outline-none focus:border-pink-500 transition-all font-bold"
                                                    />
                                                </div>
                                            </div>
                                            <div className="space-y-2">
                                                <label className="text-[10px] font-black uppercase tracking-widest text-white/40 pl-1">From</label>
                                                <div className="relative">
                                                    <User className="absolute left-4 top-1/2 -translate-y-1/2 text-white/20" size={16} />
                                                    <input
                                                        type="text"
                                                        value={from}
                                                        onChange={(e) => setFrom(e.target.value)}
                                                        placeholder="Your Name"
                                                        className="w-full bg-white/5 border border-white/10 rounded-xl py-4 pl-12 pr-6 outline-none focus:border-pink-500 transition-all font-bold"
                                                    />
                                                </div>
                                            </div>
                                        </div>

                                        <div className="space-y-2">
                                            <label className="text-[10px] font-black uppercase tracking-widest text-white/40 pl-1">Occasion</label>
                                            <input
                                                type="text"
                                                value={occasion}
                                                onChange={(e) => setOccasion(e.target.value)}
                                                placeholder="e.g. Birthday, Anniversary, Just Because..."
                                                className="w-full bg-white/5 border border-white/10 rounded-xl py-4 px-6 outline-none focus:border-pink-500 transition-all font-bold"
                                            />
                                        </div>

                                        <div className="space-y-2">
                                            <label className="text-[10px] font-black uppercase tracking-widest text-white/40 pl-1">Personal Message</label>
                                            <textarea
                                                value={message}
                                                onChange={(e) => setMessage(e.target.value)}
                                                rows={4}
                                                placeholder="Write something special..."
                                                className="w-full bg-white/5 border border-white/10 rounded-xl p-6 outline-none focus:border-pink-500 transition-all font-bold resize-none"
                                            />
                                        </div>

                                        <div className="space-y-4">
                                            <label className="text-[10px] font-black uppercase tracking-widest text-white/40 pl-1">Mixtape Theme</label>
                                            <div className="flex gap-4">
                                                {(['pink', 'purple', 'gold', 'cyan'] as const).map(t => (
                                                    <button
                                                        key={t}
                                                        onClick={() => setTheme(t)}
                                                        className={`w-12 h-12 rounded-2xl border-2 transition-all ${theme === t ? 'border-white scale-110 shadow-lg' : 'border-transparent opacity-60 px-1'}`}
                                                    >
                                                        <div className={`w-full h-full rounded-xl bg-${t === 'pink' ? 'rose' : t === 'purple' ? 'purple' : t === 'gold' ? 'yellow' : 'cyan'}-500 shadow-inner`} />
                                                    </button>
                                                ))}
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                {/* Preview Card */}
                                <div className="space-y-8">
                                    <div className="flex items-center gap-3 mb-8">
                                        <div className="w-12 h-12 bg-white/5 rounded-2xl flex items-center justify-center text-white/40">
                                            <Play size={20} />
                                        </div>
                                        <h2 className="text-3xl font-black uppercase tracking-tighter">Preview</h2>
                                    </div>

                                    <div className={`relative aspect-[3/4] rounded-[2.5rem] p-8 overflow-hidden transition-all duration-500 shadow-2xl ${
                                        theme === 'pink' ? 'bg-gradient-to-br from-rose-500 to-pink-600' :
                                        theme === 'purple' ? 'bg-gradient-to-br from-purple-600 to-indigo-700' :
                                        theme === 'gold' ? 'bg-gradient-to-br from-amber-400 to-orange-600' :
                                        'bg-gradient-to-br from-cyan-400 to-blue-600'
                                    }`}>
                                        <div className="absolute inset-0 bg-black/20 backdrop-blur-sm m-2 rounded-[2.2rem]" />
                                        
                                        <div className="relative h-full flex flex-col justify-between">
                                            <div className="space-y-1">
                                                <div className="bg-white/10 w-fit px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-widest">Digital Mixtape</div>
                                                <h3 className="text-4xl font-black tracking-tighter italic leading-none pt-4">FOR {to || 'YOUR NAME'}</h3>
                                                <p className="text-sm font-bold opacity-60">From {from || 'The Curator'}</p>
                                            </div>

                                            <div className="space-y-1 py-6 h-full overflow-hidden mask-fade-bottom">
                                                {selectedTracks.map((uid, i) => {
                                                    const track = allTracks.find(t => t.uniqueId === uid);
                                                    return (
                                                        <div key={uid} className="flex items-center gap-3 py-1">
                                                            <div className="w-6 h-6 rounded-lg bg-white/10 flex items-center justify-center text-[10px] font-black">{i+1}</div>
                                                            <p className="text-xs font-black truncate uppercase italic">{track?.title}</p>
                                                        </div>
                                                    );
                                                })}
                                            </div>

                                            <div className="p-4 bg-white/10 rounded-2xl border border-white/10">
                                                <p className="text-xs font-medium italic opacity-80 leading-relaxed">
                                                    "{message || 'A heartfelt message will appear here...'}"
                                                </p>
                                            </div>
                                        </div>
                                    </div>
                                    <p className="text-center text-[10px] font-black uppercase tracking-widest text-white/20">Card design updates based on selected theme</p>
                                </div>
                            </div>
                        </motion.div>
                    )}
                </AnimatePresence>
            </div>

            {/* Selection/Checkout Bar */}
            <AnimatePresence>
                {selectedTracks.length > 0 && (
                    <motion.div
                        initial={{ y: 100 }}
                        animate={{ y: 0 }}
                        exit={{ y: 100 }}
                        className="fixed bottom-0 inset-x-0 bg-black/90 backdrop-blur-xl border-t border-white/10 p-6 z-50"
                    >
                        <div className="max-w-7xl mx-auto flex items-center justify-between gap-8">
                            <div className="flex items-center gap-8">
                                <div className="flex items-center gap-4">
                                    <div className="w-16 h-16 bg-gradient-to-br from-pink-500 to-rose-600 rounded-2xl flex flex-col items-center justify-center shadow-lg shadow-pink-500/20">
                                        <span className="text-3xl font-black leading-none">{selectedTracks.length}</span>
                                        <span className="text-[8px] uppercase font-black tracking-[0.2em] opacity-60">/ 5</span>
                                    </div>
                                    <div>
                                        <h3 className="font-black text-white italic text-xl">THE SELECTION</h3>
                                        <p className="text-[10px] text-white/40 uppercase tracking-widest font-black">£10.00 Fixed Price</p>
                                    </div>
                                </div>

                                <div className="hidden lg:flex gap-2 overflow-x-auto no-scrollbar mask-fade-right w-[400px]">
                                    {selectedTracks.map(uid => {
                                        const track = allTracks.find(t => t.uniqueId === uid);
                                        return (
                                            <motion.div layout key={uid} className="relative flex-shrink-0 w-16 h-16 rounded-xl overflow-hidden border border-white/10 group">
                                                <img src={track?.albumCover} alt={track?.title || "Track Cover"} className="w-full h-full object-cover" />
                                                <button onClick={() => toggleTrack(uid)} className="absolute inset-0 bg-rose-600/80 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                                                    <X size={20} />
                                                </button>
                                            </motion.div>
                                        );
                                    })}
                                </div>
                            </div>

                            <div className="flex items-center gap-4">
                                {viewMode === 'selection' ? (
                                    <button
                                        onClick={() => setViewMode('dedication')}
                                        disabled={selectedTracks.length !== 5}
                                        className="h-16 px-10 bg-white text-black font-black uppercase tracking-tighter italic rounded-2xl flex items-center gap-4 hover:bg-white/90 disabled:opacity-20 transition-all hover:scale-105 active:scale-95 shadow-2xl shadow-white/10"
                                    >
                                        Next Stage <ChevronRight size={24} />
                                    </button>
                                ) : (
                                    <div className="flex items-center gap-4">
                                         <button
                                            onClick={() => setViewMode('selection')}
                                            className="h-16 px-6 bg-white/5 text-white/40 font-black uppercase tracking-tighter italic rounded-2xl border border-white/10 hover:bg-white/10 transition-all"
                                        >
                                            Back
                                        </button>
                                        <button
                                            onClick={handleCheckout}
                                            disabled={isSubmitting || !to || !from || !message}
                                            className="h-16 px-10 bg-pink-500 text-white font-black uppercase tracking-tighter italic rounded-2xl flex items-center gap-4 hover:bg-pink-400 disabled:opacity-20 transition-all hover:scale-105 active:scale-95 shadow-2xl shadow-pink-500/20"
                                        >
                                            {isSubmitting ? 'Securing...' : <><Gift size={20} /> Buy as Gift</>}
                                        </button>
                                    </div>
                                )}
                                <button
                                    onClick={() => { setSelectedTracks([]); setViewMode('selection'); }}
                                    className="p-3 bg-white/5 hover:bg-rose-500/20 text-white/20 hover:text-rose-500 transition-colors rounded-xl border border-white/10"
                                    title="Reset All"
                                >
                                    <Trash2 size={24} />
                                </button>
                            </div>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>

            <style jsx>{`
                .no-scrollbar::-webkit-scrollbar { display: none; }
                .no-scrollbar { -ms-overflow-style: none; scrollbar-width: none; }
                .mask-fade-right { mask-image: linear-gradient(to right, black 85%, transparent 100%); }
                .mask-fade-bottom { mask-image: linear-gradient(to bottom, black 70%, transparent 100%); }
            `}</style>
        </div>
    );
}
