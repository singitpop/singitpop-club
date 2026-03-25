"use client";

import { useState, useEffect } from "react";
import { useAuth } from '@/context/AuthContext';
import { motion, AnimatePresence } from 'framer-motion';
import { ShoppingBag, Lock, ExternalLink, Music, Heart, Sparkles, Smartphone, ArrowRight, Play, Pause, Volume2, Gift, CheckCircle, BookOpen } from 'lucide-react';
import { useSearchParams } from 'next/navigation';
import VinylCard from '@/components/shop/VinylCard';
import ProductCard from '@/components/shop/ProductCard';
import { MERCH_PRODUCTS } from "@/data/shopProducts";
import Link from 'next/link';
import { Suspense } from 'react';

function ShopContent() {
    const { user } = useAuth();
    const searchParams = useSearchParams();
    const isMixtapeSuccess = searchParams?.get('mixtape') === 'success';

    const [selectedVolume, setSelectedVolume] = useState(1);
    const [isProcessing, setIsProcessing] = useState(false);
    const [isPlayingPreview, setIsPlayingPreview] = useState(false);
    const [audio, setAudio] = useState<HTMLAudioElement | null>(null);

    const togglePreview = () => {
        if (isPlayingPreview) {
            audio?.pause();
            setIsPlayingPreview(false);
        } else {
            if (audio) audio.pause();
            const previewUrl = `https://singitpop-music.s3.eu-north-1.amazonaws.com/shop/SingItPop_CreatorPack_v${selectedVolume}_Preview.mp3`;
            const newAudio = new Audio(previewUrl);
            newAudio.onended = () => setIsPlayingPreview(false);
            setAudio(newAudio);
            newAudio.play();
            setIsPlayingPreview(true);
        }
    };

    // Cleanup audio on volume change or unmount
    useEffect(() => {
        return () => {
            if (audio) {
                audio.pause();
                setIsPlayingPreview(false);
            }
        };
    }, [selectedVolume, audio]);

    const handleCreatorPackCheckout = async () => {
        try {
            setIsProcessing(true);
            const res = await fetch('/api/shop/creator-pack/checkout', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ volume: selectedVolume })
            });
            const { url, error } = await res.json();
            if (url) window.location.href = url;
            else alert(error || 'Failed to start checkout');
        } catch (err) {
            console.error('Creator pack error:', err);
            alert('Something went wrong');
        } finally {
            setIsProcessing(false);
        }
    };

    const volumeThemes: Record<number, { name: string, filter: string }> = {
        1: { name: "Country Roots I", filter: "hue-rotate(45deg) saturate(1.2) brightness(1.1)" }, // Gold
        2: { name: "Country Roots II", filter: "hue-rotate(45deg) saturate(1.2) brightness(1.1)" },
        3: { name: "Country Roots III", filter: "hue-rotate(45deg) saturate(1.2) brightness(1.1)" },
        4: { name: "Country Roots IV", filter: "hue-rotate(45deg) saturate(1.2) brightness(1.1)" },
        5: { name: "Pop & Dance I", filter: "hue-rotate(180deg) saturate(1.5)" }, // Cyan/Blue
        6: { name: "Pop & Dance II", filter: "hue-rotate(180deg) saturate(1.5)" },
        7: { name: "Pop & Dance III", filter: "hue-rotate(180deg) saturate(1.5)" },
        8: { name: "Pop & Dance IV", filter: "hue-rotate(180deg) saturate(1.5)" }, 
        9: { name: "Synth & Trance", filter: "hue-rotate(280deg) saturate(2)" }, // Purple/Violet
        10: { name: "Dance Party", filter: "hue-rotate(320deg) saturate(2)" }, // Pink/Magenta
        11: { name: "Energy & Rock I", filter: "hue-rotate(0deg) saturate(2) brightness(0.9)" }, // Red/Energy
        12: { name: "Energy & Rock II", filter: "hue-rotate(0deg) saturate(2) brightness(0.9)" },
        13: { name: "Celtic Spirits I", filter: "hue-rotate(120deg) saturate(1.5)" }, // Green
        14: { name: "Celtic Spirits II", filter: "hue-rotate(120deg) saturate(1.5)" },
        15: { name: "Highland Folk", filter: "hue-rotate(120deg) saturate(1.5)" },
        16: { name: "Disney Magic", filter: "hue-rotate(200deg) saturate(1.2) brightness(1.2)" }, // Sky Blue
        17: { name: "Musical & Romance", filter: "hue-rotate(340deg) saturate(1.5)" }, // Soft Pink
        18: { name: "Acoustic Chill", filter: "sepia(0.5) contrast(1.1)" }, // Warm/Sepia
        19: { name: "Jazz & R&B", filter: "hue-rotate(260deg) brightness(0.8)" }, // Deep Blue/Midnight
        20: { name: "The Best of (Mixed)", filter: "none" } // Master Cyan
    };

    return (
        <div className="min-h-screen bg-black text-white pt-24 pb-16 px-4">
            {/* Hero */}
            <div className="max-w-6xl mx-auto mb-16 text-center">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6 }}
                >
                    <h1 className="text-6xl md:text-7xl font-bold mb-6 bg-gradient-to-r from-pink-400 via-purple-400 to-cyan-400 bg-clip-text text-transparent">
                        Shop
                    </h1>
                    <p className="text-xl text-white/60 max-w-2xl mx-auto">
                        Official merchandise, <strong className="text-yellow-400">Ringtones</strong>, <strong className="text-pink-400">Digital Artbooks</strong>, and <strong className="text-cyan-400">Vocal-Free</strong> creator assets.
                    </p>
                </motion.div>
            </div>

            {/* Mixtape Success Message */}
            <AnimatePresence>
                {isMixtapeSuccess && (
                    <motion.div
                        initial={{ opacity: 0, scale: 0.9, y: -20 }}
                        animate={{ opacity: 1, scale: 1, y: 0 }}
                        exit={{ opacity: 0, scale: 0.9, y: -20 }}
                        className="max-w-4xl mx-auto mb-16 bg-gradient-to-r from-rose-500/20 to-pink-500/20 border border-rose-500/50 rounded-3xl p-8 text-center relative overflow-hidden"
                    >
                        <div className="absolute top-0 left-0 p-32 bg-rose-500/10 blur-[80px] rounded-full pointer-events-none" />
                        <div className="relative z-10 flex flex-col items-center gap-4">
                            <div className="w-16 h-16 bg-rose-500 rounded-full flex items-center justify-center text-white shadow-lg shadow-rose-500/20">
                                <CheckCircle size={32} />
                            </div>
                            <h2 className="text-3xl font-black uppercase tracking-tight italic">GIFT SENT! 🎁</h2>
                            <p className="text-white/70 max-w-md mx-auto">
                                Your **Digital Mixtape** has been delivered to your email. You can now share the unique gift link with your recipient!
                            </p>
                            <Link 
                                href="/shop" 
                                className="mt-4 px-8 py-3 bg-white text-black font-black uppercase tracking-tighter italic rounded-xl hover:bg-rose-100 transition-all text-sm"
                            >
                                Continue Shopping
                            </Link>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>

            {/* VIP Discount Banner */}
            {(user as any)?.publicMetadata?.tier === 'VIP' || (user as any)?.publicMetadata?.tier === 'LABEL' ? (
                <div className="max-w-4xl mx-auto mb-16">
                    <motion.div
                        initial={{ opacity: 0, scale: 0.95 }}
                        animate={{ opacity: 1, scale: 1 }}
                        className="bg-gradient-to-r from-yellow-500/20 to-amber-500/20 border border-yellow-500/50 rounded-2xl p-6 flex flex-col md:flex-row items-center justify-between gap-4 text-center md:text-left"
                    >
                        <div className="flex items-center gap-4">
                            <div className="p-3 bg-yellow-500/20 rounded-xl text-yellow-500">
                                <Sparkles size={24} />
                            </div>
                            <div>
                                <h3 className="text-xl font-bold text-yellow-500">VIP Exclusive Benefit</h3>
                                <p className="text-white/80">You get <span className="text-white font-bold">20% OFF</span> all Merch & Apparel!</p>
                            </div>
                        </div>
                        <div className="bg-black/50 px-6 py-3 rounded-xl border border-white/10 flex flex-col items-center">
                            <span className="text-xs text-white/40 uppercase tracking-widest mb-1">Use Code at Checkout</span>
                            <span className="text-2xl font-mono font-bold text-yellow-400 tracking-wider">VIP20</span>
                        </div>
                    </motion.div>
                </div>
            ) : null}

            {/* Navigation Cards */}
            <div className="max-w-6xl mx-auto mb-24 grid md:grid-cols-2 gap-6">
                {/* Ringtones Card */}
                <Link href="/shop/ringtones" className="group">
                    <motion.div
                        className="bg-gradient-to-br from-purple-900/40 to-black border border-white/10 rounded-3xl p-8 h-full hover:border-purple-500/50 transition-all relative overflow-hidden"
                        whileHover={{ scale: 1.02 }}
                    >
                        <div className="absolute top-0 right-0 p-32 bg-purple-500/20 blur-[100px] rounded-full pointer-events-none" />
                        <div className="relative z-10">
                            <div className="w-12 h-12 bg-purple-500/20 rounded-2xl flex items-center justify-center mb-6 text-purple-400 group-hover:text-purple-300 transition-colors">
                                <Smartphone size={24} />
                            </div>
                            <h2 className="text-3xl font-bold mb-2">Ringtones</h2>
                            <p className="text-white/60 mb-6">Exclusive snippets sent individually to your phone.</p>

                            <div className="flex items-center text-purple-400 font-bold group-hover:translate-x-2 transition-transform">
                                Browse Collection <ArrowRight size={16} className="ml-2" />
                            </div>
                        </div>
                    </motion.div>
                </Link>

                {/* Custom Songs Card */}
                <Link href="/shop/custom-songs" className="group">
                    <motion.div
                        className="bg-gradient-to-br from-pink-900/40 to-black border border-white/10 rounded-3xl p-8 h-full hover:border-pink-500/50 transition-all relative overflow-hidden"
                        whileHover={{ scale: 1.02 }}
                    >
                        <div className="absolute top-0 right-0 p-32 bg-pink-500/20 blur-[100px] rounded-full pointer-events-none" />
                        <div className="relative z-10">
                            <div className="w-12 h-12 bg-pink-500/20 rounded-2xl flex items-center justify-center mb-6 text-pink-400 group-hover:text-pink-300 transition-colors">
                                <Heart size={24} />
                            </div>
                            <h2 className="text-3xl font-bold mb-2">Custom Songs</h2>
                            <p className="text-white/60 mb-6">Commission a unique track for special occasions.</p>

                            <div className="flex items-center text-pink-400 font-bold group-hover:translate-x-2 transition-transform">
                                Start Creating <ArrowRight size={16} className="ml-2" />
                            </div>
                        </div>
                    </motion.div>
                </Link>

                {/* Digital Mixtape Card */}
                <Link href="/shop/mixtape/builder" className="group md:col-span-2">
                    <motion.div
                        className="bg-gradient-to-br from-rose-900/40 to-black border border-white/10 rounded-3xl p-8 h-full hover:border-rose-500/50 transition-all relative overflow-hidden"
                        whileHover={{ scale: 1.01 }}
                    >
                        <div className="absolute top-0 right-0 p-64 bg-rose-500/10 blur-[120px] rounded-full pointer-events-none" />
                        <div className="relative z-10 flex flex-col md:flex-row items-center gap-8">
                            <div className="w-24 h-24 bg-rose-500/20 rounded-[2rem] flex items-center justify-center text-rose-400 group-hover:text-rose-300 transition-colors shrink-0">
                                <Gift size={48} />
                            </div>
                            <div className="flex-1 text-center md:text-left">
                                <h2 className="text-4xl font-black italic tracking-tighter mb-2 uppercase">DIGITAL MIXTAPE GIFTING</h2>
                                <p className="text-white/60 mb-6 text-lg">Pick 5 tracks, write a dedication, and give a gift of music that lasts forever. <strong className="text-white">£10.00</strong></p>

                                <div className="flex items-center justify-center md:justify-start text-rose-400 font-black uppercase tracking-widest text-sm group-hover:translate-x-2 transition-transform">
                                    Build Your Gift <ArrowRight size={18} className="ml-2" />
                                </div>
                            </div>
                        </div>
                    </motion.div>
                </Link>
            </div>

            {/* Digital Creator Packs Section */}
            <div className="max-w-6xl mx-auto mb-24">
                <div className="bg-gradient-to-br from-cyan-900/40 to-black border border-cyan-500/20 rounded-[3rem] p-8 md:p-12 relative overflow-hidden">
                    <div className="absolute top-0 right-0 p-64 bg-cyan-500/10 blur-[120px] rounded-full pointer-events-none" />
                    
                    <div className="relative z-10 grid lg:grid-cols-2 gap-12 items-center">
                        <div>
                            <div className="inline-flex items-center gap-2 px-4 py-2 bg-cyan-500/20 rounded-full text-cyan-400 text-sm font-bold mb-6 border border-cyan-500/30">
                                <Sparkles size={16} />
                                STUDIO QUALITY V13
                            </div>
                            <h2 className="text-4xl md:text-5xl font-bold mb-6">Digital Creator Packs</h2>
                            <p className="text-lg text-white/70 mb-8 leading-relaxed">
                                Professional, <span className="text-white font-bold">100% Vocal-Free</span> production assets. Each volume contains 10 melodic intros and 10 cinematic stingers, surgically harvested from the master stems.
                            </p>

                            <div className="grid grid-cols-2 gap-4 mb-8">
                                <div className="p-4 bg-white/5 rounded-2xl border border-white/10">
                                    <div className="text-cyan-400 font-bold mb-1">20 Assets</div>
                                    <div className="text-xs text-white/40 uppercase tracking-wider">Per Volume</div>
                                </div>
                                <div className="p-4 bg-white/5 rounded-2xl border border-white/10">
                                    <div className="text-pink-400 font-bold mb-1">Studio Stems</div>
                                    <div className="text-xs text-white/40 uppercase tracking-wider">Zero Bleed</div>
                                </div>
                            </div>

                            <div className="space-y-4">
                                <label className="text-sm text-white/40 uppercase tracking-widest block font-bold">Select Genre Volume</label>
                                <div className="grid grid-cols-4 sm:grid-cols-5 md:grid-cols-10 gap-2">
                                    {Object.keys(volumeThemes).map((vol) => (
                                        <button
                                            key={vol}
                                            onClick={() => setSelectedVolume(parseInt(vol))}
                                            className={`h-10 rounded-lg font-bold transition-all border ${
                                                selectedVolume === parseInt(vol) 
                                                    ? 'bg-cyan-500 border-cyan-400 text-black scale-110 shadow-[0_0_15px_rgba(6,182,212,0.5)]' 
                                                    : 'bg-white/5 border-white/10 text-white/60 hover:bg-white/10'
                                            }`}
                                        >
                                            {vol}
                                        </button>
                                    ))}
                                </div>
                                <div className="text-cyan-400 font-bold mt-2">
                                    Theme: {volumeThemes[selectedVolume].name}
                                </div>
                            </div>
                        </div>

                        <div className="flex flex-col items-center justify-center">
                            <div className="relative group cursor-pointer mb-8" onClick={togglePreview}>
                                <div 
                                    className="w-64 h-64 md:w-80 md:h-80 bg-cyan-500/20 rounded-[2.5rem] border-2 border-cyan-500/50 flex items-center justify-center relative overflow-hidden shadow-2xl transition-transform group-hover:scale-105"
                                    style={{ filter: volumeThemes[selectedVolume].filter }}
                                >
                                    <img 
                                        src="/images/shop/creator-pack-master.png" 
                                        alt="Creator Pack"
                                        className="w-full h-full object-cover opacity-80"
                                    />
                                    <div className="absolute inset-0 bg-black/40 flex items-center justify-center">
                                        <div className="w-20 h-20 bg-cyan-500 rounded-full flex items-center justify-center text-black shadow-xl">
                                            {isPlayingPreview ? <Pause size={32} /> : <Play size={32} className="ml-1" />}
                                        </div>
                                    </div>
                                </div>
                                <div className="absolute -bottom-4 left-1/2 -translate-x-1/2 bg-black border border-cyan-500/50 px-6 py-2 rounded-full whitespace-nowrap text-sm font-bold shadow-xl">
                                    {isPlayingPreview ? "PLAYING PREVIEW..." : "TAP TO PREVIEW"}
                                </div>
                            </div>

                            <button 
                                onClick={handleCreatorPackCheckout}
                                disabled={isProcessing}
                                className="w-full max-w-sm bg-white text-black py-4 rounded-2xl font-black text-xl hover:bg-cyan-400 transition-all flex items-center justify-center gap-3 shadow-[0_0_30px_rgba(255,255,255,0.2)] disabled:opacity-50"
                            >
                                <ShoppingBag />
                                {isProcessing ? 'PROCESSING...' : `BUY VOL ${selectedVolume} • £20`}
                            </button>
                            <p className="mt-4 text-xs text-white/40 uppercase tracking-widest font-bold">Instant S3 Download via Email</p>
                        </div>
                    </div>
                </div>
            </div>

            {/* Digital Bookstore CTA */}
            <section className="max-w-6xl mx-auto mb-32 px-6">
                <div className="relative group overflow-hidden rounded-[3rem] bg-gradient-to-br from-pink-900/40 to-purple-900/40 border border-pink-500/20 p-12 text-center">
                    <div className="absolute inset-0 bg-[url('/bg-pattern.png')] opacity-10 pointer-events-none" />
                    <div className="relative z-10 space-y-8">
                        <h2 className="text-4xl md:text-6xl font-black uppercase italic tracking-tighter leading-none">
                            The Digital <span className="text-pink-500">Bookstore</span>
                        </h2>
                        <p className="text-white/60 max-w-xl mx-auto font-bold text-lg">
                            Access the complete SingIt Pop discography. Get high-resolution Digital Artbooks for every album, with full lyrics and production notes.
                        </p>
                        <Link 
                            href="/shop/artbooks"
                            className="inline-flex items-center gap-4 bg-pink-600 hover:bg-pink-500 text-white px-10 py-6 rounded-2xl font-black uppercase text-xl italic transition-all active:scale-95 shadow-[0_0_50px_rgba(236,72,153,0.3)] border-4 border-white/20"
                        >
                            <BookOpen size={32} />
                            Browse Full Library • £5 Each
                            <ArrowRight size={24} />
                        </Link>
                    </div>
                </div>
            </section>

            {/* Merch Store Section */}
            <div className="max-w-6xl mx-auto">
                <div className="text-center mb-12">
                    <h2 className="text-4xl font-bold mb-4">Official Store</h2>
                    <p className="text-white/60">Apparel, Vinyl, and Accessories</p>
                </div>

                <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
                    {MERCH_PRODUCTS.map((product) => (
                        <motion.a
                            key={product.id}
                            href={product.link}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="bg-white/5 rounded-2xl overflow-hidden border border-white/10 hover:border-white/30 transition-all group"
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                        >
                            <div
                                className="aspect-square relative flex items-center justify-center p-6 bg-white/5"
                            >
                                {product.category === 'vinyl' ? (
                                    <VinylCard
                                        imageColor={product.imageColor}
                                        imageUrl={product.image}
                                        className="w-full h-full"
                                    />
                                ) : product.image ? (
                                    <div className="w-full h-full relative rounded-xl overflow-hidden group-hover:scale-105 transition-transform duration-300">
                                        <img
                                            src={product.image}
                                            alt={product.name}
                                            className="w-full h-full object-cover"
                                        />
                                    </div>
                                ) : (
                                    <div
                                        className="w-full h-full flex items-center justify-center rounded-xl relative overflow-hidden"
                                        style={{ background: product.imageColor }}
                                    >
                                        <div className="w-full h-full bg-black/20" />
                                    </div>
                                )}

                                {product.proOnly && (
                                    <div className="absolute top-4 right-4 flex items-center gap-1 px-3 py-1 bg-black/80 backdrop-blur-md rounded-full text-xs font-bold border border-yellow-500/50 text-yellow-500 z-20">
                                        <Lock size={12} />
                                        VIP ONLY
                                    </div>
                                )}
                            </div>

                            <div className="p-4">
                                <h3 className="font-bold mb-1 truncate">{product.name}</h3>
                                <p className="text-sm text-white/50 mb-3 truncate">{product.description}</p>
                                <div className="flex items-center justify-between">
                                    <span className="text-lg font-bold">
                                        {product.startingPrice && <span className="text-sm font-normal text-white/60 mr-1">From</span>}
                                        £{product.price.toFixed(2)}
                                    </span>
                                    <span className="p-2 bg-white/10 rounded-lg group-hover:bg-white/20 transition-colors">
                                        <ExternalLink size={18} />
                                    </span>
                                </div>
                            </div>
                        </motion.a>
                    ))}
                </div>
            </div>
        </div>
    );
}

export default function ShopPage() {
    return (
        <Suspense fallback={<div className="min-h-screen bg-black" />}>
            <ShopContent />
        </Suspense>
    );
}
