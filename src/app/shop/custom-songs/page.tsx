"use client";

import { useState } from "react";
import { motion, AnimatePresence } from 'framer-motion';
import { useAuth } from '@/context/AuthContext';
import { Music, Heart, Sparkles, Check, ArrowRight, ArrowLeft } from 'lucide-react';
import Link from 'next/link';

const CUSTOM_SONG_TIERS = [
    {
        id: "jingle",
        name: "30-Second Jingle",
        price: 50,
        duration: "30 seconds",
        features: ["Perfect for birthdays", "Anniversaries", "Special occasions", "MP3 delivery"],
        icon: Music,
        gradient: "from-pink-500 to-rose-500"
    },
    {
        id: "full",
        name: "Full Song",
        price: 200,
        duration: "2-3 minutes",
        features: ["Weddings", "Proposals", "Celebrations", "Full production", "MP3 + WAV delivery"],
        icon: Heart,
        gradient: "from-purple-500 to-pink-500",
        popular: true
    },
    {
        id: "premium",
        name: "Premium Package",
        price: 500,
        duration: "4+ minutes",
        features: ["Full song", "Music video", "Behind-the-scenes", "All formats", "Priority delivery"],
        icon: Sparkles,
        gradient: "from-cyan-500 to-purple-500"
    }
];

export default function CustomSongsPage() {
    const { user } = useAuth();

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
                        Custom Songs
                    </h1>
                    <p className="text-xl text-white/60 max-w-2xl mx-auto">
                        Let me write a song just for you or someone special.
                    </p>
                </motion.div>
            </div>

            <div className="max-w-6xl mx-auto mb-24">
                <div className="grid md:grid-cols-3 gap-6 mb-12">
                    {CUSTOM_SONG_TIERS.map((tier, index) => {
                        const Icon = tier.icon;
                        return (
                            <motion.div
                                key={tier.id}
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.5, delay: index * 0.1 }}
                                className="relative bg-gradient-to-b from-white/10 to-white/5 backdrop-blur-xl rounded-3xl p-8 border border-white/10 hover:border-white/30 transition-all hover:shadow-xl hover:shadow-pink-500/10 hover:-translate-y-1"
                            >
                                {tier.popular && (
                                    <div className="absolute -top-4 left-1/2 -translate-x-1/2 px-4 py-1 bg-gradient-to-r from-pink-500 to-purple-500 rounded-full text-xs font-bold">
                                        MOST POPULAR
                                    </div>
                                )}

                                <div className={`w-16 h-16 rounded-2xl bg-gradient-to-br ${tier.gradient} flex items-center justify-center mb-6`}>
                                    <Icon size={32} className="text-white" />
                                </div>

                                <h3 className="text-2xl font-bold mb-2">{tier.name}</h3>
                                <div className="text-4xl font-bold mb-4">
                                    £{tier.price}
                                    <span className="text-lg text-white/40 font-normal ml-2">{tier.duration}</span>
                                </div>

                                <ul className="space-y-3 mb-6">
                                    {tier.features.map((feature, i) => (
                                        <li key={i} className="flex items-center gap-2 text-sm text-white/60">
                                            <Check size={16} className="text-green-400 shrink-0" />
                                            {feature}
                                        </li>
                                    ))}
                                </ul>

                                <Link
                                    href={`/contact?category=custom_songs&subject=Order:+${encodeURIComponent(tier.name)}`}
                                    className={`block text-center w-full py-3 rounded-xl font-bold transition-all bg-gradient-to-r ${tier.gradient} text-white hover:scale-[1.02] shadow-lg`}
                                >
                                    Select Package
                                </Link>
                            </motion.div>
                        );
                    })}
                </div>

                {/* The form has been moved entirely to the /contact page for unified processing. */}
            </div>
        </div>
    );
}
