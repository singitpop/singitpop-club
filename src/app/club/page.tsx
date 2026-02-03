"use client";

import { UserButton, useUser } from "@clerk/nextjs";
import Link from "next/link";
import { motion } from "framer-motion";
import { Play, Lock, Download, Star, Video, Settings, CreditCard, ChevronRight, Check, MessageSquare, Heart, MessageCircle, Image as ImageIcon, Music } from 'lucide-react';
import { useState, useEffect } from "react";

export default function ClubPage() {
    const { user, isLoaded } = useUser();
    const [updates, setUpdates] = useState<any[]>([]);
    const [exclusiveAlbums, setExclusiveAlbums] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        async function fetchData() {
            try {
                const res = await fetch('/api/club-content');
                if (res.ok) {
                    const data = await res.json();
                    setUpdates(data.updates || []);
                    setExclusiveAlbums(data.albums || []);
                }
            } catch (error) {
                console.error("Failed to fetch club content", error);
            } finally {
                setLoading(false);
            }
        }
        fetchData();
    }, []);

    if (!isLoaded) return null;

    if (loading) {
        return (
            <div className="min-h-screen bg-black text-white flex items-center justify-center">
                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-pink-500"></div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-black text-white pt-24 pb-16 px-4">

            {/* Header / Welcome */}
            <div className="max-w-6xl mx-auto mb-16">
                <div className="flex flex-col md:flex-row justify-between items-end gap-6 mb-8 border-b border-white/10 pb-8">
                    <motion.div
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.5 }}
                    >
                        <span className="inline-block px-3 py-1 bg-gradient-to-r from-pink-500 to-purple-500 rounded-full text-xs font-bold mb-4">
                            VIP MEMBER
                        </span>
                        <h1 className="text-4xl md:text-5xl font-bold mb-2">
                            Welcome back, {user?.firstName}
                        </h1>
                        <p className="text-white/60">
                            Your exclusive access to unreleased albums.
                        </p>
                    </motion.div>

                    <div className="flex items-center gap-4">
                        <div className="bg-white/5 px-4 py-2 rounded-xl border border-white/10 flex items-center gap-3">
                            <span className="text-sm font-medium">Account</span>
                            <UserButton afterSignOutUrl="/" appearance={{
                                elements: {
                                    avatarBox: "w-8 h-8 ring-2 ring-white/20"
                                }
                            }} />
                        </div>
                    </div>
                </div>
            </div>

            <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-3 gap-8">

                {/* Main Content Column (2/3) */}
                <div className="lg:col-span-2 space-y-8">

                    {/* Exclusive Albums Section */}
                    <div className="space-y-6">
                        <div className="flex items-center gap-3 mb-4">
                            <Lock className="text-pink-400" size={24} />
                            <h2 className="text-2xl font-bold">Unpublished Albums</h2>
                        </div>

                        {exclusiveAlbums.length > 0 ? (
                            <div className="grid gap-6">
                                {exclusiveAlbums.map((album, index) => (
                                    <motion.div
                                        key={album.id}
                                        initial={{ opacity: 0, y: 20 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        transition={{ delay: index * 0.1 }}
                                        className="bg-white/5 rounded-3xl p-6 border border-white/10 hover:border-pink-500/50 transition-all group cursor-pointer"
                                    >
                                        <div className="flex flex-col md:flex-row gap-6 items-center md:items-start">
                                            {/* Cover Art */}
                                            <div className="relative w-40 h-40 shrink-0 shadow-2xl rounded-2xl overflow-hidden group-hover:scale-105 transition-transform duration-500 bg-white/5">
                                                {album.coverArt ? (
                                                    <img
                                                        src={album.coverArt}
                                                        alt={album.title}
                                                        className="w-full h-full object-cover"
                                                    />
                                                ) : (
                                                    <div className="w-full h-full flex items-center justify-center">
                                                        <Music size={40} className="text-white/20" />
                                                    </div>
                                                )}
                                                <div className="absolute inset-0 bg-black/40 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                                                    <Play size={32} className="fill-white" />
                                                </div>
                                            </div>

                                            {/* Album Info */}
                                            <div className="flex-1 text-center md:text-left">
                                                <div className="flex items-center justify-center md:justify-start gap-2 mb-2">
                                                    <span className="px-3 py-1 bg-purple-500/20 text-purple-300 text-xs font-bold rounded-full border border-purple-500/20">
                                                        EXCLUSIVE PREVIEW
                                                    </span>
                                                    <span className="text-white/40 text-xs font-bold">{album.year}</span>
                                                </div>
                                                <h3 className="text-2xl font-bold mb-2">{album.title}</h3>
                                                <p className="text-white/60 text-sm mb-6 line-clamp-2">
                                                    {album.genre?.join(', ')} • {album.tracks?.length || 0} Tracks
                                                </p>

                                                <button
                                                    className="inline-flex items-center gap-2 px-6 py-3 bg-white text-black rounded-full font-bold hover:bg-pink-500 hover:text-white transition-colors"
                                                >
                                                    <Play size={18} className="fill-current" />
                                                    Listen Now
                                                </button>
                                            </div>
                                        </div>
                                    </motion.div>
                                ))}
                            </div>
                        ) : (
                            <div className="bg-white/5 rounded-3xl p-12 text-center border dashed border-white/10">
                                <Lock size={48} className="mx-auto mb-4 text-white/20" />
                                <h3 className="text-xl font-bold text-white/40">No exclusive content available right now</h3>
                                <p className="text-white/20 mt-2">Check back soon for early access releases.</p>
                            </div>
                        )}
                    </div>

                    {/* VIP Updates Section */}
                    <div className="space-y-6 pt-8 border-t border-white/10">
                        <div className="flex items-center gap-3 mb-4">
                            <MessageSquare className="text-purple-400" size={24} />
                            <h2 className="text-2xl font-bold">Exclusive Updates</h2>
                        </div>

                        {updates.length > 0 ? (
                            <div className="space-y-6">
                                {updates.map((update) => (
                                    <motion.div
                                        key={update.id}
                                        initial={{ opacity: 0, y: 10 }}
                                        whileInView={{ opacity: 1, y: 0 }}
                                        viewport={{ once: true }}
                                        className="bg-white/5 rounded-2xl p-6 border border-white/10"
                                    >
                                        <div className="flex items-center gap-3 mb-4">
                                            <div className="w-8 h-8 rounded-full bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center text-xs font-bold">
                                                {update.author ? update.author[0] : 'G'}
                                            </div>
                                            <div>
                                                <h4 className="font-bold text-sm">{update.title}</h4>
                                                <span className="text-white/40 text-xs">{update.date} • by {update.author}</span>
                                            </div>
                                            {update.image && (
                                                <span className="ml-auto text-xs px-2 py-1 bg-white/10 rounded-full flex items-center gap-1">
                                                    <ImageIcon size={10} /> Photo attached
                                                </span>
                                            )}
                                        </div>

                                        <p className="text-white/80 text-sm leading-relaxed mb-4 whitespace-pre-wrap">
                                            {update.content}
                                        </p>

                                        <div className="flex items-center gap-4 text-white/40 text-xs">
                                            <button className="flex items-center gap-1 hover:text-pink-400 transition-colors">
                                                <Heart size={14} /> {update.likes || 0}
                                            </button>
                                            <button className="flex items-center gap-1 hover:text-white transition-colors">
                                                <MessageCircle size={14} /> Comment
                                            </button>
                                        </div>
                                    </motion.div>
                                ))}
                            </div>
                        ) : (
                            <div className="p-8 text-white/40 text-center bg-white/5 rounded-2xl">
                                No updates yet.
                            </div>
                        )}
                    </div>

                </div>


                {/* Sidebar Column (1/3) */}
                <div className="space-y-6">

                    {/* Membership Status */}
                    <motion.div
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.3 }}
                        className="bg-gradient-to-br from-purple-900/40 to-blue-900/40 backdrop-blur-xl rounded-3xl p-6 border border-white/10"
                    >
                        <h3 className="text-sm font-bold text-white/60 mb-1">MEMBERSHIP</h3>
                        <p className="text-2xl font-bold mb-4">VIP Tier</p>
                        <div className="space-y-3">
                            <div className="flex items-center gap-3 text-sm text-white/80">
                                <CheckIcon /> All Access Pass
                            </div>
                            <div className="flex items-center gap-3 text-sm text-white/80">
                                <CheckIcon /> 15% Merch Discount
                            </div>
                            <div className="flex items-center gap-3 text-sm text-white/80">
                                <CheckIcon /> Early Ticket Access
                            </div>
                        </div>
                        <button className="mt-6 w-full py-3 bg-white/10 hover:bg-white/20 rounded-xl font-semibold text-sm transition-colors">
                            Manage Subscription
                        </button>
                    </motion.div>

                    {/* Quick Links */}
                    <motion.div
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.4 }}
                        className="bg-white/5 rounded-3xl p-6 border border-white/10"
                    >
                        <h3 className="text-lg font-bold mb-4">Quick Links</h3>
                        <div className="space-y-2">
                            <Link href="/shop" className="flex items-center justify-between p-3 rounded-xl hover:bg-white/5 transition-colors group">
                                <span className="flex items-center gap-3 text-sm">
                                    <CreditCard size={16} className="text-white/60" /> Member Shop
                                </span>
                                <ChevronRight size={16} className="text-white/20 group-hover:text-white/60" />
                            </Link>
                            <Link href="/club/account" className="flex items-center justify-between p-3 rounded-xl hover:bg-white/5 transition-colors group">
                                <span className="flex items-center gap-3 text-sm">
                                    <Settings size={16} className="text-white/60" /> Settings
                                </span>
                                <ChevronRight size={16} className="text-white/20 group-hover:text-white/60" />
                            </Link>
                        </div>
                    </motion.div>

                </div>
            </div>
        </div>
    );
}

function CheckIcon() {
    return (
        <div className="w-5 h-5 rounded-full bg-green-500/20 flex items-center justify-center">
            <Check size={12} className="text-green-400" />
        </div>
    );
}


