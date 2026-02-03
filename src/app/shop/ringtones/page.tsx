"use client";

import { useState, useEffect } from "react";
import { useAuth } from '@/context/AuthContext';
import { motion } from 'framer-motion';
import { Smartphone, ArrowLeft } from 'lucide-react';
import Link from 'next/link';
import { getArtworkForTrack } from "@/utils/artworkMatcher";

export default function RingtonesPage() {
    const [ringtones, setRingtones] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        async function fetchRingtones() {
            try {
                const res = await fetch('/api/ringtones');
                const data = await res.json();
                if (data.ringtones) {
                    setRingtones(data.ringtones);
                }
            } catch (error) {
                console.error('Failed to fetch ringtones:', error);
            } finally {
                setLoading(false);
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
            <div className="max-w-6xl mx-auto">
                <div className="mb-8">
                    <Link href="/shop" className="inline-flex items-center gap-2 text-white/60 hover:text-white transition-colors mb-6">
                        <ArrowLeft size={20} />
                        Back to Shop
                    </Link>

                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6 }}
                    >
                        <h1 className="text-4xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent">
                            All Ringtones
                        </h1>
                        <p className="text-xl text-white/60">
                            Complete collection of ringtones & alerts
                        </p>
                    </motion.div>
                </div>

                {loading ? (
                    <div className="flex justify-center p-12">
                        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-cyan-500"></div>
                    </div>
                ) : ringtones.length === 0 ? (
                    <div className="text-center p-12 bg-white/5 rounded-3xl">
                        <p className="text-white/60">No ringtones available yet.</p>
                    </div>
                ) : (
                    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                        {ringtones.map((ringtone, index) => {
                            const artwork = getArtworkForTrack(ringtone.title);

                            return (
                                <motion.div
                                    key={ringtone.id}
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ duration: 0.5, delay: index * 0.05 }}
                                    className="bg-white/5 backdrop-blur-sm rounded-2xl p-4 border border-white/10 hover:border-cyan-500/30 transition-all group"
                                >
                                    <div className="aspect-square rounded-xl overflow-hidden mb-4 relative bg-black/50">
                                        <img
                                            src={artwork}
                                            alt={ringtone.title}
                                            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                                            onError={(e) => {
                                                (e.target as HTMLImageElement).src = "/images/defaults/vinyl_default.png";
                                            }}
                                        />
                                        <div className="absolute inset-0 bg-black/20 group-hover:bg-transparent transition-colors" />
                                        <div className="absolute bottom-2 right-2 bg-black/60 backdrop-blur-md p-2 rounded-full text-white/80">
                                            <Smartphone size={16} />
                                        </div>
                                    </div>

                                    <h3 className="font-bold mb-1 truncate" title={ringtone.title}>{ringtone.title}</h3>
                                    <p className="text-xs text-white/40 mb-4 uppercase tracking-wider">{ringtone.genre || 'Pop'} • {ringtone.duration}s</p>

                                    <div className="flex items-center justify-between mt-auto">
                                        <span className="text-lg font-bold text-cyan-400">${ringtone.price.toFixed(2)}</span>
                                        <button
                                            onClick={() => handleBuyRingtone(ringtone.priceId)}
                                            className="px-4 py-2 bg-white/10 hover:bg-white/20 hover:text-cyan-400 rounded-lg text-sm font-semibold transition-colors"
                                        >
                                            Buy
                                        </button>
                                    </div>
                                </motion.div>
                            );
                        })}
                    </div>
                )}
            </div>
        </div>
    );
}
