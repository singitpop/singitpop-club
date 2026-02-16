"use client";

import styles from './SmartCTA.module.css';


import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Loader2 } from 'lucide-react';
import { useClerk } from '@clerk/nextjs';
import { useAuth } from '@/context/AuthContext'; // Import Auth

export default function SmartCTA() {
    const { user } = useAuth(); // Get User Tier
    const appRouter = useRouter(); // Standard hook
    const { openSignUp } = useClerk();

    const [loadingTier, setLoadingTier] = useState<string | null>(null);
    // Router and Clerk are already defined above

    // Helper to check tier levels
    const isInsider = user?.tier === 'INSIDER' || user?.tier === 'VIP' || user?.tier === 'LABEL';
    const isVIP = user?.tier === 'VIP' || user?.tier === 'LABEL';

    // Exact tier checks for button display
    const isExactlyInsider = user?.tier === 'INSIDER';
    const isExactlyVIP = user?.tier === 'VIP' || user?.tier === 'LABEL';

    const handleCheckout = async (priceId: string, tierName: string) => {
        setLoadingTier(tierName);
        try {
            const res = await fetch('/api/checkout', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ priceId }),
            });

            if (res.ok) {
                const data = await res.json();
                if (data.url) window.location.href = data.url;
            } else {
                if (res.status === 401) {
                    // Not logged in -> Store intent and redirect to Sign Up
                    localStorage.setItem('intended_tier', tierName); // 'INSIDER' or 'VIP'
                    openSignUp();
                } else {
                    console.error("Checkout failed");
                    alert("Something went wrong. Please try again.");
                }
            }
        } catch (error) {
            console.error(error);
            alert("An error occurred.");
        } finally {
            setLoadingTier(null);
        }
    };

    return (
        <section id="access" className={styles.section}>
            <div className={styles.header}>
                <h2 className={styles.title}>Choose Your Access 🔑</h2>
                <p className={styles.subtitle}>Unlock the full SingIt Pop experience.</p>
            </div>

            <div className={styles.grid}>
                {/* Tier 1: Fan */}
                <div className={styles.card}>
                    <div className={styles.cardHeader}>
                        <img src="/images/icon-tier-fan-neon.png" alt="" className={styles.icon} />
                        <h3>The Fan</h3>
                        <span className={styles.price}>Free</span>
                    </div>
                    <ul className={styles.features}>
                        <li>✅ Vote on Next Single 🗳️</li>
                        <li>✅ Stream Current Single 🎵</li>
                        <li>✅ 30s Previews of All Tracks ⏱️</li>
                        <li>✅ Access to Merch Shop 🛍️</li>
                    </ul>
                    <button
                        className={styles.outlineBtn}
                        onClick={() => openSignUp()}
                        disabled={!!user}
                        style={user?.tier === 'FAN' ? { background: '#222', borderColor: '#444', color: '#888', cursor: 'default' } : (user ? { opacity: 0.5, cursor: 'not-allowed' } : {})}
                    >
                        {user?.tier === 'FAN' ? 'Current Plan' : user ? 'Upgrade Above' : 'Join Free'}
                    </button>
                </div>

                {/* Tier 2: Insider */}
                <div className={styles.card}>
                    <div className={styles.cardHeader}>
                        <img src="/images/icon-tier-premium-neon.png" alt="" className={styles.icon} />
                        <h3>The Insider</h3>
                        <span className={styles.price}>£3.99<small>/mo</small></span>
                    </div>
                    <ul className={styles.features}>
                        <li>✅ <strong>Everything in Fan</strong></li>
                        <li>✅ Full Current Release Catalog 🔓</li>
                        <li>✅ Create 3 Mixtapes / Month 📼</li>
                        <li>✅ Compile Playlists in Fanzone 🎧</li>
                        <li>✅ MP3 Downloads ⬇️</li>
                    </ul>
                    <button
                        className={styles.glowBtn}
                        onClick={() => handleCheckout(process.env.NEXT_PUBLIC_PRICE_INSIDER || '', 'INSIDER')}
                        disabled={loadingTier === 'INSIDER' || isInsider}
                        style={isExactlyInsider ? { background: '#333', cursor: 'default', boxShadow: 'none' } : {}}
                    >
                        {loadingTier === 'INSIDER' ? <Loader2 className="animate-spin" size={20} /> : (isExactlyInsider ? 'Current Plan' : isVIP ? 'Downgrade' : 'Go Insider')}
                    </button>
                </div>

                {/* Tier 3: VIP */}
                <div className={styles.card}>
                    <div className={styles.cardHeader}>
                        <img src="/images/icon-tier-creator-neon.png" alt="" className={styles.icon} />
                        <h3>The VIP</h3>
                        <span className={styles.price}>£8.99<small>/mo</small></span>
                    </div>
                    <ul className={styles.features}>
                        <li>✅ <strong>Everything in Insider</strong></li>
                        <li>✅ <strong>Create 10 Mixtapes / Month</strong> 📼</li>
                        <li>✅ Lossless WAV Downloads 💎</li>
                        <li>✅ 20% Discount in Shop 🏷️</li>
                        <li>✅ Exclusive Radio Stations 📻</li>
                    </ul>
                    <button
                        className={styles.outlineBtn}
                        onClick={() => handleCheckout(process.env.NEXT_PUBLIC_PRICE_VIP || '', 'VIP')}
                        disabled={loadingTier === 'VIP' || isVIP}
                        style={isExactlyVIP ? { background: '#222', borderColor: '#444', color: '#888', cursor: 'default' } : {}}
                    >
                        {loadingTier === 'VIP' ? <Loader2 className="animate-spin" size={20} /> : (isExactlyVIP ? 'Current Plan' : 'Get VIP Access')}
                    </button>
                </div>
            </div>
        </section>
    );
}
