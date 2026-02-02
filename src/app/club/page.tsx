"use client";

import { UserButton, useUser } from "@clerk/nextjs";
import Link from "next/link";
import { motion } from "framer-motion";
import { Play, Lock, Download, Star, Video, Settings, CreditCard, ChevronRight, Check } from 'lucide-react';

// Placeholder data for exclusive albums
const albums = [
    {
        id: "album-1",
        title: "Echoes of Tomorrow",
        artist: "Aurora Bloom",
        year: 2024,
        genre: ["Electronic", "Ambient"],
        coverArt: "https://images.unsplash.com/photo-1518609426025-0106c8557937?q=80&w=2940&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
        tracks: [
            { id: 1, title: "Starlight Serenade", duration: "3:45" },
            { id: 2, title: "Whispering Winds", duration: "4:10" },
            { id: 3, title: "Cosmic Dance", duration: "3:20" },
        ],
        exclusive: true,
    },
    {
        id: "album-2",
        title: "Midnight Reverie",
        artist: "The Lunar Collective",
        year: 2024,
        genre: ["Indie Pop", "Dream Pop"],
        coverArt: "https://images.unsplash.com/photo-1517486804529-06232777b218?q=80&w=2940&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
        tracks: [
            { id: 1, title: "Neon Glow", duration: "3:15" },
            { id: 2, title: "Silent City", duration: "4:00" },
            { id: 3, title: "Lost in Translation", duration: "3:50" },
        ],
        exclusive: true,
    },
    {
        id: "album-3",
        title: "Urban Pulse",
        artist: "Rhythm Architects",
        year: 2023,
        genre: ["Hip Hop", "Lo-Fi"],
        coverArt: "https://images.unsplash.com/photo-1519706039-da1b7639f795?q=80&w=2940&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
        tracks: [
            { id: 1, title: "Street Lights", duration: "2:55" },
            { id: 2, title: "Concrete Jungle", duration: "3:30" },
        ],
        exclusive: false, // Not exclusive, won't be shown
    },
];

export default function ClubPage() {
    const { user, isLoaded } = useUser();

    if (!isLoaded) return null;

    // Filter exclusive albums
    const exclusiveAlbums = albums.filter(album => album.exclusive);

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
                                            <div className="relative w-40 h-40 shrink-0 shadow-2xl rounded-2xl overflow-hidden group-hover:scale-105 transition-transform duration-500">
                                                <img
                                                    src={album.coverArt || "/images/album-placeholder.jpg"}
                                                    alt={album.title}
                                                    className="w-full h-full object-cover"
                                                />
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

                                                <Link
                                                    href={`/music/album/${album.id}`}
                                                    className="inline-flex items-center gap-2 px-6 py-3 bg-white text-black rounded-full font-bold hover:bg-pink-500 hover:text-white transition-colors"
                                                >
                                                    <Play size={18} className="fill-current" />
                                                    Listen Now
                                                </Link>
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


