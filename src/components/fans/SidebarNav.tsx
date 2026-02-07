import { Home, Compass, Heart, Radio, User, Settings, LogOut, PlusCircle, Sparkles } from 'lucide-react';
import styles from './SidebarNav.module.css';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { useAuth } from '@/context/AuthContext';

interface SidebarNavProps {
    activeTab: string;
    onTabChange: (tab: string) => void;
}

export default function SidebarNav({ activeTab, onTabChange }: SidebarNavProps) {
    const { user } = useAuth();
    const router = useRouter();
    const navItems = [
        { id: 'home', icon: Home, label: 'Hub Home' },
        { id: 'browse', icon: Compass, label: 'Browse' },
        { id: 'radio', icon: Radio, label: 'Radio' },
        { id: 'favorites', icon: Heart, label: 'Fav' },
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

                <Link href="/lab/lyrics" className={styles.navItem} style={{ textDecoration: 'none', color: 'inherit', marginTop: '0.5rem' }}>
                    <Sparkles size={20} color="#ec4899" />
                    <span style={{ color: '#ec4899', fontWeight: 'bold' }}>Lyric Lab</span>
                </Link>
            </div>

            <div className={styles.menu}>
                <h4 className={styles.menuTitle}>Library</h4>
                <div onClick={() => {
                    if (!user) {
                        router.push('/sign-in');
                    } else {
                        router.push('/fan-albums/create');
                    }
                }} style={{ textDecoration: 'none', color: 'inherit', cursor: 'pointer' }}>
                    <button className={styles.navItem}>
                        <PlusCircle size={20} color="#FF0080" />
                        <span style={{ color: '#FF0080', fontWeight: 'bold' }}>Create Mix</span>
                    </button>
                </div>
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
