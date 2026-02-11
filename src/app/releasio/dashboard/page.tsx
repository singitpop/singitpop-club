"use client";

import { useAuth } from '@/context/AuthContext';
import Link from 'next/link';
import styles from './overview.module.css';

export default function DashboardOverview() {
    const { user } = useAuth();

    return (
        <div>
            <header className={styles.header}>
                <h1>Welcome back, {user?.name.split(' ')[0]}.</h1>
                <p>You have 3 active campaigns and 1 pending release.</p>
            </header>

            <div className={styles.grid}>
                {/* Stats Cards */}
                <div className={styles.card}>
                    <h3>Total Streams</h3>
                    <div className={styles.bigNumber}>2.4M</div>
                    <span className={styles.trendUp}>+12% this week</span>
                </div>
                <div className={styles.card}>
                    <h3>Fan Growth</h3>
                    <div className={styles.bigNumber}>15.2K</div>
                    <span className={styles.trendUp}>+450 followers</span>
                </div>
                <div className={styles.card}>
                    <h3>Revenue (Est)</h3>
                    <div className={styles.bigNumber}>£4,250</div>
                    <span className={styles.trendNeutral}>On track</span>
                </div>

                {/* Quick Actions */}
                <div className={`${styles.card} ${styles.actions}`} style={{ gridColumn: '1 / -1' }}>
                    <h3>Quick Actions</h3>
                    <div className={styles.actionGrid}>
                        <Link href="/releasio/dashboard/creative/songwriter" className="secondary-button" style={{ textDecoration: 'none', textAlign: 'center' }}>Draft New Song</Link>
                        <Link href="/releasio/dashboard/marketing" className="secondary-button" style={{ textDecoration: 'none', textAlign: 'center' }}>Schedule Post</Link>
                        <Link href="/releasio/dashboard/ar/scouting" className="secondary-button" style={{ textDecoration: 'none', textAlign: 'center' }}>Check Trends</Link>
                        <Link href="/releasio/dashboard/creative" className="primary-button" style={{ textDecoration: 'none', textAlign: 'center' }}>Create New Release</Link>
                    </div>
                </div>
            </div>
        </div>
    );
}
