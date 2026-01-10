"use client";

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { LayoutDashboard, Music, PenTool, Settings, Briefcase, Radio, Zap, Users, Scissors, LogOut } from 'lucide-react';
import { useAuth } from '@/context/AuthContext';
import styles from './layout.module.css';

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
    const { user, logout } = useAuth();
    const pathname = usePathname();

    return (
        <div className={styles.dashboard}>
            <aside className={styles.sidebar}>
                <div className={styles.brand}>
                    <h2>Releasio</h2>
                    <span className={styles.beta}>BETA</span>
                </div>

                <nav className={styles.nav}>
                    <Link href="/releasio/dashboard" className={`${styles.link} ${pathname === '/releasio/dashboard' ? styles.active : ''}`}>
                        <LayoutDashboard size={20} /> Overview
                    </Link>

                    <div style={{ margin: '1rem 0 0.5rem', fontSize: '0.75rem', color: '#666', paddingLeft: '1rem', textTransform: 'uppercase' }}>Tools</div>

                    <Link href="/releasio/dashboard/creative" className={`${styles.link} ${pathname.includes('/creative') ? styles.active : ''}`}>
                        <Music size={20} /> Creative Studio
                    </Link>
                    <Link href="/releasio/dashboard/marketing" className={`${styles.link} ${pathname.includes('/marketing') ? styles.active : ''}`}>
                        <Zap size={20} /> Marketing Engine
                    </Link>
                    <Link href="/releasio/dashboard/ar" className={`${styles.link} ${pathname.includes('/ar') ? styles.active : ''}`}>
                        <Radio size={20} />
                        <span>Advanced A&R</span>
                    </Link>
                    <Link href="/releasio/dashboard/fans" className={`${styles.link} ${pathname.includes('/fans') ? styles.active : ''}`}>
                        <Users size={20} /> Fan Hub
                    </Link>
                    <Link href="/releasio/dashboard/scanner" className={`${styles.link} ${pathname.includes('/scanner') ? styles.active : ''}`}>
                        <Scissors size={20} /> AI Scanner
                    </Link>
                    <Link href="/releasio/settings" className={`${styles.link} ${pathname.includes('/settings') ? styles.active : ''}`}>
                        <Settings size={20} /> Settings
                    </Link>
                </nav>

                <div className={styles.user}>
                    <div className={styles.avatar}>{user?.name?.[0] || 'U'}</div>
                    <div className={styles.userInfo}>
                        <span className={styles.userName}>{user?.name}</span>
                        <span className={styles.userRole}>Label Manager</span>
                    </div>
                    <button onClick={logout} className={styles.logoutBtn}><LogOut size={16} /></button>
                </div>
            </aside>
            <main className={styles.main}>
                {children}
            </main>
        </div>
    );
}
