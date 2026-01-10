"use client";

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Home, Music, Zap, User, Disc } from 'lucide-react';
import styles from './MobileNav.module.css';

export default function MobileNav() {
    const pathname = usePathname();

    // Only show on mobile, logic handled in CSS media queries usually, 
    // but we can also return null if we want to be strict, though CSS is safer for SSR.

    return (
        <nav className={styles.mobileNav}>
            <Link href="/" className={`${styles.item} ${pathname === '/' ? styles.active : ''}`}>
                <Home size={24} />
                <span>Home</span>
            </Link>

            <Link href="/music" className={`${styles.item} ${pathname.startsWith('/music') ? styles.active : ''}`}>
                <Disc size={24} />
                <span>Music</span>
            </Link>

            <Link href="/releasio/dashboard" className={`${styles.item} ${pathname.startsWith('/releasio') ? styles.active : ''}`}>
                <div className={styles.centerButton}>
                    <Zap size={24} fill="currentColor" />
                </div>
            </Link>

            <Link href="/shop" className={`${styles.item} ${pathname.startsWith('/shop') ? styles.active : ''}`}>
                <User size={24} /> // Using User icon for "Club/Shop" for now
                <span>Club</span>
            </Link>
        </nav>
    );
}
