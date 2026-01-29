import { Home, Compass, Heart, Radio, User, Settings, LogOut, PlusCircle } from 'lucide-react';
import styles from './SidebarNav.module.css';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

interface SidebarNavProps {
    activeTab: string;
    onTabChange: (tab: string) => void;
}

export default function SidebarNav({ activeTab, onTabChange }: SidebarNavProps) {
    const navItems = [
        { id: 'home', icon: Home, label: 'Hub Home' },
        { id: 'browse', icon: Compass, label: 'Browse' },
        { id: 'favorites', icon: Heart, label: 'Favorites' },
        { id: 'radio', icon: Radio, label: 'Station' },
    ];

    return (
        <nav className={styles.nav}>
            <div className={styles.logo}>
                <span className={styles.logoIcon}>🎵</span>
                <span className={styles.logoText}>FanZone</span>
            </div>

            <div className={styles.menu}>
                <h4 className={styles.menuTitle}>Menu</h4>
                {navItems.map(item => (
                    <button
                        key={item.id}
                        className={`${styles.navItem} ${activeTab === item.id ? styles.active : ''}`}
                        onClick={() => onTabChange(item.id)}
                    >
                        <item.icon size={20} />
                        <span>{item.label}</span>
                    </button>
                ))}
            </div>

            <div className={styles.menu}>
                <h4 className={styles.menuTitle}>Library</h4>
                <Link href="/fan-albums/create" style={{ textDecoration: 'none', color: 'inherit' }}>
                    <button className={styles.navItem}>
                        <PlusCircle size={20} color="#FF0080" />
                        <span style={{ color: '#FF0080', fontWeight: 'bold' }}>Create Mix</span>
                    </button>
                </Link>
            </div>

            <div className={styles.footer}>
                <Link href="/club/account" style={{ textDecoration: 'none', color: 'inherit', width: '100%' }}>
                    <button className={`${styles.navItem} ${activeTab === 'settings' ? styles.active : ''}`}>
                        <Settings size={20} />
                        <span>Settings</span>
                    </button>
                </Link>
            </div>
        </nav>
    );
}
