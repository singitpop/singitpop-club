'use client';

import React, { useState, useEffect } from 'react';
import { useAuth } from '@/context/AuthContext';
import { motion, AnimatePresence } from 'framer-motion';
import { Search, ShoppingBag, BookOpen, Sparkles, X, Eye, Image as ImageIcon, FileText, ArrowLeft, Filter, RotateCcw } from "lucide-react";
import Link from 'next/link';
import Image from 'next/image';

export default function DigitalBookstorePage() {
    const [albums, setAlbums] = useState<any[]>([]);
    const [filteredAlbums, setFilteredAlbums] = useState<any[]>([]);
    const [searchQuery, setSearchQuery] = useState("");
    const [isLoading, setIsLoading] = useState(true);
    const [loadingBook, setLoadingBook] = useState<string | null>(null);
    const [previewAlbum, setPreviewAlbum] = useState<any | null>(null);
    const [previewLyrics, setPreviewLyrics] = useState<string[]>([]);
    const [isLoadingLyrics, setIsLoadingLyrics] = useState(false);
    const [showBack, setShowBack] = useState(false);

    const { user, isPro, isLabel } = useAuth();

    // Reset showBack when opening a new preview
    useEffect(() => {
        if (previewAlbum) setShowBack(false);
    }, [previewAlbum]);

    // Fetch lyrics when previewing an album
    useEffect(() => {
        const fetchLyrics = async () => {
            if (!previewAlbum || !previewAlbum.tracks[0]?.lyrics) {
                setPreviewLyrics([]);
                return;
            }

            setIsLoadingLyrics(true);
            try {
                const response = await fetch(`/data/lyrics/${previewAlbum.tracks[0].lyrics}`);
                if (response.ok) {
                    const text = await response.text();
                    try {
                        const data = JSON.parse(text);
                        setPreviewLyrics(data.lyrics || []);
                    } catch (e) {
                        console.error("Failed to parse lyrics JSON:", e);
                        setPreviewLyrics([]);
                    }
                } else {
                    setPreviewLyrics([]);
                }
            } catch (err) {
                console.error("Failed to fetch lyrics:", err);
                setPreviewLyrics([]);
            } finally {
                setIsLoadingLyrics(false);
            }
        };

        fetchLyrics();
    }, [previewAlbum]);

    useEffect(() => {
        fetch('/api/content/albums')
            .then(res => res.json())
            .then(data => {
                if (!Array.isArray(data)) {
                    console.error('API returned non-array data:', data);
                    setAlbums([]);
                    setFilteredAlbums([]);
                    return;
                }
                const now = new Date();
                const visibleAlbums = data.filter((album: any) => {
                    // Only show albums that have artbook assets in S3
                    if (!album.hasArtbook) return false;

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
                            <p className="text-[10px] text-white/40 uppercase font-bold tracking-[0.2em]">The SingitPop Records Library</p>
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
                        Own the <span className="text-transparent bg-clip-text bg-gradient-to-r from-pink-500 to-rose-400 px-1">Digital</span> Artbooks
                    </h2>
                    <p className="text-zinc-500 max-w-2xl mx-auto font-bold text-lg md:text-xl">
                        Experience high-resolution artwork and full official lyrics, straight from the studio archive.
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
                                        <div className="absolute inset-0 flex flex-col items-center justify-center opacity-0 group-hover:opacity-100 transition-all transform translate-y-4 group-hover:translate-y-0 bg-black/40 backdrop-blur-sm">
                                            <button 
                                                onClick={(e) => {
                                                    e.stopPropagation();
                                                    setPreviewAlbum(album);
                                                }}
                                                className="w-16 h-16 rounded-full bg-white text-black flex items-center justify-center shadow-2xl mb-4 hover:scale-110 transition-transform"
                                            >
                                                <Eye size={28} />
                                            </button>
                                            <div className="text-[10px] font-black uppercase tracking-[0.2em] text-white">Preview Artwork</div>
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
                            SingitPop Records Digital Studio <br />
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
            {/* Preview Modal */}
            <AnimatePresence>
                {previewAlbum && (
                    <motion.div 
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="fixed inset-0 z-50 flex items-center justify-center p-4 md:p-8 bg-black/90 backdrop-blur-xl"
                        onClick={() => setPreviewAlbum(null)}
                    >
                        <motion.div 
                            initial={{ scale: 0.9, y: 20 }}
                            animate={{ scale: 1, y: 0 }}
                            exit={{ scale: 0.9, y: 20 }}
                            className="bg-zinc-900 w-full max-w-6xl max-h-full overflow-hidden rounded-[2.5rem] border border-white/10 flex flex-col md:flex-row relative shadow-[0_0_100px_rgba(236,72,153,0.1)]"
                            onClick={(e) => e.stopPropagation()}
                        >
                            <button 
                                onClick={() => setPreviewAlbum(null)}
                                className="absolute top-6 right-6 w-12 h-12 rounded-full bg-black/40 backdrop-blur-md border border-white/10 flex items-center justify-center text-white/60 hover:text-white hover:border-white/20 z-10"
                            >
                                <X size={24} />
                            </button>
                            {/* Left: Artwork Preview */}
                            <div className="md:w-1/2 aspect-square relative bg-black group/art cursor-pointer overflow-hidden"
                                onClick={() => setShowBack(!showBack)}
                            >
                                <motion.div 
                                    key={showBack ? "back" : "front"}
                                    initial={{ opacity: 0, scale: 1.1 }}
                                    animate={{ opacity: 1, scale: 1 }}
                                    transition={{ duration: 0.4 }}
                                    className="relative w-full h-full"
                                >
                                    <Image 
                                        src={(() => {
                                            const art = showBack ? (previewAlbum.backCover || 'https://singitpop-music.s3.eu-north-1.amazonaws.com/brain/75fc6105-7ac9-476c-a08c-0bd8917fa7c0/placeholder_back_coming_soon_v1_1774518707780.png') : (previewAlbum.coverArt || '');
                                            if (!art) return 'https://singitpop-music.s3.eu-north-1.amazonaws.com/brain/75fc6105-7ac9-476c-a08c-0bd8917fa7c0/placeholder_back_coming_soon_v1_1774518707780.png';
                                            return art.startsWith('http') || art.startsWith('/') ? art : `/${art}`;
                                        })()} 
                                        alt={previewAlbum.title} 
                                        fill 
                                        className="object-cover"
                                        onError={(e) => {
                                            // @ts-ignore
                                            e.target.src = 'https://singitpop-music.s3.eu-north-1.amazonaws.com/brain/75fc6105-7ac9-476c-a08c-0bd8917fa7c0/placeholder_back_coming_soon_v1_1774518707780.png';
                                        }}
                                    />
                                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent pointer-events-none" />
                                </motion.div>

                                <div className="absolute bottom-12 left-12 right-12 flex items-end justify-between">
                                    <div className="flex-1">
                                        <div className="text-pink-500 font-black uppercase tracking-[0.4em] text-[10px] mb-4">
                                            {showBack ? "Master Back Cover" : "Archive Original Art"}
                                        </div>
                                        <h3 className="text-4xl md:text-5xl font-black italic uppercase tracking-tighter leading-none text-white max-w-md drop-shadow-2xl">
                                            {previewAlbum.title}
                                        </h3>
                                    </div>
                                    <div className="w-12 h-12 rounded-full bg-white/10 backdrop-blur-md border border-white/20 flex items-center justify-center text-white/40 group-hover/art:bg-pink-500 group-hover/art:text-black transition-all">
                                        <RotateCcw size={20} className={showBack ? "rotate-180 transition-transform duration-500" : "transition-transform duration-500"} />
                                    </div>
                                </div>
                            </div>

                            {/* Right: Contents & Purchase */}
                            <div className="md:w-1/2 p-8 md:p-12 overflow-y-auto custom-scrollbar flex flex-col">
                                <div className="flex-1 space-y-12">
                                    <section>
                                        <div className="flex items-center gap-4 mb-4">
                                            <div className="w-8 h-8 rounded-lg bg-pink-500/10 flex items-center justify-center text-pink-500">
                                                <ImageIcon size={16} />
                                            </div>
                                            <h4 className="text-sm font-black uppercase tracking-[0.2em] text-white">High-Resolution Art</h4>
                                        </div>
                                        <p className="text-zinc-400 font-bold leading-relaxed">
                                            This artbook includes the master high-resolution cover artwork, full-bleed interior spreads, and alternative concept art from the SingitPop Records creative studio.
                                        </p>
                                    </section>

                                    <section>
                                        <div className="flex items-center gap-4 mb-4">
                                            <div className="w-8 h-8 rounded-lg bg-pink-500/10 flex items-center justify-center text-pink-500">
                                                <FileText size={16} />
                                            </div>
                                            <h4 className="text-sm font-black uppercase tracking-[0.2em] text-white">Official Lyrics & Digital Extras</h4>
                                        </div>
                                        <div className="space-y-4">
                                            <p className="text-zinc-400 font-bold leading-relaxed">
                                                Full official lyrics for every track seamlessly paired with high-resolution digital wallpapers, thematic lore, and exclusive behind-the-scenes visual concepts that expand the album's cinematic universe.
                                            </p>
                                            <div className="bg-white/5 border border-white/5 rounded-2xl p-6 font-mono text-[10px] text-zinc-500 uppercase tracking-widest leading-loose italic overflow-hidden">
                                                {isLoadingLyrics ? (
                                                    <div className="animate-pulse space-y-1">
                                                        <div className="h-2 w-3/4 bg-white/10 rounded" />
                                                        <div className="h-2 w-1/2 bg-white/10 rounded" />
                                                        <div className="h-2 w-2/3 bg-white/10 rounded" />
                                                    </div>
                                                ) : previewLyrics.length > 0 ? (
                                                    <div className="space-y-1">
                                                        {previewLyrics.slice(0, 4).map((line, idx) => (
                                                            <div key={idx} className="truncate">"{line}"</div>
                                                        ))}
                                                        {previewLyrics.length > 4 && <div>...</div>}
                                                    </div>
                                                ) : (
                                                    <>
                                                        "Official lyrics and studio notes<br/>
                                                        encrypted and secured in the vault..."
                                                    </>
                                                )}
                                            </div>
                                        </div>
                                    </section>
                                </div>

                                <div className="mt-12 pt-12 border-t border-white/5 flex items-center justify-between gap-6">
                                    <div className="space-y-1">
                                        <div className="text-[10px] font-black uppercase tracking-widest text-zinc-500">Full Access</div>
                                        <div className="text-2xl font-black text-white italic">£5.00</div>
                                    </div>
                                    <button 
                                        onClick={() => handleCheckout(previewAlbum)}
                                        className="flex-1 py-5 bg-gradient-to-r from-pink-500 to-rose-400 text-black rounded-2xl font-black uppercase text-sm italic transition-all hover:scale-[1.02] active:scale-95 shadow-[0_10px_30px_rgba(236,72,153,0.3)]"
                                    >
                                        Download Master PDF
                                    </button>
                                </div>
                            </div>
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
}
