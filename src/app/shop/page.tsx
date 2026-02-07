"use client";

import { useState } from "react";
import { useAuth } from '@/context/AuthContext';
import { motion } from 'framer-motion';
import { ShoppingBag, Lock, ExternalLink, Music, Heart, Sparkles, Smartphone, ArrowRight } from 'lucide-react';
import VinylCard from '@/components/shop/VinylCard';
import { MERCH_PRODUCTS } from "@/data/shopProducts";
import Link from 'next/link';

export default function ShopPage() {
    const { user } = useAuth();

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
                        Official merchandise, vinyl, and exclusive audio experiences.
                    </p>
                </motion.div>
            </div>

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
            </div>

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
