"use client";

import { ShoppingBag, Lock, ChevronRight, Check, ExternalLink } from 'lucide-react';
import { useAuth } from '@/context/AuthContext';
import styles from './page.module.css';

const products = [
    { id: 2, name: 'Midnight Tour Hoodie (Sustainable)', price: 65.00, imageColor: 'linear-gradient(45deg, #111, #333)', proOnly: false, badge: 'POD UK 🇬🇧' },
    { id: 3, name: 'Echoes Lyric Tee', price: 35.00, imageColor: 'linear-gradient(45deg, #fff, #eee)', proOnly: false, badge: 'POD UK 🇬🇧', link: 'https://teemill.com/store/singitpop' },
    { id: 4, name: 'Pro Member Pin Set', price: 15.00, imageColor: 'linear-gradient(45deg, #FFD700, #FDB931)', proOnly: true, badge: 'Exclusive' },
    { id: 5, name: 'Custom 30s AI Song (Birthday/Event)', price: 25.00, imageColor: 'linear-gradient(45deg, #00C9FF, #92FE9D)', proOnly: false, badge: 'Digital Service 🎹' },
    { id: 6, name: 'SingIt Pop Essentials Vol. 1 (Sample Pack)', price: 14.99, imageColor: 'linear-gradient(45deg, #FF3CAC, #784BA0)', proOnly: false, badge: 'Digital Download 💾' },
];

const tiers = [
    {
        name: "The Fan",
        price: "Free",
        benefits: ["Vote on Next Single 🗳️", "Stream Public Singles 🎵", "Newsletter Updates 📧", "Access to Shop 🛍️"],
        color: "var(--border)",
        button: "Join"
    },
    {
        name: "The Insider",
        price: "3.99",
        benefits: ["Unlock ALL Tracks 🔓", "Early Access to Demos ⏳", "Download Standard MP3s 🎧", "Insider Profile Badge 🛡️"],
        color: "var(--primary)",
        button: "Upgrade",
        current: true // Simulating User State
    },
    {
        name: "The VIP",
        price: "8.99",
        benefits: ["Full Access to Releasio OS 🎹", "20% Shop Discount 🏷️", "High-Res WAV Downloads 💎", "Priority on Custom Songs ⚡"],
        color: "#ffd700",
        button: "Upgrade"
    }
];

export default function ShopPage() {
    const { login, user } = useAuth(); // Auth trigger update

    const handleUpgrade = (tierName: string) => {
        if (tierName === 'The Fan') login('FAN');
        if (tierName === 'The Insider') login('INSIDER');
        if (tierName === 'The VIP') login('VIP');
    };
    return (
        <div className={`container ${styles.page}`}>
            {/* Hero Section */}
            <section className={styles.hero}>
                <div className={styles.heroOverlay}>
                    <span className="glow-text" style={{ fontSize: '0.9rem', letterSpacing: '2px', textTransform: 'uppercase' }}>Limited Drop</span>
                    <h1>Midnight Collection</h1>
                    <p>Exclusive streetwear for the new era.</p>
                </div>
            </section>

            {/* Product Grid */}
            <section>
                <div className={styles.sectionTitle}>
                    <h3>Latest Merch</h3>
                    <ChevronRight color="var(--text-muted)" />
                </div>

                <div className={styles.grid}>
                    {products.map(product => (
                        <div key={product.id} className={styles.productCard}>
                            <div className={styles.imageContainer} style={{ background: product.imageColor }}>
                                {product.proOnly && <span className={`${styles.badge} ${styles.badgePro}`}>Pro 👑</span>}
                                {product.badge && !product.proOnly && <span className={styles.badge}>{product.badge}</span>}
                                {product.badge && product.proOnly && product.badge !== 'Exclusive' && <span className={styles.badge} style={{ top: '3rem' }}>{product.badge}</span>}
                            </div>
                            <div className={styles.info}>
                                <h3>{product.name}</h3>
                                <div className={styles.priceRow}>
                                    <span className={styles.price}>£{product.price.toFixed(2)}</span>
                                    {product.link ? (
                                        <a href={product.link} target="_blank" rel="noopener noreferrer" className="icon-button">
                                            <ExternalLink size={18} />
                                        </a>
                                    ) : (
                                        <button className="icon-button">
                                            <ShoppingBag size={18} />
                                        </button>
                                    )}
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </section>

            {/* Membership Tiers */}
            <section className={styles.membershipSection} id="membership">
                <div style={{ textAlign: 'center', marginBottom: '3rem' }}>
                    <h2>The Co-Creation Lab</h2>
                    <p style={{ color: 'var(--text-muted)' }}>Join the team. Shape the next hit.</p>
                </div>

                <div className={styles.tiersGrid}>
                    {tiers.map(tier => {
                        const isCurrent = (user?.tier === 'FAN' && tier.name === 'The Fan') ||
                            (user?.tier === 'INSIDER' && tier.name === 'The Insider') ||
                            (user?.tier === 'VIP' && tier.name === 'The VIP');

                        return (
                            <div key={tier.name} className="glass-panel" style={{ padding: '2rem', display: 'flex', flexDirection: 'column', border: isCurrent ? '1px solid var(--primary)' : undefined }}>
                                {isCurrent && <span style={{ alignSelf: 'center', background: 'var(--primary)', padding: '0.2rem 0.8rem', borderRadius: '20px', fontSize: '0.7rem', marginBottom: '1rem' }}>CURRENT PLAN</span>}
                                <h3 style={{ fontSize: '1.5rem', marginBottom: '0.5rem', color: tier.name === 'Executive Producer' ? '#ffd700' : 'white' }}>{tier.name}</h3>
                                £{tier.price}<span style={{ fontSize: '1rem', color: 'var(--text-muted)', fontWeight: 400 }}>/mo</span>

                                <ul style={{ flex: 1, marginBottom: '2rem', display: 'flex', flexDirection: 'column', gap: '0.8rem' }}>
                                    {tier.benefits.map(benefit => (
                                        <li key={benefit} style={{ display: 'flex', gap: '0.5rem', fontSize: '0.9rem', color: 'var(--text-muted)' }}>
                                            <Check size={16} color="var(--primary)" />
                                            {benefit}
                                        </li>
                                    ))}
                                </ul>

                                <button
                                    className={tier.name === 'Executive Producer' ? 'glow-button' : 'secondary-button'}
                                    style={{ width: '100%' }}
                                    onClick={() => handleUpgrade(tier.name)}
                                >
                                    {tier.button}
                                </button>
                            </div>
                        );
                    })}
                </div>
            </section>
        </div>
    );
}
