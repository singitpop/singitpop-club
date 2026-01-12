"use client";

import Link from 'next/link';
import { ArrowRight, Zap, Target, BarChart3, Radio } from 'lucide-react';
import styles from './landing.module.css';

export default function ReleasioLanding() {
    return (
        <div className={styles.container}>
            {/* Hero Section */}
            <section className={styles.hero}>
                <div className={styles.heroContent}>
                    <div className={styles.badge}>Releasio Pro</div>
                    <h1 className={styles.title}>
                        Your AI Music <br />
                        <span className={styles.gradientText}>Co-Pilot</span>
                    </h1>
                    <p className={styles.subtitle}>
                        The all-in-one operating system for the modern independent artist.
                        Automate your marketing, analyze your demos, and manage your business.
                    </p>
                    <div className={styles.ctaGroup}>
                        <Link href="/releasio/dashboard" className={styles.primaryBtn}>
                            Launch Dashboard <ArrowRight size={20} />
                        </Link>
                        <Link href="/releasio/demo" className={styles.secondaryBtn}>View Demo</Link>
                    </div>
                </div>
                {/* Abstract Visual or Mockup could go here */}
                <div className={styles.heroVisual}>
                    <div className={styles.glow} />
                </div>
            </section>

            {/* Features Grid */}
            <section className={styles.features}>
                <div className={styles.featureCard}>
                    <div className={styles.iconBox} style={{ background: 'rgba(236, 72, 153, 0.2)', color: '#ec4899' }}>
                        <Zap size={32} />
                    </div>
                    <h3>Marketing Engine</h3>
                    <p>Generate social copy, ad campaigns, and pre-save links tailored to your brand DNA.</p>
                </div>

                <div className={styles.featureCard}>
                    <div className={styles.iconBox} style={{ background: 'rgba(52, 211, 153, 0.2)', color: '#34d399' }}>
                        <Radio size={32} />
                    </div>
                    <h3>Advanced A&R</h3>
                    <p>Analyze demos for hit potential, separate stems, and spot global viral trends.</p>
                </div>
            </section>

            {/* Pricing / Membership CTA */}
            <section className={styles.pricing} id="pricing">
                <div className={styles.membershipCard}>
                    <div className={styles.sectionHeader}>
                        <h2>Included with VIP Membership</h2>
                        <p>Get full access to the Releasio OS, plus exclusive music and merchandise perks.</p>
                    </div>

                    <div className={styles.priceRow}>
                        <div className={styles.bigPrice}>£8.99<span className={styles.period}>/mo</span></div>
                        <div className={styles.includes}>
                            <span>✅ Creative Studio</span>
                            <span>✅ Marketing Engine</span>
                            <span>✅ Tour & Event Planner</span>
                            <span>✅ Advanced A&R</span>
                        </div>
                    </div>

                    <Link href="/membership" className={styles.primaryBtn} style={{ margin: '2rem auto 0', maxWidth: '300px', justifyContent: 'center' }}>
                        Join the Co-Creation Lab
                    </Link>
                </div>
            </section>

            {/* Social Proof / Footer */}
            <footer className={styles.footer}>
                <p>Trusted by independent artists worldwide.</p>
                <div className={styles.logos}>
                    {/* Placeholder logos */}
                    <span>Spotify</span>
                    <span>TikTok</span>
                    <span>Apple Music</span>
                </div>
                <div style={{ marginTop: '2rem', opacity: 0.5 }}>
                    <Link href="/releasio/login" style={{ color: 'inherit', fontSize: '0.8rem', textDecoration: 'none' }}>Admin Portal (Simulation)</Link>
                </div>
            </footer>
        </div>
    );
}
