"use client";

import { Check, Star, Shield, Zap, ArrowLeft } from 'lucide-react';
import styles from './page.module.css';
import { useAuth } from '@/context/AuthContext';
import { useRouter } from 'next/navigation';
import { useState } from 'react';

const tiers = [
    {
        name: "The Fan",
        price: "Free",
        features: [
            "Vote on Next Single 🗳️",
            "Stream Current Single 🎵",
            "30s Previews of All Tracks ⏱️",
            "Access to Merch Shop 🛍️"
        ],
        highlight: false,
        action: "Join"
    },
    {
        name: "Premium Club",
        price: "£3.99/mo",
        features: [
            "Everything in Fan",
            "Full Current Release Catalog 🔓",
            "Create 10 Mixtapes / Month 🎧",
            "Standard Quality Streaming 📻",
            "10% Discount in Shop 🏷️"
        ],
        highlight: false,
        action: "Upgrade"
    },
    {
        name: "VIP Membership",
        price: "£4.99/mo",
        features: [
            "Everything in Premium Club",
            "Lossless WAV & MP3 Downloads 💎",
            "Exclusive Artbooks & Lyric Pages 📚",
            "Ringtones & Digital Brochures 🔔",
            "Early Access to Future Releases 🚀",
            "20% Discount in Shop 🏷️"
        ],
        highlight: true,
        action: "Upgrade"
    },
    {
        name: "Lifetime Premium",
        price: "£79",
        features: [
            "One-time payment 💸",
            "Forever VIP Access ♾️",
            "Special 'Lifetime' Badge 🏅",
            "All Future Perks Included 🚀",
            "Maximum Priority Support ⚡"
        ],
        highlight: true,
        action: "Buy Once"
    }
];

export default function MembershipPage() {
    const { login, user, isPro } = useAuth();
    const router = useRouter();
    const [loadingTier, setLoadingTier] = useState<string | null>(null);

    const handleCheckout = async (priceId: string, tierName: string) => {
        if (!user) return router.push('/sign-in');
        setLoadingTier(tierName);

        try {
            const isLifetime = tierName === "Lifetime Premium";
            const res = await fetch('/api/checkout', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    priceId,
                    mode: isLifetime ? 'payment' : 'subscription'
                })
            });
            const data = await res.json();
            if (data.url) {
                window.location.href = data.url;
            } else {
                console.error("No URL returned");
                setLoadingTier(null);
            }
        } catch (err) {
            console.error(err);
            setLoadingTier(null);
            alert("Checkout failed. Please try again.");
        }
    }

    const handleJoin = (tierName: string) => {
        if (tierName === "The Fan") {
            router.push('/club');
            return;
        }

        if (tierName === "Premium Club") {
            const priceId = process.env.NEXT_PUBLIC_STRIPE_PRICE_INSIDER || process.env.NEXT_PUBLIC_PRICE_INSIDER || '';
            handleCheckout(priceId, tierName);
        }
        if (tierName === "VIP Membership") {
            const priceId = process.env.NEXT_PUBLIC_STRIPE_PRICE_VIP || process.env.NEXT_PUBLIC_PRICE_VIP || '';
            handleCheckout(priceId, tierName);
        }
        if (tierName === "Lifetime Premium") {
            const priceId = process.env.NEXT_PUBLIC_STRIPE_PRICE_LIFETIME || '';
            handleCheckout(priceId, tierName);
        }
    };

    return (
        <div className={`container ${styles.page}`}>
            <button onClick={() => router.back()} className={styles.backBtn}>
                <ArrowLeft size={20} /> Back
            </button>

            <div className={styles.header}>
                <h1>Unlock Full Access 🔓</h1>
                <p>Support the music and unlock exclusive access.</p>
            </div>

            <div className={styles.grid}>
                {tiers.map((tier) => {
                    // Simple logic to show "Current" state
                    const isCurrent = (user?.tier === 'FAN' && tier.name === 'The Fan') ||
                        (user?.tier === 'INSIDER' && tier.name === 'Premium Club') ||
                        (user?.tier === 'VIP' && tier.name === 'VIP Membership') ||
                        (user?.tier === 'LIFETIME' && tier.name === 'Lifetime Premium');

                    const isLoading = loadingTier === tier.name;

                    return (
                        <div key={tier.name} className={`${styles.card} ${tier.highlight ? styles.highlight : ''}`} style={{ borderColor: isCurrent ? 'var(--primary)' : undefined }}>
                            {isCurrent && <div className={styles.currentBadge}>CURRENT PLAN</div>}
                            <h3 className={styles.tierName}>{tier.name}</h3>
                            <div className={styles.price}>{tier.price}</div>
                            <ul className={styles.features}>
                                {tier.features.map(f => (
                                    <li key={f}><Check size={16} className={styles.check} /> {f}</li>
                                ))}
                            </ul>
                            <button
                                onClick={() => !isCurrent && handleJoin(tier.name)}
                                disabled={isCurrent || isLoading}
                                className={tier.highlight ? 'glow-button' : styles.outlineBtn}
                                style={{ opacity: (isCurrent || isLoading) ? 0.7 : 1, cursor: (isCurrent || isLoading) ? 'default' : 'pointer' }}
                            >
                                {isLoading ? 'Processing...' : isCurrent ? 'Active' : tier.action}
                            </button>
                        </div>
                    );
                })}
            </div>

            <div className={styles.perks}>
                <div className={styles.perk}>
                    <Shield className={styles.perkIcon} color="var(--primary)" />
                    <h4>Support the Art</h4>
                    <p>Directly fund next month's GPU compute.</p>
                </div>
                <div className={styles.perk}>
                    <Zap className={styles.perkIcon} color="#ffd700" />
                    <h4>Instant Access</h4>
                    <p>No waiting. Unlock the full catalog immediately.</p>
                </div>
                <div className={styles.perk}>
                    <Star className={styles.perkIcon} color="var(--secondary)" />
                    <h4>Best Quality</h4>
                    <p>Hear the music exactly as the AI rendered it.</p>
                </div>
            </div>
        </div>
    );
}
