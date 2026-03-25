'use client';

import React, { useState, useEffect } from 'react';
import { useAuth } from '@/context/AuthContext';
import { motion, AnimatePresence } from 'framer-motion';
import { BookOpen, Search, ArrowLeft, Sparkles, Filter, ShoppingBag } from 'lucide-react';
import Link from 'next/link';
import Image from 'next/image';

export default function DigitalBookstorePage() {
    const [albums, setAlbums] = useState<any[]>([]);
    const [filteredAlbums, setFilteredAlbums] = useState<any[]>([]);
    const [searchQuery, setSearchQuery] = useState("");
    const [isLoading, setIsLoading] = useState(true);
    const [loadingBook, setLoadingBook] = useState<string | null>(null);

    const { user, isPro, isLabel } = useAuth();

    useEffect(() => {
        fetch('/api/content/albums')
            .then(res => res.json())
            .then(data => {
                const now = new Date();
                const visibleAlbums = data.filter((album: any) => {
                    // Filter out Singles collection
                    if (album.folderPath?.toLowerCase().includes('singles') || album.id === 'singles') {
                        return false;
                    }

                    if (!album.releaseDate) return true;
                    
                    const releaseDate = new Date(album.releaseDate);
                    if (releaseDate <= now) return true;
                    
                    // Future release - only show to Pro (VIP/Label)
                    return isPro || isLabel;
                });
                setAlbums(visibleAlbums);
                setFilteredAlbums(visibleAlbums);
            })
            .catch(err => console.error('Error loading albums:', err))
            .finally(() => setIsLoading(false));
    }, [isPro, isLabel]);

    useEffect(() => {
        const lowerQuery = searchQuery.toLowerCase();
        const filtered = albums.filter(album => 
            album.title.toLowerCase().includes(lowerQuery)
        );
        setFilteredAlbums(filtered);
    }, [searchQuery, albums]);

    const handleCheckout = async (album: any) => {
        try {
            setLoadingBook(album.id);
            const res = await fetch('/api/shop/artbook/checkout', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    albumId: album.id,
                    albumTitle: album.title
                })
            });
            const { url, error } = await res.json();
            if (url) window.location.href = url;
            else alert(error || 'Failed to start checkout.');
        } catch (err) {
            console.error('Artbook checkout error:', err);
            alert('Something went wrong. Please try again.');
        } finally {
            setLoadingBook(null);
        }
    };

    return (
        <div className="min-h-screen bg-black text-white font-sans selection:bg-pink-500/30">
            
            {/* Glossy Header */}
            <header className="sticky top-0 z-50 bg-black/80 backdrop-blur-xl border-b border-white/10 px-6 py-6 transition-all">
                <div className="max-w-7xl mx-auto flex items-center justify-between gap-8">
                    <div className="flex items-center gap-6">
                        <Link href="/shop" className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center hover:bg-white/10 transition-colors">
                            <ArrowLeft size={20} />
                        </Link>
                        <div>
                            <h1 className="text-2xl font-black uppercase italic tracking-tighter flex items-center gap-2">
                                <BookOpen className="text-pink-500" />
                                Digital Bookstore
                            </h1>
                            <p className="text-[10px] text-white/40 uppercase font-bold tracking-[0.2em]">The SingIt Pop Library</p>
                        </div>
                    </div>

                    <div className="hidden md:flex flex-1 max-w-md relative group">
                        <div className="absolute inset-y-0 left-4 flex items-center text-white/40 group-focus-within:text-pink-500 transition-colors">
                            <Search size={18} />
                        </div>
                        <input 
                            type="text" 
                            placeholder="Search our full discography..." 
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            className="w-full bg-white/5 border border-white/10 rounded-2xl py-3 pl-12 pr-6 focus:outline-none focus:border-pink-500/50 focus:bg-white/10 transition-all font-bold text-sm"
                        />
                    </div>

                    <div className="flex items-center gap-4">
                        <div className="hidden lg:flex flex-col items-end">
                            <div className="text-[10px] font-black uppercase text-pink-500">Instant Access</div>
                            <div className="text-xs font-bold text-white/60">Digital PDF Delivery</div>
                        </div>
                        <div className="w-10 h-10 rounded-full bg-gradient-to-br from-pink-500/20 to-purple-500/20 border border-pink-500/30 flex items-center justify-center">
                            <Sparkles size={18} className="text-pink-400" />
                        </div>
                    </div>
                </div>
            </header>

            <main className="max-w-7xl mx-auto px-6 py-12">
                
                {/* Hero / Intro */}
                <div className="mb-16 text-center space-y-4">
                    <h2 className="text-5xl md:text-7xl font-black italic uppercase tracking-tighter leading-none">
                        Own the <span className="text-transparent bg-clip-text bg-gradient-to-r from-pink-500 to-rose-400">Production</span> Notes
                    </h2>
                    <p className="text-zinc-500 max-w-2xl mx-auto font-bold text-lg md:text-xl">
                        Immerse yourself in the story behind every track. High-resolution art, full lyrics, and exclusive production notes.
                    </p>
                </div>

                {isLoading ? (
                    <div className="flex flex-col items-center justify-center py-24 space-y-6">
                        <div className="w-12 h-12 border-4 border-pink-500/20 border-t-pink-500 rounded-full animate-spin" />
                        <div className="text-zinc-500 font-black uppercase tracking-[0.3em] text-xs animate-pulse">Scanning Archive...</div>
                    </div>
                ) : (
                    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6 md:gap-8">
                        <AnimatePresence mode="popLayout">
                            {filteredAlbums.map((album, i) => (
                                <motion.div 
                                    key={album.id}
                                    layout
                                    initial={{ opacity: 0, scale: 0.9 }}
                                    animate={{ opacity: 1, scale: 1 }}
                                    exit={{ opacity: 0, scale: 0.9 }}
                                    transition={{ delay: i * 0.05 }}
                                    className="group relative flex flex-col"
                                >
                                    <div className="aspect-[3/4] rounded-[2rem] bg-zinc-900 overflow-hidden border border-white/5 group-hover:border-pink-500/50 transition-all relative">
                                        <Image 
                                            src={album.coverArt} 
                                            alt={album.title} 
                                            fill 
                                            className="object-cover group-hover:scale-110 transition-transform duration-700"
                                        />
                                        <div className="absolute inset-0 bg-gradient-to-t from-black via-black/20 to-transparent opacity-60 group-hover:opacity-80 transition-opacity" />
                                        
                                        {/* Hover Overlay */}
                                        <div className="absolute inset-0 flex flex-col items-center justify-center opacity-0 group-hover:opacity-100 transition-all transform translate-y-4 group-hover:translate-y-0">
                                            <div className="w-16 h-16 rounded-full bg-white text-black flex items-center justify-center shadow-2xl mb-4">
                                                <BookOpen size={28} />
                                            </div>
                                        </div>

                                        <div className="absolute bottom-6 left-6 right-6">
                                            <div className="text-[10px] font-black uppercase tracking-[0.2em] text-pink-500 mb-1">Official Artbook</div>
                                            <h3 className="text-xl font-black uppercase italic tracking-tighter truncate leading-none">{album.title}</h3>
                                        </div>
                                    </div>
                                    
                                    <div className="mt-4 px-2 flex flex-col gap-4">
                                        <button 
                                            onClick={() => handleCheckout(album)}
                                            disabled={loadingBook !== null}
                                            className="w-full py-4 bg-white/5 hover:bg-white text-white hover:text-black rounded-2xl font-black uppercase text-sm italic transition-all active:scale-95 flex items-center justify-center gap-2 border border-white/5"
                                        >
                                            <ShoppingBag size={16} />
                                            {loadingBook === album.id ? 'Starting...' : 'GET ACCESS • £5'}
                                        </button>
                                    </div>
                                </motion.div>
                            ))}
                        </AnimatePresence>
                    </div>
                )}

                {!isLoading && filteredAlbums.length === 0 && (
                    <div className="flex flex-col items-center justify-center py-24 text-center">
                        <Search size={48} className="text-white/10 mb-6" />
                        <h3 className="text-2xl font-black uppercase italic">No books match your search</h3>
                        <p className="text-zinc-500 mt-2">Try a different album title or keyword.</p>
                        <button 
                            onClick={() => setSearchQuery("")}
                            className="mt-6 text-pink-500 font-bold hover:underline"
                        >
                            Reset Library Search
                        </button>
                    </div>
                )}
            </main>

            <footer className="border-t border-white/5 py-12 px-6">
                <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-8">
                    <div className="flex items-center gap-4">
                        <div className="w-12 h-12 rounded-2xl bg-white/5 flex items-center justify-center">🏴󠁧󠁢󠁳󠁣󠁴󠁿</div>
                        <div className="text-xs font-bold text-white/40 uppercase tracking-widest">
                            SingIt Pop Digital Studio <br />
                            Made in Scotland ⚡️
                        </div>
                    </div>
                    <div className="flex gap-8 text-[10px] font-black uppercase tracking-[0.3em] text-white/20">
                        <span>Instant PDF</span>
                        <span>Interactive Viewer</span>
                        <span>Official Stems</span>
                    </div>
                </div>
            </footer>
        </div>
    );
}
