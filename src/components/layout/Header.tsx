"use client";

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { motion } from 'framer-motion';
import { Menu, X } from 'lucide-react';
import { useState, useEffect } from 'react';
import { useAuth } from '@/context/AuthContext';
import styles from './Header.module.css';

const navItems = [
  { name: 'Home', href: '/' },
  { name: 'Music', href: '/music' },
  { name: 'Fan Albums', href: '/fan-albums' },
  { name: 'Projects', href: '/projects' },
  { name: 'For Artists', href: '/releasio' }, // New Link
  { name: 'My Club', href: '/membership' },
  { name: 'Shop', href: '/shop' },
];

export default function Header() {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const { user } = useAuth();
  const pathname = usePathname();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <header className={`${styles.header} ${scrolled ? styles.scrolled : ''}`}>
      <div className={`container ${styles.container}`}>
        <Link href="https://singitpop.com" className={styles.navLink} style={{ marginRight: '20px', fontSize: '0.9rem', opacity: 0.7 }}>
          ← Website
        </Link>
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
          <Link href="/membership" className="glow-button" style={{
            background: user?.tier === 'VIP' ? 'linear-gradient(45deg, #FFD700, #FDB931)' : 'var(--primary)',
            color: user?.tier === 'VIP' ? 'black' : 'white',
            border: 'none',
            fontSize: '0.9rem'
          }}>
            {user?.tier === 'VIP' ? 'Pro Member 👑' : user?.tier === 'FAN' ? 'The Insider' : 'Join the Club'}
          </Link>

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
  );
}
