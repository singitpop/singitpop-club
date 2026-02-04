"use client";

import styles from './SmartCTA.module.css';


import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Loader2 } from 'lucide-react';
import { useClerk } from '@clerk/nextjs';

export default function SmartCTA() {
    const [loadingTier, setLoadingTier] = useState<string | null>(null);
    const router = useRouter();
    const { openSignUp } = useClerk();

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
                    // Not logged in -> Redirect to Sign Up with a flag? 
                    // For now, simpler to just open sign up
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
        <section className={styles.section}>
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
                        <li>✅ Vote on Next Single</li>
                        <li>✅ Stream Public Singles</li>
                        <li>✅ Newsletter Updates</li>
                    </ul>
                    <button
                        className={styles.outlineBtn}
                        onClick={() => openSignUp()}
                    >
                        Join Free
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
                        <li>✅ <strong>Unlock Full Catalog</strong></li>
                        <li>✅ Stream Full Albums</li>
                        <li>✅ MP3 Downloads</li>
                    </ul>
                    <button
                        className={styles.glowBtn}
                        onClick={() => handleCheckout(process.env.NEXT_PUBLIC_PRICE_INSIDER || '', 'INSIDER')}
                        disabled={loadingTier === 'INSIDER'}
                    >
                        {loadingTier === 'INSIDER' ? <Loader2 className="animate-spin" size={20} /> : 'Go Insider'}
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
                        <li>✅ <strong>Lossless WAV Downloads</strong></li>
                        <li>✅ 20% Shop Discount</li>
                        <li>✅ Exclusive Future Album Content</li>
                    </ul>
                    <button
                        className={styles.outlineBtn}
                        onClick={() => handleCheckout(process.env.NEXT_PUBLIC_PRICE_VIP || '', 'VIP')}
                        disabled={loadingTier === 'VIP'}
                    >
                        {loadingTier === 'VIP' ? <Loader2 className="animate-spin" size={20} /> : 'Get VIP Access'}
                    </button>
                </div>
            </div>
        </section>
    );
}
