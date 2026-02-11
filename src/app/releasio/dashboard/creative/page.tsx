"use client";

import Link from 'next/link';
import { Mic2, Palette, Wand2, Music4 } from 'lucide-react';
import styles from '../overview.module.css'; // Reusing overview cards

export default function CreativeStudioPage() {
    return (
        <div>
            <header className={styles.header}>
                <h1>Creative Studio 🎨</h1>
                <p>Where hits are born. Use AI to write, compose, and visualize your next era.</p>
            </header>

            <div className={styles.grid}>
                <Link href="/releasio/dashboard/creative/songwriter" className={styles.card} style={{ textDecoration: 'none', color: 'inherit', transition: 'transform 0.2s' }}>
                    <Mic2 size={32} style={{ marginBottom: '1rem', color: '#818cf8' }} />
                    <h3>Songwriting Assistant</h3>
                    <p style={{ fontSize: '0.9rem', color: 'var(--text-muted)' }}>Co-write lyrics, brainstorm themes, and generate rhymes.</p>
                </Link>

                <Link href="/releasio/dashboard/creative/visuals" className={styles.card} style={{ textDecoration: 'none', color: 'inherit', transition: 'transform 0.2s' }}>
                    <Palette size={32} style={{ marginBottom: '1rem', color: '#f472b6' }} />
                    <h3>Visual Identity & Prompter</h3>
                    <p style={{ fontSize: '0.9rem', color: 'var(--text-muted)' }}>Generate color palettes and Midjourney prompts.</p>
                </Link>

                <Link href="/releasio/dashboard/creative/video" className={styles.card} style={{ textDecoration: 'none', color: 'inherit', transition: 'transform 0.2s' }}>
                    <Wand2 size={32} style={{ marginBottom: '1rem', color: '#fbbf24' }} />
                    <h3>Video Studio (Veo)</h3>
                    <p style={{ fontSize: '0.9rem', color: 'var(--text-muted)' }}>Generate prompts for Teasers & Lyric Videos.</p>
                </Link>


            </div>
        </div>
    );
}
