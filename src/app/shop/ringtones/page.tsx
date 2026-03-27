"use client";

import { useState, useEffect } from "react";
import { useAuth } from '@/context/AuthContext';
import { motion } from 'framer-motion';
import { getArtworkForTrack } from "@/utils/artworkMatcher";
import { Smartphone, ArrowLeft } from 'lucide-react';
import Link from 'next/link';

export default function RingtonesPage() {
    const { user } = useAuth();
    const [ringtones, setRingtones] = useState<any[]>([]);
    const [loadingRingtones, setLoadingRingtones] = useState(true);
    const [debugError, setDebugError] = useState<string>('');

    useEffect(() => {
        async function fetchRingtones() {
            try {
                const res = await fetch('/api/ringtones');
                const data = await res.json();

                if (data.error) {
                    setDebugError(data.error);
                    console.error('API Error:', data.error);
                }

                if (data.ringtones) {
                    setRingtones(data.ringtones);
                }
            } catch (error: any) {
                console.error('Failed to fetch ringtones:', error);
                setDebugError(error.message || 'Network fetch failed');
            } finally {
                setLoadingRingtones(false);
            }
        }
        fetchRingtones();
    }, []);

    const handleBuyRingtone = async (priceId: string) => {
        try {
            const res = await fetch('/api/stripe/checkout', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ priceId })
            });
            const data = await res.json();
            if (data.url) {
                window.location.href = data.url;
            } else {
                alert('Checkout failed: ' + (data.error || 'Unknown error'));
            }
        } catch (error) {
            console.error('Checkout failed:', error);
            alert('Failed to start checkout');
        }
    };

    return (
        <div className="min-h-screen bg-black text-white pt-24 pb-16 px-4">
            <div className="max-w-6xl mx-auto mb-8">
                <Link href="/shop" className="inline-flex items-center text-white/60 hover:text-white transition-colors mb-4">
                    <ArrowLeft size={16} className="mr-2" />
                    Back to Shop
                </Link>
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6 }}
                    className="text-center"
                >
                    <h1 className="text-5xl md:text-7xl font-bold mb-6 bg-gradient-to-r from-pink-400 via-purple-400 to-cyan-400 bg-clip-text text-transparent">
                        Ringtones
                    </h1>
                    <p className="text-xl text-white/60 max-w-2xl mx-auto">
                        Exclusive snippets from your favorite tracks for your phone.
                    </p>
                </motion.div>
            </div>

            <div className="max-w-6xl mx-auto mb-24">
                {loadingRingtones ? (
                    <div className="flex justify-center p-12">
                        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-pink-500"></div>
                    </div>
                ) : ringtones.length === 0 ? (
                    <div className="text-center p-12 bg-white/5 rounded-3xl">

                        <p className="text-white/60">No ringtones available yet. Check back soon!</p>
                    </div>
                ) : (
                    <>
                        {/* Latest Drops Section */}
                        <div className="mb-12">
                            <h3 className="text-xl font-bold mb-6 flex items-center gap-2">
                                <span className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></span>
                                Latest Drops (Past 60 Days)
                            </h3>
                            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
                                {ringtones.filter(r => r.isNew).map((ringtone, index) => {
                                    const artwork = ringtone.artwork || "/images/singles-cover.png";
                                    return (
                                        <motion.div
                                            key={ringtone.id}
                                            initial={{ opacity: 0, y: 20 }}
                                            animate={{ opacity: 1, y: 0 }}
                                            transition={{ duration: 0.5, delay: index * 0.05 }}
                                            className="bg-white/5 backdrop-blur-sm rounded-2xl p-3 border border-white/10 hover:border-pink-500/30 transition-all group"
                                        >
                                            <div className="aspect-square rounded-xl overflow-hidden mb-3 relative bg-black/50">
                                                <img
                                                    src={artwork}
                                                    alt={ringtone.title}
                                                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                                                    onError={(e) => {
                                                        (e.target as HTMLImageElement).src = "/images/singles-cover.png";
                                                    }}
                                                />
                                                <div className="absolute top-2 right-2 bg-pink-600 backdrop-blur-md px-1.5 py-0.5 rounded text-[10px] font-bold text-white uppercase tracking-wide">
                                                    NEW
                                                </div>
                                            </div>

                                            <h3 className="font-bold text-sm mb-1 truncate" title={ringtone.title}>{ringtone.title}</h3>
                                            <div className="flex items-center justify-between">
                                                <span className="text-sm font-bold text-pink-400">£{ringtone.price.toFixed(2)}</span>
                                                <button
                                                    onClick={() => handleBuyRingtone(ringtone.priceId)}
                                                    className="px-2.5 py-1 bg-white/10 hover:bg-white/20 rounded-md text-xs font-semibold transition-colors"
                                                >
                                                    Buy
                                                </button>
                                            </div>
                                        </motion.div>
                                    );
                                })}
                            </div>
                            {ringtones.filter(r => r.isNew).length === 0 && (
                                <p className="text-white/40 text-sm italic">No new drops this month.</p>
                            )}
                        </div>

                        {/* Archive / Vault Section */}
                        <div>
                            <h3 className="text-xl font-bold mb-6 text-white/60">The Vault</h3>
                            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 opacity-80 hover:opacity-100 transition-opacity">
                                {ringtones.filter(r => !r.isNew).map((ringtone) => {
                                    const artwork = ringtone.artwork || "/images/singles-cover.png";
                                    return (
                                        <div key={ringtone.id} className="bg-black/20 rounded-xl p-3 border border-white/5 hover:border-white/20 transition-all flex items-center justify-between gap-4">
                                            <div className="flex items-center gap-3 overflow-hidden">
                                                <img
                                                    src={artwork}
                                                    className="w-10 h-10 rounded bg-gray-800 object-cover flex-shrink-0"
                                                    alt=""
                                                    onError={(e) => {
                                                        (e.target as HTMLImageElement).src = "/images/singles-cover.png";
                                                    }}
                                                />
                                                <div className="overflow-hidden">
                                                    <h4 className="font-bold text-xs truncate text-white/80">{ringtone.title}</h4>
                                                    <span className="text-[10px] text-pink-400 font-bold">£{ringtone.price.toFixed(2)}</span>
                                                </div>
                                            </div>
                                            <button
                                                onClick={() => handleBuyRingtone(ringtone.priceId)}
                                                className="px-3 py-1.5 bg-white/5 hover:bg-white/10 rounded text-[10px] text-white/60 hover:text-white transition-colors whitespace-nowrap"
                                            >
                                                Buy
                                            </button>
                                        </div>
                                    );
                                })}
                            </div>
                        </div>
                    </>
                )}
            </div>
        </div>
    );
}
