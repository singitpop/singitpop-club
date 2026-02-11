"use client";

import Link from 'next/link';
import { Headphones, Globe, Mic2, BarChart3, UploadCloud } from 'lucide-react';
import styles from '../overview.module.css'; // Reusing overview styles

export default function ARHub() {
    return (
        <div className={styles.container}>
            <header className={styles.header}>
                <h1>Advanced A&R 🎧</h1>
                <p>Next-gen scouting, analysis, and production tools.</p>
            </header>

            <div className={styles.grid}>
                {/* Demo Inbox */}
                <Link href="/releasio/dashboard/ar/inbox" className={styles.card} style={{ textDecoration: 'none', color: 'inherit' }}>
                    <UploadCloud size={32} style={{ marginBottom: '1rem', color: '#60a5fa' }} />
                    <h3>Demo Inbox</h3>
                    <p style={{ fontSize: '0.9rem', color: 'var(--text-muted)' }}>AI analysis of incoming demos (Key, BPM, Vibe).</p>
                </Link>

                {/* Scouting Dashboard */}
                <Link href="/releasio/dashboard/ar/scouting" className={styles.card} style={{ textDecoration: 'none', color: 'inherit' }}>
                    <Globe size={32} style={{ marginBottom: '1rem', color: '#34d399' }} />
                    <h3>Scouting Dashboard</h3>
                    <p style={{ fontSize: '0.9rem', color: 'var(--text-muted)' }}>Trend Radar & TikTok viral prediction.</p>
                </Link>


                {/* External Stem Separation */}
                <a href="https://fadr.com/stems" target="_blank" rel="noopener noreferrer" className={styles.card} style={{ textDecoration: 'none', color: 'inherit' }}>
                    <Mic2 size={32} style={{ marginBottom: '1rem', color: '#f472b6' }} />
                    <h3>Free Stems ↗</h3>
                    <p style={{ fontSize: '0.9rem', color: 'var(--text-muted)' }}>AI stem separation via Fadr.</p>
                </a>

                {/* External Mastering Tool */}
                <a href="https://www.bandlab.com/mastering" target="_blank" rel="noopener noreferrer" className={styles.card} style={{ textDecoration: 'none', color: 'inherit' }}>
                    <Headphones size={32} style={{ marginBottom: '1rem', color: '#fbbf24' }} />
                    <h3>Free Mastering ↗</h3>
                    <p style={{ fontSize: '0.9rem', color: 'var(--text-muted)' }}>Professional mastering via BandLab.</p>
                </a>
            </div>
        </div>
    );
}
