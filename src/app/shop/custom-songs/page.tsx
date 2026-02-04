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
    const [selectedTier, setSelectedTier] = useState<string | null>(null);
    const [customSongForm, setCustomSongForm] = useState({
        name: "",
        email: "",
        occasion: "",
        details: ""
    });

    const handleCustomSongSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        // TODO: Submit to API
        console.log("Custom song order:", { tier: selectedTier, ...customSongForm });
        alert("Order submitted! We'll contact you within 24 hours.");
        setCustomSongForm({ name: "", email: "", occasion: "", details: "" });
        setSelectedTier(null);
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
                                onClick={() => setSelectedTier(tier.id)}
                                className={`relative bg-gradient-to-b from-white/10 to-white/5 backdrop-blur-xl rounded-3xl p-8 border cursor-pointer transition-all ${selectedTier === tier.id
                                    ? "border-pink-500 shadow-2xl shadow-pink-500/20 scale-105"
                                    : "border-white/10 hover:border-white/30"
                                    }`}
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

                                <button
                                    className={`w-full py-3 rounded-xl font-semibold transition-all ${selectedTier === tier.id
                                        ? `bg-gradient-to-r ${tier.gradient} text-white`
                                        : "bg-white/10 hover:bg-white/20"
                                        }`}
                                >
                                    {selectedTier === tier.id ? "Selected" : "Select"}
                                </button>
                            </motion.div>
                        );
                    })}
                </div>

                {/* Order Form */}
                <AnimatePresence>
                    {selectedTier && (
                        <motion.div
                            initial={{ opacity: 0, height: 0 }}
                            animate={{ opacity: 1, height: "auto" }}
                            exit={{ opacity: 0, height: 0 }}
                            className="bg-gradient-to-b from-white/10 to-white/5 backdrop-blur-xl rounded-3xl p-8 border border-pink-500/20"
                        >
                            <h3 className="text-2xl font-bold mb-6">Order Details</h3>
                            <form onSubmit={handleCustomSongSubmit} className="space-y-4">
                                <div className="grid md:grid-cols-2 gap-4">
                                    <div>
                                        <label className="block text-sm font-semibold mb-2">Your Name</label>
                                        <input
                                            type="text"
                                            required
                                            value={customSongForm.name}
                                            onChange={(e) => setCustomSongForm({ ...customSongForm, name: e.target.value })}
                                            className="w-full px-4 py-3 bg-black/40 border border-white/10 rounded-xl text-white"
                                            placeholder="John Doe"
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-sm font-semibold mb-2">Email</label>
                                        <input
                                            type="email"
                                            required
                                            value={customSongForm.email}
                                            onChange={(e) => setCustomSongForm({ ...customSongForm, email: e.target.value })}
                                            className="w-full px-4 py-3 bg-black/40 border border-white/10 rounded-xl text-white"
                                            placeholder="john@example.com"
                                        />
                                    </div>
                                </div>
                                <div>
                                    <label className="block text-sm font-semibold mb-2">Occasion</label>
                                    <input
                                        type="text"
                                        required
                                        value={customSongForm.occasion}
                                        onChange={(e) => setCustomSongForm({ ...customSongForm, occasion: e.target.value })}
                                        className="w-full px-4 py-3 bg-black/40 border border-white/10 rounded-xl text-white"
                                        placeholder="e.g., Wedding, Birthday, Anniversary"
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-semibold mb-2">Tell me about your vision</label>
                                    <textarea
                                        required
                                        rows={5}
                                        value={customSongForm.details}
                                        onChange={(e) => setCustomSongForm({ ...customSongForm, details: e.target.value })}
                                        className="w-full px-4 py-3 bg-black/40 border border-white/10 rounded-xl text-white resize-none"
                                        placeholder="Share details about the person, story, mood, or any specific lyrics you'd like included..."
                                    />
                                </div>
                                <button
                                    type="submit"
                                    className="w-full py-4 bg-gradient-to-r from-pink-500 to-purple-500 hover:from-pink-600 hover:to-purple-600 rounded-xl font-bold text-lg flex items-center justify-center gap-2 transition-all shadow-lg shadow-pink-500/20"
                                >
                                    Submit Order
                                    <ArrowRight size={20} />
                                </button>
                            </form>
                        </motion.div>
                    )}
                </AnimatePresence>
            </div>
        </div>
    );
}
