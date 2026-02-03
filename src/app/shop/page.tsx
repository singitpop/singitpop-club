"use client";

import { useState, useEffect } from "react";
import { ShoppingBag, Lock, ChevronRight, Check, ExternalLink, Music, Heart, Sparkles, Smartphone, Disc, ArrowRight } from 'lucide-react';
import VinylCard from '@/components/shop/VinylCard';
import { useAuth } from '@/context/AuthContext';
import { motion, AnimatePresence } from 'framer-motion';

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



import { MERCH_PRODUCTS } from "@/data/shopProducts";
import { getArtworkForTrack } from "@/utils/artworkMatcher";


export default function ShopPage() {
    const { login, user } = useAuth();
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

    const [ringtones, setRingtones] = useState<any[]>([]);
    const [loadingRingtones, setLoadingRingtones] = useState(true);

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
            {/* Hero */}
            <div className="max-w-6xl mx-auto mb-16 =text-center">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6 }}
                >
                    <h1 className="text-6xl md:text-7xl font-bold mb-6 bg-gradient-to-r from-pink-400 via-purple-400 to-cyan-400 bg-clip-text text-transparent">
                        Shop
                    </h1>
                    <p className="text-xl text-white/60 max-w-2xl mx-auto">
                        Custom songs, ringtones, vinyl, and exclusive merch
                    </p>
                </motion.div>
            </div>

            {/* Custom Songs Section */}
            <div className="max-w-6xl mx-auto mb-24">
                <div className="text-center mb-12">
                    <h2 className="text-4xl font-bold mb-4">Custom Songs</h2>
                    <p className="text-white/60">Let me write a song just for you or someone special</p>
                </div>

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
                                    ${tier.price}
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

            {/* Ringtones Section */}
            <div className="max-w-6xl mx-auto mb-24">
                <div className="text-center mb-12">
                    <h2 className="text-4xl font-bold mb-4">Ringtones</h2>
                    <p className="text-white/60">Exclusive snippets from your favorite tracks</p>
                </div>

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
                        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4 mb-8">
                            {ringtones.slice(0, 6).map((ringtone, index) => {
                                const artwork = getArtworkForTrack(ringtone.title);
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
                                                    (e.target as HTMLImageElement).src = "/images/defaults/vinyl_default.png";
                                                }}
                                            />
                                            {/* Icon overlay */}
                                            <div className="absolute top-2 right-2 bg-black/60 backdrop-blur-md p-1.5 rounded-full text-white/80">
                                                <Smartphone size={12} />
                                            </div>
                                        </div>

                                        <h3 className="font-bold text-sm mb-1 truncate" title={ringtone.title}>{ringtone.title}</h3>
                                        <div className="flex items-center justify-between">
                                            <span className="text-sm font-bold text-pink-400">${ringtone.price.toFixed(2)}</span>
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

                        {ringtones.length > 6 && (
                            <div className="text-center">
                                <a
                                    href="/shop/ringtones"
                                    className="inline-flex items-center gap-2 text-white/60 hover:text-white transition-colors border-b border-transparent hover:border-white pb-0.5"
                                >
                                    View All Ringtones
                                    <ArrowRight size={16} />
                                </a>
                            </div>
                        )}
                    </>
                )}
            </div>



            {/* Merch Section */}
            <div className="max-w-6xl mx-auto">
                <div className="text-center mb-12">
                    <h2 className="text-4xl font-bold mb-4">Merch</h2>
                    <p className="text-white/60">Official apparel and accessories</p>
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
                                        ${product.price.toFixed(2)}
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
