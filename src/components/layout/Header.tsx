import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { motion } from 'framer-motion';
import { Menu, X } from 'lucide-react';
import { useState, useEffect } from 'react';
import { useAuth } from '@/context/AuthContext';
import styles from './Header.module.css';

// ... (navItems remain same)

// ... (component start)
<div className={styles.actions}>
  <Link href="/membership" className="glow-button" style={{ border: 'none', fontSize: '0.9rem', cursor: 'pointer' }}>
    Join the Club
  </Link>

  <button
    className={styles.mobileToggle}
    onClick={() => setIsOpen(!isOpen)}
  >
    {isOpen ? <X /> : <Menu />}
  </button>
</div>

{/* Mobile Nav Overlay */ }
{
  isOpen && (
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
  )
}
    </header >
  );
}
