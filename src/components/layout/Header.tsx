'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { SignedIn, SignedOut, UserButton } from '@clerk/nextjs';
import { Menu, X, Search } from 'lucide-react';
import { motion } from 'framer-motion';
import styles from './Header.module.css';
import { useAuth } from '@/context/AuthContext';
import SearchModal from '../search/SearchModal';

const navItems = [
  { name: 'Home', href: '/' },
  { name: 'About', href: '/about' },
  { name: 'Music', href: '/music' },
  { name: 'FanZone', href: '/fan-albums' },
  { name: 'Projects', href: '/projects' },
  // { name: 'For Artists', href: '/releasio' }, // Hidden for now
];

export default function Header() {
  const { isLabel } = useAuth();
  const [isOpen, setIsOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <>
      <header className={`${styles.header} ${scrolled ? styles.scrolled : ''}`}>
        <div className={`container ${styles.container}`}>
          <Link href="/" className={styles.logo}>
            SingIt<span className={styles.pop}>Pop</span>
          </Link>

          {/* Desktop Nav */}
          <nav className={styles.desktopNav}>
            {navItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className={`${styles.navLink} ${pathname === item.href ? styles.active : ''}`}
              >
                {item.name}
                {pathname === item.href && (
                  <motion.div layoutId="underline" className={styles.underline} />
                )}
              </Link>
            ))}
          </nav>

          <div className={styles.actions}>
            <button
              onClick={() => setIsSearchOpen(true)}
              aria-label="Search"
              style={{ background: 'none', border: 'none', cursor: 'pointer', color: 'inherit', padding: '0.5rem', display: 'flex', alignItems: 'center' }}
            >
              <Search size={22} />
            </button>

            <SignedOut>
              <Link href="/sign-in" className="glow-button" style={{ border: 'none', fontSize: '0.9rem', cursor: 'pointer' }}>
                Join the Club
              </Link>
            </SignedOut>
            <SignedIn>
              {isLabel && (
                <Link href="/admin" className={`${styles.navLink} ${styles.desktopOnly}`} style={{ marginRight: '1rem', fontWeight: 'bold', color: '#ff00d4' }}>
                  Admin
                </Link>
              )}
              <Link href="/club" className={`glow-button ${styles.desktopOnly}`} style={{ border: 'none', fontSize: '0.9rem', cursor: 'pointer' }}>
                My Dashboard
              </Link>
              <div style={{ marginLeft: '1rem' }}>
                <UserButton afterSignOutUrl="/" />
              </div>
            </SignedIn>

            <button
              className={styles.mobileToggle}
              onClick={() => setIsOpen(!isOpen)}
            >
              {isOpen ? <X /> : <Menu />}
            </button>
          </div>
        </div>

        {/* Mobile Nav Overlay */}
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className={styles.mobileMenu}
          >
            {isLabel && (
              <Link
                href="/admin"
                className={styles.mobileLink}
                onClick={() => setIsOpen(false)}
                style={{ color: '#ff00d4' }}
              >
                Admin Console
              </Link>
            )}
            <Link
              href="/club"
              className={styles.mobileLink}
              onClick={() => setIsOpen(false)}
              style={{ color: 'var(--primary)', fontWeight: 'bold' }}
            >
              My Dashboard
            </Link>
            {navItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className={styles.mobileLink}
                onClick={() => setIsOpen(false)}
              >
                {item.name}
              </Link>
            ))}
          </motion.div>
        )}
      </header>

      <SearchModal isOpen={isSearchOpen} onClose={() => setIsSearchOpen(false)} />
    </>
  );
}
