"use client";

import { useUser } from "@clerk/nextjs";
import { useAuth } from "@/context/AuthContext";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { motion } from "framer-motion";
import { Check, CreditCard, ChevronRight, Settings, Lock, Loader2, Crown } from "lucide-react";
import UserBadge from "@/components/ui/UserBadge";
import { BADGES } from "@/data/badges";

export default function ClubPage() {
    const { user: clerkUser, isLoaded } = useUser();
    const { user: appUser } = useAuth();
    const router = useRouter();
    const [isRedirecting, setIsRedirecting] = useState(false);

    // Auto-checkout logic for intended tier upgrades
    useEffect(() => {
        const intendedTier = localStorage.getItem('intended_tier');
        if (intendedTier && appUser) {
            // If they already have it, clear and ignore
            if (appUser.tier === intendedTier) {
                localStorage.removeItem('intended_tier');
                return;
            }

            // Trigger Checkout
            console.log("Triggering auto-checkout for:", intendedTier);
            localStorage.removeItem('intended_tier'); // Consumed

            let priceId = '';
            if (intendedTier === 'INSIDER') priceId = process.env.NEXT_PUBLIC_PRICE_INSIDER || '';

            if (priceId) {
                setIsRedirecting(true);
                fetch('/api/checkout', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({ priceId }),
                })
                    .then(res => res.json())
                    .then(data => {
                        if (data.url) window.location.href = data.url;
                    })
                    .catch(err => {
                        console.error("Auto-checkout failed", err);
                        setIsRedirecting(false);
                    });
            }
        }
    }, [appUser]);


    if (!isLoaded) return null;

    if (isRedirecting) {
        return (
            <div className="flex h-screen w-full flex-col items-center justify-center bg-black gap-4 text-white">
                <Loader2 className="animate-spin text-purple-500" size={40} />
                <div className="text-xl font-bold">Initializing Checkout...</div>
                <p className="text-white/60">Please wait while we prepare your upgrade.</p>
            </div>
        );
    }

    const tierName = appUser?.tier || 'MEMBER';
    const isVIP = tierName === 'PREMIUM' || tierName === 'LABEL' || tierName === 'ADMIN';

    return (
        <div className="min-h-screen bg-black text-white p-6 pb-24">
            <div className="max-w-4xl mx-auto pt-12">

                {/* Header */}
                <motion.div
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.5 }}
                >
                    <div className="mb-4">
                        <UserBadge tier={tierName} size="md" showLabel={true} />
                    </div>
                    <h1 className="text-4xl md:text-5xl font-bold mb-2">
                        Welcome back, {clerkUser?.firstName || 'Member'}
                    </h1>
                    <p className="text-white/60">
                        {isVIP
                            ? "Your exclusive access to unreleased albums."
                            : "Upgrade to Premium for exclusive access."}
                    </p>
                </motion.div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-12">

                    {/* Membership Status Card */}
                    <motion.div
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.3 }}
                        className="bg-gradient-to-br from-purple-900/40 to-blue-900/40 backdrop-blur-xl rounded-3xl p-6 border border-white/10"
                    >
                        <h3 className="text-sm font-bold text-white/60 mb-1">MEMBERSHIP</h3>
                        <div className="flex items-center gap-3 mb-4">
                            <span className="text-2xl font-bold">Status:</span>
                            <UserBadge tier={tierName} size="lg" showLabel={true} />
                        </div>

                        <div className="space-y-3">
                            {isVIP ? (
                                <>
                                    <div className="flex items-center gap-3 text-sm text-white/80">
                                        <CheckIcon /> All Access Pass
                                    </div>
                                    <div className="flex items-center gap-3 text-sm text-white/80">
                                        <CheckIcon /> 20% Merch Discount
                                    </div>
                                    <div className="flex items-center gap-3 text-sm text-white/80">
                                        <CheckIcon /> Early Ticket Access
                                    </div>
                                </>
                            ) : (
                                <>
                                    <div className="flex items-center gap-3 text-sm text-white/40">
                                        <Lock size={12} /> Exclusive Content (Locked)
                                    </div>
                                    <div className="flex items-center gap-3 text-sm text-white/40">
                                        <Lock size={12} /> Merch Discounts (Locked)
                                    </div>
                                    <Link href="/membership" className="block text-pink-400 text-sm font-bold mt-2 hover:underline">
                                        Upgrade to Unlock Benefits
                                    </Link>
                                </>
                            )}
                        </div>

                        <Link href="/club/account">
                            <button className="mt-6 w-full py-3 bg-white/10 hover:bg-white/20 rounded-xl font-semibold text-sm transition-colors">
                                Manage Subscription
                            </button>
                        </Link>
                    </motion.div>

                    {/* Badge Collection / Progression */}
                    <motion.div
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.4 }}
                        className="bg-black/40 rounded-3xl p-6 border border-white/10"
                    >
                        <h3 className="text-lg font-bold mb-4 flex items-center gap-2">
                            <Crown size={18} className="text-yellow-500" /> Badge Collection
                        </h3>

                        <div className="space-y-6">
                            {/* Render badges for each tier group */}
                            {['PREMIUM'].map((displayTier) => {
                                // Filter badges for this tier
                                const tierBadges = BADGES.filter(b => b.tier === 'INSIDER' || b.tier === 'LIFETIME' || b.tier === 'PREMIUM');
                                const isTierUnlocked = (tierName === 'PREMIUM');

                                return (
                                    <div key={displayTier} className={`relative p-4 rounded-2xl border ${isTierUnlocked ? 'bg-white/5 border-white/10' : 'bg-transparent border-white/5'}`}>
                                        <h4 className="text-xs font-bold uppercase text-white/40 mb-3">{displayTier} Tier</h4>
                                        <div className="grid grid-cols-3 gap-4">
                                            {tierBadges.map(badge => {
                                                const isUnlocked = isTierUnlocked && badge.type === 'IDENTITY';
                                                // Simplified Unlock: Identity is unlocked if Tier is reached.
                                                // Tenure/Action are mocked locked (grayed out) until logic is fully implemented.

                                                return (
                                                    <div key={badge.id} className="flex flex-col items-center gap-2 text-center group">
                                                        <div className={`relative transition-all duration-300 ${!isUnlocked ? 'opacity-30 grayscale blur-[1px] group-hover:blur-0' : 'scale-110 drop-shadow-[0_0_15px_rgba(255,255,255,0.2)]'}`}>
                                                            <UserBadge tier={displayTier} size="lg" badgeId={badge.id} showLabel={false} />
                                                            {!isUnlocked && (
                                                                <div className="absolute inset-0 flex items-center justify-center">
                                                                    <Lock size={12} className="text-white drop-shadow-md" />
                                                                </div>
                                                            )}
                                                        </div>
                                                        <div>
                                                            <div className={`text-[10px] font-bold uppercase ${isUnlocked ? 'text-white' : 'text-white/40'}`}>
                                                                {badge.name}
                                                            </div>
                                                            <div className="text-[9px] text-white/30 leading-tight mt-0.5 px-2">
                                                                {badge.type === 'IDENTITY' ? 'Unlocked' : badge.requirement}
                                                            </div>
                                                        </div>
                                                    </div>
                                                );
                                            })}
                                        </div>
                                    </div>
                                );
                            })}
                        </div>

                        <p className="text-xs text-center text-white/40 mt-6">
                            Badges are accrued automatically as you hit milestones.
                        </p>
                    </motion.div>

                    {/* Quick Links Card */}
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

            <div className="mt-12">
                <ReferralCard />
                <StatsCard />
            </div>
        </div>

    );
}

import SongOracle from "@/components/fans/SongOracle";
import ReferralCard from "@/components/fans/ReferralCard";
import StatsCard from "@/components/fans/StatsCard";

function CheckIcon() {
    return (
        <div className="w-5 h-5 rounded-full bg-green-500/20 flex items-center justify-center">
            <Check size={12} className="text-green-400" />
        </div>
    );
}
