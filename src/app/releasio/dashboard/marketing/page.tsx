"use client";

import Link from 'next/link';
import { CalendarRange, MessageCircle, BarChart2, Zap, Target } from 'lucide-react';
import styles from '../overview.module.css'; // Reusing overview cards

export default function MarketingPage() {
    return (
        <div>
            <header className={styles.header}>
                <h1>Marketing Engine 🚀</h1>
                <p>Plan your takeoff. Automated strategies and viral campaigns.</p>
            </header>


            <Link href="/releasio/dashboard/marketing/calendar" className={styles.card} style={{ textDecoration: 'none', color: 'inherit', transition: 'transform 0.2s' }}>
                <CalendarRange size={32} style={{ marginBottom: '1rem', color: '#fbbf24' }} />
                <h3>Marketing Calendar</h3>
                <p style={{ fontSize: '0.9rem', color: 'var(--text-muted)' }}>Visualize and schedule your campaign posts.</p>
            </Link>

            <Link href="/releasio/dashboard/marketing/links" className={styles.card} style={{ textDecoration: 'none', color: 'inherit', transition: 'transform 0.2s' }}>
                <Zap size={32} style={{ marginBottom: '1rem', color: '#fbbf24' }} />
                <h3>Smart Links</h3>
                <p style={{ fontSize: '0.9rem', color: 'var(--text-muted)' }}>Create pre-save landing pages in seconds.</p>
            </Link>
        </div>
    );
}
