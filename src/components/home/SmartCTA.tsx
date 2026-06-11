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
    const isPremium = user?.tier === 'PREMIUM' || user?.tier === 'LABEL' || user?.tier === 'ADMIN';

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
                    localStorage.setItem('intended_tier', tierName); // 'PREMIUM' or 'Lifetime Premium'
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
                <p className={styles.subtitle}>Unlock the full SingitPop Records experience.</p>
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

                {/* Tier 2: Premium Club OR Artists Catalog Upgrade */}
                {user?.rykerTier === 'PREMIUM' && !isPremium ? (
                    <div className={`${styles.card} ${styles.featured}`}>
                        <div className={styles.cardHeader}>
                            <img src="/images/icon-tier-premium-neon.png" alt="" className={styles.icon} />
                            <h3>Artists Catalog</h3>
                            <span className={styles.price}>+£1.00<small>/mo</small></span>
                        </div>
                        <ul className={styles.features}>
                            <li>✅ <strong>Ryker Member Discount perk!</strong></li>
                            <li>✅ Complete SingitPop Records Artists Catalog 🔓</li>
                            <li>✅ Create 10 Mixtapes / Month 🎧</li>
                            <li>✅ Lossless WAV & MP3 Downloads 💎</li>
                            <li>✅ Exclusive Radio Stations 📻</li>
                            <li>✅ 20% Discount in Shop 🏷️</li>
                        </ul>
                        <button
                            className={styles.glowBtn}
                            onClick={() => handleCheckout(process.env.NEXT_PUBLIC_STRIPE_PRICE_UPGRADE || 'price_1TbfXMGBBlYIBJloUpgrade', 'PREMIUM')}
                            disabled={loadingTier === 'PREMIUM'}
                        >
                            {loadingTier === 'PREMIUM' ? (
                                <Loader2 className="animate-spin" size={20} />
                            ) : (
                                'Upgrade Now'
                            )}
                        </button>
                    </div>
                ) : (
                    <div className={styles.card}>
                        <div className={styles.cardHeader}>
                            <img src="/images/icon-tier-premium-neon.png" alt="" className={styles.icon} />
                            <h3>Premium Club</h3>
                            <span className={styles.price}>£3.99<small>/mo</small></span>
                        </div>
                        <ul className={styles.features}>
                            <li>✅ <strong>Everything in Fan</strong></li>
                            <li>✅ Full Current Release Catalog 🔓</li>
                            <li>✅ Create 10 Mixtapes / Month 🎧</li>
                            <li>✅ Lossless WAV & MP3 Downloads 💎</li>
                            <li>✅ Exclusive Radio Stations 📻</li>
                            <li>✅ 20% Discount in Shop 🏷️</li>
                        </ul>
                        <button
                            className={styles.glowBtn}
                            onClick={() => handleCheckout(process.env.NEXT_PUBLIC_PRICE_INSIDER || process.env.NEXT_PUBLIC_STRIPE_PRICE_INSIDER || '', 'PREMIUM')}
                            disabled={loadingTier === 'PREMIUM' || isPremium}
                            style={isPremium ? { background: '#333', cursor: 'default', boxShadow: 'none' } : {}}
                        >
                            {loadingTier === 'PREMIUM' ? (
                                <Loader2 className="animate-spin" size={20} />
                            ) : user?.tier === 'PREMIUM' ? (
                                'Current Plan'
                            ) : (
                                'Go Premium'
                            )}
                        </button>
                    </div>
                )}

                {/* Tier 3: Lifetime Premium */}
                <div className={`${styles.card} ${styles.featured}`}>
                    <div className={styles.cardHeader}>
                        <img 
                            src="/images/icon-tier-premium-neon.png" 
                            alt="" 
                            className={`${styles.icon} ${styles.goldIcon}`} 
                        />
                        <h3>Lifetime Premium</h3>
                        <span className={styles.price}>£79</span>
                    </div>
                    <ul className={styles.features}>
                        <li>✅ <strong>One-time payment 💸</strong></li>
                        <li>✅ <strong>Forever Premium Access ♾️</strong></li>
                        <li>✅ Special 'Lifetime' Badge 🏅</li>
                        <li>✅ All Future Perks Included 🚀</li>
                        <li>✅ Maximum Priority Support ⚡</li>
                    </ul>
                    <button
                        className={styles.glowBtn}
                        onClick={() => handleCheckout(process.env.NEXT_PUBLIC_PRICE_LIFETIME || process.env.NEXT_PUBLIC_STRIPE_PRICE_LIFETIME || '', 'Lifetime Premium')}
                        disabled={loadingTier === 'Lifetime Premium'}
                    >
                        {loadingTier === 'Lifetime Premium' ? (
                            <Loader2 className="animate-spin" size={20} />
                        ) : (
                            'Get Lifetime Access'
                        )}
                    </button>
                </div>
            </div>
        </section>
    );
}
