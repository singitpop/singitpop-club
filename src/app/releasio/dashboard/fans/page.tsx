"use client";

import Link from 'next/link';
import { Map, Shirt, Navigation, Users } from 'lucide-react';
import styles from '../overview.module.css'; // Using the correct shared styles

export default function FanHub() {
    return (
        <div className={styles.container}>
            <header className={styles.header}>
                <h1>Fan Engagement 🤝</h1>
                <p>Connect with your audience and turn listeners into superfans.</p>
            </header>

            <div className={styles.grid}>
                {/* Fan Map */}
                <Link href="/releasio/dashboard/fans/map" className={styles.card} style={{ textDecoration: 'none', color: 'inherit' }}>
                    <Map size={32} style={{ marginBottom: '1rem', color: '#34d399' }} />
                    <h3>Fan Map</h3>
                    <p style={{ fontSize: '0.9rem', color: 'var(--text-muted)' }}>Visualize where your top listeners are located.</p>
                </Link>

                {/* Tour Planner */}
                <Link href="/releasio/dashboard/fans/tour" className={styles.card} style={{ textDecoration: 'none', color: 'inherit' }}>
                    <Navigation size={32} style={{ marginBottom: '1rem', color: '#60a5fa' }} />
                    <h3>Tour Planner</h3>
                    <p style={{ fontSize: '0.9rem', color: 'var(--text-muted)' }}>AI-generated route based on fan density.</p>
                </Link>

                {/* Merch Designer */}
                <Link href="/releasio/dashboard/fans/merch" className={styles.card} style={{ textDecoration: 'none', color: 'inherit' }}>
                    <Shirt size={32} style={{ marginBottom: '1rem', color: '#f472b6' }} />
                    <h3>Merch Designer</h3>
                    <p style={{ fontSize: '0.9rem', color: 'var(--text-muted)' }}>Create apparel mockups with AI.</p>
                </Link>

                {/* CRM Placeholder */}
                <Link href="/releasio/dashboard/fans/events" className={styles.card} style={{ textDecoration: 'none', color: 'inherit' }}>
                    <Users size={32} style={{ marginBottom: '1rem', color: '#fbbf24' }} />
                    <h3>Events & Ticketing</h3>
                    <p style={{ fontSize: '0.9rem', color: 'var(--text-muted)' }}>Manage shows, RSVPs, and AI setlists.</p>
                </Link>
            </div>
        </div>
    );
}
