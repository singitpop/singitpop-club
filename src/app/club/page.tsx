"use client";

import { UserButton, useUser } from "@clerk/nextjs";
import Link from "next/link";
import { motion } from "framer-motion";
import { Play, Lock, Download, Star, Video, Settings, CreditCard, ChevronRight, Check } from 'lucide-react';

export default function ClubPage() {
    const { user, isLoaded } = useUser();

    if (!isLoaded) return null;

    // Placeholder data for exclusive content
    const EXCLUSIVE_TRACKS = [
        { id: 1, title: "Neon Dreams (Acoustic Demo)", duration: "3:42", date: "2 days ago" },
        { id: 2, title: "Midnight Voice Memo #4", duration: "1:15", date: "1 week ago" },
        { id: 3, title: "Writing 'Echoes' (Studio Session)", duration: "4:20", date: "2 weeks ago" }
    ];

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
                            Here is your exclusive content for this week.
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

                    {/* Exclusive Demos Player */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.1 }}
                        className="bg-gradient-to-b from-white/10 to-white/5 backdrop-blur-xl rounded-3xl p-8 border border-white/10"
                    >
                        <div className="flex items-center gap-3 mb-6">
                            <Star className="text-yellow-400 fill-yellow-400" size={24} />
                            <h2 className="text-2xl font-bold">Secret Demos</h2>
                        </div>

                        <div className="space-y-4">
                            {EXCLUSIVE_TRACKS.map((track, index) => (
                                <div key={track.id} className="group flex items-center justify-between p-4 bg-black/20 hover:bg-white/10 rounded-xl transition-all cursor-pointer border border-transparent hover:border-white/5">
                                    <div className="flex items-center gap-4">
                                        <div className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center group-hover:bg-pink-500 transition-colors">
                                            <Play size={16} className="fill-current ml-1" />
                                        </div>
                                        <div>
                                            <h3 className="font-bold">{track.title}</h3>
                                            <p className="text-xs text-white/40">{track.date}</p>
                                        </div>
                                    </div>
                                    <span className="text-sm font-mono text-white/40">{track.duration}</span>
                                </div>
                            ))}
                        </div>
                    </motion.div>

                    {/* Exclusive Videos */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.2 }}
                        className="bg-white/5 rounded-3xl p-8 border border-white/10"
                    >
                        <div className="flex items-center gap-3 mb-6">
                            <Video className="text-pink-400" size={24} />
                            <h2 className="text-2xl font-bold">Behind The Scenes</h2>
                        </div>

                        <div className="aspect-video bg-black/40 rounded-2xl flex items-center justify-center border border-white/10 relative overflow-hidden group cursor-pointer">
                            {/* Placeholder Video Overlay */}
                            <div className="absolute inset-0 flex items-center justify-center bg-black/40 group-hover:bg-black/20 transition-all">
                                <div className="w-16 h-16 rounded-full bg-white/20 backdrop-blur-md flex items-center justify-center border border-white/30 group-hover:scale-110 transition-transform">
                                    <Play size={32} className="fill-white" />
                                </div>
                            </div>
                            <p className="absolute bottom-4 left-4 font-bold text-shadow">Studio Vlog: Making of "Neon"</p>
                        </div>
                    </motion.div>

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

import { Play, Lock, Download, Star, Video, Settings, CreditCard, ChevronRight, Check } from 'lucide-react';

