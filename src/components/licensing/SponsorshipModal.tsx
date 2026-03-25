'use client';

import React, { useState } from 'react';
import styles from './SponsorshipModal.module.css';

interface SponsorshipModalProps {
    track: any;
    onClose: () => void;
}

export default function SponsorshipModal({ track, onClose }: SponsorshipModalProps) {
    const [loadingTier, setLoadingTier] = useState<string | null>(null);

    const handleCheckout = async (tier: string) => {
        try {
            setLoadingTier(tier);
            const res = await fetch('/api/shop/sponsorship/checkout', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    trackId: track.id,
                    trackTitle: track.title,
                    tier: tier // 'gold', 'platinum', or 'diamond'
                })
            });
            const { url, error } = await res.json();
            if (url) window.location.href = url;
            else alert(error || 'Failed to start checkout. Please try again.');
        } catch (err) {
            console.error('Sponsorship checkout error:', err);
            alert('Something went wrong. Please try again.');
        } finally {
            setLoadingTier(null);
        }
    };

    return (
        <div className={styles.overlay}>
            <div className={styles.modal}>
                <button className={styles.closeBtn} onClick={onClose}>×</button>
                
                <div className={styles.header}>
                    <h2 className="text-center">Adopt this Song</h2>
                    <p className="text-center">Track: <strong className="text-white">{track.title}</strong></p>
                </div>

                <div className={styles.tiersContainer}>
                    {/* GOLD TIER */}
                    <div className={`${styles.tierCard} ${styles.gold}`}>
                        <div className={styles.tierHeader}>
                            <div className={styles.tierName}>Gold Sponsor</div>
                            <div className={styles.price}>£10</div>
                        </div>
                        <ul className={styles.features}>
                            <li>Your name permanently listed on the track page</li>
                            <li>Official 'Gold Sponsor' Badge</li>
                            <li>Helps support future SingIt Pop music releases</li>
                        </ul>
                        <button 
                            className={styles.selectBtn} 
                            onClick={() => handleCheckout('gold')}
                            disabled={loadingTier !== null}
                        >
                            {loadingTier === 'gold' ? 'Loading...' : 'Select Gold'}
                        </button>
                    </div>

                    {/* PLATINUM TIER */}
                    <div className={`${styles.tierCard} ${styles.platinum}`}>
                        <div className={styles.tierHeader}>
                            <div className={styles.tierName}>Platinum Sponsor</div>
                            <div className={styles.price}>£25</div>
                        </div>
                        <ul className={styles.features}>
                            <li>Prominent Placement on the track page</li>
                            <li>Official 'Platinum Sponsor' Badge</li>
                            <li>Early access to the next Single Release</li>
                        </ul>
                        <button 
                            className={styles.selectBtn} 
                            onClick={() => handleCheckout('platinum')}
                            disabled={loadingTier !== null}
                        >
                            {loadingTier === 'platinum' ? 'Loading...' : 'Select Platinum'}
                        </button>
                    </div>

                    {/* DIAMOND TIER */}
                    <div className={`${styles.tierCard} ${styles.diamond}`}>
                        <div className={styles.popularBadge}>Best Value</div>
                        <div className={styles.tierHeader}>
                            <div className={styles.tierName}>Diamond Sponsor</div>
                            <div className={styles.price}>£50</div>
                        </div>
                        <ul className={styles.features}>
                            <li>Top Billing as 'Executive Producer'</li>
                            <li>Exclusive 'Diamond Sponsor' Animated Badge</li>
                            <li>Early access to the next Single Release</li>
                            <li>Lifetime 10% Discount Code for Merch</li>
                        </ul>
                        <button 
                            className={styles.selectBtn} 
                            onClick={() => handleCheckout('diamond')}
                            disabled={loadingTier !== null}
                        >
                            {loadingTier === 'diamond' ? 'Loading...' : 'Select Diamond'}
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}
