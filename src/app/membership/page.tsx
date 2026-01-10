"use client";

import { Check, Star, Shield, Zap } from 'lucide-react';
import styles from './page.module.css';
import { useAuth } from '@/context/AuthContext';

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
        features: ["Unlock ALL Tracks 🔓", "Early Access to Demos ⏳", "Download Standard MP3s 🎧", "Insider Profile Badge 🛡️"],
        highlight: true,
        action: "Upgrade"
    },
    {
        name: "The VIP",
        price: "£8.99/mo",
        features: ["Full Access to Releasio OS 🎹", "20% Shop Discount 🏷️", "High-Res WAV Downloads 💎", "Priority on Custom Songs ⚡"],
        highlight: false,
        action: "Upgrade"
    }
];

export default function MembershipPage() {
    const { login, user, isPro } = useAuth();

    const handleJoin = (tierName: string) => {
        if (tierName === "The Fan") login('FAN');
        if (tierName === "The Insider") login('INSIDER');
        if (tierName === "The VIP") login('VIP');
    };

    return (
        <div className={`container ${styles.page}`}>
            <div className={styles.header}>
                <h1>The Co-Creation Lab 🧪</h1>
                <p>Don't just listen. Join the team and shape the next hit.</p>
            </div>

            <div className={styles.grid}>
                {tiers.map((tier) => {
                    // Simple logic to show "Current" state
                    const isCurrent = (user?.tier === 'FAN' && tier.name === 'The Fan') ||
                        (user?.tier === 'VIP' && tier.name === 'The VIP') ||
                        (user?.tier === 'INSIDER' && tier.name === 'The Insider');

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
                                onClick={() => handleJoin(tier.name)}
                                className={tier.highlight || tier.name === 'The VIP' ? 'glow-button' : styles.outlineBtn}
                            >
                                {isCurrent ? 'Active' : tier.action}
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
