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
import UserBadge from '../ui/UserBadge';

const navItems = [
  { name: 'Home', href: '/' },
  { name: 'About', href: '/about' },
  { name: 'Music', href: '/music' },
  { name: 'Projects', href: '/projects' },
  { name: 'Licensing', href: '/licensing' },
  { name: 'Shop', href: '/shop' },
  { name: 'Contact', href: '/contact' },
];

export default function Header() {
  const { isLabel, user } = useAuth();
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
            Singit<span className={styles.pop}>pop</span> Records
          </Link>

          {/* Desktop Nav */}
          <nav className={styles.desktopNav}>
            {navItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className={`${styles.navLink} ${pathname === item.href ? styles.active : ''}`}
              >
                <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                  {item.name}
                  {item.name.includes('Radio') && <div className={styles.liveDot} title="Live Now" />}
                </div>
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

            <SignedIn>
              {isLabel && (
                <Link href="/admin" className={`${styles.navLink} ${styles.desktopOnly}`} style={{ marginRight: '1rem', fontWeight: 'bold', color: '#ff00d4' }}>
                  Admin
                </Link>
              )}
              <div style={{ marginLeft: '1rem' }}>
                <UserButton afterSignOutUrl="/" />
              </div>
            </SignedIn>

            <button
              className={styles.mobileToggle}
              onClick={() => setIsOpen(!isOpen)}
              aria-label={isOpen ? "Close menu" : "Open menu"}
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

            {navItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className={styles.mobileLink}
                onClick={() => setIsOpen(false)}
              >
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                  {item.name}
                  {item.name.includes('Radio') && (
                    <div style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '0.8rem', color: '#ff3b3b', fontWeight: 'bold' }}>
                       <div className={styles.liveDot} /> LIVE
                    </div>
                  )}
                </div>
              </Link>
            ))}
          </motion.div>
        )}
      </header>

      <SearchModal isOpen={isSearchOpen} onClose={() => setIsSearchOpen(false)} />
    </>
  );
}
