"use client";

import { Check, Star, Shield, Zap } from 'lucide-react';
import styles from './page.module.css';
import { useAuth } from '@/context/AuthContext';
import { useRouter } from 'next/navigation';
import { useState } from 'react';

const tiers = [
    {
        name: "The Fan",
        price: "Free",
        features: ["Vote on Next Single 🗳️", "Stream Public Singles 🎵", "Newsletter Updates 📧", "Access to Shop 🛍️"],
        highlight: false,
        action: "Join"
    },
    {
        name: "The Insider",
        price: "£3.99/mo",
        features: ["Unlock ALL Tracks 🔓", "Stream Full Albums 💿", "MP3 Downloads 🎧", "Insider Profile Badge 🛡️"],
        highlight: true,
        action: "Upgrade"
    },
    {
        name: "The VIP",
        price: "£8.99/mo",
        features: ["Everything in Insider ✨", "Lossless WAV Downloads 💎", "20% Shop Discount 🏷️", "Exclusive Future Album Content 🎹"],
        highlight: false,
        action: "Upgrade"
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
            const res = await fetch('/api/checkout', {
                method: 'POST',
                body: JSON.stringify({ priceId })
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

        if (tierName === "The Insider") {
            handleCheckout(process.env.NEXT_PUBLIC_STRIPE_PRICE_INSIDER!, tierName);
        }
        if (tierName === "The VIP") {
            handleCheckout(process.env.NEXT_PUBLIC_STRIPE_PRICE_VIP!, tierName);
        }
    };

    return (
        <div className={`container ${styles.page}`}>
            <div className={styles.header}>
                <h1>Identify Your Status 🆔</h1>
                <p>Support the music and unlock exclusive access.</p>
            </div>

            <div className={styles.grid}>
                {tiers.map((tier) => {
                    // Simple logic to show "Current" state
                    const isCurrent = (user?.tier === 'FAN' && tier.name === 'The Fan') ||
                        (user?.tier === 'VIP' && tier.name === 'The VIP') ||
                        (user?.tier === 'INSIDER' && tier.name === 'The Insider');

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
                                className={tier.highlight || tier.name === 'The VIP' ? 'glow-button' : styles.outlineBtn}
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
